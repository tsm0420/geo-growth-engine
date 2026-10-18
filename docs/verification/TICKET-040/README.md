# TICKET-040 source verification

Actual primary first-red observes product-plan exit 0 versus expected 2; first-green rejects invalid bytes before replacing existing JSON/Markdown. Seven new CLI tests cover root/product comments across all four commands, lazy query-plan behavior, four other malformed sequence classes, Unicode/escape/BOM YAML, exact existing JSON diagnostics at both ingress paths and JSON BOM parser rejection. Inputs and predictable prior/fresh artifacts are protected.

Full suite: 234 passed, zero failed/skipped; typecheck/build exit 0 on Node 24.22.0. One neutral helper owns validation, with explicit JSON/YAML labels; parser-specific BOM behavior remains intact. The obsolete generated json-text.js was removed only after matching its exact T038 package hash, with a retained receipt; source/history retain their original paths. No new skill validation is claimed; unchanged skill proof is eligible only by byte identity.

checked-inputs.json pins current source/tests/package/docs/skills/templates/workflows. Independent reviews, immutable package and final-head/main CI remain separate gates. No UTF-16/32 decoder, full YAML conformance, live measurement, release or marketplace result is claimed.

Separate Standards/Spec reviews each authenticated 133 snapshot files and 48 checked inputs, with no actionable introduced findings. Reports explicitly retain static-only limits and bounded generated-file-removal evidence. Current source/test/package bytes remain identical to the successful full checks.
