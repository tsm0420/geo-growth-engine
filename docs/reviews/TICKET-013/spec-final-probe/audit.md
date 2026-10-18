# audit report

**FICTIONAL EXAMPLE — not a product measurement.**

Generated: 2026-10-17T14:52:55.063Z

local export: /private/tmp/geo-ticket013-spec-probe/public; no network requests or browser execution

Pass: 28; fail: 2; unknown: 2.

| Check | Status | Evidence | Next action |
| --- | --- | --- | --- |
| robots-file | pass | /private/tmp/geo-ticket013-spec-probe/public/robots.txt | Review intentional access policy. |
| sitemap | pass | /private/tmp/geo-ticket013-spec-probe/public/sitemap.xml: 2 locations; direct urlset required | Supply a direct sitemap urlset for this export; sitemap indexes are not expanded. |
| sitemap-duplicates | pass | /private/tmp/geo-ticket013-spec-probe/public/sitemap.xml: 2 entries; 2 unique URLs; 0 duplicate entries | Retain one intended canonical entry per URL and rebuild the export. |
| blocked\notes.html:title | pass | /private/tmp/geo-ticket013-spec-probe/public/blocked\notes.html: Example Journal — fictional toolkit fixture | Provide one descriptive title. |
| blocked\notes.html:description | pass | /private/tmp/geo-ticket013-spec-probe/public/blocked\notes.html: Fictional sample: save daily journal entries. | Provide a meaningful description. |
| blocked\notes.html:open-graph | pass | /private/tmp/geo-ticket013-spec-probe/public/blocked\notes.html: og:title and og:description presence | Supply truthful social metadata. |
| blocked\notes.html:heading | pass | /private/tmp/geo-ticket013-spec-probe/public/blocked\notes.html: 1 H1 elements | Use a descriptive page heading. |
| blocked\notes.html:readable-text | pass | /private/tmp/geo-ticket013-spec-probe/public/blocked\notes.html: 124 non-script text characters in HTML | Include public content in the exported HTML. CSS visibility is not evaluated. |
| blocked\notes.html:index-directive | pass | /private/tmp/geo-ticket013-spec-probe/public/blocked\notes.html: no restrictive HTML meta directive observed | Remove noindex only if this page is intended for indexing. HTTP headers are unmeasured. |
| blocked\notes.html:canonical | pass | /private/tmp/geo-ticket013-spec-probe/public/blocked\notes.html: https://example.com/blocked%5Cnotes.html | Provide one absolute canonical URL on the configured origin. |
| blocked\notes.html:sitemap-coverage | pass | /private/tmp/geo-ticket013-spec-probe/public/blocked\notes.html: https://example.com/blocked%5Cnotes.html in /private/tmp/geo-ticket013-spec-probe/public/sitemap.xml | Add the intended canonical URL to the direct sitemap. |
| blocked\notes.html:crawler.Googlebot | fail | /private/tmp/geo-ticket013-spec-probe/public/robots.txt: Googlebot at inferred export URL https://example.com/blocked%5Cnotes.html; allowed=false; deployment routes unverified | Review search access separately from training permissions. |
| blocked\notes.html:crawler.OAI-SearchBot | fail | /private/tmp/geo-ticket013-spec-probe/public/robots.txt: OAI-SearchBot at inferred export URL https://example.com/blocked%5Cnotes.html; allowed=false; deployment routes unverified | Review search access separately from training permissions. |
| blocked\notes.html:training.GPTBot | pass | /private/tmp/geo-ticket013-spec-probe/public/robots.txt: training policy allowed=false; informational only | Preserve the owner's training policy; it is not a search eligibility check. |
| blocked\notes.html:training.Google-Extended | pass | /private/tmp/geo-ticket013-spec-probe/public/robots.txt: training policy allowed=false; informational only | Preserve the owner's training policy; it is not a search eligibility check. |
| blocked\notes.html:jsonld-syntax.1 | pass | /private/tmp/geo-ticket013-spec-probe/public/blocked\notes.html: JSON-LD parses as an object or array | Review structured-data semantics separately. |
| index.html:title | pass | /private/tmp/geo-ticket013-spec-probe/public/index.html: Example Journal — fictional toolkit fixture | Provide one descriptive title. |
| index.html:description | pass | /private/tmp/geo-ticket013-spec-probe/public/index.html: Fictional sample: save daily journal entries. | Provide a meaningful description. |
| index.html:open-graph | pass | /private/tmp/geo-ticket013-spec-probe/public/index.html: og:title and og:description presence | Supply truthful social metadata. |
| index.html:heading | pass | /private/tmp/geo-ticket013-spec-probe/public/index.html: 1 H1 elements | Use a descriptive page heading. |
| index.html:readable-text | pass | /private/tmp/geo-ticket013-spec-probe/public/index.html: 124 non-script text characters in HTML | Include public content in the exported HTML. CSS visibility is not evaluated. |
| index.html:index-directive | pass | /private/tmp/geo-ticket013-spec-probe/public/index.html: no restrictive HTML meta directive observed | Remove noindex only if this page is intended for indexing. HTTP headers are unmeasured. |
| index.html:canonical | pass | /private/tmp/geo-ticket013-spec-probe/public/index.html: https://example.com/ | Provide one absolute canonical URL on the configured origin. |
| index.html:sitemap-coverage | pass | /private/tmp/geo-ticket013-spec-probe/public/index.html: https://example.com/ in /private/tmp/geo-ticket013-spec-probe/public/sitemap.xml | Add the intended canonical URL to the direct sitemap. |
| index.html:crawler.Googlebot | pass | /private/tmp/geo-ticket013-spec-probe/public/robots.txt: Googlebot at inferred export URL https://example.com/; allowed=true; deployment routes unverified | Review search access separately from training permissions. |
| index.html:crawler.OAI-SearchBot | pass | /private/tmp/geo-ticket013-spec-probe/public/robots.txt: OAI-SearchBot at inferred export URL https://example.com/; allowed=true; deployment routes unverified | Review search access separately from training permissions. |
| index.html:training.GPTBot | pass | /private/tmp/geo-ticket013-spec-probe/public/robots.txt: training policy allowed=true; informational only | Preserve the owner's training policy; it is not a search eligibility check. |
| index.html:training.Google-Extended | pass | /private/tmp/geo-ticket013-spec-probe/public/robots.txt: training policy allowed=true; informational only | Preserve the owner's training policy; it is not a search eligibility check. |
| index.html:jsonld-syntax.1 | pass | /private/tmp/geo-ticket013-spec-probe/public/index.html: JSON-LD parses as an object or array | Review structured-data semantics separately. |
| schema-semantics | unknown | JSON parsing does not establish Schema.org validity or rich-result eligibility. | Use the applicable schema and search validation tools. |
| live-indexing | unknown | Only local HTML/crawler files were read. HTTP status, headers, WAF, JavaScript rendering, indexing, rankings, and citations were not measured. | Inspect deployment and supported search tools separately. |
| llms-txt | pass | Optional llms.txt absent; no readiness penalty. | Treat as an optional experiment. |

## Details

```json
{
  "config": "/private/tmp/geo-ticket013-spec-probe/.geo/config.yaml",
  "files": [
    "/private/tmp/geo-ticket013-spec-probe/public/blocked\\notes.html",
    "/private/tmp/geo-ticket013-spec-probe/public/index.html"
  ],
  "sitemap": {
    "entries": 2,
    "uniqueUrls": 2,
    "duplicateEntries": 0,
    "duplicates": []
  }
}
```
