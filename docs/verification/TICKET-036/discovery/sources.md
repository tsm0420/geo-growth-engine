# Primary numeric representation reference

Read 2026-10-18: RFC8259 section6, https://www.rfc-editor.org/rfc/rfc8259#section-6 . JSON permits exponent-form numeric tokens; implementations may limit supported range/precision, and the RFC identifies extremely large exponents as an interoperability concern. This does not make 1e400 malformed JSON syntax or require arbitrary-precision support.

Actual Node24.22.0 probes and CLI receipts retain the distinction: 1e308 remains finite, while ±1e400 parse to nonfinite numbers and are serialized as null. Raw input bytes/digests remain correct. The candidate defect is silent loss of parsed metadata in successful comparison output, not failed raw-byte retention, incorrect finding categories or proof that finite numbers retain arbitrary decimal precision.
