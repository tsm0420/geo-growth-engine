# TICKET-002: Check store metadata and plan evidence-backed content

Status: Completed implementation
Assignee: Codex
Target Workspace: `/workspace/geo`
Blocked by: TICKET-001

## Objectives

Deliver `aso` and `plan` commands that check supplied listing fields and create query opportunities linked to sourced product facts.

## Hard constraints

Follow `docs/spec.md`. Source current platform field limits from official documentation. Missing data stays unknown. Do not invent capabilities, claims, estimated traffic, or conversion uplift.

## Acceptance Criteria

- Platform field boundaries and absent optional listings are covered through CLI tests.
- Opportunities preserve fact IDs and their evidence; unmatched queries are research gaps.
- Reports include traceable sources and the observed scope.
- Type checking and relevant acceptance tests pass, with command receipts.

## 📄 Execution Report

Implemented aso/plan with primary-source field limits and explicit semantic-review gaps. The four content CLI tests passed, and final `npm test` passed all 22 tests; typecheck and build passed. Standards and Spec reviews have no outstanding findings after corrections. Red/green receipts are in `docs/verification/`; separate reviews are in `docs/reviews/`. Plans preserve supplied fact IDs and sources; unsupported questions remain research gaps. The toolkit did not independently verify source URLs, store accounts, or copy semantics. Implementation is delivered on the PR branch for human merge.
