# TICKET-019 retained-evidence inspection

**No confirmed report/provenance defect within this bounded static inspection.** Worktree HEAD: `f90869ef0aec8c5f4d65c6dc76aa600e0e9e9a39`.

Recomputed all three captured-body byte counts/SHA-256 values against `docs/case-studies/yinthread/capture.json:13`, `:50`, `:87`:

- `public/index.html`: 29,426 bytes, `4f3faa316cc46519c856ec282b418c6a4442a9f13d5824eadbea411be0ef8e76`.
- `public/robots.txt`: 502 bytes, `fea0bdc19fe2f68d0fcb3382ff3656cf01a8b9c26def637fd11fe99e46b60155`.
- `public/sitemap.xml`: 26,918 bytes, `8edaa414edeedc46b0152db4f7c0bab7b292400f495e40dd4f7d358865a3ea06`.

Metadata records three HTTPS 200/no-redirect observations on 2026-10-16, separately from the retained DNS failures; it is historical acquisition evidence, not a fresh response. Notice `public/NOTICE.txt:1` excludes website bodies from MIT. Config/product specify the matching origin and actual-artifact flag.

Static XML parsing confirms 146 entries/145 unique URLs; day-master duplicates at positions 8/12 are physically at `public/sitemap.xml:46` and `:70`. Static HTML parsing confirms title, description/social metadata, one H1, canonical and one parseable JSON-LD block. No scripts executed.

Historical `results/audit.json:117` correctly totals 16/0/2. Its public-copy hashes match `docs/releases/evidence-normalization.json:114` and `:119`; the path transformation is disclosed. `results-alpha-2/audit.json:23` and alpha-2/TICKET-014 candidate `package-yinthread-audit.json:23` consistently expose the duplicate and total 16/1/2. Their other finding statuses match; scope and semantics/indexing unknowns remain explicit. Candidate command receipts match their manifests' revisions and expected exit 1. `README.md:25`, `:31`, `:43` correctly distinguish manual discovery, added capability and normalization.

Direction: demonstrate a separate local deduplicated export and comparison if useful; preserve frozen originals. This supports technical cleanup only, with no live fix, visibility or growth effect established.

Inspected the foregoing files plus case README/config/product/inspection/failure records, paired Markdown reports, alpha-2 README/snapshot hashes, normalization record and two candidate manifests/receipts. Commands: `git rev-parse HEAD`, `git status --short`, `rg`, `nl -ba`, and `python3 -` using hashlib, JSON, ElementTree and HTMLParser for static checks. No product CLI, tests, source edits, network/browser, private-data or other-worktree access occurred.
