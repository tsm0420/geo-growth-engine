# Reject malformed UTF-8 at JSON import boundaries

Status: Accepted evidence-integrity correction; TICKET-032 / issue32.

## Problem and user benefit

Five actual fictional CLI outcomes at main029f917 show malformed FF/truncated E2 82 bytes inside visibility answers accepted as one successful sample, and an invalid compare ID collapsing to a valid U+FFFD ID with an unchanged finding. Raw bytes/digests remain intact; decoded content silently changes. This does not prove a false brand match. Users need a visible input error rather than a report based on repaired text.

## Contract

Reject malformed UTF-8 in the complete visibility JSONL file and either compare JSON file before decoding/parsing, with exit2 and an error naming the input and UTF-8 requirement. No report/evidence file is created or replaced. Do not salvage valid records from a corrupt file. The original input bytes remain untouched.

Valid literal U+FFFD, ASCII JSON escapes, astral and combining characters remain accepted with exact parsed content and raw input/evidence hashes. Existing JSON/schema validation, BOM rejection, ignored JSONL blank lines, empty-input null rates, comparison categories/default opaque data, flags and filesystem protections remain unchanged. A BOM is valid UTF-8 but remains rejected by the existing JSON parser; do not silently strip it.

As an importer, I can identify the malformed file and correct its encoding without losing prior evidence. As a comparison reader, I can trust that distinct original IDs were not silently conflated by lossy decoding. As a user with valid Unicode data, I retain my original text and byte-level traceability.

## Implementation and testing decisions

Use one small shared JSON text decoder: validate the supplied Buffer with Node's built-in isUtf8, throw an actionable error, then perform the existing UTF-8 decoding. The two callers retain file IO, JSON/record validation, grouping, comparison and hashing ownership. No dependency or generic file-reading abstraction.

Use the already accepted real CLI subprocess seam. First retain a failing visibility rejection test and implement its minimal boundary; then retain failing before/after compare rejection tests and wire the same boundary. Add bounded malformed-sequence controls (invalid byte, truncation, overlong, encoded surrogate and above Unicode maximum), a corrupt later JSONL record, preexisting outputs/evidence and fresh-output absence. Verify literal/escaped U+FFFD, astral/combining content, exact IDs/evidence/source digests, BOM rejection, blank/empty input and ordinary invalid JSON behavior. Test observable commands, not private helpers.

Run typecheck, full tests and build with raw receipts, runtime and input hashes. Complete separate independent Standards and Spec reviews before source commit. Verify a fresh immutable package in a clean installed consumer, then authenticate its retained evidence. Complete exact-head PR CI, ordinary merge under standing consent and actual-main proof. Preserve historical receipts, frozen case data and marketplace ZIPs. No redundant full reruns without changed inputs or unresolved concerns.

## Scope and primary references

No duplicate-key or JSON surrogate-escape policy, Unicode normalization, other formats, size/streaming changes, new command/flag/dependency, live collection, release or marketplace resubmission. This is bounded validation of two JSON byte entrances, not toolkit-wide encoding certification.

TICKET-031 retains original bytes, five actual command outcomes and independent static assessment. Native Node24.22.0 validation was empirically checked on nine valid/invalid controls. [JSON Lines](https://jsonlines.org/) requires UTF-8; existing toolkit blank-line behavior remains deliberate. [RFC8259 section8.1](https://www.rfc-editor.org/rfc/rfc8259#section-8.1) defines UTF-8 exchange; [Node24 buffer.isUtf8](https://nodejs.org/docs/latest-v24.x/api/buffer.html#bufferisutf8input) documents the built-in validator. No platform rule changes.
