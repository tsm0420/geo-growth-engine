# TICKET-003: Import visibility evidence and automate verification

Status: Implemented; awaiting remote CI
Assignee: Codex
Target Workspace: `/Users/tsm0420/geo`
Blocked by: TICKET-001, TICKET-002

## Objectives

Deliver visibility import/statistics, raw evidence retention, practical documentation, PR CI, and a weekly demonstration/report workflow.

## Hard constraints

Follow `docs/spec.md`. Keep API and consumer surfaces distinguishable. Report failed samples and null rates for empty successful sets. Fixture artifacts must be explicitly labelled. Workflows do not publish, deploy, auto-merge, or call paid APIs.

## Acceptance Criteria

- CLI tests verify mention/citation/competitor matching, coverage, malformed records, raw evidence, and provider/surface grouping.
- README gives working installation, command, configuration, and report examples with explicit limitations.
- PR and weekly workflows use minimal permissions and retain reports.
- Full tests and type checking pass; Standards and Spec reviews run separately before the implementation commit.

## 📄 Execution Report

Implemented evidence import, duplicate/input validation, mention/citation/competitor statistics, coverage, sampling groups, and raw-byte/SHA-256 retention. The four visibility tests and final full `npm test` (22 tests) passed; typecheck and build passed. Added pinned PR/weekly workflows and explicit fixture labels. Review regressions fixed report/evidence symlink writes; both independent axes have no outstanding findings. Local receipts are in `docs/verification/`; remote CI is pending publication of the PR. Paid sampling, analytics, scraping, and publication are deferred. The weekly schedule requires merging the workflow into the default branch.
