# TICKET-014: Compare canonical sitemap coverage consistently

Status: Completed delivery; PR #16 open and unmerged
Assignee: Codex
Target Workspace: `geo-growth-engine`, branch `codex/canonical-sitemap-coverage`
Blocked by: TICKET-007 investigation (complete); PR #15 open and unmerged (transitive #14/#13/#12/#11/#9)
Specification: `docs/core-hardening-spec.md`, TICKET-014

## Objectives

Use symmetric URL serialization for coverage while preserving raw exact decoded duplicate identity.

## Hard constraints

Existing local-input core only; English docs, strict TypeScript, real CLI red/green tests, independent Standards/Spec worktree reviews and same-commit ticket reports. Preserve private data/history/unknowns. No live requests, paid services, merge or publication.

## Acceptance Criteria

- Real CLI bare-origin/apostrophe equivalents pass coverage; distinct case/slash/query controls remain distinct; duplicate data and original evidence remain intact.
- Required typecheck/full suite/build pass, with actual raw receipts and separate resolved review reports before source commit.
- Deliver a reviewable PR with prerequisite, current candidate/package evidence and final-head CI; update the loop ledger before selecting the next justified item.

## 📄 Execution Report

Built a separate serialized URL lookup for canonical coverage while preserving original decoded sitemap locations for exact duplicate counts/positions/evidence. Malformed locations remain failed sitemap findings with unknown/null duplicates, rather than throwing during lookup construction. Ordinary URL parsing applies; tested path case, /a versus /a/, /%61 versus /a and query order remain distinct.

Real CLI red/green receipts under `docs/verification/TICKET-014/` show bare-origin, hostname-case and apostrophe false coverage failures before correction (4 failures including parent, 7 passing controls), followed by all 11 focused tests passing with zero skips. `npm run typecheck`, `npm test` (121 passes, zero failures/skips) and `npm run build` exited 0 on Darwin 25.5.0 arm64 / Node v24.18.0/npm 11.16.0.

Separate Standards and Spec reviews found no actionable introduced defects; both independently ran all 11 focused tests with the supplied dependency copy and inspected the final clarified configuration paragraph. Reports and reviewer receipt are in `docs/reviews/TICKET-014/`.

Immutable source/package and final-head PR CI remain pending delivery steps. This is the last specified core queue implementation, not completion of the Agensi workstream or a release. No dependency, live request, private-file, merge, tag or release change occurred.

Final core alpha.3 source `fe885bbf7d90127b8ca230b28283fb2c83d5a2ca` passed fresh install/typecheck/121 tests/build and all 23 expected extracted-package outcomes: all six commands and every hardening regression class, including equivalent canonical coverage with exact duplicate counts. Frozen YinThread remains 16 pass / 1 fail / 2 unknown, sitemap 146/145/1, positions 8,12. Tarball SHA-256 `39c9e37d07830475ac88b0502d2f247ed991796aa7be838eed6f096dbda6bfd4` (22,205 bytes). Original runtime/commands/cwd/times/exits/output and all package file hashes are in `docs/verification/TICKET-014/candidate/manifest.json` and adjacent receipts. Tarball remains local/ignored; no release is inferred. Exact final-head PR CI remains pending.

Delivery: PR #16 targets #15's branch and declares unmerged #15/#14/#13/#12/#11/#9. Final head `c1ae2d9c626c93d8bbbe7c9dc93f3bc81cfeb031` has unchanged executable/CI inputs and all package file hashes compared with verified source. Code Review observed verify job 117427121547 / run 39043361559 completed/success; original untruncated response retained in `docs/verification/TICKET-014/ci-final.json`. All six recorded core queue slices are delivered, not merged/released. TICKET-008 Agensi preparation now consumes this reviewed final core head; its external decisions remain pending.
