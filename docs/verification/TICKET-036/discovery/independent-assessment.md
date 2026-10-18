# TICKET-035 parsed-report retention assessment

Confirmed retention defect; a bounded prewrite nonfinite-number guard is justified, with implementation acceptance separate.

Static authentication verified all 30 packet sizes/hashes, three input digests and CLI/native-parser receipts. All comparisons exit 0. Native Node 24.22.0 receipts show `1e308` remains finite, while `±1e400` parses as `±Infinity`. In both embedded input reports, overflow becomes null in nested opaque-data arrays, finding extensions and top-level extensions; JSON and Markdown Details agree. Original input bytes/digests remain correct; finding categories are unchanged. No product/parser/test execution was performed by this assessor.

This violates full parsed-document retention in `docs/report-comparison-spec.md` and `tests/compare.test.ts:94–105`. `src/compare.ts:35,44,50–51,89` retains parsed values/extensions, while `src/report.ts:39–42` serializes nonfinite numbers as null. Other retained extension positions, including summary extensions, share that mechanism; independent before-only/after-only and explicit-mode overflow-extension cases are still unobserved here.

Recommend one unknown-safe whole-document traversal in the comparison owner, rejecting nonfinite numeric values in either complete retained report, including objects/arrays and all extension positions. Place it after existing optional metric validation (`compare.ts:71`) and before classification/output. Preserve `tests/visibility-comparison.test.ts:188–191`'s meaningful `after data.totals.citationRate` diagnostic; a generic earlier reviver would replace it. Rejection should be exit 2 naming the source/field, before creating/replacing JSON or Markdown, with source bytes untouched.

Real-CLI controls should cover both sides/modes, positive/negative overflow, nested/data/finding/summary/top extensions, fresh/existing output preservation and finite/null/string opaque controls. Keep default data free of metric-semantic validation.

The supplied RFC 8259 section 6 notes permit implementation range limits: `1e400` has valid JSON syntax but exceeds the supported finite runtime range. Document that rejection. No arbitrary decimal-precision, safe-integer, underflow, normalization or other-format policy is implied.
