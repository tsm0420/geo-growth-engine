# Core hardening specification

## Problem and solution

The completed TICKET-007 audit reproduced seven correctness/integrity gaps within the existing core. Correct these through narrow independently verifiable slices, preserving local-input scope, original evidence and the existing CLI seam. The [audit data](verification/core-gap-audit/manifest.json) pins the original source/runtime/commands; reports distinguish observed coverage from untested behavior.

## User stories

1. As a user, report generation preserves my supplied files and an existing evidence/report pair when a predictable destination conflict prevents writing.
2. As a user, malformed optional collection values are operational errors rather than silently empty data.
3. As a researcher, Markdown underscores around a brand do not suppress measured mentions.
4. As a site owner, malformed XML receives a failed finding rather than repaired success.
5. As a site owner, crawler checks use correctly encoded export filenames, and canonical coverage compares URL representations consistently.

## Decisions and acceptance

### TICKET-009: report integrity (V1, V2)

Protect configured input files (`config`, `product`, `queries`) and visibility `--input` from every report/evidence destination, including normalized-path and existing filesystem aliases. Reject a collision with actionable exit 2 before modifying output. Symlink destinations/ancestors remain rejected. Preflight all existing destination types and ancestors, plus applicable write access, before writing any artifact. A directory at a report/evidence filename or a file at an ancestor is an operational error; preserve previous regular report/evidence bytes. Normal reuse of an output directory still replaces prior outputs when safe.

This is deterministic preflight, not a multi-file transaction or a promise of rollback after disk exhaustion, power loss or hostile concurrent filesystem changes. State that limitation explicitly. Those unobserved failures are not claimed fixed. The real reproduced EISDIR case must no longer replace JSON before reporting failure. No API mocks or injected production no-ops.

A further in-scope CLI reproduction found hard-linked JSON/Markdown destinations could overwrite each other and still return success. Reject multiple destinations aliasing the same existing file before writing; preserve their prior bytes. The raw red receipt is in TICKET-009's verification directory.

### TICKET-010: optional collection types (C1)

Default aliases, competitors, listings and listing factIds only when omitted. Explicit null is an incompatible list/object type: exit 2, no report. Preserve omitted-field defaults, valid empty collections, and intentional null fact sources as evidence gaps.

### TICKET-011: measured mention boundaries (V3)

Use the documented case-insensitive Unicode letter/number boundaries for brand, alias and competitor matching. Underscores are delimiters; `_Example Journal_` and `_Other Journal_` count. Embedded letter/number substrings remain excluded. Preserve denominators, groups, raw bytes and unknown recommendation/provenance status.

### TICKET-012: XML well-formedness (FS-001)

Reject undeclared named entities and prohibited numeric character references before sitemap evidence/counting. Malformed input produces sitemap fail, duplicates unknown/null, and exit 1. Preserve valid XML named/decimal/hex references and single-pass escaping; DTD/custom entities remain unsupported. This does not add schema or namespace adapters.

XML research addendum before implementation: validate XML 1.0 Char ranges throughout the source, including ignored attributes/sections. Recognize references outside CDATA/comments/processing instructions only, without rescanning escaped output. Preserve valid named/decimal/hex forms and long leading-zero numeric spellings: a recorded CLI positive control found the installed decoder's 32-character scan cap wrongly separates equivalent URLs. Reject invalid input rather than removing/repairing it; retain existing structural validator, DTD exclusion and expansion limits. XML 1.1, encoding certification and schema/namespace expansion remain outside scope.

### TICKET-013: crawler URL inference (FS-002)

Encode filesystem path segments when deriving URLs; retain directory separators and the existing index-file convention. Literal #/?/% characters remain path characters rather than fragment/query/escape syntax. Matching encoded Disallow rules fail the search checks. Keep canonical coverage and inferred crawl paths separate; deployment routes remain unverified.

### TICKET-014: canonical sitemap coverage (FS-003)

Serialize both decoded sitemap locations and the canonical through the same HTTP(S) URL representation for coverage. Bare origin versus slash and apostrophe versus its URL-serialized encoding cover the same canonical. Preserve decoded original strings and exact duplicate identity/counts; do not collapse distinct path case/trailing slashes or reorder queries. Invalid sitemap entries remain failed evidence.

## Testing seams and implementation order

Use the already agreed real CLI subprocess seam, independent literal expectations, temporary local inputs, actual output bytes/exits and raw red/green receipts. Follow 009 -> 010 -> 011 -> 012 -> 013 -> 014 for single-writer source execution and explicit stacked-PR bases, although each behavior is independently specified. Test source/input aliases, destination type/ancestor conflicts and normal reuse; null versus omitted/empty collections; underscores versus embedded names; malformed versus valid escaped XML; encoded crawl paths; and equivalent versus distinct coverage URLs. Run required checks and separate Standards/Spec reviews per slice before source commits.

## Delivery and exclusions

Each slice delivers a reviewable PR with its prerequisite base and current exact-head CI. Candidate package proofs pin immutable source and file hashes. Existing accepted upstream issue #7 remains open. Preserve frozen YinThread body/history bytes and unknowns. No live crawl, semantic schema validation, paid sampling, production fixes, merge, tag or release. Agensi preparation stays in TICKET-008 and consumes a reviewed candidate; submission remains separately gated.
