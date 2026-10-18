# TICKET-028 local source verification

Observed on Darwin with the Node/npm/runtime and exact working-source hashes in checks-manifest.json, based on planning revision d300eed. The source had not been committed at execution; the manifest identifies the tested working bytes.

First-red: one genuine visibility/import/comparison CLI test fails because --visibility-metrics is unsupported. First-green: the complete path passes. Validation-red: nine controls fail; validation-green: all21 pass after explicit count/denominator/command validation. Final controls:25 pass. Required typecheck, full190-test suite (zero failures/skips) and build succeed. Commands, exit codes and original unedited outputs are adjacent. Primary also verified all1476 pre-existing case/distribution/verification/review file hashes and sizes unchanged; that large preservation manifest is retained locally in reports/candidates/TICKET-028/.

These are fictional local observations and source-test results. Package behavior, independent review, PR/main CI, actual agent triggering and marketplace/security approval are separate claims with separate gates. Historical red receipts describe intermediate implementation, not remaining defects.
