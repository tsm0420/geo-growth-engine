# TICKET-011 Spec review

**No actionable introduced Spec defects found.** Reviewed the actual proposal against fixed base `f33ec8eef40d29dc169f080de50e7d6525a48a61` (PR #12 head), including untracked verification files. Runtime scope is the mention matcher in `src/visibility.ts`; other changes add its CLI regression, matching configuration/changelog guidance, evidence and planning/prior-slice bookkeeping.

The change implements the specified contract: “Use the documented case-insensitive Unicode letter/number boundaries for brand, alias and competitor matching. Underscores are delimiters ... Embedded letter/number substrings remain excluded.” Both boundary character classes now exclude only Unicode letters/numbers, while literal-name escaping and case-insensitive Unicode matching remain intact. Brands, configured aliases and competitors continue using the same matcher. Sample/group aggregation, citation ownership, raw-evidence handling and unknown recommendation/provenance status are unchanged.

Actual verification: ran `node --test tests/visibility.test.ts` in the assigned worktree; **5/5 tests passed, zero skipped**. The new real CLI fixture independently asserts underscore/punctuation and case-insensitive special-character alias matches; rejects Unicode-letter/numeric adjacency on either side; and checks attempted/success/error counts, aggregate and per-surface rates, competitor counts, citation rate, null recommendation rate, fixture labelling and exact raw bytes/SHA-256. Existing empty/error/malformed input regressions also passed.

Read the saved red/green, typecheck, full-suite and build receipts: expected failing boundary baseline, corrected focused result, and typecheck/70-pass suite/build exit 0. Those broader checks were not rerun by this reviewer. Dependencies were reused from the supplied APFS copy of the locked tree; no clean install is claimed. Runtime: Node v24.18.0, Darwin arm64.

No tracked edits, commits, network requests or other-worktree access occurred. Candidate/package proof, ticket completion and final-head CI remain delivery gates. Other queued defects are outside this slice. This is the independent Spec axis only.
