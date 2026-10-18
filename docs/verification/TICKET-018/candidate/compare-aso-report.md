# compare report

**FICTIONAL EXAMPLE — not a product measurement.**

Generated: 2026-10-18T10:30:59.381Z

Local aso findings: /private/tmp/geo-core018-clean-_za4j6uo/after/aso.json -&gt; /private/tmp/geo-core018-clean-_za4j6uo/after/aso.json; exact IDs and text; no network requests

Pass: 9; fail: 0; unknown: 3.

| Check | Status | Evidence | Next action |
| --- | --- | --- | --- |
| finding:android.fact-references | pass | unchanged; before: pass; evidence=/private/tmp/geo-core018-clean-_za4j6uo/fictional-fixture/.geo/product.yaml: supplied references daily-notes -&gt; https://example.com/features/daily-notes; sources not fetched; action=Inspect the referenced evidence before approving claims.; after: pass; evidence=/private/tmp/geo-core018-clean-_za4j6uo/fictional-fixture/.geo/product.yaml: supplied references daily-notes -&gt; https://example.com/features/daily-notes; sources not fetched; action=Inspect the referenced evidence before approving claims. | Inspect both original observations and the later action before choosing a fix. |
| finding:android.fullDescription | pass | unchanged; before: pass; evidence=/private/tmp/geo-core018-clean-_za4j6uo/fictional-fixture/.geo/product.yaml; en-GB; 27 Unicode code points; accepted range 1-4000; https://support.google.com/googleplay/android-developer/answer/9859152?hl=en; action=Review the field in the store console; the CLI checks length, not policy acceptance.; after: pass; evidence=/private/tmp/geo-core018-clean-_za4j6uo/fictional-fixture/.geo/product.yaml; en-GB; 27 Unicode code points; accepted range 1-4000; https://support.google.com/googleplay/android-developer/answer/9859152?hl=en; action=Review the field in the store console; the CLI checks length, not policy acceptance. | Inspect both original observations and the later action before choosing a fix. |
| finding:android.semantic-claims | unknown | unchanged; before: unknown; evidence=Text-to-fact consistency, screenshots, localization quality, conversion, and store acceptance were not verified.; action=Review every capability, price, and comparison against source evidence; inspect actual console and image artifacts.; after: unknown; evidence=Text-to-fact consistency, screenshots, localization quality, conversion, and store acceptance were not verified.; action=Review every capability, price, and comparison against source evidence; inspect actual console and image artifacts. | Inspect both original observations and the later action before choosing a fix. |
| finding:android.shortDescription | pass | unchanged; before: pass; evidence=/private/tmp/geo-core018-clean-_za4j6uo/fictional-fixture/.geo/product.yaml; en-GB; 27 Unicode code points; accepted range 1-80; https://support.google.com/googleplay/android-developer/answer/9859152?hl=en; action=Review the field in the store console; the CLI checks length, not policy acceptance.; after: pass; evidence=/private/tmp/geo-core018-clean-_za4j6uo/fictional-fixture/.geo/product.yaml; en-GB; 27 Unicode code points; accepted range 1-80; https://support.google.com/googleplay/android-developer/answer/9859152?hl=en; action=Review the field in the store console; the CLI checks length, not policy acceptance. | Inspect both original observations and the later action before choosing a fix. |
| finding:android.title | pass | unchanged; before: pass; evidence=/private/tmp/geo-core018-clean-_za4j6uo/fictional-fixture/.geo/product.yaml; en-GB; 15 Unicode code points; accepted range 1-30; https://support.google.com/googleplay/android-developer/answer/9859152?hl=en; action=Review the field in the store console; the CLI checks length, not policy acceptance.; after: pass; evidence=/private/tmp/geo-core018-clean-_za4j6uo/fictional-fixture/.geo/product.yaml; en-GB; 15 Unicode code points; accepted range 1-30; https://support.google.com/googleplay/android-developer/answer/9859152?hl=en; action=Review the field in the store console; the CLI checks length, not policy acceptance. | Inspect both original observations and the later action before choosing a fix. |
| finding:ios.description | pass | unchanged; before: pass; evidence=/private/tmp/geo-core018-clean-_za4j6uo/fictional-fixture/.geo/product.yaml; en-GB; 27 Unicode code points; accepted range 1-4000; https://developer.apple.com/help/app-store-connect/reference/app-information/platform-version-information/; action=Review the field in the store console; the CLI checks length, not policy acceptance.; after: pass; evidence=/private/tmp/geo-core018-clean-_za4j6uo/fictional-fixture/.geo/product.yaml; en-GB; 27 Unicode code points; accepted range 1-4000; https://developer.apple.com/help/app-store-connect/reference/app-information/platform-version-information/; action=Review the field in the store console; the CLI checks length, not policy acceptance. | Inspect both original observations and the later action before choosing a fix. |
| finding:ios.fact-references | pass | unchanged; before: pass; evidence=/private/tmp/geo-core018-clean-_za4j6uo/fictional-fixture/.geo/product.yaml: supplied references daily-notes -&gt; https://example.com/features/daily-notes; sources not fetched; action=Inspect the referenced evidence before approving claims.; after: pass; evidence=/private/tmp/geo-core018-clean-_za4j6uo/fictional-fixture/.geo/product.yaml: supplied references daily-notes -&gt; https://example.com/features/daily-notes; sources not fetched; action=Inspect the referenced evidence before approving claims. | Inspect both original observations and the later action before choosing a fix. |
| finding:ios.keywords | pass | unchanged; before: pass; evidence=/private/tmp/geo-core018-clean-_za4j6uo/fictional-fixture/.geo/product.yaml; en-GB; 19 UTF-8 bytes; accepted range 1-100; https://developer.apple.com/help/app-store-connect/reference/app-information/platform-version-information/; action=Review the field in the store console; the CLI checks length, not policy acceptance.; after: pass; evidence=/private/tmp/geo-core018-clean-_za4j6uo/fictional-fixture/.geo/product.yaml; en-GB; 19 UTF-8 bytes; accepted range 1-100; https://developer.apple.com/help/app-store-connect/reference/app-information/platform-version-information/; action=Review the field in the store console; the CLI checks length, not policy acceptance. | Inspect both original observations and the later action before choosing a fix. |
| finding:ios.name | pass | unchanged; before: pass; evidence=/private/tmp/geo-core018-clean-_za4j6uo/fictional-fixture/.geo/product.yaml; en-GB; 15 Unicode code points; accepted range 2-30; https://developer.apple.com/help/app-store-connect/reference/app-information/app-information/; action=Review the field in the store console; the CLI checks length, not policy acceptance.; after: pass; evidence=/private/tmp/geo-core018-clean-_za4j6uo/fictional-fixture/.geo/product.yaml; en-GB; 15 Unicode code points; accepted range 2-30; https://developer.apple.com/help/app-store-connect/reference/app-information/app-information/; action=Review the field in the store console; the CLI checks length, not policy acceptance. | Inspect both original observations and the later action before choosing a fix. |
| finding:ios.semantic-claims | unknown | unchanged; before: unknown; evidence=Text-to-fact consistency, screenshots, localization quality, conversion, and store acceptance were not verified.; action=Review every capability, price, and comparison against source evidence; inspect actual console and image artifacts.; after: unknown; evidence=Text-to-fact consistency, screenshots, localization quality, conversion, and store acceptance were not verified.; action=Review every capability, price, and comparison against source evidence; inspect actual console and image artifacts. | Inspect both original observations and the later action before choosing a fix. |
| finding:ios.subtitle | pass | unchanged; before: pass; evidence=/private/tmp/geo-core018-clean-_za4j6uo/fictional-fixture/.geo/product.yaml; en-GB; 11 Unicode code points; accepted range 1-30; https://developer.apple.com/help/app-store-connect/reference/app-information/app-information/; action=Review the field in the store console; the CLI checks length, not policy acceptance.; after: pass; evidence=/private/tmp/geo-core018-clean-_za4j6uo/fictional-fixture/.geo/product.yaml; en-GB; 11 Unicode code points; accepted range 1-30; https://developer.apple.com/help/app-store-connect/reference/app-information/app-information/; action=Review the field in the store console; the CLI checks length, not policy acceptance. | Inspect both original observations and the later action before choosing a fix. |
| comparison-scope | unknown | Structural finding comparison only. Product identity, collection conditions and growth attribution are unverified. | Inspect both source scopes, input data and collection conditions. Removed findings are unknown; literal differences do not establish improvement. |

## Details

```json
{
  "before": {
    "path": "/private/tmp/geo-core018-clean-_za4j6uo/after/aso.json",
    "sha256": "b9ee227de5c4dc6aee6ace06eeaf96423c2fc5256cc0498fcc013eea747457af",
    "report": {
      "schemaVersion": 1,
      "kind": "aso",
      "generatedAt": "2026-10-18T10:30:58.432Z",
      "example": true,
      "scope": "Local supplied store metadata; no store account access or publishing.",
      "findings": [
        {
          "id": "ios.name",
          "status": "pass",
          "evidence": "/private/tmp/geo-core018-clean-_za4j6uo/fictional-fixture/.geo/product.yaml; en-GB; 15 Unicode code points; accepted range 2-30; https://developer.apple.com/help/app-store-connect/reference/app-information/app-information/",
          "action": "Review the field in the store console; the CLI checks length, not policy acceptance."
        },
        {
          "id": "ios.subtitle",
          "status": "pass",
          "evidence": "/private/tmp/geo-core018-clean-_za4j6uo/fictional-fixture/.geo/product.yaml; en-GB; 11 Unicode code points; accepted range 1-30; https://developer.apple.com/help/app-store-connect/reference/app-information/app-information/",
          "action": "Review the field in the store console; the CLI checks length, not policy acceptance."
        },
        {
          "id": "ios.keywords",
          "status": "pass",
          "evidence": "/private/tmp/geo-core018-clean-_za4j6uo/fictional-fixture/.geo/product.yaml; en-GB; 19 UTF-8 bytes; accepted range 1-100; https://developer.apple.com/help/app-store-connect/reference/app-information/platform-version-information/",
          "action": "Review the field in the store console; the CLI checks length, not policy acceptance."
        },
        {
          "id": "ios.description",
          "status": "pass",
          "evidence": "/private/tmp/geo-core018-clean-_za4j6uo/fictional-fixture/.geo/product.yaml; en-GB; 27 Unicode code points; accepted range 1-4000; https://developer.apple.com/help/app-store-connect/reference/app-information/platform-version-information/",
          "action": "Review the field in the store console; the CLI checks length, not policy acceptance."
        },
        {
          "id": "ios.fact-references",
          "status": "pass",
          "evidence": "/private/tmp/geo-core018-clean-_za4j6uo/fictional-fixture/.geo/product.yaml: supplied references daily-notes -> https://example.com/features/daily-notes; sources not fetched",
          "action": "Inspect the referenced evidence before approving claims."
        },
        {
          "id": "ios.semantic-claims",
          "status": "unknown",
          "evidence": "Text-to-fact consistency, screenshots, localization quality, conversion, and store acceptance were not verified.",
          "action": "Review every capability, price, and comparison against source evidence; inspect actual console and image artifacts."
        },
        {
          "id": "android.title",
          "status": "pass",
          "evidence": "/private/tmp/geo-core018-clean-_za4j6uo/fictional-fixture/.geo/product.yaml; en-GB; 15 Unicode code points; accepted range 1-30; https://support.google.com/googleplay/android-developer/answer/9859152?hl=en",
          "action": "Review the field in the store console; the CLI checks length, not policy acceptance."
        },
        {
          "id": "android.shortDescription",
          "status": "pass",
          "evidence": "/private/tmp/geo-core018-clean-_za4j6uo/fictional-fixture/.geo/product.yaml; en-GB; 27 Unicode code points; accepted range 1-80; https://support.google.com/googleplay/android-developer/answer/9859152?hl=en",
          "action": "Review the field in the store console; the CLI checks length, not policy acceptance."
        },
        {
          "id": "android.fullDescription",
          "status": "pass",
          "evidence": "/private/tmp/geo-core018-clean-_za4j6uo/fictional-fixture/.geo/product.yaml; en-GB; 27 Unicode code points; accepted range 1-4000; https://support.google.com/googleplay/android-developer/answer/9859152?hl=en",
          "action": "Review the field in the store console; the CLI checks length, not policy acceptance."
        },
        {
          "id": "android.fact-references",
          "status": "pass",
          "evidence": "/private/tmp/geo-core018-clean-_za4j6uo/fictional-fixture/.geo/product.yaml: supplied references daily-notes -> https://example.com/features/daily-notes; sources not fetched",
          "action": "Inspect the referenced evidence before approving claims."
        },
        {
          "id": "android.semantic-claims",
          "status": "unknown",
          "evidence": "Text-to-fact consistency, screenshots, localization quality, conversion, and store acceptance were not verified.",
          "action": "Review every capability, price, and comparison against source evidence; inspect actual console and image artifacts."
        }
      ],
      "summary": {
        "pass": 9,
        "fail": 0,
        "unknown": 2
      },
      "data": null
    }
  },
  "after": {
    "path": "/private/tmp/geo-core018-clean-_za4j6uo/after/aso.json",
    "sha256": "b9ee227de5c4dc6aee6ace06eeaf96423c2fc5256cc0498fcc013eea747457af",
    "report": {
      "schemaVersion": 1,
      "kind": "aso",
      "generatedAt": "2026-10-18T10:30:58.432Z",
      "example": true,
      "scope": "Local supplied store metadata; no store account access or publishing.",
      "findings": [
        {
          "id": "ios.name",
          "status": "pass",
          "evidence": "/private/tmp/geo-core018-clean-_za4j6uo/fictional-fixture/.geo/product.yaml; en-GB; 15 Unicode code points; accepted range 2-30; https://developer.apple.com/help/app-store-connect/reference/app-information/app-information/",
          "action": "Review the field in the store console; the CLI checks length, not policy acceptance."
        },
        {
          "id": "ios.subtitle",
          "status": "pass",
          "evidence": "/private/tmp/geo-core018-clean-_za4j6uo/fictional-fixture/.geo/product.yaml; en-GB; 11 Unicode code points; accepted range 1-30; https://developer.apple.com/help/app-store-connect/reference/app-information/app-information/",
          "action": "Review the field in the store console; the CLI checks length, not policy acceptance."
        },
        {
          "id": "ios.keywords",
          "status": "pass",
          "evidence": "/private/tmp/geo-core018-clean-_za4j6uo/fictional-fixture/.geo/product.yaml; en-GB; 19 UTF-8 bytes; accepted range 1-100; https://developer.apple.com/help/app-store-connect/reference/app-information/platform-version-information/",
          "action": "Review the field in the store console; the CLI checks length, not policy acceptance."
        },
        {
          "id": "ios.description",
          "status": "pass",
          "evidence": "/private/tmp/geo-core018-clean-_za4j6uo/fictional-fixture/.geo/product.yaml; en-GB; 27 Unicode code points; accepted range 1-4000; https://developer.apple.com/help/app-store-connect/reference/app-information/platform-version-information/",
          "action": "Review the field in the store console; the CLI checks length, not policy acceptance."
        },
        {
          "id": "ios.fact-references",
          "status": "pass",
          "evidence": "/private/tmp/geo-core018-clean-_za4j6uo/fictional-fixture/.geo/product.yaml: supplied references daily-notes -> https://example.com/features/daily-notes; sources not fetched",
          "action": "Inspect the referenced evidence before approving claims."
        },
        {
          "id": "ios.semantic-claims",
          "status": "unknown",
          "evidence": "Text-to-fact consistency, screenshots, localization quality, conversion, and store acceptance were not verified.",
          "action": "Review every capability, price, and comparison against source evidence; inspect actual console and image artifacts."
        },
        {
          "id": "android.title",
          "status": "pass",
          "evidence": "/private/tmp/geo-core018-clean-_za4j6uo/fictional-fixture/.geo/product.yaml; en-GB; 15 Unicode code points; accepted range 1-30; https://support.google.com/googleplay/android-developer/answer/9859152?hl=en",
          "action": "Review the field in the store console; the CLI checks length, not policy acceptance."
        },
        {
          "id": "android.shortDescription",
          "status": "pass",
          "evidence": "/private/tmp/geo-core018-clean-_za4j6uo/fictional-fixture/.geo/product.yaml; en-GB; 27 Unicode code points; accepted range 1-80; https://support.google.com/googleplay/android-developer/answer/9859152?hl=en",
          "action": "Review the field in the store console; the CLI checks length, not policy acceptance."
        },
        {
          "id": "android.fullDescription",
          "status": "pass",
          "evidence": "/private/tmp/geo-core018-clean-_za4j6uo/fictional-fixture/.geo/product.yaml; en-GB; 27 Unicode code points; accepted range 1-4000; https://support.google.com/googleplay/android-developer/answer/9859152?hl=en",
          "action": "Review the field in the store console; the CLI checks length, not policy acceptance."
        },
        {
          "id": "android.fact-references",
          "status": "pass",
          "evidence": "/private/tmp/geo-core018-clean-_za4j6uo/fictional-fixture/.geo/product.yaml: supplied references daily-notes -> https://example.com/features/daily-notes; sources not fetched",
          "action": "Inspect the referenced evidence before approving claims."
        },
        {
          "id": "android.semantic-claims",
          "status": "unknown",
          "evidence": "Text-to-fact consistency, screenshots, localization quality, conversion, and store acceptance were not verified.",
          "action": "Review every capability, price, and comparison against source evidence; inspect actual console and image artifacts."
        }
      ],
      "summary": {
        "pass": 9,
        "fail": 0,
        "unknown": 2
      },
      "data": null
    }
  },
  "changes": [
    {
      "id": "android.fact-references",
      "change": "unchanged",
      "before": {
        "id": "android.fact-references",
        "status": "pass",
        "evidence": "/private/tmp/geo-core018-clean-_za4j6uo/fictional-fixture/.geo/product.yaml: supplied references daily-notes -> https://example.com/features/daily-notes; sources not fetched",
        "action": "Inspect the referenced evidence before approving claims."
      },
      "after": {
        "id": "android.fact-references",
        "status": "pass",
        "evidence": "/private/tmp/geo-core018-clean-_za4j6uo/fictional-fixture/.geo/product.yaml: supplied references daily-notes -> https://example.com/features/daily-notes; sources not fetched",
        "action": "Inspect the referenced evidence before approving claims."
      }
    },
    {
      "id": "android.fullDescription",
      "change": "unchanged",
      "before": {
        "id": "android.fullDescription",
        "status": "pass",
        "evidence": "/private/tmp/geo-core018-clean-_za4j6uo/fictional-fixture/.geo/product.yaml; en-GB; 27 Unicode code points; accepted range 1-4000; https://support.google.com/googleplay/android-developer/answer/9859152?hl=en",
        "action": "Review the field in the store console; the CLI checks length, not policy acceptance."
      },
      "after": {
        "id": "android.fullDescription",
        "status": "pass",
        "evidence": "/private/tmp/geo-core018-clean-_za4j6uo/fictional-fixture/.geo/product.yaml; en-GB; 27 Unicode code points; accepted range 1-4000; https://support.google.com/googleplay/android-developer/answer/9859152?hl=en",
        "action": "Review the field in the store console; the CLI checks length, not policy acceptance."
      }
    },
    {
      "id": "android.semantic-claims",
      "change": "unchanged",
      "before": {
        "id": "android.semantic-claims",
        "status": "unknown",
        "evidence": "Text-to-fact consistency, screenshots, localization quality, conversion, and store acceptance were not verified.",
        "action": "Review every capability, price, and comparison against source evidence; inspect actual console and image artifacts."
      },
      "after": {
        "id": "android.semantic-claims",
        "status": "unknown",
        "evidence": "Text-to-fact consistency, screenshots, localization quality, conversion, and store acceptance were not verified.",
        "action": "Review every capability, price, and comparison against source evidence; inspect actual console and image artifacts."
      }
    },
    {
      "id": "android.shortDescription",
      "change": "unchanged",
      "before": {
        "id": "android.shortDescription",
        "status": "pass",
        "evidence": "/private/tmp/geo-core018-clean-_za4j6uo/fictional-fixture/.geo/product.yaml; en-GB; 27 Unicode code points; accepted range 1-80; https://support.google.com/googleplay/android-developer/answer/9859152?hl=en",
        "action": "Review the field in the store console; the CLI checks length, not policy acceptance."
      },
      "after": {
        "id": "android.shortDescription",
        "status": "pass",
        "evidence": "/private/tmp/geo-core018-clean-_za4j6uo/fictional-fixture/.geo/product.yaml; en-GB; 27 Unicode code points; accepted range 1-80; https://support.google.com/googleplay/android-developer/answer/9859152?hl=en",
        "action": "Review the field in the store console; the CLI checks length, not policy acceptance."
      }
    },
    {
      "id": "android.title",
      "change": "unchanged",
      "before": {
        "id": "android.title",
        "status": "pass",
        "evidence": "/private/tmp/geo-core018-clean-_za4j6uo/fictional-fixture/.geo/product.yaml; en-GB; 15 Unicode code points; accepted range 1-30; https://support.google.com/googleplay/android-developer/answer/9859152?hl=en",
        "action": "Review the field in the store console; the CLI checks length, not policy acceptance."
      },
      "after": {
        "id": "android.title",
        "status": "pass",
        "evidence": "/private/tmp/geo-core018-clean-_za4j6uo/fictional-fixture/.geo/product.yaml; en-GB; 15 Unicode code points; accepted range 1-30; https://support.google.com/googleplay/android-developer/answer/9859152?hl=en",
        "action": "Review the field in the store console; the CLI checks length, not policy acceptance."
      }
    },
    {
      "id": "ios.description",
      "change": "unchanged",
      "before": {
        "id": "ios.description",
        "status": "pass",
        "evidence": "/private/tmp/geo-core018-clean-_za4j6uo/fictional-fixture/.geo/product.yaml; en-GB; 27 Unicode code points; accepted range 1-4000; https://developer.apple.com/help/app-store-connect/reference/app-information/platform-version-information/",
        "action": "Review the field in the store console; the CLI checks length, not policy acceptance."
      },
      "after": {
        "id": "ios.description",
        "status": "pass",
        "evidence": "/private/tmp/geo-core018-clean-_za4j6uo/fictional-fixture/.geo/product.yaml; en-GB; 27 Unicode code points; accepted range 1-4000; https://developer.apple.com/help/app-store-connect/reference/app-information/platform-version-information/",
        "action": "Review the field in the store console; the CLI checks length, not policy acceptance."
      }
    },
    {
      "id": "ios.fact-references",
      "change": "unchanged",
      "before": {
        "id": "ios.fact-references",
        "status": "pass",
        "evidence": "/private/tmp/geo-core018-clean-_za4j6uo/fictional-fixture/.geo/product.yaml: supplied references daily-notes -> https://example.com/features/daily-notes; sources not fetched",
        "action": "Inspect the referenced evidence before approving claims."
      },
      "after": {
        "id": "ios.fact-references",
        "status": "pass",
        "evidence": "/private/tmp/geo-core018-clean-_za4j6uo/fictional-fixture/.geo/product.yaml: supplied references daily-notes -> https://example.com/features/daily-notes; sources not fetched",
        "action": "Inspect the referenced evidence before approving claims."
      }
    },
    {
      "id": "ios.keywords",
      "change": "unchanged",
      "before": {
        "id": "ios.keywords",
        "status": "pass",
        "evidence": "/private/tmp/geo-core018-clean-_za4j6uo/fictional-fixture/.geo/product.yaml; en-GB; 19 UTF-8 bytes; accepted range 1-100; https://developer.apple.com/help/app-store-connect/reference/app-information/platform-version-information/",
        "action": "Review the field in the store console; the CLI checks length, not policy acceptance."
      },
      "after": {
        "id": "ios.keywords",
        "status": "pass",
        "evidence": "/private/tmp/geo-core018-clean-_za4j6uo/fictional-fixture/.geo/product.yaml; en-GB; 19 UTF-8 bytes; accepted range 1-100; https://developer.apple.com/help/app-store-connect/reference/app-information/platform-version-information/",
        "action": "Review the field in the store console; the CLI checks length, not policy acceptance."
      }
    },
    {
      "id": "ios.name",
      "change": "unchanged",
      "before": {
        "id": "ios.name",
        "status": "pass",
        "evidence": "/private/tmp/geo-core018-clean-_za4j6uo/fictional-fixture/.geo/product.yaml; en-GB; 15 Unicode code points; accepted range 2-30; https://developer.apple.com/help/app-store-connect/reference/app-information/app-information/",
        "action": "Review the field in the store console; the CLI checks length, not policy acceptance."
      },
      "after": {
        "id": "ios.name",
        "status": "pass",
        "evidence": "/private/tmp/geo-core018-clean-_za4j6uo/fictional-fixture/.geo/product.yaml; en-GB; 15 Unicode code points; accepted range 2-30; https://developer.apple.com/help/app-store-connect/reference/app-information/app-information/",
        "action": "Review the field in the store console; the CLI checks length, not policy acceptance."
      }
    },
    {
      "id": "ios.semantic-claims",
      "change": "unchanged",
      "before": {
        "id": "ios.semantic-claims",
        "status": "unknown",
        "evidence": "Text-to-fact consistency, screenshots, localization quality, conversion, and store acceptance were not verified.",
        "action": "Review every capability, price, and comparison against source evidence; inspect actual console and image artifacts."
      },
      "after": {
        "id": "ios.semantic-claims",
        "status": "unknown",
        "evidence": "Text-to-fact consistency, screenshots, localization quality, conversion, and store acceptance were not verified.",
        "action": "Review every capability, price, and comparison against source evidence; inspect actual console and image artifacts."
      }
    },
    {
      "id": "ios.subtitle",
      "change": "unchanged",
      "before": {
        "id": "ios.subtitle",
        "status": "pass",
        "evidence": "/private/tmp/geo-core018-clean-_za4j6uo/fictional-fixture/.geo/product.yaml; en-GB; 11 Unicode code points; accepted range 1-30; https://developer.apple.com/help/app-store-connect/reference/app-information/app-information/",
        "action": "Review the field in the store console; the CLI checks length, not policy acceptance."
      },
      "after": {
        "id": "ios.subtitle",
        "status": "pass",
        "evidence": "/private/tmp/geo-core018-clean-_za4j6uo/fictional-fixture/.geo/product.yaml; en-GB; 11 Unicode code points; accepted range 1-30; https://developer.apple.com/help/app-store-connect/reference/app-information/app-information/",
        "action": "Review the field in the store console; the CLI checks length, not policy acceptance."
      }
    }
  ],
  "counts": {
    "added": 0,
    "removed": 0,
    "status-changed": 0,
    "details-changed": 0,
    "unchanged": 11
  },
  "comparability": "unknown"
}
```
