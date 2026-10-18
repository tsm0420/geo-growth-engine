# TICKET-030: Preserve Markdown rows across supplied line endings

Status: Source checks and both review axes passed; immutable package/CI delivery pending
Assignee: Codex
Target Workspace: codex/markdown-line-ending-integrity, main5f13ef7271ede5bbc9d258f922e3d368a0c346fc
Blocked by: TICKET-029 actual CLI/parser discovery (complete)
Issue: https://github.com/tsm0420/geo-growth-engine/issues/30
Specification: docs/markdown-line-ending-spec.md
Objectives: Correct the shared Markdown formatter's observed CR/CRLF row split while preserving original JSON and evidence.
Hard constraints: Strict TypeScript/English docs, no new dependency/CLI/sanitization policy, no domain-string normalization, no fabricated pass or browser claim; preserve exits/file protections, historical receipts, frozen case data and submitted ZIPs. Existing standing merge consent applies.
Acceptance Criteria: Retained real CLI red/green and LF/CR/CRLF literal controls; unchanged JSON/source/digest/evidence and existing escapes; actual local rendered rows match one finding; required typecheck/tests/build, separate independent review axes, fresh immutable installed-package proof and exact-head CI/ordinary merge/main verification.

## Execution Report

The previous goal turn was progress: PR29 merged with final-main190-test CI and exact reviewed tree. Current state was confirmed at main5f13ef7 with a clean identical working tree. Bounded TICKET-029 discovery observed a serialization gap and then reproduced its actual GFM HTML row impact using the already installed bundled marked17.0.5 and Cheerio. Independent assessment and separate render addendum verify the retained artifacts and explicitly reject the unsupported fabricated-pass hypothesis. This specification fixes the concrete row-layout defect, not a speculative larger sanitization feature. No source correction or new test result is claimed yet.

Implementation checkpoint: the shared formatter changes only CRLF/CR/LF display normalization. First-red retained one LF pass and two CR/CRLF failures; first-green all3 pass. Added compare preservation/escaping control. npm run typecheck, npm test (194 passed,0 failed/skipped) and npm run build succeed with raw receipts/runtime/working-input hashes retained under docs/verification/TICKET-030/. Three actual post-fix CLI/parser conversions now produce one unknown row each, with original findings/data/statuses/input bytes unchanged. All1595 prior artifact sizes/hashes remain unchanged. Separate source reviews, immutable package and final CI/merge remain pending.

Separate Standards and Spec reviews both report no actionable introduced finding; originals are retained under docs/reviews/TICKET-030/. They verify pinned working bytes and inspect the retained primary194-test/parser evidence without claiming execution. Package preflight identified two narrow planned-proof gaps (renderer identity and visibility metadata digest); primary corrected the unexecuted harness, preserving its original and report for a separate addendum. Product source/tests remain unchanged. Commit reviewed source before the fresh package execution.
