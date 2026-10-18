# Candidate integration decision

Status: Prepared for maintainer review; no merge is authorized or performed by this document.

## Why this is the next decision

The bounded TICKET-019 inspection found no confirmed new mismatch in the retained YinThread report evidence or actions. Three actual comparisons preserve the duplicate failure and deliberate unknowns. The next useful delivery step is integrating the reviewed candidate into the default branch. The [continuous goal](iterative-goal.md) requires explicit authorization for merges; this preparation does not supply it.

## Reviewable candidate

At the 2026-10-18 observation, main is 75d5e6ea48ce4d9a6d020a54cd87f23f925ac7ed. All ten PRs below are open, unmerged and observed mergeable against their current bases. Code Review reports a completed successful verify check at each exact recorded head. These are observed check results, not predictions about a later retarget or protected-branch action.

| Order | PR | Change | Recorded head |
| --- | --- | --- | --- |
| 1 | [#9](https://github.com/tsm0420/geo-growth-engine/pull/9) | Duplicate sitemap evidence | 1c8c535bcf00739ae705bdb9e2d3a455717a45f4 |
| 2 | [#11](https://github.com/tsm0420/geo-growth-engine/pull/11) | Report/input integrity | 79a7edbbe201ebd1e63d14d10e126ebdeff051f9 |
| 3 | [#12](https://github.com/tsm0420/geo-growth-engine/pull/12) | Optional collection validation | f33ec8eef40d29dc169f080de50e7d6525a48a61 |
| 4 | [#13](https://github.com/tsm0420/geo-growth-engine/pull/13) | Mention boundaries | 5e2c0a44dc66d2b300cf69384248f1f9a97ee8f7 |
| 5 | [#14](https://github.com/tsm0420/geo-growth-engine/pull/14) | Sitemap XML reference validation | 1e3fe4377f7a6d5b62be1ffe87a8a21b57292c79 |
| 6 | [#15](https://github.com/tsm0420/geo-growth-engine/pull/15) | Inferred crawler path encoding | 9f2ea9ca3c07a69fc3ee36093e6322f56b1f686c |
| 7 | [#16](https://github.com/tsm0420/geo-growth-engine/pull/16) | Canonical/sitemap coverage | c1ae2d9c626c93d8bbbe7c9dc93f3bc81cfeb031 |
| 8 | [#17](https://github.com/tsm0420/geo-growth-engine/pull/17) | Five free skill packages, goal and tracking records | 20e15a80e4db98b37b7781d447cfcabbbe7506c4 |
| 9 | [#19](https://github.com/tsm0420/geo-growth-engine/pull/19) | Installation destination preflight | 5fb6baceefa64dc028c5af0c6b13745bee744de3 |
| 10 | [#21](https://github.com/tsm0420/geo-growth-engine/pull/21) | Local report comparison and delivery/discovery receipts | f90869ef0aec8c5f4d65c6dc76aa600e0e9e9a39 before the TICKET-019 documentation checkpoint |

The combined source passed 165 tests (zero failed/skipped), typecheck and build; its installed package passed 18 consumer outcomes. Twenty-three installed files and forty execution/build/CI/package inputs were verified unchanged. [TICKET-018 receipts](verification/TICKET-018/README.md) and its [separate reviews](reviews/TICKET-018/README.md) retain exact source, package digest and CI evidence. The later TICKET-019 documentation head receives its own exact-head CI check; its current identity/result is recorded in PR #21 and the local delivery checkpoint, without inferring it from the earlier head.

## Proposed action after explicit authorization

Merge the ten PRs into main in the listed order, using merge commits to preserve ancestry. PR #9 already targets main. For each successor, recheck current main/head, retarget that PR to main, inspect its actual remaining diff and required checks, then merge only if the expected change and passing gates remain valid. Preserve branches. Stop on unexpected concurrent changes, conflicts or rejected protections and report the actual state. Verify final main content against the reviewed candidate and inspect resulting CI before reporting integration complete.

This decision covers integration into main. A tag, GitHub release, registry publication, deployment or change to Agensi submissions requires its own applicable authorization. The published alpha 1 tag and quickstart remain unchanged by this proposal.

## Limits and current evidence

Local ancestry checks verify all ten current dependency links. `git merge-tree --write-tree` computed tree38d85cf3628e9979a48877662fbee56b924e06d4, identical to the inspected f90869e candidate tree, without moving a branch or modifying the index/worktree. This establishes the current combined file tree, not approval by GitHub protections or an action-time merge result. TICKET-019 changes only discovery/readiness documents and receipts; executable/package equivalence is checked again at its final head.

No new site observation or production fix occurred. The frozen sitemap still has the same observed duplicate; report differences describe tool coverage and literal paths. No indexing, ranking, conversion, sponsorship or growth result is established. The initial integration changes main and can be reverted through reviewed Git changes; it is still a public repository action requiring the maintainer's decision.
