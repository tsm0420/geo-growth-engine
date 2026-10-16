# Public alpha verification

Release target: `v0.1.0-alpha.1`. Preparation date: 2026-10-16. The implementation and source tests are unchanged from the previously reviewed core; this change adds release metadata, documentation, and captured evidence. Publication status is recorded only after GitHub confirms it.

## Evidence scope

- The [prior implementation evidence](../verification/README.md) includes 22 CLI acceptance tests and independent Standards/Spec reviews.
- The [YinThread capture](../case-studies/yinthread/capture.json) preserves three actual HTTP 200 bodies. The CLI's saved-file audit completed with exit 0, 16 pass, 0 fail, and 2 unknown results. Separate XML inspection observed one duplicate sitemap URL; this is not a new CLI feature.
- A [common-pattern scan](history-credential-scan.json) inspected all 98 blobs reachable from local Git refs at the pre-release baseline. No matches were found for the listed credential patterns. This is a bounded regex inspection, not a comprehensive secret-detection guarantee. Current release files are inspected separately before publication.
- Public copies of historical local receipts normalize workstation paths. [Original/public digests](evidence-normalization.json) disclose the changes; ignored local archives retain original bytes. Git history and original GitHub Actions logs remain historical records.
- Lockfile metadata lists MIT/ISC/BSD parser dependencies and Apache-2.0 TypeScript tooling. No upstream GEO source is vendored. The release package resolves dependencies separately rather than bundling their code. Captured website bodies retain separate rights.

## Release gates

Clean-install, suite, package, and independent release-review receipts are recorded below when completed. GitHub CI, visibility, license, private-reporting, and release/tag checks require actual server observations. No real AI-response collection, ranking, growth, rendered-page, mobile-device, or store-console outcome is inferred from these checks.

## Completed local checks

Actual environment: Darwin arm64, Node.js v24.18.0, npm 11.16.0. An isolated source copy with no existing dependency directory ran:

- `npm ci --ignore-scripts --cache /private/tmp/geo-npm-cache --no-audit --no-fund`: 37 packages installed; [output](receipts/geo-alpha-clean-install.txt).
- `npm run typecheck`: passed; [output](receipts/geo-alpha-typecheck.txt).
- `npm test`: 22 tests passed, zero failures; [output](receipts/geo-alpha-tests.txt).
- `npm run build`: passed; [output](receipts/geo-alpha-build-clean.txt).
- Built `audit`, `aso`, `plan`, and `visibility` commands ran successfully against fictional fixtures; [actual command outputs](receipts/geo-alpha-fixture-commands.txt).
- `npm pack --json --ignore-scripts --cache /private/tmp/geo-npm-cache`: produced the alpha tarball; [pack receipt](receipts/geo-alpha-pack.json). [Contents and SHA-256](receipts/geo-alpha-package-contents.json) verify the MIT file and all five skills.
- Extracted the actual tarball to a new directory, installed runtime dependencies with `npm install --omit=dev --ignore-scripts --package-lock=false`, and ran built help/init/install/audit commands; [dependency install](receipts/geo-alpha-package-install-deps.txt), [smoke output](receipts/geo-alpha-package-smoke.txt). This package resolves its pinned direct dependencies on install; source installs use the tracked full lockfile.
- `npm audit --omit=dev --json`: zero known runtime vulnerabilities reported by the registry at the time; [actual response](receipts/geo-alpha-npm-audit-network.json). Clean installation reports a deprecated transitive `whatwg-encoding@3.1.1`; dependency migration is tracked separately rather than changed in this release.

Initial sandbox requests could not resolve the npm registry; [installation failure](receipts/initial-sandbox-install-failure.txt) and [audit failure](receipts/initial-sandbox-audit-failure.json) are retained separately. The authorized network retry produced the completed checks above. An initial packaging attempt also hit the sandbox-protected default npm cache; using the dedicated writable cache corrected the acquisition setup. No global cache permissions were changed.

## Independent release review

- **Standards:** [report](standards-review.md); no documented-standard violations or actionable heuristic smells in the reviewed release proposal.
- **Spec:** [report](spec-review.md); no actionable findings against the alpha release contract. The reviewer independently confirmed snapshot hashes, normalization digests, licensing metadata, and unchanged core behavior.

The reviewers used separate Git worktrees at baseline `4ea719775dcd081a7dfb1a2c292fe4cef44881dc`, with the proposed files copied into each worktree and read-only content access. Their actual review compared the working proposal against that fixed baseline, including new files, rather than claiming a three-dot commit diff existed before the release commit.

The [current-tree common-pattern scan](current-tree-credential-scan.json) found no listed credential patterns or personal workstation prefixes in the proposed public files. Private application drafts and original archives are ignored. Historical commits still contain ordinary workstation paths and original author metadata; no history rewriting was performed. Neither scan proves absence of every possible secret.
