# Optional visibility totals comparison

Status: Accepted next local-core slice under the continuous development goal; implementation not started.

## Problem and solution

Three real CLI observations on fictional inputs show mention/citation rates changing from1 to0 while collection coverage remains1 and all3 source findings remain unchanged. The existing TICKET-018 contract correctly compares findings only and retains rates inside full source Details. Users comparing repeated observations need a concise explicit view of headline values and their arithmetic differences.

Add `compare --visibility-metrics --before <visibility.json> --after <visibility.json> --output <directory>`. Preserve the default findings-only behavior. This is a new optional capability, not a defect or a claim of measured product growth.

## User stories

1. As a researcher, I can see attempted/successful/failed counts and coverage/mention/citation rates from both supplied reports without manually matching nested JSON.
2. As a reviewer, I can distinguish zero from unmeasured null, inspect original source bytes/digests and retain unverified identity/cohort/provenance/attribution.
3. As a toolkit user, I can keep the existing comparison behavior unless I explicitly request visibility totals.

## Decisions

The new boolean flag is supported only for compare with two schemaVersion1 visibility reports sharing the existing example flag. It needs no config or network. Other source kinds or commands with the flag fail operationally before writes; existing argument/input/kind/example validation and complete input/output preflight remain.

In explicit mode, validate each data.totals object before producing output. attempted/successful/failed are nonnegative safe integers with attempted=successful+failed. Coverage is null exactly when attempted=0, otherwise the finite fraction successful/attempted. Mention/citation rates are null exactly when successful=0, otherwise finite numbers in[0,1]. These checks validate supplied shape/count/denominator constraints; they do not recompute rates from absent raw answers, infer mention numerators or authenticate measurements. Invalid/missing totals fail with an actionable side/field error and exit2 before output changes. Opaque data remains accepted by the unchanged default mode.

Retain all original parsed reports, original-byte SHA-256 digests, source findings/categories/order, fictional labels and comparison-scope unknown. Add data.visibilityMetrics with six rows ordered attempted, successful, failed, coverage, mentionRate, citationRate. Each row contains metric, unit(count or fraction), before, after and difference(after-before). A difference is null whenever either rate is null; null never becomes zero. Counts remain integers; rate values/differences retain JavaScript numeric precision.

Add six visibility-metric:<metric> output findings, all unknown, without changing the existing source-finding category counts. Count evidence shows supplied integers and their arithmetic difference. Rate evidence displays percentages and percentage-point differences rounded to2 decimal places; full fraction values remain in data. Explicitly describe these as supplied observations and require comparable product/query/collection conditions before interpretation. A numeric difference is not improvement, recommendation, significance or attribution. The existing exit policy remains based on later source failures:1 if present,0 otherwise,2 for input/operational errors.

Keep validation/projection/metric rendering behind one small module interface; reuse the visibility statistics type as its structural owner where useful. The compare reader retains ownership of report validation and source digests; the existing writer owns filesystem protection. No new dependencies, network writer, metric remeasurement or generic field-diff engine. Update CLI help, README, configuration contract and source visibility-tracker instructions. Preserve the five submitted ZIPs and all old receipts.

## Verification seam and sequence

Use the existing real CLI subprocess seam, literal expected values and temporary local files. First add one failing test that generates both real visibility reports and requests the new flag, then implement the complete path. Follow with null/empty/failed denominators, unchanged numeric values, positive/negative differences, source failures, exact six rows/units/display, source hashes/byte preservation and default-mode controls. Reject malformed totals(field types, unsafe/negative/inconsistent counts, invalid/null/range/nonfinite rates and inconsistent coverage), unsupported commands/kinds and incompatible example flags before writes. Exercise input overwrite/alias and later output-conflict preservation through the new mode. Preserve originals of any failed harness expectation separately.

Run typecheck, full tests and build; retain actual commands/outputs/exits/runtime/revisions. Complete separate Standards/Spec review and resolve introduced findings before source commit. Changed CLI/module/docs/skill inputs require a fresh immutable tarball and clean installed-consumer proof, including installed-skill validation and explicit mode positive/negative paths. Then final-head PR CI, ordinary standing-authorized merge and final-main verification. Fixtures remain fictional; actual agent triggering, devices, live ranking and marketplace delivery remain unverified.

## Out of scope

Group/competitor alignment, product/cohort identity verification, statistical confidence, recommendation classification, live/paid collection, relative growth percentages, arbitrary data diff, deployment, release and Agensi resubmission. Later extensions need their own evidence and contract.

## Discovery evidence

reports/candidates/TICKET-027/discovery/ retains before/after JSONL, all3 actual CLI receipts and reports. An initial noncanonical macOS temp path was correctly refused with exit2; its receipts remain separately under initial-noncanonical-temp-path/. No source change or regression is inferred from that harness correction.
