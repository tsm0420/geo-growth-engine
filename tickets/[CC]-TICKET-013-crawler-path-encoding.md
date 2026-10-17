# TICKET-013: Infer crawler URLs from encoded filesystem path segments

Status: In progress
Assignee: Codex
Target Workspace: `geo-growth-engine`, branch `codex/crawler-path-encoding`
Blocked by: TICKET-007 investigation (complete); PR #14 open and unmerged (transitive #13/#12/#11/#9)
Specification: `docs/core-hardening-spec.md`, TICKET-013

## Objectives

Encode reserved filename characters before crawler policy checks while preserving directory and index conventions.

## Hard constraints

Existing local-input core only; English docs, strict TypeScript, real CLI red/green tests, independent Standards/Spec worktree reviews and same-commit ticket reports. Preserve private data/history/unknowns. No live requests, paid services, merge or publication.

## Acceptance Criteria

- Real CLI reserved-character filenames report exact encoded inferred URLs and matching bot failures; canonical paths remain separate and deployment routes remain unknown.
- Required typecheck/full suite/build pass, with actual raw receipts and separate resolved review reports before source commit.
- Deliver a reviewable PR with prerequisite, current candidate/package evidence and final-head CI; update the loop ledger before selecting the next justified item.
