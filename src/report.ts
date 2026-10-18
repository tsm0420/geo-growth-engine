import { constants, type Stats } from 'node:fs';
import { access, mkdir, stat, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { rejectSymlinkAncestors } from './paths.ts';

export type Status = 'pass' | 'fail' | 'unknown';
export interface Finding { id: string; status: Status; evidence: string; action: string }
export interface Report {
  schemaVersion: 1; kind: string; generatedAt: string; example: boolean; scope: string;
  findings: Finding[]; summary: Record<Status, number>; data: unknown;
}

export function report(kind: string, example: boolean, scope: string, findings: Finding[], data: unknown = null): Report {
  const summary = { pass: 0, fail: 0, unknown: 0 };
  for (const finding of findings) summary[finding.status] += 1;
  return { schemaVersion: 1, kind, generatedAt: new Date().toISOString(), example, scope, findings, summary, data };
}

function markdown(value: string): string {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('|', '\\|').replaceAll('\n', ' ');
}

async function existingFile(path: string): Promise<Stats | null> {
  try { return await stat(path); }
  catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') return null;
    throw error;
  }
}

export async function saveReport(output: string, result: Report, inputPaths: readonly string[], evidence?: Uint8Array): Promise<void> {
  const directory = resolve(output);
  const lines = [
    `# ${result.kind} report`, '', result.example ? '**FICTIONAL EXAMPLE — not a product measurement.**' : 'User-supplied product artifacts.', '',
    `Generated: ${result.generatedAt}`, '', markdown(result.scope), '',
    `Pass: ${result.summary.pass}; fail: ${result.summary.fail}; unknown: ${result.summary.unknown}.`, '',
    '| Check | Status | Evidence | Next action |', '| --- | --- | --- | --- |',
    ...result.findings.map((item) => `| ${markdown(item.id)} | ${item.status} | ${markdown(item.evidence)} | ${markdown(item.action)} |`),
    '', ...(result.data === null ? [] : ['## Details', '', '```json', JSON.stringify(result.data, null, 2), '```', '']),
  ];
  const files = new Map<string, string | Uint8Array>([
    [join(directory, `${result.kind}.json`), `${JSON.stringify(result, null, 2)}\n`],
    [join(directory, `${result.kind}.md`), lines.join('\n')],
  ]);
  if (evidence !== undefined) files.set(join(directory, 'evidence/responses.jsonl'), evidence);
  const inputs = new Set(inputPaths.map((path) => resolve(path)));
  const inputFiles = await Promise.all([...inputs].map(existingFile));
  const destinationFiles: Stats[] = [];
  for (const path of files.keys()) {
    await rejectSymlinkAncestors(path);
    const destination = await existingFile(path);
    if (inputs.has(path) || destination !== null && inputFiles.some((input) => input !== null && input.dev === destination.dev && input.ino === destination.ino)) {
      throw new Error(`Report destination would overwrite an input file: ${path}`);
    }
    if (destination !== null) {
      if (destinationFiles.some((other) => other.dev === destination.dev && other.ino === destination.ino)) {
        throw new Error(`Report destinations must not alias the same file: ${path}`);
      }
      destinationFiles.push(destination);
      if (!destination.isFile()) throw new Error(`Report destination must be a regular file: ${path}`);
      await access(path, constants.W_OK);
    } else {
      let parent = dirname(path);
      while (await existingFile(parent) === null) parent = dirname(parent);
      if (!(await stat(parent)).isDirectory()) throw new Error(`Report ancestor must be a directory: ${parent}`);
      await access(parent, constants.W_OK);
    }
  }
  for (const [path, contents] of files) {
    await mkdir(dirname(path), { recursive: true });
    await writeFile(path, contents);
  }
}
