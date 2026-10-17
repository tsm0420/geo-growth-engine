# TICKET-013: Infer crawler URLs from encoded filesystem path segments

Status: Implemented and independently reviewed; immutable package/final-head CI pending
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

## Review addendum before correction

Independent Spec review reproduced a literal POSIX `blocked\notes.html` filename being converted into a directory route before encoding; matching encoded Disallow rules incorrectly pass. Preserve literal POSIX backslashes while converting only the host platform separator. Add a real POSIX filename regression (explicit Windows skip for an unavailable filename), retaining ordinary Windows directory semantics. Original probe: `docs/verification/TICKET-013/spec-backslash-probe.zip` and its path-mapping manifest.

## 📄 Execution Report

Encoded inferred export URLs per filesystem segment after preserving the actual platform separator. Literal #/?/% and POSIX backslashes remain filename data, while directories/index conventions retain their existing route meaning. Canonical selection remains separate, training informational and live routing unknown.

Real CLI test-first receipts under `docs/verification/TICKET-013/` reproduce reserved filename false passes and the initial Spec P2 literal-backslash false success. The original probe/archive path mapping, initial reviews and earlier six/109-pass checks remain historical. After platform-aware conversion, all seven safety tests and 110 full-suite tests passed, zero failures/skips; current typecheck/build exited 0 on Darwin 25.5.0 arm64, Node v24.18.0/npm 11.16.0. The POSIX-only filename test explicitly skips on Windows; no Windows execution is claimed.

Both independent axes reassessed the changed source and reran seven focused tests with copied dependencies. Final Standards and Spec reports have no outstanding actionable introduced defects; Spec reran the original probe with both bots blocked at the expected encoded URL. Reports/final receipts are in `docs/reviews/TICKET-013/`.

Immutable source/package and final-head PR CI remain pending delivery steps. No dependency, live request, private-file, merge, tag or release change occurred.
