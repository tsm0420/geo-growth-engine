# TICKET-016: Reject unwritable installation destinations before creation

Status: Implementation verified; clean-package and PR CI delivery pending
Assignee: Codex
Target Workspace: codex/install-destination-preflight
Blocked by: Unmerged PR #17 and its transitive prerequisites for delivery
Specification: docs/install-preflight-spec.md
Issue: https://github.com/tsm0420/geo-growth-engine/issues/18

## Objectives

Prevent a predictable later destination-parent access conflict from leaving an earlier skill installed. Allow a successful retry after permission correction without manual cleanup.

## Hard constraints

Keep the core init/install contract, no-overwrite and symlink protections, strict types and English documentation. Preflight only; no transactional or concurrency guarantee. Use real CLI tests and retain actual runtime/outputs. Existing Agensi ZIPs/uploads stay pinned to their reviewed source.

## Acceptance Criteria

1. A real CLI regression is red on the base: a mode-0555 second skill parent causes exit 2 and leaves an earlier skill path.
2. The implementation checks every destination's nearest existing ancestor/access before writing; the regression becomes green and a post-permission-fix retry installs all five skills.
3. Successful missing/writable parents, owner-file preservation, unsupported parent types and symlink conflicts retain correct CLI behavior; init's shared path is covered. Root/Windows permission skips are explicit.
4. Focused tests, npm run typecheck, npm test and npm run build have raw receipts; Standards and Spec reviews are separate and introduced findings resolved.
5. A clean-source/extracted-package consumer demonstration and final-head PR CI identify exact source, package digest, runtime and expected outcomes. Update Status/Execution Report in the source commit; attach the PR and declare dependencies.

## 📄 Execution Report

Planning checkpoint: prior goal turn made authoritative progress by creating the active replacement goal, configuring the existing heartbeat and delivering PR #17 head 20e15a8 with successful exact-head CI. This continuation verified that prerequisite remains open/unmerged. The accepted next slice follows the retained unprivileged POSIX reproduction. No new source implementation or regression result is claimed at this checkpoint.

Implementation checkpoint: the real CLI red regression failed because geo-orchestrator was created before EACCES on the second parent. Added nearest-existing-parent directory/write/search checks to the shared preflight, retaining source checks, symlink rejection and exclusive wx creation. The regression then passed, including retry after permission correction. Five controls cover init permissions/retry, missing parents, owner file conflict, nondirectory parent and later symlink parent.

Actual Node v24.22.0/npm 11.19.1 on unprivileged macOS arm64: 13 focused tests and all 127 full-suite tests passed, zero skipped; npm run typecheck and npm run build exited 0. Raw commands/outputs are under docs/verification/TICKET-016. Separate independent Standards and Spec reviews found no actionable introduced findings; their three-file source snapshot is in docs/reviews/TICKET-016. Existing Agensi ZIPs were not changed. Clean-source/package proof and final-head CI remain explicit next gates; no package or PR completion is claimed by this source checkpoint.
