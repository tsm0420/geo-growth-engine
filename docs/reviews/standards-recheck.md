# Standards follow-up review

Reviewed the refreshed isolated worktree; the initial report is preserved.

## Dispositions

- **Public export root symlink: fixed.** `src/audit.ts:37` invokes the shared path check before traversing the export. The real-CLI regression at `tests/safety.test.ts:19` passes and verifies operational exit 2.
- **Installer target ancestor symlink: partially fixed; remains open.** The new preflight rejects straightforward linked parents and both added CLI regressions pass. However, the path checked and the path resolved are still different representations, permitting the bypass below.

## Remaining documented-standard violation

**[P2] Use the same target representation for checking and resolving.** `src/paths.ts:13` runs `resolve(path)`, removing `..` segments lexically. `src/install.ts:32–34` and `41–43` then call `realpath(target)` on the original string. With `linked -> outside/deep`, a target `root/linked/../project` checks the normalized `root/project` chain but resolves to `root/outside/project`. Both `init` and `install` succeeded and wrote files through the symlink in an independent CLI reproduction. This still violates `docs/spec.md:36`'s no-symlink-target rule. Reuse one checked normalized path for subsequent operations, or inspect raw components before resolving; add the `linked/../project` CLI regression for both commands.

## Verification

Ran numbered reads of the shared helper, callers, and regressions; `npm run typecheck`; `npm test`; and inline `node --input-type=module` CLI reproduction. Typecheck passed and all 21 tests passed on Darwin arm64, Node v24.18.0. [Raw outputs](geo-standards-recheck-receipts.txt) record the remaining bypass. No source edits, index changes, commits, GitHub writes, remote CI, or live-platform checks occurred. No additional actionable heuristic findings in this focused follow-up.
