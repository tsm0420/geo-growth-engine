# TICKET-006: Detect sitemap duplicates and verify alpha 2 candidate

Status: Planned
Assignee: Codex
Target Workspace: `geo-growth-engine`, branch `codex/alpha-2-candidate`
Blocked by: TICKET-005 supported outcome
Specification: `docs/releases/alpha-2-spec.md`

## Objectives

Implement the specified duplicate finding and deterministic report data through real CLI red/green slices. Re-audit the frozen YinThread input, update guidance/skill/changelog, and deliver a reviewable PR and local `0.1.0-alpha.2` package with current verification.

## Hard constraints

English source/docs; strict TypeScript; no live acquisition, snapshot/history edits, paid APIs, production edits, merge, tag or publication. Separate worktree/index for every additional repository agent. Preserve source bytes and historical evidence. Unknown checks remain unknown.

## Acceptance criteria

- Real CLI tests prove duplicate exit 1, unique exit 0, exact decoded identity, named/numeric XML references, deterministic counts/positions/order, and unknown results when input is unavailable/unsupported.
- The frozen case reports 146 entries, 145 unique URLs, and two day-master occurrences with exit 1. Capture bytes and historical reports are unchanged.
- Installed skill, README, configuration/report guidance and changelog match behavior and candidate status.
- Separate Standards and Spec reports contain no outstanding introduced defects before source commits; this ticket status/report changes with its source commit.
- Typecheck, full suite, build, clean source install, extracted-package smoke, version/revision/SHA-256 and actual runtime/OS have raw receipts. Final PR head CI succeeds. Provide readiness and unresolved-limitations report.
