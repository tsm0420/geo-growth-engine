import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import test from 'node:test';
import { fixture, findings, json, record, run } from './helpers.ts';

type Position = 'data' | 'finding' | 'summary' | 'report';
function source(position: Position, value: unknown, metrics = false): string {
  return JSON.stringify({
    schemaVersion: 1, kind: metrics ? 'visibility' : 'audit', example: true, generatedAt: '2026-10-18T10:00:00Z', scope: 'Fictional numeric retention fixture',
    findings: [{ id: 'check', status: 'pass', evidence: 'supplied', action: 'inspect', extension: position === 'finding' ? value : 'unchanged' }],
    summary: { pass: 1, fail: 0, unknown: 0, extension: position === 'summary' ? value : 'unchanged' },
    data: { nested: [{ value: position === 'data' ? value : 'unchanged' }], totals: { attempted: 1, successful: 1, failed: 0, coverage: 1, mentionRate: 1, citationRate: 0 } },
    extension: position === 'report' ? value : 'unchanged',
  });
}

test('default compare rejects overflow before replacing retained report artifacts', async (t) => {
  const target = await fixture(t);
  const before = source('data', null);
  const after = source('data', 'NUMERIC_TOKEN').replace('"NUMERIC_TOKEN"', '1e400');
  const beforePath = join(target, 'before.json');
  const afterPath = join(target, 'after.json');
  await writeFile(beforePath, before);
  await writeFile(afterPath, after);
  const output = join(target, 'comparison');
  await mkdir(output);
  await writeFile(join(output, 'compare.json'), 'existing JSON');
  await writeFile(join(output, 'compare.md'), 'existing Markdown');
  const result = run(['compare', '--before', beforePath, '--after', afterPath, '--output', output]);
  assert.equal(result.status, 2, result.stderr);
  assert.match(result.stderr, /supported finite range/);
  assert.ok(result.stderr.includes(afterPath));
  assert.equal(result.stdout, '');
  assert.equal(await readFile(join(output, 'compare.json'), 'utf8'), 'existing JSON');
  assert.equal(await readFile(join(output, 'compare.md'), 'utf8'), 'existing Markdown');
  assert.equal(await readFile(beforePath, 'utf8'), before);
  assert.equal(await readFile(afterPath, 'utf8'), after);
});

const positions: Position[] = ['data', 'finding', 'summary', 'report'];
for (const position of positions) {
  test(`compare rejects overflow in ${position} on either side and in either mode`, async (t) => {
    const target = await fixture(t);
    for (const side of ['before', 'after']) {
      for (const metrics of [false, true]) {
        const valid = source(position, { text: '1e400', missing: null }, metrics);
        const invalid = source(position, 'NUMERIC_TOKEN', metrics).replace('"NUMERIC_TOKEN"', side === 'before' ? '-1e400' : '1e400');
        const before = side === 'before' ? invalid : valid;
        const after = side === 'after' ? invalid : valid;
        const beforePath = join(target, 'before.json');
        const afterPath = join(target, 'after.json');
        await writeFile(beforePath, before);
        await writeFile(afterPath, after);
        const output = join(target, `${side}-${metrics}`);
        if (metrics) {
          await mkdir(output);
          await writeFile(join(output, 'compare.json'), 'existing JSON');
          await writeFile(join(output, 'compare.md'), 'existing Markdown');
        }
        const args = ['compare', '--before', beforePath, '--after', afterPath, '--output', output];
        if (metrics) args.push('--visibility-metrics');
        const result = run(args);
        assert.equal(result.status, 2, result.stderr);
        assert.match(result.stderr, /supported finite range/);
        assert.ok(result.stderr.includes(join(target, `${side}.json`)));
        assert.equal(result.stdout, '');
        if (metrics) {
          assert.equal(await readFile(join(output, 'compare.json'), 'utf8'), 'existing JSON');
          assert.equal(await readFile(join(output, 'compare.md'), 'utf8'), 'existing Markdown');
        } else await assert.rejects(readFile(output), { code: 'ENOENT' });
        assert.equal(await readFile(beforePath, 'utf8'), before);
        assert.equal(await readFile(afterPath, 'utf8'), after);
      }
    }
  });
}

test('compare retains finite opaque values, nulls, numeric-looking strings and source digests', async (t) => {
  const target = await fixture(t);
  const value = { large: 1e308, small: 1e-308, ordinary: 0.125, zero: 0, missing: null, text: '1e400', nested: [true, false, [], {}] };
  for (const metrics of [false, true]) {
    const parsed = record(JSON.parse(source('data', value, metrics)));
    for (const item of findings(parsed)) item.extension = value;
    record(parsed.summary).extension = value;
    parsed.extension = value;
    const before = JSON.stringify(parsed, null, 2);
    const after = JSON.stringify(parsed);
    const beforePath = join(target, 'before.json');
    const afterPath = join(target, 'after.json');
    await writeFile(beforePath, before);
    await writeFile(afterPath, after);
    const output = join(target, `finite-${metrics}`);
    const args = ['compare', '--before', beforePath, '--after', afterPath, '--output', output];
    if (metrics) args.push('--visibility-metrics');
    const result = run(args);
    assert.equal(result.status, 0, result.stderr);
    const data = record((await json(join(output, 'compare.json'))).data);
    assert.equal(record(data.counts).unchanged, 1);
    const sources: [string, string][] = [['before', before], ['after', after]];
    for (const [side, text] of sources) {
      const retained = record(data[side]);
      assert.deepEqual(retained.report, parsed);
      assert.equal(retained.sha256, createHash('sha256').update(text).digest('hex'));
      assert.equal(await readFile(join(target, `${side}.json`), 'utf8'), text);
    }
  }
});
