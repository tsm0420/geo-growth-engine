# TICKET-010 verification

Actual execution: Darwin 25.5.0 arm64, Node v24.18.0 / npm 11.16.0, 2026-10-17. Each JSON receipt gives the command, UTC time and actual exit; adjacent stdout/stderr are original bytes. All inputs are synthetic local fixtures.

`node --test tests/collection-validation.test.ts` failed before correction: twelve null cases across aso/plan/visibility incorrectly returned exit 0 (13 failures including their parent test; 8 passes). After defaulting only on undefined, all 21 tests passed with zero skips. Omitted and explicit empty aliases/competitors/listings/factIds remain accepted; null fact sources stay evidence gaps in aso/plan. Rejected inputs produce exit 2 and no output directory.

`npm run typecheck`, `npm test` (69 passes, zero failures/skips), and `npm run build` exited 0. Independent reviews and immutable clean-source/package/final-head CI gates are pending.
