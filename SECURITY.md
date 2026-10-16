# Security policy

## Supported versions

The latest `0.1.0-alpha` prerelease is the maintained preview. It may contain breaking changes. There is no security support commitment for older snapshots.

## Reporting a vulnerability

Use GitHub's [private vulnerability reporting form](https://github.com/tsm0420/geo-growth-engine/security/advisories/new) to share reproduction steps, affected version, expected and actual behavior, and potential impact with the maintainer. Keep credentials, personal information, and exploit details out of public issues. If the form is unavailable, open a public issue asking for a private contact route without disclosing the vulnerability.

This is a volunteer project; no response deadline or bounty is promised.

## Input and evidence handling

The CLI reads supplied files and writes reports to the selected output directory. Imported answers are treated as data. Raw visibility records are copied into reports, so check them for private information before sharing. Existing same-named report files can be replaced; use a fresh output directory for each run. Symlink checks reduce accidental traversal but do not provide a sandbox against a hostile local process changing files concurrently. Use a dedicated directory and an unprivileged account for untrusted exports.

The core commands do not fetch websites, execute website scripts, or call paid AI services. Manual case-study snapshots are separate recorded observations. Do not treat a successful audit as a security certification.
