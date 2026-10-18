# TICKET-039: Inspect YAML input text integrity

Status: Completed bounded discovery; TICKET-040 accepted
Assignee: Codex
Target Workspace: codex/yaml-input-discovery at main ea594befaf0827c1b03b264a646abc13df623946
Blocked by: TICKET-038 delivery (complete)
Objectives: Establish whether invalid UTF-8 bytes in supplied config/product/query YAML are reported as failures or silently substituted in product evidence.
Hard constraints: Actual local fictional CLI inputs only, no source change before accepted contract. Preserve historical receipts, frozen case/private files/submitted ZIPs. Do not infer full YAML encoding conformance from UTF-8-only core behavior. No paid/live/platform action. Primary owns execution; independent assessor uses a separate worktree/index.
Acceptance Criteria: Actual CLI invalid-byte observations in all three YAML positions, valid literal replacement-character and BOM controls, original source hashes/bytes and outputs/exits/runtime retained. Independently assess actual effect and primary-source encoding limits before accepting any correction. Report bounded no-defect or narrow next scope without inventing product facts.

## Execution Report

Previous goal turn made progress: PR #39 merged as ea594befaf0827c1b03b264a646abc13df623946; exact-head and actual-main CI passed 227 tests/typecheck/build/four examples. This turn freshly observes the same main, no open PRs and only upstream issue #7. Agensi's existing six-hour interval is not due. Actual YAML observations remain pending.

Six actual plan commands and a native byte probe establish invalid-byte substitution in product claims/query text, with a separate ignored-config-comment acceptance case. Three valid Unicode/escape/BOM controls succeed. All 18 YAML source digests/bytes remain unchanged; no original-file loss is claimed. Independent assessment authenticates 61 packet entries and supports one shared byte validator before decoding, preserving JSON wording/BOM and YAML parser/lazy-loading behavior. Primary reviewed YAML 1.2.2 section 5.2; no UTF-16/32/full-conformance claim is made. Accepted TICKET-040 / issue #40 and its narrow CLI seam/specification. No source implementation or fresh suite result yet.
