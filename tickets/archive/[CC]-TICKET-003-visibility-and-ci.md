# TICKET-003: Import visibility evidence and automate verification

Status: Completed implementation and CI
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

Implemented evidence import, duplicate/input validation, mention/citation/competitor statistics, coverage, sampling groups, and raw-byte/SHA-256 retention. The four visibility tests and full `npm test` (22 tests) passed; typecheck and build passed. Review regressions fixed report/evidence symlink writes; both independent axes have no outstanding findings. GitHub run `38956740077`, job `117161383360`, passed for implementation commit `b956d61305b9653a8e3863016a9fdeeb175db89a`; the Code Review plugin result and untruncated job log are retained under `docs/verification/`. PR #5 contains the implementation for human merge. Paid sampling, analytics, scraping, and publication remain deferred. The weekly schedule starts after the workflow reaches the default branch; a scheduled run itself was not verified in this session.
