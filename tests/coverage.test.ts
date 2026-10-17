import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { test } from 'node:test';
import { findings, fixture, json, record, run } from './helpers.ts';

test('canonical coverage compares consistently serialized URLs without collapsing distinct paths or queries', async (t) => {
  const cases: [string, string, string, 'pass' | 'fail'][] = [
    ['bare-origin', 'https://example.com/', 'https://example.com', 'pass'],
    ['host-case', 'https://example.com/', 'https://EXAMPLE.com/', 'pass'],
    ['apostrophe', "https://example.com/?q='note'", "https://example.com/?q='note'", 'pass'],
    ['encoded-apostrophe', "https://example.com/?q='note'", 'https://example.com/?q=%27note%27', 'pass'],
    ['path-case', 'https://example.com/a', 'https://example.com/A', 'fail'],
    ['trailing-slash', 'https://example.com/a', 'https://example.com/a/', 'fail'],
    ['query-order', 'https://example.com/?a=1&b=2', 'https://example.com/?b=2&a=1', 'fail'],
    ['encoded-path', 'https://example.com/a', 'https://example.com/%61', 'fail'],
  ];
  for (const [name, canonical, location, expected] of cases) await t.test(name, async (child) => {
    const target = await fixture(child);
    const html = join(target, 'public/index.html');
    await writeFile(html, (await readFile(html, 'utf8')).replace('href="https://example.com/"', `href="${canonical.replaceAll('&', '&amp;')}"`));
    await writeFile(join(target, 'public/sitemap.xml'), `<urlset><url><loc>${location.replaceAll('&', '&amp;')}</loc></url></urlset>`);
    const output = join(target, 'output');
    const result = run(['audit', '--config', join(target, '.geo/config.yaml'), '--output', output]);
    assert.equal(result.status, expected === 'pass' ? 0 : 1, result.stderr);
    const report = await json(join(output, 'audit.json'));
    assert.equal(findings(report).find((finding) => finding.id === 'index.html:sitemap-coverage')?.status, expected);
    assert.equal(findings(report).find((finding) => finding.id === 'sitemap')?.status, 'pass');
    assert.deepEqual(record(report.data).sitemap, { entries: 1, uniqueUrls: 1, duplicateEntries: 0, duplicates: [] });
  });
});

test('coverage serialization preserves exact decoded duplicate identity and original evidence', async (t) => {
  const target = await fixture(t);
  const locations = ['https://example.com', 'https://example.com/', "https://example.com/?q='note'", 'https://example.com/?q=%27note%27', 'https://example.com/a', 'https://example.com/A', 'https://example.com/a/', 'https://example.com/?b=2&a=1', "https://example.com/?q='note'"];
  await writeFile(join(target, 'public/sitemap.xml'), `<urlset>${locations.map((location) => `<url><loc>${location.replaceAll('&', '&amp;')}</loc></url>`).join('')}</urlset>`);
  const output = join(target, 'output');
  const result = run(['audit', '--config', join(target, '.geo/config.yaml'), '--output', output]);
  assert.equal(result.status, 1, result.stderr);
  const report = await json(join(output, 'audit.json'));
  assert.equal(findings(report).find((finding) => finding.id === 'index.html:sitemap-coverage')?.status, 'pass');
  assert.deepEqual(record(report.data).sitemap, {
    entries: 9, uniqueUrls: 8, duplicateEntries: 1,
    duplicates: [{ url: "https://example.com/?q='note'", occurrences: 2, positions: [3, 9] }],
  });
  assert.equal(findings(report).filter((finding) => finding.status === 'fail').length, 1);
  assert.ok(String(findings(report).find((finding) => finding.id === 'sitemap-duplicates')?.evidence).includes("https://example.com/?q='note' occurs 2 times at positions 3, 9"));
});

test('malformed sitemap locations stay failed findings rather than becoming operational exceptions', async (t) => {
  const target = await fixture(t);
  await writeFile(join(target, 'public/sitemap.xml'), '<urlset><url><loc>https://example.com/</loc></url><url><loc>relative/path</loc></url></urlset>');
  const output = join(target, 'output');
  const result = run(['audit', '--config', join(target, '.geo/config.yaml'), '--output', output]);
  assert.equal(result.status, 1, result.stderr);
  const report = await json(join(output, 'audit.json'));
  assert.equal(findings(report).find((finding) => finding.id === 'sitemap')?.status, 'fail');
  assert.equal(findings(report).find((finding) => finding.id === 'sitemap-duplicates')?.status, 'unknown');
  assert.equal(findings(report).find((finding) => finding.id === 'index.html:sitemap-coverage')?.status, 'pass');
  assert.equal(record(report.data).sitemap, null);
});
