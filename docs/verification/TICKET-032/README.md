# TICKET-032 verification receipts

Actual primary execution on Node24.22.0. `visibility-red` records one expected failed rejection test (actual exit0 instead of2); `visibility-green` records its correction. `compare-red` records the two expected failing before/after rejections; `compare-green` records all3 passing. Original failing outputs are preserved.

`typecheck`, `tests` and `build` retain complete stdout/stderr and command/exit/runtime receipts. The full suite reports206 passed,0 failed/skipped. `checked-inputs.json` pins the32 actual source/test/config/package inputs; it does not claim unrelated historical artifacts were resampled.

`discovery/` retains fictional original byte inputs, observed outcomes, primary references, nine native-validator controls and independent static assessment. Some JSON/JSONL fixtures intentionally contain invalid UTF-8 bytes. Treat these as evidence, never valid example data. Corrupt answers were accepted and compare IDs collapsed; no false brand match, authenticated collection or growth result is claimed.

Independent reviews and immutable installed-package proof are separate gates. Subsequent PR CI, merge and actual-main outcomes are recorded in the linked PR and local delivery checkpoint, rather than claimed complete by this source checkpoint.
