# Verification receipts

Session: 2026-10-16. Actual execution host: Darwin arm64; Node.js v24.18.0. No mobile device, browser rendering, production site, store account, paid AI endpoint, ranking, or conversion measurement was used.

## Verified local results after review fixes

- `npm run typecheck`: passed; [raw output](typecheck.txt).
- `npm test`: 22 CLI acceptance tests passed, zero failures; [raw output](full-tests.txt).
- `npm run build`: passed; [raw output](build.txt).
- The built CLI ran `audit`, `aso`, `plan`, and `visibility` on fictional fixtures. [Raw JSON and Markdown reports](example-reports/) preserve their example labels and unknown findings.
- `npm pack --json --ignore-scripts`: [package manifest receipt](package.json). Extracted the actual tarball in an isolated temporary directory, linked the existing dependency installation, and ran its built `init`, `install`, and `audit` commands: [init](package-init.txt), [install](package-install.txt), [audit](package-audit.txt). This verifies packaged resources; it is not a clean network installation test.
- `python3 <skill-creator>/scripts/quick_validate.py <skill>`: all five skill frontmatters passed. This validates packaging, not agent behavior.
- Standards review: two findings, both resolved; [initial report](../reviews/standards-initial.md) and [final disposition](../reviews/standards-final.md).
- Spec review: four findings, all resolved or reconciled; [initial report](../reviews/spec-initial.md) and [final disposition](../reviews/spec-final.md). The path contract now explicitly distinguishes YAML-relative and CLI-relative paths.
- Additional regressions cover report-file and evidence-directory symlinks, export-root symlinks, installation ancestors/dot-dot segments, canonical versus crawl paths, and standard XML entity decoding. Raw red/green receipts are retained.
- GitHub CI passed for implementation commit `b956d61305b9653a8e3863016a9fdeeb175db89a`: [actual run](https://github.com/tsm0420/geo-growth-engine/actions/runs/38956740077), [Code Review result](github-ci-source.json), and [untruncated job log](github-ci-source-logs.json). It ran the typecheck, 22 tests, build, and fictional-report generation/upload. This is CI evidence, not a real product visibility measurement.
- Public copies normalize the personal workstation checkout/home prefixes; [the transformation manifest](../releases/evidence-normalization.json) records original and public digests. Original bytes are retained in an ignored local archive. Historical Git blobs and remote CI logs are not rewritten. These copies preserve result values but are not byte-identical originals.

Red-phase logs document observed failing tests before their implementation or correction. The initial audit fixture failure was followed by a separate command-level red check, so a missing fixture is not presented as sufficient behavioral evidence.

## Public alpha

See [alpha verification](../releases/alpha-verification.md) for the clean installation, packaged CLI, credential-pattern scan, and real-site snapshot checks performed for the public preview. The [YinThread case](../case-studies/yinthread/README.md) is a bounded real technical observation; the original example reports above remain fictional.
