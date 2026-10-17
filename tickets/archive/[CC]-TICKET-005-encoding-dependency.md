# TICKET-005: Investigate the deprecated encoding dependency

Status: Completed investigation; upstream migration unresolved
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

## 📄 Execution Report

On 2026-10-17, isolated research reproduced the successful locked installation warning and exact Cheerio 1.2.0 -> encoding-sniffer 0.2.1 -> whatwg-encoding 3.1.1 path. Current official registry and source receipts establish that the supported Cheerio range has no published migration; upstream main's change is unreleased. No override or parser substitution was made. Issue #7 remains open with the investigation appended. `docs/research/encoding-dependency.md` and 24 original JSON receipts under `docs/verification/alpha-2/dependency-research/` record commands, times, exits and sources; their copied hashes were verified.

Added a real audit CLI regression preserving UTF-8 and named/numeric HTML-reference decoding in JSON/Markdown evidence. `node --test --test-name-pattern='preserves UTF-8' tests/core.test.ts` passed at baseline. After the combined candidate changes, `npm run typecheck`, `npm test` (33 including subtests), and `npm run build` passed on Darwin arm64 / Node v24.18.0 / npm 11.16.0. Raw outputs/exits are under `docs/verification/alpha-2/receipts/`. Separate pre-commit Standards and Spec reviews found zero actionable introduced defects (`docs/reviews/alpha-2/`). The investigation is complete; removal of the installation warning is explicitly not achieved.
