# TICKET-013 verification

Actual runtime: Darwin 25.5.0 arm64, Node v24.18.0 / npm 11.16.0, 2026-10-17. Original command/time/exit JSON and stdout/stderr are retained. Inputs are synthetic local exports.

New real CLI regression failed before correction: the blocked literal #notes.html path incorrectly passed Googlebot access. Encoding path segments then passed all six safety tests. The regression also checks literal ?/% filenames, space-containing directory/index inference, both search bots, allowed ordinary/root paths, canonical/sitemap independence, informational training status and unmeasured deployment behavior.

`npm run typecheck`, `npm test` (109 passes, zero failures/skips) and `npm run build` exited 0. Separate reviews, immutable package proof and final-head PR CI remain pending.

## Review correction

Initial Spec review found a literal POSIX backslash filename was converted into an invented directory before encoding. Original probe data is retained in `spec-backslash-probe.zip`; its manifest maps literal filename backslashes to portable archive names and hashes unchanged content bytes. Full original paths/data remain in the ignored local tree noted there, so no uncheckoutable POSIX filename is introduced into the repository.

`backslash-red` records the actual false-success exit 0 instead of 1. Converting only the host platform separator preserves filename data; `backslash-green` passes all seven safety tests. The new filename test explicitly skips on Windows because that literal filename cannot be created there; this Darwin execution had zero skips. `typecheck-final`, `tests-final` (110 passes, zero failures/skips), and `build-final` each exited 0. Earlier six/109-pass receipts remain historical; initial reports are retained separately. Both axes must independently reassess the changed proposal before source commit. No Windows device execution is claimed.
