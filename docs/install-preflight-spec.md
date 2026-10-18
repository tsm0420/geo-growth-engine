# Installation destination access preflight

Status: Accepted core defect slice under the continuous development goal
Assignee: Codex
Target Workspace: codex/install-destination-preflight
Base: 20e15a80e4db98b37b7781d447cfcabbbe7506c4, unmerged PR #17

## Problem

When an existing later skill directory is traversable but not writable, install writes the earlier skill before failing with EACCES. Restoring permissions and retrying then fails on the file created by the first attempt. The retained unprivileged POSIX CLI reproduction and controls are under reports/candidates/TICKET-015/next-core-audit; source install.ts/paths.ts were compared to the demonstrated package source. Existing-file conflicts already fail before any creation.

## Solution and user stories

Preflight every destination's nearest existing ancestor before creating files or directories. Preserve current conflict, symlink, source-readability and exclusive-create protection in the shared init/install path.

1. As a maintainer, an installation with a predictable destination access conflict leaves no partially installed earlier skill.
2. As a maintainer, after correcting the permissions I can retry successfully without cleaning up files from that failed attempt.
3. As a project owner, existing files and symlink protections remain intact.

## Implementation decisions

For each proposed destination, perform all checks before the write loop. Resolve the nearest existing parent, require a directory, and verify the write/search access needed to create its missing descendants and file. Filesystem lookup errors remain operational errors. Keep exclusive wx file creation; preflight is not a guarantee against concurrent permission/path changes, disk failure or other post-check I/O errors. Do not claim transactional rollback or change report output behavior.

## Testing seam

Use the user-confirmed real CLI subprocess seam, observing exit codes, stderr and directory/file effects. No internal mocks or chmod-bit arithmetic in the implementation.

Add the primary regression with the second skill parent at mode 0555 while the top-level target remains writable. Assert operational exit 2, no new first-skill path, owner data intact, then restore permissions and verify a complete five-skill retry. Use try/finally to restore permissions before fixture cleanup. Explicitly skip POSIX permission probes on Windows/root environments and report actual skips; the current unprivileged macOS runtime must execute the regression.

Retain successful installation into missing parents, writable existing parents, existing-file and symlink rejection controls. Exercise init's shared path with a nonwritable .geo parent and successful retry. Verify unsupported parent types fail before earlier writes. Run focused regressions, typecheck, full suite and build; independently review Standards and Spec. Demonstrate source and extracted-package commands with literal outcomes, digests and raw receipts, then inspect exact final-head PR CI.

## Out of scope

Transactional rollback, concurrent writers, broad filesystem refactoring, report changes, dependency updates, new discovery targets, source bundling changes, changes to existing Agensi uploads, merge/release or platform outcomes.
