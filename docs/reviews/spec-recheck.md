# Spec recheck

Reviewed the refreshed nonempty diff against `835338adfea4c187c4a046b014c094ad42ec6e84`, including the clarified path contract, regressions, and current source in `/private/tmp/geo-review-spec`. The original report remains unchanged.

**One remaining finding — [P2] Symlink ancestors hidden by `..` still bypass installation preflight.** `src/paths.ts:13` normalizes the supplied path with `resolve()`, which removes `linked/..` before symlink detection. `src/install.ts:41-42` subsequently calls `realpath()` with the original unnormalized argument, so validation and writing resolve different destinations. Spec: “Do not overwrite or traverse symlink targets; return actionable failure.”

Verified reproduction: create `hidden/linked -> hidden/real/child`, plus both `hidden/project` and `hidden/real/project`; run `install --target hidden/linked/../project`. It exits 0 and creates the five skills in `hidden/real/project`, despite the symlink prohibition. Normalize the installation target once before both validation and resolution, or inspect original path components before any filesystem traversal. `init` shares this sequencing at lines 32-33.

Original findings rechecked:

- Report-file symlinks now return exit 2 and preserve outside owner data. Evidence-directory symlink rejection passes the regression suite.
- Plain symlink ancestors now return exit 2 for `init` and `install`; the `..` variant above remains.
- Canonical-to-root pages under `/blocked/` now fail both crawler checks, with explicit inferred-route evidence.
- The clarified spec states: “Explicit CLI path arguments resolve against the current working directory; absolute arguments work from any directory.” Cwd-relative config/input/output work, and raw evidence is retained. This closes the previous path-contract finding through documentation reconciliation.

No scope creep identified. `npm run typecheck` passed; `npm test` passed 21/21 tests. Additional commands: `git rev-parse 835338a`, `git diff 835338a -- .`, `node .review-artifacts/recheck.mjs`. Receipts, reproduction program, and refreshed diff are in `/private/tmp/geo-review-spec/.review-artifacts/recheck*`. Darwin arm64, Node v24.18.0. Remote Actions, third-party sources, live deployment, and adversarial concurrent filesystem changes were not verified. No source fixes, commits, or GitHub changes were made.
