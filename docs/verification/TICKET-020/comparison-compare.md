# compare report

User-supplied product artifacts.

Generated: 2026-10-18T11:03:22.902Z

Local audit findings: /private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/before/audit.json -&gt; /private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/after/audit.json; exact IDs and text; no network requests

Pass: 17; fail: 0; unknown: 3.

| Check | Status | Evidence | Next action |
| --- | --- | --- | --- |
| finding:index.html:canonical | pass | unchanged; before: pass; evidence=/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/index.html: https://yinthread.com; action=Provide one absolute canonical URL on the configured origin.; after: pass; evidence=/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/index.html: https://yinthread.com; action=Provide one absolute canonical URL on the configured origin. | Inspect both original observations and the later action before choosing a fix. |
| finding:index.html:crawler.Googlebot | pass | unchanged; before: pass; evidence=/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/robots.txt: Googlebot at inferred export URL https://yinthread.com/; allowed=true; deployment routes unverified; action=Review search access separately from training permissions.; after: pass; evidence=/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/robots.txt: Googlebot at inferred export URL https://yinthread.com/; allowed=true; deployment routes unverified; action=Review search access separately from training permissions. | Inspect both original observations and the later action before choosing a fix. |
| finding:index.html:crawler.OAI-SearchBot | pass | unchanged; before: pass; evidence=/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/robots.txt: OAI-SearchBot at inferred export URL https://yinthread.com/; allowed=true; deployment routes unverified; action=Review search access separately from training permissions.; after: pass; evidence=/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/robots.txt: OAI-SearchBot at inferred export URL https://yinthread.com/; allowed=true; deployment routes unverified; action=Review search access separately from training permissions. | Inspect both original observations and the later action before choosing a fix. |
| finding:index.html:description | pass | unchanged; before: pass; evidence=/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/index.html: Real compatibility, rooted in 400-year-old Chinese astrology — not just your zodiac sign.; action=Provide a meaningful description.; after: pass; evidence=/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/index.html: Real compatibility, rooted in 400-year-old Chinese astrology — not just your zodiac sign.; action=Provide a meaningful description. | Inspect both original observations and the later action before choosing a fix. |
| finding:index.html:heading | pass | unchanged; before: pass; evidence=/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/index.html: 1 H1 elements; action=Use a descriptive page heading.; after: pass; evidence=/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/index.html: 1 H1 elements; action=Use a descriptive page heading. | Inspect both original observations and the later action before choosing a fix. |
| finding:index.html:index-directive | pass | unchanged; before: pass; evidence=/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/index.html: no restrictive HTML meta directive observed; action=Remove noindex only if this page is intended for indexing. HTTP headers are unmeasured.; after: pass; evidence=/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/index.html: no restrictive HTML meta directive observed; action=Remove noindex only if this page is intended for indexing. HTTP headers are unmeasured. | Inspect both original observations and the later action before choosing a fix. |
| finding:index.html:jsonld-syntax.1 | pass | unchanged; before: pass; evidence=/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/index.html: JSON-LD parses as an object or array; action=Review structured-data semantics separately.; after: pass; evidence=/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/index.html: JSON-LD parses as an object or array; action=Review structured-data semantics separately. | Inspect both original observations and the later action before choosing a fix. |
| finding:index.html:open-graph | pass | unchanged; before: pass; evidence=/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/index.html: og:title and og:description presence; action=Supply truthful social metadata.; after: pass; evidence=/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/index.html: og:title and og:description presence; action=Supply truthful social metadata. | Inspect both original observations and the later action before choosing a fix. |
| finding:index.html:readable-text | pass | unchanged; before: pass; evidence=/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/index.html: 931 non-script text characters in HTML; action=Include public content in the exported HTML. CSS visibility is not evaluated.; after: pass; evidence=/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/index.html: 931 non-script text characters in HTML; action=Include public content in the exported HTML. CSS visibility is not evaluated. | Inspect both original observations and the later action before choosing a fix. |
| finding:index.html:sitemap-coverage | pass | unchanged; before: pass; evidence=/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/index.html: https://yinthread.com/ in /private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/sitemap.xml; action=Add the intended canonical URL to the direct sitemap.; after: pass; evidence=/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/index.html: https://yinthread.com/ in /private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/sitemap.xml; action=Add the intended canonical URL to the direct sitemap. | Inspect both original observations and the later action before choosing a fix. |
| finding:index.html:title | pass | unchanged; before: pass; evidence=/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/index.html: Yinthread — compatibility from classical Chinese astrology; action=Provide one descriptive title.; after: pass; evidence=/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/index.html: Yinthread — compatibility from classical Chinese astrology; action=Provide one descriptive title. | Inspect both original observations and the later action before choosing a fix. |
| finding:index.html:training.GPTBot | pass | unchanged; before: pass; evidence=/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/robots.txt: training policy allowed=true; informational only; action=Preserve the owner's training policy; it is not a search eligibility check.; after: pass; evidence=/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/robots.txt: training policy allowed=true; informational only; action=Preserve the owner's training policy; it is not a search eligibility check. | Inspect both original observations and the later action before choosing a fix. |
| finding:index.html:training.Google-Extended | pass | unchanged; before: pass; evidence=/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/robots.txt: training policy allowed=true; informational only; action=Preserve the owner's training policy; it is not a search eligibility check.; after: pass; evidence=/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/robots.txt: training policy allowed=true; informational only; action=Preserve the owner's training policy; it is not a search eligibility check. | Inspect both original observations and the later action before choosing a fix. |
| finding:live-indexing | unknown | unchanged; before: unknown; evidence=Only local HTML/crawler files were read. HTTP status, headers, WAF, JavaScript rendering, indexing, rankings, and citations were not measured.; action=Inspect deployment and supported search tools separately.; after: unknown; evidence=Only local HTML/crawler files were read. HTTP status, headers, WAF, JavaScript rendering, indexing, rankings, and citations were not measured.; action=Inspect deployment and supported search tools separately. | Inspect both original observations and the later action before choosing a fix. |
| finding:llms-txt | pass | unchanged; before: pass; evidence=Optional llms.txt absent; no readiness penalty.; action=Treat as an optional experiment.; after: pass; evidence=Optional llms.txt absent; no readiness penalty.; action=Treat as an optional experiment. | Inspect both original observations and the later action before choosing a fix. |
| finding:robots-file | pass | unchanged; before: pass; evidence=/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/robots.txt; action=Review intentional access policy.; after: pass; evidence=/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/robots.txt; action=Review intentional access policy. | Inspect both original observations and the later action before choosing a fix. |
| finding:schema-semantics | unknown | unchanged; before: unknown; evidence=JSON parsing does not establish Schema.org validity or rich-result eligibility.; action=Use the applicable schema and search validation tools.; after: unknown; evidence=JSON parsing does not establish Schema.org validity or rich-result eligibility.; action=Use the applicable schema and search validation tools. | Inspect both original observations and the later action before choosing a fix. |
| finding:sitemap | pass | details-changed; before: pass; evidence=/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/sitemap.xml: 146 locations; direct urlset required; action=Supply a direct sitemap urlset for this export; sitemap indexes are not expanded.; after: pass; evidence=/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/sitemap.xml: 145 locations; direct urlset required; action=Supply a direct sitemap urlset for this export; sitemap indexes are not expanded. | Inspect both original observations and the later action before choosing a fix. |
| finding:sitemap-duplicates | pass | status-changed; before: fail; evidence=/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/sitemap.xml: 146 entries; 145 unique URLs; 1 duplicate entries; https://yinthread.com/learn/day-master occurs 2 times at positions 8, 12; action=Retain one intended canonical entry per URL and rebuild the export.; after: pass; evidence=/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/sitemap.xml: 145 entries; 145 unique URLs; 0 duplicate entries; action=Retain one intended canonical entry per URL and rebuild the export. | Inspect both original observations and the later action before choosing a fix. |
| comparison-scope | unknown | Structural finding comparison only. Product identity, collection conditions and growth attribution are unverified. | Inspect both source scopes, input data and collection conditions. Removed findings are unknown; literal differences do not establish improvement. |

## Details

```json
{
  "before": {
    "path": "/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/before/audit.json",
    "sha256": "82af587695d0d8f392a4d89fbddf7a9aa9439b7713e9f28d95c3cf937cb86852",
    "report": {
      "schemaVersion": 1,
      "kind": "audit",
      "generatedAt": "2026-10-18T11:03:22.619Z",
      "example": false,
      "scope": "local export: /private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public; no network requests or browser execution",
      "findings": [
        {
          "id": "robots-file",
          "status": "pass",
          "evidence": "/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/robots.txt",
          "action": "Review intentional access policy."
        },
        {
          "id": "sitemap",
          "status": "pass",
          "evidence": "/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/sitemap.xml: 146 locations; direct urlset required",
          "action": "Supply a direct sitemap urlset for this export; sitemap indexes are not expanded."
        },
        {
          "id": "sitemap-duplicates",
          "status": "fail",
          "evidence": "/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/sitemap.xml: 146 entries; 145 unique URLs; 1 duplicate entries; https://yinthread.com/learn/day-master occurs 2 times at positions 8, 12",
          "action": "Retain one intended canonical entry per URL and rebuild the export."
        },
        {
          "id": "index.html:title",
          "status": "pass",
          "evidence": "/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/index.html: Yinthread — compatibility from classical Chinese astrology",
          "action": "Provide one descriptive title."
        },
        {
          "id": "index.html:description",
          "status": "pass",
          "evidence": "/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/index.html: Real compatibility, rooted in 400-year-old Chinese astrology — not just your zodiac sign.",
          "action": "Provide a meaningful description."
        },
        {
          "id": "index.html:open-graph",
          "status": "pass",
          "evidence": "/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/index.html: og:title and og:description presence",
          "action": "Supply truthful social metadata."
        },
        {
          "id": "index.html:heading",
          "status": "pass",
          "evidence": "/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/index.html: 1 H1 elements",
          "action": "Use a descriptive page heading."
        },
        {
          "id": "index.html:readable-text",
          "status": "pass",
          "evidence": "/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/index.html: 931 non-script text characters in HTML",
          "action": "Include public content in the exported HTML. CSS visibility is not evaluated."
        },
        {
          "id": "index.html:index-directive",
          "status": "pass",
          "evidence": "/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/index.html: no restrictive HTML meta directive observed",
          "action": "Remove noindex only if this page is intended for indexing. HTTP headers are unmeasured."
        },
        {
          "id": "index.html:canonical",
          "status": "pass",
          "evidence": "/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/index.html: https://yinthread.com",
          "action": "Provide one absolute canonical URL on the configured origin."
        },
        {
          "id": "index.html:sitemap-coverage",
          "status": "pass",
          "evidence": "/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/index.html: https://yinthread.com/ in /private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/sitemap.xml",
          "action": "Add the intended canonical URL to the direct sitemap."
        },
        {
          "id": "index.html:crawler.Googlebot",
          "status": "pass",
          "evidence": "/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/robots.txt: Googlebot at inferred export URL https://yinthread.com/; allowed=true; deployment routes unverified",
          "action": "Review search access separately from training permissions."
        },
        {
          "id": "index.html:crawler.OAI-SearchBot",
          "status": "pass",
          "evidence": "/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/robots.txt: OAI-SearchBot at inferred export URL https://yinthread.com/; allowed=true; deployment routes unverified",
          "action": "Review search access separately from training permissions."
        },
        {
          "id": "index.html:training.GPTBot",
          "status": "pass",
          "evidence": "/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/robots.txt: training policy allowed=true; informational only",
          "action": "Preserve the owner's training policy; it is not a search eligibility check."
        },
        {
          "id": "index.html:training.Google-Extended",
          "status": "pass",
          "evidence": "/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/robots.txt: training policy allowed=true; informational only",
          "action": "Preserve the owner's training policy; it is not a search eligibility check."
        },
        {
          "id": "index.html:jsonld-syntax.1",
          "status": "pass",
          "evidence": "/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/index.html: JSON-LD parses as an object or array",
          "action": "Review structured-data semantics separately."
        },
        {
          "id": "schema-semantics",
          "status": "unknown",
          "evidence": "JSON parsing does not establish Schema.org validity or rich-result eligibility.",
          "action": "Use the applicable schema and search validation tools."
        },
        {
          "id": "live-indexing",
          "status": "unknown",
          "evidence": "Only local HTML/crawler files were read. HTTP status, headers, WAF, JavaScript rendering, indexing, rankings, and citations were not measured.",
          "action": "Inspect deployment and supported search tools separately."
        },
        {
          "id": "llms-txt",
          "status": "pass",
          "evidence": "Optional llms.txt absent; no readiness penalty.",
          "action": "Treat as an optional experiment."
        }
      ],
      "summary": {
        "pass": 16,
        "fail": 1,
        "unknown": 2
      },
      "data": {
        "config": "/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/config/config.yaml",
        "files": [
          "/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/index.html"
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
    }
  },
  "after": {
    "path": "/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/after/audit.json",
    "sha256": "8b8e42237c42c03c50d19301464db0720bcfc6a19dc9a5e35ede299174479bf3",
    "report": {
      "schemaVersion": 1,
      "kind": "audit",
      "generatedAt": "2026-10-18T11:03:22.778Z",
      "example": false,
      "scope": "local export: /private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public; no network requests or browser execution",
      "findings": [
        {
          "id": "robots-file",
          "status": "pass",
          "evidence": "/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/robots.txt",
          "action": "Review intentional access policy."
        },
        {
          "id": "sitemap",
          "status": "pass",
          "evidence": "/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/sitemap.xml: 145 locations; direct urlset required",
          "action": "Supply a direct sitemap urlset for this export; sitemap indexes are not expanded."
        },
        {
          "id": "sitemap-duplicates",
          "status": "pass",
          "evidence": "/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/sitemap.xml: 145 entries; 145 unique URLs; 0 duplicate entries",
          "action": "Retain one intended canonical entry per URL and rebuild the export."
        },
        {
          "id": "index.html:title",
          "status": "pass",
          "evidence": "/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/index.html: Yinthread — compatibility from classical Chinese astrology",
          "action": "Provide one descriptive title."
        },
        {
          "id": "index.html:description",
          "status": "pass",
          "evidence": "/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/index.html: Real compatibility, rooted in 400-year-old Chinese astrology — not just your zodiac sign.",
          "action": "Provide a meaningful description."
        },
        {
          "id": "index.html:open-graph",
          "status": "pass",
          "evidence": "/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/index.html: og:title and og:description presence",
          "action": "Supply truthful social metadata."
        },
        {
          "id": "index.html:heading",
          "status": "pass",
          "evidence": "/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/index.html: 1 H1 elements",
          "action": "Use a descriptive page heading."
        },
        {
          "id": "index.html:readable-text",
          "status": "pass",
          "evidence": "/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/index.html: 931 non-script text characters in HTML",
          "action": "Include public content in the exported HTML. CSS visibility is not evaluated."
        },
        {
          "id": "index.html:index-directive",
          "status": "pass",
          "evidence": "/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/index.html: no restrictive HTML meta directive observed",
          "action": "Remove noindex only if this page is intended for indexing. HTTP headers are unmeasured."
        },
        {
          "id": "index.html:canonical",
          "status": "pass",
          "evidence": "/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/index.html: https://yinthread.com",
          "action": "Provide one absolute canonical URL on the configured origin."
        },
        {
          "id": "index.html:sitemap-coverage",
          "status": "pass",
          "evidence": "/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/index.html: https://yinthread.com/ in /private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/sitemap.xml",
          "action": "Add the intended canonical URL to the direct sitemap."
        },
        {
          "id": "index.html:crawler.Googlebot",
          "status": "pass",
          "evidence": "/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/robots.txt: Googlebot at inferred export URL https://yinthread.com/; allowed=true; deployment routes unverified",
          "action": "Review search access separately from training permissions."
        },
        {
          "id": "index.html:crawler.OAI-SearchBot",
          "status": "pass",
          "evidence": "/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/robots.txt: OAI-SearchBot at inferred export URL https://yinthread.com/; allowed=true; deployment routes unverified",
          "action": "Review search access separately from training permissions."
        },
        {
          "id": "index.html:training.GPTBot",
          "status": "pass",
          "evidence": "/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/robots.txt: training policy allowed=true; informational only",
          "action": "Preserve the owner's training policy; it is not a search eligibility check."
        },
        {
          "id": "index.html:training.Google-Extended",
          "status": "pass",
          "evidence": "/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/robots.txt: training policy allowed=true; informational only",
          "action": "Preserve the owner's training policy; it is not a search eligibility check."
        },
        {
          "id": "index.html:jsonld-syntax.1",
          "status": "pass",
          "evidence": "/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/index.html: JSON-LD parses as an object or array",
          "action": "Review structured-data semantics separately."
        },
        {
          "id": "schema-semantics",
          "status": "unknown",
          "evidence": "JSON parsing does not establish Schema.org validity or rich-result eligibility.",
          "action": "Use the applicable schema and search validation tools."
        },
        {
          "id": "live-indexing",
          "status": "unknown",
          "evidence": "Only local HTML/crawler files were read. HTTP status, headers, WAF, JavaScript rendering, indexing, rankings, and citations were not measured.",
          "action": "Inspect deployment and supported search tools separately."
        },
        {
          "id": "llms-txt",
          "status": "pass",
          "evidence": "Optional llms.txt absent; no readiness penalty.",
          "action": "Treat as an optional experiment."
        }
      ],
      "summary": {
        "pass": 17,
        "fail": 0,
        "unknown": 2
      },
      "data": {
        "config": "/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/config/config.yaml",
        "files": [
          "/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/index.html"
        ],
        "sitemap": {
          "entries": 145,
          "uniqueUrls": 145,
          "duplicateEntries": 0,
          "duplicates": []
        }
      }
    }
  },
  "changes": [
    {
      "id": "index.html:canonical",
      "change": "unchanged",
      "before": {
        "id": "index.html:canonical",
        "status": "pass",
        "evidence": "/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/index.html: https://yinthread.com",
        "action": "Provide one absolute canonical URL on the configured origin."
      },
      "after": {
        "id": "index.html:canonical",
        "status": "pass",
        "evidence": "/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/index.html: https://yinthread.com",
        "action": "Provide one absolute canonical URL on the configured origin."
      }
    },
    {
      "id": "index.html:crawler.Googlebot",
      "change": "unchanged",
      "before": {
        "id": "index.html:crawler.Googlebot",
        "status": "pass",
        "evidence": "/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/robots.txt: Googlebot at inferred export URL https://yinthread.com/; allowed=true; deployment routes unverified",
        "action": "Review search access separately from training permissions."
      },
      "after": {
        "id": "index.html:crawler.Googlebot",
        "status": "pass",
        "evidence": "/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/robots.txt: Googlebot at inferred export URL https://yinthread.com/; allowed=true; deployment routes unverified",
        "action": "Review search access separately from training permissions."
      }
    },
    {
      "id": "index.html:crawler.OAI-SearchBot",
      "change": "unchanged",
      "before": {
        "id": "index.html:crawler.OAI-SearchBot",
        "status": "pass",
        "evidence": "/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/robots.txt: OAI-SearchBot at inferred export URL https://yinthread.com/; allowed=true; deployment routes unverified",
        "action": "Review search access separately from training permissions."
      },
      "after": {
        "id": "index.html:crawler.OAI-SearchBot",
        "status": "pass",
        "evidence": "/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/robots.txt: OAI-SearchBot at inferred export URL https://yinthread.com/; allowed=true; deployment routes unverified",
        "action": "Review search access separately from training permissions."
      }
    },
    {
      "id": "index.html:description",
      "change": "unchanged",
      "before": {
        "id": "index.html:description",
        "status": "pass",
        "evidence": "/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/index.html: Real compatibility, rooted in 400-year-old Chinese astrology — not just your zodiac sign.",
        "action": "Provide a meaningful description."
      },
      "after": {
        "id": "index.html:description",
        "status": "pass",
        "evidence": "/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/index.html: Real compatibility, rooted in 400-year-old Chinese astrology — not just your zodiac sign.",
        "action": "Provide a meaningful description."
      }
    },
    {
      "id": "index.html:heading",
      "change": "unchanged",
      "before": {
        "id": "index.html:heading",
        "status": "pass",
        "evidence": "/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/index.html: 1 H1 elements",
        "action": "Use a descriptive page heading."
      },
      "after": {
        "id": "index.html:heading",
        "status": "pass",
        "evidence": "/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/index.html: 1 H1 elements",
        "action": "Use a descriptive page heading."
      }
    },
    {
      "id": "index.html:index-directive",
      "change": "unchanged",
      "before": {
        "id": "index.html:index-directive",
        "status": "pass",
        "evidence": "/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/index.html: no restrictive HTML meta directive observed",
        "action": "Remove noindex only if this page is intended for indexing. HTTP headers are unmeasured."
      },
      "after": {
        "id": "index.html:index-directive",
        "status": "pass",
        "evidence": "/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/index.html: no restrictive HTML meta directive observed",
        "action": "Remove noindex only if this page is intended for indexing. HTTP headers are unmeasured."
      }
    },
    {
      "id": "index.html:jsonld-syntax.1",
      "change": "unchanged",
      "before": {
        "id": "index.html:jsonld-syntax.1",
        "status": "pass",
        "evidence": "/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/index.html: JSON-LD parses as an object or array",
        "action": "Review structured-data semantics separately."
      },
      "after": {
        "id": "index.html:jsonld-syntax.1",
        "status": "pass",
        "evidence": "/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/index.html: JSON-LD parses as an object or array",
        "action": "Review structured-data semantics separately."
      }
    },
    {
      "id": "index.html:open-graph",
      "change": "unchanged",
      "before": {
        "id": "index.html:open-graph",
        "status": "pass",
        "evidence": "/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/index.html: og:title and og:description presence",
        "action": "Supply truthful social metadata."
      },
      "after": {
        "id": "index.html:open-graph",
        "status": "pass",
        "evidence": "/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/index.html: og:title and og:description presence",
        "action": "Supply truthful social metadata."
      }
    },
    {
      "id": "index.html:readable-text",
      "change": "unchanged",
      "before": {
        "id": "index.html:readable-text",
        "status": "pass",
        "evidence": "/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/index.html: 931 non-script text characters in HTML",
        "action": "Include public content in the exported HTML. CSS visibility is not evaluated."
      },
      "after": {
        "id": "index.html:readable-text",
        "status": "pass",
        "evidence": "/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/index.html: 931 non-script text characters in HTML",
        "action": "Include public content in the exported HTML. CSS visibility is not evaluated."
      }
    },
    {
      "id": "index.html:sitemap-coverage",
      "change": "unchanged",
      "before": {
        "id": "index.html:sitemap-coverage",
        "status": "pass",
        "evidence": "/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/index.html: https://yinthread.com/ in /private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/sitemap.xml",
        "action": "Add the intended canonical URL to the direct sitemap."
      },
      "after": {
        "id": "index.html:sitemap-coverage",
        "status": "pass",
        "evidence": "/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/index.html: https://yinthread.com/ in /private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/sitemap.xml",
        "action": "Add the intended canonical URL to the direct sitemap."
      }
    },
    {
      "id": "index.html:title",
      "change": "unchanged",
      "before": {
        "id": "index.html:title",
        "status": "pass",
        "evidence": "/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/index.html: Yinthread — compatibility from classical Chinese astrology",
        "action": "Provide one descriptive title."
      },
      "after": {
        "id": "index.html:title",
        "status": "pass",
        "evidence": "/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/index.html: Yinthread — compatibility from classical Chinese astrology",
        "action": "Provide one descriptive title."
      }
    },
    {
      "id": "index.html:training.GPTBot",
      "change": "unchanged",
      "before": {
        "id": "index.html:training.GPTBot",
        "status": "pass",
        "evidence": "/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/robots.txt: training policy allowed=true; informational only",
        "action": "Preserve the owner's training policy; it is not a search eligibility check."
      },
      "after": {
        "id": "index.html:training.GPTBot",
        "status": "pass",
        "evidence": "/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/robots.txt: training policy allowed=true; informational only",
        "action": "Preserve the owner's training policy; it is not a search eligibility check."
      }
    },
    {
      "id": "index.html:training.Google-Extended",
      "change": "unchanged",
      "before": {
        "id": "index.html:training.Google-Extended",
        "status": "pass",
        "evidence": "/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/robots.txt: training policy allowed=true; informational only",
        "action": "Preserve the owner's training policy; it is not a search eligibility check."
      },
      "after": {
        "id": "index.html:training.Google-Extended",
        "status": "pass",
        "evidence": "/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/robots.txt: training policy allowed=true; informational only",
        "action": "Preserve the owner's training policy; it is not a search eligibility check."
      }
    },
    {
      "id": "live-indexing",
      "change": "unchanged",
      "before": {
        "id": "live-indexing",
        "status": "unknown",
        "evidence": "Only local HTML/crawler files were read. HTTP status, headers, WAF, JavaScript rendering, indexing, rankings, and citations were not measured.",
        "action": "Inspect deployment and supported search tools separately."
      },
      "after": {
        "id": "live-indexing",
        "status": "unknown",
        "evidence": "Only local HTML/crawler files were read. HTTP status, headers, WAF, JavaScript rendering, indexing, rankings, and citations were not measured.",
        "action": "Inspect deployment and supported search tools separately."
      }
    },
    {
      "id": "llms-txt",
      "change": "unchanged",
      "before": {
        "id": "llms-txt",
        "status": "pass",
        "evidence": "Optional llms.txt absent; no readiness penalty.",
        "action": "Treat as an optional experiment."
      },
      "after": {
        "id": "llms-txt",
        "status": "pass",
        "evidence": "Optional llms.txt absent; no readiness penalty.",
        "action": "Treat as an optional experiment."
      }
    },
    {
      "id": "robots-file",
      "change": "unchanged",
      "before": {
        "id": "robots-file",
        "status": "pass",
        "evidence": "/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/robots.txt",
        "action": "Review intentional access policy."
      },
      "after": {
        "id": "robots-file",
        "status": "pass",
        "evidence": "/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/robots.txt",
        "action": "Review intentional access policy."
      }
    },
    {
      "id": "schema-semantics",
      "change": "unchanged",
      "before": {
        "id": "schema-semantics",
        "status": "unknown",
        "evidence": "JSON parsing does not establish Schema.org validity or rich-result eligibility.",
        "action": "Use the applicable schema and search validation tools."
      },
      "after": {
        "id": "schema-semantics",
        "status": "unknown",
        "evidence": "JSON parsing does not establish Schema.org validity or rich-result eligibility.",
        "action": "Use the applicable schema and search validation tools."
      }
    },
    {
      "id": "sitemap",
      "change": "details-changed",
      "before": {
        "id": "sitemap",
        "status": "pass",
        "evidence": "/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/sitemap.xml: 146 locations; direct urlset required",
        "action": "Supply a direct sitemap urlset for this export; sitemap indexes are not expanded."
      },
      "after": {
        "id": "sitemap",
        "status": "pass",
        "evidence": "/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/sitemap.xml: 145 locations; direct urlset required",
        "action": "Supply a direct sitemap urlset for this export; sitemap indexes are not expanded."
      }
    },
    {
      "id": "sitemap-duplicates",
      "change": "status-changed",
      "before": {
        "id": "sitemap-duplicates",
        "status": "fail",
        "evidence": "/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/sitemap.xml: 146 entries; 145 unique URLs; 1 duplicate entries; https://yinthread.com/learn/day-master occurs 2 times at positions 8, 12",
        "action": "Retain one intended canonical entry per URL and rebuild the export."
      },
      "after": {
        "id": "sitemap-duplicates",
        "status": "pass",
        "evidence": "/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo-yinthread-local-rehearsal020-kwbgpddg/case/public/sitemap.xml: 145 entries; 145 unique URLs; 0 duplicate entries",
        "action": "Retain one intended canonical entry per URL and rebuild the export."
      }
    }
  ],
  "counts": {
    "added": 0,
    "removed": 0,
    "status-changed": 1,
    "details-changed": 1,
    "unchanged": 17
  },
  "comparability": "unknown"
}
```
