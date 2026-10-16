#!/usr/bin/env node
import { parseArgs } from 'node:util';
import { initialize, installSkills } from './install.ts';
import { loadConfig } from './config.ts';
import { audit } from './audit.ts';
import { saveReport } from './report.ts';
import type { Report } from './report.ts';
import { aso } from './aso.ts';
import { contentPlan } from './plan.ts';
import { visibility } from './visibility.ts';

try {
  const [command, ...args] = process.argv.slice(2);
  const { values } = parseArgs({ args, options: {
    target: { type: 'string' }, config: { type: 'string' }, output: { type: 'string' }, input: { type: 'string' }, help: { type: 'boolean' },
  } });
  if (command === '--help' || values.help || !command) {
    console.log('GEO Growth Engine\ninit|install --target <existing-project>\naudit|aso|plan --config <config.yaml> --output <report-directory>\nvisibility --config <config.yaml> --input <responses.jsonl> --output <report-directory>\nExit: 0 completed without failed checks; 1 failed checks; 2 operational error. Unknown findings stay visible.\nLocal artifacts and imported records only; no paid APIs or deployment.');
  } else if (command === 'init' || command === 'install') {
    if (!values.target) throw new Error('--target is required');
    console.log(JSON.stringify({ created: await (command === 'init' ? initialize(values.target) : installSkills(values.target)) }, null, 2));
  } else if (command === 'audit' || command === 'aso' || command === 'plan' || command === 'visibility') {
    if (!values.config || !values.output) throw new Error('--config and --output are required');
    const config = await loadConfig(values.config);
    if (command === 'visibility' && !values.input) throw new Error('--input is required for visibility');
    let result: Report;
    let evidence: Uint8Array | undefined;
    if (command === 'visibility') {
      const imported = await visibility(config, values.input ?? '');
      result = imported.result;
      evidence = imported.evidence;
    } else result = command === 'audit' ? await audit(config) : command === 'aso' ? aso(config) : await contentPlan(config);
    await saveReport(values.output, result, evidence);
    console.log(JSON.stringify({ output: values.output, ...result.summary }));
    process.exitCode = result.summary.fail > 0 ? 1 : 0;
  } else throw new Error(`Unknown command: ${command}. Use geo --help.`);
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 2;
}
