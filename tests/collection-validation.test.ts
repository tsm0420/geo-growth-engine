import assert from 'node:assert/strict';
import { readFile, readdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { test } from 'node:test';
import { parse, stringify } from 'yaml';
import { findings, fixture, json, record, run } from './helpers.ts';

test('report commands reject explicit null optional collections before writing reports', async (t) => {
  for (const command of ['aso', 'plan', 'visibility']) {
    for (const field of ['aliases', 'competitors', 'listings', 'factIds']) {
      await t.test(`${command}: ${field}`, async (child) => {
        const target = await fixture(child);
        const path = join(target, '.geo/product.yaml');
        const product = record(parse(await readFile(path, 'utf8')));
        if (field === 'factIds') record(record(product.listings).ios).factIds = null;
        else product[field] = null;
        await writeFile(path, stringify(product));
        const output = join(target, 'results');
        const args = [command, '--config', join(target, '.geo/config.yaml'), '--output', output];
        if (command === 'visibility') args.push('--input', join(target, 'visibility.jsonl'));
        const result = run(args);
        assert.equal(result.status, 2, result.stderr);
        assert.ok(result.stderr.includes(field === 'factIds' ? 'listing.factIds must be a list' : `${field} must be ${field === 'listings' ? 'an object' : 'a list'}`));
        await assert.rejects(readdir(output), { code: 'ENOENT' });
      });
    }
  }
});

test('omitted and empty optional collections remain accepted', async (t) => {
  for (const mode of ['omitted', 'empty']) {
    for (const command of ['aso', 'plan', 'visibility']) {
      await t.test(`${mode}: ${command}`, async (child) => {
        const target = await fixture(child);
        const path = join(target, '.geo/product.yaml');
        const product = record(parse(await readFile(path, 'utf8')));
        const ios = record(record(product.listings).ios);
        if (mode === 'omitted') {
          delete product.aliases;
          delete product.competitors;
          delete ios.factIds;
        } else {
          product.aliases = [];
          product.competitors = [];
          ios.factIds = [];
        }
        await writeFile(path, stringify(product));
        const output = join(target, 'results');
        const args = [command, '--config', join(target, '.geo/config.yaml'), '--output', output];
        if (command === 'visibility') args.push('--input', join(target, 'visibility.jsonl'));
        const result = run(args);
        assert.equal(result.status, 0, result.stderr);
        assert.equal((await json(join(output, `${command}.json`))).kind, command);
        if (command === 'aso') assert.equal(findings(await json(join(output, 'aso.json'))).find((finding) => finding.id === 'ios.fact-references')?.status, 'unknown');
        if (mode === 'omitted') delete product.listings;
        else product.listings = {};
        await writeFile(path, stringify(product));
        assert.equal(run(args).status, 0);
      });
    }
  }
});

test('null fact sources remain evidence gaps in aso and plan', async (t) => {
  const target = await fixture(t);
  const path = join(target, '.geo/product.yaml');
  const product = record(parse(await readFile(path, 'utf8')));
  assert.ok(Array.isArray(product.facts));
  record(product.facts[0]).source = null;
  await writeFile(path, stringify(product));
  const output = join(target, 'results');
  for (const command of ['aso', 'plan']) {
    const result = run([command, '--config', join(target, '.geo/config.yaml'), '--output', output]);
    assert.equal(result.status, 0, result.stderr);
  }
  assert.equal(findings(await json(join(output, 'aso.json'))).find((finding) => finding.id === 'ios.fact-references')?.status, 'unknown');
  const data = record((await json(join(output, 'plan.json'))).data);
  assert.deepEqual(data.opportunities, []);
  assert.ok(Array.isArray(data.researchGaps));
  assert.equal(record(data.researchGaps[0]).queryId, 'daily-journal');
});
