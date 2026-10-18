# Next phase: validate the existing GEO review loop

Status: Proposed roadmap; implementation held by the maintainer's 2026-10-18 stop request. Publishing this specification or its issues is not an instruction to resume. Baseline: main `ea594befaf0827c1b03b264a646abc13df623946`; PR #41 remains separate. [Assessment and receipts](research/project-state-2026-10-18.md).

Tracker: [specification #42](https://github.com/tsm0420/geo-growth-engine/issues/42), [Slice A #43](https://github.com/tsm0420/geo-growth-engine/issues/43), [Slice B #44](https://github.com/tsm0420/geo-growth-engine/issues/44). B's blocker is recorded in issue bodies; no native dependency metadata is claimed. Both slices remain held.

## 1. Problem statement

The toolkit has executable checks and strong local verification, but the reviewed evidence does not show whether a person can adopt it, choose a useful action and repeat the workflow with genuine visibility evidence. Continuing to add checks would not answer that product question. Current-main capabilities also exceed the single published alpha and the original marketplace ZIPs, so a participant needs an unambiguous version-specific path.

## 2. Solution

Validate one free, local workflow for a website/SaaS owner who can supply an export and product facts: prepare an exact toolkit revision, initialize a project, run an audit, inspect an existing finding/action, make an authorized change on a disposable copy, and compare saved reports. Then run a small consented manual-visibility pilot with two disclosed answer batches and an actual owner decision. Keep App checks supported; they are not required to complete this first pilot.

Two proposed slices, in order: TICKET-044 first-product candidate/runbook, then TICKET-045 collection protocol and pilot decision. Existing CLI/report interfaces are the seams. The outcome is evidence for the next investment, not a ranking or growth claim.

## 3. User stories

1. As a developer, I can select an immutable toolkit revision and distinguish it from the published alpha and submitted skills.
2. As a first-time user, I can follow one current workflow and identify setup failures without editing the toolkit source.
3. As a product owner, I can select an existing finding/action and compare later local evidence while unknowns remain visible.
4. As a researcher, I can preserve genuine answers, errors, collection conditions and receipt locations without inventing missing samples.
5. As a reviewer, I can distinguish equal question labels from authenticated comparable collection conditions and inspect changes/missing evidence.
6. As a maintainer, I can use recorded participant friction and an owner decision to continue, revise or stop a proposed feature.

## 4. Implementation decisions

### Slice A: version-pinned first-product candidate

After resumption, recheck main and PR #41; record their disposition without requiring that PR to merge. Select one immutable candidate revision and preserve its package/source identity. Extend the existing README/case/installation guidance for capabilities added since the prior documentation reconciliation. Reconcile current-main changelog/version references without rewriting historical receipts, the alpha tag or pinned Agensi ZIPs. Prepare a candidate only; publication remains a separate decision.

Provide one runbook using existing commands, absolute/canonical target paths and a fresh output directory per observation. Explain which inputs are user supplied and which reports are fictional. Reuse the existing local-copy repair rehearsal; do not duplicate its feature or claim a production fix. Record actual setup execution and known failures. A developer-run rehearsal may verify instructions but does not count as participant adoption.

### Slice B: manual collection protocol and pilot

Use the current JSONL schema unchanged. A companion Markdown worksheet records candidate revision, product/fact/brand-alias/owned-origin input identities, exact questions, provider/surface/model/locale, collection windows and timezone, repeated attempts including errors, visible settings or unknown settings, raw-answer/receipt locations, consent and sharing scope. Record browser/API surface accurately; collection notes do not authenticate a provider. This is a human-reviewed worksheet, not a new runtime manifest, required schema field or provenance validator.

Obtain two consented sessions, at least one operated by a human other than the implementing agent. Record participant count, product count and operator roles separately. The sessions may use the same product; two genuine batches are needed for a repeat comparison. Use owner-supplied records or separately authorized human collection. No participant recruitment or messaging is authorized by this plan. If inputs, consent or another operator are unavailable, record that unmet gate; fixtures may test instructions but cannot satisfy it.

Import both batches through existing visibility, inspect queryGroups/raw evidence, and use the existing comparison scopes. Review changed/missing collection settings, question sets, error coverage and product inputs in the decision record; matching labels or a digest alone cannot certify comparability. Retain unchanged originals locally. Publish only a separately consented summary or redacted derivative, documenting transformations and retaining private originals outside tracked files. A private pilot is acceptable; public disclosure is not required for completion.

For each session record observed setup steps/blockers, any available actual elapsed time, help/interventions, one owner-selected action or an explicit decision to take no action, and the evidence behind that choice. Record whether a second use actually occurred; planned use is not retention. The maintainer's final decision is continue, revise or stop, with evidence and uncertainty. Two sessions are qualitative evidence, not a representative market study or statistical growth experiment.

### Conditional next investments

Executable query-level repeat comparison requires a pilot example showing an unmet repeated comparison task. A cross-report action brief requires a documented selection/triage problem not already solved by `Finding.action`. Provider collection requires evidence that manual acquisition is the bottleneck plus a separate access/budget/retention contract. Live audit and hosting require a concrete export/access need. None of these is an accepted implementation slice now.

## 5. Testing decisions

Planning checks: inspect fixed source and exact-head CI evidence; review documentation links, scope, dependencies and claim provenance. Product source is unchanged in this planning task, so no test/typecheck/build rerun is claimed.

After resumption, Slice A uses the existing CLI subprocess seam and one clean consumer at the chosen immutable revision. Record real commands, runtime, exits, package identities, output bytes and limitations; exercise setup, audit, disposable-copy repair and comparison. Verify changed instructions, not every historical artifact again. Run source checks only if executable inputs change; changed skills require their validator. Preserve failing receipts rather than fabricating a successful first use.

Slice B uses the same import/comparison seam and manual worksheet review. Validate instructions with labelled fixtures first; then preserve actual consented inputs, original-byte hashes, command outputs, errors, zero-versus-null rates, unknown provenance and the owner decision. Exercise one changed/missing-condition example in the written protocol; do not relabel it as comparable or claim authenticated collection. Product defects discovered in a pilot receive separate reproduced issues and the normal red/green/review pipeline.

Completion gate: A is reproducible and B contains the genuine sessions/batches plus a maintainer decision. If genuine pilot evidence cannot be obtained, B remains open and later feature work remains unaccepted. No stars, check counts, marketplace status or fictional outcomes substitute for that gate.

## 6. Out of scope

Resuming development or merging PRs during this review; tags/releases or registry publication; marketplace edits; live crawling; automated consumer-interface scraping; paid provider calls; dashboard/auth/database; production/store changes; mass content generation; generic scores; causal rankings, citation lift or conversion claims; participant outreach; new runtime flags or report schemas.

## 7. Further notes

The maintainer delegated this assessment and issue publication. The two-slice breakdown is a proposed planning result, not pre-approved implementation. Both issues remain held until an explicit resume; B also depends on A and genuine owner-supplied evidence. Keep #7 as the existing upstream dependency issue and #40/PR #41 as the existing in-flight correction. Agensi observation continues through the original six-hour heartbeat under the [current hold](iterative-goal.md#current-mode-development-hold).
