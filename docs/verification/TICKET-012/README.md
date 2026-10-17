# TICKET-012 verification

Actual runtime: Darwin 25.5.0 arm64, Node v24.18.0/npm 11.16.0, 2026-10-17. Original UTC command/exit JSON and stdout/stderr are retained. Inputs are synthetic local XML, not live website measurements.

`node --test tests/xml-reference.test.ts` before correction: 33 tests, 15 passes / 18 failures (17 malformed-input subtests plus parent). Those cases incorrectly marked sitemap content pass; the two already rejected controls and valid controls remain visible. Pre-decode character/reference validation then passed all 33. A separately added long numeric spelling regression failed on incorrect 4-unique/2-excess counts; compacting validated numeric spellings within the decoder fixed identity without expanding escaped or CDATA literals. Final focused run: 34 passes, zero skips.

`npm run typecheck`, `npm test` (104 passes, zero failures/skips) and `npm run build` exited 0. Valid XML character boundaries, all predefined named references, lowercase-hex/decimal references, ignored attributes, CDATA/comment/PI literal text, escaped output, existing DTD rejection and original duplicate identity are covered. Raw source research and its limits are described in `research/` and `docs/research/xml-reference-validity.md`. This is not full XML/schema/namespace/encoding certification.

Separate independent reviews, immutable clean-source/extracted-package proof and exact-head PR CI remain pending.

## Review correction

The initial Spec review found a P2 bypass: comment/CDATA/PI-shaped substrings inside quoted attributes were incorrectly stripped as literal sections. Three independent original probes are retained in `spec-bypass-probes.zip` with file hashes. Initial review reports remain under `docs/reviews/TICKET-012/initial-*.md`; the initial Standards result did not establish Spec acceptance.

`review-red` records the three false-success regressions (4 failures including parent, 34 passes). Validation now tracks tag and quoted-attribute context before skipping real literal sections, rejecting prohibited raw `<` inside attributes. Genuine comments inside quoted element text and properly escaped attribute content remain supported. `review-green`: 38 XML tests pass, zero skips. `typecheck-final`, `tests-final` (108 passes, zero failures/skips) and `build-final` exited 0. Earlier 34/104-pass runs remain historical evidence; they are not substituted for checks of the changed source. Both review axes must assess the revised proposal before source commit.

Immutable alpha.3 source `54c8e908be7a9a0f86e0853f9f17e42888f692c1` passed fresh install/typecheck/108 tests/build and all 21 expected extracted-package outcomes, including all six commands, previous regressions, invalid XML rejection and long-numeric duplicate identity. Frozen YinThread remains 16 pass / 1 fail / 2 unknown and sitemap 146/145/1, duplicate positions 8,12. Tarball SHA-256 `b0dac211c1c8abbcd628e4daf7f024d7de6cbe853f863e71a502ef7e5445f807` (21,708 bytes); original runtime/commands/cwd/times/exits/output and package file hashes are in `docs/verification/TICKET-012/candidate/manifest.json` and adjacent receipts. The tarball is local and ignored. Exact-head PR CI remains pending.
