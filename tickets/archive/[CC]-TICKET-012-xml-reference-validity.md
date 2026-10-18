# TICKET-012: Reject malformed sitemap XML references

Status: Completed delivery; PR #14 open and unmerged
Assignee: Codex
Target Workspace: `geo-growth-engine`, branch `codex/sitemap-xml-references`
Blocked by: TICKET-007 investigation (complete); PR #13 open and unmerged (transitive #12/#11/#9)
Specification: `docs/core-hardening-spec.md`, TICKET-012

## Objectives

Reject undeclared named entities and prohibited numeric references before producing sitemap evidence; preserve valid one-pass XML decoding.

## Hard constraints

Existing local-input core only; English docs, strict TypeScript, real CLI red/green tests, independent Standards/Spec worktree reviews and same-commit ticket reports. Preserve private data/history/unknowns. No live requests, paid services, merge or publication.

## Acceptance Criteria

- Real CLI malformed-reference cases produce exit1/sitemap fail/duplicates unknown with null data; named/numeric/escaped-literal valid controls and historical frozen input remain supported.
- Required typecheck/full suite/build pass, with actual raw receipts and separate resolved review reports before source commit.
- Deliver a reviewable PR with prerequisite, current candidate/package evidence and final-head CI; update the loop ledger before selecting the next justified item.

## Research addendum before implementation

Primary-source XML 1.0 review and 31 recorded real CLI probes confirm malformed named/numeric references (including ignored attributes) and prohibited literal characters need checking before decoding. Reference-looking text in CDATA/comments/processing instructions and escaped ampersands remains literal. A valid numeric reference with 40 leading zeroes also exceeds the installed decoder's scan length and produces incorrect duplicate identity; include this observed positive-control defect in valid one-pass preservation. Keep existing structural validation, DTD exclusion and expansion limits. No XML 1.1, namespace/schema or encoding-conformance expansion is requested. Research: `docs/research/xml-reference-validity.md`.

## 📄 Execution Report

Validated original XML 1.0 Char ranges and complete predefined/numeric reference tokens before sitemap counting. Tag/quote context distinguishes actual CDATA/comments/PIs from prohibited attribute contents. Invalid input produces sitemap fail / duplicates unknown / null data. Validated numeric spellings compact inside the inherited decoder's original-input pass to avoid its observed 32-character scan cap, preserving one-pass identity and literal output. Structural validation, DTD exclusion and expansion limits remain.

Real CLI red/green records are in `docs/verification/TICKET-012/`: initial 33 tests showed 17 malformed-content false-pass cases (18 failures including parent); reference checks passed, then a separate long-numeric identity red was fixed. Initial Spec review found a P2 quoted-marker bypass; its three false-success regressions and original independent probes are retained. Tag/attribute-aware scanning closes it while valid quoted element text and escaped attributes remain accepted. Final XML suite: 38 passes, zero skips.

Current `npm run typecheck`, `npm test` (108 passes, zero failures/skips), and `npm run build` each exited 0 on Darwin 25.5.0 arm64 / Node v24.18.0/npm 11.16.0. Historical 34/104-pass checks remain separately identified. Both review axes independently reassessed changed source and reran all 38 XML tests; final reports have no outstanding actionable introduced defects. Spec repeated all three original bypass probes with correct failed/unknown/null outcomes. Reports/check receipts: `docs/reviews/TICKET-012/`.

Immutable candidate/package and final-head PR CI remain pending delivery steps. This is bounded regression evidence, not full XML/schema/namespace/encoding certification. No dependency, live request, private-file, merge, tag or release change occurred.

Immutable alpha.3 source `54c8e908be7a9a0f86e0853f9f17e42888f692c1` passed fresh install/typecheck/108 tests/build and all 21 expected extracted-package outcomes, including all six commands, previous regressions, invalid XML rejection and long-numeric duplicate identity. Frozen YinThread remains 16 pass / 1 fail / 2 unknown and sitemap 146/145/1, duplicate positions 8,12. Tarball SHA-256 `b0dac211c1c8abbcd628e4daf7f024d7de6cbe853f863e71a502ef7e5445f807` (21,708 bytes); original runtime/commands/cwd/times/exits/output and package file hashes are in `docs/verification/TICKET-012/candidate/manifest.json` and adjacent receipts. The tarball is local and ignored. Exact-head PR CI remains pending.

Delivery: PR #14 targets #13's branch and declares unmerged #13/#12/#11/#9. Final head `1e3fe4377f7a6d5b62be1ffe87a8a21b57292c79` has unchanged executable/CI inputs and all package file hashes compared with the verified source. Code Review observed verify job 117423562041 / run 39042126571 completed/success; original untruncated response retained in `docs/verification/TICKET-012/ci-final.json`. An initial transient HTTP 502 log read was retried through the same connector. No merge/tag/release occurred. Next approved slice: TICKET-013.
