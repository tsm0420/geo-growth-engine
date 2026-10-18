# Configuration and import contracts

YAML documents require `version: 1`. Syntax errors, duplicate keys, unknown fact references, invalid URLs, and incompatible types are operational errors. Source URLs are stored, not fetched. `init` creates the editable templates.

## Config

```yaml
version: 1
origin: https://your-product.example
publicDir: ../out
product: product.yaml
queries: queries.yaml
```

Origins are HTTP(S) origins without paths, credentials, queries, or fragments. Paths declared in YAML resolve against the config file. Explicit CLI arguments (`--config`, `--input`, `--target`, `--output`) resolve against the current working directory; use absolute paths when running elsewhere. `publicDir` is a self-contained local export; symlinks and symlink ancestors are rejected. Installation and report outputs also require canonical filesystem paths without symlinks. A direct `sitemap.xml` urlset is supported; indexes and compressed/multiple sitemaps need a future adapter.

## Audit report

All report commands protect configured config/product/query paths and visibility input from report/evidence destinations, including existing filesystem aliases. Different destinations must not alias the same existing file. Collisions, symlink paths, non-regular destination files, invalid ancestors and applicable write-access failures are operational errors (exit 2), detected across the complete output set before writing. This preserves existing artifacts for these predictable conflicts. Safe output-directory reuse still replaces prior reports/evidence. This preflight is not a multi-file transaction: concurrent path changes, disk exhaustion and power loss can still interrupt later writes; retain separate run directories for history.

Current main includes `sitemap-duplicates` and `data.sitemap`, originally introduced in the alpha 2 candidate. For a supported direct, nonempty, on-origin urlset, the latter contains `entries`, `uniqueUrls`, `duplicateEntries` (excess entries), and `duplicates`. Each repeated URL has `url`, `occurrences`, and one-based `positions` in extracted document order. Repeated URLs sort by decoded text using code-unit order. Evidence names the local sitemap and counts; Markdown includes the same finding and JSON details.

Identity compares exact XML-decoded, trimmed `loc` text, including named and decimal/hexadecimal numeric references. It does not normalize case, percent escapes, query order, fragments, or trailing slashes. A URL escaped as `&amp;#38;` remains literal `&#38;` after one decoding pass. Counts describe extracted local locations, not deployed pages. Sitemap indexes are not expanded. Missing, malformed, or unsupported sitemap input yields unknown duplicates with `data.sitemap: null`, while the existing sitemap check fails. Unique valid entries pass; duplicates fail and cause exit 1. Retain one intended canonical entry and rebuild the export after an authorized fix.

Current main validates XML 1.0 character ranges and reference spelling before sitemap counting, including ignored attributes. Only the five predefined named references are supported without a DTD. Numeric references must denote permitted characters; valid long leading-zero spellings decode once. Reference-looking text inside CDATA/comments/processing instructions remains literal, while prohibited actual characters still fail. Escaped ampersands are never rescanned as references. This is not XML 1.1 or full schema/namespace/encoding conformance certification.

Canonical coverage uses the same URL serialization for the canonical and each decoded sitemap location. Bare origins/trailing root slashes, hostname case and URL-serialized apostrophes can therefore cover the same canonical. This separate coverage lookup does not change the original decoded strings used for duplicate identity/evidence. Path case, `/a` versus `/a/`, unreserved escapes such as `/%61` versus `/a`, and query order remain distinct; ordinary URL parsing still applies. Malformed locations still fail the sitemap finding with unknown/null duplicates rather than becoming report-generation exceptions.

## Report comparison

Current main accepts `compare --before <report.json> --after <report.json> --output <directory>` without a config. Both JSON objects require schemaVersion 1, the same kind (audit/aso/plan/visibility), the same boolean example flag, nonempty generatedAt/scope strings, a findings array and a data field. Finding IDs are nonempty and unique; statuses are pass/fail/unknown; evidence/action are strings, including empty strings. Summary pass/fail/unknown counts must match the findings. Invalid/incompatible inputs cause exit 2 before output writes. Timestamps and importer provenance are supplied, not authenticated.

Exact IDs sort by code-unit order. Each row is added, removed, status-changed, details-changed (different evidence/action), or unchanged, in that precedence. Source paths, case and whitespace are not normalized. `data.changes` retains both observations or null; `data.counts` counts categories. `data.before` and `data.after` retain resolved paths, SHA-256 digests of the original bytes and full parsed reports, including opaque data. Original files remain raw evidence; parsed copies do not preserve JSON formatting. Both input paths/inode aliases are protected by the existing complete output preflight.

Output finding IDs are prefixed with `finding:` and use the later status, or unknown when removed. An additional unknown comparison-scope check makes product identity, collection conditions and growth attribution explicit. Exit 1 means at least one later finding fails; exit 0 can include unknowns/removals and does not certify improvement. The output example flag matches both inputs. The default command does not compare data metrics. Neither mode verifies identical products/cohorts or accepts comparison reports as inputs.

### Optional visibility totals

`compare --visibility-metrics --before <visibility.json> --after <visibility.json> --output <directory>` explicitly adds supplied headline totals. The flag is supported only by compare with two visibility reports; no config or network is required. Existing report validation, example matching, source finding categories, exits and filesystem protections still apply. The default mode continues to accept opaque data without validating totals.

Explicit mode requires each `data.totals` to contain nonnegative safe-integer attempted/successful/failed counts, with attempted=successful+failed. Coverage must be null exactly at zero attempts, otherwise successful/attempted. Mention/citation rates must be null exactly at zero successes, otherwise finite fractions in [0,1]. Missing or inconsistent fields produce an actionable before/after field error and exit 2 before writes. Shape/range/denominator validation does not recompute or authenticate supplied measurements or infer raw mention/citation numerators.

`data.visibilityMetrics` contains six rows in order: attempted, successful, failed, coverage, mentionRate, citationRate. Each has metric, unit (`count` or `fraction`), before, after and difference (after minus before). A null side produces a null difference, never zero. Fractions/differences retain numeric precision in JSON; Markdown evidence displays percentages and percentage-point differences to two decimal places. Six additional `visibility-metric:<metric>` findings remain unknown and do not alter `data.counts`, which still counts structural finding categories. All original source data/digests remain available.

Arithmetic differences do not establish improvement, statistical significance, recommendations or attribution. Product/query/cohort/collection identity and importer provenance remain unverified; inspect raw answers, denominators and comparable collection conditions before interpretation. Group/competitor alignment and recommendation comparison are outside this option.

## Product

Start with `templates/product.yaml`. Required: `version`, boolean `example`, `name`, `ownedOrigins` (including config origin), `platforms` (`web`, `ios`, `android`), and `facts`. Optional `aliases`, `competitors`, and `listings` default to empty collections.

Each fact has a unique `id`, a `claim`, and an HTTP(S) `source` or null. A null source is an evidence gap. Listing keys are `ios` and `android`; each has `locale`, `factIds`, and text fields. iOS fields: `name`, `subtitle`, `keywords`, `description`. Android fields: `title`, `shortDescription`, `fullDescription`. One locale per listing is supported; use separate product/config files for other locales.

Text checks count Unicode code points; Apple's keywords use UTF-8 bytes. See [platform sources](sources.md). Length compliance is not store approval, and fact references do not establish semantic copy accuracy.

## Queries

```yaml
version: 1
queries:
  - id: beginner-notes
    query: How can I keep daily notes?
    intent: use-case
    priority: 1
    factIds: [daily-notes]
```

IDs are unique; priority is 1 (highest), 2, or 3. Fact IDs must exist in the product file. Empty links or unsourced facts produce research gaps. Opportunities sort by declared priority then ID. Priorities are supplied preferences, not measured search volume.

## Visibility JSONL

One JSON object per line. This illustrates the format, not an actual observation:

```json
{"id":"observation-001","provider":"provider-name","surface":"api-web-search","model":"exact-model","query":"Exact query","locale":"en-GB","observedAt":"2026-10-16T12:00:00Z","status":"success","answer":"Verbatim answer","citations":["https://your-product.example/page"]}
{"id":"observation-002","provider":"provider-name","surface":"api-web-search","model":"exact-model","query":"Exact query","locale":"en-GB","observedAt":"2026-10-16T12:00:00Z","status":"error","error":"Verbatim collection error"}
```

Required shared strings: unique `id`, `provider`, `surface`, `model`, `query`, `locale`, and ISO `observedAt` with timezone. Use an exact model identifier when available or an explicit `undisclosed` marker for interfaces that hide it. Keep API and consumer surfaces distinct.

Success requires a nonempty `answer` and an HTTP(S) `citations` array, possibly empty. Error requires `error`. Optional `example: true` forces the report's example label. Blank lines are ignored; malformed records reject the entire import before evidence is written. Empty input yields an unmeasured sample set with null rates.

Mentions use case-insensitive Unicode letter/number boundaries around configured names and aliases. Underscores and punctuation are delimiters, so `_Example Journal_` counts. Substring variants embedded next to Unicode letters or numbers do not count; languages without word separators may require explicit aliases or manual review. Citation ownership uses exact hostnames and genuine subdomains. Import structured citation data, not inferred naked links. The CLI preserves input bytes but cannot authenticate the supplied answers. Query-selection bias and changing query sets require researcher judgment.

## Optional collections

Product `aliases`, `competitors`, `listings`, and each listing's `factIds` default to empty only when omitted. Explicit `null` has the wrong list/object type and causes exit 2 before reports are written. Valid empty collections are accepted. A fact's `source: null` remains a supported evidence gap; it is not a malformed collection or a verified claim.

## Inferred crawler paths

Crawler checks infer a URL from the local export filename, encoding each path segment before URL parsing. Literal `#`, `?` and `%` stay filename data, actual platform directory separators remain separators (literal POSIX backslashes encode as filename data), and `index.htm`/`index.html` retain their existing directory-route convention. Canonical coverage is checked separately; a canonical pointing elsewhere does not change the inferred crawler path. Deployment routes, redirects and live bot access remain unverified.
