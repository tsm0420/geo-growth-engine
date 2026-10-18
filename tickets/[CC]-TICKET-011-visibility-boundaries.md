# TICKET-011: Count underscore-delimited brand and competitor mentions

Status: Implemented and independently reviewed; clean-source/package verified; final PR CI pending
Assignee: Codex
Target Workspace: `geo-growth-engine`, branch `codex/visibility-mention-boundaries`
Blocked by: TICKET-007 investigation (complete); PR #12 open and unmerged (transitive #11/#9)
Specification: `docs/core-hardening-spec.md`, TICKET-011

## Objectives

Match the documented Unicode letter/number boundary contract for brands, aliases and competitors while preserving sample denominators and evidence.

## Hard constraints

Existing local-input core only; English docs, strict TypeScript, real CLI red/green tests, independent Standards/Spec worktree reviews and same-commit ticket reports. Preserve private data/history/unknowns. No live requests, paid services, merge or publication.

## Acceptance Criteria

- Real visibility CLI input with underscore-delimited names yields literal expected mention and competitor counts; embedded letter/number variants remain excluded; raw evidence/grouping/unknowns remain unchanged.
- Required typecheck/full suite/build pass, with actual raw receipts and separate resolved review reports before source commit.
- Deliver a reviewable PR with prerequisite, current candidate/package evidence and final-head CI; update the loop ledger before selecting the next justified item.

## 📄 Execution Report

Removed underscore from the Unicode letter/number exclusion boundary shared by configured brands, aliases and competitors. Regex escaping, case-insensitive matching, embedded-letter/number rejection, report grouping, denominators and raw evidence remain preserved.

Actual real CLI red regression returned mentionRate 1/7 rather than 3/7. After correction, all five visibility tests passed. `npm run typecheck`, `npm test` (70 passes, zero failures/skips), and `npm run build` exited 0 on Darwin 25.5.0 arm64 / Node v24.18.0 / npm 11.16.0. Original receipts are in `docs/verification/TICKET-011/`. Separate Standards and Spec reports found no actionable introduced defects and each independently ran all five focused tests with the supplied dependency copy; reports are in `docs/reviews/TICKET-011/`.

Immutable source/package identity and final-head PR CI remain pending delivery steps. No merge, tag, release, dependency or provider change occurred.

Immutable alpha.3 source `1a223de98e41473bacb743572db704ccce23d509` passed fresh install/typecheck/70 tests/build, then all 19 expected extracted-package command outcomes. This includes all six commands, earlier protection/validation regressions and literal underscore/embedded-name counting with exact retained records. Frozen YinThread remains 16 pass / 1 fail / 2 unknown, sitemap 146/145/1. Tarball SHA-256 `7dd137f34bc30de27bf806163560be74acff8a152f00345dbb4174b736c83cc5` (20,522 bytes). Original commands/exits/cwd/times/output, runtime and every packaged file hash are in `docs/verification/TICKET-011/candidate/manifest.json` and adjacent receipts. Tarball remains a local ignored artifact. Final-head PR CI is pending.
