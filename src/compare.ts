import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { object, string } from './config.ts';
import { jsonText } from './json-text.ts';
import { report, type Finding, type Report, type Status } from './report.ts';
import { visibilityComparison } from './visibility-comparison.ts';

type Change = 'added' | 'removed' | 'status-changed' | 'details-changed' | 'unchanged';
interface Difference { id: string; change: Change; before: Finding | null; after: Finding | null }

function text(value: unknown, label: string): string {
  if (typeof value !== 'string') throw new Error(`${label} must be a string`);
  return value;
}

function status(value: unknown): Status {
  if (value !== 'pass' && value !== 'fail' && value !== 'unknown') throw new Error('Finding status must be pass, fail or unknown');
  return value;
}

function parseReport(value: unknown): Report {
  const raw = object(value, 'Report');
  if (raw.schemaVersion !== 1) throw new Error('Report schemaVersion must be 1');
  const kind = string(raw.kind, 'Report kind');
  if (!['audit', 'aso', 'plan', 'visibility'].includes(kind)) throw new Error(`Unsupported report kind: ${kind}`);
  if (typeof raw.example !== 'boolean') throw new Error('Report example must be a boolean');
  if (!Array.isArray(raw.findings)) throw new Error('Report findings must be a list');
  const ids = new Set<string>();
  const findings: Finding[] = raw.findings.map((value: unknown) => {
    const item = object(value, 'Finding');
    const id = string(item.id, 'Finding id');
    if (ids.has(id)) throw new Error(`Duplicate finding id: ${id}`);
    ids.add(id);
    return { ...item, id, status: status(item.status), evidence: text(item.evidence, 'Finding evidence'), action: text(item.action, 'Finding action') };
  });
  const summary = { pass: 0, fail: 0, unknown: 0 };
  for (const finding of findings) summary[finding.status] += 1;
  const supplied = object(raw.summary, 'Report summary');
  if (supplied.pass !== summary.pass || supplied.fail !== summary.fail || supplied.unknown !== summary.unknown) {
    throw new Error('Report summary must match finding counts');
  }
  if (!Object.hasOwn(raw, 'data')) throw new Error('Report data field is required');
  return { ...raw, schemaVersion: 1, kind, example: raw.example, generatedAt: string(raw.generatedAt, 'Report generatedAt'), scope: string(raw.scope, 'Report scope'), findings, summary: { ...supplied, ...summary }, data: raw.data };
}

async function source(path: string) {
  const fullPath = resolve(path);
  const bytes = await readFile(fullPath);
  const value: unknown = JSON.parse(jsonText(bytes, fullPath));
  return { path: fullPath, sha256: createHash('sha256').update(bytes).digest('hex'), report: parseReport(value) };
}

function difference(id: string, before: Finding | null, after: Finding | null): Difference {
  const change = before === null ? 'added' : after === null ? 'removed'
    : before.status !== after.status ? 'status-changed'
      : before.evidence !== after.evidence || before.action !== after.action ? 'details-changed' : 'unchanged';
  return { id, change, before, after };
}

function observation(finding: Finding | null): string {
  return finding === null ? 'not observed' : `${finding.status}; evidence=${finding.evidence}; action=${finding.action}`;
}

function requireFiniteNumbers(report: Report, path: string): void {
  const pending: unknown[] = [report];
  while (pending.length > 0) {
    const value = pending.pop();
    if (typeof value === 'number' && !Number.isFinite(value)) {
      throw new Error(`Comparison input ${path} contains a number outside the supported finite range`);
    }
    if (typeof value === 'object' && value !== null) {
      const children: unknown[] = Object.values(value);
      for (const child of children) pending.push(child);
    }
  }
}

export async function compare(beforePath: string, afterPath: string, options: { visibilityMetrics?: boolean } = {}): Promise<Report> {
  const before = await source(beforePath);
  const after = await source(afterPath);
  if (before.report.kind !== after.report.kind || before.report.example !== after.report.example) {
    throw new Error('Comparison requires the same report kind and example flag');
  }
  const metrics = options.visibilityMetrics ? visibilityComparison(before.report, after.report) : null;
  requireFiniteNumbers(before.report, before.path);
  requireFiniteNumbers(after.report, after.path);
  const old = new Map(before.report.findings.map((finding) => [finding.id, finding]));
  const current = new Map(after.report.findings.map((finding) => [finding.id, finding]));
  const ids = [...new Set([...old.keys(), ...current.keys()])].sort();
  const changes = ids.map((id) => difference(id, old.get(id) ?? null, current.get(id) ?? null));
  const counts: Record<Change, number> = { added: 0, removed: 0, 'status-changed': 0, 'details-changed': 0, unchanged: 0 };
  for (const item of changes) counts[item.change] += 1;
  const findings: Finding[] = changes.map((item) => ({
    id: `finding:${item.id}`, status: item.after?.status ?? 'unknown',
    evidence: `${item.change}; before: ${observation(item.before)}; after: ${observation(item.after)}`,
    action: item.after === null ? 'This check is absent in the later report; supply comparable evidence before calling it resolved.' : 'Inspect both original observations and the later action before choosing a fix.',
  }));
  findings.push({
    id: 'comparison-scope', status: 'unknown',
    evidence: `${metrics ? 'Finding and supplied visibility totals comparison.' : 'Structural finding comparison only.'} Product identity, collection conditions and growth attribution are unverified.`,
    action: 'Inspect both source scopes, input data and collection conditions. Removed findings are unknown; literal differences do not establish improvement.',
  });
  if (metrics) findings.push(...metrics.findings);
  return report('compare', before.report.example, `Local ${before.report.kind} findings: ${before.path} -> ${after.path}; exact IDs and text; no network requests`, findings, { before, after, changes, counts, comparability: 'unknown', ...(metrics ? { visibilityMetrics: metrics.rows } : {}) });
}
