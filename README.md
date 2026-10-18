# GEO Growth Engine

A reusable GEO (Generative Engine Optimization) toolkit for websites, SaaS, iOS, and Android. Five project-scoped skills use a TypeScript CLI to inspect public HTML exports, review store text, plan evidence-backed content, and summarize recorded AI answers. The core edition requires no paid API.

**v0.1.0-alpha.1:** an early public preview under [MIT](LICENSE). Checks produce evidence and explicit unknowns; they do not predict rankings or growth. See the [YinThread technical snapshot case](docs/case-studies/yinthread/README.md), [changelog](CHANGELOG.md), and [roadmap](docs/roadmap.md).

**Alpha 2 candidate:** PR #9 adds explicit duplicate sitemap findings and a frozen-snapshot re-audit. It is not a tagged or published release. The installation below uses the published alpha 1; to review that candidate, check out `codex/alpha-2-candidate` and use its [specification](docs/releases/alpha-2-spec.md) and [verification](docs/verification/alpha-2/README.md).

**Core hardening candidate (alpha 3):** `codex/canonical-sitemap-coverage` contains the six hardening slices stacked on unmerged PR #9, improving report safety, configuration validation, mention boundaries and local audit accuracy. It is not a release. See the [hardening specification](docs/core-hardening-spec.md) and [iteration ledger](docs/development-loop.md).

## Quick start

Use Node.js 24 (the tested runtime). Install from the tagged GitHub source; no npm registry package is available:

```sh
git clone --branch v0.1.0-alpha.1 --depth 1 https://github.com/tsm0420/geo-growth-engine.git
cd geo-growth-engine
npm ci --ignore-scripts
npm run build
node dist/src/cli.js --help
```

Try the fictional fixtures:

```sh
npm run geo -- audit --config examples/.geo/config.yaml --output reports/example
npm run geo -- aso --config examples/.geo/config.yaml --output reports/example
npm run geo -- plan --config examples/.geo/config.yaml --output reports/example
npm run geo -- visibility --config examples/.geo/config.yaml --input examples/visibility.jsonl --output reports/example
```

Every report has JSON and Markdown outputs. Example answers are authored fixtures, not AI observations; example reports are labelled accordingly. For a captured real homepage instead, follow the [case-study reproduction steps](docs/case-studies/yinthread/README.md).

## Use with a product

From this toolkit checkout:

```sh
node dist/src/cli.js init --target /absolute/path/to/product
node dist/src/cli.js install --target /absolute/path/to/product
```

Edit the new `.geo/config.yaml`, `product.yaml`, and `queries.yaml`. Replace fictional origins, facts, platforms, listing text, and evidence sources. Set `example: false` only for actual product inputs. Point `publicDir` to the target's HTML build/export with `robots.txt` and a direct `sitemap.xml` urlset. Paths resolve relative to the config file. Build the target site before auditing.

```sh
node dist/src/cli.js audit --config /absolute/path/to/product/.geo/config.yaml --output /absolute/path/to/product/.geo/reports
```

Installation preserves existing files and rejects symlink destinations and ancestors. Provide canonical filesystem paths for installation, public exports, and report outputs. CLI path arguments resolve against the current working directory; paths declared in YAML resolve against the config file. Skills install under `.agents/skills/`; keep this toolkit checkout and CLI available for their commands. Installation does not edit application source, install globally, or configure another agent's discovery directories.

The installation hardening candidate checks each destination's nearest existing parent for creation access before writing configuration or skills. Predictable destination conflicts leave no earlier files installed, so correcting permissions allows a clean retry. This preflight does not provide rollback for concurrent changes or later disk/I/O failures.

| Command | Behavior |
| --- | --- |
| `init` | Create editable example configuration without overwrites. |
| `install` | Copy five project-scoped skills after checking all conflicts. |
| `audit` | Inspect HTML metadata, canonical URLs, text, robot policies, sitemap coverage/duplicates, and JSON-LD syntax. |
| `aso` | Check Apple/Google Play text limits and supplied fact references. |
| `plan` | Link audience questions to sourced facts; keep unsupported queries as research gaps. |
| `visibility` | Import response JSONL, retain raw evidence, and report mentions, citations, competitors, and coverage. |
| `compare` (candidate) | Compare exact finding IDs and observations in two retained local reports. |

`audit`, `aso`, `plan` and `visibility` require `--config` and `--output`; `visibility` also requires `--input`. `init` and `install` require an existing `--target` directory. Exit 0 means completion without failed checks; 1 means observed failed checks; 2 means an operational/input error. Unknown findings remain visible with exit 0. Reusing an output directory replaces same-named reports and evidence; use a fresh directory per run to retain history.

The hardening candidate rejects output paths that would overwrite configured inputs or imported records, and checks all destinations before writing. Predictable type, alias, symlink and write-access conflicts leave prior artifact bytes intact. This is preflight rather than transactional recovery from disk or concurrency failures; see the [report contract](docs/configuration.md#audit-report).

In the alpha 2 candidate, repeated sitemap URLs cause exit 1 and a `sitemap-duplicates` finding with counts and entry positions. Identity uses XML-decoded text; URL spellings are not normalized. See the [audit report contract](docs/configuration.md#audit-report).

### Compare retained reports (unmerged candidate)

The `codex/local-report-comparison` candidate adds the following command; the published alpha 1 quickstart does not include it. Build this candidate checkout before using its compiled CLI:

```sh
node dist/src/cli.js compare --before /absolute/path/to/earlier/audit.json --after /absolute/path/to/later/audit.json --output /absolute/path/to/comparison
```

No config is required. Inputs must share schema version 1, report kind (`audit`, `aso`, `plan` or `visibility`) and fictional/actual flag. `compare.json` and `compare.md` show added, removed, status-changed, details-changed and unchanged findings, both parsed reports and original-byte digests. Exact IDs and text are compared; even path-only evidence changes stay visible. Removed checks become unknown; remaining or newly failed checks produce exit 1. Exit 0 can still contain unknown or removed findings. Product identity, collection conditions and growth attribution remain unverified. See the [comparison contract](docs/configuration.md#report-comparison-candidate).

## Evidence and limits

Audits read local files. Deployment status/headers, WAF access, browser rendering, indexing, Schema.org semantics, rankings, and AI citations are unmeasured. JSON-LD parsing proves syntax only. llms.txt is optional. Search-bot access and training permission are separate controls.

ASO uses [sourced platform rules](docs/sources.md). Fact references provide traceability, not proof of every sentence. Copy semantics, localization quality, screenshots, store-console approval, and conversion require actual review and measurements.

Visibility rates describe the supplied sample set. Successful responses form mention/citation denominators; collection errors remain in failed counts and coverage. No successful responses means null rates. Results group by provider, surface, model, and locale. Changing query sets are not comparable market rankings. Structured citations count exact owned hosts or genuine subdomains; naked URLs in answer text do not count. A mention is not a recommendation. Raw records and a SHA-256 digest are retained; importer provenance is not independently verified.

## Automation

PR CI typechecks, tests, builds, and retains fictional reports. Weekly reporting runs Mondays at 08:00 UTC on the default branch, using the fictional example by default. Manual runs accept a checked-in product config and optional visibility records. Workflows do not buy API calls, publish, deploy, or merge. Scheduling begins when the workflow reaches the default branch.

See [configuration](docs/configuration.md), [specification](docs/spec.md), [domain glossary](CONTEXT.md), [upstream review](docs/research/upstream-review.md), [verification receipts](docs/verification/README.md), and [roadmap](docs/roadmap.md).

## Contributing and licensing

Read [CONTRIBUTING.md](CONTRIBUTING.md) for development and PR guidance, and [SECURITY.md](SECURITY.md) for private vulnerability reporting. File reproducible issues through [GitHub](https://github.com/tsm0420/geo-growth-engine/issues).

The toolkit code and documentation are licensed under [MIT](LICENSE). Captured website bodies are source evidence with [separate rights](docs/case-studies/yinthread/README.md#snapshot-rights). Parser dependencies retain their own licenses; upstream GEO projects are reviewed references and are not installed or vendored. The npm `private` flag prevents accidental registry publication and does not restrict the open-source license. The core has no required paid API, and this project has no claimed OpenAI or Anthropic sponsorship.
