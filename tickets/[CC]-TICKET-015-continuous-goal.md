# TICKET-015: Replace the goal and continue useful iteration

Status: Completed setup; ongoing development and external review remain active
Assignee: Codex
Target Workspace: GEO Growth Engine, codex/agensi-skill-packages
Blocked by: None for setup; marketplace outcomes remain external
Specification: docs/continuous-development-spec.md

## Objectives

Replace the deleted native goal, preserve the existing quiet six-hour heartbeat, reconcile actual Agensi submissions and begin bounded discovery for the next core slice.

## Hard constraints

English docs; preserve MIT/free core, reviewed ZIP bytes and private raw UI receipts. Primary owns implementation; additional agents use exclusive worktrees. Claims require actual receipts. Scope boundaries are in the goal/spec.

## Acceptance Criteria

1. Confirm old native goal absence and retain the replacement's returned objective/status.
2. Reuse geo-agensi; verify saved ACTIVE status, six-hour interval, same chat and goal-file pointer.
3. Record five Free / Pending Review and zero Live from retained submission evidence, without inferring current review completion.
4. Retain separate Standards/Spec document reviews, resolve findings and check changed links/whitespace.
5. Start bounded next-slice discovery and distinguish confirmed findings from candidates. Any new source work requires its own spec/ticket/CLI red-green evidence.

## 📄 Execution Report

The previous native goal was absent when checked after the rewrite request. The preceding monitoring request created heartbeat geo-agensi. Its initial saved interval was normalized to one hour, then corrected through automation_update; saved configuration verified ACTIVE, six-hour interval and this chat's target. No duplicate was created.

The native replacement was created successfully and independently read back as active. The first oversized request was rejected without creating a goal; the final 3,931-character file fits the native 4,000-character limit. The native tool trims the trailing newline: normalized objective SHA-256 7fc6093e5285dcd0877fc114a6c65b54273fbdf43593fc82d32e7c5252f99959 matches the saved file. Original creation/readback responses remain local; docs/verification/TICKET-015/goal-activation.json records both exact hashes and normalization.

The existing automation was updated through the app tool, then its saved configuration was checked as ACTIVE, six-hourly, targeting this chat and pointing to the rewritten goal. No duplicate automation was created. Separate Standards and Spec reviews found no actionable findings in the 13-document snapshot, including addenda for the compact objective; their reviewed manifest is retained under docs/reviews/TICKET-015. Final operational bookkeeping is checked separately. All eleven retained submission receipt hashes, five pending/free DOM entries and the five unchanged ZIP digests were checked. Static REA inspection retained an exact target hash, two Evidence IDs, 14 nodes/occurrences and its central-directory/execution limitations; no platform approval is inferred.

A bounded independent next-slice audit confirmed a later unwritable installation parent leaves an earlier skill installed, and retry after permissions are restored conflicts with that file. The actual extracted CLI exited 2 for both cases; writable and existing-file-conflict controls were also retained. Raw commands/runtime/output and source-equivalence receipts are local under reports/candidates/TICKET-015/next-core-audit. This is the next candidate for a narrow implementation ticket, not a completed fix.

Changed-document links and git diff --check passed. Product source, dependencies and five ZIPs remain unchanged; no new local typecheck/test/build execution is claimed. This setup is delivered through the existing open, unmerged PR #17 and does not merge/release the prerequisite chain. Final documentation-head CI is a separate post-push check; retain its exact identity/result in the PR and local receipts rather than attributing earlier CI to this new revision.
