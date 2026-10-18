import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import test from 'node:test';
import type { TestContext } from 'node:test';
import { fixture, json, record, run } from './helpers.ts';

const context = { provider: 'fixture', surface: 'api', model: 'model-a', locale: 'en-GB' };
const observedAt = '2026-10-18T10:00:00Z';
const zero = { attempted: 1, successful: 1, failed: 0, coverage: 1, mentionRate: 0, citationRate: 0, recommendationRate: null, competitors: { 'Other Journal': 0 } };

async function imported(t: TestContext, rows: unknown[]) {
  const target = await fixture(t);
  const input = join(target, 'responses.jsonl');
  const output = join(target, 'results');
  const raw = rows.map((row) => JSON.stringify(row)).join('\n') + (rows.length ? '\n' : '');
  await writeFile(input, raw);
  const result = run(['visibility', '--config', join(target, '.geo/config.yaml'), '--input', input, '--output', output]);
  assert.equal(result.status, 0, result.stderr);
  return { target, input, output, raw, result, report: await json(join(output, 'visibility.json')) };
}

test('visibility separates supplied questions with repeated attempts and retains old aggregates', async (t) => {
  const first = 'How do I keep daily notes?';
  const second = 'Can I share notes?';
  const value = await imported(t, [
    { ...context, observedAt, query: first, id: 'a', status: 'success', answer: '_Example Journal_', citations: ['https://docs.example.com/notes'] },
    { ...context, observedAt, query: first, id: 'b', status: 'error', error: 'No answer' },
    { ...context, observedAt, query: second, id: 'c', status: 'success', answer: 'Other Journal', citations: ['https://example.com.evil.invalid/'] },
  ]);
  const data = record(value.report.data);
  assert.deepEqual(data.queryGroups, [
    { ...context, query: first, attempted: 2, successful: 1, failed: 1, coverage: 0.5, mentionRate: 1, citationRate: 1, recommendationRate: null, competitors: { 'Other Journal': 0 } },
    { ...context, query: second, ...zero, competitors: { 'Other Journal': 1 } },
  ]);
  const totals = { attempted: 3, successful: 2, failed: 1, coverage: 2 / 3, mentionRate: 0.5, citationRate: 0.5, recommendationRate: null, competitors: { 'Other Journal': 1 } };
  assert.deepEqual(data.totals, totals);
  assert.deepEqual(data.groups, [{ ...context, ...totals }]);
  assert.deepEqual(value.report.summary, { pass: 0, fail: 0, unknown: 3 });
  assert.equal(value.report.example, true);
  assert.equal(data.sha256, createHash('sha256').update(value.raw).digest('hex'));
  assert.equal(await readFile(join(value.output, 'evidence/responses.jsonl'), 'utf8'), value.raw);
  assert.equal(await readFile(value.input, 'utf8'), value.raw);
  const markdown = await readFile(join(value.output, 'visibility.md'), 'utf8');
  assert.ok(markdown.includes(JSON.stringify(data, null, 2)));
});
