# Core hardening loop

Goal: iteratively improve the existing local-input core through evidence-backed, independently reviewed slices. Completion of one ticket or PR is an iteration checkpoint. Preserve the agreed core contract and explicit unknowns.

## User-approved goal amendment: Agensi distribution

On 2026-10-17 the maintainer asked to include the supplied Agensi invitation in this goal. This adds a distribution workstream alongside core hardening; the email is a lead, not verified platform evidence or authorization to accept contracts. The amendment was initially recorded here because the tools could not edit an existing objective. The maintainer then deleted that goal and requested its replacement: the new active native Goal now includes both workstreams. Its [objective snapshot](iterative-goal.md) preserves the exact replacement text; use this ledger for ongoing progress.

TICKET-008 owns platform/terms/format verification, five independently usable skill ZIPs, honest English listing drafts, and a concrete submission plan. Proposed initial pricing is free; paid packs remain a later decision. Preserve the public MIT source, required notices, external CLI prerequisites, and the local-input/no-paid-API contract. Resolve possible platform-delivery/licensing mismatches before submission. See [the source review](research/agensi-distribution.md).

Prepare and verify reviewable local artifacts first. Account creation, terms acceptance, uploads/public listings and pricing require the maintainer's specific final decision; no payout onboarding, bank/wallet setup or message to the sender is authorized. When authorized, submit and retain actual review receipts, public URLs and observed states. Packaging is not publication; pending/rejected submissions are not live listings. The amended campaign tracks both core acceptance and this distribution milestone, with external decisions explicit and independent core work continuing while they are pending.

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
| init and install | isolated filesystem/audit researcher | Observed success/conflict/symlink cases safe; concurrency unmeasured |
| audit | isolated filesystem/audit researcher | Three confirmed correctness defects; TICKET-012/013/014 |
| aso | isolated content/config researcher | Boundaries/gaps observed; shared null-type defect TICKET-010 |
| plan | isolated content/config researcher | Fact gaps/order observed; shared null-type defect TICKET-010 |
| visibility | isolated visibility/report researcher | Literal rates/groups/evidence observed; boundary defect TICKET-011 |
| shared configuration/report safety | content/config and visibility/report researchers | Source overwrite and predictable partial-write findings, TICKET-009; null types TICKET-010 |
| packaging and CI portability | primary coder | Real npm consumer bin and all six commands passed on Darwin arm64; PR #9 exact head CI success rechecked; other devices unmeasured |

## Work queue

No new item is accepted until a real CLI reproduction and concrete user impact establish it. Prefer false success, unsafe file operations and evidence corruption, then incorrect contracts and portability. Source work requires a narrow specification, ticket, red/green regression, separate Standards/Spec reviews, and a ticket-linked commit with execution report.

Explicit distribution request: TICKET-008 / BL-003 is accepted from the maintainer's scope amendment rather than treated as a core defect. Its work must preserve the existing toolkit contract.

The finite core queue is defined in [the hardening specification](core-hardening-spec.md): TICKET-009 report/input integrity (V1/V2), 010 null collections (C1), 011 underscore boundaries (V3), 012 malformed XML references (FS-001), 013 encoded crawler paths (FS-002), 014 canonical coverage serialization (FS-003). Original reports and 724 raw data files are preserved in [audit archives](verification/core-gap-audit/manifest.json). The reports state tested coverage and exclusions; this is not an exhaustive correctness or security certification.

## Iteration record

### 0: acceptance-gap audit (complete)

Base: `1c8c535b`; branch: `codex/core-hardening-campaign`; ticket: TICKET-007.
Result: independent investigations completed, finite defect queue specified, actual npm consumer installation checked. Prior goal turn: progress (replacement native goal and ledger committed at `49d0e163`). No source changes or new release claims from the audit. Research ticket/report retained.

### 1: report integrity (complete delivery)

Ticket: TICKET-009; specification: `docs/core-hardening-spec.md`; base before implementation: `49d0e163` plus planning documents. Priority: preserve user inputs and coherent prior report/evidence artifacts. Implemented complete report preflight and protected inputs. Real CLI final focused run: 15 passes; full suite: 48 passes; typecheck/build exit 0. Separate Standards and Spec reviews found no actionable introduced defects. Raw receipts: `docs/verification/TICKET-009/`; reviews: `docs/reviews/TICKET-009/`. Reviewed source commit: `ec2b23caf57e22f106da7b07bb37f1b344e08981`, alpha.3. Its clean archive passed install/typecheck/48 tests/build; extracted npm package passed all 16 expected command outcomes, including source protection and conflict preservation. Candidate manifest and tarball SHA-256 are retained under the verification directory. Delivered [PR #11](https://github.com/tsm0420/geo-growth-engine/pull/11), stacked on unmerged PR #9. Final head `79a7edbbe201ebd1e63d14d10e126ebdeff051f9` has unchanged executable/CI and package files; Code Review observed verify job 117418524995 / run 39040390851 success, with all 48 tests passing on Ubuntu. Original CI responses are retained. No merge/release.

## Delivery and stop conditions

Keep source/revision/package hashes, actual runtime/OS, raw command outputs/exits and exact-head CI tied to each candidate. Preserve historical evidence and private files. Record each review axis separately. Resolve required actionable core gaps before completion; explicitly evidenced upstream limitations may remain. A missing required decision or failed acceptance gate keeps the goal incomplete. Avoid inventing work after the justified queue is exhausted.

No merge, tag, release, paid sampling, new provider integration, live crawl, production/store edit, funding application or recurring automation is authorized by this campaign.

The Agensi amendment permits research and preparation for that named distribution channel; it does not authorize a new runtime provider integration or bypass the final submission/terms decision above. Record preparation, approval, submission and live availability as separate states. Do not declare the distribution milestone complete based on the invitation, drafts or ZIPs alone.

## Current iteration

### 2: optional collection validation (complete delivery)

TICKET-010, base `79a7edbbe201ebd1e63d14d10e126ebdeff051f9`, branch `codex/optional-collection-validation`. Implemented the four undefined-only defaults after real CLI red evidence. All 21 focused / 69 full-suite tests passed, with typecheck/build exit 0. Separate independent Standards and Spec reports found no actionable introduced defects. Reviewed source `8a4be99204fc51aa9d4ff751dc3bdfe6f820a37d` passed clean-source/69 tests/build and 18 expected extracted-package outcomes. Manifest contains tarball SHA and exact commands/runtime. Delivered [PR #12](https://github.com/tsm0420/geo-growth-engine/pull/12), stacked on unmerged #11/#9. Final head `f33ec8eef40d29dc169f080de50e7d6525a48a61` passed Code Review-inspected verify job 117419790932 (run 39040816885); full original response retained. No merge/release. Existing real CLI subprocess seam is unchanged. PR delivery must declare unmerged PR #11 (and transitive PR #9); candidate and final-head CI proof must reflect this new source.

### 3: visibility mention boundaries (complete delivery)

TICKET-011; base `f33ec8eef40d29dc169f080de50e7d6525a48a61`; branch `codex/visibility-mention-boundaries`. Test underscore-delimited brands/aliases/competitors, embedded Unicode letters/numbers, successful denominators, grouping and retained input bytes, then make the narrow boundary correction. CLI subprocess seam remains the approved acceptance seam. Delivery must declare unmerged PR #12 and its transitive prerequisites.

TICKET-011 implementation checkpoint: five visibility / 70 full-suite tests pass, typecheck/build exit 0; independent Standards and Spec found no actionable introduced defects. Reviewed source is ready for immutable package and final-head PR CI verification; other queue items remain planned.

TICKET-011 immutable candidate `1a223de98e41473bacb743572db704ccce23d509` passed clean-source checks and 19 expected package outcomes; manifest records its tarball SHA/runtime. Final-head PR CI remains pending.

TICKET-011 delivered [PR #13](https://github.com/tsm0420/geo-growth-engine/pull/13), final head `5e2c0a44dc66d2b300cf69384248f1f9a97ee8f7`; Code Review observed verify job 117420839110 success. Raw CI response retained; no merge/release.

### 4: sitemap XML reference validity (in progress)

TICKET-012; base `5e2c0a44dc66d2b300cf69384248f1f9a97ee8f7`; branch `codex/sitemap-xml-references`. Research addendum specifies pre-decode XML 1.0 reference/character checks and the proven long-leading-zero positive-control correction. Source research and original CLI archive are retained; no executable correction claimed yet. Next action: real CLI red/green slices using the existing seam, preserving literal sections, valid one-pass decoding, DTD exclusion and frozen inputs. Delivery depends on unmerged #13/#12/#11/#9.
