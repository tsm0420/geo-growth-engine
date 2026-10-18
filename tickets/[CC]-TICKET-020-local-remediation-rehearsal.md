# TICKET-020: Demonstrate a local frozen-sitemap fix and comparison

Status: Documentation and independent reviews complete; PR delivery and CI pending
Assignee: Codex
Target Workspace: codex/yinthread-local-remediation, based on dddf667f8dee72a2521fba4bdc6c2c718a4939f0
Blocked by: TICKET-019 discovery/delivery (completed); independent of the completed ten-PR integration
Specification: docs/local-remediation-spec.md
Issue: https://github.com/tsm0420/geo-growth-engine/issues/22
Objectives: Demonstrate the explicitly needed review/fix/compare workflow for the already observed duplicate using only a disposable local snapshot copy.
Hard constraints: Preserve frozen originals/notices, source/package inputs and Agensi ZIPs. No production edit/build/fetch, new script/feature, merge/release or measured-growth claim. Do not move the ten-PR candidate after presenting its integration decision.
Acceptance Criteria: Real before audit1/16-1-2; a one-element patch applies only to the disposable copy; after audit0/17-0-2 and145unique/no excess; comparison0 with1status/1details/17unchanged and3unknown; retain exact raw receipts/hashes/runtime/rights; separate document reviews and final-headCI. Planning acceptance values are not themselves evidence; see the execution report.

## 📄 Execution Report

Preparation only: concrete existing case need and unchanged public CLI seam specified. No new branch, copy, patch, audit or production action occurred during this preparation. TICKET019 candidate remains at dddf667 while the maintainer considers the separate integration request.

Execution: primary verified the existing installed consumer and40 unchanged execution/build/CI/package inputs, then copied the authorized frozen public/config corpus into a new canonical OS-temp directory. Baseline audit exited1 with16pass/1fail/2unknown. A uniquely contextualized data patch removed only the second byte-identical URL block (original lines69–74, entry12), retaining entry8 and all other bytes. Dry-run/application exited0. Reaudit exited0 with17pass/0fail/2unknown and145entries/145unique/0excess. Comparison exited0 with1status change/1details change/17unchanged and17pass/0fail/3unknown. Schema/live-indexing and comparison scope remain unknown. Already-applied control dry-run exited1 without changing that control.

The exact README POSIX-shell block was separately executed successfully using byte-identical built CLI files, with independent new temporary artifacts and matching counts/edited sitemap bytes. Source product example:false denotes the real input corpus; the documentation prominently identifies modified-copy results as derived local artifacts. Captured bodies/config/notices/historical reports remain unchanged; full copied XML bodies stay local under their existing rights. No source feature/build/live observation or production edit was made. Raw commands/exits/reports/hashes/runtime and static precheck are under docs/verification/TICKET-020. Immutable source/package proof is reused by exact input identity; no new tarball or unaffected local full-suite run is claimed. Independent reviews and final-head CI remain delivery gates.

Final authoring verification: the first diff had correct resulting bytes but aligned deletion markers across adjacent identical XML delimiters (lines 70–75). Its raw receipts and patch remain local under reports/candidates/TICKET-020/initial-diff-alignment/. The final patch explicitly deletes the complete second node at lines 69–74; patch-alignment.json records the actual markers. All six primary outcomes and the exact README walkthrough were rerun in fresh temporary roots with that final patch. The source/package/frozen input checks passed again. This PR targets main after the separately authorized ten merges; its own merge is not covered by that authorization.

Independent review outcome: Standards and Spec each identified the same P3 current-status sentence. Both separate correction addenda verified its resolution and all other 40 reviewed files unchanged. Original reports, the 41-file snapshot and one-file correction hashes are retained in docs/reviews/TICKET-020. Primary verified all 34 public receipt members, the exact executed README body, authored links, original input hashes and five unchanged Agensi ZIPs. Next gate: independent PR against current main and exact-head CI.
