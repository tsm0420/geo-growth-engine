# Agensi publication decision

Status: Required maintainer decision; no account, terms acceptance, price commitment, upload, scan approval or live listing observed.

Five local candidates and English descriptions are reviewable in [listing drafts](listings.md); [manifest](manifest.json) pins the final core revision, ZIP bytes and member hashes. Each instruction package requires Node 24+, a local shell/filesystem and the separately installed pinned CLI. None requires a sibling skill. Public GitHub MIT source remains available. Proposed initial price: Free.

## Unresolved platform fit

- Original-author free MIT eligibility: the seller page warns against repackaged free skills, without clarifying this original toolkit's acceptance.
- External CLI: the older creator guidance favors self-contained workflows; current public documents do not explicitly accept this local CLI prerequisite.
- Delivery and notices: current terms describe agent-only delivery without saving/export. Supporting-file access and how the MIT notice is presented were not observed in an authenticated flow. Local extraction proves neither legal compatibility nor MCP behavior.
- Account: a creator guide says Stripe is needed even for free listings; current seller/terms wording explicitly ties enabled payouts to paid publication. No free-creator payout requirement was confirmed, and payout/KYC/bank setup is outside the authorized scope.
- Actual upload validation limits, platform triggering and scan/review acceptance remain unobserved.

Dated primary sources and discrepancies: [format review](../../docs/research/agensi-format.md), [seller page](https://www.agensi.io/sell), [creator workflow](https://www.agensi.io/learn/how-to-sell-skills-on-agensi), and [current terms](https://www.agensi.io/terms). The invitation's traffic and approval-time claims are not repeated as verified results.

## Available disposition

The maintainer can approve retaining these candidates and deferring submission until platform fit is clarified, or explicitly authorize a specified account/free-price/terms/upload plan after reviewing these artifacts and remaining questions. A deferral is recorded as deferred; it is not publication or live availability. Preparation does not authorize a sender reply, account creation, terms acceptance, uploads or financial onboarding. Any later authorized submission must retain actual review receipts and observed URLs/states.

No disposition has been chosen yet. Separate [Standards and Spec artifact reviews](../../docs/reviews/agensi/README.md) found no actionable introduced findings, and the [independent local skill evaluation](../../docs/verification/TICKET-008/independent-forward-report.md) completed with raw receipts. The preparation is ready for the final decision; these local results do not resolve the platform questions above.
