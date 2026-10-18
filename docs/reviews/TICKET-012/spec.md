# TICKET-012 final Spec review

**No outstanding actionable Spec findings.** Independently reassessed the revised actual proposal against fixed base `5e2c0a44dc66d2b300cf69384248f1f9a97ee8f7` (PR #13 head) and the agreed XML research addendum. The initial P2 report and original probes remain preserved separately.

The original-source scanner now distinguishes tags and quoted attributes before skipping genuine comments/CDATA/processing instructions. Raw `<` inside a quoted attribute is rejected rather than allowing marker-shaped text to hide undeclared references. This closes the required ignored-attribute protection: “Recognize references outside CDATA/comments/processing instructions only,” including attribute values. Character ranges are checked throughout the original source, and malformed references fail before URL counting.

Valid predefined/decimal/lowercase-hex references and long leading-zero spellings remain supported through one decoder pass. Genuine literal sections, escaped ampersands and escaped attribute markers remain literal; numeric normalization is delegated only inside the decoder, without rewriting CDATA. Existing structural validation, DTD exclusion and expansion-limit configuration remain in place. Documentation accurately avoids full schema/namespace/encoding-conformance claims.

Actual checks in the isolated worktree:

- `node --test tests/xml-reference.test.ts`: **38/38 passed**, zero skips, including new quote-context negative and literal positive controls.
- Repeated all three original independent attribute bypass probes against the revised CLI: each now returns **exit 1**, sitemap **fail**, duplicates **unknown**, and null sitemap data. Original inputs and new command/output/exit receipts remain under `/private/tmp/geo-ticket012-probes/*-final.json`; prior receipts were not overwritten.

Read current `review-green`, `typecheck-final`, `tests-final` (108 passes) and `build-final` receipts, all exit 0. Those broader commands were not rerun by this reviewer. Dependencies reused the supplied APFS copy; Node v24.18.0, Darwin arm64. No tracked edits, commits, other-worktree or network access. Immutable candidate/package verification and final-head CI remain pending delivery gates. Other queued defects are outside this slice. Spec axis only.
