# TICKET-001: Install skills and audit a public site export

Status: Completed implementation
Assignee: Codex
Target Workspace: `/workspace/geo`
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

## 📄 Execution Report

Implemented init/install/audit, five skills, strict configuration, and local evidence reports. Final `npm test` passed 22 tests, including nine core and five shared safety tests; `npm run typecheck` and `npm run build` passed. Standards and Spec reviews found symlink/crawl-path issues; CLI regressions reproduced them before fixes, and both reviewers confirmed resolution. Raw receipts and extracted-package smoke results are in `docs/verification/`; separate review reports are in `docs/reviews/`. Actual host: Darwin arm64, Node v24.18.0. Live deployment, rendering, indexing, and schema semantics remain unmeasured. Implementation is delivered on the PR branch; human merge remains separate.
