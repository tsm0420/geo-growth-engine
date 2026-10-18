# TICKET-040: Reject malformed UTF-8 YAML before parsing

Status: Source verified and independently reviewed; immutable package pending
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
