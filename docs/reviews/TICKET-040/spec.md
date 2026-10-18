# TICKET-040 independent Spec review

No actionable findings.

## Reviewed identity

Baseline: `ea594befaf0827c1b03b264a646abc13df623946`; own HEAD `17dfd8c` is planning only. Reviewed the immutable proposal packet/source diff directly. All 133 packet sizes/hashes match `snapshot-manifest.json`, SHA-256 `6a60a547011b6388b0ddbba89f1817bc473b0fb6838dd2a598aa12c4fcc117b1`; all 48 checked-input identities match packet bytes.

## Assessment

Specification line 13 requires validating consumed YAML bytes “before decoding/parseDocument.” `src/config.ts:32` now reads a Buffer and applies the shared `isUtf8` guard before decoding and parser entry, including malformed comment bytes. Errors name the YAML source/format; CLI exception handling precedes writer entry. Existing sources remain read-only rather than being rewritten with replacement characters.

The neutral `utf8-text` module replaces the obsolete JSON-specific source without a wrapper. Explicit JSON/YAML labels retain the exact established JSON diagnostic (specification line 15). The two JSON callers retain their prior parser, raw-evidence and digest paths.

Lazy queries remain intact: root config/product load through `loadConfig`, while only plan invokes `loadQueries`. Other report commands protect the configured query path without parsing its contents. Valid Unicode/escaped U+FFFD and YAML BOMs reach the unchanged YAML parser; JSON BOMs likewise reach their existing rejection path. Schema, aliases, warnings, versions, matching, queryGroups and comparison-range behavior are unchanged. No dependency, flag, UTF-16/32 decoder or broader conformance claim was added.

Seven public CLI regressions cover malformed boundaries/comments/sequences, fresh/prior artifacts, raw input preservation, lazy queries, valid Unicode/BOM controls and exact JSON compatibility. Primary receipts retain the original 0-versus-2 red failure, first-green, seven focused passes, then 234 full-suite passes with zero failures/skips and typecheck/build exit 0 on Node24.22.0. The generated-helper removal receipt records identical expected/observed prior hashes.

## Limits

Static review only; no product/test/harness/network execution or Standards-report reading. The receipt supports the reported bounded cleanup; removed bytes were not independently resampled. Fresh immutable package/helper inventory authentication, consumer proof, final-head CI and merge/main verification remain separate gates. Historical artifacts outside this packet were not independently authenticated.
