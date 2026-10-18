# TICKET-029 retained-render evidence addendum

**The narrow Markdown row-integrity defect is now supported by actual primary renderer output.** The original assessment remains preserved.

All four supplemental manifest sizes/hashes match. Each recorded Markdown input digest matches the original immutable packet. Static inspection of retained HTML table cells independently matches the recorded row arrays: LF produces one complete unknown row; CR and CRLF each produce two rows, with a blank-status fragment followed by the intended unknown row. There is no invented pass status; escaped payload pipes remain Check-cell text.

The primary recorded marked 17.0.5 with gfm:true, renderer hash/options and Node identity, followed by Cheerio inspection. This is actual recorded Markdown-to-HTML conversion, not a native-browser observation. I inspected the retained bytes/arrays and did not execute the renderer or product.

A minimal repair is evidence-backed: normalize CRLF/CR/LF consistently only for Markdown scope/finding fields, preserve original JSON/raw-source bytes and genuine statuses, and retain existing pipe/HTML escaping. Verify real CLI cases plus retained row/cell interpretation. No source fix or new implementation acceptance is claimed here.
