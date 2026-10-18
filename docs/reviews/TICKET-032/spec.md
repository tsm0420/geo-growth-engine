# TICKET-032 independent Spec review

No actionable findings.

## Snapshot and coverage

Baseline: `029f917635794f277293f294d26e312e10cfef71`; commit range contains planning commit `89c5dea` only. Reviewed the actual working-byte diff and explicit untracked `src/json-text.ts` and `tests/json-utf8.test.ts`, not the planning commit as executable candidate. All 71 manifest sizes/hashes match both the immutable snapshot and my copied files. Manifest SHA-256: `aa16e6b3806e6238abcfa83d10ba78cd698511cb85e23a5fac94eba9a5ab5d02`. All 32 primary checked-input identities also match.

## Assessment

The contract requires “Reject malformed UTF-8 in the complete visibility JSONL file and either compare JSON file before decoding/parsing” and “No report/evidence file is created or replaced” (`docs/json-utf8-integrity-spec.md:11`). The shared decoder validates the complete Buffer with built-in `isUtf8` before `toString`; both comparison sides call it, and visibility calls it before splitting or parsing records. CLI error handling supplies exit 2, while report/evidence writes occur only after successful import. Errors identify the resolved input and UTF-8 requirement.

The correction preserves the specified valid literal/escaped U+FFFD, astral/combining text and original byte/hash ownership. No normalization or BOM stripping is introduced; JSON/schema errors, blank/empty visibility handling, null rates, exact comparison categories, default opaque data and optional metric validation retain their existing paths. Dependencies, CLI flags and filesystem protection code are unchanged.

Twelve observable CLI tests cover both comparison sides, five malformed-sequence classes, late corruption, preexisting/fresh output protection, Unicode positive controls, raw evidence/digests, BOM/JSON errors and empty inputs. Retained primary red/green outputs show the intended rejection failures and fixes; primary Node24.22.0 receipts record 206 passing tests, zero failures/skips, typecheck/build exit 0.

## Limits

Static review and evidence authentication only; I ran no product, tests or network operations and read no Standards report. Fresh immutable package/consumer verification, exact-head CI, merge and actual-main proof remain subsequent delivery gates. Historical artifact preservation outside this pinned packet was not independently resampled.
