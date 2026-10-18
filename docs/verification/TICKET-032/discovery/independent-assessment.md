# TICKET-031 JSON encoding integrity assessment

**Strict pre-parse UTF-8 validation is justified for both JSON ingress paths.** Source: main `029f917635794f277293f294d26e312e10cfef71`. All 29 packet sizes/SHA-256 values match.

Observed retained executions: four visibility commands and one comparison exit 0. Independent static byte inspection accepts literal EF BF BD and ASCII escaped U+FFFD, but rejects FF and incomplete E2 82 sequences in the supplied answers. Nevertheless malformed visibility inputs become one successful sample, coverage/mentionRate 1 and citationRate 0. Raw-input digests remain correct. This establishes corrupted-record acceptance, not proof that invalid bytes themselves create a false brand mention.

The comparison's before.json is valid U+FFFD; after.json contains FF. Different preserved byte digests become identical parsed ID check-U+FFFD and one unchanged finding. `src/visibility.ts:72` and `src/compare.ts:49` decode through Buffer.toString before parsing. Replacement decoding therefore defeats malformed-record rejection (`docs/configuration.md:82`) and exact-ID comparison (`:35`), despite preserving source hashes.

Minimum acceptance: reject malformed bytes before JSON parsing/statistics/source matching with actionable exit 2; validate both compare sides through their shared reader. Test a valid first JSONL record followed by malformed bytes, fresh and existing outputs, unchanged source/output/evidence bytes, and no partial evidence/report creation. Exercise default and explicit visibility-metric comparison paths without changing their other contracts. Malformed-before comparison is required coverage, not an observation in this packet.

Preserve actual literal/escaped U+FFFD and valid multilingual UTF-8. Validate bytes without silently stripping BOM or changing existing decoding, ignored blank lines, LF/CRLF, empty-input or BOM-handling behavior; retain accepted raw evidence/digests exactly. A fatal decoder that strips BOM would need explicit protection against that behavior change.

No implementation accepted or executed here. Byte/hash/JSON/source inspection only; no product/tests/network/source/index/root/private/other-worktree actions. Duplicate keys, surrogate escapes, normalization and other formats remain excluded.
