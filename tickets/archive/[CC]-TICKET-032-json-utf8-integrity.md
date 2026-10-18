# TICKET-032: Reject malformed UTF-8 at JSON import boundaries

Status: Reviewed implementation milestone verified; final delivery tracked in issue #32 and its PR
Assignee: Codex
Target Workspace: codex/json-utf8-integrity, main029f917635794f277293f294d26e312e10cfef71
Blocked by: TICKET-031 bounded discovery and independent assessment (complete)
Issue: https://github.com/tsm0420/geo-growth-engine/issues/32
Specification: docs/json-utf8-integrity-spec.md
Objectives: Reject corrupt visibility JSONL and either comparison report before lossy decoding or output writes; preserve valid text and evidence.
Hard constraints: English/strict TypeScript; no new dependency/flag/normalization/other-format policy; preserve BOM/blank-line/schema behavior, historical receipts, frozen case files and submitted ZIPs. Standing merge consent applies.
Acceptance Criteria: Actual CLI first-red/green for visibility and both compare sides; malformed-sequence matrix, late corruption/all-or-nothing/preexisting and fresh output protection; valid replacement/astral/combining text and exact raw hashes; typecheck/tests/build, separate Standards/Spec reviews, immutable installed-package proof, final-head CI and ordinary merge/main verification.

## Execution Report

Five retained original commands at current main029f917 establish corrupt-answer acceptance and one collapsed compare ID, without a false-brand-match claim. Independent assessment verified all29 discovery packet hashes and the exact malformed bytes/outcomes. Native Node24.22.0 isUtf8 controls distinguish valid U+FFFD/astral/combining/empty/BOM from five malformed sequence classes. The accepted real CLI seam and correction contract are specified before source changes. Implementation and delivery checks remain pending.

Source checkpoint: visibility first-red fails0vs2, first-green passes; both compare-side first-red cases fail0vs2 and first-green all3 pass. Full206-test suite passes with0 failures/skips; typecheck/build succeed on Node24.22.0. Twelve new actual CLI tests cover malformed sequence classes, later corruption, preexisting/fresh output protection, valid replacement/astral/combining strings and raw evidence/digests, BOM/JSON errors and empty/null rates. Original receipts and input hashes are retained under docs/verification/TICKET-032/. No package or CI delivery is claimed yet.

Independent Standards and Spec reviews both report no actionable introduced finding, each verifying71 snapshot files and the32 primary checked-input identities. Reports preserve static-review limits and do not claim reruns. Package preflight found one evidence-baseline timing gap; primary corrected it before execution, retaining original harness/report and a separate resolving addendum. Source/test/config bytes remain exactly those checked by the206-test suite; no repeat suite is justified. Commit this reviewed source before fresh immutable package execution.

Immutable package execution completed from reviewed90bb5f0863f76bd1245d9fec62bccd8108e66db1 with all18 expected outcomes. Actual27337-byte tar SHA-2561a829e57671ebb08265c63d231bf26d3f2f9de849b65261c57d8d5c4911f5518; all25 built/tar/installed identities match, with the four planned changed inputs only. Unicode/raw evidence/digests, late corruption, both compare sides, fresh/existing outputs and collision controls passed. Original positive-input baselines were captured before consumption as required by the preflight correction. Five unchanged skill validations are scoped reuse. The initial mistyped revision argument was rejected before package work; the actual successful run uses the full revision read from Git.

Independent static artifact authentication verified all151 snapshot entries and18 receipts with no material finding. It preserves limits around primary source-matching assertions, fresh-directory absence, unchanged skill reuse and no reruns. This archived ticket is a verified implementation checkpoint. Final-head PR CI, ordinary standing-authorized merge and actual-main CI are separately owned by the PR linked to issue32 and reports/candidates/TICKET-032/delivery-checkpoint.json; they are not prematurely claimed complete by this pre-PR commit. The continuous goal remains active.
