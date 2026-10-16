import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cp, mkdir, mkdtemp, readFile, readdir, realpath, rm, symlink, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { findings, json } from './helpers.ts';

const cli = fileURLToPath(new URL('../src/cli.ts', import.meta.url));

test('init creates editable project configuration and marks the example as fictional', async (t) => {
  const target = await realpath(await mkdtemp(join(tmpdir(), 'geo-init-')));
  t.after(() => rm(target, { recursive: true, force: true }));
  const result = spawnSync(process.execPath, [cli, 'init', '--target', target], { encoding: 'utf8' });
  assert.equal(result.status, 0, result.stderr);
  assert.match(await readFile(join(target, '.geo/config.yaml'), 'utf8'), /version: 1/);
  assert.match(await readFile(join(target, '.geo/product.yaml'), 'utf8'), /example: true/);
});

test('init preflights all conflicts before creating earlier files', async (t) => {
  const target = await realpath(await mkdtemp(join(tmpdir(), 'geo-conflict-')));
  t.after(() => rm(target, { recursive: true, force: true }));
  await mkdir(join(target, '.geo'));
  await writeFile(join(target, '.geo/product.yaml'), 'Existing owner data');
  const result = spawnSync(process.execPath, [cli, 'init', '--target', target], { encoding: 'utf8' });
  assert.equal(result.status, 2);
  assert.deepEqual(await readdir(join(target, '.geo')), ['product.yaml']);
});

test('audit reports actual broken metadata, search blocking, and JSON-LD without penalizing training policy', async (t) => {
  const target = await realpath(await mkdtemp(join(tmpdir(), 'geo-broken-')));
  t.after(() => rm(target, { recursive: true, force: true }));
  await cp(fileURLToPath(new URL('../examples', import.meta.url)), target, { recursive: true });
  await writeFile(join(target, 'public/index.html'), '<html><head><meta name="robots" content="NOINDEX,follow"><link rel="canonical" href="https://evil.example/"><script type="application/ld+json">{broken}</script></head><body><h1>Actual text</h1></body></html>');
  await writeFile(join(target, 'public/robots.txt'), 'User-agent: *\nDisallow: /\n\nUser-agent: OAI-SearchBot\nAllow: /\n');
  const output = join(target, 'output');
  const result = spawnSync(process.execPath, [cli, 'audit', '--config', join(target, '.geo/config.yaml'), '--output', output], { encoding: 'utf8' });
  assert.equal(result.status, 1, result.stderr);
  const report = await json(join(output, 'audit.json'));
  const status = (id: string): unknown => findings(report).find((f) => f.id === id)?.status;
  assert.equal(status('index.html:title'), 'fail');
  assert.equal(status('index.html:canonical'), 'fail');
  assert.equal(status('index.html:index-directive'), 'fail');
  assert.equal(status('index.html:jsonld-syntax.1'), 'fail');
  assert.equal(status('index.html:crawler.Googlebot'), 'fail');
  assert.equal(status('index.html:crawler.OAI-SearchBot'), 'pass');
  assert.equal(status('index.html:training.GPTBot'), 'pass');
});

test('audit separates malformed configuration from failed site checks', async (t) => {
  const target = await realpath(await mkdtemp(join(tmpdir(), 'geo-invalid-')));
  t.after(() => rm(target, { recursive: true, force: true }));
  await writeFile(join(target, 'config.yaml'), 'version: 1\nversion: 2\n');
  const result = spawnSync(process.execPath, [cli, 'audit', '--config', join(target, 'config.yaml'), '--output', join(target, 'output')], { encoding: 'utf8' });
  assert.equal(result.status, 2);
  assert.match(result.stderr, /unique|duplicate/i);
  await assert.rejects(readFile(join(target, 'output/audit.json')));
});

test('audit reports malformed sitemap XML as a finding and missing build output as an operational error', async (t) => {
  const target = await realpath(await mkdtemp(join(tmpdir(), 'geo-sitemap-')));
  t.after(() => rm(target, { recursive: true, force: true }));
  await cp(fileURLToPath(new URL('../examples', import.meta.url)), target, { recursive: true });
  await writeFile(join(target, 'public/sitemap.xml'), '<urlset><url>');
  const args = [cli, 'audit', '--config', join(target, '.geo/config.yaml'), '--output', join(target, 'output')];
  assert.equal(spawnSync(process.execPath, args, { encoding: 'utf8' }).status, 1);
  const report = await json(join(target, 'output/audit.json'));
  assert.equal(findings(report).find((f) => f.id === 'sitemap')?.status, 'fail');
  await rm(join(target, 'public'), { recursive: true });
  assert.equal(spawnSync(process.execPath, args, { encoding: 'utf8' }).status, 2);
});

test('install copies five independently usable skills and refuses conflicts before writing', async (t) => {
  const target = await realpath(await mkdtemp(join(tmpdir(), 'geo-install-')));
  t.after(() => rm(target, { recursive: true, force: true }));
  const invoke = () => spawnSync(process.execPath, [cli, 'install', '--target', target], { encoding: 'utf8' });
  assert.equal(invoke().status, 0);
  assert.equal((await readdir(join(target, '.agents/skills'))).length, 5);
  const skill = join(target, '.agents/skills/web-geo/SKILL.md');
  await writeFile(skill, 'User-owned content');
  assert.equal(invoke().status, 2);
  assert.equal(await readFile(skill, 'utf8'), 'User-owned content');
});

test('init refuses symlink destinations and preserves existing project files', async (t) => {
  const target = await realpath(await mkdtemp(join(tmpdir(), 'geo-symlink-')));
  const outside = await realpath(await mkdtemp(join(tmpdir(), 'geo-outside-')));
  t.after(() => Promise.all([target, outside].map((p) => rm(p, { recursive: true, force: true }))));
  await symlink(outside, join(target, '.geo'));
  const result = spawnSync(process.execPath, [cli, 'init', '--target', target], { encoding: 'utf8' });
  assert.equal(result.status, 2);
  assert.match(result.stderr, /symlink/);
  assert.deepEqual(await readdir(outside), []);
});

test('audit checks an exported site from another directory and exposes unmeasured live behavior', async (t) => {
  const target = await realpath(await mkdtemp(join(tmpdir(), 'geo-audit-')));
  t.after(() => rm(target, { recursive: true, force: true }));
  await cp(fileURLToPath(new URL('../examples', import.meta.url)), target, { recursive: true });
  const output = join(target, 'output');
  const result = spawnSync(process.execPath, [cli, 'audit', '--config', join(target, '.geo/config.yaml'), '--output', output], { encoding: 'utf8', cwd: tmpdir() });
  assert.equal(result.status, 0, result.stderr);
  const report = await json(join(output, 'audit.json'));
  assert.equal(report.example, true);
  assert.equal(findings(report).filter((f) => f.status === 'fail').length, 0);
  assert.equal(findings(report).find((f) => f.id === 'live-indexing')?.status, 'unknown');
  assert.match(await readFile(join(output, 'audit.md'), 'utf8'), /local/);
});

test('audit decodes standard XML entities before checking canonical sitemap coverage', async (t) => {
  const target = await realpath(await mkdtemp(join(tmpdir(), 'geo-entities-')));
  t.after(() => rm(target, { recursive: true, force: true }));
  await cp(fileURLToPath(new URL('../examples', import.meta.url)), target, { recursive: true });
  const htmlPath = join(target, 'public/index.html');
  await writeFile(htmlPath, (await readFile(htmlPath, 'utf8')).replace('href="https://example.com/"', 'href="https://example.com/?lang=en&amp;source=nav"'));
  await writeFile(join(target, 'public/sitemap.xml'), '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://example.com/?lang=en&amp;source=nav</loc></url></urlset>');
  const output = join(target, 'output');
  const result = spawnSync(process.execPath, [cli, 'audit', '--config', join(target, '.geo/config.yaml'), '--output', output], { encoding: 'utf8' });
  assert.equal(result.status, 0, result.stderr);
  assert.equal(findings(await json(join(output, 'audit.json'))).find((f) => f.id === 'index.html:sitemap-coverage')?.status, 'pass');
});
