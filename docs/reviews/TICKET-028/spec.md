# TICKET-028 independent Spec review

Disposition: no actionable findings.

Reviewed the nine overlaid paths, including both untracked module/test files, against fixed point `b5483c3f1b286fae23b9cbe381f94a8639c94d59`, TICKET-028 and `docs/visibility-metric-comparison-spec.md` in exclusive worktree `/private/tmp/geo028-spec`. All nine hashes match `review-inputs.json`. New module SHA-256: `450b69212f84b1aadced43fa5b847ef7a5adc0fe8fd52b2f9ef49ce9960b10ff`; test SHA-256: `f058dd0bf6dd48346d4fb1134400cf70aed9b2f63983c24518e60ad6b37bbdd6`.

The explicit flag reaches only comparison and rejects other operational commands before writes. Existing schema/kind/example validation remains; explicit mode additionally requires two visibility reports. Default comparison still accepts opaque data and emits its original structural findings/categories and scope text without metric projection.

Totals validation enforces nonnegative safe counts, exact count consistency, coverage's null/denominator rule, finite rate ranges and mention/citation nulls exactly at zero successes. Errors identify before/after and the affected data fields before the existing writer is invoked. The count-consistency subtraction avoids accepting unsafe overflow sums.

Projection emits the exact six ordered rows/units and after-minus-before arithmetic. Null sides yield null differences; zeros remain numeric zeros. Full fractions remain in data, with two-decimal percentages/percentage points rendered separately. Six added metric findings are unknown and leave structural category counts unchanged. Comparable product/query/collection conditions, provenance and attribution remain explicitly unverified. Later source failures still determine exit 1; unavailable values do not become successes.

Reading/digests remain owned by compare; source reports and the existing complete input/output alias preflight remain intact. The new small module owns validation/projection/rendering; the exported statistics type supplies its structural fields. CLI help, README, configuration and tracker instructions consistently describe the optional bounded behavior without group/competitor alignment or remeasurement.

Real-CLI tests statically cover positive/negative/null/default/precision, malformed totals, after-failure exits and input/alias/later-conflict preservation. Primary reports 190 passing tests and successful typecheck/build; I did not execute tests or inspect root receipts. Package/installed-skill proof, final delivery bookkeeping/reviews and exact-head CI remain separate gates. No source/index/remote mutation, product execution, network, private/root/other-worktree access or Standards-report reading occurred.
