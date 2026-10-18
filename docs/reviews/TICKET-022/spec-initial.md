# TICKET-022 independent Spec review — initial snapshot

One actionable finding:

- **[P2] Exempt compare-only requests from unconditional product prerequisites — `.agents/skills/geo-orchestrator/SKILL.md:6–8`.** The initial new comparison paragraph says “no config is required,” but the preceding instruction still says “Confirm `.geo/config.yaml`, the public export, and product facts” for every request. A user supplying only two retained reports is therefore instructed to satisfy unrelated prerequisites. This only partially satisfies the specification's story, “I can distinguish the four configured workflows from config-free comparison” (`docs/main-documentation-spec.md:11`). Qualify those prerequisites by the requested workflow, with the public export needed only for website auditing. This is an instruction defect, not a CLI validation bug.

Reviewed the 95-file snapshot against fixed point `6f06fdd9f752caabe9a28860d0972b03ddcf3b8a`, planning head `faa2999792b3f2cfdc4c024ab4880df1287f19e7`. All initial hashes were verified before the correction; snapshot-manifest SHA-256 `a514a0f80a4b1ecbdd8e5c98447e934b2bc3f81423cb02a83a685d56ea9853ce`. The original snapshot/report remain historical.

No additional findings. Verified 81 retained receipt-manifest hashes, five baseline outcomes, ten fresh-clone/build/fixture groups and the exact README identity. Main self-comparison and alpha-1's unsupported-command exit 2 support the version-specific instructions. Local raw outputs show 165 pass/0 fail/0 skip, successful typecheck/build. The incorrect extra-config rejection assumption is disclosed, with actual exit 0; no runtime fix is claimed.

Dated release/tag/main/eleven-PR facts agree with the ten integration identities, final tree and main CI summary. PR23 remains explicitly open/unmerged. Historical proposal/receipts, alpha-1 date and pinned submission source remain distinct. Checked 37 execution fingerprints; the 1,343 protected files/five ZIP preservation are retained primary assertions, not independently resampled wholesale. Three changed package inputs are correctly excluded from full old-package reuse.

Fresh immutable package/installed-skill validation and final-head CI remain later delivery gates. No product execution/tests, source/index/remote mutation, network/browser/platform query, private/other-worktree access or Standards-report reading occurred; primary executions were inspected, not repeated.
