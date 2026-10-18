# TICKET-014 Spec review

**No actionable introduced Spec defects found.** Reviewed the actual tracked/untracked proposal against fixed base `9f2ea9ca3c07a69fc3ee36093e6322f56b1f686c` (PR #15 head), rather than planning-only HEAD. Runtime scope is the separate serialized coverage lookup; original decoded locations remain unchanged for duplicate counts, positions and evidence.

The implementation satisfies symmetric URL comparison while preserving distinct path/query controls. Malformed locations remain failed sitemap findings with unknown/null duplicate data; their serialization exceptions are caught without turning a finding failure into operational exit 2. Existing crawler paths and explicit unknowns are unaffected.

Current reviewed configuration paragraph:

> Canonical coverage uses the same URL serialization for the canonical and each decoded sitemap location. Bare origins/trailing root slashes, hostname case and URL-serialized apostrophes can therefore cover the same canonical. This separate coverage lookup does not change the original decoded strings used for duplicate identity/evidence. Path case, `/a` versus `/a/`, unreserved escapes such as `/%61` versus `/a`, and query order remain distinct; ordinary URL parsing still applies. Malformed locations still fail the sitemap finding with unknown/null duplicates rather than becoming report-generation exceptions.

Actual verification: ran `node --test tests/coverage.test.ts` in the assigned isolated worktree. **11/11 passed, zero skips**: bare-origin/hostname/apostrophe equivalents, distinct path case/trailing slash/query order/encoded-path controls, unchanged exact duplicate identity/evidence, and malformed-location failure behavior.

Read saved red/green, typecheck, full-suite (121 passes, zero failures/skips) and build receipts, all corrected checks exit 0; broader commands were not rerun. Dependencies reused the supplied APFS copy, rather than a new clean installation. Runtime: Node v24.18.0, Darwin arm64. No tracked edits, commits, network or other-worktree access. Immutable package proof, ticket completion and final-head CI remain pending delivery gates. Other queued defects are outside this slice. Spec axis only.
