# Alpha 2 candidate verification

Execution date: 2026-10-17 UTC. Actual local host: Darwin arm64; Node v24.18.0, npm 11.16.0. No browser rendering, device lab, live crawling, paid endpoint, production edit, or ranking measurement.

## Implementation receipts

Raw stdout/stderr and numeric exits are stored separately under `receipts/`; they have not been trimmed or path-normalized. Commands ran from the repository root unless stated otherwise. `*.exit.txt` records the command status, independently of later display commands.

| Command | Receipt prefix | Observed exit |
| --- | --- | --- |
| `node --test --test-name-pattern='preserves UTF-8' tests/core.test.ts` | `decoding-baseline` | 0 |
| `node --test tests/sitemap.test.ts` before duplicate implementation | `duplicates-red` | 1: expected 1, actual 0 |
| Same command after duplicate implementation | `duplicates-green` | 0 |
| `node --test --test-name-pattern='decoded XML references' tests/sitemap.test.ts` before decoder integration | `entities-red` | 1: wrong identity/counts |
| `node --test tests/sitemap.test.ts` after decoder integration | `entities-green` | 0 |
| Same command with unique/unavailable cases added | `sitemap-cases` | 0: 10 tests including subtests |
| `npm run typecheck` | `typecheck` | 0 |
| `npm test` | `tests` | 0: 33 tests including six subtests |
| `npm run build` | `build` | 0 |
| `node dist/src/cli.js audit --config /private/tmp/geo-alpha-2-case/config/config.yaml --output docs/case-studies/yinthread/results-alpha-2` | `yinthread` | 1: observed duplicate |

The temporary case was copied with `cp -R docs/case-studies/yinthread /private/tmp/geo-alpha-2-case` before candidate results existed. `shasum -a 256` compared the three original and copied public bodies; [raw hashes](receipts/snapshot-sha256.txt) match `capture.json`. New candidate reports retain actual temporary input paths, with no redaction. Historical capture bytes and reports were preserved.

The [dependency investigation](../../research/encoding-dependency.md) and [raw research receipts](dependency-research/) establish why issue #7 remains open. A successful install still emits the deprecated whatwg-encoding warning. No forced override or supported-release claim is made.

## Remaining candidate gates

Separate Standards/Spec reviews, committed-source clean installation, package smoke/digest/revision, final-head PR CI and readiness disposition will be recorded before delivery. The implementation receipts above do not by themselves establish these remaining gates.
