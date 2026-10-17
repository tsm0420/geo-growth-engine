# TICKET-014: Compare canonical sitemap coverage consistently

Status: In progress
Assignee: Codex
Target Workspace: `geo-growth-engine`, branch `codex/canonical-sitemap-coverage`
Blocked by: TICKET-007 investigation (complete); PR #15 open and unmerged (transitive #14/#13/#12/#11/#9)
Specification: `docs/core-hardening-spec.md`, TICKET-014

## Objectives

Use symmetric URL serialization for coverage while preserving raw exact decoded duplicate identity.

## Hard constraints

Existing local-input core only; English docs, strict TypeScript, real CLI red/green tests, independent Standards/Spec worktree reviews and same-commit ticket reports. Preserve private data/history/unknowns. No live requests, paid services, merge or publication.

## Acceptance Criteria

- Real CLI bare-origin/apostrophe equivalents pass coverage; distinct case/slash/query controls remain distinct; duplicate data and original evidence remain intact.
- Required typecheck/full suite/build pass, with actual raw receipts and separate resolved review reports before source commit.
- Deliver a reviewable PR with prerequisite, current candidate/package evidence and final-head CI; update the loop ledger before selecting the next justified item.
