# TICKET-006: Detect sitemap duplicates and verify alpha 2 candidate

Status: Completed candidate implementation and verification
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

## 📄 Execution Report

Implemented the specified `sitemap-duplicates` finding and `data.sitemap` evidence. Independent literal CLI fixtures first failed on duplicate exit behavior and numeric-reference identity, then passed after implementation. Unique spelling distinctions and six unsupported/unavailable cases pass, including unknown duplicate status. A direct pinned MIT `@nodable/entities@3.1.0` uses the XML parser's supported decoder interface; no deprecated option or Cheerio override is used. README, configuration/report guidance, web-geo skill, changelog and case documentation match the behavior.

The frozen YinThread copy returned exit 1 with 16 pass, 1 fail, 2 unknown, 146 entries, 145 unique URLs, and day-master at positions 8 and 12. Three body hashes match capture.json; historical files have no diff. New reports are separate, with original temporary paths. Raw red/green, typecheck, 33-test suite, build, case output/exits/hashes are under `docs/verification/alpha-2/`. Actual runtime: Darwin arm64, Node v24.18.0, npm 11.16.0. Parallel independent Standards and Spec reviews in separate worktrees found zero actionable introduced defects; Spec independently ran typecheck and all 33 tests. Reports: `docs/reviews/alpha-2/`.

This source commit completes implementation and updates both ticket reports. Committed-source clean install, packaged CLI/digest/revision and final-head PR CI remain pending; candidate delivery is not yet claimed complete. No publication, production change or live acquisition occurred.

Subsequent committed-source verification on `071c591948c5265afdf674ef9ecf8d1e988bbd2e` completed all 14 command checks. A fresh source archive passed locked installation, typecheck, 33 tests and build. The actual extracted 0.1.0-alpha.2 package installed its own production dependencies and passed help/init/install/audit/aso/plan/visibility; its frozen-case audit returned expected exit 1 and exact counts/positions. Package SHA-256: `cdefcda140b6e7c388dc0839d4349b076fc51e37f738f98d9924ec19ff38e790`. Manifest, command arrays/times/exits, original stdout/stderr and packaged-file hashes: `docs/verification/alpha-2/candidate/`. The temporary harness's initial unsupported Python API failure is disclosed in the verification guide; no product check was counted from that attempt.

PR #9 is open and attached. Its source-head CI passed (run 39035068080, job 117403116463); the Code Review plugin returned success with an untruncated job log. The final documentation-only head will be checked separately before delivery; no executable or packaged input has changed since the reviewed source revision. Local candidate readiness: external alpha review, with the known unresolved BL-001 warning; no production/growth assurance. The PR remains unmerged and alpha 2 unpublished.
