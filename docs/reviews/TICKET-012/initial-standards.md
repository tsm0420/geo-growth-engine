# TICKET-012 Standards review

No actionable introduced documented-standard violations or justified smell findings identified.

Scope: actual `git diff 5e2c0a44dc66d2b300cf69384248f1f9a97ee8f7 --` plus untracked source-proposal tests/receipts. Planning HEAD `50ec719f6c0bfa96b0e7042642497ccdce54ae2d` contains the research/contract addendum; the executable overlay was reviewed separately from that planning commit.

Read AGENTS.md, CONTEXT.md, CONTRIBUTING.md, docs/spec.md, docs/core-hardening-spec.md, TICKET-012, configuration/source guidance and the XML research addendum. Applied the code-review skill’s complete twelve-smell baseline; no additional standards files were found.

New validation and numeric compaction remain within sitemap handling in `src/audit.ts:50-75,92-96`. The existing parser, structural validation, DTD exclusion and expansion-limit configuration remain in use. The decoder subclass narrowly overrides decoding preparation, then delegates to the inherited implementation; it does not discard the inherited protocol. Its comment explains the observed upstream scan constraint.

The tests exercise the agreed real CLI seam with synthetic XML, literal status/count/identity expectations, invalid-reference failures, legal boundaries, ignored attributes, literal sections, escaped output and long-leading-zero preservation. Private helpers remain unexposed. Documentation distinguishes these checks from XML 1.1, schema/namespace and encoding certification.

Considered Mysterious Name, Duplicated Code, Feature Envy, Data Clumps, Primitive Obsession, Repeated Switches, Shotgun Surgery, Divergent Change, Speculative Generality, Message Chains, Middle Man and Refused Bequest. No concrete maintainability finding warrants additional abstraction or unrelated refactoring.

Independent verification: `node --test tests/xml-reference.test.ts` exited 0, with 34 passes including test groups, zero failures/skips. Actual environment: Darwin 25.5.0 arm64 / Node v24.18.0 / npm 11.16.0; reused the supplied APFS dependency copy. No clean install. Raw output, runtime and source/test/lock hashes: `/private/tmp/geo-ticket012-standards-check.json`.

Inspected primary reference/long-form red-green receipts, typecheck, 104-pass full suite and build; broader checks were not independently rerun. This is bounded regression evidence, not full XML certification. Same-commit ticket report/status, immutable candidate/package proof and final-head CI remain delivery gates. No tracked edits, commits, network access or Spec-report aggregation occurred.
