# TICKET-010 Spec review

**No actionable introduced Spec defects found.** Reviewed the actual tracked/untracked proposal against fixed base `79a7edbbe201ebd1e63d14d10e126ebdeff051f9` (PR #11 head), rather than the planning-only committed diff. Implementation scope is the four optional defaults in `src/config.ts`, their CLI regression file, configuration/changelog guidance and raw verification receipts. Planning and prior-slice bookkeeping do not add runtime behavior.

The proposal implements the requirement: “Default aliases, competitors, listings and listing factIds only when omitted. Explicit null is an incompatible list/object type: exit 2, no report.” Each default now tests `=== undefined`, allowing explicit null to reach the existing list/object validator. Valid empty values and omitted values remain accepted. Fact-source handling is unchanged, so `source: null` remains an evidence gap rather than a collection error. No unrelated validation policy or platform rule was added.

Actual check: ran `node --test tests/collection-validation.test.ts` in `/private/tmp/geo-review010-spec`. **21/21 tests passed, zero skipped.** Real aso/plan/visibility subprocesses reject all twelve field/command null combinations with exit 2 and no output directory; omission/empty cases succeed; null fact sources remain unknown/research-gap results. Runtime: Node v24.18.0, Darwin arm64.

Dependencies were reused through the provided APFS copy of the same locked tree; this was not a clean dependency-installation check. Read the saved red/green, typecheck, full-suite and build receipts: they record the expected failing baseline, corrected focused run, and typecheck/69-pass suite/build exit 0. Those broader commands were not rerun by this reviewer.

No tracked edits, commits, sibling/root access or network requests occurred. Candidate/package verification and final-head CI remain pending delivery gates. Other queued hardening defects are outside this slice. This report is the Spec axis only.
