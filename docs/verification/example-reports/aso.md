# aso report

**FICTIONAL EXAMPLE — not a product measurement.**

Generated: 2026-10-16T19:35:49.235Z

Local supplied store metadata; no store account access or publishing.

Pass: 9; fail: 0; unknown: 2.

| Check | Status | Evidence | Next action |
| --- | --- | --- | --- |
| ios.name | pass | /Users/tsm0420/geo/examples/.geo/product.yaml; en-GB; 15 Unicode code points; accepted range 2-30; https://developer.apple.com/help/app-store-connect/reference/app-information/app-information/ | Review the field in the store console; the CLI checks length, not policy acceptance. |
| ios.subtitle | pass | /Users/tsm0420/geo/examples/.geo/product.yaml; en-GB; 11 Unicode code points; accepted range 1-30; https://developer.apple.com/help/app-store-connect/reference/app-information/app-information/ | Review the field in the store console; the CLI checks length, not policy acceptance. |
| ios.keywords | pass | /Users/tsm0420/geo/examples/.geo/product.yaml; en-GB; 19 UTF-8 bytes; accepted range 1-100; https://developer.apple.com/help/app-store-connect/reference/app-information/platform-version-information/ | Review the field in the store console; the CLI checks length, not policy acceptance. |
| ios.description | pass | /Users/tsm0420/geo/examples/.geo/product.yaml; en-GB; 27 Unicode code points; accepted range 1-4000; https://developer.apple.com/help/app-store-connect/reference/app-information/platform-version-information/ | Review the field in the store console; the CLI checks length, not policy acceptance. |
| ios.fact-references | pass | /Users/tsm0420/geo/examples/.geo/product.yaml: supplied references daily-notes -&gt; https://example.com/features/daily-notes; sources not fetched | Inspect the referenced evidence before approving claims. |
| ios.semantic-claims | unknown | Text-to-fact consistency, screenshots, localization quality, conversion, and store acceptance were not verified. | Review every capability, price, and comparison against source evidence; inspect actual console and image artifacts. |
| android.title | pass | /Users/tsm0420/geo/examples/.geo/product.yaml; en-GB; 15 Unicode code points; accepted range 1-30; https://support.google.com/googleplay/android-developer/answer/9859152?hl=en | Review the field in the store console; the CLI checks length, not policy acceptance. |
| android.shortDescription | pass | /Users/tsm0420/geo/examples/.geo/product.yaml; en-GB; 27 Unicode code points; accepted range 1-80; https://support.google.com/googleplay/android-developer/answer/9859152?hl=en | Review the field in the store console; the CLI checks length, not policy acceptance. |
| android.fullDescription | pass | /Users/tsm0420/geo/examples/.geo/product.yaml; en-GB; 27 Unicode code points; accepted range 1-4000; https://support.google.com/googleplay/android-developer/answer/9859152?hl=en | Review the field in the store console; the CLI checks length, not policy acceptance. |
| android.fact-references | pass | /Users/tsm0420/geo/examples/.geo/product.yaml: supplied references daily-notes -&gt; https://example.com/features/daily-notes; sources not fetched | Inspect the referenced evidence before approving claims. |
| android.semantic-claims | unknown | Text-to-fact consistency, screenshots, localization quality, conversion, and store acceptance were not verified. | Review every capability, price, and comparison against source evidence; inspect actual console and image artifacts. |
