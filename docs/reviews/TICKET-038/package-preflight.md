# TICKET-038 package preflight

One material provenance gap requires a bounded correction before execution. Static inspection only; no product, harness, test or network execution, source review or agents.

Pinned harness SHA-256: `0f5cb46e68d1739bfb10a699b1b326e7741f84c0d820e602726a2e69b78a3ad6`.

**Bind discovery data to its immutable owner.** `harness.py:90–91,139` reads baseline/swapped JSONL and the original baseline report from the current root. Those three paths are absent from the 47-entry Git/archive matching map. Their pre-consumption digests record whatever root bytes are read, without requiring the accepted original bytes.

Read-only Git-object inspection in this assessor's own worktree confirms all three are tracked at `3b19c0c88bfdc15a33dc2e652c6028a43b9f8f8c` and exactly match the accepted T037 packet. The immutable owner exists; the planned reads do not enforce it. Read these paths from the already extracted `source` archive, or compare them to their revision-owned Git objects before consumption. No product change or unrelated rerun is needed.

Other bounded invariants are sound: checked source bytes match Git/archive/current files before build; archive extraction rejects links/escaping destinations; all 25 package identities must match the prior inventory with exactly four intended changes. The 22 outcomes reconcile, including init/install and five copied-skill validators. Literal question rows cover repeated/error-only/context/order/swapped/empty behavior; both comparison modes retain older/newer reports and digests. Duplicate-ID rejection and collision sentinels have explicit diagnostics, stdout and preservation assertions.

After the three reads are bound, actual execution and independent artifact authentication must establish outcomes, 47 checked inputs, installed/copied skills and raw report/sentinel bytes. Temporal preservation and fresh-directory absence remain retained primary assertions. No live measurement, growth, marketplace or delivery result is inferred.
