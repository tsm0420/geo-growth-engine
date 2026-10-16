---
name: app-geo-aso
description: Review supplied iOS and Android listing text, localization readiness, and consistency with sourced product facts.
---

Run GEO Growth Engine's `geo aso --config <config> --output <directory>` for supplied metadata. Missing listings remain unknown. If the CLI is unavailable, report it as a prerequisite.

Use platform-specific units: Apple's keyword byte limit differs from character limits. Verify current rules in [App Store Connect](https://developer.apple.com/help/app-store-connect/reference/app-information/platform-version-information/) and [Google Play help](https://support.google.com/googleplay/android-developer/answer/9859152?hl=en).

Read every referenced fact and source before suggesting copy. Fact IDs provide traceability; they do not prove every sentence true. Semantic claims, prices, comparisons, and localization need human review. Screenshots, devices, store conversion, and console acceptance require actual artifacts. Core commands do not upload metadata, generate images, or run store experiments.
