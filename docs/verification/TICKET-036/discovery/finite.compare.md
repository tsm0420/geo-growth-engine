# compare report

**FICTIONAL EXAMPLE — not a product measurement.**

Generated: 2026-10-18T14:33:47.369Z

Local audit findings: /private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo035-retention-jjf7tir7/finite.json -&gt; /private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo035-retention-jjf7tir7/finite.json; exact IDs and text; no network requests

Pass: 1; fail: 0; unknown: 1.

| Check | Status | Evidence | Next action |
| --- | --- | --- | --- |
| finding:check | pass | unchanged; before: pass; evidence=supplied; action=inspect; after: pass; evidence=supplied; action=inspect | Inspect both original observations and the later action before choosing a fix. |
| comparison-scope | unknown | Structural finding comparison only. Product identity, collection conditions and growth attribution are unverified. | Inspect both source scopes, input data and collection conditions. Removed findings are unknown; literal differences do not establish improvement. |

## Details

```json
{
  "before": {
    "path": "/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo035-retention-jjf7tir7/finite.json",
    "sha256": "6258c7074d613f7fbf43a56ecb558d5be9202ae283899b72957434011a1e3832",
    "report": {
      "schemaVersion": 1,
      "kind": "audit",
      "generatedAt": "2026-10-18T10:00:00Z",
      "example": true,
      "scope": "Fictional retention fixture",
      "findings": [
        {
          "id": "check",
          "status": "pass",
          "evidence": "supplied",
          "action": "inspect",
          "extension": 1e+308
        }
      ],
      "summary": {
        "pass": 1,
        "fail": 0,
        "unknown": 0
      },
      "data": {
        "nested": [
          1e+308
        ]
      },
      "extension": 1e+308
    }
  },
  "after": {
    "path": "/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo035-retention-jjf7tir7/finite.json",
    "sha256": "6258c7074d613f7fbf43a56ecb558d5be9202ae283899b72957434011a1e3832",
    "report": {
      "schemaVersion": 1,
      "kind": "audit",
      "generatedAt": "2026-10-18T10:00:00Z",
      "example": true,
      "scope": "Fictional retention fixture",
      "findings": [
        {
          "id": "check",
          "status": "pass",
          "evidence": "supplied",
          "action": "inspect",
          "extension": 1e+308
        }
      ],
      "summary": {
        "pass": 1,
        "fail": 0,
        "unknown": 0
      },
      "data": {
        "nested": [
          1e+308
        ]
      },
      "extension": 1e+308
    }
  },
  "changes": [
    {
      "id": "check",
      "change": "unchanged",
      "before": {
        "id": "check",
        "status": "pass",
        "evidence": "supplied",
        "action": "inspect",
        "extension": 1e+308
      },
      "after": {
        "id": "check",
        "status": "pass",
        "evidence": "supplied",
        "action": "inspect",
        "extension": 1e+308
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
