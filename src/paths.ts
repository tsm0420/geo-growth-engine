import { lstat } from 'node:fs/promises';
import { dirname, parse, resolve } from 'node:path';

export async function pathExists(path: string): Promise<boolean> {
  try { await lstat(path); return true; }
  catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') return false;
    throw error;
  }
}

export async function rejectSymlinkAncestors(path: string): Promise<void> {
  let current = resolve(path);
  while (current !== parse(current).root) {
    if (await pathExists(current) && (await lstat(current)).isSymbolicLink()) {
      throw new Error(`Refusing symlink path: ${current}. Supply a canonical filesystem path.`);
    }
    current = dirname(current);
  }
}
