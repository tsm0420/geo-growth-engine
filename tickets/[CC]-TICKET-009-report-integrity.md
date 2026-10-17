# TICKET-009: Preserve inputs and report evidence during output preflight

Status: In progress
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
