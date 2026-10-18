# TICKET-030 correction preflight addendum

**Both original planned-evidence gaps are resolved statically.** Preserved original harness SHA-256 `9b1c53b9cf741cebe23019cbc45e7e93590741b477da0002e306be931de80ac4` matches the first preflight. Corrected harness SHA-256 is `fb6a2e25e1bcf2e3d5596d7095d87349311cd4dd13f0e58e67ffe87cb081bc55`.

The existing visibility case now asserts `data.sha256` equals the actual input-byte digest; the raw-evidence equality check remains. The renderer now records both resolved marked/Cheerio entry paths, package versions, entry-file SHA-256 values and `gfm:true` options in `renderer-identity.json`, then embeds that identity in the final manifest. Its scope explicitly remains local parser/DOM inspection with entry-file hashes.

Reviewed the exact old/new diff only; the original preflight report is unchanged. No product/package/harness execution is claimed. Source Spec review, immutable commit, actual execution and later artifact authentication remain separate gates. No source/index/network/test, private or other-worktree action occurred.
