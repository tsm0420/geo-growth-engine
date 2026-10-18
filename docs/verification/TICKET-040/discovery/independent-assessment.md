# TICKET-039 YAML byte-integrity assessment

Confirmed lossy-decoding defect; a bounded UTF-8 input guard is justified. Implementation acceptance remains separate.

I authenticated all 61 packet sizes/hashes, 18 YAML input baselines, six actual plan receipts and matching JSON/Markdown/stdout effects. Supplied source/docs match this worktree. All commands exit 0. Native Node isUtf8 receipts confirm FF is malformed in config/product/query controls. Product-claim and query FF bytes become U+FFFD in successful opportunities; config FF occurs only in an ignored comment, without changing consumed fields. Source snapshots match pre-consumption digests: this is parsed substitution, not original-byte loss or rewriting.

Valid literal U+FFFD, escaped `\uFFFD`, astral/combining text and UTF-8 BOM controls all remain accepted. The BOM control prefixes all three YAML files with EF BB BF. A replacement-looking character alone therefore cannot identify malformed input.

`src/config.ts:30–38` decodes using `readFile(path,'utf8')` before parseDocument. Config/product calls at `:59/:64` and query loading at `:111` share this boundary. Validate the complete raw Buffer before decoding/parsing, with an actionable YAML input-path/UTF-8 error and exit 2 before output/evidence changes. Preserve schema, duplicate-key/warning/alias behavior, path resolution and lazy query loading; do not newly parse unused query files.

Reuse one Node isUtf8 owner. A narrowly renamed `utf8-text` helper with explicit JSON/YAML labels fits the expanded responsibility better than duplicating validation or using a JSON-labelled YAML error. Preserve exact existing JSON diagnostic wording; pass decoded BOMs through unchanged so JSON still rejects them while YAML retains its observed parser acceptance. No wrapper, dependency or general filesystem abstraction is needed.

Real-CLI regression controls should cover all three boundaries, malformed sequences/comments, fresh/existing output preservation, unchanged inputs, legal Unicode/escapes/BOM and both existing JSON callers. Preserve ordinary YAML parser failures independently.

Supplied YAML 1.2.2 section 5.2 notes discuss UTF-8/16/32 and BOM detection. This toolkit's UTF-8 path is narrower: the correction supplies neither a UTF-16/32 decoder nor full YAML encoding conformance. No product/parser/tests/network execution or agents were used by this assessor.
