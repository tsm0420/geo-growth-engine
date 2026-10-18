import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import test from 'node:test';
import { fixture, run } from './helpers.ts';

function corrupted(bytes: Buffer, text: string, invalid = Buffer.from([0xff])): Buffer {
  const marker = Buffer.from(text);
  const offset = bytes.indexOf(marker);
  assert.ok(offset >= 0);
  return Buffer.concat([bytes.subarray(0, offset), invalid, bytes.subarray(offset + marker.length)]);
}

test('plan rejects malformed product bytes before replacing existing artifacts', async (t) => {
  const target = await fixture(t);
  const input = join(target, '.geo/product.yaml');
  const raw = corrupted(await readFile(input), 'Save daily journal entries.');
  await writeFile(input, raw);
  const output = join(target, 'results');
  await mkdir(output);
  await writeFile(join(output, 'plan.json'), 'Existing JSON');
  await writeFile(join(output, 'plan.md'), 'Existing Markdown');
  const result = run(['plan', '--config', join(target, '.geo/config.yaml'), '--output', output]);
  assert.equal(result.status, 2, result.stderr);
  assert.equal(result.stderr.trim(), `YAML input ${input} must use valid UTF-8`);
  assert.equal(result.stdout, '');
  assert.equal(await readFile(join(output, 'plan.json'), 'utf8'), 'Existing JSON');
  assert.equal(await readFile(join(output, 'plan.md'), 'utf8'), 'Existing Markdown');
  assert.deepEqual(await readFile(input), raw);
});
