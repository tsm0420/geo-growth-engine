# Project state and direction review

Observed: 2026-10-18, approximately 15:20 UTC. This is a documentation/source/CI review, not a fresh product experiment. GitHub counts below precede publication of this review's issues. Raw connector responses and complete CI logs are retained locally under `reports/candidates/TICKET-041/`; the [public observation record](../verification/TICKET-041/status.json) contains the bounded receipt summary.

## Verified state

| Area | Observation and receipt |
| --- | --- |
| Repository | Public, MIT, 0 stars and 0 forks at observation; created 2026-10-16. Counts are not a usage or demand measurement. [Metadata](https://api.github.com/repos/tsm0420/geo-growth-engine) |
| Delivered main | `ea594befaf0827c1b03b264a646abc13df623946`, including PR #39. Actual-main CI passed 227 tests, zero failures/skips, typecheck/build and four fictional examples. These are read historical CI results, not newly run tests. [Exact main job](https://github.com/tsm0420/geo-growth-engine/actions/runs/39138682627/job/117708389780) |
| In-flight work | [PR #41](https://github.com/tsm0420/geo-growth-engine/pull/41), head `558cb720826e0191b846882655c033090318643a`, remains open. Exact-head CI passed 234 tests, zero failures/skips and typecheck/build. Its YAML correction is not on main. [Exact PR job](https://github.com/tsm0420/geo-growth-engine/actions/runs/39139801260/job/117711691913) |
| Published distribution | The sole GitHub release is [v0.1.0-alpha.1](https://github.com/tsm0420/geo-growth-engine/releases/tag/v0.1.0-alpha.1), published 2026-10-16. Main's `0.1.0-alpha.3` package version is unreleased; the package is private to prevent registry publication. [Package at reviewed main](https://github.com/tsm0420/geo-growth-engine/blob/ea594befaf0827c1b03b264a646abc13df623946/package.json) |
| Existing open work | At observation, the only non-PR open issues were [#7](https://github.com/tsm0420/geo-growth-engine/issues/7) (upstream encoding dependency) and [#40](https://github.com/tsm0420/geo-growth-engine/issues/40) (PR #41). This review adds no duplicate implementation issue for them. |
| Agensi | Last actual observation is 09:58:54 UTC: five Free/Pending Review, zero Live. This review did not inspect the platform again or establish approval. [Dated receipt](../verification/TICKET-008/agensi-submission.json) |
| Execution | Native goal is paused. The maintainer explicitly requested this development hold. Existing `geo-agensi` heartbeat remains active every six hours, now observation-only. [Current hold and scope](../iterative-goal.md#current-mode-development-hold) |

## What the product already does

Five project skills guide seven CLI commands: init, install, audit, aso, plan, visibility and compare. They cover local HTML/crawler artifacts, supplied iOS/Android text, sourced product facts, audience questions, imported answer statistics and retained report comparison. Findings already have evidence and an action; visibility already has exact question/context groups and optional headline-total arithmetic comparison. These are useful, working core capabilities, not proposed additions. [Fixed-main README](https://github.com/tsm0420/geo-growth-engine/blob/ea594befaf0827c1b03b264a646abc13df623946/README.md), [independent workflow assessment](workflow-assessment-2026-10-18.md).

The documented YinThread case establishes a bounded real technical snapshot and a local-copy repair/comparison rehearsal. It does not establish a production fix, actual AI citation change, customer acquisition or conversion uplift. Examples and query-group verification remain fictional. [Case and scope](../case-studies/yinthread/README.md).

The current tool requires Node 24, a toolkit checkout/build, edited YAML, an HTML export and manually supplied records. Those requirements are observed; whether they cause abandonment is not measured. No independently verified adoption, retention, willingness to pay or causal GEO outcome was established by this review. Star counts and an unsolicited marketplace invitation cannot fill that evidence gap.

## Recommendation and alternatives

Position the project as an evidence-backed GEO review toolkit for developers and small product teams with a website/SaaS export. Keep the existing App checks available. This narrower initial audience is a recommendation based on the executable workflow and retained case, not a demonstrated market preference.

The next phase should validate that a person can run the existing loop, choose an actionable finding, preserve evidence and return for a second observation. First consolidate the version-specific first-use path, then obtain consented manual visibility batches and an owner decision record. Preserve the free MIT core. The [next-phase specification](../next-phase-spec.md) defines completion and investment gates.

| Direction | Decision and reason |
| --- | --- |
| First-use and evidence-led pilot | Prioritize: directly tests the current product promise without new infrastructure. |
| More parser/checklist hardening | Respond to reproduced user failures and regressions; do not make speculative edge-case discovery the default product roadmap. |
| Exact-query repeat comparison or cross-report action brief | Defer executable work until a pilot identifies a repeated decision current outputs cannot support. Existing query groups, totals and actions must be reused. |
| Live crawling, automatic provider sampling, hosted dashboard | Defer: increase operational/account/cost scope before the current workflow has demonstrated adoption. |
| Growth scores, guaranteed rankings/citations, paid packs | No supporting effectiveness or willingness-to-pay evidence. Avoid those promises; revisit commercial scope after genuine feedback. |

Official-source research supports separating local checks, crawl permission, inclusion, sampled rates and causal outcomes. It does not prove demand for this toolkit. See the [dated primary-source assessment](direction-sources-2026-10-18.md).

## Stop rule

Publish the plan and two held issues, then stop development. No PR merge, tag/release, listing resubmission, product crawl, participant outreach or paid service is part of this review. After an explicit resume, a missing pilot packet remains a visible unmet gate; do not replace it with authored answers or an automatic feature backlog.
