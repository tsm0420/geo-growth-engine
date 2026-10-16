# Spec review

Baseline: `835338adfea4c187c4a046b014c094ad42ec6e84`. Reviewed its nonempty working-tree diff in `/private/tmp/geo-review-spec` against `docs/spec.md` and all three tickets.

1. **[P1] Report writes can overwrite files outside the output directory.** `src/report.ts:24-25,33` follows existing report-file symlinks; `src/visibility.ts:91-93` does likewise for evidence. Spec: “Reports are JSON and readable Markdown, written only to the requested output path.” Reproduction: precreate `output/plan.json` pointing to an owner file outside `output`; `plan` exits 0 and replaces that file. Reject symlink destinations/ancestors before writing reports and evidence.

2. **[P2] Installation misses symlinks above the target directory.** `src/install.ts:58-59` checks only the final target and then canonicalizes away ancestors before the deeper checks. Spec: “Do not overwrite or traverse symlink targets; return actionable failure.” Reproduction: `linked -> real`, target `linked/project`; `install` exits 0 and writes five skills under `real/project`. Validate the original target path before canonicalization; `init` has the same sequence at lines 49-50.

3. **[P2] Crawler checks use a canonical destination instead of the audited page.** `src/audit.ts:79-83` passes the canonical URL to robots matching. Spec: “Local audit checks HTML files under one configured public directory, robots.txt, sitemap.xml, metadata, canonical origin, headings/readable content, and JSON-LD syntax.” Reproduction: `/blocked/index.html` canonicalizes to `/`, with `Disallow: /blocked/`; both search bots incorrectly pass and the audit exits 0. Check the exported page's URL separately from canonical/sitemap checks.

4. **[P2] Relative visibility input is working-directory dependent.** `src/visibility.ts:69,98` resolves `--input` against cwd. Spec: “Relative artifact paths resolve against the configuration file, independent of the working directory.” A valid `.geo/records.jsonl` passed as `--input records.jsonl` exits 2 from the project directory. Resolve this path against `config.path` or explicitly reconcile the contract before delivery.

No scope creep identified. Commands run: `git rev-parse 835338a`, `git diff 835338a -- .`, `npm run typecheck`, `npm test`, `node .review-artifacts/reproduce.mjs`. Typecheck passed; 16/16 tests passed. Reproduction script, raw outputs, and reviewed diff: `/private/tmp/geo-review-spec/.review-artifacts/`. Environment: Darwin arm64, Node v24.18.0. Remote Actions, live services, and source URLs were not verified.
