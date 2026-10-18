# Standing project PR merge authorization

Status: Approved by the maintainer on 2026-10-18.

## Problem and solution

Per-PR consent blocked integration after source reviews, package verification and CI were complete. The maintainer approved PR23 and PR25 and explicitly instructed that future such merges do not need another approval. Persist that standing authorization in the existing goal so subsequent iterations follow it.

## User stories

1. As the maintainer, I receive verified project changes without repeating merge consent.
2. As an agent, I can identify the current authorization owner and preserve required reviews, tests, head checks and GitHub protection.
3. As a reviewer, I can distinguish actual merged work from historical pending receipts and future policy.

## Decisions

The authorization applies to ordinary reviewed PR merges into this repository's main, within accepted project scope. Keep exact-head CI, separate Standards/Spec review, immutable-input/package proof where relevant and server protection. No admin bypass, force push, tag/release, paid service or production/store action is added. docs/iterative-goal.md owns the policy; AGENTS.md and the current delivery instructions point there. Preserve dated historical receipts. Update current backlog states and record the actual PR23/25 merge identities and matching final main tree.

The existing same-chat six-hour heartbeat already reads the goal file; verify its pointer/status without duplicating or rescheduling it. Native goal tools cannot edit an existing objective or resume its status; record their actual capability and preserve the ongoing objective rather than fabricating a replacement or completion.

## Verification seam

This is a documentation/configuration-contract change, with no executable source. Verify exact policy wording and current instructions, authored links, ordinary merge result/parents/tree equivalence and final main push CI. Preserve both source branches, runtime/test/packaged input hashes, frozen evidence and uploaded ZIPs. Reuse unchanged runtime proof with its original revision; no new CLI red/green or tarball is warranted. Separate Standards/Spec reviews precede the ticket-linked commit. Deliver a PR, inspect its final-head CI, and merge under the new standing authorization, verifying the result through independent GETs. Record external capability limits honestly.

## Out of scope

New product behavior, provider/crawler/platform changes, production edits, funding, new bindings or terms, registry publication, releases and arbitrary repository access.
