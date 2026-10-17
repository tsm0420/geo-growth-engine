# TICKET-008 packaging specification review

Scope: preparation specification only, reviewed on 2026-10-17 UTC. Draft SHA-256: `b0468c2d2ea88fe7a8a0e9c934d098e3dade8301509ba7d612414fbae24efb2d`. Read the draft, the completed official Agensi research/captured sources, active goal scope and all five unchanged SKILL.md files at `ba40c31057f3dd748a821f5a3d8b701c5f793acb`.

## Actionable finding

**[P2] Do not present the README as a marketplace requirement.** `/private/tmp/geo-agensi-packaging-spec.md:16` says “marketplace-required README.” The [official creator checklist](https://www.agensi.io/learn/skill-md-creator-checklist) describes README.md as quality guidance and says it “isn't required by the security scan.” The captured source is `creator-checklist.text.txt:148–150` under `/private/tmp/geo-agensi-format-research/`. No authenticated upload contract was observed establishing a separate mandatory README gate. Keep the useful README as this project's package requirement and reword to “package README” or “README recommended by the creator checklist.” This corrects the unsupported platform attribution without changing the artifacts or adding a user decision.

## Other scope checks

No other actionable contradiction found. The draft preserves the original skills and MIT notice, correctly exposes the external Node/local CLI dependency, and does not invent sibling dependencies. Fixture selection covers the actual commands. Pinned source, extracted independent workflows, original evidence/digests, deterministic rebuilds, structural negative controls and separate reviews are meaningful preparation seams.

The draft correctly keeps natural-language triggering, second-agent compatibility, scan approval, reference delivery and legal/platform fit unverified. Current-source pinning and actual artifacts/receipts remain future gates; no package, approval or live availability was verified in this review. Account/pricing/terms/upload remain one final concrete maintainer decision; no preliminary confirmation is needed for preparation. No source, account, connector, message or upload actions were performed.

Finding count: 1 Spec finding; no implementation review or platform certification claimed.
