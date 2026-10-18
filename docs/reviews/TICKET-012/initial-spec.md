# TICKET-012 Spec review

**One actionable in-scope finding.** Reviewed the actual tracked/untracked proposal against fixed base `5e2c0a44dc66d2b300cf69384248f1f9a97ee8f7` (PR #13 head), including the agreed research addendum. Runtime changes are the original-source validation and numeric-spelling decoder in `src/audit.ts`, with corresponding CLI tests and documentation/evidence.

**[P2] Literal-section removal hides undeclared references inside attributes — `src/audit.ts:61`.** Requirement: “Recognize references outside CDATA/comments/processing instructions only” and “including attribute values and ignored element text.” The global replacement treats literal-section-shaped substrings inside quoted attributes as actual XML comments/CDATA/PIs, removing their references before validation. The existing structural validator accepts those attributes, so the new guard is bypassed.

Verified real CLI input:

```xml
<urlset note="<!-- &unknown; -->"><url><loc>https://example.com/</loc></url></urlset>
```

Actual: exit **0**, sitemap **pass**, duplicates **pass**, non-null one-entry summary. Expected: exit **1**, sitemap **fail**, duplicates **unknown**, null summary. The attribute contains an undeclared entity; it is not a real comment. Equivalent fake CDATA and PI attributes reproduce the same success. An independent XML parser rejects all three bodies.

Make literal-region recognition respect quoted attributes, or reject their prohibited raw `<` before skipping sections; do not exempt attribute references based on marker-shaped text. Add real CLI regressions for these cases, preserving genuine comments/CDATA/PIs and escaped attribute controls. This is a hole in the specifically required ignored-attribute protection, not a request for namespace/schema expansion or full conformance certification.

Actual verification: `node --test tests/xml-reference.test.ts` passed **34/34**, zero skips; then three independent CLI probes reproduced the bypass. Exact argv, timestamps, stdout/stderr/exits, original inputs and reports are retained under `/private/tmp/geo-ticket012-probes/`. Saved red/green, long-numeric, typecheck/full-104-pass/build receipts were read, not rerun. Dependencies reused the supplied APFS copy; Node v24.18.0, Darwin arm64. No tracked edits or network access. Package/final-head CI remain pending gates; other queued defects are outside this slice. Spec axis only.
