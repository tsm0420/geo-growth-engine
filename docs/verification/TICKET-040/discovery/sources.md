# Source boundary notes

Primary read YAML 1.2.2 section 5.2 at https://yaml.org/spec/1.2.2/#52-character-encodings on 2026-10-18. It distinguishes Unicode code points from byte encodings, describes UTF-8/16/32 requirements and BOM detection. This toolkit currently reads YAML through Node utf8 strings; the observed behavior does not establish full YAML encoding conformance. UTF-8 validation is the proposed bounded contract, with existing valid UTF-8 BOM behavior preserved and no new UTF-16/32 decoder. No external excerpt is quoted.

Six actual fictional plan commands retain original bytes/digests. Invalid config-comment bytes are accepted without changing a consumed field; invalid product-claim and question bytes visibly become U+FFFD in the resulting opportunity. Valid literal/escaped U+FFFD and BOM cases remain accepted. Native isUtf8 confirms the actual malformed-versus-valid distinction; a replacement-looking character alone is not an invalid-byte test.
