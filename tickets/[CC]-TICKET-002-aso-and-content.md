# TICKET-002: Check store metadata and plan evidence-backed content

Status: Ready for execution
Assignee: Codex
Target Workspace: `/Users/tsm0420/geo`
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
