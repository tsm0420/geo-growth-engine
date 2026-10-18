# TICKET-028 planned package-proof review

Static harness snapshot SHA-256 `ce16fc3582f4eb15d26e136aadcc68fb452415a41e328743b179c35dd0cd76bf`. **Two bounded false-success risks in existing consumer cases:**

1. **Null/denominator proof is partial (lines123–126).** The all-error comparison asserts only the last citationRate row and a generic Markdown null phrase. Incorrect attempted/successful/failed/coverage rows or mentionRate incorrectly becoming0 could still pass this advertised null proof. Assert the existing fixture's complete six-row literal result: counts2→1,2→0,0→1; coverage1→0; both mention/citation0→null with null differences. No additional fixture or suite run is needed for this correction.
2. **Default-mode proof checks only one absent property (lines128–129).** A consumer output that wrongly adds metric findings or changes default summary/classification can omit `data.visibilityMetrics` and pass. In this already-generated default result, assert the original three unchanged source findings, summary1pass/0fail/3unknown, and absence of metric findings, while retaining source documents/digests.

Other planned gates are coherent: canonical full commit resolution and fresh archive/build/tarball; installed bytes compared with both tar members and built source; exact six-file change inventory versus T022 and24-file count; actual installed bin and genuinely generated fictional visibility reports; literal six-row metric output, operational exits, input/output preservation, five copied skill digests and validator executions. These are planned assertions, not executed evidence.

The immutable source/test identity and separate190-test proof still need authentication at delivery; this harness deliberately does not rerun that suite. Its Darwin/fictional/platform/CI limits avoid unsupported product or security claims. No product code, test, harness execution, index, network, private-data or other-worktree action was performed.
