# Content and YAML contract audit

Date: 2026-10-17 UTC. TICKET-007 research only. All probe inputs are synthetic local data, not product measurements.

Source: `9b6b59ef0d6c3230fd54b6f756f449718dc88f83`; package `0.1.0-alpha.2`; isolated worktree `/private/tmp/geo-core-gap-content-worktree`. Actual runtime: Node v24.18.0, npm 11.16.0, Darwin 25.5.0 arm64. Lock SHA-256: `10fb43af3cbcd1ff61377ddb384f1712dfbbeca9e6d63f49733582e0ae5c06b7`.

## Confirmed defect

### C1 — P2: Explicit null collections bypass incompatible-type validation

Requirement: `docs/configuration.md:3` makes incompatible types operational errors; `:25` describes optional aliases/competitors as collections and listings as a collection; `:27` gives each listing factIds. Optional omission may default, but null is not the documented list/object type. `docs/spec.md` section 4 requires operational errors to use exit 2.

Implementation: `src/config.ts:84`, `:94`, `:104-105` applies nullish defaults before checking types. Explicit `aliases: null`, `competitors: null`, `listings: null`, and `listings.ios.factIds: null` are silently converted into empty collections.

Real CLI reproduction: copy the complete valid synthetic product fixture and change only `aliases` to null, then run:

```text
node /private/tmp/geo-core-gap-content-worktree/src/cli.ts aso --config /private/tmp/geo-core-gap-content/probes/shared-null-aliases/config.yaml --output /private/tmp/geo-core-gap-content/probes/shared-null-aliases/output
```

Expected: exit 2 with an actionable type error before writing reports. Observed: exit 0, empty stderr, ASO report written with 9 pass / 0 fail / 2 unknown. Plan also accepts the same incompatible aliases value with exit 0. Null competitors similarly completes; null listings becomes two unknown listing findings; null listing factIds becomes an unknown evidence-reference finding. The numeric controls for aliases/competitors/listings correctly reject with exit 2.

Impact: malformed supplied configuration is silently interpreted as an intentionally empty collection. A report can look completed while aliases, competitors, listing data, or evidence links are absent; callers cannot distinguish invalid input from a legitimate evidence gap. This is a shared input-contract defect, not a request for semantic validation or new features.

Receipts: `probes/shared-null-aliases/`, `shared-null-competitors/`, `shared-null-listings/`, `aso-null-fact-links/`, `plan-null-aliases/`; numeric controls `shared-number-*/`. Each contains exact input, command, stdout/stderr, exit status and generated reports.

Suggested narrow boundary: default optional collections only when omitted; validate explicit values before use. Preserve supported `fact.source: null` evidence gaps. Primary coder owns the specification, regression and implementation.

## Observed coverage

44 actual CLI invocations, plus the existing four content tests (4 pass, exit 0). These observations are bounded evidence, not exhaustive correctness.

| Area | Observed result | Representative receipt directories |
| --- | --- | --- |
| ASO | Exact limits pass for all seven fields; each one-over limit fails (7 failures, exit 1). Blank field fails; omitted field/listing remains unknown. | `aso-exact-all-limits`, `aso-over-all-limits`, `aso-blank-field`, `aso-missing-field`, `aso-listings-omitted`, `aso-web-only` |
| Unicode | 30 rocket code points pass the name limit; 100 UTF-8 keyword bytes pass; 102 bytes fail. | `aso-unicode-boundaries`, `aso-unicode-keywords-over` |
| Evidence | Empty/partly unsourced links remain unknown; unsupported queries become research gaps; only the sourced query becomes an opportunity. Listing copy beyond the linked fact remains semantic-claims unknown even when its length/reference checks pass. | `aso-unsourced-links`, `aso-empty-links`, `plan-sourced-and-gaps`, `aso-semantic-copy-remains-unknown` |
| Plan order | Priority then ASCII ID yields opportunity IDs `a,b,z`; empty queries yield unknown and no opportunities. | `plan-priority-and-id-sort`, `plan-empty-queries` |
| Input rejection | Unknown fact references, duplicate fact/query IDs and links, invalid priority/type, invalid source protocol/credentials/type, invalid origin/path/ownership, wrong version/example type, wrong listing field/locale type, duplicate YAML keys, YAML syntax errors and missing required product/query files reject with exit 2 and no report. | Named `shared-*`, `plan-*`, `aso-*` cases in `probe-summary.json` |
| Path contract | Every CLI invocation runs outside the configuration directory; relative product/query paths resolve successfully against the config file. | Commands and cwd in each receipt |

## Limits and exclusions

Inspected AGENTS/CONTEXT, core/configuration/development-loop contracts, ASO/content skills, CLI/config/ASO/plan/report implementations, template inputs, content tests and relevant core/safety test coverage. No semantic truth, real source content, localization quality, store acceptance, rankings, conversion, non-ASCII ID collation portability, large hostile input limits, or full schema validation was established. No live site/API request or issue #7 reinvestigation occurred. Other agents own filesystem/audit and visibility/report investigation.

Missing fact source is currently treated as a gap; the omission-versus-null wording does not justify a separate defect here. Unknown string field names are not rejected, but full schema validation is explicitly out of scope, so no additional queue item is proposed. Passing fact-reference checks do not claim semantic copy approval.

Offline installation succeeded; its known transitive deprecation warning is retained in `install.json`, not reclassified as new work. `existing-content-tests.json` contains the actual four-test output. No full suite or typecheck was run for this read-only investigation. `worktree-status.json` records a clean tracked worktree. No tracked edits, commits or GitHub mutations were made.

Raw evidence is under `probes/<case>/`. Each `receipt.json` retains command, cwd, times, stdout/stderr, exit, input hashes, source revision and runtime. `receipt-manifest.json` hashes these immutable raw probe artifacts; the report and aggregate summaries are interpretive.
