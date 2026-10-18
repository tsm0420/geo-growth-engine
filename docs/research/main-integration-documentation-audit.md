# TICKET-021 integration documentation audit

Snapshot: `dddf667f8dee72a2521fba4bdc6c2c718a4939f0`. This inventory is conditional on the primary verifying all ten authorized merges; no live completion or resulting main/CI identity was observed here.

- `README.md:7`, `:9`, `:51`, `:61`, `:65`, `:67`, `:69`, `:71`: reconcile branch-specific and unmerged candidate guidance with verified main availability. Keep the published alpha-1 tag/quickstart (`:5`, `:13`, `:16`) distinct from unreleased main capabilities. Update the comparison anchor link at `:77` if its heading changes.
- `docs/configuration.md:25`, `:29`, `:31`: identify integrated-main XML/comparison behavior without implying a tagged release. Preserve input, unknown and preflight limits.
- `.agents/skills/geo-orchestrator/SKILL.md:8`: narrow “Report commands require --config” to the four configured workflows; compare needs before/after/output instead. The other four skill documents contain no stale merge-state claim. Keep frozen Agensi ZIPs unchanged.
- `docs/backlog.md:4`, `:6` through `:11`, `:13`, `:14`: replace pending/open/unmerged status only with verified integration references. Keep BL-001's unresolved dependency and BL-003's dated Pending Review/zero Live evidence (`:3`, `:5`) independent.
- `docs/merge-readiness.md:3`, `:7`, `:11`, `:28`, `:30`, `:36`, `:38`: mark this proposal as a dated pre-integration checkpoint and link an actual outcome record with authorization, ten merge SHAs, final main identity/equivalence and exact-head CI. Preserve its original observed heads/table and receipts.
- `docs/roadmap.md:3` and `CHANGELOG.md:3`, `:26`: add installed preflight/comparison to the implemented/unreleased account and distinguish main integration from local-only availability; keep release dates unchanged. `distribution/agensi/README.md:17` needs a historical-versus-current PR16 qualifier, without changing its pinned source/package facts.

Bounded follow-up: one documentation reconciliation slice, appending the verified integration checkpoint to `docs/development-loop.md` after `:161`. Earlier dated baselines/checkpoints, specs, reviews, frozen case reports and verification receipts should remain historical; optionally add a current-proof pointer to `docs/verification/README.md:25`. No global history rewrite, release, workflow-run, growth or new platform-state claim is warranted.

Inspected the above current-state files, five skills and relevant distribution/ledger context using read-only `git rev-parse`, `rg`, `nl` and Python file reads. No source edits, tests/product CLI, network/browser, private-data or other-worktree actions occurred.
