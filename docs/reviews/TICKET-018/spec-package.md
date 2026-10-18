# TICKET-018 Spec package-evidence addendum

No actionable findings in the copied primary candidate evidence.

Candidate source is `248adb10c710633269ad4342d1cb5bd14f35e715`; manifest SHA-256 is `369608e357e9137f28b3db0be964df6245231cd344d26fc396247e63b0040aaf`. Verified all 85 retained receipt-file hashes, all five unchanged reviewed-file hashes and 40 execution-input fingerprints against current files and immutable Git blobs.

Clean receipts show 165 pass/0 fail/0 skip, typecheck/build exit 0. Pack inventory and installed-file manifest consistently identify 23 files and a 24,785-byte tarball, SHA-256 `07f171e4c6b9d4021cd98a8f465e809dc9859ded0163f8cab3012c3ef7825326`. These are retained primary package observations; actual consumer bytes were not independently resampled.

All 18 consumer receipts match expected exits. Retained fictional comparisons cover all four kinds, the audit fail-to-pass change, after-failure exit 1, required-input/malformed failures and both alias/later-conflict protections. Full parsed inputs, original-byte digests and unknown comparability remain visible; preservation claims are explicitly primary observations.

Initial cache EPERM, isolated-cache pack retry, approved consumer installation and dependency deprecation warnings remain visible. No reviewer CLI/test/network execution occurred. Final-head CI remains separate and pending; macOS fixture results establish neither Windows behavior, live improvement, registry publication nor Agensi changes.
