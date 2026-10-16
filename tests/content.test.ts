import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { parse, stringify } from 'yaml';
import { findings, fixture, json, record, run } from './helpers.ts';

test('aso checks supplied listing field limits and discloses unverified semantic claims', async (t) => {
  const target = await fixture(t);
  const output = join(target, 'aso-results');
  const result = run(['aso', '--config', join(target, '.geo/config.yaml'), '--output', output]);
  assert.equal(result.status, 0, result.stderr);
  const report = await json(join(output, 'aso.json'));
  assert.equal(findings(report).find((f) => f.id === 'ios.name')?.status, 'pass');
  assert.equal(findings(report).find((f) => f.id === 'android.shortDescription')?.status, 'pass');
  assert.equal(findings(report).find((f) => f.id === 'ios.semantic-claims')?.status, 'unknown');
});

test('aso accepts exact platform boundaries and keeps missing listings unknown', async (t) => {
  const target = await fixture(t);
  const path = join(target, '.geo/product.yaml');
  const product = record(parse(await readFile(path, 'utf8')));
  const listings = record(product.listings);
  const ios = record(listings.ios);
  ios.name = 'N'.repeat(30);
  ios.subtitle = 'S'.repeat(30);
  ios.keywords = 'k'.repeat(100);
  ios.description = 'd'.repeat(4000);
  delete listings.android;
  await writeFile(path, stringify(product));
  const output = join(target, 'aso-results');
  assert.equal(run(['aso', '--config', join(target, '.geo/config.yaml'), '--output', output]).status, 0);
  const report = await json(join(output, 'aso.json'));
  assert.equal(findings(report).find((f) => f.id === 'ios.keywords')?.status, 'pass');
  assert.equal(findings(report).find((f) => f.id === 'android.listing')?.status, 'unknown');
});

test('plan preserves query/fact sources and marks unsupported content as a research gap', async (t) => {
  const target = await fixture(t);
  await writeFile(join(target, '.geo/queries.yaml'), stringify({ version: 1, queries: [
    { id: 'unsupported', query: 'Does it offer therapy?', intent: 'faq', priority: 1, factIds: [] },
    { id: 'supported', query: 'How do I save journal entries?', intent: 'use-case', priority: 2, factIds: ['daily-notes'] },
  ] }));
  const output = join(target, 'plan-results');
  const result = run(['plan', '--config', join(target, '.geo/config.yaml'), '--output', output]);
  assert.equal(result.status, 0, result.stderr);
  const report = await json(join(output, 'plan.json'));
  const data = record(report.data);
  assert.ok(Array.isArray(data.opportunities));
  assert.ok(Array.isArray(data.researchGaps));
  assert.equal(record(data.researchGaps[0]).queryId, 'unsupported');
  const opportunity = record(data.opportunities[0]);
  assert.equal(opportunity.queryId, 'supported');
  assert.deepEqual(opportunity.facts, [{ id: 'daily-notes', claim: 'Save daily journal entries.', source: 'https://example.com/features/daily-notes' }]);
  assert.match(await readFile(join(output, 'plan.md'), 'utf8'), /not independently verified/);
});

test('aso measures UTF-8 keyword bytes separately and rejects one-character Apple names', async (t) => {
  const target = await fixture(t);
  const path = join(target, '.geo/product.yaml');
  const product = record(parse(await readFile(path, 'utf8')));
  const ios = record(record(product.listings).ios);
  ios.keywords = '\u65e5'.repeat(34);
  ios.name = 'X';
  await writeFile(path, stringify(product));
  const output = join(target, 'aso-results');
  assert.equal(run(['aso', '--config', join(target, '.geo/config.yaml'), '--output', output]).status, 1);
  const report = await json(join(output, 'aso.json'));
  assert.equal(findings(report).find((f) => f.id === 'ios.keywords')?.status, 'fail');
  assert.match(String(findings(report).find((f) => f.id === 'ios.keywords')?.evidence), /102 UTF-8 bytes/);
  assert.equal(findings(report).find((f) => f.id === 'ios.name')?.status, 'fail');
});
