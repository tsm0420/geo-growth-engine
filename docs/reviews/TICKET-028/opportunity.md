# TICKET-027 visibility comparison opportunity

**Recommendation: specify one opt-in totals-comparison slice; no defect is established.**

Observed: the immutable b5483c3f1b286fae23b9cbe381f94a8639c94d59 packet passes all24 snapshot hash/size checks (snapshot SHA-256 `0a4c0619142a241dd51bbe669a26c8ffa196aa19818bb1d9c96ef09473200afb`). Retained primary CLI receipts exit0. Two fictional successful samples per set yield mention/citation1→0 and coverage1→1; comparison correctly reports three unchanged findings and embeds both original reports/totals. Embedded report/input digests match supplied bytes. TICKET018 expressly excludes metric comparison.

Inference: the continuing goal's explicit compare-later-observations need justifies reducing manual inspection of retained totals. This single fixture demonstrates a workflow opportunity, not adoption, measured product decline or general demand.

Minimal interface: `compare --before ... --after ... --output ... --visibility-metrics`, valid only for two visibility reports with matching schema/example. Preserve the findings-only default, validation, classifications, exits and input protections. Add a separate JSON/Markdown totals section for attempted/successful/failed counts, coverage, mentionRate and citationRate; show count changes and explicitly labelled percentage-point differences. Keep group/competitor/recommendation comparison outside this first slice; recommendations remain unmeasured.

Require nonnegative safe-integer counts, attempted=successful+failed, valid denominators, consistent coverage, and finite rates within0–1. Coverage is null at zero attempts; mention/citation are null at zero successes. Legitimate zero remains0. A delta involving an unavailable rate remains null with its reason. Missing/malformed/inconsistent totals cause operational exit2 before output; never manufacture zeros. Metric changes remain informational.

Acceptance: real CLI1→0, zero↔null, all-error/empty/mixed sets and changed denominators; invalid totals, incompatible flags/kinds/example/schema, unsupported commands, unchanged default behavior and original-byte/alias/conflict preservation. Retain source documents, byte digests and collection counts. Cohort/product/query/config identity, importer provenance and growth attribution remain unknown; opt-in does not authenticate them.

No implementation, tests/CLI execution, network, product/index/remote/Agensi or other-worktree action occurred. Primary must settle specification/testing seams before implementation.
