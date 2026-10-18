# TICKET-030 source and parser verification

Discovery/ retains original three CLI calls and actual bundled marked17.0.5 GFM/Cheerio output: LF one unknown row; CR/CRLF an empty-status fragment plus unknown row. Escaped pipes already prevent the supplied invented-pass payload from becoming a status column. Original assessment and separate rendering addendum are retained in docs/reviews/TICKET-030/.

The first regression run passes LF and fails CR/CRLF. After one shared formatter expression changes, all3 pass. An additional real compare control retains raw strings/documents/digests and escaping. Required typecheck,194 tests (0 failed/skipped) and build pass. checks-manifest.json identifies exact working source/test/runtime bytes based on planning commit8eda172; no immutable source commit existed at that execution.

rendered/ and render-check files retain three actual post-fix CLI/parser checks and exact harness source as an artifact. All3 now produce one unknown HTML row; JSON findings/data/statuses and input bytes remain identical. This is actual local parser/DOM inspection, not native browser validation. Primary also verified all1595 prior artifact sizes/hashes against the local preservation baseline. Package, source review and final CI/merge gates are separate; no new dependency/live measurement/release/marketplace approval is inferred.
