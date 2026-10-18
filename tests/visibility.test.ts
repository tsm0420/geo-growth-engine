import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { parse, stringify } from 'yaml';
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

test('visibility counts underscore-delimited names and aliases while excluding embedded letters and numbers', async (t) => {
  const target = await fixture(t);
  const productPath = join(target, '.geo/product.yaml');
  const product = record(parse(await readFile(productPath, 'utf8')));
  product.aliases = ['Daily+ Notes'];
  await writeFile(productPath, stringify(product));
  const context = { provider: 'fictional-fixture', surface: 'first', model: 'none', locale: 'en-GB', query: 'Fictional mentions?', observedAt: '2026-10-17T12:00:00Z', example: true };
  const samples = [
    { ...context, id: 'underscore', status: 'success', answer: '_Example Journal_ and _Other Journal_', citations: ['https://example.com/'] },
    { ...context, id: 'alias', surface: 'second', status: 'success', answer: '_DAILY+ NOTES_', citations: [] },
    { ...context, id: 'letters', status: 'success', answer: '\u6587Example Journal\u6587 \u6587Other Journal\u6587', citations: [] },
    { ...context, id: 'numbers', status: 'success', answer: '1Example Journal2 1Other Journal2', citations: [] },
    { ...context, id: 'one-sided', status: 'success', answer: '1Example Journal_ _Example Journal2 1Other Journal_ _Other Journal2', citations: [] },
    { ...context, id: 'punctuation', surface: 'second', status: 'success', answer: '(Example Journal), Other Journal.', citations: [] },
    { ...context, id: 'absent', status: 'success', answer: 'No matching brand.', citations: [] },
    { ...context, id: 'error', status: 'error', error: '_Example Journal_ _Other Journal_: no response' },
  ];
  const raw = samples.map((sample) => JSON.stringify(sample)).join('\n') + '\n';
  const input = join(target, 'boundary.jsonl');
  const output = join(target, 'boundary-results');
  await writeFile(input, raw);
  const result = run(['visibility', '--config', join(target, '.geo/config.yaml'), '--input', input, '--output', output]);
  assert.equal(result.status, 0, result.stderr);
  const report = await json(join(output, 'visibility.json'));
  const data = record(report.data);
  const totals = record(data.totals);
  assert.equal(totals.attempted, 8);
  assert.equal(totals.successful, 7);
  assert.equal(totals.failed, 1);
  assert.equal(totals.coverage, 7 / 8);
  assert.equal(totals.mentionRate, 3 / 7);
  assert.equal(totals.citationRate, 1 / 7);
  assert.equal(totals.recommendationRate, null);
  assert.deepEqual(totals.competitors, { 'Other Journal': 2 });
  assert.ok(Array.isArray(data.groups));
  assert.equal(data.groups.length, 2);
  const first = record(data.groups[0]);
  const second = record(data.groups[1]);
  assert.equal(first.surface, 'first');
  assert.equal(first.successful, 5);
  assert.equal(first.failed, 1);
  assert.equal(first.mentionRate, 1 / 5);
  assert.deepEqual(first.competitors, { 'Other Journal': 1 });
  assert.equal(second.surface, 'second');
  assert.equal(second.successful, 2);
  assert.equal(second.mentionRate, 1);
  assert.deepEqual(second.competitors, { 'Other Journal': 1 });
  assert.equal(report.example, true);
  assert.equal(data.sha256, createHash('sha256').update(raw).digest('hex'));
  assert.equal(await readFile(join(output, 'evidence/responses.jsonl'), 'utf8'), raw);
});
