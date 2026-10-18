# TICKET-029 supplied-text evidence assessment

Source: main `5f13ef7271ede5bbc9d258f922e3d368a0c346fc`. All 20 packet files match their manifest sizes/SHA-256 values.

**Observed:** three retained real plan commands exit 0. Every JSON report has one unknown finding and summary 0 pass/0 fail/1 unknown. The supplied ID contains LF, CR or CRLF plus pipe-delimited-looking text. JSON preserves that ID. LF Markdown has zero raw CR; CR and CRLF Markdown each retain one raw CR inside the Check cell. Their introduced pipes are escaped. These are literal byte/JSON observations, not rendered output.

`src/config.ts:15-16,120` accepts the nonempty supplied ID; `src/plan.ts:16-19` uses it unchanged. `src/report.ts:19-20` escapes HTML/pipes and flattens only LF, while line38 places each finding into one Markdown table row. This establishes a narrow serialization gap: accepted CR line endings are treated differently from LF. The readable-Markdown requirement is `docs/spec.md:37`; full source text/evidence must remain data.

**Inferred/unknown:** a parser may treat raw CR as a row boundary, but no actual parser/render receipt is in this packet. Thus rendered row damage remains unverified here. A fabricated pass/status-column claim is not supported: the real JSON status stays unknown, and existing pipe escaping already blocks this packet's literal fake separators. It does not cure raw line endings.

**Minimum conditional repair contract:** confirm the retained Markdown in the primary's actual parser first. If row damage is observed, flatten CRLF/CR/LF consistently only in Markdown presentation fields; preserve original JSON IDs/evidence/data/statuses, summaries, exit codes and existing pipe/HTML handling. Use the established real CLI seam with literal line-ending cases, original-byte checks and actual table row/cell interpretation. No generic sanitizer or product-data rewrite is justified.

Only local read/hash/JSON inspection occurred; no product/tests/parser/network execution or other-worktree/private access. No implementation is accepted by this assessment.
