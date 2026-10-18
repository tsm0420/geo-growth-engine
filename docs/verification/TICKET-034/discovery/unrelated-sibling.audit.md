# audit report

**FICTIONAL EXAMPLE — not a product measurement.**

Generated: 2026-10-18T14:21:40.625Z

local export: /private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo033-sitemap-discovery-4qspzywm/fixture/public; no network requests or browser execution

Pass: 15; fail: 1; unknown: 3.

| Check | Status | Evidence | Next action |
| --- | --- | --- | --- |
| robots-file | pass | /private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo033-sitemap-discovery-4qspzywm/fixture/public/robots.txt | Review intentional access policy. |
| sitemap | fail | /private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo033-sitemap-discovery-4qspzywm/fixture/public/sitemap.xml: 2 locations; direct urlset required | Supply a direct sitemap urlset for this export; sitemap indexes are not expanded. |
| sitemap-duplicates | unknown | /private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo033-sitemap-discovery-4qspzywm/fixture/public/sitemap.xml: duplicate URLs unmeasured without a supported sitemap | Provide a valid direct urlset on the configured origin, then rerun. |
| index.html:title | pass | /private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo033-sitemap-discovery-4qspzywm/fixture/public/index.html: Example Journal — fictional toolkit fixture | Provide one descriptive title. |
| index.html:description | pass | /private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo033-sitemap-discovery-4qspzywm/fixture/public/index.html: Fictional sample: save daily journal entries. | Provide a meaningful description. |
| index.html:open-graph | pass | /private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo033-sitemap-discovery-4qspzywm/fixture/public/index.html: og:title and og:description presence | Supply truthful social metadata. |
| index.html:heading | pass | /private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo033-sitemap-discovery-4qspzywm/fixture/public/index.html: 1 H1 elements | Use a descriptive page heading. |
| index.html:readable-text | pass | /private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo033-sitemap-discovery-4qspzywm/fixture/public/index.html: 124 non-script text characters in HTML | Include public content in the exported HTML. CSS visibility is not evaluated. |
| index.html:index-directive | pass | /private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo033-sitemap-discovery-4qspzywm/fixture/public/index.html: no restrictive HTML meta directive observed | Remove noindex only if this page is intended for indexing. HTTP headers are unmeasured. |
| index.html:canonical | pass | /private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo033-sitemap-discovery-4qspzywm/fixture/public/index.html: https://example.com/ | Provide one absolute canonical URL on the configured origin. |
| index.html:sitemap-coverage | pass | /private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo033-sitemap-discovery-4qspzywm/fixture/public/index.html: https://example.com/ in /private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo033-sitemap-discovery-4qspzywm/fixture/public/sitemap.xml | Add the intended canonical URL to the direct sitemap. |
| index.html:crawler.Googlebot | pass | /private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo033-sitemap-discovery-4qspzywm/fixture/public/robots.txt: Googlebot at inferred export URL https://example.com/; allowed=true; deployment routes unverified | Review search access separately from training permissions. |
| index.html:crawler.OAI-SearchBot | pass | /private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo033-sitemap-discovery-4qspzywm/fixture/public/robots.txt: OAI-SearchBot at inferred export URL https://example.com/; allowed=true; deployment routes unverified | Review search access separately from training permissions. |
| index.html:training.GPTBot | pass | /private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo033-sitemap-discovery-4qspzywm/fixture/public/robots.txt: training policy allowed=false; informational only | Preserve the owner's training policy; it is not a search eligibility check. |
| index.html:training.Google-Extended | pass | /private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo033-sitemap-discovery-4qspzywm/fixture/public/robots.txt: training policy allowed=false; informational only | Preserve the owner's training policy; it is not a search eligibility check. |
| index.html:jsonld-syntax.1 | pass | /private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo033-sitemap-discovery-4qspzywm/fixture/public/index.html: JSON-LD parses as an object or array | Review structured-data semantics separately. |
| schema-semantics | unknown | JSON parsing does not establish Schema.org validity or rich-result eligibility. | Use the applicable schema and search validation tools. |
| live-indexing | unknown | Only local HTML/crawler files were read. HTTP status, headers, WAF, JavaScript rendering, indexing, rankings, and citations were not measured. | Inspect deployment and supported search tools separately. |
| llms-txt | pass | Optional llms.txt absent; no readiness penalty. | Treat as an optional experiment. |

## Details

```json
{
  "config": "/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo033-sitemap-discovery-4qspzywm/fixture/.geo/config.yaml",
  "files": [
    "/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo033-sitemap-discovery-4qspzywm/fixture/public/index.html"
  ],
  "sitemap": null
}
```
