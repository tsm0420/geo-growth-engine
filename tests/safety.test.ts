import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cp, mkdir, readFile, rename, symlink, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { findings, fixture, json, run } from './helpers.ts';

test('install and init reject symlink ancestors before resolving the target', async (t) => {
  const target = await fixture(t);
  await mkdir(join(target, 'real/project'), { recursive: true });
  await symlink(join(target, 'real'), join(target, 'linked'));
  for (const command of ['init', 'install']) {
    const result = run([command, '--target', join(target, 'linked/project')]);
    assert.equal(result.status, 2, result.stderr);
  }
  await assert.rejects(readFile(join(target, 'real/project/.geo/config.yaml')));
  await assert.rejects(readFile(join(target, 'real/project/.agents/skills/web-geo/SKILL.md')));
});

test('audit rejects a symlink used as the export root', async (t) => {
  const target = await fixture(t);
  await rename(join(target, 'public'), join(target, 'actual-public'));
  await symlink(join(target, 'actual-public'), join(target, 'public'));
  const result = run(['audit', '--config', join(target, '.geo/config.yaml'), '--output', join(target, 'output')]);
  assert.equal(result.status, 2, result.stderr);
  assert.match(result.stderr, /symlink/i);
});

test('reports reject symlink files and directories without overwriting external data', async (t) => {
  const target = await fixture(t);
  const output = join(target, 'output');
  await mkdir(output);
  const outside = join(target, 'owner.txt');
  await writeFile(outside, 'Keep this owner content');
  await symlink(outside, join(output, 'plan.json'));
  const result = run(['plan', '--config', join(target, '.geo/config.yaml'), '--output', output]);
  assert.equal(result.status, 2, result.stderr);
  assert.equal(await readFile(outside, 'utf8'), 'Keep this owner content');
  await mkdir(join(target, 'external-evidence'));
  await symlink(join(target, 'external-evidence'), join(output, 'evidence'));
  const visibility = run(['visibility', '--config', join(target, '.geo/config.yaml'), '--input', join(target, 'visibility.jsonl'), '--output', output]);
  assert.equal(visibility.status, 2, visibility.stderr);
  await assert.rejects(readFile(join(target, 'external-evidence/responses.jsonl')));
});

test('crawler checks use the export path even when canonical points to an allowed page', async (t) => {
  const target = await fixture(t);
  await mkdir(join(target, 'public/blocked'));
  await cp(join(target, 'public/index.html'), join(target, 'public/blocked/index.html'));
  await writeFile(join(target, 'public/robots.txt'), 'User-agent: *\nDisallow: /blocked/\n');
  const output = join(target, 'output');
  const result = run(['audit', '--config', join(target, '.geo/config.yaml'), '--output', output]);
  assert.equal(result.status, 1, result.stderr);
  const report = await json(join(output, 'audit.json'));
  assert.equal(findings(report).find((f) => f.id === 'blocked/index.html:crawler.OAI-SearchBot')?.status, 'fail');
  assert.match(String(findings(report).find((f) => f.id === 'blocked/index.html:crawler.OAI-SearchBot')?.evidence), /https:\/\/example.com\/blocked\//);
});

test('installation uses the same normalized target for checking and writing with dot-dot segments', async (t) => {
  const target = await fixture(t);
  await mkdir(join(target, 'outside/child'), { recursive: true });
  await mkdir(join(target, 'outside/project'));
  await symlink(join(target, 'outside/child'), join(target, 'linked'));
  const ambiguous = `${target}/linked/../project`;
  for (const command of ['init', 'install']) {
    const result = run([command, '--target', ambiguous]);
    assert.equal(result.status, 2, result.stderr);
  }
  await assert.rejects(readFile(join(target, 'outside/project/.geo/config.yaml')));
  await assert.rejects(readFile(join(target, 'outside/project/.agents/skills/web-geo/SKILL.md')));
});
