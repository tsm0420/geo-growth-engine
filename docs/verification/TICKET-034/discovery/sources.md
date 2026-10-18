# Primary format evidence

Read on 2026-10-18: https://www.sitemaps.org/protocol.html, opening format requirements and XML tag definitions. The protocol places each page loc under a url entry within the root urlset. Sitemap indexes have their own sitemap/loc structure. Extensions use declared namespaces. The toolkit already accepts unnamespaced local urlsets and does not claim full schema validation; this research does not authorize namespace/XSD enforcement or index expansion.

Original fictional CLI observations show three misplaced loc shapes passing sitemap/duplicates/coverage, despite no direct urlset/url/loc entry. Direct and namespaced image-extension controls pass. An unrelated off-origin sibling currently makes sitemap fail while retaining direct-page coverage; it is an extraction observation, not a claimed full-protocol validity judgment.
