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

## Committed candidate evidence

Source revision: `071c591948c5265afdf674ef9ecf8d1e988bbd2e`. Candidate version: **0.1.0-alpha.2**. Actual package: `geo-growth-engine-0.1.0-alpha.2.tgz`, 19,472 bytes, SHA-256 **`cdefcda140b6e7c388dc0839d4349b076fc51e37f738f98d9924ec19ff38e790`**. The local package and `SHA256SUMS` are under `reports/alpha-2/` (ignored build artifacts); no release or registry publication occurred.

The [manifest](candidate/manifest.json) records the source archive digest, 22 packaged-file hashes, all 14 executed command arrays, working directories, timestamps, actual/expected exits, and the actual Darwin 25.5.0 arm64 / Node v24.18.0 / npm 11.16.0 host. Each command has original stdout/stderr and a JSON receipt alongside the manifest.

A fresh `git archive` of that committed revision was extracted into an empty temporary source directory. Locked installation, typecheck, all 33 tests and build passed there. `npm pack --json --ignore-scripts` built the actual tarball from that clean source. The extracted package installed its own production dependencies, without symlinking the development installation. Its built help/init/install/audit/aso/plan/visibility commands passed from the temporary workspace. Installation produced all five skills. Its frozen YinThread audit returned the expected exit 1 and exact 146/145 counts, positions 8/12, and 16/1/2 summary. Both clean installations retain the documented deprecation warning.

The first temporary verification-harness attempt stopped before any checks because the host Python's `tarfile.extractall` lacked the newer `filter` argument. The harness was corrected to invoke the host archive extractor; the successful commands above ran from a new empty directory. That harness failure is not represented as a product failure or a passed check.

Independent [Standards](../../reviews/alpha-2/standards.md) and [Spec](../../reviews/alpha-2/spec.md) reviews found zero actionable introduced defects before the source commit. Spec additionally ran the typecheck and full suite independently. No executable change followed those reviews.

[PR #9](https://github.com/tsm0420/geo-growth-engine/pull/9) is open for review. CI for the source revision passed in [run 39035068080](https://github.com/tsm0420/geo-growth-engine/actions/runs/39035068080): [Code Review result](candidate/source-ci.json) and [untruncated job log](candidate/source-ci-log.json). It ran installation, typecheck, 33 tests, build, and fictional report generation/upload on its actual hosted runner. The final documentation-only PR head must also have a successful check before task completion; consult the PR's current checks and the final delivery receipt for that exact head. Source checks are not presented as checks of a later SHA.

## Readiness and limits

Ready for external alpha review on the evidence above, with the final-head CI gate enforced at delivery. BL-002 is implemented and reproducible. BL-001's investigation is complete but its upstream dependency migration remains **unresolved**; issue #7 stays open. The clean-install warning remains visible. This is not a production-readiness, security-audit, growth, indexing or visibility certification. Schema semantics and live behavior remain unknown. No merge, tag or publication is included.
