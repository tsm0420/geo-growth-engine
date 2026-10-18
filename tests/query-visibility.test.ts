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

test('visibility preserves exact query and collection context identities without separator collisions', async (t) => {
  const variants = [
    { ...context, query: 'Question?' },
    { ...context, query: 'Question?', provider: 'other' },
    { ...context, query: 'Question?', surface: 'consumer' },
    { ...context, query: 'Question?', model: 'model-b' },
    { ...context, query: 'Question?', locale: 'en-US' },
    { ...context, query: 'question?' },
    { ...context, query: ' Question?' },
    { ...context, query: 'Question? ' },
    { ...context, query: '\u00e9' },
    { ...context, query: 'e\u0301' },
    { ...context, query: 'Question?\r\n|<text>' },
    { ...context, query: 'Question?', provider: 'x|y', surface: 'z' },
    { ...context, query: 'Question?', provider: 'x', surface: 'y|z' },
  ];
  const value = await imported(t, variants.map((variant, index) => ({ ...variant, observedAt, id: String(index), status: 'success', answer: 'No matching brand', citations: [] })));
  const data = record(value.report.data);
  assert.deepEqual(data.queryGroups, variants.map((variant) => ({ ...variant, ...zero })));
  assert.equal(record(data.totals).attempted, 13);
  assert.equal(record(data.totals).successful, 13);
  assert.equal(await readFile(join(value.output, 'evidence/responses.jsonl'), 'utf8'), value.raw);
});

test('visibility distinguishes error-only question rates from successful zero and empty imports', async (t) => {
  const empty = record((await imported(t, [])).report.data);
  assert.deepEqual(empty.queryGroups, []);
  assert.deepEqual(empty.groups, []);
  assert.equal(record(empty.totals).coverage, null);
  assert.equal(record(empty.totals).mentionRate, null);
  const value = await imported(t, [
    { ...context, observedAt, query: 'Unavailable?', id: 'a', status: 'error', error: 'Example Journal; https://example.com/' },
    { ...context, observedAt, query: 'Unavailable?', id: 'b', status: 'error', error: 'Other Journal' },
    { ...context, observedAt, query: 'Answered?', id: 'c', status: 'success', answer: 'No matching brand', citations: [] },
  ]);
  assert.deepEqual(record(value.report.data).queryGroups, [
    { ...context, query: 'Unavailable?', attempted: 2, successful: 0, failed: 2, coverage: 0, mentionRate: null, citationRate: null, recommendationRate: null, competitors: { 'Other Journal': 0 } },
    { ...context, query: 'Answered?', ...zero },
  ]);
});

test('question label changes affect query rows while reordering preserves per-tuple arithmetic', async (t) => {
  const positive = { ...context, observedAt, query: 'First?', id: 'a', status: 'success', answer: 'Example Journal', citations: ['https://example.com/'] };
  const negative = { ...context, observedAt, query: 'Second?', id: 'b', status: 'success', answer: 'No matching brand', citations: [] };
  const error = { ...context, observedAt, query: 'First?', id: 'c', status: 'error', error: 'No answer' };
  const original = record((await imported(t, [positive, negative, error])).report.data);
  const swapped = record((await imported(t, [{ ...positive, query: 'Second?' }, { ...negative, query: 'First?' }, { ...error, query: 'Second?' }])).report.data);
  const reordered = record((await imported(t, [negative, error, positive])).report.data);
  assert.deepEqual(swapped.totals, original.totals);
  assert.deepEqual(swapped.groups, original.groups);
  assert.ok(Array.isArray(original.queryGroups) && Array.isArray(swapped.queryGroups) && Array.isArray(reordered.queryGroups));
  assert.deepEqual(swapped.queryGroups, [
    { ...record(original.queryGroups[0]), query: 'Second?' },
    { ...record(original.queryGroups[1]), query: 'First?' },
  ]);
  assert.deepEqual(reordered.queryGroups, [original.queryGroups[1], original.queryGroups[0]]);
  assert.deepEqual(reordered.totals, original.totals);
});

test('both comparison modes retain query groups and accept older reports without them', async (t) => {
  const value = await imported(t, [{ ...context, observedAt, query: 'Question?', id: 'a', status: 'success', answer: 'Example Journal', citations: ['https://example.com/'] }]);
  const older = record(JSON.parse(JSON.stringify(value.report)));
  delete record(older.data).queryGroups;
  const before = join(value.target, 'older.json');
  const current = join(value.output, 'visibility.json');
  const raw = JSON.stringify(older);
  await writeFile(before, raw);
  for (const metrics of [false, true]) {
    const output = join(value.target, `comparison-${metrics}`);
    const args = ['compare', '--before', before, '--after', current, '--output', output];
    if (metrics) args.push('--visibility-metrics');
    const result = run(args);
    assert.equal(result.status, 0, result.stderr);
    const data = record((await json(join(output, 'compare.json'))).data);
    assert.deepEqual(record(data.before).report, older);
    assert.deepEqual(record(data.after).report, value.report);
    assert.deepEqual(data.counts, { added: 0, removed: 0, 'status-changed': 0, 'details-changed': 0, unchanged: 3 });
    if (metrics) {
      assert.ok(Array.isArray(data.visibilityMetrics));
      assert.deepEqual(data.visibilityMetrics.map((row: unknown) => record(row).difference), [0, 0, 0, 0, 0, 0]);
    } else assert.equal(data.visibilityMetrics, undefined);
  }
  assert.equal(await readFile(before, 'utf8'), raw);
});

test('sample IDs remain globally unique across different question groups before writes', async (t) => {
  const target = await fixture(t);
  const input = join(target, 'duplicate.jsonl');
  const output = join(target, 'results');
  const rows = ['First?', 'Second?'].map((query) => ({ ...context, observedAt, query, id: 'same', status: 'error', error: 'No answer' }));
  const raw = rows.map((row) => JSON.stringify(row)).join('\n');
  await writeFile(input, raw);
  const result = run(['visibility', '--config', join(target, '.geo/config.yaml'), '--input', input, '--output', output]);
  assert.equal(result.status, 2);
  assert.match(result.stderr, /duplicate sample ID same/);
  assert.equal(result.stdout, '');
  await assert.rejects(readFile(output), { code: 'ENOENT' });
  assert.equal(await readFile(input, 'utf8'), raw);
});
