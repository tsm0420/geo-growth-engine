# TICKET-017: Verify the first-use journey

Status: Completed bounded audit
Assignee: Codex
Target Workspace: codex/local-report-comparison; inspected source 5fb6baceefa64dc028c5af0c6b13745bee744de3
Blocked by: TICKET-016 delivery
Specification: docs/continuous-development-spec.md; README.md first-use contract

## Objectives

Verify documented first use before accepting another improvement. Distinguish published alpha 1, candidate behavior and prerequisites.

## Hard constraints

Use fictional local inputs, preserve existing receipts and separate read-only inspection from executable verification. No live crawling, product build claim or invented defect.

## Acceptance Criteria

1. Independently inspect README/templates/configuration/five skills in an exclusive worktree.
2. Execute the tagged quickstart from verified matching source and record any network/cache limitations.
3. Exercise candidate init/install, missing-export failure and first reports in a fresh product directory; preserve raw commands, exits, reports, runtime and source identity.
4. Record confirmed defects or explicit bounded no-defect coverage and select a justified next direction from the active goal.

## 📄 Execution Report

The prior iteration delivered TICKET-016 PR #19 with final-head CI success; that progress did not complete the native goal. Read-only inspection in /private/tmp/geo-first-use-audit found no confirmed static mismatch. Primary verification ran 13 commands: matching alpha 1 archive/offline install/build/help/four fictional reports, then the verified candidate consumer's init/install/missing-export error/ASO/plan/audit. All expected outcomes passed. All seven reports retain fictional labels; missing export exits 2 with no report output directory. Twenty-two installed/package files were rechecked identical at the inspected candidate. Raw outputs, exact runtime, commands, reports, scope limits and hashes are under docs/verification/TICKET-017. The official remote tag ref matched local commit 6eb7dfe1b98814dafdeb7bc02a94bc9f41a30c4c; no fresh clone was performed. No full suite was repeated for this source-unchanged audit. No confirmed first-use defect was established within these cases.

Next accepted direction: TICKET-018, a structural comparison of retained local reports, justified by the goal's comparable-repeat-run need. Its narrow specification must preserve unknowns, source identity and evidence; report differences cannot establish growth attribution. No Agensi recheck was due during this immediate continuation.
