# TICKET-022 release and integration facts

Observed via 16 successful GitHub connector GETs from 2026-10-18T11:14:26.542Z to 2026-10-18T11:14:53.541Z. `sources.json` retains each exact API URL, UTC observation time and raw-envelope digest; `facts.json` retains numeric IDs and full metadata selections.

The published [alpha-1 release](https://github.com/tsm0420/geo-growth-engine/releases/tag/v0.1.0-alpha.1) is named **v0.1.0-alpha.1**, release ID **415347975**, `draft:false`, `prerelease:true`. It was published **2026-10-16T20:20:54Z** (created 2026-10-16T20:19:13Z). The directly fetched tag is lightweight and points to commit **6eb7dfe1b98814dafdeb7bc02a94bc9f41a30c4c**; fetched Git-commit metadata confirms that identity. Release `target_commitish` agrees. Release-list page1/per_page100 returned one item; no later page or broader release/tag inventory was fetched.

[Main](https://github.com/tsm0420/geo-growth-engine/tree/main) remains **5013f87a56286f6ebc768d35440a00e06993275f**, tree **61881ecd3d730723181479d6c9a51bb3092701d4**. Ten fresh PR responses all say closed/merged, target main, and match TICKET-021's approved heads and actual merge SHAs:

| PR | Approved head | Actual merge |
| --- | --- | --- |
| #9 | `1c8c535bcf00739ae705bdb9e2d3a455717a45f4` | `8ffddec24e8251e833a9d60f5bdf1f99321cfc89` |
| #11 | `79a7edbbe201ebd1e63d14d10e126ebdeff051f9` | `eb307ab05821bc9a5d77b75d4c14a9aed7bcf114` |
| #12 | `f33ec8eef40d29dc169f080de50e7d6525a48a61` | `133d883b913fc47dc70fd5bddbcf07ad5e429c9b` |
| #13 | `5e2c0a44dc66d2b300cf69384248f1f9a97ee8f7` | `6a1ef0286a6ced44dcddee11a40df9c49b8641ce` |
| #14 | `1e3fe4377f7a6d5b62be1ffe87a8a21b57292c79` | `9114c7d3d97e52238ca298a8ec71ebd1a5bc64ec` |
| #15 | `9f2ea9ca3c07a69fc3ee36093e6322f56b1f686c` | `334e3b033abcb7ab43ce7164d41e3f9ffc25dc9c` |
| #16 | `c1ae2d9c626c93d8bbbe7c9dc93f3bc81cfeb031` | `2a88d5a791eff3ccb7aad3289d3e71c8b1e1ffc2` |
| #17 | `20e15a80e4db98b37b7781d447cfcabbbe7506c4` | `d5080617536148e238218d01c6c6257c4777fe8d` |
| #19 | `5fb6baceefa64dc028c5af0c6b13745bee744de3` | `25476a6793a31073a0c650e97478b229f9f801a4` |
| #21 | `dddf667f8dee72a2521fba4bdc6c2c718a4939f0` | `5013f87a56286f6ebc768d35440a00e06993275f` |

[PR23](https://github.com/tsm0420/geo-growth-engine/pull/23) remains **open/unmerged**, head **6f06fdd9f752caabe9a28860d0972b03ddcf3b8a** (`codex/yinthread-local-remediation`), base main **5013f87a56286f6ebc768d35440a00e06993275f**. Its remediation rehearsal is therefore separate from integrated-main behavior.

These observations establish GitHub source/integration and the dated alpha-1 prerelease. They do not establish a new tagged release, npm registry publication or changed Agensi status. No registry/platform query, CI diagnostic/log query, executable check, API mutation, Git/index change, private-file access or other-worktree inspection occurred. Existing TICKET-021 integration state was read only for identity comparison; this audit does not claim a new CI run or review of CI logs. No unavailable source or fallback was needed. Stop scope: these finite release/tag/main/eleven-PR facts only.
