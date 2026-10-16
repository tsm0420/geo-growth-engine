# TICKET-003: Import visibility evidence and automate verification

Status: Ready for execution
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
