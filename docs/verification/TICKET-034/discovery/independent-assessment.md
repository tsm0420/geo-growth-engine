# TICKET-033 sitemap evidence assessment

Confirmed evidence-integrity defect; a bounded extraction correction is justified, but implementation remains a separate decision.

Static authentication verified all 39 packet sizes/hashes, six XML input digests, receipt exits, JSON summaries, stdout and relevant Markdown statuses. Own `src/audit.ts` matches the recorded source hash at main 5223376. No CLI or tests were executed.

Observed: `root-loc`, `metadata-loc` and `nested-url` contain no direct `urlset/url/loc`, yet each exits 0 and passes sitemap, duplicates and canonical coverage, reporting one entry. Proper direct and namespaced image-extension controls also exit0/pass. The off-origin unrelated-sibling case exits 1 with sitemap fail, duplicates unknown/null and direct-page coverage pass; this is an extraction observation, not proof that its XML satisfies the protocol.

Cause: `src/audit.ts:31–34` recursively accepts unprefixed `loc` anywhere; `:122–128` combines that list with only a root-key presence check. The same contaminated list supplies coverage at `:135–162`. This contradicts the direct-urlset scope in `docs/configuration.md:15,23–29` and supplied primary-format notes.

Minimal seam: guarded traversal of root `urlset`, its direct `url` singleton/array children, and their direct string `loc` children. Retain existing parser/entity decoding, trimming, literal text and document order; use this one list for origin checks, counts, duplicate positions and coverage. Do not recursively rescue locations from metadata, nested wrappers or extensions.

Real-CLI regression expectations should make the three misplaced-only shapes fail sitemap/coverage with unknown/null duplicates, while direct/extension controls remain unchanged. Preserve unnamespaced support, numeric/entity/CDATA literal behavior and exact duplicate identity/positions. Keep `tests/coverage.test.ts:50–60`: a genuine valid entry can cover its page despite another malformed direct URL causing sitemap failure. No all-valid gating of coverage, index expansion, full XSD or namespace certification is justified.
