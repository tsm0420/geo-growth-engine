# TICKET-020 static precheck

Planning snapshot: `96beec4971829dbdfbe4a458fe50d32bb166d5c6`. No blocking mismatch found in the accepted disposable-copy contract.

Static verification: the frozen sitemap contains 146 direct URL elements. The exact day-master URL appears at positions 8 and 12; complete byte-identical six-line elements occupy `docs/case-studies/yinthread/public/sitemap.xml:45-50` and `:69-74`. SHA-256 is `8edaa414edeedc46b0152db4f7c0bab7b292400f495e40dd4f7d358865a3ea06`. All three captured body digests match capture.json.

Concrete execution hazard: a first-match text removal or patch without distinguishing surrounding context can remove the first identical element. Target the original second span, preserve the first, dry-run with sufficiently unique context and verify the resulting bytes equal original-prefix plus original-suffix around that one span. This safeguards the spec's second-element requirement (`docs/local-remediation-spec.md:17`); no product defect is inferred.

Copy config/ and public/ as siblings: `config/config.yaml:3-5` resolves `../public`, product.yaml and queries.yaml. Keep a single copied input path across both audits, with separate output directories, to avoid literal path-only comparison changes. Preserve `config/product.yaml:2` example:false while clearly labelling the new output as a historical-snapshot rehearsal. `public/NOTICE.txt:1` and case README.md:57 exclude captured bodies from MIT; copy the notice intact.

The unchanged verified consumer/source-hash prerequisite remains an execution gate (`docs/local-remediation-spec.md:15,23`), not verified by this static check. No production fix, fresh site observation, indexing or growth result is established.

Commands: cat/nl/head/tail/git/rg for local inspection; Python ElementTree/re parsing and SHA-256 calculations. No product CLI, tests, network/browser, source edits, staging or commits.
