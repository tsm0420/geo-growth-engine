# Scope sitemap page evidence to direct entries

Status: Accepted evidence correction; TICKET-034 / issue34.

## Problem and user benefit

Six actual fictional audits at main5223376 show three no-direct-entry shapes passing sitemap, duplicate and page-coverage checks: loc directly under urlset, under metadata, and under a metadata-nested url. A proper direct entry and a namespaced image-extension control pass. Unrestricted recursive extraction can supply phantom page evidence. An unrelated off-origin sibling also influences the existing origin check; this observation does not establish that the complete document meets the protocol schema.

As a site maintainer, I need coverage and duplicate counts to come from actual page entries. As a reviewer, I need valid direct entries to retain their exact decoded URL identity and partial-coverage behavior without unrelated loc elements affecting the result.

## Correction contract

Extract only scalar string loc children of direct url children of the root urlset. Do not recursively collect loc from arbitrary descendants, root siblings, wrappers, extensions or sitemap indexes. Out-of-path values cannot add page coverage, duplicates or origin failures. If no supported direct locations exist, sitemap fails, duplicates remain unknown with null data.sitemap, and absent page coverage fails. Genuine direct locations continue to provide partial coverage even when another direct location is invalid.

Preserve XML well-formedness/reference validation and existing decoder behavior; trim extracted text once; preserve literal duplicate identity/order/positions and canonical coverage serialization. Retain the supported unnamespaced/default-namespace local artifacts and scalar/multiple-entry parsing. Preserve reports, raw inputs, exits, symlink/input/output protections and unrelated checks.

This bounded finding checks extracted direct page locations, not full Sitemaps XSD/namespace validation. No new namespace enforcement, index expansion, live fetching, dependency, CLI option, XML format or growth claim.

## Implementation and testing decisions

Keep extraction owned by audit.ts. Replace the recursive loc traversal with a small unknown-safe traversal of the exact root/url/loc path; keep parsing, validation, aggregation and coverage owners unchanged. No general XML-query abstraction or new module is needed.

Use the already accepted real CLI subprocess seam. First retain failing misplaced-location tests and a genuine direct control, then make the smallest extraction correction. Verify root-loc, nested metadata/url, nested loc, wrapped urlset and sitemap-index cases cannot supply page evidence. Controls cover direct and default-namespace extensions, unrelated same-origin/off-origin/duplicate loc values, literal identity/entry positions, and partial coverage with a malformed genuine direct URL. Existing full-suite XML/CDATAliteral/entity controls remain required. Preserve input bytes and all output protections; no private helper tests.

Run typecheck, full tests and build, retain actual raw receipts/runtime/input hashes, complete separate Standards/Spec reviews before source commit, then build a fresh immutable tarball and verify clean installed-consumer behavior. Authenticate retained package evidence before final-head CI, ordinary standing-authorized merge and actual-main proof. Reuse unchanged proof only by exact identities/revision; preserve frozen case artifacts and uploaded ZIPs.

## Evidence and limits

TICKET-033 retains six original CLI inputs/reports/receipts and independent assessment. [Sitemaps protocol](https://www.sitemaps.org/protocol.html), read2026-10-18, defines page entries under urlset/url/loc and a separate sitemap-index structure. Its namespace/schema requirements are broader than this correction; do not claim complete protocol validation from these local checks. No native browser, live indexing or marketplace result.
