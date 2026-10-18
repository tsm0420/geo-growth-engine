import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import test from 'node:test';
import { fixture, json, record, run } from './helpers.ts';

function response(id: string, answer: string): string {
  return JSON.stringify({ id, provider: 'fixture', surface: 'recorded', model: 'fixture', locale: 'en-GB',
    observedAt: '2026-10-18T10:00:00Z', example: true, query: 'Fictional question', status: 'success', answer, citations: [] });
}

function document(id: string): string {
  return JSON.stringify({ schemaVersion: 1, kind: 'audit', example: true, generatedAt: '2026-10-18T10:00:00Z',
    scope: 'Fictional encoding fixture', findings: [{ id, status: 'pass', evidence: 'supplied', action: 'inspect' }],
    summary: { pass: 1, fail: 0, unknown: 0 }, data: null });
}

function insertBytes(text: string, bytes: Buffer): Buffer {
  const [before, after] = text.split('BYTE_MARKER');
  assert.ok(before !== undefined && after !== undefined);
  return Buffer.concat([Buffer.from(before), bytes, Buffer.from(after)]);
}

async function sentinels(output: string, paths: string[]): Promise<void> {
  for (const path of paths) {
    await mkdir(dirname(join(output, path)), { recursive: true });
    await writeFile(join(output, path), `existing ${path}`);
  }
}

async function unchanged(output: string, paths: string[]): Promise<void> {
  for (const path of paths) assert.equal(await readFile(join(output, path), 'utf8'), `existing ${path}`);
}

test('visibility rejects a corrupt later record before replacing reports or evidence', async (t) => {
  const target = await fixture(t);
  const input = join(target, 'responses.jsonl');
  const bytes = insertBytes(`${response('valid', 'Example Journal')}\n${response('corrupt', 'Example Journal BYTE_MARKER')}\n`, Buffer.from([0xff]));
  await writeFile(input, bytes);
  const output = join(target, 'report');
  const paths = ['visibility.json', 'visibility.md', 'evidence/responses.jsonl'];
  await sentinels(output, paths);
  const result = run(['visibility', '--config', join(target, '.geo/config.yaml'), '--input', input, '--output', output]);
  assert.equal(result.status, 2, result.stderr);
  assert.match(result.stderr, /UTF-8/);
  assert.ok(result.stderr.includes(input));
  assert.equal(result.stdout, '');
  await unchanged(output, paths);
  assert.deepEqual(await readFile(input), bytes);
});

for (const side of ['before', 'after']) {
  test(`compare rejects malformed UTF-8 on ${side} without collapsing its ID or replacing reports`, async (t) => {
    const target = await fixture(t);
    const corrupt = insertBytes(document('checkBYTE_MARKER'), Buffer.from([0xff]));
    const valid = Buffer.from(document('check\ufffd'));
    const before = side === 'before' ? corrupt : valid;
    const after = side === 'after' ? corrupt : valid;
    await writeFile(join(target, 'before.json'), before);
    await writeFile(join(target, 'after.json'), after);
    const output = join(target, 'comparison');
    const paths = ['compare.json', 'compare.md'];
    await sentinels(output, paths);
    const result = run(['compare', '--before', join(target, 'before.json'), '--after', join(target, 'after.json'), '--output', output]);
    assert.equal(result.status, 2, result.stderr);
    assert.match(result.stderr, /UTF-8/);
    assert.ok(result.stderr.includes(join(target, `${side}.json`)));
    assert.equal(result.stdout, '');
    await unchanged(output, paths);
    assert.deepEqual(await readFile(join(target, 'before.json')), before);
    assert.deepEqual(await readFile(join(target, 'after.json')), after);
  });
}

const malformed: [string, number[]][] = [
  ['invalid byte', [0xff]], ['truncated', [0xe2, 0x82]], ['overlong', [0xc0, 0xaf]],
  ['encoded surrogate', [0xed, 0xa0, 0x80]], ['above Unicode maximum', [0xf4, 0x90, 0x80, 0x80]],
];
for (const [label, values] of malformed) {
  test(`JSON commands reject ${label} before creating a fresh output directory`, async (t) => {
    const target = await fixture(t);
    const input = join(target, 'responses.jsonl');
    const source = join(target, 'corrupt.json');
    const valid = join(target, 'valid.json');
    const answers = insertBytes(response('sample', 'Example Journal BYTE_MARKER'), Buffer.from(values));
    const report = insertBytes(document('checkBYTE_MARKER'), Buffer.from(values));
    await writeFile(input, answers);
    await writeFile(source, report);
    await writeFile(valid, document('check\ufffd'));
    const commands: string[][] = [
      ['visibility', '--config', join(target, '.geo/config.yaml'), '--input', input],
      ['compare', '--before', source, '--after', valid], ['compare', '--before', valid, '--after', source],
    ];
    for (const [index, args] of commands.entries()) {
      const output = join(target, `fresh-${index}`);
      const result = run([...args, '--output', output]);
      assert.equal(result.status, 2, result.stderr);
      assert.match(result.stderr, /UTF-8/);
      assert.equal(result.stdout, '');
      await assert.rejects(readFile(output), { code: 'ENOENT' });
    }
    assert.deepEqual(await readFile(input), answers);
    assert.deepEqual(await readFile(source), report);
  });
}

for (const escaped of [false, true]) {
  test(`JSON commands retain ${escaped ? 'escaped' : 'literal'} replacement and Unicode text with original byte digests`, async (t) => {
    const target = await fixture(t);
    const text = 'Example Journal \ufffd 👋 e\u0301';
    const encode = (value: string) => Buffer.from(escaped ? value.replaceAll('\ufffd', '\\ufffd') : value);
    const input = join(target, 'responses.jsonl');
    const answers = encode(`${response('sample', text)}\r\n\n`);
    await writeFile(input, answers);
    const output = join(target, 'visibility');
    const imported = run(['visibility', '--config', join(target, '.geo/config.yaml'), '--input', input, '--output', output]);
    assert.equal(imported.status, 0, imported.stderr);
    const data = record((await json(join(output, 'visibility.json'))).data);
    assert.equal(record(data.totals).successful, 1);
    assert.equal(record(data.totals).mentionRate, 1);
    assert.equal(data.sha256, createHash('sha256').update(answers).digest('hex'));
    assert.deepEqual(await readFile(join(output, 'evidence/responses.jsonl')), answers);
    const source = encode(document(text));
    const before = join(target, 'before.json');
    const after = join(target, 'after.json');
    await writeFile(before, source);
    await writeFile(after, source);
    const comparison = join(target, 'comparison');
    const result = run(['compare', '--before', before, '--after', after, '--output', comparison]);
    assert.equal(result.status, 0, result.stderr);
    const compared = record((await json(join(comparison, 'compare.json'))).data);
    assert.equal(record(compared.counts).unchanged, 1);
    for (const side of ['before', 'after']) {
      const retained = record(compared[side]);
      assert.deepEqual(retained.report, JSON.parse(source.toString('utf8')));
      assert.equal(retained.sha256, createHash('sha256').update(source).digest('hex'));
      assert.deepEqual(await readFile(join(target, `${side}.json`)), source);
    }
    assert.deepEqual(await readFile(input), answers);
  });
}

test('JSON commands retain BOM and malformed JSON rejection without output writes', async (t) => {
  const target = await fixture(t);
  const valid = join(target, 'valid.json');
  await writeFile(valid, document('valid'));
  for (const prefix of ['\ufeff', '{invalid}']) {
    const input = join(target, 'input.jsonl');
    const source = join(target, 'source.json');
    await writeFile(input, prefix + response('valid', 'Example Journal'));
    await writeFile(source, prefix + document('valid'));
    const commands: string[][] = [
      ['visibility', '--config', join(target, '.geo/config.yaml'), '--input', input],
      ['compare', '--before', source, '--after', valid], ['compare', '--before', valid, '--after', source],
    ];
    for (const args of commands) {
      const output = join(target, 'absent');
      const result = run([...args, '--output', output]);
      assert.equal(result.status, 2, result.stderr);
      assert.doesNotMatch(result.stderr, /must use valid UTF-8/);
      await assert.rejects(readFile(output), { code: 'ENOENT' });
    }
  }
});

test('visibility retains empty and blank-only inputs with null rates and exact raw evidence', async (t) => {
  const target = await fixture(t);
  for (const text of ['', '\r\n \t\n']) {
    const input = join(target, 'responses.jsonl');
    await writeFile(input, text);
    const output = join(target, 'visibility');
    const result = run(['visibility', '--config', join(target, '.geo/config.yaml'), '--input', input, '--output', output]);
    assert.equal(result.status, 0, result.stderr);
    const data = record((await json(join(output, 'visibility.json'))).data);
    assert.equal(record(data.totals).attempted, 0);
    for (const key of ['coverage', 'mentionRate', 'citationRate']) assert.equal(record(data.totals)[key], null);
    assert.equal(data.sha256, createHash('sha256').update(text).digest('hex'));
    assert.equal(await readFile(join(output, 'evidence/responses.jsonl'), 'utf8'), text);
  }
});
