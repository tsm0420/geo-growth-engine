# compare report

**FICTIONAL EXAMPLE — not a product measurement.**

Generated: 2026-10-18T13:39:28.603Z

Local visibility findings: /private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo028-package-yhp6csyb/before/visibility.json -&gt; /private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo028-package-yhp6csyb/after/visibility.json; exact IDs and text; no network requests

Pass: 1; fail: 0; unknown: 3.

| Check | Status | Evidence | Next action |
| --- | --- | --- | --- |
| finding:collection-coverage | pass | unchanged; before: pass; evidence=2/2 successful; 0 collection errors; coverage=1; action=Read groups and coverage before comparing rates. Failed attempts are excluded from mention/citation denominators.; after: pass; evidence=2/2 successful; 0 collection errors; coverage=1; action=Read groups and coverage before comparing rates. Failed attempts are excluded from mention/citation denominators. | Inspect both original observations and the later action before choosing a fix. |
| finding:provenance | unknown | unchanged; before: unknown; evidence=Provider, model, surface, locale, timestamps, and answers are supplied by the importer and were not independently verified.; action=Retain collection receipts and repeat comparable queries before drawing conclusions.; after: unknown; evidence=Provider, model, surface, locale, timestamps, and answers are supplied by the importer and were not independently verified.; action=Retain collection receipts and repeat comparable queries before drawing conclusions. | Inspect both original observations and the later action before choosing a fix. |
| finding:recommendations | unknown | unchanged; before: unknown; evidence=Mentions were matched; explicit recommendations were not classified.; action=Inspect raw answers before making recommendation claims.; after: unknown; evidence=Mentions were matched; explicit recommendations were not classified.; action=Inspect raw answers before making recommendation claims. | Inspect both original observations and the later action before choosing a fix. |
| comparison-scope | unknown | Structural finding comparison only. Product identity, collection conditions and growth attribution are unverified. | Inspect both source scopes, input data and collection conditions. Removed findings are unknown; literal differences do not establish improvement. |

## Details

```json
{
  "before": {
    "path": "/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo028-package-yhp6csyb/before/visibility.json",
    "sha256": "20fdac81646dfa77e3808039fa36958b1c8e4f592797a6db3d903e43fc5e54a7",
    "report": {
      "schemaVersion": 1,
      "kind": "visibility",
      "generatedAt": "2026-10-18T13:39:27.991Z",
      "example": true,
      "scope": "Imported user-supplied responses; no API calls or consumer-interface collection. Aggregate rates describe this sample set, not market rankings.",
      "findings": [
        {
          "id": "collection-coverage",
          "status": "pass",
          "evidence": "2/2 successful; 0 collection errors; coverage=1",
          "action": "Read groups and coverage before comparing rates. Failed attempts are excluded from mention/citation denominators."
        },
        {
          "id": "recommendations",
          "status": "unknown",
          "evidence": "Mentions were matched; explicit recommendations were not classified.",
          "action": "Inspect raw answers before making recommendation claims."
        },
        {
          "id": "provenance",
          "status": "unknown",
          "evidence": "Provider, model, surface, locale, timestamps, and answers are supplied by the importer and were not independently verified.",
          "action": "Retain collection receipts and repeat comparable queries before drawing conclusions."
        }
      ],
      "summary": {
        "pass": 1,
        "fail": 0,
        "unknown": 2
      },
      "data": {
        "totals": {
          "attempted": 2,
          "successful": 2,
          "failed": 0,
          "coverage": 1,
          "mentionRate": 1,
          "citationRate": 1,
          "recommendationRate": null,
          "competitors": {
            "Other Journal": 0
          }
        },
        "groups": [
          {
            "provider": "fixture",
            "surface": "API",
            "model": "fictional",
            "locale": "en-GB",
            "attempted": 2,
            "successful": 2,
            "failed": 0,
            "coverage": 1,
            "mentionRate": 1,
            "citationRate": 1,
            "recommendationRate": null,
            "competitors": {
              "Other Journal": 0
            }
          }
        ],
        "source": "/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo028-package-yhp6csyb/before.jsonl",
        "evidence": "evidence/responses.jsonl",
        "sha256": "73ec6989f3f44fd212ca94fb7a521cb9f2ce22fccc71b99cc296a8c6ecc78167"
      }
    }
  },
  "after": {
    "path": "/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo028-package-yhp6csyb/after/visibility.json",
    "sha256": "e54c8ffac8fdab9ba444bb9f27b066432f47aff7651178a7df3e51237ce4e4fb",
    "report": {
      "schemaVersion": 1,
      "kind": "visibility",
      "generatedAt": "2026-10-18T13:39:28.120Z",
      "example": true,
      "scope": "Imported user-supplied responses; no API calls or consumer-interface collection. Aggregate rates describe this sample set, not market rankings.",
      "findings": [
        {
          "id": "collection-coverage",
          "status": "pass",
          "evidence": "2/2 successful; 0 collection errors; coverage=1",
          "action": "Read groups and coverage before comparing rates. Failed attempts are excluded from mention/citation denominators."
        },
        {
          "id": "recommendations",
          "status": "unknown",
          "evidence": "Mentions were matched; explicit recommendations were not classified.",
          "action": "Inspect raw answers before making recommendation claims."
        },
        {
          "id": "provenance",
          "status": "unknown",
          "evidence": "Provider, model, surface, locale, timestamps, and answers are supplied by the importer and were not independently verified.",
          "action": "Retain collection receipts and repeat comparable queries before drawing conclusions."
        }
      ],
      "summary": {
        "pass": 1,
        "fail": 0,
        "unknown": 2
      },
      "data": {
        "totals": {
          "attempted": 2,
          "successful": 2,
          "failed": 0,
          "coverage": 1,
          "mentionRate": 0,
          "citationRate": 0,
          "recommendationRate": null,
          "competitors": {
            "Other Journal": 2
          }
        },
        "groups": [
          {
            "provider": "fixture",
            "surface": "API",
            "model": "fictional",
            "locale": "en-GB",
            "attempted": 2,
            "successful": 2,
            "failed": 0,
            "coverage": 1,
            "mentionRate": 0,
            "citationRate": 0,
            "recommendationRate": null,
            "competitors": {
              "Other Journal": 2
            }
          }
        ],
        "source": "/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo028-package-yhp6csyb/after.jsonl",
        "evidence": "evidence/responses.jsonl",
        "sha256": "1b71a3039354ca2c44d4d0ee6fb3e2c41149e3ee56d05cab48a441b60cef1c29"
      }
    }
  },
  "changes": [
    {
      "id": "collection-coverage",
      "change": "unchanged",
      "before": {
        "id": "collection-coverage",
        "status": "pass",
        "evidence": "2/2 successful; 0 collection errors; coverage=1",
        "action": "Read groups and coverage before comparing rates. Failed attempts are excluded from mention/citation denominators."
      },
      "after": {
        "id": "collection-coverage",
        "status": "pass",
        "evidence": "2/2 successful; 0 collection errors; coverage=1",
        "action": "Read groups and coverage before comparing rates. Failed attempts are excluded from mention/citation denominators."
      }
    },
    {
      "id": "provenance",
      "change": "unchanged",
      "before": {
        "id": "provenance",
        "status": "unknown",
        "evidence": "Provider, model, surface, locale, timestamps, and answers are supplied by the importer and were not independently verified.",
        "action": "Retain collection receipts and repeat comparable queries before drawing conclusions."
      },
      "after": {
        "id": "provenance",
        "status": "unknown",
        "evidence": "Provider, model, surface, locale, timestamps, and answers are supplied by the importer and were not independently verified.",
        "action": "Retain collection receipts and repeat comparable queries before drawing conclusions."
      }
    },
    {
      "id": "recommendations",
      "change": "unchanged",
      "before": {
        "id": "recommendations",
        "status": "unknown",
        "evidence": "Mentions were matched; explicit recommendations were not classified.",
        "action": "Inspect raw answers before making recommendation claims."
      },
      "after": {
        "id": "recommendations",
        "status": "unknown",
        "evidence": "Mentions were matched; explicit recommendations were not classified.",
        "action": "Inspect raw answers before making recommendation claims."
      }
    }
  ],
  "counts": {
    "added": 0,
    "removed": 0,
    "status-changed": 0,
    "details-changed": 0,
    "unchanged": 3
  },
  "comparability": "unknown"
}
```
