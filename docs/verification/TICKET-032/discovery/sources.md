# Primary source observations, 2026-10-18

- JSON Lines, https://jsonlines.org/: the format specifies UTF-8 and excludes a leading byte-order mark. The toolkit's documented ignored blank lines remain a deliberate existing behavior; this discovery does not change that policy.
- RFC8259 section8.1, https://www.rfc-editor.org/rfc/rfc8259#section-8.1: interoperable exchange between systems outside a closed ecosystem requires UTF-8. Parser allowance for BOM does not require changing this toolkit's existing BOM rejection. Do not infer a new duplicate-key/surrogate/normalization policy.
- Node24 Buffer API, https://nodejs.org/docs/latest-v24.x/api/buffer.html#bufferisutf8input: built-in UTF-8 validation is a candidate; actual runtime compatibility and invalid/valid byte behavior still require empirical testing before use.

These are primary format/runtime references; observed CLI behavior is separately retained in observations.json. No new source correction is implemented.
