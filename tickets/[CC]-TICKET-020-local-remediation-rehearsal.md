# TICKET-020: Demonstrate a local frozen-sitemap fix and comparison

Status: Ready for Execution
Assignee: Codex
Target Workspace: codex/yinthread-local-remediation, based on dddf667f8dee72a2521fba4bdc6c2c718a4939f0
Blocked by: TICKET-019 discovery/delivery (completed); independent of pending integration authorization
Specification: docs/local-remediation-spec.md
Objectives: Demonstrate the explicitly needed review/fix/compare workflow for the already observed duplicate using only a disposable local snapshot copy.
Hard constraints: Preserve frozen originals/notices, source/package inputs and Agensi ZIPs. No production edit/build/fetch, new script/feature, merge/release or measured-growth claim. Do not move the ten-PR candidate after presenting its integration decision.
Acceptance Criteria: Real before audit1/16-1-2; a one-element patch applies only to the disposable copy; after audit0/17-0-2 and145unique/no excess; comparison0 with1status/1details/17unchanged and3unknown; retain exact raw receipts/hashes/runtime/rights; separate document reviews and final-headCI. Expected values are unexecuted acceptance, not results.

## 📄 Execution Report

Preparation only: concrete existing case need and unchanged public CLI seam specified. No new branch, copy, patch, audit or production action occurred during this preparation. TICKET019 candidate remains at dddf667 while the maintainer considers the separate integration request.
