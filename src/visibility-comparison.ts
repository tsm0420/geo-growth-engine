import { object } from './config.ts';
import type { Finding, Report } from './report.ts';
import type { Stats } from './visibility.ts';

const metrics = ['attempted', 'successful', 'failed', 'coverage', 'mentionRate', 'citationRate'] as const;
type Totals = Pick<Stats, typeof metrics[number]>;
interface MetricRow {
  metric: typeof metrics[number]; unit: 'count' | 'fraction'; before: number | null; after: number | null; difference: number | null;
}

function totals(report: Report, side: string): Totals {
  const raw = object(object(report.data, `${side} data`).totals, `${side} data.totals`);
  function count(key: 'attempted' | 'successful' | 'failed'): number {
    const value = raw[key];
    if (typeof value !== 'number' || !Number.isSafeInteger(value) || value < 0) throw new Error(`${side} data.totals.${key} must be a nonnegative safe integer`);
    return value;
  }
  function rate(key: 'coverage' | 'mentionRate' | 'citationRate'): number | null {
    const value = raw[key];
    if (value !== null && (typeof value !== 'number' || !Number.isFinite(value) || value < 0 || value > 1)) {
      throw new Error(`${side} data.totals.${key} must be null or a finite fraction in [0,1]`);
    }
    return value;
  }
  const value = { attempted: count('attempted'), successful: count('successful'), failed: count('failed'), coverage: rate('coverage'), mentionRate: rate('mentionRate'), citationRate: rate('citationRate') };
  if (value.successful > value.attempted || value.failed !== value.attempted - value.successful) {
    throw new Error(`${side} data.totals.attempted must equal successful + failed`);
  }
  if (value.coverage !== (value.attempted === 0 ? null : value.successful / value.attempted)) {
    throw new Error(`${side} data.totals.coverage must be null at zero attempted, otherwise successful / attempted`);
  }
  for (const key of ['mentionRate', 'citationRate'] as const) {
    if ((value[key] === null) !== (value.successful === 0)) throw new Error(`${side} data.totals.${key} must be null exactly when successful is zero`);
  }
  return value;
}

function display(value: number | null, fraction: boolean): string {
  return value === null ? 'null (unavailable)' : fraction ? `${(value * 100).toFixed(2)}%` : String(value);
}

export function visibilityComparison(before: Report, after: Report): { rows: MetricRow[]; findings: Finding[] } {
  if (before.kind !== 'visibility' || after.kind !== 'visibility') throw new Error('--visibility-metrics requires two visibility reports');
  const old = totals(before, 'before');
  const current = totals(after, 'after');
  const rows: MetricRow[] = metrics.map((metric) => ({
    metric, unit: metric === 'attempted' || metric === 'successful' || metric === 'failed' ? 'count' : 'fraction',
    before: old[metric], after: current[metric], difference: old[metric] === null || current[metric] === null ? null : current[metric] - old[metric],
  }));
  const findings: Finding[] = rows.map((row) => {
    const fraction = row.unit === 'fraction';
    const change = row.difference === null ? 'null (unavailable because a source value is null)' : fraction ? `${(row.difference * 100).toFixed(2)} percentage points` : String(row.difference);
    return {
      id: `visibility-metric:${row.metric}`, status: 'unknown',
      evidence: `Supplied observations; before: ${display(row.before, fraction)}; after: ${display(row.after, fraction)}; difference: ${change}.`,
      action: 'Inspect counts, raw answers and comparable product/query/collection conditions. Identity, cohort, provenance and attribution are unverified; arithmetic differences do not establish improvement or significance.',
    };
  });
  return { rows, findings };
}
