# TICKET-018: Compare retained local report findings

Status: Ready for Execution
Assignee: Codex
Target Workspace: codex/local-report-comparison
Blocked by: TICKET-017 audit (completed); open/unmerged PR #19 and its prerequisites for delivery
Specification: docs/report-comparison-spec.md
Issue: https://github.com/tsm0420/geo-growth-engine/issues/20

## Objectives

Implement the additive local compare CLI slice so users can inspect literal finding changes after fixes, retaining evidence and unknowns.

## Hard constraints

Preserve the free local-input core, existing report writer protection, strict TypeScript and English documentation. No metric/growth claims, input normalization, network/provider changes, release/merge or Agensi ZIP edits. Primary owns implementation; independent reviewers use exclusive worktrees and indexes.

## Acceptance Criteria

1. Real CLI red/green proves an audit finding changes after a local HTML fix and both original reports remain unchanged.
2. JSON/Markdown include all literal categories, both full parsed inputs, byte digests, exact sorted IDs and before/after evidence. Unknowns/removals stay visible; after failures produce exit 1.
3. All four supported kinds and validated same-kind/example/schema constraints are covered. Invalid/ambiguous inputs fail with exit 2 before writes.
4. Both input alias protection and full destination preflight preserve prior bytes on predictable conflicts.
5. Required checks, clean-source/extracted-package proof and separate independent Standards/Spec reviews have retained receipts. Resolve introduced findings, update this Status/Execution Report with the source commit, attach the dependency-declared PR and verify exact-head CI through Code Review.

## 📄 Execution Report

Planning: the active goal authorizes routine local-core iteration and the existing real CLI acceptance seam. TICKET-017 completed a bounded first-use journey without a confirmed defect; report comparison follows the explicit compare-later-observations need. The specification defines structural comparison, source retention, compatibility limits and observable acceptance before source implementation. No comparison capability is claimed at this checkpoint.
