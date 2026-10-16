import { loadQueries } from './config.ts';
import type { Config, Fact } from './config.ts';
import { report } from './report.ts';
import type { Finding, Report } from './report.ts';

export async function contentPlan(config: Config): Promise<Report> {
  const queries = (await loadQueries(config)).sort((a, b) => a.priority - b.priority || a.id.localeCompare(b.id));
  const opportunities: { queryId: string; query: string; intent: string; priority: number; facts: Fact[] }[] = [];
  const researchGaps: { queryId: string; query: string; reason: string }[] = [];
  const findings: Finding[] = [];
  for (const query of queries) {
    const facts = config.product.facts.filter((fact) => query.factIds.includes(fact.id));
    const supported = facts.length > 0 && facts.every((fact) => fact.source !== null);
    if (supported) opportunities.push({ queryId: query.id, query: query.query, intent: query.intent, priority: query.priority, facts });
    else researchGaps.push({ queryId: query.id, query: query.query, reason: facts.length ? 'A linked fact has no source.' : 'No supporting product fact linked.' });
    findings.push({
      id: query.id, status: supported ? 'pass' : 'unknown',
      evidence: `${config.queriesPath}: ${query.query}; priority ${query.priority}; ${facts.map((fact) => `${fact.id}: ${fact.source ?? 'no source'}`).join('; ') || 'no evidence'}; sources not independently verified`,
      action: supported ? 'Inspect sources and create distinct, useful content only when authorized.' : 'Research this gap before drafting product claims.',
    });
  }
  if (!queries.length) findings.push({ id: 'queries', status: 'unknown', evidence: 'No audience queries supplied.', action: 'Supply real audience questions; do not invent market demand.' });
  return report('plan', config.product.example, 'Supplied questions and fact references only; no traffic estimates or automatic publication.', findings, { opportunities, researchGaps });
}
