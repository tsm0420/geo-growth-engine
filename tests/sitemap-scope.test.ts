import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import test from 'node:test';
import { fixture, findings, json, record, run } from './helpers.ts';

async function observe(target: string, xml: string) {
  const input = join(target, 'public/sitemap.xml');
  await writeFile(input, xml);
  const output = join(target, 'audit');
  const result = run(['audit', '--config', join(target, '.geo/config.yaml'), '--output', output]);
  assert.equal(await readFile(input, 'utf8'), xml);
  return { result, report: await json(join(output, 'audit.json')) };
}

const misplaced: [string, string][] = [
  ['root loc', '<urlset><loc>https://example.com/</loc></urlset>'],
  ['metadata loc', '<urlset><metadata><loc>https://example.com/</loc></metadata></urlset>'],
  ['nested url', '<urlset><metadata><url><loc>https://example.com/</loc></url></metadata></urlset>'],
  ['nested loc', '<urlset><url><loc><loc>https://example.com/</loc></loc></url></urlset>'],
  ['wrapped urlset', '<wrapper><urlset><url><loc>https://example.com/</loc></url></urlset></wrapper>'],
  ['sitemap index', '<sitemapindex><sitemap><loc>https://example.com/</loc></sitemap></sitemapindex>'],
];
for (const [label, xml] of misplaced) {
  test(`audit excludes ${label} from sitemap page evidence`, async (t) => {
    const { result, report } = await observe(await fixture(t), xml);
    assert.equal(result.status, 1, result.stderr);
    const checks = findings(report);
    assert.equal(checks.find((x) => x.id === 'sitemap')?.status, 'fail');
    assert.equal(checks.find((x) => x.id === 'sitemap-duplicates')?.status, 'unknown');
    assert.equal(checks.find((x) => x.id === 'index.html:sitemap-coverage')?.status, 'fail');
    assert.equal(record(report.data).sitemap, null);
  });
}

test('audit retains a scalar direct sitemap entry without namespace enforcement', async (t) => {
  const { result, report } = await observe(await fixture(t), '<urlset><url><loc> https://example.com/ </loc></url></urlset>');
  assert.equal(result.status, 0, result.stderr);
  for (const id of ['sitemap', 'sitemap-duplicates', 'index.html:sitemap-coverage']) {
    assert.equal(findings(report).find((x) => x.id === id)?.status, 'pass');
  }
  assert.deepEqual(record(report.data).sitemap, { entries: 1, uniqueUrls: 1, duplicateEntries: 0, duplicates: [] });
});

test('audit ignores unrelated locations while retaining direct duplicate identity and positions', async (t) => {
  const target = await fixture(t);
  const xml = '<urlset><loc>https://other.example/</loc><url><loc>https://example.com/</loc></url>'
    + '<metadata><loc>https://example.com/</loc><url><loc>https://other.example/</loc></url></metadata>'
    + '<url><loc>https://example.com/?a=1&amp;b=2</loc><metadata><loc>https://example.com/</loc></metadata></url>'
    + '<url><loc>https://example.com/</loc></url></urlset>';
  const { result, report } = await observe(target, xml);
  assert.equal(result.status, 1, result.stderr);
  assert.equal(findings(report).find((x) => x.id === 'sitemap')?.status, 'pass');
  assert.equal(findings(report).find((x) => x.id === 'index.html:sitemap-coverage')?.status, 'pass');
  assert.equal(findings(report).find((x) => x.id === 'sitemap-duplicates')?.status, 'fail');
  assert.deepEqual(record(report.data).sitemap, {
    entries: 3, uniqueUrls: 2, duplicateEntries: 1,
    duplicates: [{ url: 'https://example.com/', occurrences: 2, positions: [1, 3] }],
  });
  assert.ok(String(findings(report).find((x) => x.id === 'sitemap-duplicates')?.evidence).includes('at positions 1, 3'));
});

test('audit retains direct entry arrays and default-namespace image extensions', async (t) => {
  const xml = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">'
    + '<url><loc>https://example.com/</loc><image:image><image:loc>https://images.other.example/picture.jpg</image:loc></image:image></url>'
    + '<url><loc>https://example.com/article</loc></url></urlset>';
  const { result, report } = await observe(await fixture(t), xml);
  assert.equal(result.status, 0, result.stderr);
  for (const id of ['sitemap', 'sitemap-duplicates', 'index.html:sitemap-coverage']) {
    assert.equal(findings(report).find((x) => x.id === id)?.status, 'pass');
  }
  assert.deepEqual(record(report.data).sitemap, { entries: 2, uniqueUrls: 2, duplicateEntries: 0, duplicates: [] });
});
