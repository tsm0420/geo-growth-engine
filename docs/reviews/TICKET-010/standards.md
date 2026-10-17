# TICKET-010 Standards review

No actionable documented-standard violations or justified smell findings identified.

Scope: `git diff 79a7edbbe201ebd1e63d14d10e126ebdeff051f9 --` plus untracked proposal files. Planning HEAD is `6b047456d1da6a788c324df5be37004fc90f1b95`; its only post-base commit records prior delivery/current planning. This review includes the actual overlay, not merely that planning commit.

Standards read: AGENTS.md, CONTEXT.md, CONTRIBUTING.md, docs/spec.md, docs/core-hardening-spec.md, configuration guidance and TICKET-010, plus the code-review skill’s complete twelve-smell baseline. No additional standards files were found.

The executable change is limited to `src/config.ts:84,94,104-105`: explicit undefined checks preserve omission defaults while the existing list/object validators reject supplied null values. Validation remains with its existing owner; no parser, public helper, dependency or unrelated runtime behavior was introduced. Repeating four small boundary expressions does not justify a generic abstraction here.

The new CLI tests use isolated fixtures and literal operational expectations, verify absence of output after rejection, and retain omitted/empty controls and null-source evidence-gap assertions. English documentation states the narrowed behavior. All twelve smells were considered; names, duplication, feature envy, data clumps, primitives, switches, scattered responsibility, unrelated change, speculative hooks, chains, delegation and inheritance produced no actionable finding.

Independent verification: `node --test tests/collection-validation.test.ts` exited 0: 21 passes, zero failures/skips, on Darwin 25.5.0 arm64 / Node v24.18.0 / npm 11.16.0. Dependencies reused the supplied APFS copy of the primary locked node_modules; no clean install was performed. Raw output, source/test/lock hashes and runtime are in `/private/tmp/geo-ticket010-standards-check.json`.

Primary receipts inspected separately show the genuine red/green sequence and successful typecheck, full suite (69 passes) and build; these were not independently rerun. Same-commit ticket report/status, immutable candidate/package proof and final-head CI remain delivery gates. Other queued fixes remain outside this slice. No tracked edits, commits, network access or Spec-report aggregation occurred.
