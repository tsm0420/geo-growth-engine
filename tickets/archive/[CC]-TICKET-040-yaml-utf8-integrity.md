# TICKET-040: Reject malformed UTF-8 YAML before parsing

Status: Reviewed implementation milestone verified; final delivery tracked in issue #40 and its PR
Assignee: Codex
Target Workspace: codex/yaml-input-discovery at main ea594befaf0827c1b03b264a646abc13df623946
Blocked by: TICKET-039 actual CLI/native discovery and independent assessment (complete)
Issue: https://github.com/tsm0420/geo-growth-engine/issues/40
Specification: docs/yaml-utf8-integrity-spec.md
Objectives: Preserve supplied product/query text by rejecting malformed YAML byte streams before lossy decoding.
Hard constraints: English, strict TypeScript, one shared validator with explicit JSON/YAML diagnostics; preserve valid Unicode/BOM/parser/schema/alias/path/lazy-query behavior and existing JSON error wording. No wrappers, new dependency, UTF-16/32/full-YAML certification, live/paid/marketplace change. Preserve source bytes, historical receipts, frozen case, private files and submitted ZIPs. Standing merge consent applies.
Acceptance Criteria: Actual CLI red/green, three consumed YAML boundaries, malformed sequences/comments, fresh/prior artifacts/input bytes, valid Unicode/escape/BOM and unused-query/JSON compatibility; typecheck/tests/build, separate Standards/Spec reviews, immutable renamed-helper package/consumer proof and authentication, final-head CI plus ordinary merge/main verification.

## Execution Report

Six actual fictional plan outcomes and native byte validation demonstrate parsed substitution, rather than original-file loss. Independent assessment verifies 61 packet files and 18 source baselines. The accepted specification records raw-buffer validation, one neutral helper owner, existing JSON diagnostic/BOM preservation, valid YAML controls and approved real CLI seams before implementation. Implementation and verification remain pending.

Source checkpoint: raw-buffer YAML validation now uses a neutral utf8-text helper with explicit labels, shared by both existing JSON callers. Actual first-red/green and seven new CLI controls pass; full suite reports 234 passed, zero failed/skipped, with typecheck/build exit 0 on Node 24.22.0. Exact old JSON diagnostics, JSON/YAML BOM differences, legal Unicode and unused-query behavior remain tested. Removed only the exact known obsolete generated helper after matching its T038 hash. Source/test/package bytes are pinned for separate reviews; immutable package and delivery remain pending.

Separate independent Standards and Spec reviews verify all 133 snapshot entries and 48 checked inputs, with no actionable introduced findings. Both distinguish the immutable candidate from their planning worktrees and primary receipts from reviewer execution. Exact current checked bytes remain unchanged after the successful 234-test/typecheck/build checkpoint. Commit this reviewed source before fresh immutable package execution; inventory replacement, consumer, final-head/main CI remain separate gates.

Immutable package checkpoint: actual reviewed source `b29de7a249a6a9a8b6c0f3fcb1f24894706766aa` produced a 29,021-byte tarball, SHA-256 `95bf8806f564758cd4436b5b928b40b91c323aa80be0d652ad4cb7e1e67f77c1`. All 25 built/tar/installed identities match the intended helper replacement and four changed existing paths. All 34 expected outcomes pass, with 48 Git/archive/current source identities, exact YAML/JSON diagnostics/BOM, valid/lazy/query and comparison controls.

Independent artifact authentication verifies 325 snapshot entries, 48 source plus 39 reference Git objects, 34 receipts, 28 retained input baselines and eight copied sentinels with no material finding. Five unchanged skill-validator outcomes are exact T038 reuse; no new validator execution is claimed. Original YAML bytes remain intact and temporal/fresh-path assertions remain primary-owned.

Current source/test/package bytes remain identical to successful 234-test/typecheck/build checks. Five submitted ZIPs and 17 frozen case paths retain their Git blob identities and clean tracked paths; T034 raw-byte proof is scoped reuse. No private files or fresh platform observation were used.

This archived ticket is a verified implementation milestone. Final-head CI, ordinary standing-authorized merge and actual-main CI are separately owned by issue #40's linked PR and reports/candidates/TICKET-040/delivery-checkpoint.json, rather than prematurely asserted in this pre-PR commit. The continuous goal remains active.
