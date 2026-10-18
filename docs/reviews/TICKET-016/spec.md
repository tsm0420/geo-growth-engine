# TICKET-016 independent Spec review

Disposition: no actionable findings.

Reviewed the actual diff and untracked regression file in exclusive worktree `/private/tmp/geo-review016-spec` against base `5c8828925d9843daa05d7710a555e5b2d6726e1f`, the installation-preflight specification and TICKET-016. All three proposal files match `review-snapshot.json` (manifest SHA-256 `26e1d8b72c04a4cd097c2be1c85a9d9122fe5457f7abc89202a1c9df72eaa922`). Source `src/install.ts` SHA-256: `5315c2476fc1837a877c75f675bbdf714d6bd18da831d7d0e2c2e6f199457ed8`; new test SHA-256: `27305027e9051505fc48bd0f786c64a018cb4d5e06aa1b15c9d83cb0c91a828d`.

The implementation checks every destination before the creation loop, finds its nearest existing parent, requires a directory and write/search access, and propagates lookup errors as operational failure. Shared init/install behavior retains source-readability checks, existing-path rejection, symlink-ancestor rejection and exclusive `wx` creation. README claims remain limited to predictable preflight conflicts and explicitly exclude concurrent changes/later I/O rollback.

Observable CLI tests cover the later unwritable parent without earlier creation, permission-restored retry, owner-content preservation, init access/retry, missing parents, existing-file conflicts, unsupported parent types and symlinks. Permission cleanup uses `finally`; root/Windows skips are explicit. Existing helpers invoke real CLI subprocesses; error handling returns exit 2.

Read primary raw receipts: the initial one-test run failed because `geo-orchestrator` was already created; the next run passed. Final focused suite: 13 pass/0 fail/0 skip; full suite: 127 pass/0 fail/0 skip; typecheck and build exited 0. Recorded host: unprivileged uid 501, Node v24.22.0, macOS 26.5.2 arm64. These are inspected primary receipts, not tests rerun by this reviewer.

Clean-source/extracted-package verification, ticket completion and exact final-head PR CI remain upcoming delivery gates. No package, Windows, concurrency, rollback or platform result is inferred. No implementation edits, tests, network calls, commits or Standards-report access were performed.

## Delivery evidence addendum

No actionable findings in the retained primary candidate evidence. Immutable source `7c4fa4b96580856d130215daae6c4b7425388951` matches all three reviewed files and 37 execution-input fingerprints. The 22 packed files match installed consumer bytes/hashes; tarball SHA-256 is `d6ec7021d6712388fee2d682105771f75190013826a8fa877d9de01cd2c285db`. Original clean receipts show typecheck/build success and 127 pass/0 fail/0 skip. All 14 consumer CLI outcomes match expected exits, including blocked-parent/init failures, successful permission-restored retries and conflict/type/symlink controls; visibility evidence digest matches raw bytes. Deprecated dependency warnings remain visible. These are inspected primary executions on unprivileged macOS/Node v24.22.0, not reviewer reruns. Preflight excludes concurrency/rollback guarantees; Windows and Agensi results are unclaimed. Source CI was pending at handoff; final documentation-head CI remains a separate required receipt.
