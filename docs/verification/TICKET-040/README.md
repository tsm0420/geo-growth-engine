# TICKET-040 source verification

Actual primary first-red observes product-plan exit 0 versus expected 2; first-green rejects invalid bytes before replacing existing JSON/Markdown. Seven new CLI tests cover root/product comments across all four commands, lazy query-plan behavior, four other malformed sequence classes, Unicode/escape/BOM YAML, exact existing JSON diagnostics at both ingress paths and JSON BOM parser rejection. Inputs and predictable prior/fresh artifacts are protected.

Full suite: 234 passed, zero failed/skipped; typecheck/build exit 0 on Node 24.22.0. One neutral helper owns validation, with explicit JSON/YAML labels; parser-specific BOM behavior remains intact. The obsolete generated json-text.js was removed only after matching its exact T038 package hash, with a retained receipt; source/history retain their original paths. No new skill validation is claimed; unchanged skill proof is eligible only by byte identity.

checked-inputs.json pins current source/tests/package/docs/skills/templates/workflows. Independent reviews, immutable package and final-head/main CI remain separate gates. No UTF-16/32 decoder, full YAML conformance, live measurement, release or marketplace result is claimed.

Separate Standards/Spec reviews each authenticated 133 snapshot files and 48 checked inputs, with no actionable introduced findings. Reports explicitly retain static-only limits and bounded generated-file-removal evidence. Current source/test/package bytes remain identical to the successful full checks.

## Immutable package checkpoint

Reviewed source `b29de7a249a6a9a8b6c0f3fcb1f24894706766aa` produced the actual 29,021-byte tarball, SHA-256 `95bf8806f564758cd4436b5b928b40b91c323aa80be0d652ad4cb7e1e67f77c1`. All 25 built/tar/installed identities match: old json-text.js is absent, utf8-text.js is added and only four existing paths change otherwise. All 48 checked inputs match actual Git/archive/current bytes. All 34 preparation/consumer outcomes matched expected exits.

Independent static authentication verified 325 snapshot files, 48 checked-source plus 39 reference Git-object identities, 25 package identities, 34 receipts, 28 retained input baselines, 18 original consumed YAML files and eight copied sentinels, with no material finding. Legal YAML/BOM, lazy queries, old JSON diagnostics/BOM, original queryGroups/raw evidence and both comparison modes agree. Five unchanged skill validations are exact T038 reuse, not current runs. Temporal/fresh-path assertions remain separate from copied-byte authentication.

Final-head CI, ordinary standing-authorized merge and actual-main CI remain separate delivery gates in issue #40's linked PR and the ignored local delivery checkpoint. No release, platform approval or full YAML encoding conformance is claimed.
