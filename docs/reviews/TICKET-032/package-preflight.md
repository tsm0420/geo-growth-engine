# TICKET-032 package harness preflight

**One material proof gap to correct before execution.**

In `/private/tmp/geo032-verify-package.py:85-103`, valid.json, valid.jsonl and escaped.json are consumed by the positive Unicode commands before original_inputs records their digests. Assertions at lines90-98 compare reported/evidence bytes with the current post-run input. A hypothetical input rewrite during those successful commands could therefore go undetected, including normalization of the distinct literal/escaped U+FFFD spellings. This weakens the accepted unchanged-original-byte claim.

Capture expected bytes/digests immediately after each fixture is written, before its first command; assert unchanged input and evidence against those original values after the positive calls and again at final completion. No new suite or product feature is needed.

Otherwise the bounded harness covers immutable-source archive/build/pack/install, 25 tar/built/installed member hashes, exactly four expected changed package inputs, all five report commands, genuine Unicode controls, late malformed JSONL, malformed before/after compare, fresh/existing output preservation and input collision. Static AST inspection confirms the valid fixture really contains U+FFFD, astral and combining characters.

The five skill hashes in historical TICKET-030 match TICKET-028, whose manifest records five successful validators. Exact unchanged-byte checks support that explicitly scoped reuse; no fresh validation/triggering claim is warranted.

This is static code/contract/manifest inspection only. The harness was not executed; no package, test, network, source/index/remote or other-worktree action occurred.
