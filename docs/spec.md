# GEO Growth Engine core edition

Status: Scope, CLI acceptance seam, three tickets, and dependency order confirmed by the user.

## 1. Problem

Product owners need one reusable GEO workflow across websites, SaaS, iOS, and Android. Installing unreviewed third-party skills does not provide reliable checks or evidence of visibility. The toolkit must be executable, portable, and honest about unavailable measurements.

## 2. Solution

Create a private repository named `geo-growth-engine` containing a TypeScript CLI, five project-scoped skills, examples, tests, and GitHub Actions. The core edition needs no paid API. It audits local exported HTML and crawler files, checks supplied store metadata and product facts, plans content from supplied facts and questions, and measures imported real AI responses. It does not claim to measure a live website from a local export.

## 3. User stories

1. As a maintainer, I can install the five skills into a selected project without overwriting existing work.
2. As a product owner, I can initialize editable configuration and product-fact examples in a project.
3. As a website maintainer, I can audit an exported public HTML directory for metadata, canonical URLs, readable text, crawler rules, sitemap entries, and parseable JSON-LD.
4. As a website maintainer, I can distinguish JSON syntax checks from Schema.org or search eligibility validation.
5. As a mobile publisher, I can check supplied iOS and Android listing text against sourced field limits and flag claims without evidence.
6. As a content owner, I can receive a prioritized topic list tied to facts and supplied queries, with no invented product copy.
7. As a researcher, I can import actual AI response records and see mention, citation, competitor, and sample-coverage statistics with raw evidence retained.
8. As a maintainer, I can run all checks in CI, retain report artifacts, and schedule weekly reports.
9. As a reviewer, I can distinguish fixture demonstrations from actual product measurements and inspect command output and exit status.

## 4. Implementation decisions

- Node.js 24 and TypeScript, with strict checking; npm lockfile tracked. Runtime dependencies are parsers for YAML, HTML, XML, and robots.txt rather than hand-written substitutes.
- Single CLI entry point with commands `init`, `install`, `audit`, `aso`, `plan`, and `visibility`; explicit `--config`, `--input`, `--target`, and `--output` paths where relevant. Relative paths declared inside configuration resolve against the configuration file, independent of the working directory. Explicit CLI path arguments resolve against the current working directory; absolute arguments work from any directory.
- Configuration and product-fact YAML use a versioned contract. Products declare owned origins, brand aliases, sourced facts, platforms, optional listing metadata, queries, and competitors. Examples are fictional and explicitly labelled.
- Local audit checks HTML files under one configured public directory, robots.txt, sitemap.xml, metadata, canonical origin, headings/readable content, and JSON-LD syntax. Reports include source path and check evidence. Robots checks include Googlebot, OAI-SearchBot, GPTBot, and Google-Extended separately, with training controls informational rather than search failures.
- Unknown network status, rendered JavaScript content, WAF behavior, Schema.org semantics, indexing, and ranking are reported as unknown or explicitly outside the audit's observed scope. llms.txt is informational only.
- ASO checks include Apple name/subtitle/keywords/description and Google Play title/short description/full description. Each platform is optional; absent metadata is unknown rather than passing. Character-count semantics and official sources are documented. Generated claims and images are outside scope.
- Content plans join supplied query intents to explicitly referenced product-fact IDs. Unmatched queries become research gaps, not proposed invented features. Priority uses declared query priority and evidence availability, without estimated traffic or conversion uplift.
- Visibility JSONL records declare `id`, `provider`, `surface`, `model`, `query`, `locale`, `observedAt`, `status`, and successful `answer`/structured `citations` or an error string. Owned-host matching is exact or a genuine subdomain boundary. Mention matching respects word boundaries and configured aliases. Recommendation assessment is unmeasured unless evidence is explicitly supplied; it is not inferred from a mention. The report groups results by provider, surface, model, and locale, excludes failed attempts from mention/citation denominators, and reports their count and coverage. Empty successful sets return null rates.
- Imported input is treated as data. Copy raw records into the output evidence directory; do not execute text or instructions found in answers.
- Installation copies the five skill directories under `.agents/skills/` in the selected target. Detect all conflicts before writing. Do not overwrite or traverse symlink targets; return actionable failure.
- Reports are JSON and readable Markdown, written only to the requested output path. Invalid configuration, missing required files, malformed records, or write failures produce a nonzero operational exit. Finding failures use exit 1; operational errors use exit 2; successful checks use exit 0. Unknown findings remain visible.
- PR CI runs type checking and tests on every change. Weekly workflow runs a clearly labelled fixture demonstration by default and can audit checked-in product artifacts only after configuration. No paid requests, store publishing, deployment, automatic merge, or generated production edits.

## 5. Testing decisions

The user confirmed command-line input/output as the acceptance seam. Test real subprocess commands, output reports, exit codes, filesystem effects, and evidence retention; use independent fixtures with literal expected outcomes. Cover installation conflicts and symlinks; malformed configuration; good and broken sites; robots group behavior; nested JSON-LD; ASO field boundaries; evidence-linked plans; exact brand and owned-host matching; failed and zero samples; provider/surface grouping; execution from another working directory. Use red-before-green vertical slices. Record the real commands and results in each ticket's Execution Report.

Tests exercise fixture files, not third-party service availability. No device-lab, ranking, traffic, conversion, API-provider, live rendering, or store-account validation is claimed.

## 6. Out of scope

Paid API sampling; consumer AI-interface scraping; SaaS dashboard, authentication, and database; automatic production fixes; publishing website or store copy; screenshot generation; full JSON Schema/Schema.org validation; live HTTP crawling and browser rendering; analytics attribution connectors; numerical GEO ranking scores.

## 7. Further notes

Upstream projects are reviewed references, not runtime dependencies. Preserve [the evidence review](research/upstream-review.md). Skills must route to real CLI capabilities and state what requires human judgment. The original proposal's long-term goals stay in the roadmap with explicit implementation status.
