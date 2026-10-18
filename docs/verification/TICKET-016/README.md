# Installation destination preflight verification

Source slice: TICKET-016; base 5c8828925d9843daa05d7710a555e5b2d6726e1f. Actual Node v24.22.0, npm 11.19.1, unprivileged macOS arm64; red metadata records actual platform/uid/time. Six new CLI tests execute here, with no permission skips. No Windows/root permission result is inferred.

The initial red regression observes an earlier geo-orchestrator path after the later-parent EACCES. The narrow check makes it green. Final focused run: 13 pass; full suite: 127 pass, zero fail/skip. Typecheck/build exited 0. Each retained JSON names the actual command/exit; adjacent stdout/stderr preserve its real output. The first red run used the initial single regression before its skip flag was renamed and five controls added; the final test file is the reviewed green six-test source.

Separate Standards and Spec reviews are retained under docs/reviews/TICKET-016. Immutable clean-source/extracted-package proof and exact-head PR CI follow as separate delivery gates. Existing Agensi archives and submissions remain unchanged.

## Immutable consumer candidate

Source 7c4fa4b96580856d130215daae6c4b7425388951 passed clean install/typecheck/127 tests/build. Candidate manifest retains runtime, package bytes/digest, 14 actual command outcomes, all 22 installed-file hashes and 37 execution-input comparisons. Tests use fictional inputs; visibility retains exact raw bytes and explicit collection error/unknowns. Original tarball is retained locally, not claimed as a published registry release. Source-head CI job117649510014/run39118641836 succeeded with a full untruncated response in ci-source.json. Final documentation-head CI is separately associated with current PR #19 and local raw delivery receipts.
