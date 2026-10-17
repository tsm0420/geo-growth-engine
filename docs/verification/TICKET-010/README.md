# TICKET-010 verification

Actual execution: Darwin 25.5.0 arm64, Node v24.18.0 / npm 11.16.0, 2026-10-17. Each JSON receipt gives the command, UTC time and actual exit; adjacent stdout/stderr are original bytes. All inputs are synthetic local fixtures.

`node --test tests/collection-validation.test.ts` failed before correction: twelve null cases across aso/plan/visibility incorrectly returned exit 0 (13 failures including their parent test; 8 passes). After defaulting only on undefined, all 21 tests passed with zero skips. Omitted and explicit empty aliases/competitors/listings/factIds remain accepted; null fact sources stay evidence gaps in aso/plan. Rejected inputs produce exit 2 and no output directory.

`npm run typecheck`, `npm test` (69 passes, zero failures/skips), and `npm run build` exited 0. Independent reviews and immutable clean-source/package/final-head CI gates are pending.

Immutable alpha.3 source `8a4be99204fc51aa9d4ff751dc3bdfe6f820a37d` passed fresh install/typecheck/69 tests/build, then all 18 expected command outcomes through its extracted npm package. This includes all six commands, report input/conflict preservation, explicit null rejection and omitted-collection acceptance. Frozen YinThread remains 16 pass / 1 fail / 2 unknown and 146/145/1 sitemap counts. Tarball SHA-256: `42a60a5e6054b767ec044f27482f3c97e0f71871b126e12799a8447f93aeb5ff` (20,475 bytes). Original command arguments/cwd/times/exits/stdout/stderr, runtime and all packaged file hashes are in `docs/verification/TICKET-010/candidate/manifest.json` and adjacent receipts. The tarball is local and ignored; final-head PR CI remains pending.
