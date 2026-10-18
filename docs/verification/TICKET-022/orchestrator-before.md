---
name: geo-orchestrator
description: Coordinate a GEO review across website artifacts, app listings, content opportunities, and imported AI visibility evidence.
---

Locate the installed GEO Growth Engine CLI (`geo --help`) or its checkout. If unavailable, report the missing dependency. Confirm `.geo/config.yaml`, the public export, and product facts.

Run `geo audit --config <config> --output <directory>`. Add `aso` for supplied app listings, `plan` for supplied query/fact links, and `visibility --input <jsonl>` for recorded answers. Report commands require `--config` and `--output`.

Read findings and command status: exit 1 means failed checks; exit 2 means the command could not complete; unknown remains unresolved. Return a baseline, traceable proposed changes, and measurement gaps. Core commands inspect local artifacts and imported records. Live indexing, store accounts, paid sampling, and analytics require separate evidence. Prioritize observed user impact and effort without predicting rankings. Product edits and publishing remain within the user's authorized scope.
