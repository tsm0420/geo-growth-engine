# TICKET-011 Standards review

No actionable introduced documented-standard violations or justified smell findings identified.

Scope: actual `git diff f33ec8eef40d29dc169f080de50e7d6525a48a61 --` plus untracked verification files. Planning HEAD `fa87f1b7d29d9811692b44c3474e528d4eaf264c` records prior delivery/current planning; this review includes the supplied proposal overlay.

Read AGENTS.md, CONTEXT.md, CONTRIBUTING.md, docs/spec.md, docs/core-hardening-spec.md, configuration guidance and TICKET-011, applying the code-review skill’s twelve-smell baseline. No additional standards files were found.

The executable change is one expression in `src/visibility.ts:41`, keeping shared brand/alias/competitor matching in its existing owner. Regex escaping and case-insensitive Unicode matching remain intact. Documentation describes the delimiter rule within the current local-input contract.

The new real CLI regression uses explicitly fictional records and independent literal totals/group expectations. It exercises underscore and punctuation boundaries, a regex-special alias, Unicode-letter/numeric adjacency, one-sided boundaries, failed-sample exclusion, citation rates, unknown recommendations, example labelling and exact raw bytes/digest. No private helper exposure or runtime mock is introduced.

Considered Mysterious Name, Duplicated Code, Feature Envy, Data Clumps, Primitive Obsession, Repeated Switches, Shotgun Surgery, Divergent Change, Speculative Generality, Message Chains, Middle Man and Refused Bequest. None warrants additional churn in this narrow correction.

Independent verification: `node --test tests/visibility.test.ts` exited 0, with 5 passes and zero failures/skips on Darwin 25.5.0 arm64 / Node v24.18.0 / npm 11.16.0. Reused the supplied APFS copy of locked dependencies; no clean install. Raw command/output/runtime and source/test/lock hashes: `/private/tmp/geo-ticket011-standards-check.json`.

Inspected primary red/green, typecheck, 70-pass full suite and build receipts; those broader checks were not independently rerun. Prior-slice CI metadata identifies the correct completed/success head. TICKET-011’s same-commit execution report/status, immutable package proof and final-head CI remain delivery gates. Other queued fixes remain separate. No tracked edits, commits, network access or Spec-report aggregation occurred.
