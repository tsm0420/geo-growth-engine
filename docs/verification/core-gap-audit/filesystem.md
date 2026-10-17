# TICKET-007 filesystem and web-audit investigation

Date: 2026-10-17 UTC. Source: `9b6b59ef0d6c3230fd54b6f756f449718dc88f83`, isolated worktree `/private/tmp/geo-core-gap-filesystem-worktree`. Actual runtime: Node v24.18.0, Darwin arm64. No tracked edits, commits, external requests, or production-site access. No critical data-loss defect was reproduced in init/install. Three concrete audit defects are suitable for a bounded core-hardening queue.

## FS-001 — P2: malformed XML becomes successful sitemap evidence

**Contract:** `docs/configuration.md`, Audit report: “Missing, malformed, or unsupported sitemap input yields unknown duplicates with `data.sitemap: null`, while the existing sitemap check fails.” `docs/sources.md` also identifies XML well-formedness as a checked distinction.

**Location:** `src/audit.ts:65-77`; the existing validator accepts inputs that the decoder either leaves unresolved or silently repairs. The subsequent on-origin URL check treats them as a valid sitemap.

**Minimal actual CLI cases:**

- `sitemap-undeclared-entity`: retain the valid root entry and add `<loc>https://example.com/?q=&unknown;</loc>` without a DTD/entity declaration. Actual exit **0**, sitemap **pass**, duplicates **pass**, non-null two-entry summary.
- `sitemap-prohibited-reference`: use `<loc>https://example.com/&#0;</loc>`. Actual exit **0**, sitemap **pass**, duplicates **pass** and one-entry summary for the silently repaired root URL.

**Independent literal expectation:** both documents are malformed XML. Python's standard-library XML parser rejects the exact saved bodies with `undefined entity` and `reference to invalid character number`. Expected CLI behavior is sitemap fail, duplicate unknown/null, and exit 1, matching the existing malformed-sitemap contract. This is XML well-formedness, not a request for sitemap-schema validation.

**Impact and narrow correction:** invalid artifacts receive success-shaped technical evidence; prohibited references can be removed before coverage/counting. Make malformed reference handling explicit and reject these inputs without silently repairing them. Add real CLI regressions for undeclared named references and prohibited numeric references, alongside valid named/numeric and escaped-literal controls. Preserve DTD rejection and existing exit conventions.

**Receipts:** `sitemap-undeclared-entity.json`, `sitemap-prohibited-reference.json`, their `cases/*/public/sitemap.xml` and `cases/*/results/audit.{json,md}`, plus `independent-oracles.json`.

## FS-002 — P2: reserved filename characters change the URL used for crawler checks

**Contract:** `docs/spec.md`: “Local audit checks HTML files under one configured public directory ... Reports include source path and check evidence. Robots checks include Googlebot, OAI-SearchBot, GPTBot, and Google-Extended separately.”

**Location:** `src/audit.ts:104,108-112`. A raw filesystem-relative path is passed to `new URL()`. Literal `#` and `?` in filenames become URL fragment/query syntax instead of percent-encoded path characters.

**Minimal actual CLI cases:**

- `crawler-hash-filename`: add `public/blocked#page.html`, canonical/sitemap URL `https://example.com/blocked%23page.html`, and `Disallow: /blocked%23page.html`.
- `crawler-query-filename`: use `blocked?page.html`, its `%3F` URL, and matching Disallow rule.

Both commands exit **0** and report both search bots **pass**. Evidence reveals the wrong inferred URLs `.../blocked#page.html` and `.../blocked?page.html`. Querying the existing robots dependency at the independently supplied literal encoded URLs returns **false** for both bots.

**Impact and narrow correction:** a blocked exported page is reported accessible because a different path is checked. Encode filesystem path segments before constructing the inferred URL, preserving only directory separators and the documented index-file convention. Keep deployment routes explicitly unverified and keep canonical/sitemap checks separate. Add CLI cases asserting the exact inferred URL, bot failures, and exit 1 for both reserved characters.

**Receipts:** `crawler-hash-filename.json`, `crawler-query-filename.json`, saved fixtures/reports, and `independent-oracles.json`.

## FS-003 — P2: asymmetric URL serialization produces false coverage failures

**Contract:** `docs/spec.md` includes sitemap-entry auditing; README describes the audit's sitemap coverage check. The explicitly exact spelling rule in `docs/configuration.md` applies to duplicate identity, not a license to falsely report that an equivalent canonical resource is absent.

**Location:** `src/audit.ts:101-106`. The canonical is serialized through `new URL(...).href`; extracted sitemap locations remain raw decoded strings, then `includes()` compares the two representations.

**Minimal actual CLI cases:**

- `sitemap-bare-origin`: canonical `https://example.com/`, sitemap `<loc>https://example.com</loc>`.
- `sitemap-apostrophe`: canonical `https://example.com/?q=it%27s`, sitemap `<loc>https://example.com/?q=it&apos;s</loc>`.

Both commands exit **1** solely for `index.html:sitemap-coverage`. Both representations in each pair serialize to the same HTTPS URL, independently verified with Node's URL implementation. The CLI therefore instructs an owner to add a canonical resource already present.

**Impact and narrow correction:** valid artifacts fail CI/report checks. Compare canonical and sitemap locations through the same supported URL serialization for coverage. Preserve original decoded strings and exact duplicate counts; do not conflate separate trailing-slash paths, query orders, or encoded spellings beyond this comparison's specified URL semantics. Add literal coverage regressions and retain existing duplicate-identity tests.

**Receipts:** `sitemap-bare-origin.json`, `sitemap-apostrophe.json`, saved fixtures/reports, and `independent-oracles.json`.

## Observed coverage and limits

- Init created its three editable files and install copied five skills with exit 0. Inventories are retained.
- A conflict in the final init file or final skill caused exit 2 before earlier files were created. Existing sentinel content remained byte-for-byte intact.
- An installation ancestor symlink caused exit 2 and left the external directory empty.
- The good exported fixture returned exit 0, 17 pass, zero fail, two unknowns. A broken fixture correctly failed missing metadata, foreign canonical, noindex and malformed JSON-LD; wildcard Googlebot blocking and the explicit OAI-SearchBot exception stayed distinct. Duplicate-only input returned exit 1 with positions `[1,2]`. Training policies stayed informational and live/schema gaps stayed unknown.
- A prefixed, namespace-equivalent direct urlset is parsed by the independent XML oracle but rejected by the current extraction (`sitemap` fail, duplicate unknown, zero extracted locations). This is retained as an observed unsupported representation, not added to the required queue: alpha 2 explicitly limits the feature to existing supported extraction and says it does not expand sitemap support. Clarifying or expanding that compatibility is a separate decision.
- No hostile concurrent filesystem changes, Windows/Linux behavior, permission exhaustion, disk failure, live routing, WAF/indexing, Schema.org semantics, actual bot access, or product effectiveness was tested. No claim of exhaustive correctness is made. Report-output overlap/safety is owned by the separate visibility/report audit.

## Execution and artifacts

Run `python3 /private/tmp/geo-core-gap-filesystem/probe.py` from the assigned worktree to reproduce the fixtures and commands. `oracles.py` contains the independent XML/URL checks. Each CLI command has a JSON receipt with exact argv/cwd, UTC start/end, raw stdout/stderr, exit, and literal expectation. The successful offline locked dependency install still emitted the known encoding warning; no upstream investigation was repeated.

`identity.json`, `source-identity.json`, `source-sha256.json`, and initial/final status receipts tie the probes to this runtime and source. `successful-install-inventory.json`, conflict inventories, and symlink outside inventory retain filesystem effects. Cases and JSON/Markdown CLI reports remain under `cases/`; nothing was substituted for an unsuccessful command. No source changes or new suite-pass claim were made.
