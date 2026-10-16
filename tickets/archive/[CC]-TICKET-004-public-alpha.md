# TICKET-004: Publish a verifiable public alpha

Status: Completed
Assignee: Codex
Target Workspace: Repository root
Blocked by: TICKET-001, TICKET-002, TICKET-003 (completed)

## Objectives

Deliver the public alpha described in `docs/releases/alpha-spec.md`: license, usable onboarding, contribution/security guidance, real-site evidence, application drafts, reviewed merge, and GitHub prerelease.

## Hard constraints

Use English repository prose, preserve the implemented core behavior, and keep evidence traceable. No invented usage, results, eligibility, or successful submissions. Do not publish private application details. Each repository reviewer uses an isolated worktree. Publication is authorized by the maintainer's "ok do it" following the release recommendation; yinthread.com is the authorized case.

## Acceptance Criteria

- MIT license and alpha package/repository metadata are present; README installation works in a clean directory.
- Contribution/security guidance, changelog, and release limitations are clear.
- Public evidence uses normalized workstation paths with the transformation disclosed and originals retained locally.
- Real-site snapshots retain actual response metadata and SHA-256 digests; CLI output and nonzero findings remain visible.
- Existing typecheck, 22 CLI tests, build, package smoke, and expected-head GitHub CI pass.
- Separate Standards and Spec reviews have no unresolved release blockers.
- Core PR is merged; GitHub reports the repository public and MIT-licensed; private vulnerability reporting is enabled; an alpha prerelease points to the verified default branch.
- Factual application drafts exist locally with missing personal qualifications explicit. No application is represented as submitted.

## 📄 Execution Report

Added MIT/alpha metadata, public onboarding, contribution/security guidance, changelog, separate website-snapshot rights, and normalized evidence copies with original/public digests. A clean dependency install, typecheck, all 22 CLI tests, build, fictional command runs, and extracted-package help/init/install/audit passed on Darwin arm64 / Node v24.18.0. The runtime npm audit reported zero known vulnerabilities; its deprecation warning is tracked in issue #7. Saved YinThread HTTP bodies match recorded SHA-256 and byte lengths; its local audit returned 16 pass, 0 fail, 2 unknown with exit 0. Manual XML inspection found one duplicate URL. Separate Standards and Spec reviews and receipt rechecks found no actionable release blockers. Application drafts and original archives remain ignored local files. GitHub PR CI passed for d564dc0581e044f471eff78203b001eae3d95483 (run 38961247476); merge/default-branch CI passed for 6eb7dfe1b98814dafdeb7bc02a94bc9f41a30c4c (run 38961379199). PR #5 is merged. GitHub confirms public visibility, MIT detection, and enabled private vulnerability reporting. Published v0.1.0-alpha.1 at the verified merged default-branch commit, with the built package and SHA256SUMS. A credentials-disabled public clone built successfully and reproduced the YinThread audit; an anonymous release download matches the tested package SHA-256. Publication receipts are retained. No sponsorship application was submitted; personal eligibility and the OpenAI Organization ID remain pending. See docs/releases/alpha-verification.md and issue #6.


Release: https://github.com/tsm0420/geo-growth-engine/releases/tag/v0.1.0-alpha.1
