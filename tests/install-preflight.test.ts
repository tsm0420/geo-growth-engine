import { test } from 'node:test';
import assert from 'node:assert/strict';
import { chmod, mkdir, readFile, readdir, rm, symlink, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fixture, run } from './helpers.ts';

const skipPermissionProbe = process.platform === 'win32' || process.getuid?.() === 0;

test('install preflights a later unwritable parent without leaving earlier skills and can retry', { skip: skipPermissionProbe }, async (t) => {
  const target = await fixture(t);
  const skills = join(target, '.agents/skills');
  const parent = join(skills, 'web-geo');
  await mkdir(parent, { recursive: true });
  await writeFile(join(parent, 'owner.txt'), 'Keep this owner content');
  await chmod(parent, 0o555);
  try {
    const result = run(['install', '--target', target]);
    assert.equal(result.status, 2, result.stderr);
    assert.match(result.stderr, /EACCES|permission|access/i);
    assert.deepEqual(await readdir(skills), ['web-geo']);
    assert.deepEqual(await readdir(parent), ['owner.txt']);
  } finally {
    await chmod(parent, 0o755);
  }
  const retry = run(['install', '--target', target]);
  assert.equal(retry.status, 0, retry.stderr);
  assert.deepEqual((await readdir(skills)).sort(), ['app-geo-aso', 'geo-content-engine', 'geo-orchestrator', 'geo-visibility-tracker', 'web-geo']);
  assert.equal(await readFile(join(parent, 'owner.txt'), 'utf8'), 'Keep this owner content');
});

test('init rejects a nonwritable existing configuration parent and retries after correction', { skip: skipPermissionProbe }, async (t) => {
  const target = await fixture(t);
  const parent = join(target, '.geo');
  await rm(parent, { recursive: true });
  await mkdir(parent);
  await writeFile(join(parent, 'owner.txt'), 'Keep this owner content');
  await chmod(parent, 0o555);
  try {
    const result = run(['init', '--target', target]);
    assert.equal(result.status, 2, result.stderr);
    assert.match(result.stderr, /EACCES|permission|access/i);
    assert.deepEqual(await readdir(parent), ['owner.txt']);
  } finally {
    await chmod(parent, 0o755);
  }
  const retry = run(['init', '--target', target]);
  assert.equal(retry.status, 0, retry.stderr);
  assert.deepEqual((await readdir(parent)).sort(), ['config.yaml', 'owner.txt', 'product.yaml', 'queries.yaml']);
  assert.equal(await readFile(join(parent, 'owner.txt'), 'utf8'), 'Keep this owner content');
});

test('install creates missing destination parents and all five skills', async (t) => {
  const target = await fixture(t);
  const result = run(['install', '--target', target]);
  assert.equal(result.status, 0, result.stderr);
  const names = ['app-geo-aso', 'geo-content-engine', 'geo-orchestrator', 'geo-visibility-tracker', 'web-geo'];
  assert.deepEqual((await readdir(join(target, '.agents/skills'))).sort(), names);
  for (const name of names) assert.match(await readFile(join(target, '.agents/skills', name, 'SKILL.md'), 'utf8'), /^---\n/);
});

test('install preflights a later existing file without creating earlier skill paths', async (t) => {
  const target = await fixture(t);
  const skills = join(target, '.agents/skills');
  const parent = join(skills, 'web-geo');
  await mkdir(parent, { recursive: true });
  await writeFile(join(parent, 'SKILL.md'), 'Keep this owner content');
  const result = run(['install', '--target', target]);
  assert.equal(result.status, 2, result.stderr);
  assert.match(result.stderr, /already exists/i);
  assert.deepEqual(await readdir(skills), ['web-geo']);
  assert.equal(await readFile(join(parent, 'SKILL.md'), 'utf8'), 'Keep this owner content');
});

test('install rejects a later nondirectory parent without creating earlier skill paths', async (t) => {
  const target = await fixture(t);
  const skills = join(target, '.agents/skills');
  await mkdir(skills, { recursive: true });
  await writeFile(join(skills, 'web-geo'), 'Keep this owner content');
  const result = run(['install', '--target', target]);
  assert.equal(result.status, 2, result.stderr);
  assert.match(result.stderr, /ENOTDIR|directory/i);
  assert.deepEqual(await readdir(skills), ['web-geo']);
  assert.equal(await readFile(join(skills, 'web-geo'), 'utf8'), 'Keep this owner content');
});

test('install rejects a later symlink parent without creating earlier skill paths', async (t) => {
  const target = await fixture(t);
  const skills = join(target, '.agents/skills');
  const outside = join(target, 'owner-directory');
  await mkdir(skills, { recursive: true });
  await mkdir(outside);
  await writeFile(join(outside, 'owner.txt'), 'Keep this owner content');
  await symlink(outside, join(skills, 'web-geo'));
  const result = run(['install', '--target', target]);
  assert.equal(result.status, 2, result.stderr);
  assert.match(result.stderr, /symlink/i);
  assert.deepEqual(await readdir(skills), ['web-geo']);
  assert.deepEqual(await readdir(outside), ['owner.txt']);
  assert.equal(await readFile(join(outside, 'owner.txt'), 'utf8'), 'Keep this owner content');
});
