# TICKET-005: Investigate the deprecated encoding dependency

Status: In progress
Assignee: Codex
Target Workspace: `geo-growth-engine`, branch `codex/alpha-2-candidate`
Blocked by: None
Issue: https://github.com/tsm0420/geo-growth-engine/issues/7
Specification: `docs/releases/alpha-2-spec.md`

## Objectives

Reproduce the installed `whatwg-encoding@3.1.1` dependency path and warning. Verify supported migration options against current official source and package metadata. Add a real audit CLI decoding regression before a migration. Implement a compatible upstream-supported update if available; otherwise record the demonstrated constraint with sources and leave the issue open.

## Hard constraints

English repository text; strict types; no forced overrides or new paid/network runtime behavior. The research agent uses its own worktree/index and writes its research result under `/private/tmp`; only the primary coder edits implementation. Preserve all private application files.

## Acceptance criteria

- Raw dependency/installation evidence and dated primary-source links establish the actual path and supported outcome.
- CLI regression observes UTF-8 and HTML entity decoding in report evidence; actual test command/output retained.
- Any dependency change passes typecheck and full CLI suite, receives separate Standards/Spec reviews, and updates this report/status in the same commit.
- An unsupported upstream migration is explicitly unresolved; no claim that the warning was removed.

## Research dispatch

Research in the separately managed `geo-alpha-candidate` worktree at base `75d5e6e`. Inspect package/lockfile and current primary sources only. Return a cited Markdown investigation and raw receipts under `/private/tmp/geo-alpha-2-research`. Do not edit repository files or use local funding drafts. Identify available supported parent releases and whether import-path-only changes affect installed dependencies. No fabricated installation or decoding results.
