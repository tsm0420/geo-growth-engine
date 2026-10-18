import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import test from 'node:test';
import { fixture, findings, json, record, run } from './helpers.ts';

function tableBody(markdown: string): string {
  const body = markdown.split('| --- | --- | --- | --- |\n')[1]?.split('\n\n## Details')[0];
  assert.ok(body);
  return body;
}

test('compare flattens Markdown field line endings while retaining literal source strings and bytes', async (t) => {
  const target = await fixture(t);
  const finding = { id: 'check\ridentity', status: 'pass', evidence: 'first\r\nsecond|<&>', action: 'inspect\rsource' };
  const source = {
    schemaVersion: 1, kind: 'audit', example: true, generatedAt: '2026-10-18T10:00:00Z', scope: 'supplied\r\nscope',
    findings: [finding], summary: { pass: 1, fail: 0, unknown: 0 }, data: { note: 'literal\rdata' },
  };
  const beforePath = join(target, 'before.json');
  const afterPath = join(target, 'after.json');
  const before = JSON.stringify(source, null, 2);
  const after = JSON.stringify(source);
  await writeFile(beforePath, before);
  await writeFile(afterPath, after);
  const output = join(target, 'comparison');
  const result = run(['compare', '--before', beforePath, '--after', afterPath, '--output', output]);
  assert.equal(result.status, 0, result.stderr);
  const report = await json(join(output, 'compare.json'));
  assert.deepEqual(report.summary, { pass: 1, fail: 0, unknown: 1 });
  assert.equal(findings(report)[0]?.id, 'finding:check\ridentity');
  const data = record(report.data);
  assert.deepEqual(record(data.before).report, source);
  assert.deepEqual(record(data.after).report, source);
  assert.equal(record(data.before).sha256, createHash('sha256').update(before).digest('hex'));
  assert.equal(record(data.after).sha256, createHash('sha256').update(after).digest('hex'));
  assert.equal(await readFile(beforePath, 'utf8'), before);
  assert.equal(await readFile(afterPath, 'utf8'), after);
  const markdown = await readFile(join(output, 'compare.md'), 'utf8');
  assert.doesNotMatch(markdown, /\r/);
  const body = tableBody(markdown);
  assert.equal(body.split(/\r\n?|\n/).length, 2);
  assert.ok(body.startsWith('| finding:check identity | pass |'));
  assert.match(body, /evidence=first second\\\|&lt;&amp;&gt;; action=inspect source/);
});

const endings: [string, string][] = [['LF', '\n'], ['CR', '\r'], ['CRLF', '\r\n']];
for (const [label, ending] of endings) {
  test(`plan keeps ${label} supplied text in one Markdown finding row and preserves JSON`, async (t) => {
    const target = await fixture(t);
    const id = `first${ending}second|<&>`;
    const query = `question${ending}continued?`;
    const input = join(target, '.geo/queries.yaml');
    const bytes = JSON.stringify({ version: 1, queries: [{ id, query, intent: 'faq', priority: 1, factIds: [] }] });
    await writeFile(input, bytes);
    const output = join(target, 'report');
    const result = run(['plan', '--config', join(target, '.geo/config.yaml'), '--output', output]);
    assert.equal(result.status, 0, result.stderr);
    const report = await json(join(output, 'plan.json'));
    assert.deepEqual(report.summary, { pass: 0, fail: 0, unknown: 1 });
    assert.equal(findings(report)[0]?.id, id);
    assert.ok(Array.isArray(record(report.data).researchGaps));
    assert.deepEqual(record(report.data).researchGaps, [{ queryId: id, query, reason: 'No supporting product fact linked.' }]);
    assert.equal(await readFile(input, 'utf8'), bytes);
    const markdown = await readFile(join(output, 'plan.md'), 'utf8');
    assert.doesNotMatch(markdown, /\r/);
    const body = tableBody(markdown);
    assert.equal(body.split(/\r\n?|\n/).length, 1);
    assert.ok(body.startsWith('| first second\\|&lt;&amp;&gt; | unknown |'));
    assert.match(body, /question continued\?/);
  });
}
