# Backlog

- BL-001: Investigated for alpha 2; unresolved upstream publication constraint. Cheerio 1.2.0 still requires encoding-sniffer ^0.2.1, which requires deprecated whatwg-encoding ^3.1.1. The migration on upstream main is not a published compatible release. Keep [issue #7](https://github.com/tsm0420/geo-growth-engine/issues/7) open; retain the warning and decoding regression. See the [investigation](research/encoding-dependency.md).
- BL-002: Implemented in the alpha 2 candidate under TICKET-006 / [issue #8](https://github.com/tsm0420/geo-growth-engine/issues/8). CLI regression tests and the [frozen YinThread re-audit](case-studies/yinthread/README.md#alpha-2-candidate-re-audit) expose the duplicate. Pending PR review/merge; no production-site change is included.
