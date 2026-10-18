import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { link, mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import test from 'node:test';
import { fixture, findings, json, record, run } from './helpers.ts';
import type { Finding } from '../src/report.ts';

function finding(id: string, status: Finding['status'], evidence = 'recorded evidence', action = 'inspect input'): Finding {
  return { id, status, evidence, action };
}

function document(items: Finding[], overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    schemaVersion: 1, kind: 'audit', generatedAt: '2026-10-18T10:00:00Z', example: true, scope: 'Fictional local fixture',
    findings: items,
    summary: { pass: items.filter((x) => x.status === 'pass').length, fail: items.filter((x) => x.status === 'fail').length, unknown: items.filter((x) => x.status === 'unknown').length },
    data: null, ...overrides,
  };
}

async function pair(target: string, before: unknown, after: unknown) {
  const beforePath = join(target, 'before.json');
  const afterPath = join(target, 'after.json');
  await writeFile(beforePath, JSON.stringify(before, null, 2));
  await writeFile(afterPath, JSON.stringify(after));
  return ['compare', '--before', beforePath, '--after', afterPath, '--output', join(target, 'comparison')];
}

test('compare retains real audit observations after a local title fix', async (t) => {
  const target = await fixture(t);
  const config = join(target, '.geo/config.yaml');
  const html = join(target, 'public/index.html');
  const original = await readFile(html, 'utf8');
  await writeFile(html, original.replace(/<title>[\s\S]*?<\/title>/, ''));
  assert.equal(run(['audit', '--config', config, '--output', join(target, 'before')]).status, 1);
  await writeFile(html, original);
  assert.equal(run(['audit', '--config', config, '--output', join(target, 'after')]).status, 0);
  const beforePath = join(target, 'before/audit.json');
  const afterPath = join(target, 'after/audit.json');
  const beforeBytes = await readFile(beforePath);
  const afterBytes = await readFile(afterPath);
  const output = join(target, 'comparison');
  const result = run(['compare', '--before', beforePath, '--after', afterPath, '--output', output]);
  assert.equal(result.status, 0, result.stderr);
  const report = await json(join(output, 'compare.json'));
  assert.equal(report.kind, 'compare');
  assert.equal(report.example, true);
  const data = record(report.data);
  assert.ok(Array.isArray(data.changes));
  const title = data.changes.map((x: unknown) => record(x)).find((x) => x.id === 'index.html:title');
  assert.ok(title);
  assert.equal(title.change, 'status-changed');
  assert.equal(record(title.before).status, 'fail');
  assert.equal(record(title.after).status, 'pass');
  assert.deepEqual(record(data.before).report, JSON.parse(beforeBytes.toString()));
  assert.deepEqual(record(data.after).report, JSON.parse(afterBytes.toString()));
  assert.equal(record(data.before).sha256, createHash('sha256').update(beforeBytes).digest('hex'));
  assert.equal(record(data.after).sha256, createHash('sha256').update(afterBytes).digest('hex'));
  assert.deepEqual(await readFile(beforePath), beforeBytes);
  assert.deepEqual(await readFile(afterPath), afterBytes);
  assert.equal(findings(report).find((x) => x.id === 'comparison-scope')?.status, 'unknown');
  const markdown = await readFile(join(output, 'compare.md'), 'utf8');
  assert.match(markdown, /FICTIONAL EXAMPLE/);
  assert.match(markdown, /status-changed/);
  assert.match(markdown, /unverified/);
});

test('compare classifies literal categories, preserves removed failures and exact sorted IDs', async (t) => {
  const target = await fixture(t);
  const args = await pair(target, document([
    finding('removed', 'fail'), finding('status', 'unknown'), finding('__proto__', 'pass'),
    finding('a', 'pass', 'old evidence'), finding('A', 'pass', 'same', 'old action'), finding(' a ', 'unknown'),
  ]), document([
    finding('status', 'pass'), finding('__proto__', 'pass'), finding('a', 'pass', 'new evidence'),
    finding('A', 'pass', 'same', 'new action'), finding(' a ', 'unknown'), finding('added', 'pass'),
  ]));
  const result = run(args);
  assert.equal(result.status, 0, result.stderr);
  const output = await json(join(target, 'comparison/compare.json'));
  const data = record(output.data);
  assert.deepEqual(data.counts, { added: 1, removed: 1, 'status-changed': 1, 'details-changed': 2, unchanged: 2 });
  assert.ok(Array.isArray(data.changes));
  const changes = data.changes.map((x: unknown) => record(x));
  assert.deepEqual(changes.map((x) => [x.id, x.change]), [
    [' a ', 'unchanged'], ['A', 'details-changed'], ['__proto__', 'unchanged'], ['a', 'details-changed'], ['added', 'added'], ['removed', 'removed'], ['status', 'status-changed'],
  ]);
  assert.equal(changes.find((x) => x.id === 'removed')?.after, null);
  assert.equal(findings(output).find((x) => x.id === 'finding:removed')?.status, 'unknown');
  assert.deepEqual(output.summary, { pass: 5, fail: 0, unknown: 3 });
  assert.equal(data.comparability, 'unknown');
});

test('compare retains complete parsed metadata including summary extensions', async (t) => {
  const target = await fixture(t);
  const source = document([finding('empty-text', 'pass', '', '')], {
    summary: { pass: 1, fail: 0, unknown: 0, note: 'supplied extension' }, data: { recorded: 'original data' }, extension: ['retained'],
  });
  const args = await pair(target, source, source);
  const result = run(args);
  assert.equal(result.status, 0, result.stderr);
  const data = record((await json(join(target, 'comparison/compare.json'))).data);
  assert.deepEqual(record(data.before).report, source);
  assert.deepEqual(record(data.after).report, source);
});

for (const before of ['pass', 'fail', 'unknown'] as const) {
  for (const after of ['pass', 'fail', 'unknown'] as const) {
    test(`compare preserves ${before} to ${after} and the after failure exit`, async (t) => {
      const target = await fixture(t);
      const args = await pair(target, document([finding('check', before)]), document([finding('check', after)]));
      const result = run(args);
      assert.equal(result.status, after === 'fail' ? 1 : 0, result.stderr);
      const output = await json(join(target, 'comparison/compare.json'));
      const data = record(output.data);
      assert.ok(Array.isArray(data.changes));
      const item = record(data.changes[0]);
      assert.equal(item.change, before === after ? 'unchanged' : 'status-changed');
      assert.equal(record(item.before).status, before);
      assert.equal(record(item.after).status, after);
      assert.equal(findings(output).find((x) => x.id === 'finding:check')?.status, after);
    });
  }
}

for (const kind of ['audit', 'aso', 'plan', 'visibility']) {
  test(`compare accepts empty ${kind} observations without configuration and keeps scope unknown`, async (t) => {
    const target = await fixture(t);
    const args = await pair(target, document([], { kind, example: false }), document([], { kind, example: false }));
    const result = run(args);
    assert.equal(result.status, 0, result.stderr);
    const output = await json(join(target, 'comparison/compare.json'));
    assert.equal(output.example, false);
    assert.deepEqual(output.summary, { pass: 0, fail: 0, unknown: 1 });
    const data = record(output.data);
    assert.deepEqual(data.counts, { added: 0, removed: 0, 'status-changed': 0, 'details-changed': 0, unchanged: 0 });
    assert.deepEqual(data.changes, []);
    assert.equal(record(record(data.before).report).kind, kind);
    assert.doesNotMatch(await readFile(join(target, 'comparison/compare.md'), 'utf8'), /FICTIONAL EXAMPLE/);
  });
}

test('compare rejects missing arguments and missing files without creating reports', async (t) => {
  const target = await fixture(t);
  const args = await pair(target, document([]), document([]));
  for (const flag of ['--before', '--after', '--output']) {
    const index = args.indexOf(flag);
    const partial = args.filter((_x, i) => i !== index && i !== index + 1);
    assert.equal(run(partial).status, 2);
  }
  await writeFile(join(target, 'after.json'), '{ malformed json');
  assert.equal(run(args).status, 2);
  args[2] = join(target, 'absent.json');
  assert.equal(run(args).status, 2);
  await assert.rejects(readFile(join(target, 'comparison/compare.json')), { code: 'ENOENT' });
});

const invalid: [string, unknown][] = [
  ['null report', null], ['array report', []], ['schema version', document([], { schemaVersion: 2 })],
  ['recursive compare', document([], { kind: 'compare' })], ['kind mismatch', document([], { kind: 'plan' })],
  ['example type', document([], { example: 'true' })], ['example mismatch', document([], { example: false })],
  ['empty scope', document([], { scope: ' ' })], ['generatedAt type', document([], { generatedAt: null })],
  ['findings type', document([], { findings: {} })], ['null finding', document([], { findings: [null] })],
  ['empty ID', document([], { findings: [finding('', 'pass')] })],
  ['duplicate ID', document([finding('dup', 'pass'), finding('dup', 'unknown')])],
  ['status type', document([], { findings: [{ id: 'bad', status: 'success', evidence: '', action: '' }] })],
  ['evidence type', document([], { findings: [{ id: 'bad', status: 'pass', evidence: null, action: '' }] })],
  ['action type', document([], { findings: [{ id: 'bad', status: 'pass', evidence: '', action: [] }] })],
  ['summary type', document([], { summary: [] })], ['wrong summary', document([], { summary: { pass: 1, fail: 0, unknown: 0 } })],
  ['noninteger summary', document([], { summary: { pass: 0, fail: 0, unknown: 0.5 } })],
];
for (const [label, value] of invalid) {
  test(`compare rejects ${label} before output writes`, async (t) => {
    const target = await fixture(t);
    const args = await pair(target, document([]), value);
    const result = run(args);
    assert.equal(result.status, 2, result.stderr);
    assert.notEqual(result.stderr.trim(), '');
    await assert.rejects(readFile(join(target, 'comparison/compare.json')), { code: 'ENOENT' });
    await assert.rejects(readFile(join(target, 'comparison/compare.md')), { code: 'ENOENT' });
  });
}

test('compare rejects missing data and validates the before observation too', async (t) => {
  const target = await fixture(t);
  const source = document([]);
  delete source.data;
  const args = await pair(target, source, document([]));
  const result = run(args);
  assert.equal(result.status, 2, result.stderr);
  assert.match(result.stderr, /data field is required/);
  await assert.rejects(readFile(join(target, 'comparison/compare.json')), { code: 'ENOENT' });
});

test('compare protects both input aliases and preflights a later output conflict', async (t) => {
  const target = await fixture(t);
  const args = await pair(target, document([]), document([]));
  const directory = join(target, 'comparison');
  await mkdir(directory);
  for (const input of ['before.json', 'after.json']) {
    const aliased = join(target, `alias-${input}`);
    await mkdir(aliased);
    const inputPath = join(target, input);
    const original = await readFile(inputPath);
    await link(inputPath, join(aliased, 'compare.json'));
    args[6] = aliased;
    assert.equal(run(args).status, 2);
    assert.deepEqual(await readFile(inputPath), original);
    await assert.rejects(readFile(join(aliased, 'compare.md')), { code: 'ENOENT' });
  }
  const previous = 'previous complete report bytes';
  await writeFile(join(directory, 'compare.json'), previous);
  await mkdir(join(directory, 'compare.md'));
  args[6] = directory;
  assert.equal(run(args).status, 2);
  assert.equal(await readFile(join(directory, 'compare.json'), 'utf8'), previous);
});
