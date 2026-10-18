# TICKET-035: Bounded report-retention discovery

Status: Discovery in progress
Assignee: Codex
Target Workspace: Verified main7d0ab6ed862b2ee244e88f1539d072544ec0c76a tree
Blocked by: TICKET-034 delivery complete
Objectives: Check that imported comparison metadata can be retained faithfully through JSON parsing and report serialization, using finite and out-of-runtime-range numeric literals as fictional controls.
Hard constraints: No source/test/private/frozen/upload edits, no paid/live collection or new dependency. Distinguish valid JSON syntax, runtime number representation, parsed-document retention and raw-byte traceability.
Acceptance Criteria: Small actual CLI/native-parser matrix with original inputs/outputs/exits/digests and independent assessment; accept a bounded correction only if current retention contract is contradicted.
