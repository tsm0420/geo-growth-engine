# Preserve Markdown finding rows across supplied line endings

Status: Accepted correction under the continuous evidence-integrity goal; execution is tracked in TICKET-030.

## Observed problem

TICKET-029 ran three real plan CLI commands on fictional LF, CR and CRLF query IDs. All JSON reports correctly contain one unknown finding and zero passes. The existing Markdown formatter flattens LF but retains raw CR. Actual bundled marked17.0.5 GFM conversion and Cheerio DOM inspection produce one correct row for LF, but two rows for CR/CRLF: an empty-status fragment and the intended unknown row. Independent static artifact assessment confirms the retained bytes and rows. Escaped pipes protect the supplied payload's status columns; no fabricated pass or native-browser result is claimed.

## Correction contract

Normalize each CRLF, lone CR or LF sequence in formatted Markdown scope/finding text to one space, so one finding stays one physical table row. Preserve the existing HTML-entity and pipe escaping, generated report structure, summary/statuses, details and source traceability. Other control characters and general Markdown sanitization are outside this correction.

JSON preserves original strings, including exact IDs, evidence, actions and source documents/digests. Raw imported visibility evidence remains byte-identical. No source/config/input mutation, new dependency/command/flag or change to exit/file-protection behavior. The shared formatter owns this change; do not add workflow-specific cleanup or silently normalize domain inputs.

## Testing seam and verification

Use the already accepted real CLI subprocess seam. First add LF/CR/CRLF plan controls with literal expected single-row output and unchanged JSON IDs/query data; retain the actual CR/CRLF red results before editing source. Implement the smallest shared formatter correction. Then exercise compare with multiline source IDs/evidence/actions, retained raw source bytes/digests, unchanged summary/statuses and existing escaping. Inspect both physical table rows and literal text; do not test a private formatting helper.

Reconvert the retained discovery fixtures through the actual local bundled renderer after the fix and inspect resulting HTML rows: one unknown row per finding in all three cases. Record renderer identity/version/options/hash; this is local parser conversion, not universal browser validation.

Run typecheck, full tests and build with original command/output/exit/runtime/hash receipts. Complete independent Standards and Spec reviews before source commit. Build a fresh immutable package because compiled report output changes; verify clean installed audit/aso/plan/visibility/compare behavior, line-ending correction, original evidence and file safety. Reuse unrelated skill validation only with exact unchanged byte identities and its recorded revision. Complete exact-head PR CI, ordinary standing-authorized merge and final-main proof. Preserve old reports, failing receipts, frozen YinThread inputs and submitted marketplace ZIPs.

## Evidence and limits

Discovery receipts, inputs, JSON/Markdown/HTML and renderer observations remain under reports/candidates/TICKET-029/. Original independent assessment and rendering addendum remain separate. The previous PR29/main190-test milestone is complete, not rerun as evidence for this unimplemented correction. No paid/live collection, production/store change, release or Agensi resubmission is included.
