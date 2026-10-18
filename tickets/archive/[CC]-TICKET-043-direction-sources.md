# TICKET-043: Check official guidance against the proposed direction

Status: Assessment complete; planning only
Assignee: Codex research agent
Target Workspace: Exclusive worktree created from the TICKET-041 planning checkpoint
Blocked by: TICKET-041 planning checkpoint
Objectives: Check current primary guidance on AI search discoverability and measurement; assess which promises this toolkit can responsibly make and which investments should wait for user evidence.
Hard constraints: Research only, no product changes, installs, API calls to measure products, paid services, live product crawling, outreach or account/private access. Browse official sources, cite direct URLs with dated observations, paraphrase within source limits. Do not infer adoption or causal GEO impact. Write only the report in the exclusive worktree.
Acceptance Criteria: A report at docs/research/direction-sources-2026-10-18.md, using at most three high-trust primary sources, with verified statements, product implications explicitly marked as inference, and unknowns. Distinguish local checks, supported collection conditions, observed citation rates and causal outcomes. Recommend a bounded no-paid-API next phase, not a new provider integration.

## 📄 Execution Report

- Read `AGENTS.md`, `CONTEXT.md`, the core specification, source register, this ticket and the research skill in exclusive worktree `/private/tmp/geo-direction-sources`, based on `c9f85a564e437097abf1965adf622727d9aeec67`.
- Used public read-only browsing on 2026-10-18 for Google Search Central's AI-features guidance and OpenAI's crawler documentation; direct URLs and observation/publication-date distinctions are in `docs/research/direction-sources-2026-10-18.md`. The initial OpenAI platform URL redirected to the official developer URL cited in the report.
- Separated externally verified guidance, the repository's existing contract, proposed direction, and unknowns. Recommended a no-paid-API first-use pilot with supplied artifacts, documented manual collection and explicit comparison limits.
- Verification: read the completed report, checked its direct citations against the retrieved text, inspected the changed paths and ran `git diff --check`. No source edits, dependency changes, installs, product measurements, account access, commits or pushes. No tests/typecheck/build were run or claimed for this documentation-only assessment.
