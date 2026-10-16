import { mkdir, writeFile } from 'node:fs/promises';
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

export async function saveReport(output: string, result: Report, evidence?: Uint8Array): Promise<void> {
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
  for (const path of files.keys()) await rejectSymlinkAncestors(path);
  for (const [path, contents] of files) {
    await mkdir(dirname(path), { recursive: true });
    await writeFile(path, contents);
  }
}
