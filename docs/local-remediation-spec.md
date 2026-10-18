# Frozen-snapshot local remediation rehearsal

Status: Accepted local documentation slice under the continuous goal; no production action.

## Problem

The real frozen YinThread case exposes one duplicate sitemap URL, but retained reports do not yet demonstrate choosing that concrete fix and comparing the result. The continuous goal explicitly calls for a review/fix/compare workflow.

## Solution and stories

Show a reproducible temporary-copy cleanup of the second exact day-master URL element, audit both states at the same paths, and compare retained observations. As a toolkit user, I can follow a concrete technical repair and inspect failure/unknown preservation without interpreting it as a production fix or growth. As a reviewer, I can verify exactly one element changed while original capture bodies/reports remain immutable.

## Decisions

The separate `codex/yinthread-local-remediation` branch started from `dddf667f8dee72a2521fba4bdc6c2c718a4939f0` while the integration decision was pending. The maintainer subsequently authorized and completed those ten merges; main at `5013f87a56286f6ebc768d35440a00e06993275f` has the same file tree as that base. Deliver this independent documentation slice through a new PR against main. Copy only the authorized frozen public/config corpus into a new canonical OS-temp root. Keep origin/product facts and the original evidence flag. Verify original capture hashes and notices. Use the unchanged verified TICKET-018 installed consumer bytes with explicit source/hash equivalence.

Run baseline audit with expected exit1 and16pass/1fail/2unknown. Generate a small unified data patch targeting only the second exact duplicate URL element; retain the first and all other bytes. Demonstrate dry-run and actual patch application in the copy, with commands/exits and patch digest. No shipped transformation script, framework-source edit or site build. Reaudit the same paths into a fresh output: expected17pass/0fail/2unknown,145entries/145unique/0excess. Compare: one status-changed duplicate finding, one details-changed sitemap count,17unchanged; expected17pass/0fail/3unknown with exit0. Preserve schema/live-indexing and comparison-scope unknowns, full original reports/digests and literal actions. Acceptance values describe the required outcome; dated receipts establish observations.

Retain actual CLI outputs, unmodified baseline bytes, edited-copy hash, patch, before/after/compare reports, original/copy hash proofs and runtime. Documentation clearly identifies a local remediation rehearsal of the 2026-10-16 snapshot, with no deployment or fresh observation. Keep original capture rights/NOTICE, avoid broad MIT claims for captured bodies and make new timestamps unambiguous. Root README/package inputs and Agensi ZIPs remain unchanged.

## Verification seam

The existing user-approved real CLI/file seam applies. Verify baseline red-capable observed failure, patch applicability and exact mutation, passing local technical check after patch, comparison categories and unknown retention, original-corpus/report/notice identity and absence of network. Inspect real artifacts/links and separate Standards/Spec document reviews; retain final-head CI. Reuse unchanged165-test/18-consumer source proof only after exact input hashes; no new executable source or unaffected local-suite claim.

## Out of scope

Production files, fresh crawling, deployment/build, indexing/growth/traffic measurement, Schema.org semantics, new source feature/script, paid API, merge/tag/release, automatic Agensi resubmission. The integration question remains independent; user authorization for ten existing PRs does not include this future branch.
