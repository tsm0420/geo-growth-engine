
> geo-growth-engine@0.1.0-alpha.1 geo
> node src/cli.ts audit --config examples/.geo/config.yaml --output reports/example

{"output":"reports/example","pass":16,"fail":0,"unknown":2}

> geo-growth-engine@0.1.0-alpha.1 geo
> node src/cli.ts aso --config examples/.geo/config.yaml --output reports/example

{"output":"reports/example","pass":9,"fail":0,"unknown":2}

> geo-growth-engine@0.1.0-alpha.1 geo
> node src/cli.ts plan --config examples/.geo/config.yaml --output reports/example

{"output":"reports/example","pass":1,"fail":0,"unknown":0}

> geo-growth-engine@0.1.0-alpha.1 geo
> node src/cli.ts visibility --config examples/.geo/config.yaml --input examples/visibility.jsonl --output reports/example

{"output":"reports/example","pass":0,"fail":0,"unknown":3}
