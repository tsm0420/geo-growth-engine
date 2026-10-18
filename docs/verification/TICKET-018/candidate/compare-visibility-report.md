# compare report

**FICTIONAL EXAMPLE — not a product measurement.**

Generated: 2026-10-18T10:30:59.706Z

Local visibility findings: /private/tmp/geo-core018-clean-_za4j6uo/after/visibility.json -&gt; /private/tmp/geo-core018-clean-_za4j6uo/after/visibility.json; exact IDs and text; no network requests

Pass: 0; fail: 0; unknown: 4.

| Check | Status | Evidence | Next action |
| --- | --- | --- | --- |
| finding:collection-coverage | unknown | unchanged; before: unknown; evidence=1/2 successful; 1 collection errors; coverage=0.5; action=Read groups and coverage before comparing rates. Failed attempts are excluded from mention/citation denominators.; after: unknown; evidence=1/2 successful; 1 collection errors; coverage=0.5; action=Read groups and coverage before comparing rates. Failed attempts are excluded from mention/citation denominators. | Inspect both original observations and the later action before choosing a fix. |
| finding:provenance | unknown | unchanged; before: unknown; evidence=Provider, model, surface, locale, timestamps, and answers are supplied by the importer and were not independently verified.; action=Retain collection receipts and repeat comparable queries before drawing conclusions.; after: unknown; evidence=Provider, model, surface, locale, timestamps, and answers are supplied by the importer and were not independently verified.; action=Retain collection receipts and repeat comparable queries before drawing conclusions. | Inspect both original observations and the later action before choosing a fix. |
| finding:recommendations | unknown | unchanged; before: unknown; evidence=Mentions were matched; explicit recommendations were not classified.; action=Inspect raw answers before making recommendation claims.; after: unknown; evidence=Mentions were matched; explicit recommendations were not classified.; action=Inspect raw answers before making recommendation claims. | Inspect both original observations and the later action before choosing a fix. |
| comparison-scope | unknown | Structural finding comparison only. Product identity, collection conditions and growth attribution are unverified. | Inspect both source scopes, input data and collection conditions. Removed findings are unknown; literal differences do not establish improvement. |

## Details

```json
{
  "before": {
    "path": "/private/tmp/geo-core018-clean-_za4j6uo/after/visibility.json",
    "sha256": "20263bf010d45175e77f208cce0a93619d5016c6cc2e5296dcbc1b31280ea28d",
    "report": {
      "schemaVersion": 1,
      "kind": "visibility",
      "generatedAt": "2026-10-18T10:30:59.078Z",
      "example": true,
      "scope": "Imported user-supplied responses; no API calls or consumer-interface collection. Aggregate rates describe this sample set, not market rankings.",
      "findings": [
        {
          "id": "collection-coverage",
          "status": "unknown",
          "evidence": "1/2 successful; 1 collection errors; coverage=0.5",
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
        "pass": 0,
        "fail": 0,
        "unknown": 3
      },
      "data": {
        "totals": {
          "attempted": 2,
          "successful": 1,
          "failed": 1,
          "coverage": 0.5,
          "mentionRate": 1,
          "citationRate": 1,
          "recommendationRate": null,
          "competitors": {
            "Other Journal": 0
          }
        },
        "groups": [
          {
            "provider": "fictional-fixture",
            "surface": "synthetic-example",
            "model": "none",
            "locale": "en-GB",
            "attempted": 2,
            "successful": 1,
            "failed": 1,
            "coverage": 0.5,
            "mentionRate": 1,
            "citationRate": 1,
            "recommendationRate": null,
            "competitors": {
              "Other Journal": 0
            }
          }
        ],
        "source": "/private/tmp/geo-core018-clean-_za4j6uo/fictional-fixture/visibility.jsonl",
        "evidence": "evidence/responses.jsonl",
        "sha256": "60bc8038f38df4a74e958ca67aa61b48a55d3ed563b1d89830b153d58de6f6c5"
      }
    }
  },
  "after": {
    "path": "/private/tmp/geo-core018-clean-_za4j6uo/after/visibility.json",
    "sha256": "20263bf010d45175e77f208cce0a93619d5016c6cc2e5296dcbc1b31280ea28d",
    "report": {
      "schemaVersion": 1,
      "kind": "visibility",
      "generatedAt": "2026-10-18T10:30:59.078Z",
      "example": true,
      "scope": "Imported user-supplied responses; no API calls or consumer-interface collection. Aggregate rates describe this sample set, not market rankings.",
      "findings": [
        {
          "id": "collection-coverage",
          "status": "unknown",
          "evidence": "1/2 successful; 1 collection errors; coverage=0.5",
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
        "pass": 0,
        "fail": 0,
        "unknown": 3
      },
      "data": {
        "totals": {
          "attempted": 2,
          "successful": 1,
          "failed": 1,
          "coverage": 0.5,
          "mentionRate": 1,
          "citationRate": 1,
          "recommendationRate": null,
          "competitors": {
            "Other Journal": 0
          }
        },
        "groups": [
          {
            "provider": "fictional-fixture",
            "surface": "synthetic-example",
            "model": "none",
            "locale": "en-GB",
            "attempted": 2,
            "successful": 1,
            "failed": 1,
            "coverage": 0.5,
            "mentionRate": 1,
            "citationRate": 1,
            "recommendationRate": null,
            "competitors": {
              "Other Journal": 0
            }
          }
        ],
        "source": "/private/tmp/geo-core018-clean-_za4j6uo/fictional-fixture/visibility.jsonl",
        "evidence": "evidence/responses.jsonl",
        "sha256": "60bc8038f38df4a74e958ca67aa61b48a55d3ed563b1d89830b153d58de6f6c5"
      }
    }
  },
  "changes": [
    {
      "id": "collection-coverage",
      "change": "unchanged",
      "before": {
        "id": "collection-coverage",
        "status": "unknown",
        "evidence": "1/2 successful; 1 collection errors; coverage=0.5",
        "action": "Read groups and coverage before comparing rates. Failed attempts are excluded from mention/citation denominators."
      },
      "after": {
        "id": "collection-coverage",
        "status": "unknown",
        "evidence": "1/2 successful; 1 collection errors; coverage=0.5",
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
