# Alpha 2 candidate specification

Status: Implementation authorized by the active development goal. Delivery is a PR and local candidate, not a release.

## Contract

Retain the core edition's local-input scope and existing exit codes. Resolve BL-001 through an upstream-supported dependency path if one exists. Otherwise retain the reproducible warning, document the upstream constraint, and leave issue #7 open. Never force a transitive override solely to hide the warning. Preserve UTF-8 HTML text and HTML entity decoding through a real CLI regression.

BL-002 adds one `sitemap-duplicates` finding. Evaluate it only when the existing `sitemap` check accepts a direct, nonempty, on-origin urlset. Missing, malformed, or unsupported sitemaps produce an unknown duplicate finding and `data.sitemap: null`; their existing failures remain failures. This change does not expand sitemap support or replace coverage validation.

URL identity is exact equality of the XML parser's decoded, trimmed `loc` strings. XML named and numeric character references resolve before comparison. Do not normalize case, percent escapes, query order, fragments, or trailing slashes. Positions are one-based in extracted document order. Counts describe those extracted locations, not a live crawl or indexing inventory.

For an accepted sitemap, `data.sitemap` contains `entries`, `uniqueUrls`, `duplicateEntries` (entries minus unique URLs), and `duplicates`. Each duplicate is `{ url, occurrences, positions }`. Include only URLs occurring at least twice; sort them by decoded URL using JavaScript code-unit order, with ascending positions. The finding's evidence names the sitemap path, counts, and each repeated URL with positions. Unique input passes; any duplicate fails with action to retain one intended canonical entry per URL and rebuild the export. A duplicate alone causes exit 1, while unique valid inputs retain exit 0. Operational errors retain exit 2. Unknown live indexing and schema semantics remain unknown.

Re-audit the frozen YinThread input without fetching or editing the site or snapshot. Expected evidence: 146 entries, 145 unique URLs, one excess entry, and two occurrences of `https://yinthread.com/learn/day-master`. Save new results separately from historical alpha 1 results; retain capture hashes and explicitly record any report-path redaction. A local finding is not a growth or visibility measurement.

Update the relevant installed skill and user guidance to match the check. Candidate version: `0.1.0-alpha.2`; retain npm `private: true`. Quick-start instructions must distinguish the published alpha 1 tag from the unmerged alpha 2 candidate branch. No tag, registry publication, merge, paid sampling, live crawling, or production changes.

## Testing seams and order

Use the already agreed real CLI subprocess seam: temporary exported files, independent literal expected outcomes, JSON/Markdown output, status and original evidence. Do not expose private helpers for tests.

1. TICKET-005 investigates the installed dependency graph against official package metadata/source and records its supported outcome. Add a CLI decoding regression before any migration. A proven upstream limitation is an acceptable research outcome, explicitly unresolved.
2. TICKET-006 adds duplicate behavior one red/green slice at a time: repeated URLs and deterministic evidence; unique spellings including case/query/trailing-slash distinctions; XML named/numeric entity equivalence; unavailable/unsupported sitemap unknowns. Then re-run the frozen case and document results.
3. Independently review Standards and Spec against base `75d5e6ea48ce4d9a6d020a54cd87f23f925ac7ed`, using separate worktrees. Resolve introduced defects before ticket-linked source commits. Review any later executable changes again.
4. Verify typecheck, complete CLI suite, build, clean source installation, and extracted-package CLI smoke. Retain exact commands, stdout/stderr, exit status, actual runtime/OS, candidate source revision, package version and SHA-256. Raw receipts remain unedited; documentation may explain paths. Obtain green CI for the final PR head. Checks measured on a prior revision cannot substitute for candidate evidence.

## Delivery gate

A reviewable PR, locally built candidate, separate review reports, current verification receipts, updated ticket statuses/reports, and an achieved/unresolved readiness decision. Keep issue #7 open if upstream migration remains unsupported. Do not claim adoption, provider support, rankings, or a published alpha 2.
