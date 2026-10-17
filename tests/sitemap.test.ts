import assert from 'node:assert/strict';
import { readFile, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { test } from 'node:test';
import { findings, fixture, json, record, run } from './helpers.ts';

test('audit fails repeated sitemap URLs with ordered positions and deterministic evidence', async (t) => {
  const target = await fixture(t);
  await writeFile(join(target, 'public/sitemap.xml'), '<urlset><url><loc>https://example.com/z</loc></url><url><loc>https://example.com/</loc></url><url><loc>https://example.com/a</loc></url><url><loc>https://example.com/z</loc></url><url><loc>https://example.com/a</loc></url><url><loc>https://example.com/z</loc></url></urlset>');
  const output = join(target, 'output');
  const result = run(['audit', '--config', join(target, '.geo/config.yaml'), '--output', output]);
  assert.equal(result.status, 1, result.stderr);
  const report = await json(join(output, 'audit.json'));
  const duplicate = findings(report).find((finding) => finding.id === 'sitemap-duplicates');
  assert.equal(duplicate?.status, 'fail');
  assert.equal(duplicate?.evidence, `${join(target, 'public/sitemap.xml')}: 6 entries; 3 unique URLs; 3 duplicate entries; https://example.com/a occurs 2 times at positions 3, 5; https://example.com/z occurs 3 times at positions 1, 4, 6`);
  assert.match(String(duplicate?.action), /one.*canonical.*rebuild/i);
  assert.deepEqual(record(report.data).sitemap, {
    entries: 6, uniqueUrls: 3, duplicateEntries: 3,
    duplicates: [
      { url: 'https://example.com/a', occurrences: 2, positions: [3, 5] },
      { url: 'https://example.com/z', occurrences: 3, positions: [1, 4, 6] },
    ],
  });
  assert.equal(findings(report).filter((finding) => finding.status === 'fail').length, 1);
  assert.match(await readFile(join(output, 'audit.md'), 'utf8'), /sitemap-duplicates \| fail/);
});

test('audit compares decoded XML references once and preserves literal escaped references', async (t) => {
  const target = await fixture(t);
  const html = join(target, 'public/index.html');
  await writeFile(html, (await readFile(html, 'utf8')).replace('href="https://example.com/"', 'href="https://example.com/?a=1&amp;b=2"'));
  await writeFile(join(target, 'public/sitemap.xml'), '<urlset><url><loc> https://example.com/?a=1&amp;b=2 </loc></url><url><loc>https://example.com/?a=1&#38;b=2</loc></url><url><loc>https://example.com/?a=1&#x26;b=2</loc></url><url><loc>https://example.com/?a=1&amp;#38;b=2</loc></url></urlset>');
  const output = join(target, 'output');
  assert.equal(run(['audit', '--config', join(target, '.geo/config.yaml'), '--output', output]).status, 1);
  const report = await json(join(output, 'audit.json'));
  assert.deepEqual(record(report.data).sitemap, {
    entries: 4, uniqueUrls: 2, duplicateEntries: 2,
    duplicates: [{ url: 'https://example.com/?a=1&b=2', occurrences: 3, positions: [1, 2, 3] }],
  });
  assert.equal(findings(report).find((finding) => finding.id === 'index.html:sitemap-coverage')?.status, 'pass');
  assert.equal(findings(report).find((finding) => finding.id === 'sitemap-duplicates')?.status, 'fail');
  assert.equal(findings(report).filter((finding) => finding.status === 'fail').length, 1);
});

test('audit passes unique sitemap spellings without URL normalization', async (t) => {
  const target = await fixture(t);
  await writeFile(join(target, 'public/sitemap.xml'), '<urlset><url><loc>https://example.com/</loc></url><url><loc>https://example.com/a</loc></url><url><loc>https://example.com/A</loc></url><url><loc>https://example.com/a/</loc></url><url><loc>https://example.com/%61</loc></url><url><loc>https://example.com/?a=1&amp;b=2</loc></url><url><loc>https://example.com/?b=2&amp;a=1</loc></url><url><loc>https://EXAMPLE.com/a</loc></url><url><loc>https://example.com/a#section</loc></url></urlset>');
  const output = join(target, 'output');
  const result = run(['audit', '--config', join(target, '.geo/config.yaml'), '--output', output]);
  assert.equal(result.status, 0, result.stderr);
  const report = await json(join(output, 'audit.json'));
  assert.deepEqual(record(report.data).sitemap, { entries: 9, uniqueUrls: 9, duplicateEntries: 0, duplicates: [] });
  assert.equal(findings(report).find((finding) => finding.id === 'sitemap-duplicates')?.status, 'pass');
  assert.equal(findings(report).find((finding) => finding.id === 'live-indexing')?.status, 'unknown');
});

test('audit leaves duplicate status unknown for unavailable or unsupported sitemaps', async (t) => {
  const cases: [string, string | null][] = [
    ['missing', null], ['malformed', '<urlset><url>'], ['empty', '<urlset/>'],
    ['index', '<sitemapindex><sitemap><loc>https://example.com/</loc></sitemap></sitemapindex>'],
    ['off-origin', '<urlset><url><loc>https://other.example/</loc></url></urlset>'],
    ['custom-entity', '<!DOCTYPE urlset [<!ENTITY custom "https://example.com/">]><urlset><url><loc>&custom;</loc></url></urlset>'],
  ];
  for (const [name, input] of cases) await t.test(name, async (t) => {
    const target = await fixture(t);
    const sitemap = join(target, 'public/sitemap.xml');
    if (input === null) await rm(sitemap);
    else await writeFile(sitemap, input);
    const output = join(target, 'output');
    const result = run(['audit', '--config', join(target, '.geo/config.yaml'), '--output', output]);
    assert.equal(result.status, 1, result.stderr);
    const report = await json(join(output, 'audit.json'));
    assert.equal(record(report.data).sitemap, null);
    assert.equal(findings(report).find((finding) => finding.id === 'sitemap')?.status, 'fail');
    assert.equal(findings(report).find((finding) => finding.id === 'sitemap-duplicates')?.status, 'unknown');
  });
});
