import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { test } from 'node:test';
import { findings, fixture, json, record, run } from './helpers.ts';

test('audit rejects invalid XML references and characters before counting sitemap URLs', async (t) => {
  const cases: [string, string][] = [
    ...['&unknown;', '&nbsp;', '&AMP;', '&#0;', '&#x0;', '&#1;', '&#xB;', '&#xD800;', '&#xDFFF;', '&#xFFFE;', '&#xFFFF;', '&#x110000;', '&#;', '&#x;', '&#X26;'].map((token): [string, string] => [token, `<urlset><url><loc>https://example.com/?q=${token}</loc></url></urlset>`]),
    ['attribute-name', '<urlset note="&unknown;"><url><loc>https://example.com/</loc></url></urlset>'],
    ['attribute-empty-number', '<urlset note="&#;"><url><loc>https://example.com/</loc></url></urlset>'],
    ['literal-null-in-comment', '<urlset><!--\u0000--><url><loc>https://example.com/</loc></url></urlset>'],
    ['split-reference', '<urlset><url><loc>https://example.com/?q=&am<!-- gap -->p;</loc></url></urlset>'],
    ...['<!-- &unknown; -->', '<![CDATA[&unknown;]]>', '<?fixture &unknown;?>'].map((value): [string, string] => [`quoted-${value}`, `<urlset note="${value}"><url><loc>https://example.com/</loc></url></urlset>`]),
  ];
  for (const [name, input] of cases) await t.test(name, async (child) => {
    const target = await fixture(child);
    await writeFile(join(target, 'public/sitemap.xml'), input);
    const output = join(target, 'output');
    const result = run(['audit', '--config', join(target, '.geo/config.yaml'), '--output', output]);
    assert.equal(result.status, 1, result.stderr);
    const report = await json(join(output, 'audit.json'));
    assert.equal(findings(report).find((finding) => finding.id === 'sitemap')?.status, 'fail');
    assert.equal(findings(report).find((finding) => finding.id === 'sitemap-duplicates')?.status, 'unknown');
    assert.equal(record(report.data).sitemap, null);
  });
});

test('audit preserves legal XML numeric boundaries and predefined references', async (t) => {
  for (const point of [0x9, 0xA, 0xD, 0x20, 0xD7FF, 0xE000, 0xFFFD, 0x10000, 0x10FFFF, 0x85, 0x1FFFE]) {
    await t.test(point.toString(16), async (child) => {
      const target = await fixture(child);
      await writeFile(join(target, 'public/sitemap.xml'), `<urlset note="&lt;&gt;&apos;&quot;&amp;"><url><loc>https://example.com/</loc></url><url><loc>https://example.com/?q=&#x${point.toString(16)};</loc></url></urlset>`);
      const output = join(target, 'output');
      const result = run(['audit', '--config', join(target, '.geo/config.yaml'), '--output', output]);
      assert.equal(result.status, 0, result.stderr);
      const report = await json(join(output, 'audit.json'));
      assert.equal(findings(report).find((finding) => finding.id === 'sitemap')?.status, 'pass');
      assert.deepEqual(record(report.data).sitemap, { entries: 2, uniqueUrls: 2, duplicateEntries: 0, duplicates: [] });
    });
  }
});

test('audit keeps reference-looking CDATA, comments, processing instructions and escaped ampersands literal', async (t) => {
  const target = await fixture(t);
  await writeFile(join(target, 'public/sitemap.xml'), '<urlset><!-- &unknown; &#0; --><?fixture &unknown; &#0;?><url><loc>https://example.com/</loc></url><url><loc><![CDATA[https://example.com/?q=&unknown;&#0;]]></loc></url><url><loc>https://example.com/?q=&amp;unknown;&amp;#0;</loc></url></urlset>');
  const output = join(target, 'output');
  const result = run(['audit', '--config', join(target, '.geo/config.yaml'), '--output', output]);
  assert.equal(result.status, 1, result.stderr);
  const report = await json(join(output, 'audit.json'));
  assert.equal(findings(report).find((finding) => finding.id === 'sitemap')?.status, 'pass');
  assert.deepEqual(record(report.data).sitemap, {
    entries: 3, uniqueUrls: 2, duplicateEntries: 1,
    duplicates: [{ url: 'https://example.com/?q=&unknown;&#0;', occurrences: 2, positions: [2, 3] }],
  });
});

test('quotes in element text do not hide real literal sections', async (t) => {
  const target = await fixture(t);
  await writeFile(join(target, 'public/sitemap.xml'), '<urlset note="&lt;!-- &amp;unknown; --&gt;"><url><loc>https://example.com/</loc></url><url><loc>https://example.com/?q="<!-- &unknown; -->"</loc></url></urlset>');
  const output = join(target, 'output');
  const result = run(['audit', '--config', join(target, '.geo/config.yaml'), '--output', output]);
  assert.equal(result.status, 0, result.stderr);
  const report = await json(join(output, 'audit.json'));
  assert.equal(findings(report).find((finding) => finding.id === 'sitemap')?.status, 'pass');
  assert.deepEqual(record(report.data).sitemap, { entries: 2, uniqueUrls: 2, duplicateEntries: 0, duplicates: [] });
});

test('audit decodes valid long numeric spellings once without changing escaped or CDATA literals', async (t) => {
  const target = await fixture(t);
  const zeros = '0'.repeat(40);
  await writeFile(join(target, 'public/sitemap.xml'), `<urlset><url><loc>https://example.com/</loc></url><url><loc>https://example.com/?a=1&amp;b=2</loc></url><url><loc>https://example.com/?a=1&#${zeros}38;b=2</loc></url><url><loc>https://example.com/?a=1&#x${zeros}26;b=2</loc></url><url><loc>https://example.com/?a=1&amp;#${zeros}38;b=2</loc></url><url><loc><![CDATA[https://example.com/?a=1&#${zeros}38;b=2]]></loc></url></urlset>`);
  const output = join(target, 'output');
  const result = run(['audit', '--config', join(target, '.geo/config.yaml'), '--output', output]);
  assert.equal(result.status, 1, result.stderr);
  const report = await json(join(output, 'audit.json'));
  assert.equal(findings(report).find((finding) => finding.id === 'sitemap')?.status, 'pass');
  assert.deepEqual(record(report.data).sitemap, {
    entries: 6, uniqueUrls: 3, duplicateEntries: 3,
    duplicates: [
      { url: `https://example.com/?a=1&#${zeros}38;b=2`, occurrences: 2, positions: [5, 6] },
      { url: 'https://example.com/?a=1&b=2', occurrences: 3, positions: [2, 3, 4] },
    ],
  });
});
