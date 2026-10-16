import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { cp, mkdtemp, readFile, realpath, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import type { TestContext } from 'node:test';
import { fileURLToPath } from 'node:url';

export const cli = fileURLToPath(new URL('../src/cli.ts', import.meta.url));
export function run(args: string[]) {
  return spawnSync(process.execPath, [cli, ...args], { encoding: 'utf8', cwd: tmpdir() });
}
export async function fixture(t: TestContext): Promise<string> {
  const target = await realpath(await mkdtemp(join(tmpdir(), 'geo-test-')));
  t.after(() => rm(target, { recursive: true, force: true }));
  await cp(fileURLToPath(new URL('../examples', import.meta.url)), target, { recursive: true });
  return target;
}
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
export function record(value: unknown): Record<string, unknown> {
  assert.ok(isRecord(value), 'Expected a JSON object');
  return value;
}
export async function json(path: string): Promise<Record<string, unknown>> {
  const value: unknown = JSON.parse(await readFile(path, 'utf8'));
  return record(value);
}
export function findings(report: Record<string, unknown>): Record<string, unknown>[] {
  assert.ok(Array.isArray(report.findings));
  return report.findings.map((value: unknown) => record(value));
}
