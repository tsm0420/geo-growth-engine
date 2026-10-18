# Agensi format, delivery and CLI-dependency research

Checked: 2026-10-17 UTC. Research only; no account, connector, terms acceptance action, upload or publication. Assigned source revision: `ba40c31057f3dd748a821f5a3d8b701c5f793acb`. All five current skills were inspected read-only. Twelve official public pages were captured as exact HTML, with URL, actual UTC times, HTTP status, curl command/exit and SHA-256 in `docs/research/agensi-format-sources.json`. Extracted `.text.txt` files are conveniences, not replacements for originals. These are platform statements, not independent safety, traffic or compatibility measurements.

## Observed requirements

| Area | Official evidence and implications |
| --- | --- |
| ZIP layout | [Creator checklist](https://www.agensi.io/learn/skill-md-creator-checklist): one top-level folder named for the skill, with `SKILL.md` directly inside; neither archive-root SKILL.md nor double nesting. Exclude symlinks, binaries and OS junk. Supporting references/examples and a README are recommended quality material. The same page recommends two-agent testing but later says at least one agent, so treat two-agent compatibility as an unverified quality goal rather than a proven submission gate. |
| Frontmatter | [Format reference](https://www.agensi.io/learn/skill-md-format-reference): required `name` and `description`, followed by actual Markdown instructions; name matches the folder using lowercase letters, numbers and hyphens. Other fields are optional/agent-specific; retaining only these two avoids relying on claimed optional-field interoperability. Descriptions should explain behavior and activation. No numeric ZIP/file-size, file-count, name-length or description-length limit was found in the reviewed public documents. Actual upload validation was not observed. |
| Supporting files | [Supporting-file guide](https://www.agensi.io/learn/how-to-write-skill-md-supporting-files): references, scripts and examples may accompany instructions. Scripts should be contained, readable and avoid privilege/system/global-install changes; essential network use must be disclosed. This older local-file guide does not establish how current MCP delivery exposes supporting files. |
| Review and safety | [Security page](https://www.agensi.io/security) describes structure/type checks, dangerous commands, secrets, environment harvesting, network disclosure, obfuscation and injection checks, followed by human review. It flags binaries/compiled code and undisclosed data transfer. Exact rules/thresholds are withheld; a local scan cannot promise platform approval. The [creator security guide](https://www.agensi.io/learn/how-agensi-security-scan-works) specifically recommends self-contained skills and review of runtime downloads. |
| Submission | [Creator workflow](https://www.agensi.io/learn/how-to-sell-skills-on-agensi) describes a dashboard ZIP upload, free/paid selection, tags and listing description. It says Stripe is needed even for free listings, while the current [seller page](https://www.agensi.io/sell) limits its explicit payout prerequisite to paid publication. Free-account onboarding requirements therefore remain unresolved; no payout setup is authorized. |
| Delivery/rights | [Terms](https://www.agensi.io/terms), updated October 12, 2026, require rights and accurate capability claims, allow source/documentation links, and describe agent-only delivery with no buyer saving/export. Original authors retain ownership. Current delivery is mandatory for live listings; creators cannot opt out. [MCP setup](https://www.agensi.io/docs/mcp-setup) describes account sign-in and one connected app at a time. No agent connection, delivery, file-access mechanism or authenticated dashboard was tested. |

## Fit of the actual toolkit

The current skills invoke an external GEO Growth Engine CLI. The package requires Node.js >=24 and exposes `geo` from built `dist/src/cli.js`; the core is not embedded in a SKILL.md. These are local source observations (`package.json`, five `.agents/skills/*/SKILL.md`), not promises that Agensi installs dependencies.

None of the five current SKILL.md files requires a sibling SKILL.md to execute its stated steps: the orchestrator invokes the same CLI's audit/aso/plan/visibility commands directly. Do not invent sibling installation requirements. Each ZIP can include the input/output/setup knowledge needed for its own workflow; if later edits introduce sibling references, disclose and test them explicitly.

Proposed honest prerequisite: a separately installed, pinned reviewed CLI, Node 24+, local shell/filesystem access and user-supplied configuration/artifacts. Locate the built CLI or `geo --help`; if absent, stop with the prerequisite rather than fabricate findings. Do not claim a chat-only connector supplies a shell or that every listed agent has been tested. Keep runtime commands local and no-paid-API. Any separately authorized source installation must disclose GitHub/npm traffic and use the lockfile; no remote-script piping or hidden/global installation.

**Unresolved platform fit:** older checklist guidance expects immediately usable self-contained instructions, while current terms forbid saving delivered skill files. External local CLI dependencies and on-demand reference access are not explicitly accepted or mechanically explained in the reviewed pages. The platform's "repackaged free skills" warning does not establish whether an original author's free MIT toolkit is accepted. MIT permits copying with notice; platform delivery restrictions are a separate question, not proven legally compatible or incompatible here. Preserve public MIT distribution and resolve this fit before submission. Do not instruct agents to circumvent delivery restrictions by exporting received content.

## Concrete package recommendation (proposal, not produced)

For each of the five existing names, create one `NAME.zip` containing:

```text
NAME/
  SKILL.md
  README.md
  LICENSE
  references/setup-and-contract.md
  references/sources-and-limits.md
  examples/input-example.*
  examples/expected-output.md
```

Use only relevant, explicitly fictional text fixtures. Include complete notice, immutable toolkit revision/version, setup/source/support links, exact command and input/output contract, failure/unknown behavior and external-CLI dependency in every package. Keep essential prerequisite/limits in SKILL.md itself so streamed instructions remain honest even if references are unavailable; do not claim reference access works until observed. The orchestrator may demonstrate multiple CLI commands without bundling sibling skills. Exclude node_modules, compiled CLI/binaries, website captures, private files, hidden OS junk and paid-product claims. No executable wrapper is needed merely to redisplay CLI commands.

## Validation plan and decision boundary

Primary should select the reviewed immutable source only after current hardening checks/reviews, then produce deterministic ZIPs with inventories/SHA-256/source/runtime receipts. Validate traversal-free one-folder layout, text types, no symlinks/OS junk, valid two-field YAML, matching name, nonempty instructions, present notices and resolving bundled links. Extract each independently into temp; run its promised workflow using that pinned CLI and fictional fixtures, asserting outputs/exits/evidence and prerequisite failure. New executable packaging tooling needs meaningful tests. These are local structural/CLI checks; they do not prove natural-language triggering, a second-agent run, platform scan approval or MCP delivery.

Prepare five free listing drafts with accurate setup, local-only capability, examples and limits. Before any account/upload/terms decision, surface the concrete questions: original-author MIT/free eligibility, external CLI acceptance, supporting-file delivery, buyer licence/notice presentation, actual size limits and free creator payout prerequisite. Actual account approval, scan feedback, authenticated delivery and live URLs remain unobserved. No sender contact was made.

## Retention location

The original captures, extracted text, research command receipts and manifests remain in the local ignored tree `reports/research/agensi-format/`. Public `agensi-format-sources.json` preserves exact source URL/time/status/size/hash metadata, not full third-party page bodies. The primary independently checked all twelve body sizes/hashes against successful recorded HTTP capture metadata before using this report. Local captures do not establish authenticated delivery or acceptance.
