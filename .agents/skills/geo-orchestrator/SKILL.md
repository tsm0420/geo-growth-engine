---
name: geo-orchestrator
description: Coordinate a GEO review across website artifacts, app listings, content opportunities, and imported AI visibility evidence.
---

Locate the installed GEO Growth Engine CLI (`geo --help`) or its checkout. If unavailable, report the missing dependency. For the four configured workflows below, confirm `.geo/config.yaml` and product facts; confirm a public export when auditing a website.

Use `geo audit --config <config> --output <directory>` for supplied website artifacts, `aso` for supplied app listings, `plan` for supplied query/fact links, and `visibility --input <jsonl>` for recorded answers. These four report commands require `--config` and `--output`. When asked to compare retained reports, run `geo compare --before <report.json> --after <report.json> --output <directory>`; no config is required.

Read findings and command status: exit 1 means failed checks; exit 2 means the command could not complete; unknown remains unresolved. Return a baseline, traceable proposed changes, and measurement gaps. Core commands inspect local artifacts and imported records. Live indexing, store accounts, paid sampling, and analytics require separate evidence. Prioritize observed user impact and effort without predicting rankings. Product edits and publishing remain within the user's authorized scope.
