# TICKET-036: Reject unsupported comparison numeric range

Status: Ready for execution
Assignee: Codex
Target Workspace: codex/compare-number-range, main7d0ab6ed862b2ee244e88f1539d072544ec0c76a
Blocked by: TICKET-035 actual CLI/native discovery and independent assessment (complete)
Issue: https://github.com/tsm0420/geo-growth-engine/issues/36
Specification: docs/compare-number-range-spec.md
Objectives: Prevent successful comparison output from silently replacing unsupported parsed numbers with null.
Hard constraints: English/strict TypeScript; preserve explicit metric field diagnostics and default opaque semantics; no arbitrary precision/finite-rounding/safe-integer/other-format policy, dependency or CLI change. Preserve sources/raw digests, historical receipts, frozen case data and submitted ZIPs. Standing merge consent applies.
Acceptance Criteria: Actual CLI first-red/green, both sides/signs/modes and independent extension/nested positions, positive finite/null/string preservation, fresh/preexisting output and input-byte protection; typecheck/tests/build, separate Standards/Spec reviews, immutable installed-package proof, exact-head CI and ordinary merge/main verification.

## Execution Report

Three actual fictional commands/native-parser probes establish null substitution for ±1e400 while finite1e308 and all raw hashes remain correct. Independent assessment authenticates30 packet entries and confirms the parsed-retention contract gap. Existing explicit citationRate field diagnostics require the general range guard after optional metrics validation; the contract records that order before implementation. Valid JSON syntax and runtime range are distinguished. Implementation and delivery gates remain pending.
