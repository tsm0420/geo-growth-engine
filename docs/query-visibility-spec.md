# Question-level visibility breakdown

Status: Accepted bounded enhancement from TICKET-037 actual fictional CLI observations and independent utility assessment; TICKET-038 / issue #38.

## Problem and outcome

The current visibility report correctly summarizes all attempts and provider/surface/model/locale groups. In three retained fictional CLI runs, swapping the question labels leaves those aggregates identical, although the questions needing raw-answer inspection differ. Choosing the next supplied question currently requires scanning every raw answer. This is an enhancement to correct behavior.

Add `data.queryGroups` so a researcher can inspect each exact supplied question within its recorded collection context, alongside denominators and collection errors. Keep the free local-import workflow and existing totals, groups, findings, statuses, CLI output and raw evidence.

## Contract

1. Every query-group row contains `provider`, `surface`, `model`, `locale`, `query`, and exactly the existing statistics fields: attempted, successful, failed, coverage, mentionRate, citationRate, recommendationRate and competitors. Use the existing mention/owned-host/competitor logic and successful-response denominators. Recommendation rate stays null.
2. Group identity is the exact five-string tuple. Preserve case, whitespace, Unicode and punctuation in query and context strings; do not normalize, join to configured query IDs, equate paraphrases or mix contexts. Tuple encoding must not collide when strings contain separators.
3. Repeated attempts with distinct sample IDs count independently. Existing globally duplicate-ID rejection remains intact. Error-only rows have attempted/failed counts, coverage 0, mention/citation rates null and zero competitor counts. A successful answer with no mention/citation yields numeric zero rates. Empty imports produce `queryGroups: []`, retaining existing unmeasured totals/groups.
4. Rows appear in first-observed tuple order. Input order affects presentation, not per-tuple arithmetic. Summed row attempt/success/failure counts partition the imported samples; rates are per-row fractions, not a second denominator for headline totals.
5. Report JSON and the Markdown Details block contain the same queryGroups. Original JSONL bytes, source path/digest, existing data fields, findings, summary, example flag and exit behavior remain unchanged. Operational errors still reject before report/evidence writes; safe existing-directory reuse and source protection remain owned by the shared writer.
6. Both comparison modes retain the added data. Default compare remains findings-only. Explicit visibility comparison still validates and compares headline totals only; it does not align question/context groups or establish comparable cohorts. Older reports without queryGroups remain accepted.
7. README, configuration contract and geo-visibility-tracker guidance explain how to choose a row for raw-answer inspection, preserve null versus zero and check context/collection coverage. Current-main skill changes are separate from the already submitted pinned Agensi ZIPs.

## Verification seam and module boundary

Use real CLI subprocess input/output as already approved. Start with a failing actual visibility command asserting a two-question breakdown. Extend with repeated success/error attempts, an error-only question, exact query variants, each context dimension, separator-collision tuples, first-observed order/reordering, swapped question labels, empty input, global duplicate-ID rejection, raw bytes/digest and example labels. Expected fractions/counts come from literal fixtures. Reuse the existing statistics owner; test behavior rather than its helper shape.

Run typecheck, full tests and build. Preserve original command/stdout/stderr/exit/runtime, first-red/green and checked-input hashes. Run the skill validator for the updated skill, then require separate Standards/Spec source reviews. Execute a fresh immutable source build, pack and clean-consumer install with actual visibility query controls, baseline commands, both compare modes, older-report compatibility and input/output protection. Authenticate retained package bytes/receipts independently. Final-head CI and ordinary standing-authorized merge/main checks remain separate gates.

## Limits

This summarizes supplied attempts, not unique people, market demand, rankings, recommendations, statistically significant change or growth attribution. No automatic prioritization, content drafting, provider collection, live crawl, paid service, deployment, store edit, tag/release or marketplace resubmission is added. No parser, timestamp, matching or schema-version policy changes.
