# TICKET-032 package evidence authentication

No material authentication finding within the retained packet.

I statically verified all 151 snapshot sizes/hashes and recomputed the 27,337-byte tarball SHA-256: `1a829e57671ebb08265c63d231bf26d3f2f9de849b65261c57d8d5c4911f5518`. All 25 files are byte-identical across tar members, copied built files and installed files. Comparing the previous-package inventory identifies exactly `compare.js`, `visibility.js`, new `json-text.js` and `docs/configuration.md` as changed; nothing was removed.

All 18 step receipts equal their manifest entries and expected exits: four preparation steps, five report commands, two valid-Unicode commands, six malformed-input rejections and one collision rejection. Retained example reports preserve unknowns and consistent summaries. Late FF corruption in JSONL and incomplete E2 82 in either compare side produce exit 2, empty stdout and input-specific UTF-8 errors. Seven copied existing-output sentinels retain exact bytes. The retained harness asserts fresh-directory absence and preservation; snapshot omission alone is not independent execution proof. Collision input equals its original valid source; no companion Markdown is retained.

Literal/escaped U+FFFD, U+1F44B and decomposed e/U+0301 retain exact source IDs, copied compare IDs and raw answers. Literal/escaped JSON hashes differ correctly. Raw JSONL evidence and reported SHA match the original input bytes, including CRLF/blank lines. All five input digests match. Corrected harness baselines precede first consumption and survive later checks.

Source linkage names `90bb5f0863f76bd1245d9fec62bccd8108e66db1`; the 32 checked-input entries are primary matching assertions, not independently supplied full source bytes. Five unchanged skill hashes match the scoped T028 validator records; validators were not rerun. The rejected mistyped revision was a pre-work invocation error.

This authenticates retained bytes/receipts, not fresh execution, CI, release, live collection or Agensi approval.
