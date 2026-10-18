# Local report comparison

## Problem statement

The active development goal includes comparing later observations. Users currently retain separate JSON reports and must manually inspect finding changes after a fix. A bounded first-use audit found no confirmed defect, so this is an explicitly scoped usability feature, not a bug claim.

## Solution

Add `compare --before <report.json> --after <report.json> --output <directory>`. Produce `compare.json` and `compare.md` using the existing report format. Compare exact finding IDs in two local reports of the same supported kind and fictional/actual classification. This is structural comparison; product identity, collection conditions and growth attribution remain unknown.

## User stories

1. As a toolkit user, I see added, removed, status-changed, details-changed and unchanged findings after a fix.
2. As a researcher, I retain unknowns and inspect both source observations without interpreting a removed check as resolved.
3. As a maintainer, I reject ambiguous or incompatible inputs and preserve source files before report writes.
4. As a reviewer, I can reproduce the comparison from local inputs without paid APIs or configuration access.

## Implementation decisions

The additive command needs before/after/output, without config. Resolve explicit paths against the current directory. Accept schemaVersion 1 and kinds audit, aso, plan and visibility; both sources must share kind and boolean example. Validate objects, nonempty kind/generatedAt/scope/ID strings, findings arrays, unique exact IDs, status pass/fail/unknown, string evidence/action (empty allowed), a present opaque data field, and nonnegative integer summary counts consistent with findings. Reject malformed JSON or incompatible structure before creating outputs. Supplied timestamps and provenance are retained, not authenticated. No recursive compare input or metric comparison.

Match IDs exactly and sort their union by code-unit order. Classify added/removed first, then status-changed, then details-changed when evidence or action differs, otherwise unchanged. No path/case/whitespace normalization; path-only evidence differences remain literal changes. Include every ID, full before/after findings or null, literal category counts, and both full parsed input documents with resolved paths and SHA-256 digests of their original bytes in data. The original files remain the raw evidence; embedded parsed objects do not preserve original JSON formatting.

Each output finding uses `finding:<source ID>` and the after status when present, otherwise unknown. Its evidence names the category and both statuses/evidence/actions; data preserves structured originals. Add an unknown `comparison-scope` finding stating identity/conditions/attribution are unverified, with instructions to inspect scope, input data and collection conditions. A removed failure therefore becomes unknown, not pass. Existing CLI exit policy applies to this report: 1 if any after finding fails, 0 otherwise including unchanged failures removed or unknowns, 2 for operational/input errors. This does not certify improvement or identical cohorts. Output example equals the shared input example flag.

One module owns reading/validation/classification. Keep the existing report writer and protect both input paths (including inode aliases) through its full output preflight. No new raw-file writer, dependencies, telemetry or network access. Preserve other command semantics. README/configuration documentation must distinguish this unmerged candidate from the published alpha 1; Agensi ZIPs remain pinned.

## Testing decisions

Use the previously approved real CLI subprocess seam, isolated local JSON/files and observable JSON/Markdown/stdout/stderr/exit codes. Start with one red/green tracer bullet comparing an actual audit before/after a supplied local HTML edit. Then cover all status transitions, categories, exact IDs/order, removed failures, unchanged after failures, no-finding reports, fictional labels, all four source kinds and retained original input bytes/digests/documents. Reject missing arguments, malformed/type-invalid/duplicate/inconsistent reports, incompatible kinds/example/schema and recursive compare reports before output. Exercise both input overwrite aliases and later output conflicts preserving existing artifacts. Run typecheck/full suite/build, separate Standards/Spec reviews, clean-source/extracted npm-consumer behavior and exact-head PR CI; retain raw commands, exits, runtime, revisions and hashes.

## Out of scope

Rate deltas, ranking/growth attribution, identity authentication, cohort equivalence, field-level data diff, schema migration, live fetching, provider sampling, auto-fixes, publishing, dashboard, transactional disk/concurrency recovery and Agensi resubmission.

## Further notes

TICKET-018 is one reversible local CLI slice on open/unmerged PR #19 and its prerequisite chain. The continuous goal remains active after delivery. Future comparisons with shared identity/collection metadata need their own contract; this command must not imply that capability.
