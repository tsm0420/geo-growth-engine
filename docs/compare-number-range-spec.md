# Preserve comparison metadata within supported numeric range

Status: Accepted evidence-integrity correction; TICKET-036 / issue36.

## Problem and user benefit

Three actual fictional comparisons and native Node24.22.0 parser probes at main7d0ab6e distinguish finite1e308 from exponent literals ±1e400. All commands succeed, but overflow values become null in both embedded source documents at nested data, finding extensions and report extensions. Original input bytes/digests and finding categories remain correct. Users need an explicit unsupported-range error instead of changed retained metadata.

As a reviewer, I retain supported parsed source values and can identify an unsupported input before reports are created or replaced. As a default-mode user, my ordinary opaque data remains free of visibility-specific semantic validation.

## Contract

Reject a nonfinite parsed number anywhere in either retained comparison report, including nested arrays/objects, finding/summary/report extensions and opaque data. Both default and explicit visibility-metrics modes use the same guard. Produce an actionable input-path/range error and exit2 before writing. Do not substitute null, stringify numeric values, salvage part of a document or mutate source files.

Keep existing report/UTF-8/JSON/schema/kind/example validation and explicit visibility metric validation first. Preserve its established side/field diagnostics, including after data.totals.citationRate for1e400. Then check whole-document numeric representability before finding classification/writer entry. Default mode still does not validate totals semantics; finite numbers, explicit nulls, numeric-looking strings and ordinary opaque structures retain their existing parsed values. Original bytes/digests remain exact; original JSON formatting is not promised by embedded parsed documents.

No arbitrary-precision, safe-integer, finite-rounding, underflow, duplicate-key, string/Unicode, other-format or visibility-JSONL policy. Valid JSON numeric syntax can exceed the runtime range; do not call1e400 malformed JSON. Existing metric count/rate constraints and null denominators remain separate.

## Implementation and testing decisions

Keep the representability guard local to compare.ts and visit both complete retained reports after optional metrics validation. Use an unknown-safe traversal without a new dependency, generic parser or filesystem owner. Avoid adding recursion/argument-spread limits to ordinary large opaque containers. Readers retain source/hash/schema ownership; the writer retains output preflight.

Use the already accepted real CLI seam. First retain one failing default-mode overflow rejection and implement the full path. Then independently exercise nested data, finding, summary and report extension positions; both input sides/signs/modes; fresh output absence, preexisting JSON/Markdown sentinels and unchanged input bytes. Positive controls retain large finite values, ordinary numbers/nulls/strings/arrays/objects, full parsed documents/digests and classification. Existing explicit nonfinite citationRate diagnostics and default opaque-versus-explicit semantic tests remain required. No private helper tests.

Run typecheck, full tests and build with raw receipts/runtime/input hashes. Complete separate independent Standards/Spec reviews before source commit, fresh immutable installed-package proof and artifact authentication, final-head CI, ordinary standing-authorized merge and actual-main verification. Preserve old receipts, frozen case artifacts and submitted ZIPs. Reuse unrelated proof only by exact identities/revision.

## Evidence and limits

TICKET-035 retains30 original CLI/native-parser files and independent assessment. [RFC8259 section6](https://www.rfc-editor.org/rfc/rfc8259#section-6), read2026-10-18, permits implementation range/precision limits and identifies very large exponents as an interoperability concern. This correction only rejects nonfinite runtime results; it does not certify arbitrary decimal precision or change metrics into authenticated measurements. No new command/flag/dependency, live collection, release or marketplace action.
