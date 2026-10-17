import assert from 'node:assert/strict';
import { chmod, link, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { join } from 'node:path';
import { test } from 'node:test';
import { fixture, json, record, run } from './helpers.ts';

test('report commands reject a destination that is also their configuration without changing it', async (t) => {
  for (const command of ['audit', 'aso', 'plan', 'visibility']) await t.test(command, async (t) => {
    const target = await fixture(t);
    const output = join(target, 'output');
    await mkdir(output);
    const config = join(output, `${command}.json`);
    const original = JSON.stringify({ version: 1, origin: 'https://example.com', publicDir: join(target, 'public'), product: join(target, '.geo/product.yaml'), queries: join(target, '.geo/queries.yaml') });
    await writeFile(config, original);
    const args = [command, '--config', config, '--output', output];
    if (command === 'visibility') args.push('--input', join(target, 'visibility.jsonl'));
    const result = run(args);
    assert.equal(result.status, 2, result.stderr);
    assert.match(result.stderr, /input|source/i);
    assert.equal(await readFile(config, 'utf8'), original);
    assert.deepEqual(await readdir(output), [`${command}.json`]);
  });
});

test('a later report destination conflict preserves the previous JSON and raw evidence', async (t) => {
  const target = await fixture(t);
  const output = join(target, 'output');
  const input = join(target, 'visibility.jsonl');
  const args = ['visibility', '--config', join(target, '.geo/config.yaml'), '--input', input, '--output', output];
  assert.equal(run(args).status, 0);
  const previousJson = await readFile(join(output, 'visibility.json'));
  const previousEvidence = await readFile(join(output, 'evidence/responses.jsonl'));
  await rm(join(output, 'visibility.md'));
  await mkdir(join(output, 'visibility.md'));
  await writeFile(input, '');
  const result = run(args);
  assert.equal(result.status, 2, result.stderr);
  assert.deepEqual(await readFile(join(output, 'visibility.json')), previousJson);
  assert.deepEqual(await readFile(join(output, 'evidence/responses.jsonl')), previousEvidence);
});

test('report preflight rejects a hard-linked input alias without modifying either name', async (t) => {
  const target = await fixture(t);
  const output = join(target, 'output');
  await mkdir(output);
  const input = join(target, 'visibility.jsonl');
  const original = await readFile(input);
  await link(input, join(output, 'visibility.json'));
  const result = run(['visibility', '--config', join(target, '.geo/config.yaml'), '--input', input, '--output', output]);
  assert.equal(result.status, 2, result.stderr);
  assert.match(result.stderr, /input|source/i);
  assert.deepEqual(await readFile(input), original);
  assert.deepEqual(await readFile(join(output, 'visibility.json')), original);
  assert.deepEqual(await readdir(output), ['visibility.json']);
});

test('report preflight rejects two destinations aliasing one file instead of reporting success with invalid JSON', async (t) => {
  const target = await fixture(t);
  const output = join(target, 'output');
  await mkdir(output);
  const first = join(output, 'plan.json');
  const second = join(output, 'plan.md');
  await writeFile(first, 'Preserve prior content');
  await link(first, second);
  const result = run(['plan', '--config', join(target, '.geo/config.yaml'), '--output', output]);
  assert.equal(result.status, 2, result.stderr);
  assert.match(result.stderr, /alias|destination/i);
  assert.equal(await readFile(first, 'utf8'), 'Preserve prior content');
  assert.equal(await readFile(second, 'utf8'), 'Preserve prior content');
});

test('report preflight protects product, query and raw-response input destinations', async (t) => {
  for (const source of ['product', 'queries', 'input']) await t.test(source, async (t) => {
    const target = await fixture(t);
    const output = join(target, 'output');
    await mkdir(output);
    const command = source === 'input' ? 'visibility' : 'plan';
    const destination = join(output, `${command}.${source === 'product' ? 'md' : 'json'}`);
    const originalPath = join(target, source === 'input' ? 'visibility.jsonl' : `.geo/${source === 'queries' ? 'queries' : 'product'}.yaml`);
    const original = await readFile(originalPath);
    await writeFile(destination, original);
    const config = join(target, '.geo/config.yaml');
    if (source !== 'input') await writeFile(config, (await readFile(config, 'utf8')).replace(`${source === 'queries' ? 'queries' : 'product'}: ${source === 'queries' ? 'queries' : 'product'}.yaml`, `${source === 'queries' ? 'queries' : 'product'}: ${destination}`));
    const args = [command, '--config', config, '--output', output];
    if (source === 'input') args.push('--input', destination);
    const result = run(args);
    assert.equal(result.status, 2, result.stderr);
    assert.match(result.stderr, /input|source/i);
    assert.deepEqual(await readFile(destination), original);
    assert.deepEqual(await readdir(output), [`${command}.${source === 'product' ? 'md' : 'json'}`]);
  });
});

test('report preflight rejects a blocked evidence ancestor before replacing existing reports', async (t) => {
  const target = await fixture(t);
  const output = join(target, 'output');
  await mkdir(output);
  await writeFile(join(output, 'visibility.json'), 'Prior JSON');
  await writeFile(join(output, 'visibility.md'), 'Prior Markdown');
  await writeFile(join(output, 'evidence'), 'Owner file');
  const result = run(['visibility', '--config', join(target, '.geo/config.yaml'), '--input', join(target, 'visibility.jsonl'), '--output', output]);
  assert.equal(result.status, 2, result.stderr);
  assert.equal(await readFile(join(output, 'visibility.json'), 'utf8'), 'Prior JSON');
  assert.equal(await readFile(join(output, 'visibility.md'), 'utf8'), 'Prior Markdown');
  assert.equal(await readFile(join(output, 'evidence'), 'utf8'), 'Owner file');
});

test('safe report reuse replaces outputs with matching retained evidence', async (t) => {
  const target = await fixture(t);
  const output = join(target, 'output');
  const input = join(target, 'visibility.jsonl');
  const args = ['visibility', '--config', join(target, '.geo/config.yaml'), '--input', input, '--output', output];
  assert.equal(run(args).status, 0);
  await writeFile(input, '');
  assert.equal(run(args).status, 0);
  const report = await json(join(output, 'visibility.json'));
  const retained = await readFile(join(output, 'evidence/responses.jsonl'));
  assert.equal(retained.length, 0);
  assert.equal(record(report.data).sha256, createHash('sha256').update(retained).digest('hex'));
  assert.equal(record(record(report.data).totals).attempted, 0);
});

test('a non-writable later destination is detected before replacing earlier outputs', async (t) => {
  if (process.platform === 'win32' || process.getuid?.() === 0) {
    t.skip('POSIX write-mode checks require an unprivileged POSIX user.');
    return;
  }
  const target = await fixture(t);
  const output = join(target, 'output');
  await mkdir(output);
  await writeFile(join(output, 'plan.json'), 'Prior JSON');
  const blocked = join(output, 'plan.md');
  await writeFile(blocked, 'Prior Markdown');
  await chmod(blocked, 0o444);
  try {
    const result = run(['plan', '--config', join(target, '.geo/config.yaml'), '--output', output]);
    assert.equal(result.status, 2, result.stderr);
    assert.equal(await readFile(join(output, 'plan.json'), 'utf8'), 'Prior JSON');
    assert.equal(await readFile(blocked, 'utf8'), 'Prior Markdown');
  } finally { await chmod(blocked, 0o644); }
});
