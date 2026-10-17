# Alpha 2 Spec review

**No actionable introduced Spec defects found.** Reviewed the nonempty working-tree proposal against `75d5e6ea48ce4d9a6d020a54cd87f23f925ac7ed`, including untracked implementation/evidence files, `docs/releases/alpha-2-spec.md`, and the core contract. The three-dot comparison contains planning only; it was not substituted for the proposed-file review.

- The new finding and `data.sitemap` follow the accepted-sitemap gate, exact decoded/trimmed identity, deterministic code-unit sorting, occurrence counts and one-based positions. Regressions exercise duplicate-only exit 1, unique exit 0, named/decimal/hex references, single-pass escaping, spelling distinctions, unsupported inputs with unknown duplicates/null data, and unchanged live/schema unknowns.
- The real CLI decoding regression preserves UTF-8 and HTML character references. Dependency metadata remains pinned without overrides. Dated primary-source receipts support retaining the actual encoding warning and leaving issue #7 unresolved; the separate XML decoder dependency is explained without claiming that it fixes the Cheerio chain.
- Independently checked original capture hashes/lengths, preserved historical case files against baseline, and parsed the frozen sitemap: 146 entries, 145 unique URLs, one excess entry, day-master positions 8 and 12. These match the separately saved candidate report and its exit-1 receipt. Temporary report paths remain disclosed and unredacted.
- README, installed skill, configuration guidance and changelog distinguish the published alpha 1 from candidate alpha 2. No publication, production edit, live crawl, or effectiveness claim was added.

## Execution Report

Actually ran baseline/diff/untracked inventory checks; `npm ci --ignore-scripts --cache /private/tmp/geo-npm-cache --offline --no-audit --no-fund` (37 packages, expected deprecation warning); `npm run typecheck`; and `npm test` (33/33 passed, including six subtests). Read-only Python checks verified case hashes/counts, historical bytes, all 24 research-manifest hashes, and documented red/green/typecheck/build/case exit receipts. `git diff --check` passed. Environment: Darwin arm64, Node v24.18.0. No tracked files or Git metadata were changed.

Committed-source clean installation, extracted candidate-package proof/digest/revision, final-head CI, ticket completion reports and readiness disposition remain delivery gates explicitly pending in the proposal. They are not represented here as completed or as introduced code defects. No YinThread/network access occurred in this review.
