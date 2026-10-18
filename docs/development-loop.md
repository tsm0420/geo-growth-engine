# Core hardening loop

Goal: iteratively improve the existing local-input core through evidence-backed, independently reviewed slices. Completion of one ticket or PR is an iteration checkpoint. Preserve the agreed core contract and explicit unknowns.

## User-approved goal amendment: Agensi distribution

On 2026-10-17 the maintainer asked to include the supplied Agensi invitation in this goal. This adds a distribution workstream alongside core hardening; the email is a lead, not verified platform evidence or authorization to accept contracts. The amendment was initially recorded here because the tools could not edit an existing objective. The maintainer then deleted that goal and requested its replacement: the new active native Goal now includes both workstreams. The replacement was subsequently deleted and rewritten at the maintainer's request on 2026-10-18; [the current objective](iterative-goal.md) owns ongoing direction. Earlier checkpoints below remain historical.

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

Merge, tag, release, paid sampling, new provider integration, live crawl, production/store edits and funding applications still require explicit authorization. The maintainer authorized the existing six-hour same-chat heartbeat for Agensi tracking and continued development on 2026-10-18.

The Agensi amendment permits research and preparation for that named distribution channel; it does not authorize a new runtime provider integration or bypass the final submission/terms decision above. Record preparation, approval, submission and live availability as separate states. Do not declare the distribution milestone complete based on the invitation, drafts or ZIPs alone.

## Current iteration

### 2: optional collection validation (complete delivery)

TICKET-010, base `79a7edbbe201ebd1e63d14d10e126ebdeff051f9`, branch `codex/optional-collection-validation`. Implemented the four undefined-only defaults after real CLI red evidence. All 21 focused / 69 full-suite tests passed, with typecheck/build exit 0. Separate independent Standards and Spec reports found no actionable introduced defects. Reviewed source `8a4be99204fc51aa9d4ff751dc3bdfe6f820a37d` passed clean-source/69 tests/build and 18 expected extracted-package outcomes. Manifest contains tarball SHA and exact commands/runtime. Delivered [PR #12](https://github.com/tsm0420/geo-growth-engine/pull/12), stacked on unmerged #11/#9. Final head `f33ec8eef40d29dc169f080de50e7d6525a48a61` passed Code Review-inspected verify job 117419790932 (run 39040816885); full original response retained. No merge/release. Existing real CLI subprocess seam is unchanged. PR delivery must declare unmerged PR #11 (and transitive PR #9); candidate and final-head CI proof must reflect this new source.

### 3: visibility mention boundaries (complete delivery)

TICKET-011; base `f33ec8eef40d29dc169f080de50e7d6525a48a61`; branch `codex/visibility-mention-boundaries`. Test underscore-delimited brands/aliases/competitors, embedded Unicode letters/numbers, successful denominators, grouping and retained input bytes, then make the narrow boundary correction. CLI subprocess seam remains the approved acceptance seam. Delivery must declare unmerged PR #12 and its transitive prerequisites.

TICKET-011 implementation checkpoint: five visibility / 70 full-suite tests pass, typecheck/build exit 0; independent Standards and Spec found no actionable introduced defects. Reviewed source is ready for immutable package and final-head PR CI verification; other queue items remain planned.

TICKET-011 immutable candidate `1a223de98e41473bacb743572db704ccce23d509` passed clean-source checks and 19 expected package outcomes; manifest records its tarball SHA/runtime. Final-head PR CI remains pending.

TICKET-011 delivered [PR #13](https://github.com/tsm0420/geo-growth-engine/pull/13), final head `5e2c0a44dc66d2b300cf69384248f1f9a97ee8f7`; Code Review observed verify job 117420839110 success. Raw CI response retained; no merge/release.

### 4: sitemap XML reference validity (complete delivery)

TICKET-012; base `5e2c0a44dc66d2b300cf69384248f1f9a97ee8f7`; branch `codex/sitemap-xml-references`. Research addendum specifies pre-decode XML 1.0 reference/character checks and the proven long-leading-zero positive-control correction. Source research and original CLI archive are retained; no executable correction claimed yet. Next action: real CLI red/green slices using the existing seam, preserving literal sections, valid one-pass decoding, DTD exclusion and frozen inputs. Delivery depends on unmerged #13/#12/#11/#9.

TICKET-012 implementation checkpoint: initial Spec P2 quoted-marker bypass reproduced and corrected; initial and final evidence retained separately. Current XML 38 / full-suite 108 passes, typecheck/build exit 0. Independent final Standards and Spec reviews have no outstanding actionable introduced defects. Next action: immutable candidate/package proof and exact-head PR CI.

TICKET-012 immutable source `54c8e908be7a9a0f86e0853f9f17e42888f692c1` passed clean-source/108 tests/build and 21 expected extracted-package commands; original manifests and package SHA retained. Final-head PR CI remains pending.

TICKET-012 delivered [PR #14](https://github.com/tsm0420/geo-growth-engine/pull/14), final head `1e3fe4377f7a6d5b62be1ffe87a8a21b57292c79`; verify job 117423562041 succeeded, full Code Review response retained. No merge/release.

### 5: crawler path encoding (complete delivery)

TICKET-013; base `1e3fe4377f7a6d5b62be1ffe87a8a21b57292c79`; branch `codex/crawler-path-encoding`. Next action: real CLI literal #/?/% filename regressions, preserving path separators/index inference, canonical independence and deployment unknowns; then encode filesystem segments. Delivery depends on unmerged #14/#13/#12/#11/#9. Existing subprocess acceptance seam remains unchanged.

TICKET-013 implementation checkpoint: the initial Spec POSIX-backslash gap was reproduced and corrected. Current seven safety / 110 full-suite tests pass, typecheck/build exit 0. Both final independent review axes have no outstanding actionable introduced defects. No Windows execution claimed. Next action: immutable package proof and exact-head PR CI.

TICKET-013 immutable source `6ac457319e85e734407eae1f05cf56805c34f932` passed clean-source/110 tests/build and 22 expected extracted-package commands; manifest/SHA retained. Final-head PR CI remains pending.

TICKET-013 delivered [PR #15](https://github.com/tsm0420/geo-growth-engine/pull/15), final head `9f2ea9ca3c07a69fc3ee36093e6322f56b1f686c`; Code Review observed verify job 117425595268 success, original untruncated response retained. No merge/release.

### 6: canonical sitemap coverage (complete delivery)

TICKET-014; base `9f2ea9ca3c07a69fc3ee36093e6322f56b1f686c`; branch `codex/canonical-sitemap-coverage`. Final specified core queue item: serialize canonical and decoded sitemap URLs consistently for coverage while preserving original decoded duplicate identity. Real CLI controls must keep distinct path case/trailing slashes/query order and malformed locations as visible findings rather than operational exceptions. Delivery depends on unmerged #15/#14/#13/#12/#11/#9. Existing subprocess acceptance seam remains unchanged. Agensi preparation follows a reviewed immutable final core candidate.

TICKET-014 implementation checkpoint: eleven focused / 121 full-suite tests pass, typecheck/build exit 0; separate independent Standards and Spec reviews have no actionable introduced defects. Source is ready for immutable candidate/package and exact-head PR CI verification. All six core queue items now have implementations; delivery gates for this final slice and Agensi preparation remain open.

Final core immutable source `fe885bbf7d90127b8ca230b28283fb2c83d5a2ca` passed clean-source/121 tests/build and 23 expected extracted-package commands. Manifest records original runtime and SHA-256 `39c9e37d07830475ac88b0502d2f247ed991796aa7be838eed6f096dbda6bfd4`. Final-head PR CI remains pending; only after success can this core candidate be selected for Agensi preparation.

TICKET-014 delivered [PR #16](https://github.com/tsm0420/geo-growth-engine/pull/16), final head `c1ae2d9c626c93d8bbbe7c9dc93f3bc81cfeb031`; Code Review observed verify job 117427121547 success, untruncated original response retained. All six finite core queue items have separate resolved Standards/Spec reviews, current local/package proof and exact-head PR CI. They remain an unmerged PR chain; no release or live-product result is inferred. BL-001 remains the explicitly documented upstream publication constraint.

### 7: Agensi distribution preparation (in progress)

TICKET-008; base and selected immutable core head `c1ae2d9c626c93d8bbbe7c9dc93f3bc81cfeb031`; branch `codex/agensi-skill-packages`; prerequisite unmerged PR #16 and its chain. The core tarball proof was built from `fe885bbf7d90127b8ca230b28283fb2c83d5a2ca`; every packaged/executable/CI input was compared identical at the selected head and that head's CI succeeded. CLI demonstrations may use those exact verified extracted bytes, with the equivalence explicit.

Official format/delivery research is complete; full captures are retained locally, source metadata/hashes and the derived report publicly. A packaging-spec review caught an unsupported README requirement attribution; the specification calls it this project's package README, not a platform gate. Five text-only instruction ZIPs and English free-listing proposals are prepared, with complete notices, source/setup references and fictional examples. All five validator checks, eight primary workflows and seven structural rejection controls have retained receipts; separate Standards and Spec reviews have no actionable introduced findings. The Spec reviewer independently repeated eight package workflows, and a separate custom-input Codex evaluation ran eight workflows, preserving failures/unknowns, distinct groups and raw evidence. These are local executions, not platform validation.

Evidence and runtime are in `docs/verification/TICKET-008/`; exact source/build/CI/package comparisons justify reuse of the final core's 121-test/23-command proof without claiming a new local full-suite run or tarball. Next action: deliver the preparation PR with exact-head CI, then present [the concrete final decision](../distribution/agensi/decision.md). Platform compatibility, automatic triggering, security approval and live listing remain unverified; no account/terms/upload/financial action occurred. All finite core slices are delivered but unmerged, and the native goal remains incomplete pending the maintainer-approved Agensi disposition.

Delivery checkpoint: [PR #17](https://github.com/tsm0420/geo-growth-engine/pull/17) is open and unmerged, with base #16. Initial preparation head `96b9b1bf386fa88da2242e211a48a06ffc0c8073` passed Code Review-inspected verify job `117432073515` / run `39045077014`, including typecheck/121 tests/build; the full untruncated response is retained in TICKET-008 evidence. This bookkeeping update does not change any ZIP or core input. Final documentation-head CI must be checked separately, with current identity/result in the PR and local raw receipt. The concrete final disposition question has been presented; no answer or approval is inferred from elapsed time. The finite core queue is exhausted, so no unrelated work is invented while that required decision is pending.

### 8: authorized Agensi submission (in progress)

On 2026-10-18 the maintainer explicitly directed the agent to publish the prepared five free candidates. The former disposition blocker is resolved; publication itself remains unverified. TICKET-008 continues to own actual submission/review/listing receipts. All five ZIP bytes remain identical to the reviewed manifest; no new source or unchanged-workflow testing is needed for this authorization record.

The official seller link reached an unauthenticated sign-in page. Automatic browser review rejected Google login because the account and method were unspecified. The maintainer then chose personal sign-in and will notify the agent when complete. This resolves the method choice but does not prove authentication or terms acceptance; no alternate route bypasses the rejection. The agent retains the publication task. Other authorized work is limited to current public-source verification and accurate status/evidence. Once login is reported complete, verify actual authenticated state, inspect the submission form and any action-time terms/access requirements, submit truthful free listings when permitted, and retain observed outcomes. No fees, payout/KYC/bank setup or sender contact is authorized. The native goal remains incomplete; do not treat the prior blocked audit as a new three-turn blocker audit after this resumed user request.

### 9: continuous development and quiet review tracking

On 2026-10-18 the maintainer reported login complete. All five Free candidates were submitted, with five Pending Review and zero Live observed in Creator Studio; see the dated submission receipt. This supersedes the earlier authentication gate without claiming approval.

The maintainer requested continuing development, Agensi outcome/modification notifications and a rewritten native goal after deleting the previous one. TICKET-015 owns this setup. Heartbeat geo-agensi is the existing six-hour same-chat continuation; it is reused, not duplicated. The current goal selects evidence/file safety, first-use usability, actionable reports, comparable repeat runs and actual distribution feedback as priorities. Proposed directions require their own narrow contracts before implementation.

A read-only next-slice investigation uses the exclusive worktree /private/tmp/geo-core-next-audit and a discovery ticket. Candidate findings remain unaccepted until actual CLI reproduction; no new product source has been changed at this checkpoint. A static REA inventory of the actual geo-orchestrator ZIP was also retained; it proves artifact identity and central-directory inventory only. Native goal creation and the final setup review are recorded in the TICKET-015 Execution Report.

TICKET-015 setup checkpoint: replacement native goal created/read back active, normalized text matches docs/iterative-goal.md. Existing heartbeat geo-agensi was updated and saved ACTIVE/six-hour/same-chat fields verified. Both independent document review axes report no actionable findings. Product source/ZIPs are unchanged. Next bounded candidate: install destination-parent access preflight, after an actual extracted-CLI reproduction left the first skill installed before EACCES on the second; retry then conflicts. Raw receipts are retained locally under reports/candidates/TICKET-015/next-core-audit. Specify and test that slice before implementation; first-use/report-comparison ideas remain proposed directions.
