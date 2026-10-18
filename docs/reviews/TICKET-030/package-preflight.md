# TICKET-030 planned package-proof preflight

Static harness SHA-256 `9b1c53b9cf741cebe23019cbc45e7e93590741b477da0002e306be931de80ac4`. **Two bounded proof gaps:**

1. **Renderer identity is not retained (lines114–117,132–142).** The script resolves bundled marked and consumer Cheerio, but records neither resolved entry/version nor file digest. A later claim of the actual renderer version/hash cannot be authenticated from row output alone. The specification explicitly requires renderer identity/version/options/hash. Save those fields with the existing `gfm:true` options and renderer receipt; no additional rendering case is needed.
2. **Visibility evidence metadata digest is unchecked (lines75–81,100–101).** Raw evidence equals its input, but `visibility.json`'s `data.sha256` is never compared with those bytes. An incorrect report digest could pass the claimed evidence/digest preservation gate. Add that equality to the existing visibility case and retain its original report/raw bytes.

AST-only inspection confirms actual CRLF in `query_id` and separate CR/LF in `query_text`; this is not a product execution. The plan assertions preserve the exact ID and complete research-gap query object. Compare retains parsed source documents and byte digests. Planned renderer checks cover all five report row counts/status sequences and literal plan/compare IDs.

The full immutable commit, fresh archive/build/tarball,24 installed-versus-tar/built byte comparisons, exact two changed inputs, real installed commands, input collision and unchanged-five-skill digest reuse are appropriately bounded. Reused validation names its original revision and excludes new agent-trigger claims.

The harness/package has not executed in this review. Separate194-test source proof, actual renderer execution and final-head CI remain external gates; no source/index/network/product/test or other-worktree action occurred.
