# TICKET-010: Reject explicit null optional collections

Status: In progress
Assignee: Codex
Target Workspace: `geo-growth-engine`, branch `codex/optional-collection-validation`
Blocked by: TICKET-007 investigation (complete); PR #11 open and unmerged (its prerequisite is PR #9)
Specification: `docs/core-hardening-spec.md`, TICKET-010

## Objectives

Default optional collections only when omitted; reject explicit null for aliases, competitors, listings and listing factIds without suppressing valid empty collections or null fact-source evidence gaps.

## Hard constraints

Existing local-input core only; English docs, strict TypeScript, real CLI red/green tests, independent Standards/Spec worktree reviews and same-commit ticket reports. Preserve private data/history/unknowns. No live requests, paid services, merge or publication.

## Acceptance Criteria

- Real aso/plan/visibility CLI cases distinguish null errors (exit2/no report) from omitted/empty success and supported fact.source:null gaps.
- Required typecheck/full suite/build pass, with actual raw receipts and separate resolved review reports before source commit.
- Deliver a reviewable PR with prerequisite, current candidate/package evidence and final-head CI; update the loop ledger before selecting the next justified item.
