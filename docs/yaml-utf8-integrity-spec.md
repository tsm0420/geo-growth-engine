# YAML UTF-8 input integrity

Status: Accepted from TICKET-039 actual CLI/native-byte observations and independent assessment; TICKET-040 / issue #40.

## Problem and result

Three actual fictional plan commands at main ea594befaf0827c1b03b264a646abc13df623946 accept invalid UTF-8 bytes in consumed YAML files. Product-claim and question bytes become U+FFFD in successful opportunities; invalid config-comment bytes are accepted without changing consumed field text. Original input files remain unchanged. Three valid literal/escaped U+FFFD, astral/combining and UTF-8 BOM controls succeed. Native byte validation confirms the malformed-versus-valid distinction.

Reject malformed UTF-8 before the YAML parser receives a string. A failure must name the source path and format, exit 2 and preserve all source/prior output bytes. Valid text retains current parser behavior, with no silent repair or blanket rejection of replacement-looking characters.

## Contract and ownership

1. The existing yamlObject loader reads bytes and validates them before decoding/parseDocument. This covers root config, product YAML and queries YAML whenever consumed. Invalid bytes anywhere, including comments, reject before report/evidence writes.
2. Root config and product are still loaded for audit/aso/plan/visibility. Queries remain lazy: only plan consumes their YAML; unused malformed query files must not newly block audit/aso/visibility. Protect their paths through the existing writer without parsing them.
3. One neutral UTF-8 text helper owns validation/decoding for YAML and existing comparison/visibility JSON inputs. Rename the JSON-specific private module/function and update its two existing callers rather than adding a duplicate policy or compatibility wrapper. Explicit JSON/YAML labels preserve the exact established JSON diagnostic and add `YAML input <path> must use valid UTF-8`. No public CLI/import flag or dependency changes.
4. Validation preserves valid bytes' decoded text. The YAML parser continues to handle UTF-8 BOM, literal/escaped U+FFFD, astral and combining characters, duplicate keys, warnings, aliases and version checks. JSON BOM remains rejected by its existing parser; blank JSONL and source digests stay unchanged. This adds no UTF-16/32 decoder or full YAML encoding/schema certification.
5. Existing findings, summaries, data/queryGroups, provenance, comparison range rules, matching and exit semantics remain unchanged for valid inputs. File protection/preflight stays with the existing writer. Remove the obsolete compiled private-helper artifact only if it exactly matches its known previous generated hash; clean immutable builds must contain the new helper and no old helper. Historical receipts retain their old paths.

## Verification seams

Use the approved real CLI subprocess seam. Start with an invalid product fact through plan and existing report sentinels: first-red must observe exit 0 versus expected 2; first-green must reject with source/format and preserve inputs/artifacts. Extend with root config across four commands, query-plan rejection plus unused-query success, representative invalid sequence classes, valid Unicode/escaped/BOM YAML controls and exact old JSON diagnostics/BOM rejection at both JSON ingress paths. Test new helper behavior through public commands, without private-unit seams. Literal expectations come from independent fixtures.

Run typecheck, full tests and build; retain command/stdout/stderr/exit/runtime, original red and source input identities. Require separate Standards/Spec reviews. A fresh immutable archive/build/pack/clean consumer must authenticate the renamed helper inventory and execute baseline commands, YAML boundary/valid controls, existing JSON guard and queryGroups/both compare compatibility, plus input/output protection. Reuse unchanged skill proof only with exact T038 identities. Separate artifact authentication, final-head CI, standing-authorized ordinary merge and actual-main CI remain delivery gates.

## Source and limits

[YAML 1.2.2 section 5.2](https://yaml.org/spec/1.2.2/#52-character-encodings) distinguishes byte encodings and Unicode text and describes broader UTF-8/16/32 and BOM requirements. This toolkit's existing byte-loading path uses UTF-8; documenting and validating that bounded input contract does not claim full YAML processor conformance. The existing parser remains responsible for YAML syntax. No live input collection, paid provider, new product claim, marketplace action or release is added.
