# TICKET-010: Reject explicit null optional collections

Status: Implemented and independently reviewed; immutable package/final-head CI pending
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

## 📄 Execution Report

Changed the four optional collection defaults to apply only to undefined. Supplied null reaches the existing list/object error path; omitted/empty collections remain valid, and fact-source null remains an evidence gap.

Real CLI test-first receipts under `docs/verification/TICKET-010/`: baseline twelve field/command null cases returned 0 instead of 2 (13 failing tests including parent; 8 passing controls), then all 21 focused tests passed with zero skips. `npm run typecheck`, `npm test` (69 passes, zero failures/skips), and `npm run build` exited 0 on Darwin 25.5.0 arm64, Node v24.18.0/npm 11.16.0. Independent Standards and Spec reports under `docs/reviews/TICKET-010/` found no actionable introduced defects; each reran 21 focused tests using the provided dependency copy.

Source commit identity, clean-source/extracted-package proof and final-head CI remain pending delivery steps. No dependency change, merge, tag, release or external data collection occurred.
