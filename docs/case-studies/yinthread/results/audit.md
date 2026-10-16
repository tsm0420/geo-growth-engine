# audit report

User-supplied product artifacts.

Generated: 2026-10-16T20:09:29.755Z

local export: /workspace/geo/docs/case-studies/yinthread/public; no network requests or browser execution

Pass: 16; fail: 0; unknown: 2.

| Check | Status | Evidence | Next action |
| --- | --- | --- | --- |
| robots-file | pass | /workspace/geo/docs/case-studies/yinthread/public/robots.txt | Review intentional access policy. |
| sitemap | pass | /workspace/geo/docs/case-studies/yinthread/public/sitemap.xml: 146 locations; direct urlset required | Supply a direct sitemap urlset for this export; sitemap indexes are not expanded. |
| index.html:title | pass | /workspace/geo/docs/case-studies/yinthread/public/index.html: Yinthread — compatibility from classical Chinese astrology | Provide one descriptive title. |
| index.html:description | pass | /workspace/geo/docs/case-studies/yinthread/public/index.html: Real compatibility, rooted in 400-year-old Chinese astrology — not just your zodiac sign. | Provide a meaningful description. |
| index.html:open-graph | pass | /workspace/geo/docs/case-studies/yinthread/public/index.html: og:title and og:description presence | Supply truthful social metadata. |
| index.html:heading | pass | /workspace/geo/docs/case-studies/yinthread/public/index.html: 1 H1 elements | Use a descriptive page heading. |
| index.html:readable-text | pass | /workspace/geo/docs/case-studies/yinthread/public/index.html: 931 non-script text characters in HTML | Include public content in the exported HTML. CSS visibility is not evaluated. |
| index.html:index-directive | pass | /workspace/geo/docs/case-studies/yinthread/public/index.html: no restrictive HTML meta directive observed | Remove noindex only if this page is intended for indexing. HTTP headers are unmeasured. |
| index.html:canonical | pass | /workspace/geo/docs/case-studies/yinthread/public/index.html: https://yinthread.com | Provide one absolute canonical URL on the configured origin. |
| index.html:sitemap-coverage | pass | /workspace/geo/docs/case-studies/yinthread/public/index.html: https://yinthread.com/ in /workspace/geo/docs/case-studies/yinthread/public/sitemap.xml | Add the intended canonical URL to the direct sitemap. |
| index.html:crawler.Googlebot | pass | /workspace/geo/docs/case-studies/yinthread/public/robots.txt: Googlebot at inferred export URL https://yinthread.com/; allowed=true; deployment routes unverified | Review search access separately from training permissions. |
| index.html:crawler.OAI-SearchBot | pass | /workspace/geo/docs/case-studies/yinthread/public/robots.txt: OAI-SearchBot at inferred export URL https://yinthread.com/; allowed=true; deployment routes unverified | Review search access separately from training permissions. |
| index.html:training.GPTBot | pass | /workspace/geo/docs/case-studies/yinthread/public/robots.txt: training policy allowed=true; informational only | Preserve the owner's training policy; it is not a search eligibility check. |
| index.html:training.Google-Extended | pass | /workspace/geo/docs/case-studies/yinthread/public/robots.txt: training policy allowed=true; informational only | Preserve the owner's training policy; it is not a search eligibility check. |
| index.html:jsonld-syntax.1 | pass | /workspace/geo/docs/case-studies/yinthread/public/index.html: JSON-LD parses as an object or array | Review structured-data semantics separately. |
| schema-semantics | unknown | JSON parsing does not establish Schema.org validity or rich-result eligibility. | Use the applicable schema and search validation tools. |
| live-indexing | unknown | Only local HTML/crawler files were read. HTTP status, headers, WAF, JavaScript rendering, indexing, rankings, and citations were not measured. | Inspect deployment and supported search tools separately. |
| llms-txt | pass | Optional llms.txt absent; no readiness penalty. | Treat as an optional experiment. |

## Details

```json
{
  "config": "/workspace/geo/docs/case-studies/yinthread/config/config.yaml",
  "files": [
    "/workspace/geo/docs/case-studies/yinthread/public/index.html"
  ]
}
```
