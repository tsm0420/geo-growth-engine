# TICKET-012: XML reference validity research

Observed 2026-10-17 UTC, read-only worktree revision `ba40c31057f3dd748a821f5a3d8b701c5f793acb`; Node v24.18.0 / Darwin 25.5.0 arm64. No source edits or package installs. Current audit implementation remains unchanged from this revision; this research does not validate later fixes.

## Verified normative facts

[XML 1.0 §4.1](https://www.w3.org/TR/xml/#sec-references) requires a semicolon and at least one decimal digit, or lowercase `x` plus hexadecimal digits; referenced characters must be legal XML characters. Without a supported DTD, only `amp`, `lt`, `gt`, `apos`, `quot` need no declaration ([§4.6](https://www.w3.org/TR/xml/#sec-predefined-ent)). Names are case-sensitive.

[§2.2](https://www.w3.org/TR/xml/#charsets) permits U+0009/U+000A/U+000D, U+0020–D7FF, U+E000–FFFD and U+10000–10FFFF. This excludes null, other low controls, surrogates, FFFE and FFFF; discouraged higher-plane noncharacters are not categorically forbidden.

[CDATA](https://www.w3.org/TR/xml/#sec-cdata-sect), [comments](https://www.w3.org/TR/xml/#sec-comments) and [processing instructions](https://www.w3.org/TR/xml/#sec-pi) do not recognize reference-looking text as references; actual characters still obey XML Char. Comment double-hyphen syntax remains the existing validator's responsibility. [§4.4.2](https://www.w3.org/TR/xml/#included) prevents newly produced ampersands from starting another reference expansion. Thus `&amp;#0;` and `&amp;bogus;` are valid literals, not invalid references to rescan. DTD support is intentionally excluded by the toolkit contract.

## Verified installed behavior

The captured official [fast-xml-parser v5.11.2 validator source](https://github.com/NaturalIntelligence/fast-xml-parser/blob/v5.11.2/src/validator.js) matches the installed file byte-for-byte. `validateNumberAmpersand` checks digits until semicolon without requiring any digits or checking Char; `validateAmpersand` accepts arbitrary word-like names. Attribute validation does not check references. The public validator has no strict entity-declaration/character-policy option in the installed typings (only Boolean-attribute and unpaired-tag options). Those typings also mark `XMLValidator` deprecated in favor of `fast-xml-validator`; no replacement package was installed or proven to fix these vectors, so a migration alone is not an evidenced correction.

The installed `@nodable/entities@3.1.0` exposes `numericAllowed`, `ncr`, `postCheck` and expansion limits; fast-xml-parser accepts a decoder with `decode/reset/setXmlVersion/setExternalEntities/addInputEntities`. Local code and the [official decoder documentation](https://github.com/nodable/val-parsers/blob/main/Entity/docs/EntityDecoder.md) agree that decoding is single-pass and unknown references remain literal. The live documentation is dated evidence, not a claim about an immutable upstream main revision.

Actual policy probe: default decoding removes `&#0;`, `&#1;`, `&#xD800;`, allows FFFE, and leaves out-of-range references unchanged. `nullNCR: 'throw'` fixes only null. `onNCR: 'throw'` throws for valid `&#38;` too and still leaves `&#x110000;` literal. None is a complete strict-validation switch.

## Actual CLI observations and correction recommendations

Thirty matrix commands plus one long-reference command were executed. Sixteen malformed vectors returned exit **0**, sitemap **pass**, duplicates **pass**: unknown/HTML-only names, null/low-control/surrogate/FFFE/FFFF/out-of-range/empty NCRs, malformed attribute references, and actual NUL inside a comment. The existing malformed-hex vector already returns exit **1**, sitemap **fail**, duplicate **unknown/null**. Valid named/decimal/hex, escaped-literal, CDATA/comment/PI, C1 and upper-range controls passed. DTD/custom-entity input remains rejected.

Recommended narrow implementation: validate original source before decoding/counting. Check actual Char code points throughout the document. Recognize references only outside CDATA/comments/PIs, including attribute values and ignored element text. Require complete token spelling, the five permitted named tokens, and exact allowed code-point ranges; reject, never remove/repair prohibited input. Retain structural validation, DTD exclusion and expansion limits. Any supported replacement for the deprecated validator needs the same actual vectors before claiming equivalent behavior; this research does not authorize an untested dependency migration. Validation failure becomes the specified sitemap fail/duplicates unknown/null/exit1. Do not inspect only decoded loc values: malformed references can be hidden elsewhere, while escaped valid literals can resemble invalid references after decoding.

One positive-control pitfall was independently reproduced: the decoder scans at most 32 characters to a semicolon. A valid decimal reference containing 40 leading zeroes followed by 38 remains literal. Against the equivalent `&amp;`, CLI reports 3 unique URLs/exit0 instead of 2 unique URLs/one excess duplicate/exit1. Include this control under valid-reference preservation. A possible correction is compacting already validated numeric spellings inside the decoder's original-input pass before delegation; do not decode twice or rewrite CDATA/comment/PI text. This is a recommendation, not an implemented/proven correction.

Suggested minimal regression groups: malformed names/numeric ranges and empty forms in text/attributes; valid XML Char boundaries; unchanged literal reference-looking CDATA/comment/PI and escaped ampersands; valid long-leading-zero identity; existing named/decimal/hex duplicate fixture and DTD rejection. Re-audit the frozen input without altering it.

## Receipts and limits

The original research tree, official response bodies and installed-source copies are retained locally at `reports/research/xml-references/` (ignored). Public `docs/verification/TICKET-012/research/` retains a manifest and ZIP of original synthetic CLI fixtures/reports/outputs, identity/policy probes and source URL/time/status/hash metadata; scripts and full third-party source bodies are excluded. Archive paths/hashes are explicit, not a claim that every local research file is published.

No full-suite/typecheck run, conformance certification, namespace/schema expansion, external-entity resolution, XML 1.1 support, encoding/BOM audit, live-site inspection or production changes are claimed by this research. Recommendations require primary implementation, real red/green tests and independent review.
