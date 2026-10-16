# TICKET-001: Install skills and audit a public site export

Status: Ready for execution
Assignee: Codex
Target Workspace: `/Users/tsm0420/geo`
Blocked by: None

## Objectives

Deliver `init`, `install`, and `audit` commands with validated configuration, five usable skills, public HTML fixtures, JSON/Markdown evidence reports, and subprocess acceptance tests.

## Hard constraints

Follow `docs/spec.md`. Preserve target files and symlink boundaries. Distinguish parseable JSON-LD from semantic validation. Keep search and training bot policies separate. Never claim live HTTP or ranking measurements from local artifacts. New source is tested; strict types and English documentation only.

## Acceptance Criteria

- Users can initialize a new project and install skills through the CLI.
- A good site and a broken site produce independently asserted findings and exit codes.
- Conflicting installations and malformed configuration fail visibly without overwrites.
- Relative paths work from outside the project directory.
- Type checking and relevant acceptance tests pass; raw verification artifacts are retained.
