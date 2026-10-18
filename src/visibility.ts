import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { object, string, strings, webUrl } from './config.ts';
import type { Config } from './config.ts';
import { report } from './report.ts';
import type { Report } from './report.ts';

interface Context { provider: string; surface: string; model: string; locale: string }
interface BaseSample extends Context { id: string; query: string; observedAt: string; example: boolean }
type Sample = (BaseSample & { status: 'success'; answer: string; citations: string[] }) | (BaseSample & { status: 'error'; error: string });
export interface Stats {
  attempted: number; successful: number; failed: number; coverage: number | null;
  mentionRate: number | null; citationRate: number | null; recommendationRate: null; competitors: Record<string, number>;
}

function sampleRecord(value: unknown, line: number): Sample {
  const raw = object(value, `line ${line}`);
  const observedAt = string(raw.observedAt, 'observedAt');
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/.test(observedAt) || Number.isNaN(Date.parse(observedAt))) {
    throw new Error(`line ${line}: observedAt must be an ISO timestamp with timezone`);
  }
  const dateOnly = observedAt.slice(0, 10);
  if (new Date(`${dateOnly}T00:00:00Z`).toISOString().slice(0, 10) !== dateOnly || Number(observedAt.slice(11, 13)) > 23) {
    throw new Error(`line ${line}: observedAt contains an impossible calendar date or time`);
  }
  if (raw.example !== undefined && typeof raw.example !== 'boolean') throw new Error(`line ${line}: example must be boolean`);
  const base: BaseSample = {
    id: string(raw.id, 'id'), provider: string(raw.provider, 'provider'), surface: string(raw.surface, 'surface'),
    model: string(raw.model, 'model'), query: string(raw.query, 'query'), locale: string(raw.locale, 'locale'), observedAt,
    example: raw.example === true,
  };
  if (raw.status === 'error') return { ...base, status: 'error', error: string(raw.error, 'error') };
  if (raw.status !== 'success') throw new Error(`line ${line}: status must be success or error`);
  const citations = strings(raw.citations, 'citations').map((url) => webUrl(url, 'citation').href);
  return { ...base, status: 'success', answer: string(raw.answer, 'answer'), citations };
}

function mentions(answer: string, name: string): boolean {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`(^|[^\\p{L}\\p{N}])${escaped}(?=$|[^\\p{L}\\p{N}])`, 'iu').test(answer);
}

function statistics(samples: Sample[], config: Config): Stats {
  const successful = samples.filter((sample) => sample.status === 'success');
  const hosts = config.product.ownedOrigins.map((origin) => new URL(origin).hostname);
  const brands = [config.product.name, ...config.product.aliases];
  let mentioned = 0;
  let cited = 0;
  const competitors = new Map(config.product.competitors.map((name) => [name, 0]));
  for (const sample of successful) {
    if (brands.some((brand) => mentions(sample.answer, brand))) mentioned += 1;
    if (sample.citations.some((citation) => {
      const host = new URL(citation).hostname;
      return hosts.some((owned) => host === owned || host.endsWith(`.${owned}`));
    })) cited += 1;
    for (const [name, count] of competitors) if (mentions(sample.answer, name)) competitors.set(name, count + 1);
  }
  return {
    attempted: samples.length, successful: successful.length, failed: samples.length - successful.length,
    coverage: samples.length ? successful.length / samples.length : null,
    mentionRate: successful.length ? mentioned / successful.length : null,
    citationRate: successful.length ? cited / successful.length : null,
    recommendationRate: null, competitors: Object.fromEntries(competitors),
  };
}

export async function visibility(config: Config, input: string): Promise<{ result: Report; evidence: Buffer }> {
  const raw = await readFile(resolve(input));
  const samples: Sample[] = [];
  const ids = new Set<string>();
  for (const [index, line] of raw.toString('utf8').split(/\r?\n/).entries()) {
    if (!line.trim()) continue;
    let value: unknown;
    try { value = JSON.parse(line); } catch { throw new Error(`line ${index + 1}: invalid JSON`); }
    const sample = sampleRecord(value, index + 1);
    if (ids.has(sample.id)) throw new Error(`line ${index + 1}: duplicate sample ID ${sample.id}`);
    ids.add(sample.id);
    samples.push(sample);
  }
  const grouped = new Map<string, { context: Context; samples: Sample[] }>();
  for (const sample of samples) {
    const context = { provider: sample.provider, surface: sample.surface, model: sample.model, locale: sample.locale };
    const key = JSON.stringify(context);
    const group = grouped.get(key);
    if (group) group.samples.push(sample);
    else grouped.set(key, { context, samples: [sample] });
  }
  const totals = statistics(samples, config);
  const groups = [...grouped.values()].map((group) => ({ ...group.context, ...statistics(group.samples, config) }));
  const result = report('visibility', config.product.example || samples.some((sample) => sample.example), 'Imported user-supplied responses; no API calls or consumer-interface collection. Aggregate rates describe this sample set, not market rankings.', [
    { id: 'collection-coverage', status: totals.failed || !totals.attempted ? 'unknown' : 'pass', evidence: `${totals.successful}/${totals.attempted} successful; ${totals.failed} collection errors; coverage=${String(totals.coverage)}`, action: 'Read groups and coverage before comparing rates. Failed attempts are excluded from mention/citation denominators.' },
    { id: 'recommendations', status: 'unknown', evidence: 'Mentions were matched; explicit recommendations were not classified.', action: 'Inspect raw answers before making recommendation claims.' },
    { id: 'provenance', status: 'unknown', evidence: 'Provider, model, surface, locale, timestamps, and answers are supplied by the importer and were not independently verified.', action: 'Retain collection receipts and repeat comparable queries before drawing conclusions.' },
  ], { totals, groups, source: resolve(input), evidence: 'evidence/responses.jsonl', sha256: createHash('sha256').update(raw).digest('hex') });
  return { result, evidence: raw };
}
