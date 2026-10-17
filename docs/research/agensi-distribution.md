# Agensi distribution: preliminary source review

Checked: 2026-10-17. Purpose: scope preparation, not account creation, terms acceptance or publication. The maintainer supplied an invitation and explicitly added this channel to the iterative goal. Sender identity, 65,000 monthly visitors, current GitHub stars and promised approval timing are not independently established by that invitation.

## Observed platform statements

The [seller page](https://www.agensi.io/sell) describes ZIP submission with SKILL.md, automated/AI/human review, free listing and typically 24-48 hours for review. These are platform statements, not measured outcomes or a guaranteed SLA. Its copy also says repackaged free skills may be rejected; confirm how original-author MIT projects are handled before submitting.

The [terms](https://www.agensi.io/terms), labelled updated October 12, 2026, require valid skill ZIPs and rights to distribute. They describe agent-connection-only delivery, restrictions on saving/exporting acquired skill files, creator ownership and a non-exclusive platform distribution licence. Source/documentation links are permitted; off-platform paid upsells are restricted. Paid-sale proceeds are described as 70% of net price excluding sales tax, with processing included in the platform fee; refunds reverse the creator share. Paid publication requires enabled payouts. These are observations of the posted text, not legal or tax advice or proof of eligibility.

## Project-specific questions

The repository's [MIT licence](../../LICENSE) permits redistribution subject to retaining its notice. The platform's restricted delivery terms and the toolkit's external local CLI prerequisite need explicit compatibility review; no legal incompatibility or operational compatibility is assumed. A SKILL.md ZIP alone does not install Node or the CLI. The completed five-skill inspection found no sibling SKILL.md dependency; each invokes the same external CLI directly. Check the [creator guides](https://www.agensi.io/learn/for-creators), actual upload contract and agent workflow before selecting package layout or claiming compatibility.

Prefer free draft listings for the existing core, retaining GitHub access and MIT notices. Five independently usable packages must disclose dependencies and truthful local-only behavior. Exclude private application data, website captures, invented AI answers, unsupported growth claims and paid-pack promises. Any new packaging tool requires meaningful tests; changes to the skills require reviewed observable workflow evidence.

## Evidence and decision state

Official pages were read without account creation or uploads. Stripe Directory was consulted first; the installed 0.3.5 plugin initially failed to start under the sandbox, and its read-only help succeeded on an authorized retry. Two [recorded searches](agensi-directory-lookup.json) did not establish an exact Agensi provider match: the name query returned an unrelated provider and the refined domain/marketplace query returned an empty array, both with exit 0. This does not prove the marketplace unsafe or nonexistent. Official Agensi pages are self-published source evidence, not independent traffic or security verification. No global tool upgrade or account provisioning occurred.

Research and package preparation are authorized. Account, proposed free pricing, terms and final submission remain decisions for a concrete artifact review. Record actual review outcomes and live URLs only after observing them. Do not send the sender a reply under this authorization.

Completed format/CLI/delivery research and dated source receipts are in [the format review](agensi-format.md). The [preparation specification](../../distribution/agensi/spec.md) selects an immutable verified core; it does not establish platform compatibility or approve submission.
