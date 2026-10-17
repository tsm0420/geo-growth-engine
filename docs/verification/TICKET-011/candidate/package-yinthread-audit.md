# audit report

User-supplied product artifacts.

Generated: 2026-10-17T14:31:18.235Z

local export: /private/tmp/geo-core-clean-bq4p792i/source/docs/case-studies/yinthread/public; no network requests or browser execution

Pass: 16; fail: 1; unknown: 2.

| Check | Status | Evidence | Next action |
| --- | --- | --- | --- |
| robots-file | pass | /private/tmp/geo-core-clean-bq4p792i/source/docs/case-studies/yinthread/public/robots.txt | Review intentional access policy. |
| sitemap | pass | /private/tmp/geo-core-clean-bq4p792i/source/docs/case-studies/yinthread/public/sitemap.xml: 146 locations; direct urlset required | Supply a direct sitemap urlset for this export; sitemap indexes are not expanded. |
| sitemap-duplicates | fail | /private/tmp/geo-core-clean-bq4p792i/source/docs/case-studies/yinthread/public/sitemap.xml: 146 entries; 145 unique URLs; 1 duplicate entries; https://yinthread.com/learn/day-master occurs 2 times at positions 8, 12 | Retain one intended canonical entry per URL and rebuild the export. |
| index.html:title | pass | /private/tmp/geo-core-clean-bq4p792i/source/docs/case-studies/yinthread/public/index.html: Yinthread — compatibility from classical Chinese astrology | Provide one descriptive title. |
| index.html:description | pass | /private/tmp/geo-core-clean-bq4p792i/source/docs/case-studies/yinthread/public/index.html: Real compatibility, rooted in 400-year-old Chinese astrology — not just your zodiac sign. | Provide a meaningful description. |
| index.html:open-graph | pass | /private/tmp/geo-core-clean-bq4p792i/source/docs/case-studies/yinthread/public/index.html: og:title and og:description presence | Supply truthful social metadata. |
| index.html:heading | pass | /private/tmp/geo-core-clean-bq4p792i/source/docs/case-studies/yinthread/public/index.html: 1 H1 elements | Use a descriptive page heading. |
| index.html:readable-text | pass | /private/tmp/geo-core-clean-bq4p792i/source/docs/case-studies/yinthread/public/index.html: 931 non-script text characters in HTML | Include public content in the exported HTML. CSS visibility is not evaluated. |
| index.html:index-directive | pass | /private/tmp/geo-core-clean-bq4p792i/source/docs/case-studies/yinthread/public/index.html: no restrictive HTML meta directive observed | Remove noindex only if this page is intended for indexing. HTTP headers are unmeasured. |
| index.html:canonical | pass | /private/tmp/geo-core-clean-bq4p792i/source/docs/case-studies/yinthread/public/index.html: https://yinthread.com | Provide one absolute canonical URL on the configured origin. |
| index.html:sitemap-coverage | pass | /private/tmp/geo-core-clean-bq4p792i/source/docs/case-studies/yinthread/public/index.html: https://yinthread.com/ in /private/tmp/geo-core-clean-bq4p792i/source/docs/case-studies/yinthread/public/sitemap.xml | Add the intended canonical URL to the direct sitemap. |
| index.html:crawler.Googlebot | pass | /private/tmp/geo-core-clean-bq4p792i/source/docs/case-studies/yinthread/public/robots.txt: Googlebot at inferred export URL https://yinthread.com/; allowed=true; deployment routes unverified | Review search access separately from training permissions. |
| index.html:crawler.OAI-SearchBot | pass | /private/tmp/geo-core-clean-bq4p792i/source/docs/case-studies/yinthread/public/robots.txt: OAI-SearchBot at inferred export URL https://yinthread.com/; allowed=true; deployment routes unverified | Review search access separately from training permissions. |
| index.html:training.GPTBot | pass | /private/tmp/geo-core-clean-bq4p792i/source/docs/case-studies/yinthread/public/robots.txt: training policy allowed=true; informational only | Preserve the owner's training policy; it is not a search eligibility check. |
| index.html:training.Google-Extended | pass | /private/tmp/geo-core-clean-bq4p792i/source/docs/case-studies/yinthread/public/robots.txt: training policy allowed=true; informational only | Preserve the owner's training policy; it is not a search eligibility check. |
| index.html:jsonld-syntax.1 | pass | /private/tmp/geo-core-clean-bq4p792i/source/docs/case-studies/yinthread/public/index.html: JSON-LD parses as an object or array | Review structured-data semantics separately. |
| schema-semantics | unknown | JSON parsing does not establish Schema.org validity or rich-result eligibility. | Use the applicable schema and search validation tools. |
| live-indexing | unknown | Only local HTML/crawler files were read. HTTP status, headers, WAF, JavaScript rendering, indexing, rankings, and citations were not measured. | Inspect deployment and supported search tools separately. |
| llms-txt | pass | Optional llms.txt absent; no readiness penalty. | Treat as an optional experiment. |

## Details

```json
{
  "config": "/private/tmp/geo-core-clean-bq4p792i/source/docs/case-studies/yinthread/config/config.yaml",
  "files": [
    "/private/tmp/geo-core-clean-bq4p792i/source/docs/case-studies/yinthread/public/index.html"
  ],
  "sitemap": {
    "entries": 146,
    "uniqueUrls": 145,
    "duplicateEntries": 1,
    "duplicates": [
      {
        "url": "https://yinthread.com/learn/day-master",
        "occurrences": 2,
        "positions": [
          8,
          12
        ]
      }
    ]
  }
}
```
