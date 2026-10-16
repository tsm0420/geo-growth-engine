# Standards review

Reviewed the pre-commit working tree against `835338adfea4c187c4a046b014c094ad42ec6e84`; the diff is nonempty and there are no implementation commits after that baseline, as intended. Inspected source, CLI tests, skills, workflows, configuration contracts, and verification receipts.

## Documented-standard violations

1. **[P2] Reject a symlink used as the public export root.** `src/audit.ts:18–24` checks directory entries but calls `readdir(directory)` before checking `directory` itself. A symlink as configured `publicDir` therefore follows an external directory and exits 0 with 16 passes/0 failures. This contradicts `docs/configuration.md:15` (“symlinks are rejected”) and the self-contained-export contract. Check the supplied export root before traversing it and add a CLI regression covering that root, not only child entries.

2. **[P2] Validate target ancestors before canonicalizing installation destinations.** `src/install.ts:49–52` and `58–63` check only whether the final target is a symlink, then call `realpath`. A symlink parent is erased before `rejectSymlinkAncestors` can inspect it. Reproduction: `init --target <linked-parent>/project` succeeds and writes all three files into the linked location. This violates `docs/spec.md:36`'s no-symlink-target installation rule and `README.md:43`'s claimed rejection. Validate the caller-supplied target chain before resolving it; account explicitly for supported system path aliases. Cover both init and install through the CLI.

## Heuristic smells

No additional actionable Fowler-smell findings.

## Commands and limits

Ran `git rev-parse 835338a`, `git diff 835338a -- .`, `git diff 835338a --stat`, `git log 835338a..HEAD --oneline`, standards-file inventory, numbered source/document reads, `node --version`, `npm run typecheck`, `npm test`, and an inline `node --input-type=module` CLI reproduction. Typecheck passed; all 16 tests passed on Darwin arm64, Node v24.18.0. [Raw execution receipts](geo-standards-review-receipts.txt) include both reproduced gaps. `git diff 835338a --check` reported whitespace in raw verification logs; this mechanically detectable formatting issue is excluded from findings. No source fixes, staging, commits, GitHub writes, remote CI, or live-platform checks occurred.
