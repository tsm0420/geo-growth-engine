# Visibility and report acceptance-gap audit

Date: 2026-10-17 UTC. Source `9b6b59ef0d6c3230fd54b6f756f449718dc88f83`, candidate `0.1.0-alpha.2`; Node v24.18.0, npm 11.16.0, Darwin 25.5.0 arm64. Investigation used only the assigned worktree, offline dependencies and fictional local records. No tracked changes, commits, network requests or claimed provider observations.

## Confirmed findings

### V1 — Source/output collisions destroy imported inputs or configuration (P1)

`src/report.ts:32–40` overwrites destinations without protecting files already consumed by the command (`src/cli.ts:28–38`). In `config-overlap`, a valid JSON-form YAML config is also `OUTPUT/visibility.json`. The real command exits **0**, replacing that config with the report; its original origin/product/query configuration is not copied anywhere by the CLI. In `raw-input-overlap`, imported JSONL at the same destination is replaced with report JSON, also exit **0**; the copied raw evidence survives, but the original input path no longer contains import records.

Expected: reject a report destination that aliases a consumed input/configuration before modifying files. Contract: configuration is supplied input (`docs/configuration.md:7–15`); visibility preserves input bytes (`:58`), and the evidence-first core is not an input editor (`docs/spec.md:21,35–37`). README intentionally permits replacement of earlier reports/evidence on output-directory reuse; this finding concerns consumed source files, not that documented reuse.

Receipts: `config-overlap.*`, `raw-input-overlap.*`; exact inputs and outputs under corresponding `cases/`. Original config backup is an audit receipt, not a backup made by the CLI.

### V2 — Later write failure leaves report/evidence digest disagreement (P2)

`src/report.ts:37–40` checks symlinks then writes JSON, Markdown and evidence sequentially. `partial-report-write` first saves one valid sample, makes `visibility.md` a directory, then imports two new samples. The second command correctly exits **2** (`EISDIR`), but replaces `visibility.json` before failing. That JSON claims digest `ab4b7ae0…`, while retained evidence remains old with digest `baa55ed8…`.

Expected: deterministic destination failures must not replace a valid JSON/evidence pair with inconsistent artifacts. Existing raw-evidence retention requirements are `docs/spec.md:21,35` and `docs/configuration.md:58`. The operational exit requirement is satisfied; atomic publication is not explicitly specified, so this is a demonstrated evidence-integrity hardening gap, not a claim that all failed writes currently promise rollback.

Receipts: `partial-report-initial.*`, `partial-report-failure.*`; `probe-results.json` records complete hashes and before/after comparisons.

### V3 — Underscore-delimited names undercount measured mentions (P2)

`src/visibility.ts:41` excludes `_` as a boundary, despite `docs/configuration.md:58` specifying Unicode letter/number boundaries. One successful answer `_Example Journal_ and _Other Journal_.` exits **0** with mention rate **0** and competitor count **0**. Literal expected values are **1** and **1**: underscores are neither Unicode letters nor numbers, and are common Markdown emphasis delimiters. This affects both brand and competitor statistics.

Receipt: `underscore-boundary.*` and its saved report/input.

## Observed coverage and limits

Executed 16 real visibility CLI commands, not a full automated-suite claim. Correct observations: mixed-success denominator/coverage and host/subdomain ownership, substring rejection, separation of all four grouping dimensions, null empty/all-error rates, fictional labels, recommendation/provenance unknowns, CRLF/blank-line parsing with exact byte/digest retention, rejection of late malformed JSON/invalid citations/impossible dates/empty answers/duplicate IDs before output, and symlink preflight preserving an earlier report and external directory.

`probe.py` and `additional-probe.py` reproduce the saved scenarios; rerunning requires new case directories because the originals are deliberately retained. Every command has raw stdout, stderr, numeric exit, exact argv/cwd and actual UTC timestamps. `identity.json`, identity receipts, lock/package hashes and `inspected-source-hashes.json` identify the environment and source. `probe-results.json` and `additional-probe-results.json` contain literal expectations and observations.

No concurrency, power-loss, disk-exhaustion, hard-link aliases, all filesystem permissions, exhaustive Unicode case folding, authenticated provenance or external provider behavior was validated. These limits are not passes or additional required features. The known encoding deprecation warning remained visible during the successful offline install.
