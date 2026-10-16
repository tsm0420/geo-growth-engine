# YinThread technical snapshot case

Observed on 2026-10-16 at 20:06:59-20:07:00 UTC, with the maintainer's authorization. This is a real, bounded technical observation of [yinthread.com](https://yinthread.com/), not a growth or AI-visibility benchmark.

## Captured scope

Exactly three public URLs were fetched using bounded HTTPS requests, without authentication, form submissions, script execution, or linked-page crawling:

| Requested and effective URL | HTTP | Content type | Body bytes |
| --- | --- | --- | --- |
| https://yinthread.com/ | 200 | text/html; charset=utf-8 | 29,426 |
| https://yinthread.com/robots.txt | 200 | text/plain | 502 |
| https://yinthread.com/sitemap.xml | 200 | application/xml | 26,918 |

No redirects occurred. [capture.json](capture.json) records the actual timestamps, request arguments, effective URLs, status, byte lengths, and SHA-256. The three files under `public/` preserve response body bytes; filenames were mapped to a local export layout. Response headers and cookies were not retained. The actual host was Darwin arm64 with curl 8.7.1.

The [initial acquisition attempt](initial-acquisition-failures.json) failed with local sandbox DNS resolution errors. Those failures are acquisition evidence, not website defects. A subsequent authorized network retry produced the responses above.

## Observed results

The existing CLI audited the saved files with exit status **0**, producing **16 pass, 0 fail, and 2 unknown** findings. Inspect the [JSON](results/audit.json) and [Markdown](results/audit.md) results. This is a check count, not a quality or ranking score; informational training-policy and optional-file findings also appear in that count.

Initial HTML contains a title, description, social metadata, one H1, readable text, an absolute canonical, and parseable JSON-LD. The homepage appears in the sitemap. Saved robots rules allow Googlebot and OAI-SearchBot at the inferred root URL. This observes the captured rules, not actual access by those bots. Training permissions remain a separate policy decision.

An additional manual XML inspection found **146 sitemap entries and 145 unique URLs**: `https://yinthread.com/learn/day-master` occurs twice. [inspection.json](inspection.json) records this separate observation; the current CLI does not check duplicate sitemap entries. Removing the duplicate is a concrete cleanup opportunity, with no measured ranking impact.

The two CLI unknowns are structured-data semantics/eligibility and live indexing. Although the separate capture observed HTTP 200 with its own User-Agent, the local audit did not measure headers, WAF behavior, rendered content, actual indexing, rankings, citations, conversions, or changes over time. Only the homepage was audited; the other sitemap pages were not fetched. The site's demo birth dates and score are labelled as examples and are not validated user readings.

## Reproduce the saved-file audit

From a built toolkit checkout:

```sh
node dist/src/cli.js audit --config docs/case-studies/yinthread/config/config.yaml --output reports/yinthread-snapshot
```

Compare check IDs, statuses, and evidence content rather than generated timestamps and absolute paths. Public result copies normalize the personal checkout prefix to `/workspace/geo`; originals are retained locally and [digest pairs](../../releases/evidence-normalization.json) disclose this transformation. The captured website bodies are not normalized.

Verify the captured bytes without network access from the repository root:

```sh
shasum -a 256 docs/case-studies/yinthread/public/index.html docs/case-studies/yinthread/public/robots.txt docs/case-studies/yinthread/public/sitemap.xml
```

Compare those hashes with `capture.json`. For a fresh capture, use the bounded commands recorded there with fresh output filenames. Future responses may differ; the observation timestamp and digests identify this snapshot only.

## Snapshot rights

The toolkit code and documentation use MIT. The three captured website bodies are excluded from that license: website, brand, and embedded third-party rights remain with their respective owners. They are included with the maintainer-authorized case scope as audit evidence, not a grant to reuse the website. See [the snapshot notice](public/NOTICE.txt).
