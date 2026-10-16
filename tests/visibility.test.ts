import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fixture, json, record, run } from './helpers.ts';

test('visibility preserves raw evidence and computes rates only from successful answers', async (t) => {
  const target = await fixture(t);
  const base = { provider: 'test-fixture', surface: 'api-fixture', model: 'fixture', query: 'Which journal?', locale: 'en-GB', observedAt: '2026-10-16T12:00:00Z' };
  const samples = [
    { ...base, id: 'a', status: 'success', answer: 'Example Journal supports daily notes.', citations: ['https://example.com/features/'] },
    { ...base, id: 'b', status: 'success', answer: 'The phrase Example Journalized is different.', citations: ['https://example.com.evil.invalid/'] },
    { ...base, id: 'c', surface: 'consumer-fixture', status: 'success', answer: 'Other Journal is another option.', citations: ['https://docs.example.com/'] },
    { ...base, id: 'd', status: 'error', error: 'Collection unavailable' },
  ];
  const raw = samples.map((sample) => JSON.stringify(sample)).join('\n') + '\n';
  const input = join(target, 'responses.jsonl');
  const output = join(target, 'visibility-results');
  await writeFile(input, raw);
  const result = run(['visibility', '--config', join(target, '.geo/config.yaml'), '--input', input, '--output', output]);
  assert.equal(result.status, 0, result.stderr);
  const report = await json(join(output, 'visibility.json'));
  const data = record(report.data);
  const totals = record(data.totals);
  assert.equal(totals.attempted, 4);
  assert.equal(totals.successful, 3);
  assert.equal(totals.failed, 1);
  assert.equal(totals.coverage, 0.75);
  assert.equal(totals.mentionRate, 1 / 3);
  assert.equal(totals.citationRate, 2 / 3);
  assert.equal(totals.recommendationRate, null);
  assert.deepEqual(totals.competitors, { 'Other Journal': 1 });
  assert.ok(Array.isArray(data.groups));
  assert.equal(data.groups.length, 2);
  assert.equal(await readFile(join(output, 'evidence/responses.jsonl'), 'utf8'), raw);
});

test('visibility returns null rates for empty or entirely failed sample sets', async (t) => {
  const target = await fixture(t);
  const input = join(target, 'responses.jsonl');
  const output = join(target, 'visibility-results');
  const args = ['visibility', '--config', join(target, '.geo/config.yaml'), '--input', input, '--output', output];
  await writeFile(input, '');
  assert.equal(run(args).status, 0);
  let totals = record(record((await json(join(output, 'visibility.json'))).data).totals);
  assert.equal(totals.mentionRate, null);
  assert.equal(totals.coverage, null);
  await writeFile(input, JSON.stringify({ id: 'error', provider: 'fixture', surface: 'fixture', model: 'none', locale: 'en-GB', query: 'Question', observedAt: '2026-10-16T12:00:00Z', status: 'error', error: 'No response' }));
  assert.equal(run(args).status, 0);
  totals = record(record((await json(join(output, 'visibility.json'))).data).totals);
  assert.equal(totals.mentionRate, null);
  assert.equal(totals.citationRate, null);
  assert.equal(totals.coverage, 0);
});

test('visibility rejects malformed records and duplicate sample IDs before writing evidence', async (t) => {
  const target = await fixture(t);
  const input = join(target, 'responses.jsonl');
  const output = join(target, 'visibility-results');
  const sample = { id: 'same', provider: 'fixture', surface: 'fixture', model: 'none', locale: 'en-GB', query: 'Question', observedAt: '2026-10-16T12:00:00Z', status: 'success', answer: 'Answer', citations: [] };
  const args = ['visibility', '--config', join(target, '.geo/config.yaml'), '--input', input, '--output', output];
  for (const raw of ['{broken}', JSON.stringify({ ...sample, citations: ['javascript:alert(1)'] }), `${JSON.stringify(sample)}\n${JSON.stringify(sample)}`]) {
    await writeFile(input, raw);
    assert.equal(run(args).status, 2);
    await assert.rejects(readFile(join(output, 'evidence/responses.jsonl')));
  }
});

test('visibility rejects impossible calendar timestamps instead of normalizing them', async (t) => {
  const target = await fixture(t);
  const input = join(target, 'responses.jsonl');
  await writeFile(input, JSON.stringify({ id: 'date', provider: 'fixture', surface: 'fixture', model: 'none', locale: 'en-GB', query: 'Question', observedAt: '2026-02-30T12:00:00Z', status: 'error', error: 'No response' }));
  assert.equal(run(['visibility', '--config', join(target, '.geo/config.yaml'), '--input', input, '--output', join(target, 'output')]).status, 2);
});
