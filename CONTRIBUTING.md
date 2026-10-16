# Contributing

This is an early alpha. Start with an issue describing the observed problem, a reproducible input, the expected result, and the actual result. Check existing issues first. Discuss large changes before implementing them. Remove personal information and credentials from examples.

## Development

Use Node.js 24 and the checked-in npm lockfile:

```sh
npm ci --ignore-scripts
npm run typecheck
npm test
npm run build
```

Tests launch real CLI commands against isolated files. Add a failing test for a new behavior or bug before changing executable source, and include operational failures and evidence retention where relevant. Keep TypeScript strict and repository prose in English. Read [AGENTS.md](AGENTS.md), the [glossary](CONTEXT.md), and the [core specification](docs/spec.md).

## Pull requests

Keep one observable change per PR and reference its issue. Explain the problem, resulting behavior, and commands you actually ran. Source changes require a ticket with objectives, constraints, acceptance criteria, Status, and an Execution Report; see `tickets/archive/` for examples. Record Standards and Spec reviews separately. Each additional repository agent uses its own worktree and index.

Include original evidence or a disclosed redacted copy for measurements. Keep fixture demonstrations visibly labelled. A local HTML check does not establish live indexing, AI recommendations, store approval, or growth. Platform-rule changes require an official source checked during the change.

Contributions are provided under the repository's [MIT license](LICENSE). Dependency and upstream licenses remain separate. Report suspected vulnerabilities through the private route in [SECURITY.md](SECURITY.md).
