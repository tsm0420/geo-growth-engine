import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import test from 'node:test';
import { fixture, json, record, run } from './helpers.ts';

function corrupted(bytes: Buffer, text: string, invalid = Buffer.from([0xff])): Buffer {
  const marker = Buffer.from(text);
  const offset = bytes.indexOf(marker);
  assert.ok(offset >= 0);
  return Buffer.concat([bytes.subarray(0, offset), invalid, bytes.subarray(offset + marker.length)]);
}

test('plan rejects malformed product bytes before replacing existing artifacts', async (t) => {
  const target = await fixture(t);
  const input = join(target, '.geo/product.yaml');
  const raw = corrupted(await readFile(input), 'Save daily journal entries.');
  await writeFile(input, raw);
  const output = join(target, 'results');
  await mkdir(output);
  await writeFile(join(output, 'plan.json'), 'Existing JSON');
  await writeFile(join(output, 'plan.md'), 'Existing Markdown');
  const result = run(['plan', '--config', join(target, '.geo/config.yaml'), '--output', output]);
  assert.equal(result.status, 2, result.stderr);
  assert.equal(result.stderr.trim(), `YAML input ${input} must use valid UTF-8`);
  assert.equal(result.stdout, '');
  assert.equal(await readFile(join(output, 'plan.json'), 'utf8'), 'Existing JSON');
  assert.equal(await readFile(join(output, 'plan.md'), 'utf8'), 'Existing Markdown');
  assert.deepEqual(await readFile(input), raw);
});

test('all configured report commands reject malformed root and product YAML comments before writes', async (t) => {
  const target = await fixture(t);
  for (const name of ['config', 'product']) {
    const input = join(target, `.geo/${name}.yaml`);
    const original = await readFile(input);
    const raw = Buffer.concat([original, Buffer.from('\n# Note: '), Buffer.from([0xff]), Buffer.from('\n')]);
    await writeFile(input, raw);
    for (const command of ['audit', 'aso', 'plan', 'visibility']) {
      const output = join(target, `${name}-${command}`);
      const args = [command, '--config', join(target, '.geo/config.yaml'), '--output', output];
      if (command === 'visibility') args.push('--input', join(target, 'visibility.jsonl'));
      const result = run(args);
      assert.equal(result.status, 2, result.stderr);
      assert.equal(result.stderr.trim(), `YAML input ${input} must use valid UTF-8`);
      assert.equal(result.stdout, '');
      await assert.rejects(readFile(output), { code: 'ENOENT' });
      assert.deepEqual(await readFile(input), raw);
    }
    await writeFile(input, original);
  }
});

test('only plan consumes malformed query YAML while other report commands retain lazy loading', async (t) => {
  const target = await fixture(t);
  const input = join(target, '.geo/queries.yaml');
  const raw = corrupted(await readFile(input), 'How can I keep daily journal entries?');
  await writeFile(input, raw);
  for (const command of ['audit', 'aso', 'visibility', 'plan']) {
    const output = join(target, command);
    const args = [command, '--config', join(target, '.geo/config.yaml'), '--output', output];
    if (command === 'visibility') args.push('--input', join(target, 'visibility.jsonl'));
    const result = run(args);
    assert.equal(result.status, command === 'plan' ? 2 : 0, result.stderr);
    if (command === 'plan') {
      assert.equal(result.stderr.trim(), `YAML input ${input} must use valid UTF-8`);
      await assert.rejects(readFile(output), { code: 'ENOENT' });
    } else assert.equal((await json(join(output, `${command}.json`))).example, true);
    assert.deepEqual(await readFile(input), raw);
  }
});

test('YAML rejects truncated, overlong, surrogate and out-of-range UTF-8 sequences', async (t) => {
  const target = await fixture(t);
  const input = join(target, '.geo/product.yaml');
  const original = await readFile(input);
  for (const invalid of [Buffer.from([0xe2, 0x82]), Buffer.from([0xc0, 0xaf]), Buffer.from([0xed, 0xa0, 0x80]), Buffer.from([0xf4, 0x90, 0x80, 0x80])]) {
    const raw = corrupted(original, 'Save daily journal entries.', invalid);
    await writeFile(input, raw);
    const output = join(target, `invalid-${invalid.toString('hex')}`);
    const result = run(['plan', '--config', join(target, '.geo/config.yaml'), '--output', output]);
    assert.equal(result.status, 2);
    assert.equal(result.stderr.trim(), `YAML input ${input} must use valid UTF-8`);
    await assert.rejects(readFile(output), { code: 'ENOENT' });
    assert.deepEqual(await readFile(input), raw);
  }
});

test('YAML retains valid Unicode, escaped replacement characters and parser-accepted BOMs', async (t) => {
  for (const variant of ['literal', 'escaped', 'bom']) {
    const target = await fixture(t);
    const config = join(target, '.geo/config.yaml');
    const product = join(target, '.geo/product.yaml');
    const queries = join(target, '.geo/queries.yaml');
    const claim = variant === 'escaped' ? 'Save \uFFFD daily journal entries.' : 'Save \uFFFD \u{1f600} e\u0301 daily journal entries.';
    const field = variant === 'escaped' ? 'claim: "Save \\uFFFD daily journal entries."' : `claim: ${claim}`;
    await writeFile(product, (await readFile(product, 'utf8')).replace('claim: Save daily journal entries.', field));
    const query = 'Question \uFFFD \u{1f600} e\u0301?';
    await writeFile(queries, (await readFile(queries, 'utf8')).replace('How can I keep daily journal entries?', query));
    const originals: [string, Buffer][] = [];
    for (const input of [config, product, queries]) {
      const raw = await readFile(input);
      if (variant === 'bom') await writeFile(input, Buffer.concat([Buffer.from([0xef, 0xbb, 0xbf]), raw]));
      originals.push([input, await readFile(input)]);
    }
    const output = join(target, 'results');
    const result = run(['plan', '--config', config, '--output', output]);
    assert.equal(result.status, 0, result.stderr);
    const report = await json(join(output, 'plan.json'));
    const data = record(report.data);
    assert.ok(Array.isArray(data.opportunities));
    const opportunity = record(data.opportunities[0]);
    assert.equal(opportunity.query, query);
    assert.ok(Array.isArray(opportunity.facts));
    assert.equal(record(opportunity.facts[0]).claim, claim);
    assert.deepEqual(report.summary, { pass: 1, fail: 0, unknown: 0 });
    for (const [input, raw] of originals) assert.deepEqual(await readFile(input), raw);
  }
});

test('both JSON ingress paths retain their established format-specific UTF-8 diagnostics', async (t) => {
  const target = await fixture(t);
  const invalid = join(target, 'invalid.json');
  const raw = Buffer.from([0xff]);
  await writeFile(invalid, raw);
  const valid = join(target, 'valid.json');
  await writeFile(valid, JSON.stringify({ schemaVersion: 1, kind: 'audit', example: true, generatedAt: '2026-10-18T10:00:00Z', scope: 'Fictional JSON fixture', findings: [], summary: { pass: 0, fail: 0, unknown: 0 }, data: null }));
  const cases = [
    ['visibility', '--config', join(target, '.geo/config.yaml'), '--input', invalid],
    ['compare', '--before', invalid, '--after', valid],
    ['compare', '--before', valid, '--after', invalid],
  ];
  for (const [index, args] of cases.entries()) {
    const output = join(target, `json-${index}`);
    const result = run([...args, '--output', output]);
    assert.equal(result.status, 2);
    assert.equal(result.stderr.trim(), `JSON input ${invalid} must use valid UTF-8`);
    assert.equal(result.stdout, '');
    await assert.rejects(readFile(output), { code: 'ENOENT' });
    assert.deepEqual(await readFile(invalid), raw);
  }
});

test('valid UTF-8 JSON BOMs still reach parser rejection instead of being stripped', async (t) => {
  const target = await fixture(t);
  const input = join(target, 'bom.json');
  const valid = join(target, 'valid.json');
  const report = JSON.stringify({ schemaVersion: 1, kind: 'audit', example: true, generatedAt: '2026-10-18T10:00:00Z', scope: 'Fictional JSON fixture', findings: [], summary: { pass: 0, fail: 0, unknown: 0 }, data: null });
  const raw = Buffer.from(`\uFEFF${report}`);
  await writeFile(input, raw);
  await writeFile(valid, report);
  for (const command of ['visibility', 'compare']) {
    const output = join(target, command);
    const args = command === 'visibility' ? [command, '--config', join(target, '.geo/config.yaml'), '--input', input] : [command, '--before', valid, '--after', input];
    const result = run([...args, '--output', output]);
    assert.equal(result.status, 2);
    assert.ok(!result.stderr.includes('must use valid UTF-8'));
    if (command === 'visibility') assert.match(result.stderr, /line 1: invalid JSON/);
    await assert.rejects(readFile(output), { code: 'ENOENT' });
    assert.deepEqual(await readFile(input), raw);
  }
});
