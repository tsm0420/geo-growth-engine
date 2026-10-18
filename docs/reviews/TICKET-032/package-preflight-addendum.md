# TICKET-032 package harness preflight addendum

**Original proof-timing finding resolved; no remaining material gap in the narrow correction.**

The static diff now captures valid.json and valid.jsonl digests immediately after creation, before their first Unicode CLI consumption. It captures escaped.json before comparison, checks those original baselines after the positive cases, and adds malformed-input baselines without resetting earlier values. The later malformed-case preservation check therefore also checks the genuine original positive-input bytes.

Only these baseline capture/check statements changed. The original harness and initial review remain preserved. This addendum authenticates the review change, not a package run: no harness, product, tests or network execution occurred, and no source/index mutation was made. Actual consumer outcomes remain unproven until the primary executes and retains them.
