# GEO Growth Engine upstream review

Reviewed: 2026-10-16. Method: read-only GitHub API/file inspection and official documentation. No upstream code was installed, executed, cloned, or copied into the product repository. This is a targeted adoption review, not a full security audit or a ranking experiment.

## Decision

The plan's separation of technical checks, product facts, proposed changes, and measured visibility is sound. Revise the proposed three-project stack: none should become a trusted runtime dependency by default. Author the small core locally, reference selected verified ideas, and keep upstream attribution and commit provenance. Technical readiness scores must remain separate from observed mentions, citations, and conversions.

## Verified upstream findings

| Project and reviewed commit | Observed license | Verified capability | Recommended disposition |
|---|---|---|---|
| [sylvaintillon/geo-agent](https://github.com/sylvaintillon/geo-agent/tree/1d2d10a6c457287639ab8f1b9ba24dbbf28aee70) | README says MIT, but the complete tree has no LICENSE file and GitHub reports `license: null`. | Claude Code orchestration instructions, five agent definitions, Python fetch/scoring/report/CRM helpers. | Reference only; postpone code or instruction copying until license terms are explicit and installation mismatches are resolved. |
| [luka2chat/geo-skills](https://github.com/luka2chat/geo-skills/tree/85f0afdb0d4fd347cbf8c8ef2c9dab6d8e6e86ec) | [MIT text present](https://github.com/luka2chat/geo-skills/blob/85f0afdb0d4fd347cbf8c8ef2c9dab6d8e6e86ec/LICENSE). | A SKILL.md router and twelve Markdown rule files; package.json has no dependencies or lifecycle scripts. | Curated reference only; crawler rules contain material factual errors. Preserve its MIT notice if substantial portions are reused. |
| [staksoft/geo-seo-aeo-skill](https://github.com/staksoft/geo-seo-aeo-skill/tree/003b5145fd79fe8996c18a9f02d94fe08d7c6e80) | [MIT text present](https://github.com/staksoft/geo-seo-aeo-skill/blob/003b5145fd79fe8996c18a9f02d94fe08d7c6e80/LICENSE). | Audit/generate/fix instructions plus a standard-library Python HTML heuristic script and weak/strong fixtures. | Useful audit design reference; strengthen checks and automated assertions before using results as a CI gate. Preserve attribution if reused. |

License observations are evidence, not a legal opinion. Sources: each pinned tree above, [geo-agent metadata](https://api.github.com/repos/sylvaintillon/geo-agent), [luka package.json](https://github.com/luka2chat/geo-skills/blob/85f0afdb0d4fd347cbf8c8ef2c9dab6d8e6e86ec/package.json), and the license files read above.

### 1. Correct the crawler rules before adoption

Luka's [crawler rule, line 144](https://github.com/luka2chat/geo-skills/blob/85f0afdb0d4fd347cbf8c8ef2c9dab6d8e6e86ec/rules/ai-crawler-config.md#L144) says: “Blocking GPTBot blocks ChatGPT Search entirely”. That is contradicted by [OpenAI's crawler documentation](https://developers.openai.com/api/docs/bots): OAI-SearchBot controls search, GPTBot controls potential training use, and their settings are independent. Its example intended to block training also allows GPTBot.

The same [rule table, line 100](https://github.com/luka2chat/geo-skills/blob/85f0afdb0d4fd347cbf8c8ef2c9dab6d8e6e86ec/rules/ai-crawler-config.md#L100) assigns Google-Extended to AI Overviews. [Google's AI-feature documentation](https://developers.google.com/search/docs/appearance/ai-features#controlling-your-content-in-ai-features-in-search) instead identifies Googlebot as the Search crawling control and separates Google-Extended for other systems. Recommendation: maintain independently sourced search/training controls; never blindly replace a product's robots.txt with upstream examples.

### 2. geo-agent needs adaptation and provenance work

Its [installation instructions](https://github.com/sylvaintillon/geo-agent/blob/1d2d10a6c457287639ab8f1b9ba24dbbf28aee70/README.md#L12) use `skills/geo-*` and `skills/geo`, while the pinned tree actually contains `skills_geo-*` and `skills_geo`. The instructions target Claude Code directories and are not a ready Codex integration. Its [main skill](https://github.com/sylvaintillon/geo-agent/blob/1d2d10a6c457287639ab8f1b9ba24dbbf28aee70/skills_geo/SKILL.md) delegates to Bash/WebFetch/Write and includes CRM output under the user's home directory. Its [requirements](https://github.com/sylvaintillon/geo-agent/blob/1d2d10a6c457287639ab8f1b9ba24dbbf28aee70/skills_geo/requirements.txt) include ranged Python dependencies, Playwright, Flask, and PDF tooling.

Its [README, line 109](https://github.com/sylvaintillon/geo-agent/blob/1d2d10a6c457287639ab8f1b9ba24dbbf28aee70/README.md#L109) proposes estimating PageSpeed scores when measurement is unavailable. Reject that behavior: unavailable measurements should remain unavailable. Static performance risks can be reported separately. Its [technical agent](https://github.com/sylvaintillon/geo-agent/blob/1d2d10a6c457287639ab8f1b9ba24dbbf28aee70/agents/geo-technical.md) already distinguishes HTML risk assessment from field measurement, so the upstream guidance is inconsistent.

### 3. Staksoft's script is a heuristic extractor, not schema validation

Reading [audit.py](https://github.com/staksoft/geo-seo-aeo-skill/blob/003b5145fd79fe8996c18a9f02d94fe08d7c6e80/scripts/audit.py) verifies these limitations:

- `jsonld_valid` counts successful JSON parses; it does not validate Schema.org types, required properties, or Google eligibility, and it does not inspect nested `@graph` types.
- Every absolute URL with a hostname is counted as external, including absolute links back to the same site.
- The llms.txt checker converts network errors into `exists: false`, losing the distinction between absence and failed verification.
- The URL mode automatically requests the page and `/llms.txt`; URL redirects and response bodies have no explicit origin/IP or byte limits. Risk inference: add controlled public-network fetching and size limits before exposing this through a hosted audit service or untrusted jobs.
- No shell or subprocess execution appears in this audit script. That statement covers this file only.

The [tests README](https://github.com/staksoft/geo-seo-aeo-skill/blob/003b5145fd79fe8996c18a9f02d94fe08d7c6e80/tests/README.md) supplies manual fixture commands and expected outputs. The complete pinned tree contains no automated assertion runner. These checks were not executed in this review.

## Official-plan claims checked

The linked [Google announcement](https://developers.google.com/search/blog/2026/05/a-new-resource-for-optimizing) is real and dated May 15, 2026. Its emphasis on valuable unique content and foundational SEO matches the plan. [Google's AI-feature guidance](https://developers.google.com/search/docs/appearance/ai-features) requires ordinary search eligibility, does not require special AI text files or schema, and does not guarantee indexing or serving. The plan's optional llms.txt treatment and no-guarantee language should be retained.

## Scope recommendations and unverified areas

Start with a product-facts schema, repository/static HTML audit, structured findings with evidence, and an explicit manual visibility-response import format. Keep provider-backed sampling behind separate adapters, costs, and credentials. Do not equate an API model response with the consumer ChatGPT/Gemini/Google Search interface. Save provider/model, query, locale, timestamp, raw response, source URLs, and errors for every real sample.

Not verified here: Apple/Google Play integration contracts; each provider's automation permission and available account access; ranking or conversion effectiveness; every upstream helper's security; installer behavior of the external `npx skills` CLI. No current-source access failed for the three repositories or official pages cited above.
