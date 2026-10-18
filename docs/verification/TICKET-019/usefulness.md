# TICKET-019-usefulness: Retained-report inspection

Source: `f90869ef0aec8c5f4d65c6dc76aa600e0e9e9a39`; exclusive worktree `/private/tmp/geo-report019-usefulness`.

Result: **No confirmed static evidence/action/decision mismatch** within this bounded inspection. No CLI behavior or new product measurement was verified.

- The historical report records 16 pass/0 fail/2 unknown (`docs/case-studies/yinthread/results/audit.json:117-120`). The case README explicitly explains the alpha 1 duplicate-check omission and independent manual observation (`README.md:21-27` within that case directory), consistent with `inspection.json:2-9`.
- The candidate duplicate failure carries the concrete URL, counts, positions and a matching cleanup action (`results-alpha-2/audit.json:20-24` and `audit.md:15`). Structured duplicate data agrees (`audit.json:133-144`). The candidate summary is 16/1/2 (`audit.json:123-126`), matching the case README at line 31. This is additional detection against frozen input, not observed website deterioration or a deployed fix.
- Both deliberate unknowns retain bounded evidence/actions (`results/audit.json:98-108`; `results-alpha-2/audit.json:104-114`). Training policies and optional llms.txt remain explicitly informational. Their pass labels are disclosed rather than presented as measured indexing or growth.
- The two export path prefixes differ (`results/audit.json:6`; `results-alpha-2/audit.json:6`), with normalization and copied-input handling disclosed in the case README at lines 33 and 43. Path-only differences becoming details-changed is expressly required by `docs/report-comparison-spec.md:22`; it is not an implementation defect inferred from noisy output. Product/cohort/attribution unknowns remain required at line 24.

Direction: let the primary execute the retained-report comparison and assess candidate release readiness. These retained artifacts do not justify another speculative feature or editing frozen source evidence. Passing-check action wording is generic guidance; no demonstrated incorrect decision from it was established.

Inspected: ticket, AGENTS.md, CONTEXT.md; case README.md, inspection.json, historical/candidate audit.json and audit.md; docs/report-comparison-spec.md; comparison passages in README.md/docs/configuration.md. Commands: cat, rg, nl, sed, git identity/status, and this report-file write. No hash calculation, product CLI, tests, network/browser, private-file access, source edits, staging or commits.
