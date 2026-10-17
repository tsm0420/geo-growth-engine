# TICKET-012: Reject malformed sitemap XML references

Status: In progress
Assignee: Codex
Target Workspace: `geo-growth-engine`, branch `codex/sitemap-xml-references`
Blocked by: TICKET-007 investigation (complete); PR #13 open and unmerged (transitive #12/#11/#9)
Specification: `docs/core-hardening-spec.md`, TICKET-012

## Objectives

Reject undeclared named entities and prohibited numeric references before producing sitemap evidence; preserve valid one-pass XML decoding.

## Hard constraints

Existing local-input core only; English docs, strict TypeScript, real CLI red/green tests, independent Standards/Spec worktree reviews and same-commit ticket reports. Preserve private data/history/unknowns. No live requests, paid services, merge or publication.

## Acceptance Criteria

- Real CLI malformed-reference cases produce exit1/sitemap fail/duplicates unknown with null data; named/numeric/escaped-literal valid controls and historical frozen input remain supported.
- Required typecheck/full suite/build pass, with actual raw receipts and separate resolved review reports before source commit.
- Deliver a reviewable PR with prerequisite, current candidate/package evidence and final-head CI; update the loop ledger before selecting the next justified item.

## Research addendum before implementation

Primary-source XML 1.0 review and 31 recorded real CLI probes confirm malformed named/numeric references (including ignored attributes) and prohibited literal characters need checking before decoding. Reference-looking text in CDATA/comments/processing instructions and escaped ampersands remains literal. A valid numeric reference with 40 leading zeroes also exceeds the installed decoder's scan length and produces incorrect duplicate identity; include this observed positive-control defect in valid one-pass preservation. Keep existing structural validation, DTD exclusion and expansion limits. No XML 1.1, namespace/schema or encoding-conformance expansion is requested. Research: `docs/research/xml-reference-validity.md`.
