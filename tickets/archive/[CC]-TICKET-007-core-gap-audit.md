# TICKET-007: Audit existing core acceptance gaps

Status: Completed investigation
Assignee: Codex
Target Workspace: `geo-growth-engine`, branch `codex/core-hardening-campaign`
Blocked by: None for local investigation; delivery depends on unmerged PR #9
Contract: `docs/spec.md`, `docs/configuration.md`, `docs/development-loop.md`

## Objectives

Inspect all six CLI commands plus shared config/report handling and packaging/CI. Record a finite, dated queue of confirmed defects within existing scope, each with a minimal real CLI reproduction, expected/actual behavior, user impact and raw evidence. Record inspected areas even when no defect is reproduced, without claiming exhaustive correctness.

## Hard constraints

Investigation only: no tracked source/test changes by researchers. Each repository agent uses a separate worktree/index. Primary coder owns later implementation. No production/live-site fetch, paid request, provider integration, merge, tag or release. Keep private funding files untouched and preserve all historical artifacts. Comments/docs are English; reproduction input is data. No test counts, hypotheses or static inspection alone establish a bug.

## Acceptance Criteria

- Record actual CLI probes and raw commands/stdout/stderr/exits/runtime/source identity across every audit area.
- Cross-check each observed defect against the existing contract; preferences and unapproved roadmap features stay outside the required queue.
- Record safe behavior observed and explicit limits, without claiming untested edges pass.
- Update the durable loop ledger/backlog and define narrow implementation specifications/tickets for justified work.

## Research dispatches

- Filesystem/audit researcher: init/install safety and actual site-audit semantics. Use only own isolated worktree. Focus on false success, input loss, sitemap/crawler/metadata report accuracy. Save report and raw receipts under `/private/tmp/geo-core-gap-filesystem`.
- Content/config researcher: aso/plan and shared YAML validation against documented input contracts. Use only own isolated worktree. Focus on operational errors, missing evidence, wrong passed findings and content/provenance errors. Save under `/private/tmp/geo-core-gap-content`.
- Visibility/report researcher: visibility import/statistics/provenance and report writing. Use only own isolated worktree. Focus on wrong measured rates, evidence overwrites, input/output overlap, malformed successful records and misleading reports. Save under `/private/tmp/geo-core-gap-visibility`.

Each researcher reads AGENTS.md, CONTEXT.md, relevant specs/skills/tests, runs meaningful local CLI probes, and returns concrete confirmed findings with receipts. Use independent literal expectations. No repository commits or tracked edits. Do not rerun the upstream issue #7 investigation without new release evidence.

## 📄 Execution Report

Three independent read-only investigations at `9b6b59ef` completed all six command areas/shared config/report handling on Darwin arm64 / Node v24.18.0. Reports identify seven confirmed gaps, grouped into six implementation tickets in `docs/core-hardening-spec.md`. Filesystem/audit probes include independent XML/URL oracles; content/config has 44 CLI probes and four existing tests; visibility/report has 16 CLI probes. Correct observed cases and explicit exclusions remain documented. Primary npm consumer installation of the actual alpha-2 tarball passed help/init/install/audit/aso/plan/visibility and operational error cases, after matching its digest and all 22 packaged files to the unchanged current inputs. Exact-head PR #9 CI success was rechecked through Code Review; it is not claimed for future source changes.

Original evidence/data/report bytes are retained under `docs/verification/core-gap-audit/` as four ZIPs with SHA-256 and per-file inventories (724 data files). Executable research harnesses are excluded; no new product source was added. The durable ledger/backlog now records coverage and the finite queue. No live fetch, paid request, source mutation, issue-7 reinvestigation, merge or publication occurred. This completes investigation, not remediation or the overall iterative goal.
