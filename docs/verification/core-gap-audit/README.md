# Core acceptance-gap audit evidence

Date: 2026-10-17. Source/runtime and exact command evidence are recorded inside each archive. The original research baseline is `9b6b59ef0d6c3230fd54b6f756f449718dc88f83`; subsequent pre-implementation changes are documentation only.

The three independent [filesystem/audit](filesystem.md), [content/config](content.md), and [visibility/report](visibility.md) reports describe actual observations and limits. Four ZIP archives preserve the original local data, fixtures, command receipts and generated reports without byte normalization. [manifest.json](manifest.json) records archive SHA-256 and all 724 included file digests. Executable temporary research harnesses are intentionally excluded from these data archives; original temporary workspaces remain available locally. No archive is an installable skill or a production measurement.

The packaging archive records an actual npm consumer installation and use of the installed `geo` binary, rather than only calling the development entry point. Reuse of the alpha-2 tarball was justified by matching its SHA-256 and all 22 packaged-file hashes against unchanged current inputs. This evidence does not cover later source changes. The known upstream deprecation warning remains visible.

The finite queue and literal expected behavior are in [the specification](../../core-hardening-spec.md). All reported fixes remain unimplemented until their ticket's red/green, reviews, source identity and current verification establish otherwise. No concurrency, power-loss, disk-exhaustion, actual mobile device, live indexing, semantic validity, traffic or growth certification is claimed.
