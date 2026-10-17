# TICKET-009 verification

Execution: 2026-10-17, Darwin arm64 / Node v24.18.0 / npm 11.16.0. Original stdout/stderr and numeric exit files are retained without trimming or redaction. CLI fixtures are synthetic local input, not product measurements.

Commands ran from the toolkit root:

| Command | Receipt prefix | Actual result |
| --- | --- | --- |
| `node --test tests/report-integrity.test.ts` before source-overlap guard | `overlap-red` | Exit 1; four commands incorrectly returned 0 |
| Same command after direct-path guard | `overlap-green` | Exit 0 |
| `node --test --test-name-pattern='hard-linked' tests/report-integrity.test.ts` before filesystem identity guard | `alias-red` | Exit 1; alias incorrectly returned 0 |
| `node --test tests/report-integrity.test.ts` after alias guard | `alias-green` | Exit 0 |
| `node --test --test-name-pattern='later report destination' tests/report-integrity.test.ts` before destination preflight | `preflight-red` | Exit 1; JSON bytes changed before the reported error |
| `node --test tests/report-integrity.test.ts` after preflight | `preflight-green` | Exit 0 |
| Same command with remaining input/ancestor/reuse/permission coverage | `coverage` | Exit 1 from test cleanup ENOENT after fixture removal; not a product failure or passed run |
| Same command after placing permission cleanup in finally | `coverage-final` | Exit 0; 14 tests including subtests, no skips |
| `node --test --test-name-pattern='two destinations' tests/report-integrity.test.ts` before mutual-alias guard | `output-alias-red` | Exit 1; aliased report paths incorrectly returned 0 |
| `node --test tests/report-integrity.test.ts` after mutual-alias guard | `output-alias-green` | Exit 0; 15 tests including subtests, no skips |

The permission case uses an actual unprivileged POSIX process and 0444 destination; it explicitly skips on privileged/Windows environments where that mechanism does not establish write failure. Source/config/product/query/raw-response preservation, hard-link aliases, blocked later file/ancestor and safe replacement evidence are exercised at the real CLI seam. Existing symlink tests remain part of the full suite. No concurrency, disk-exhaustion or power-loss rollback was tested or promised.

Full checks, independent reviews and immutable candidate/PR identities are recorded when observed; this file does not presume pending gates passed.

Final working-tree checks: `npm run typecheck`, `npm test` (48 passed, zero failed/skipped) and `npm run build` each exited 0, with original `typecheck`, `tests` and `build` receipts here. Independent Standards and Spec review reports are retained under `docs/reviews/TICKET-009/`; neither found actionable introduced defects. Immutable clean-source/package and final-head CI gates remain pending.
