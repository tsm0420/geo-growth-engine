# TICKET-038 independent Spec review

No actionable findings.

## Snapshot and evidence

Fixed baseline: `7d3655dbcf750ec057998855d743b9d316b4f927`; planning HEAD `0931190`. Reviewed the actual immutable proposal packet, including its source diff, visibility implementation, six new CLI tests, documentation and changed skill. All 107 packet sizes/hashes match `snapshot-manifest.json` (SHA-256 `b0431976d8e7ce91cc9da4e15f24c2ea5710ec6892e6a81e2435e9c68b08af13`); all 47 checked-input identities match packet bytes. My worktree still contains planning bytes; it was not treated as the implemented proposal.

## Assessment

The contract requires “Group identity is the exact five-string tuple” and “Rows appear in first-observed tuple order” (`docs/query-visibility-spec.md:14,16`). Fixed-key JSON serialization distinguishes the query and four context strings without separator collisions; the insertion-ordered Map preserves first observation. Existing string validation returns original text. No normalization or configured-query join is added.

Query rows reuse the unchanged statistics owner, retaining successful-response denominators, repeated distinct-ID attempts, error counts, zero competitor counts and null recommendation rates. Error-only versus successful-zero and empty-array outcomes match specification lines 13–15. Existing totals/groups/findings/example/exit/raw bytes/digests remain on their prior paths; Markdown Details serializes the same data. Global duplicate-ID validation still precedes grouping/writes.

Both unchanged comparison modes retain opaque queryGroups; explicit mode compares headline totals only, and older reports without the new field remain accepted. README/configuration/skill guidance directs raw-answer inspection with context, coverage and null/zero distinctions, without ranking or cohort claims.

Retained primary receipts show first-red/green, six focused passes, 227 full-suite passes with zero failures/skips, final typecheck/build success and successful changed-skill validation. The original broadened-test failure and corrected camelCase-to-existing-hyphenated count expectation are retained; no product correction is inferred from that expectation error.

## Limits

Static review only; no product/test/harness/network execution or Standards-report reading. Immutable package/consumer authentication, exact-head CI, merge/main proof and marketplace outcomes remain separate gates. Historical artifacts outside this packet were not independently resampled.
