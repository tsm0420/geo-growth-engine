import { constants } from 'node:fs';
import { access, mkdir, readFile, realpath, writeFile } from 'node:fs/promises';
import { dirname, join, parse, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pathExists, rejectSymlinkAncestors } from './paths.ts';

async function bundleRoot(): Promise<string> {
  let current = dirname(fileURLToPath(import.meta.url));
  while (current !== parse(current).root) {
    if (await pathExists(join(current, 'templates/config.yaml'))) return current;
    current = dirname(current);
  }
  throw new Error('Toolkit templates are missing; reinstall the complete package.');
}

async function installFiles(target: string, files: ReadonlyArray<{ from: string; to: string }>): Promise<string[]> {
  await access(target, constants.W_OK);
  for (const file of files) {
    await rejectSymlinkAncestors(file.to);
    if (await pathExists(file.to)) throw new Error(`File already exists; nothing was overwritten: ${file.to}`);
    await access(file.from, constants.R_OK);
  }
  for (const file of files) {
    await mkdir(dirname(file.to), { recursive: true });
    await writeFile(file.to, await readFile(file.from), { flag: 'wx' });
  }
  return files.map((file) => file.to);
}

export async function initialize(target: string): Promise<string[]> {
  const root = await bundleRoot();
  const checkedTarget = resolve(target);
  await rejectSymlinkAncestors(checkedTarget);
  const destination = await realpath(checkedTarget);
  return installFiles(checkedTarget, ['config.yaml', 'product.yaml', 'queries.yaml'].map((name) => ({
    from: join(root, 'templates', name), to: join(destination, '.geo', name),
  })));
}

export async function installSkills(target: string): Promise<string[]> {
  const root = await bundleRoot();
  const checkedTarget = resolve(target);
  await rejectSymlinkAncestors(checkedTarget);
  const destination = await realpath(checkedTarget);
  const names = ['geo-orchestrator', 'web-geo', 'app-geo-aso', 'geo-content-engine', 'geo-visibility-tracker'];
  return installFiles(checkedTarget, names.map((name) => ({
    from: join(root, '.agents/skills', name, 'SKILL.md'),
    to: join(destination, '.agents/skills', name, 'SKILL.md'),
  })));
}
