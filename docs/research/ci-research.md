# GEO core CI research

Verified on 2026-10-16 against official GitHub action repositories and GitHub documentation. Research only: no workflow was executed and no repository settings were inspected or changed.

## Verified action references

The official `releases/latest` endpoints returned these releases. Each tag-ref endpoint returned an object of type `commit` with the SHA below, and the corresponding `action.yml` file was fetched at that SHA.

| Action | Latest release observed | Exact workflow reference | Primary evidence |
|---|---|---|---|
| Checkout | v7.0.1, published 2026-07-20 | `actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1` | [Release](https://github.com/actions/checkout/releases/tag/v7.0.1), [tag API](https://api.github.com/repos/actions/checkout/git/ref/tags/v7.0.1), [pinned action.yml](https://github.com/actions/checkout/blob/3d3c42e5aac5ba805825da76410c181273ba90b1/action.yml) |
| Setup Node | v7.1.0, published 2026-10-08 | `actions/setup-node@949feb2413d6458794dcd2491c4babbbce0c15c1` | [Release](https://github.com/actions/setup-node/releases/tag/v7.1.0), [tag API](https://api.github.com/repos/actions/setup-node/git/ref/tags/v7.1.0), [pinned action.yml](https://github.com/actions/setup-node/blob/949feb2413d6458794dcd2491c4babbbce0c15c1/action.yml) |
| Upload artifact | v7.0.2, published 2026-10-07 | `actions/upload-artifact@cf430e030ddbb5b0abf93d22962f4752f3646cd9` | [Release](https://github.com/actions/upload-artifact/releases/tag/v7.0.2), [tag API](https://api.github.com/repos/actions/upload-artifact/git/ref/tags/v7.0.2), [pinned action.yml](https://github.com/actions/upload-artifact/blob/cf430e030ddbb5b0abf93d22962f4752f3646cd9/action.yml) |

All three pinned actions declare `runs.using: node24`. Node selected for project commands is separate: set setup-node's `node-version: '24'`. Its [pinned README](https://github.com/actions/setup-node/blob/949feb2413d6458794dcd2491c4babbbce0c15c1/README.md#L29) documents a minimum runner version of 2.327.1 for its Node 24 runtime. Use a GitHub-hosted Linux runner for the initial implementation; self-hosted compatibility was not verified.

## Recommended PR workflow

- Trigger on `pull_request` and pushes to the default branch. Keep `pull_request_target` and privileged follow-up workflows out of this CI design.
- Set workflow-level `permissions: { contents: read }`. Both [checkout](https://github.com/actions/checkout/blob/3d3c42e5aac5ba805825da76410c181273ba90b1/README.md#L377) and [setup-node](https://github.com/actions/setup-node/blob/949feb2413d6458794dcd2491c4babbbce0c15c1/README.md#L266) recommend this scope. GitHub specifies that [omitted permission scopes become `none`](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax#permissions) once any scope is set.
- Use the exact SHA references above and a release-version comment for readability. Set checkout `persist-credentials: false`; default shallow checkout is sufficient for deterministic package checks.
- Set setup-node `node-version: '24'` and `package-manager-cache: false` initially. The [source](https://github.com/actions/setup-node/blob/949feb2413d6458794dcd2491c4babbbce0c15c1/action.yml) shows automatic package caching otherwise defaults on for detected npm projects. Explicit `cache: npm` is an optional later performance choice, not a correctness requirement.
- Run the committed lockfile install with `npm ci`, then the actual repository scripts for typecheck, tests, and build in sequence. Expected names such as `npm run typecheck`, `npm test`, and `npm run build` must match package.json; this task deliberately did not inspect or execute repository source.
- Give the job a bounded timeout, for example 10 minutes. A PR-specific concurrency group with cancellation of superseded runs is a reasonable cost-control recommendation.

## Recommended weekly fixture workflow

- Separate workflow with `schedule` and `workflow_dispatch`; retain `contents: read`, disabled persisted checkout credentials, Node 24, and the same validation sequence.
- Run only the repository's deterministic fixture-report command. No provider credentials, paid API calls, deployments, publishing, automatic commits, or PR creation are needed.
- Choose a non-hour-boundary weekly minute, for example Monday 04:23 UTC (`23 4 * * 1`). This is a suggested engineering default, not a user-requested notification schedule. [GitHub's schedule documentation](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#schedule) states that schedules run the latest default-branch commit and may be delayed or dropped under load; the workflow file must exist on that branch. Expose manual dispatch for a reproducible rerun.
- Upload only intended fixture report files, with `if-no-files-found: error`, `retention-days: 14`, an artifact name including the run ID, and default `overwrite: false`. The [action inputs](https://github.com/actions/upload-artifact/blob/cf430e030ddbb5b0abf93d22962f4752f3646cd9/action.yml) support those values. The selected retention must remain within the [repository/organization/enterprise limit](https://docs.github.com/en/actions/tutorials/store-and-share-data#configuring-a-custom-artifact-retention-period).
- **Hidden-path trap:** upload-artifact excludes dotfiles and files inside dot directories by default, as its [pinned README](https://github.com/actions/upload-artifact/blob/cf430e030ddbb5b0abf93d22962f4752f3646cd9/README.md#L432) documents. `.geo/reports` therefore needs deliberate handling. Prefer copying the explicitly named generated report files into a nonhidden temporary directory and uploading only that directory. If `include-hidden-files: true` is used, keep the upload path restricted to the exact report outputs rather than the repository or `.geo` tree.
- Upload in a normal successful step when complete reports are required. If failure diagnostics are later retained with an unconditional step, give them a separate name and avoid presenting partial output as a successful baseline.

## Verification limits

The action releases, commit SHAs, declared runtimes, inputs, and cited documented behavior were verified by fetching the primary sources. A passing GitHub-hosted run, repository Actions policy, billing quota, runner image availability, branch protection, npm scripts, fixture-output paths, and actual artifact retention settings remain unverified by this research task. No source code or workflow was executed.
