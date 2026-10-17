# TICKET-011 verification

Executed on Darwin 25.5.0 arm64, Node v24.18.0 / npm 11.16.0, 2026-10-17. Original command/time/exit JSON and stdout/stderr are retained. Fixture answers are fictional, not observed provider responses.

The new real CLI boundary regression failed before correction: mentionRate was 1/7 instead of 3/7. After removing underscore from the excluded delimiter characters, all five visibility tests passed with zero skips. The new case covers the brand, case-insensitive regex-special alias and competitor, underscore/punctuation delimiters, adjacent Unicode letters/numbers, group rates, successful/error denominators, ownership citation rate, recommendation unknowns, example labelling and exact raw bytes/SHA-256.

`npm run typecheck`, `npm test` (70 passed, zero failed/skipped), and `npm run build` exited 0. Separate reviews, immutable package proof and exact-head PR CI are pending.

Immutable alpha.3 source `1a223de98e41473bacb743572db704ccce23d509` passed fresh install/typecheck/70 tests/build, then all 19 expected extracted-package command outcomes. This includes all six commands, earlier protection/validation regressions and literal underscore/embedded-name counting with exact retained records. Frozen YinThread remains 16 pass / 1 fail / 2 unknown, sitemap 146/145/1. Tarball SHA-256 `7dd137f34bc30de27bf806163560be74acff8a152f00345dbb4174b736c83cc5` (20,522 bytes). Original commands/exits/cwd/times/output, runtime and every packaged file hash are in `docs/verification/TICKET-011/candidate/manifest.json` and adjacent receipts. Tarball remains a local ignored artifact. Final-head PR CI is pending.
