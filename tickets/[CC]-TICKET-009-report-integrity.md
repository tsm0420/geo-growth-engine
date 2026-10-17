# TICKET-009: Preserve inputs and report evidence during output preflight

Status: Implemented; immutable package and final-head CI verification pending
Assignee: Codex
Target Workspace: `geo-growth-engine`, branch `codex/core-hardening-campaign`
Blocked by: TICKET-007 investigation (complete); PR #9 remains the unmerged delivery prerequisite
Specification: `docs/core-hardening-spec.md`, TICKET-009

## Objectives

Prevent report destinations from overwriting configured inputs or visibility records. Detect deterministic file/ancestor/symlink/write-access conflicts across the complete output set before replacing prior artifacts. Preserve valid output-directory reuse and honest operational errors.

## Hard constraints

English docs, strict TypeScript, real CLI TDD, separate reviewer worktrees, same-change ticket report/status. Scope is deterministic preflight, not transactional rollback for disk/concurrency failures. No live requests, private-file changes, merge or publication.

## Acceptance Criteria

- A config/product/query/input path colliding with a report or evidence destination fails with exit 2 and unchanged input/output bytes, including filesystem aliases.
- A later report filename that is a directory, or a file used as an ancestor, fails before replacing an existing JSON/evidence pair.
- Existing symlink checks and safe normal output reuse pass.
- Raw red/green, typecheck/full suite/build, separate Standards/Spec reviews, ticket execution report, clean-source/package verification and final-head CI are retained for the delivered slice.

## 📄 Execution Report

Implemented complete-set deterministic preflight and explicit protected input paths. Normalized-path and filesystem identity checks reject input collisions and mutually aliased destinations. Existing artifacts survive predictable destination type, ancestor, symlink and permission failures; valid reuse retains evidence hashes. This is not rollback for concurrent path changes, disk exhaustion or power loss.

Verification on Darwin 25.5.0 arm64, Node v24.18.0, npm 11.16.0: real CLI red/green receipts are in `docs/verification/TICKET-009/`. Final focused run: 15 passed, zero skipped. `npm run typecheck`, `npm test` (48 passed, zero failed/skipped), and `npm run build` each exited 0. The earlier test-cleanup failure remains recorded and was corrected, rather than counted as success. Independent Standards and Spec reports are in `docs/reviews/TICKET-009/`; neither found actionable introduced defects. Spec independently reran the 15 focused tests.

Candidate version: 0.1.0-alpha.3. Source commit identity, clean archive/extracted-package commands, PR prerequisite and exact final-head CI will be recorded after committing this reviewed source. Those delivery gates remain pending; no release or overall goal completion is claimed.
