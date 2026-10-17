# TICKET-011: Count underscore-delimited brand and competitor mentions

Status: In progress
Assignee: Codex
Target Workspace: `geo-growth-engine`, branch `codex/visibility-mention-boundaries`
Blocked by: TICKET-007 investigation (complete); PR #12 open and unmerged (transitive #11/#9)
Specification: `docs/core-hardening-spec.md`, TICKET-011

## Objectives

Match the documented Unicode letter/number boundary contract for brands, aliases and competitors while preserving sample denominators and evidence.

## Hard constraints

Existing local-input core only; English docs, strict TypeScript, real CLI red/green tests, independent Standards/Spec worktree reviews and same-commit ticket reports. Preserve private data/history/unknowns. No live requests, paid services, merge or publication.

## Acceptance Criteria

- Real visibility CLI input with underscore-delimited names yields literal expected mention and competitor counts; embedded letter/number variants remain excluded; raw evidence/grouping/unknowns remain unchanged.
- Required typecheck/full suite/build pass, with actual raw receipts and separate resolved review reports before source commit.
- Deliver a reviewable PR with prerequisite, current candidate/package evidence and final-head CI; update the loop ledger before selecting the next justified item.
