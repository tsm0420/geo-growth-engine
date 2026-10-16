# Public alpha release specification

Status: Authorized by the maintainer on 2026-10-16.

## Problem

The implemented toolkit is only accessible through a private implementation branch. New users need an installable, appropriately licensed public alpha with reproducible evidence and an honest statement of its limits.

## Solution

Publish the existing core as `v0.1.0-alpha.1` under MIT after release preparation, verification, independent Standards and Spec reviews, and merge. Prepare funding application drafts without claiming eligibility, submission, or approval.

## User stories

1. As a new user, I can clone a public repository and follow the README to run the core CLI.
2. As a contributor, I can find the license, contribution process, known limitations, and private security reporting route.
3. As a reviewer, I can reproduce a technical snapshot audit of the maintainer-authorized `yinthread.com` and inspect the actual response artifacts and hashes.
4. As a maintainer, I can review factual OSS application drafts and supply personal information and attestations before submission.

## Implementation decisions

- Keep the implemented CLI behavior and five skills unchanged. Set package metadata to alpha version, MIT, and repository/support URLs. Keep npm publication disabled; use GitHub source and a built package release asset.
- Add contributor, security, changelog, and release documentation. Replace private-only onboarding language and normalize personal workstation paths in public evidence copies; retain original receipts locally. Historical commits and original CI logs remain historical records; normalization is presentation cleanup, not deletion from Git history.
- Capture only the public homepage, robots.txt, and sitemap.xml for the authorized case. Preserve requested/effective URL, timestamp, status, content type, bytes, and digest. Run the existing local-file audit on successful captured artifacts. Failed/unsupported responses remain explicit; do not create success-shaped replacements. Do not crawl sitemap links or change the site.
- Use the supplied sample only to demonstrate observed HTML/crawler checks. Rendering, AI citations, rankings, traffic, conversion, and improvement claims require separate measurements.
- Scan tracked files and reachable Git blobs for common credential patterns before public visibility. Document scope and findings without claiming exhaustive secret detection.
- Prepare application drafts in ignored local files. Cite official program sources and leave unverified personal/traction fields pending. No form submission, email, provider login, payment, or terms acceptance is in this release.
- Merge the reviewed core PR, set the repository public, enable private vulnerability reporting, verify the published state, and create a GitHub prerelease at the verified default-branch commit.

## Testing decisions

Use the existing real CLI seam: clean dependency installation, typecheck, all CLI tests, build, fictional command runs, real-site snapshot audit with its actual exit status, and an extracted built-package install/init/audit check. Inspect the actual tarball license/resources. Retain raw receipts and SHA-256 manifests. Verify CI for the expected PR head and merged default branch through the Code Review plugin. Verify release/tag, public visibility, license detection, and security-reporting configuration through GitHub. Reviews inspect the release diff against `4ea719775dcd081a7dfb1a2c292fe4cef44881dc` independently and report each axis separately.

## Out of scope

New runtime features, paid sampling, npm publication, site changes, browser/device measurements, rankings, adoption claims, and submitting sponsorship applications.

## Further notes

The initial private-repository requirement in `docs/spec.md` is superseded only for publication by this authorized release specification. The technical core contract is unchanged. External users and community feedback remain unverified until observed.
