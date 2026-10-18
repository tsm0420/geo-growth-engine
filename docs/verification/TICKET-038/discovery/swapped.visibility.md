# visibility report

**FICTIONAL EXAMPLE — not a product measurement.**

Generated: 2026-10-18T14:50:04.979Z

Imported user-supplied responses; no API calls or consumer-interface collection. Aggregate rates describe this sample set, not market rankings.

Pass: 0; fail: 0; unknown: 3.

| Check | Status | Evidence | Next action |
| --- | --- | --- | --- |
| collection-coverage | unknown | 3/5 successful; 2 collection errors; coverage=0.6 | Read groups and coverage before comparing rates. Failed attempts are excluded from mention/citation denominators. |
| recommendations | unknown | Mentions were matched; explicit recommendations were not classified. | Inspect raw answers before making recommendation claims. |
| provenance | unknown | Provider, model, surface, locale, timestamps, and answers are supplied by the importer and were not independently verified. | Retain collection receipts and repeat comparable queries before drawing conclusions. |

## Details

```json
{
  "totals": {
    "attempted": 5,
    "successful": 3,
    "failed": 2,
    "coverage": 0.6,
    "mentionRate": 0.3333333333333333,
    "citationRate": 0.3333333333333333,
    "recommendationRate": null,
    "competitors": {
      "Other Journal": 2
    }
  },
  "groups": [
    {
      "provider": "fictional-provider",
      "surface": "api",
      "model": "fictional-model-a",
      "locale": "en-GB",
      "attempted": 4,
      "successful": 2,
      "failed": 2,
      "coverage": 0.5,
      "mentionRate": 0.5,
      "citationRate": 0.5,
      "recommendationRate": null,
      "competitors": {
        "Other Journal": 1
      }
    },
    {
      "provider": "fictional-provider",
      "surface": "api",
      "model": "fictional-model-b",
      "locale": "en-GB",
      "attempted": 1,
      "successful": 1,
      "failed": 0,
      "coverage": 1,
      "mentionRate": 0,
      "citationRate": 0,
      "recommendationRate": null,
      "competitors": {
        "Other Journal": 1
      }
    }
  ],
  "source": "/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo037-utility-tdwx0si8/swapped.jsonl",
  "evidence": "evidence/responses.jsonl",
  "sha256": "de2142570cc41be293a203831c90b1ab4d1dc243456c99922b6e2323503b5ed7"
}
```
