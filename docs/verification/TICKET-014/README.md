# TICKET-014 verification

Actual runtime: Darwin 25.5.0 arm64, Node v24.18.0/npm 11.16.0, 2026-10-17. Original command/time/exit JSON and stdout/stderr are retained. Inputs are synthetic local exports.

`node --test tests/coverage.test.ts` failed before correction: bare-origin, hostname-case and apostrophe coverage returned exit 1 instead of 0 (4 failures including parent, 7 passing controls). Serializing decoded locations into a separate coverage lookup passed all 11 tests, zero skips. Negative path case/trailing slash/query-order/encoded-path controls remain distinct. Original decoded duplicate strings/counts/positions remain exact; malformed locations stay a sitemap finding/unknown-null duplicate summary with exit 1 rather than an operational exception.

`npm run typecheck`, `npm test` (121 passes, zero failures/skips) and `npm run build` exited 0. Separate reviews, immutable package proof and exact-head PR CI remain pending. This does not establish deployed indexing, URL routing or measured visibility.

Final core alpha.3 source `fe885bbf7d90127b8ca230b28283fb2c83d5a2ca` passed fresh install/typecheck/121 tests/build and all 23 expected extracted-package outcomes: all six commands and every hardening regression class, including equivalent canonical coverage with exact duplicate counts. Frozen YinThread remains 16 pass / 1 fail / 2 unknown, sitemap 146/145/1, positions 8,12. Tarball SHA-256 `39c9e37d07830475ac88b0502d2f247ed991796aa7be838eed6f096dbda6bfd4` (22,205 bytes). Original runtime/commands/cwd/times/exits/output and all package file hashes are in `docs/verification/TICKET-014/candidate/manifest.json` and adjacent receipts. Tarball remains local/ignored; no release is inferred. Exact final-head PR CI remains pending.
