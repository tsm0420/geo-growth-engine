# compare report

**FICTIONAL EXAMPLE — not a product measurement.**

Generated: 2026-10-18T10:30:59.528Z

Local plan findings: /private/tmp/geo-core018-clean-_za4j6uo/after/plan.json -&gt; /private/tmp/geo-core018-clean-_za4j6uo/after/plan.json; exact IDs and text; no network requests

Pass: 1; fail: 0; unknown: 1.

| Check | Status | Evidence | Next action |
| --- | --- | --- | --- |
| finding:daily-journal | pass | unchanged; before: pass; evidence=/private/tmp/geo-core018-clean-_za4j6uo/fictional-fixture/.geo/queries.yaml: How can I keep daily journal entries?; priority 1; daily-notes: https://example.com/features/daily-notes; sources not independently verified; action=Inspect sources and create distinct, useful content only when authorized.; after: pass; evidence=/private/tmp/geo-core018-clean-_za4j6uo/fictional-fixture/.geo/queries.yaml: How can I keep daily journal entries?; priority 1; daily-notes: https://example.com/features/daily-notes; sources not independently verified; action=Inspect sources and create distinct, useful content only when authorized. | Inspect both original observations and the later action before choosing a fix. |
| comparison-scope | unknown | Structural finding comparison only. Product identity, collection conditions and growth attribution are unverified. | Inspect both source scopes, input data and collection conditions. Removed findings are unknown; literal differences do not establish improvement. |

## Details

```json
{
  "before": {
    "path": "/private/tmp/geo-core018-clean-_za4j6uo/after/plan.json",
    "sha256": "3e109147f81bbd9e506de4fc2dcb5011e8d053de965f3c66ff751a99c364e609",
    "report": {
      "schemaVersion": 1,
      "kind": "plan",
      "generatedAt": "2026-10-18T10:30:58.916Z",
      "example": true,
      "scope": "Supplied questions and fact references only; no traffic estimates or automatic publication.",
      "findings": [
        {
          "id": "daily-journal",
          "status": "pass",
          "evidence": "/private/tmp/geo-core018-clean-_za4j6uo/fictional-fixture/.geo/queries.yaml: How can I keep daily journal entries?; priority 1; daily-notes: https://example.com/features/daily-notes; sources not independently verified",
          "action": "Inspect sources and create distinct, useful content only when authorized."
        }
      ],
      "summary": {
        "pass": 1,
        "fail": 0,
        "unknown": 0
      },
      "data": {
        "opportunities": [
          {
            "queryId": "daily-journal",
            "query": "How can I keep daily journal entries?",
            "intent": "use-case",
            "priority": 1,
            "facts": [
              {
                "id": "daily-notes",
                "claim": "Save daily journal entries.",
                "source": "https://example.com/features/daily-notes"
              }
            ]
          }
        ],
        "researchGaps": []
      }
    }
  },
  "after": {
    "path": "/private/tmp/geo-core018-clean-_za4j6uo/after/plan.json",
    "sha256": "3e109147f81bbd9e506de4fc2dcb5011e8d053de965f3c66ff751a99c364e609",
    "report": {
      "schemaVersion": 1,
      "kind": "plan",
      "generatedAt": "2026-10-18T10:30:58.916Z",
      "example": true,
      "scope": "Supplied questions and fact references only; no traffic estimates or automatic publication.",
      "findings": [
        {
          "id": "daily-journal",
          "status": "pass",
          "evidence": "/private/tmp/geo-core018-clean-_za4j6uo/fictional-fixture/.geo/queries.yaml: How can I keep daily journal entries?; priority 1; daily-notes: https://example.com/features/daily-notes; sources not independently verified",
          "action": "Inspect sources and create distinct, useful content only when authorized."
        }
      ],
      "summary": {
        "pass": 1,
        "fail": 0,
        "unknown": 0
      },
      "data": {
        "opportunities": [
          {
            "queryId": "daily-journal",
            "query": "How can I keep daily journal entries?",
            "intent": "use-case",
            "priority": 1,
            "facts": [
              {
                "id": "daily-notes",
                "claim": "Save daily journal entries.",
                "source": "https://example.com/features/daily-notes"
              }
            ]
          }
        ],
        "researchGaps": []
      }
    }
  },
  "changes": [
    {
      "id": "daily-journal",
      "change": "unchanged",
      "before": {
        "id": "daily-journal",
        "status": "pass",
        "evidence": "/private/tmp/geo-core018-clean-_za4j6uo/fictional-fixture/.geo/queries.yaml: How can I keep daily journal entries?; priority 1; daily-notes: https://example.com/features/daily-notes; sources not independently verified",
        "action": "Inspect sources and create distinct, useful content only when authorized."
      },
      "after": {
        "id": "daily-journal",
        "status": "pass",
        "evidence": "/private/tmp/geo-core018-clean-_za4j6uo/fictional-fixture/.geo/queries.yaml: How can I keep daily journal entries?; priority 1; daily-notes: https://example.com/features/daily-notes; sources not independently verified",
        "action": "Inspect sources and create distinct, useful content only when authorized."
      }
    }
  ],
  "counts": {
    "added": 0,
    "removed": 0,
    "status-changed": 0,
    "details-changed": 0,
    "unchanged": 1
  },
  "comparability": "unknown"
}
```
