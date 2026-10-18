# TICKET-034 independent Spec review

No actionable findings.

## Snapshot

Baseline: `52233767e6b5fc1c04ab95567c8ab0def7c5da42`; planning HEAD `7ca07be`. Reviewed the actual working-byte diff and explicit untracked `tests/sitemap-scope.test.ts`, rather than treating the planning commit as the runtime candidate. All 97 snapshot sizes/hashes match both the immutable packet and my worktree; manifest SHA-256 is `4cf7ed95204e675afdf7aade1872490daf5e42f953231ee3465af1446abe2ee9`. All 34 primary checked-input identities match.

## Assessment

The contract states: “Extract only scalar string loc children of direct url children of the root urlset” (`docs/sitemap-location-scope-spec.md:13`). The replacement traversal in `src/audit.ts:31-39` follows precisely that path, handles singleton/array entries, admits only string locations and trims once. It does not descend into wrappers, metadata, nested locations, root siblings, extensions or sitemap indexes.

The unchanged surrounding pipeline produces failed sitemap/coverage findings and unknown duplicate data when no supported location exists. Direct malformed URLs retain the existing failed sitemap/unknown duplicate result while other genuine direct URLs still supply partial coverage, as required by specification lines 13 and 23 and `tests/coverage.test.ts:50-60`.

XML validation/reference scanning, decoder, literal duplicate identity/order/positions, canonical URL serialization and filesystem/report protections remain unchanged. Nine new real CLI regressions cover six misplaced shapes, an unnamespaced scalar control, unrelated same/off-origin/duplicate locations, direct arrays and default-namespace image extensions. Their literal expected counts/positions and unchanged XML checks match the contract. Documentation correctly limits these checks rather than claiming XSD/namespace conformance or index expansion. No dependency or option was added.

Retained primary receipts show six red failures/one direct pass, then seven initial-green passes. The completed Node24.22.0 suite records 215 passes, zero failures/skips, and typecheck/build exit 0.

## Limits

Static Spec review only: no product/test/network execution, source/index changes or Standards-report reading. Fresh immutable package/consumer authentication, exact-head CI, merge and actual-main proof remain subsequent delivery gates. Historical artifacts outside the pinned packet were not independently resampled.
