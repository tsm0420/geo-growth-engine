import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { link, mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import test from 'node:test';
import { fixture, findings, json, record, run } from './helpers.ts';

function sample(id: string, answer: string, citations: string[] = []) {
  return { id, provider: 'fixture', surface: 'API', model: 'fictional', locale: 'en-GB', query: 'Daily journal?', observedAt: '2026-10-18T10:00:00Z', example: true, status: 'success', answer, citations };
}

async function observation(target: string, name: string, samples: unknown[]) {
  const input = join(target, `${name}.jsonl`);
  const bytes = samples.map((value) => JSON.stringify(value)).join('\n');
  await writeFile(input, bytes);
  const result = run(['visibility', '--config', join(target, '.geo/config.yaml'), '--input', input, '--output', join(target, name)]);
  assert.equal(result.status, 0, result.stderr);
  assert.equal(await readFile(join(target, name, 'evidence/responses.jsonl'), 'utf8'), bytes);
  return join(target, name, 'visibility.json');
}

test('explicit visibility comparison shows supplied totals and percentage-point differences while retaining sources', async (t) => {
  const target = await fixture(t);
  const before = await observation(target, 'before', [sample('b1', 'Example Journal', ['https://example.com/notes']), sample('b2', 'Example Journal', ['https://example.com'])]);
  const after = await observation(target, 'after', [sample('a1', 'Other Journal'), sample('a2', 'Other Journal')]);
  const beforeBytes = await readFile(before);
  const afterBytes = await readFile(after);
  const output = join(target, 'comparison');
  const result = run(['compare', '--before', before, '--after', after, '--visibility-metrics', '--output', output]);
  assert.equal(result.status, 0, result.stderr);
  const report = await json(join(output, 'compare.json'));
  const data = record(report.data);
  assert.deepEqual(data.visibilityMetrics, [
    { metric: 'attempted', unit: 'count', before: 2, after: 2, difference: 0 },
    { metric: 'successful', unit: 'count', before: 2, after: 2, difference: 0 },
    { metric: 'failed', unit: 'count', before: 0, after: 0, difference: 0 },
    { metric: 'coverage', unit: 'fraction', before: 1, after: 1, difference: 0 },
    { metric: 'mentionRate', unit: 'fraction', before: 1, after: 0, difference: -1 },
    { metric: 'citationRate', unit: 'fraction', before: 1, after: 0, difference: -1 },
  ]);
  assert.deepEqual(data.counts, { added: 0, removed: 0, 'status-changed': 0, 'details-changed': 0, unchanged: 3 });
  assert.deepEqual(report.summary, { pass: 1, fail: 0, unknown: 9 });
  assert.equal(data.comparability, 'unknown');
  assert.equal(report.example, true);
  for (const [side, bytes] of [['before', beforeBytes], ['after', afterBytes]] as const) {
    assert.deepEqual(record(data[side]).report, JSON.parse(bytes.toString()));
    assert.equal(record(data[side]).sha256, createHash('sha256').update(bytes).digest('hex'));
  }
  assert.deepEqual(await readFile(before), beforeBytes);
  assert.deepEqual(await readFile(after), afterBytes);
  const metrics = findings(report).filter((item) => String(item.id).startsWith('visibility-metric:'));
  assert.equal(metrics.length, 6);
  assert.ok(metrics.every((item) => item.status === 'unknown'));
  const markdown = await readFile(join(output, 'compare.md'), 'utf8');
  assert.match(markdown, /before: 100\.00%; after: 0\.00%; difference: -100\.00 percentage points/);
  assert.match(markdown, /unverified/);
  assert.match(markdown, /FICTIONAL EXAMPLE/);
});

const validTotals = { attempted: 2, successful: 1, failed: 1, coverage: 0.5, mentionRate: 0, citationRate: 1 };
function supplied(data: unknown, overrides: Record<string, unknown> = {}) {
  return { schemaVersion: 1, kind: 'visibility', example: true, scope: 'Fictional supplied observation', generatedAt: '2026-10-18T10:00:00Z', findings: [], summary: { pass: 0, fail: 0, unknown: 0 }, data, ...overrides };
}
async function suppliedPair(target: string, before: unknown, after: unknown) {
  const beforePath = join(target, 'before.json');
  const afterPath = join(target, 'after.json');
  await writeFile(beforePath, JSON.stringify(before, null, 2));
  await writeFile(afterPath, JSON.stringify(after));
  return ['compare', '--before', beforePath, '--after', afterPath, '--output', join(target, 'comparison'), '--visibility-metrics'];
}

const invalidValues: [string, unknown][] = [
    ['attempted', '2'], ['attempted', -1], ['successful', 0.5], ['failed', 9007199254740992],
    ['successful', 2], ['failed', 0], ['coverage', 1], ['coverage', null], ['mentionRate', null],
    ['citationRate', -0.1], ['mentionRate', 1.1], ['citationRate', '0'], ['mentionRate', undefined],
];
const invalidTotals: [string, unknown, string][] = [
  ['missing data', null, 'data'], ['missing totals', {}, 'totals'], ['array totals', { totals: [] }, 'totals'],
  ...invalidValues.map(([key, value]): [string, unknown, string] => {
    return [`invalid ${key} ${String(value)}`, { totals: { ...validTotals, [key]: value } }, key];
  }),
  ['non-null zero-attempt coverage', { totals: { attempted: 0, successful: 0, failed: 0, coverage: 0, mentionRate: null, citationRate: null } }, 'coverage'],
  ['non-null zero-success mention', { totals: { attempted: 1, successful: 0, failed: 1, coverage: 0, mentionRate: 0, citationRate: null } }, 'mentionRate'],
  ['non-null zero-success citation', { totals: { attempted: 1, successful: 0, failed: 1, coverage: 0, mentionRate: null, citationRate: 0 } }, 'citationRate'],
];
for (const [label, data, field] of invalidTotals) {
  test(`explicit visibility comparison rejects ${label} before changing output`, async (t) => {
    const target = await fixture(t);
    const good = supplied({ totals: validTotals });
    const bad = supplied(data);
    const output = join(target, 'comparison');
    await mkdir(output);
    await writeFile(join(output, 'compare.json'), 'previous JSON');
    await writeFile(join(output, 'compare.md'), 'previous Markdown');
    for (const side of ['before', 'after']) {
      const args = await suppliedPair(target, side === 'before' ? bad : good, side === 'after' ? bad : good);
      const result = run(args);
      assert.equal(result.status, 2, result.stderr);
      assert.match(result.stderr, new RegExp(`${side} data`));
      assert.match(result.stderr, new RegExp(field));
      assert.equal(await readFile(join(output, 'compare.json'), 'utf8'), 'previous JSON');
      assert.equal(await readFile(join(output, 'compare.md'), 'utf8'), 'previous Markdown');
    }
  });
}

test('visibility metric flag is rejected on other commands before installation or report writes', async (t) => {
  const target = await fixture(t);
  for (const command of ['init', 'install', 'audit', 'aso', 'plan', 'visibility', 'absent']) {
    const result = run([command, '--visibility-metrics', '--target', target, '--config', join(target, '.geo/config.yaml'), '--input', join(target, 'absent.jsonl'), '--output', join(target, 'output')]);
    assert.equal(result.status, 2, result.stderr);
    assert.match(result.stderr, /--visibility-metrics is only supported by compare/);
  }
  await assert.rejects(readFile(join(target, 'output/audit.json')), { code: 'ENOENT' });
  await assert.rejects(readFile(join(target, '.agents/skills/geo-orchestrator/SKILL.md')), { code: 'ENOENT' });
});

test('empty, all-error and mixed visibility imports preserve nulls, zeros, counts and precision', async (t) => {
  const target = await fixture(t);
  const failure = { ...sample('error', 'unused'), status: 'error', error: 'Recorded fixture collection failure' };
  const empty = await observation(target, 'empty', []);
  const errors = await observation(target, 'errors', [failure]);
  const mixed = await observation(target, 'mixed', [sample('one', 'Other Journal'), failure, { ...failure, id: 'two' }]);
  const more = await observation(target, 'more', [sample('one', 'Example Journal', ['https://example.com']), sample('two', 'Other Journal'), failure]);
  const cases: [string, string, string, unknown[]][] = [
    ['empty-errors', empty, errors, [
      { metric: 'attempted', unit: 'count', before: 0, after: 1, difference: 1 },
      { metric: 'successful', unit: 'count', before: 0, after: 0, difference: 0 },
      { metric: 'failed', unit: 'count', before: 0, after: 1, difference: 1 },
      { metric: 'coverage', unit: 'fraction', before: null, after: 0, difference: null },
      { metric: 'mentionRate', unit: 'fraction', before: null, after: null, difference: null },
      { metric: 'citationRate', unit: 'fraction', before: null, after: null, difference: null },
    ]],
    ['errors-mixed', errors, mixed, [
      { metric: 'attempted', unit: 'count', before: 1, after: 3, difference: 2 },
      { metric: 'successful', unit: 'count', before: 0, after: 1, difference: 1 },
      { metric: 'failed', unit: 'count', before: 1, after: 2, difference: 1 },
      { metric: 'coverage', unit: 'fraction', before: 0, after: 0.3333333333333333, difference: 0.3333333333333333 },
      { metric: 'mentionRate', unit: 'fraction', before: null, after: 0, difference: null },
      { metric: 'citationRate', unit: 'fraction', before: null, after: 0, difference: null },
    ]],
    ['mixed-more', mixed, more, [
      { metric: 'attempted', unit: 'count', before: 3, after: 3, difference: 0 },
      { metric: 'successful', unit: 'count', before: 1, after: 2, difference: 1 },
      { metric: 'failed', unit: 'count', before: 2, after: 1, difference: -1 },
      { metric: 'coverage', unit: 'fraction', before: 0.3333333333333333, after: 0.6666666666666666, difference: 0.3333333333333333 },
      { metric: 'mentionRate', unit: 'fraction', before: 0, after: 0.5, difference: 0.5 },
      { metric: 'citationRate', unit: 'fraction', before: 0, after: 0.5, difference: 0.5 },
    ]],
    ['mixed-errors', mixed, errors, [
      { metric: 'attempted', unit: 'count', before: 3, after: 1, difference: -2 },
      { metric: 'successful', unit: 'count', before: 1, after: 0, difference: -1 },
      { metric: 'failed', unit: 'count', before: 2, after: 1, difference: -1 },
      { metric: 'coverage', unit: 'fraction', before: 0.3333333333333333, after: 0, difference: -0.3333333333333333 },
      { metric: 'mentionRate', unit: 'fraction', before: 0, after: null, difference: null },
      { metric: 'citationRate', unit: 'fraction', before: 0, after: null, difference: null },
    ]],
  ];
  for (const [name, before, after, expected] of cases) {
    const output = join(target, name);
    const result = run(['compare', '--before', before, '--after', after, '--visibility-metrics', '--output', output]);
    assert.equal(result.status, 0, result.stderr);
    const report = await json(join(output, 'compare.json'));
    assert.deepEqual(record(report.data).visibilityMetrics, expected);
    assert.ok(findings(report).filter((item) => String(item.id).startsWith('visibility-metric:')).every((item) => item.status === 'unknown'));
  }
  const markdown = await readFile(join(target, 'errors-mixed/compare.md'), 'utf8');
  assert.match(markdown, /before: 0\.00%; after: 33\.33%; difference: 33\.33 percentage points/);
  assert.match(markdown, /before: null \(unavailable\); after: 0\.00%; difference: null/);
});

test('default mode keeps opaque data while explicit mode validates report compatibility and nonfinite JSON numbers', async (t) => {
  const target = await fixture(t);
  const args = await suppliedPair(target, supplied(null), supplied(null));
  assert.equal(run(args.filter((x) => x !== '--visibility-metrics')).status, 0);
  const data = record((await json(join(target, 'comparison/compare.json'))).data);
  assert.equal(Object.hasOwn(data, 'visibilityMetrics'), false);
  for (const overrides of [{ kind: 'audit' }, { example: false }, { schemaVersion: 2 }]) {
    const invalid = await suppliedPair(target, supplied({ totals: validTotals }), supplied({ totals: validTotals }, overrides));
    assert.equal(run(invalid).status, 2);
  }
  const kinds = await suppliedPair(target, supplied(null, { kind: 'audit' }), supplied(null, { kind: 'audit' }));
  const kindResult = run(kinds);
  assert.equal(kindResult.status, 2);
  assert.match(kindResult.stderr, /requires two visibility reports/);
  const finite = await suppliedPair(target, supplied({ totals: validTotals }), supplied({ totals: validTotals }));
  const afterPath = join(target, 'after.json');
  await writeFile(afterPath, JSON.stringify(supplied({ totals: validTotals })).replace('"citationRate":1', '"citationRate":1e400'));
  const nonfinite = run(finite);
  assert.equal(nonfinite.status, 2);
  assert.match(nonfinite.stderr, /after data.totals.citationRate/);
});

test('explicit mode retains later failure exits, opaque extensions and unavailable-rate reasons', async (t) => {
  const target = await fixture(t);
  const before = supplied({ totals: validTotals, note: 'preserve arbitrary extension' });
  const after = supplied({ totals: validTotals }, { findings: [{ id: 'supplied-failure', status: 'fail', evidence: 'literal', action: 'inspect' }], summary: { pass: 0, fail: 1, unknown: 0 } });
  const args = await suppliedPair(target, before, after);
  const result = run(args);
  assert.equal(result.status, 1, result.stderr);
  const report = await json(join(target, 'comparison/compare.json'));
  assert.deepEqual(report.summary, { pass: 0, fail: 1, unknown: 7 });
  assert.deepEqual(record(record(report.data).before).report, before);
});

test('explicit visibility comparison protects direct input paths, hardlinks and later output conflicts', async (t) => {
  const target = await fixture(t);
  const good = supplied({ totals: validTotals });
  const args = await suppliedPair(target, good, good);
  const beforePath = join(target, 'before.json');
  const original = await readFile(beforePath);
  await writeFile(join(target, 'compare.json'), original);
  const direct = [...args];
  direct[2] = join(target, 'compare.json');
  direct[6] = target;
  assert.equal(run(direct).status, 2);
  assert.deepEqual(await readFile(join(target, 'compare.json')), original);
  await assert.rejects(readFile(join(target, 'compare.md')), { code: 'ENOENT' });
  for (const name of ['before', 'after']) {
    const output = join(target, `alias-${name}`);
    await mkdir(output);
    const path = join(target, `${name}.json`);
    const bytes = await readFile(path);
    await link(path, join(output, 'compare.json'));
    args[6] = output;
    assert.equal(run(args).status, 2);
    assert.deepEqual(await readFile(path), bytes);
    await assert.rejects(readFile(join(output, 'compare.md')), { code: 'ENOENT' });
  }
  const output = join(target, 'conflict');
  await mkdir(output);
  await writeFile(join(output, 'compare.json'), 'previous report');
  await mkdir(join(output, 'compare.md'));
  args[6] = output;
  assert.equal(run(args).status, 2);
  assert.equal(await readFile(join(output, 'compare.json'), 'utf8'), 'previous report');
});
