import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import test from 'node:test';
import { fixture, json, record, run } from './helpers.ts';

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
