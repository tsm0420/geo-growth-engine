# TICKET-011 verification

Executed on Darwin 25.5.0 arm64, Node v24.18.0 / npm 11.16.0, 2026-10-17. Original command/time/exit JSON and stdout/stderr are retained. Fixture answers are fictional, not observed provider responses.

The new real CLI boundary regression failed before correction: mentionRate was 1/7 instead of 3/7. After removing underscore from the excluded delimiter characters, all five visibility tests passed with zero skips. The new case covers the brand, case-insensitive regex-special alias and competitor, underscore/punctuation delimiters, adjacent Unicode letters/numbers, group rates, successful/error denominators, ownership citation rate, recommendation unknowns, example labelling and exact raw bytes/SHA-256.

`npm run typecheck`, `npm test` (70 passed, zero failed/skipped), and `npm run build` exited 0. Separate reviews, immutable package proof and exact-head PR CI are pending.
