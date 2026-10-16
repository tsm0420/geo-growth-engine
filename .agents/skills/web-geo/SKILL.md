---
name: web-geo
description: Review a website or SaaS public HTML export for metadata, crawler rules, canonical URLs, sitemap coverage, and JSON-LD syntax.
---

Run GEO Growth Engine's `geo audit --config <config> --output <directory>` against the actual build output. If the CLI or export is missing, identify the prerequisite. The command reads local files; it does not crawl deployment or execute JavaScript.

Inspect evidence paths before proposing fixes. Preserve intentional canonical and access policies. OAI-SearchBot controls search; GPTBot controls training permission. Googlebot Search access differs from Google-Extended. Consult [OpenAI crawler documentation](https://developers.openai.com/api/docs/bots) and [Google AI features](https://developers.google.com/search/docs/appearance/ai-features) when changing policies.

JSON-LD parsing proves syntax only. Verify product facts and visible content before proposing structured data. llms.txt is optional. Rerun the product's build and audit after authorized fixes. Live HTTP, WAF, rendering, indexing, and ranking remain unmeasured until observed separately.
