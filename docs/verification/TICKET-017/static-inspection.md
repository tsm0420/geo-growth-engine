# TICKET-017-A: First-use contract inspection

Source: `5fb6baceefa64dc028c5af0c6b13745bee744de3`, exclusive worktree `/private/tmp/geo-first-use-audit`.

Result: **No confirmed static first-use defect** within the bounded README/templates/configuration/five-skill inspection. This is not executable verification or a claim of complete usability.

Observed contract alignment:

- `README.md:13-20` pins Node 24, a tagged source checkout and an explicit build; `README.md:7-9` distinguishes published alpha 1 from unmerged alpha 2/3 candidates. Candidate-only preflight and duplicate behavior is labelled at `README.md:51`, `:64` and `:66`; it is not evidence of alpha 1 behavior.
- `README.md:39-46` initializes configuration and skills, then explicitly requires replacing fictional facts and supplying/building the user's export. `templates/config.yaml:2-5` uses the matching origin and config-relative product/query files; `templates/product.yaml:2-10` labels the sample fictional, while `templates/queries.yaml:3-7` links its existing fact ID. The absent user export is an intentional prerequisite, not a confirmed defect.
- `docs/configuration.md:15` matches the README's path rules. The five skill instructions route to the documented local CLI command set: each skill's line 6, plus `geo-orchestrator/SKILL.md:8`. The orchestrator allows locating the checkout; `README.md:49` explains that installation does not install a global CLI. Therefore shorthand `geo` examples are not sufficient evidence of a broken install contract.
- `geo-visibility-tracker/SKILL.md:6-10` and `docs/configuration.md:60-62` agree about raw records, errors, null rates and imported-data limits.

Next bounded direction, conditional on the primary's first-use journey: specify comparison of two retained local audit reports. This follows the explicit comparable-repeat-run need in `docs/iterative-goal.md:3,7` and existing history guidance in `README.md:62`. Define report identity/compatibility gates and pass/fail/unknown transitions before implementation; retain both input reports and avoid attributing changes to growth. This is a proposed slice, not a shipped command or a discovered defect.

No tests, CLI journeys, browser/network actions, private-data access, repository edits, staging or commits were performed. The primary owns executable journey verification.
