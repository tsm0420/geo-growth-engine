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

Mentions use case-insensitive Unicode letter/number boundaries around configured names and aliases. Substring variants do not count; languages without word separators may require explicit aliases or manual review. Citation ownership uses exact hostnames and genuine subdomains. Import structured citation data, not inferred naked links. The CLI preserves input bytes but cannot authenticate the supplied answers. Query-selection bias and changing query sets require researcher judgment.
