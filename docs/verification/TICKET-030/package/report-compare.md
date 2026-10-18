# compare report

**FICTIONAL EXAMPLE — not a product measurement.**

Generated: 2026-10-18T13:58:18.674Z

Local plan findings: /private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo030-package-qrmdnlm6/plan/plan.json -&gt; /private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo030-package-qrmdnlm6/plan/plan.json; exact IDs and text; no network requests

Pass: 0; fail: 0; unknown: 2.

| Check | Status | Evidence | Next action |
| --- | --- | --- | --- |
| finding:first second\|&lt;&amp;&gt; | unknown | unchanged; before: unknown; evidence=/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo030-package-qrmdnlm6/fixture/.geo/queries.yaml: question continued more?; priority 1; no evidence; sources not independently verified; action=Research this gap before drafting product claims.; after: unknown; evidence=/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo030-package-qrmdnlm6/fixture/.geo/queries.yaml: question continued more?; priority 1; no evidence; sources not independently verified; action=Research this gap before drafting product claims. | Inspect both original observations and the later action before choosing a fix. |
| comparison-scope | unknown | Structural finding comparison only. Product identity, collection conditions and growth attribution are unverified. | Inspect both source scopes, input data and collection conditions. Removed findings are unknown; literal differences do not establish improvement. |

## Details

```json
{
  "before": {
    "path": "/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo030-package-qrmdnlm6/plan/plan.json",
    "sha256": "d2ad0cfbcfc670b4645c6b70acec76b93fcf59809ef20f02d712ee0690664f06",
    "report": {
      "schemaVersion": 1,
      "kind": "plan",
      "generatedAt": "2026-10-18T13:58:18.425Z",
      "example": true,
      "scope": "Supplied questions and fact references only; no traffic estimates or automatic publication.",
      "findings": [
        {
          "id": "first\r\nsecond|<&>",
          "status": "unknown",
          "evidence": "/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo030-package-qrmdnlm6/fixture/.geo/queries.yaml: question\rcontinued\nmore?; priority 1; no evidence; sources not independently verified",
          "action": "Research this gap before drafting product claims."
        }
      ],
      "summary": {
        "pass": 0,
        "fail": 0,
        "unknown": 1
      },
      "data": {
        "opportunities": [],
        "researchGaps": [
          {
            "queryId": "first\r\nsecond|<&>",
            "query": "question\rcontinued\nmore?",
            "reason": "No supporting product fact linked."
          }
        ]
      }
    }
  },
  "after": {
    "path": "/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo030-package-qrmdnlm6/plan/plan.json",
    "sha256": "d2ad0cfbcfc670b4645c6b70acec76b93fcf59809ef20f02d712ee0690664f06",
    "report": {
      "schemaVersion": 1,
      "kind": "plan",
      "generatedAt": "2026-10-18T13:58:18.425Z",
      "example": true,
      "scope": "Supplied questions and fact references only; no traffic estimates or automatic publication.",
      "findings": [
        {
          "id": "first\r\nsecond|<&>",
          "status": "unknown",
          "evidence": "/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo030-package-qrmdnlm6/fixture/.geo/queries.yaml: question\rcontinued\nmore?; priority 1; no evidence; sources not independently verified",
          "action": "Research this gap before drafting product claims."
        }
      ],
      "summary": {
        "pass": 0,
        "fail": 0,
        "unknown": 1
      },
      "data": {
        "opportunities": [],
        "researchGaps": [
          {
            "queryId": "first\r\nsecond|<&>",
            "query": "question\rcontinued\nmore?",
            "reason": "No supporting product fact linked."
          }
        ]
      }
    }
  },
  "changes": [
    {
      "id": "first\r\nsecond|<&>",
      "change": "unchanged",
      "before": {
        "id": "first\r\nsecond|<&>",
        "status": "unknown",
        "evidence": "/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo030-package-qrmdnlm6/fixture/.geo/queries.yaml: question\rcontinued\nmore?; priority 1; no evidence; sources not independently verified",
        "action": "Research this gap before drafting product claims."
      },
      "after": {
        "id": "first\r\nsecond|<&>",
        "status": "unknown",
        "evidence": "/private/var/folders/gx/cmmmfvr17c7dkpfhny0xklnh0000gn/T/geo030-package-qrmdnlm6/fixture/.geo/queries.yaml: question\rcontinued\nmore?; priority 1; no evidence; sources not independently verified",
        "action": "Research this gap before drafting product claims."
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
