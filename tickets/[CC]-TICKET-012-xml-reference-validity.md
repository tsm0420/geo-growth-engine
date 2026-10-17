# TICKET-012: Reject malformed sitemap XML references

Status: Planned
Assignee: Codex
Target Workspace: `geo-growth-engine`, successive isolated primary branch after preceding slice
Blocked by: TICKET-007 investigation (complete); delivery declares preceding unmerged slice
Specification: `docs/core-hardening-spec.md`, TICKET-012

## Objectives

Reject undeclared named entities and prohibited numeric references before producing sitemap evidence; preserve valid one-pass XML decoding.

## Hard constraints

Existing local-input core only; English docs, strict TypeScript, real CLI red/green tests, independent Standards/Spec worktree reviews and same-commit ticket reports. Preserve private data/history/unknowns. No live requests, paid services, merge or publication.

## Acceptance Criteria

- Real CLI malformed-reference cases produce exit1/sitemap fail/duplicates unknown with null data; named/numeric/escaped-literal valid controls and historical frozen input remain supported.
- Required typecheck/full suite/build pass, with actual raw receipts and separate resolved review reports before source commit.
- Deliver a reviewable PR with prerequisite, current candidate/package evidence and final-head CI; update the loop ledger before selecting the next justified item.
