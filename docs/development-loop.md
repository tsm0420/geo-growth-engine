# Core hardening loop

Goal: iteratively improve the existing local-input core through evidence-backed, independently reviewed slices. Completion of one ticket or PR is an iteration checkpoint. Preserve the agreed core contract and explicit unknowns.

## Baseline: 2026-10-17

- Worktree revision: `1c8c535bcf00739ae705bdb9e2d3a455717a45f4`, clean before this campaign.
- Main: `75d5e6ea48ce4d9a6d020a54cd87f23f925ac7ed`.
- PR #9: open, unmerged; head `1c8c535bcf00739ae705bdb9e2d3a455717a45f4`. New work starts from this candidate and must declare this unmerged prerequisite.
- Prior goal turn: progress (created the iterative objective and checked authoritative repository/PR state).
- BL-001 / issue #7: demonstrated upstream publication limitation; no new release evidence justifies repeating the investigation now.
- BL-002 / issue #8: implemented in PR #9; historical receipts establish that exact candidate, not future changes.

## Acceptance-gap audit

TICKET-007 owns the initial audit. Each area must record its actual commands, evidence, defects or observed coverage, and remaining limits. An unchecked area is not a pass.

| Area | Audit owner | Status |
| --- | --- | --- |
| init and install | isolated filesystem/audit researcher | Pending |
| audit | isolated filesystem/audit researcher | Pending |
| aso | isolated content/config researcher | Pending |
| plan | isolated content/config researcher | Pending |
| visibility | isolated visibility/report researcher | Pending |
| shared configuration/report safety | content/config and visibility/report researchers | Pending |
| packaging and CI portability | primary coder | Pending |

## Work queue

No new item is accepted until a real CLI reproduction and concrete user impact establish it. Prefer false success, unsafe file operations and evidence corruption, then incorrect contracts and portability. Source work requires a narrow specification, ticket, red/green regression, separate Standards/Spec reviews, and a ticket-linked commit with execution report.

## Iteration record

### 0: acceptance-gap audit (in progress)

Base: `1c8c535b`; branch: `codex/core-hardening-campaign`; ticket: TICKET-007.
Next action: collect independent local CLI reproductions across every area, then prioritize a finite in-scope queue. No source changes or new release claims yet.

## Delivery and stop conditions

Keep source/revision/package hashes, actual runtime/OS, raw command outputs/exits and exact-head CI tied to each candidate. Preserve historical evidence and private files. Record each review axis separately. Resolve required actionable core gaps before completion; explicitly evidenced upstream limitations may remain. A missing required decision or failed acceptance gate keeps the goal incomplete. Avoid inventing work after the justified queue is exhausted.

No merge, tag, release, paid sampling, new provider integration, live crawl, production/store edit, funding application or recurring automation is authorized by this campaign.
