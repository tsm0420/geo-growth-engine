# Standards review — alpha 2 proposal

Verdict: **0 actionable documented-standard violations; 0 actionable baseline smells.**

Reviewed the exact proposed-file overlay in the isolated `/private/tmp/geo-alpha-2-standards` worktree against `75d5e6ea48ce4d9a6d020a54cd87f23f925ac7ed`, using `git diff BASE --` plus untracked candidate files. HEAD is planning commit `1680a7d99b4e971c33afdf992a921f62d7f4ab74`; implementation is deliberately uncommitted at this review point.

Standards read: `AGENTS.md`, `CONTRIBUTING.md`, `CONTEXT.md`, `docs/spec.md`, `docs/releases/alpha-2-spec.md`, TICKET-005/006, `docs/sources.md`, and the inherited global rules. Inspected changed source, tests, package/lockfile, skill, user guidance, case reports, dependency investigation and verification receipts. Applied all twelve supplied smell heuristics, treating them as judgement calls and suppressing preferences/tool-enforced issues.

`AGENTS.md` requires observable CLI tests and evidence-backed claims. The changed `src/audit.ts` behavior has real subprocess regressions in `tests/sitemap.test.ts`; these assert literal outputs, positions, exits and unknowns. The decoding regression checks actual JSON and Markdown evidence. The small `summarizeSitemap` helper owns shared counts/positions without introducing unsupported abstractions or duplicated business logic.

`CONTRIBUTING.md` requires original evidence and visibly bounded measurement claims. Candidate documentation distinguishes frozen local inputs, historical alpha 1 results, unresolved upstream constraints and unmeasured indexing/growth. Raw receipts and copied-file hashes are retained; candidate reports disclose their actual temporary paths.

I read the recorded typecheck exit 0 and complete test output (33 tests, 33 passed, 0 failed), including stderr files. I did not rerun the suite or claim independent execution. Clean installation, extracted-package smoke/digest, final-source identity, final-head CI and completed ticket reports remain explicit downstream delivery gates; this standards pass does not certify them complete.

No tracked files, Git metadata or remote systems were modified during review.
