# Local sitemap remediation rehearsal

This is a disposable-copy rehearsal using the real 2026-10-16 capture. The edited copy was audited locally on 2026-10-18. It is a derived local artifact, with no deployment or new website observation. The original bodies, capture metadata, notices and historical reports remain unchanged. The product remains `example: false` because the source corpus concerns a real product; that flag does not authenticate the edited copy as deployed content.

## Observed local result

| Artifact | CLI exit | Pass / fail / unknown | Sitemap entries / unique / excess |
| --- | --- | --- | --- |
| Before patch | 1 | 16 / 1 / 2 | 146 / 145 / 1 |
| After patch | 0 | 17 / 0 / 2 | 145 / 145 / 0 |
| Comparison | 0 | 17 / 0 / 3 | One status change, one details change, 17 unchanged |

The [small data patch](remove-second-day-master.patch) removes the second day-master URL element, originally at entry 12 and lines 69–74, while retaining entry 8. Both blocks are byte-identical; surrounding context identifies the second. The applied copy equals the original bytes with exactly that span removed. No other original file bytes changed. A dry-run check on an already patched control returns 1 and leaves that control unchanged.

The duplicate finding changes from fail to pass. The sitemap count evidence changes from 146 to 145. Schema semantics and live indexing remain unknown, and comparison adds its own unknown scope finding. These observations establish a local technical cleanup; indexing, citations, traffic and growth remain unmeasured.

Inspect the raw [before report](../../../verification/TICKET-020/before-audit.json), [after report](../../../verification/TICKET-020/after-audit.json), [comparison](../../../verification/TICKET-020/comparison-compare.json) and [command/hash manifest](../../../verification/TICKET-020/manifest.json). Report timestamps identify execution; input paths identify the temporary copy. Original-byte digests and parsed before/after reports are retained by the comparator.

## Reproduce in a new temporary directory

Use Node.js 24 and a built checkout of this `codex/yinthread-local-remediation` documentation candidate, with `compare` visible in `node dist/src/cli.js --help`. The published alpha 1 does not include comparison. The block below requires a POSIX shell, `cp`, `mktemp`, `shasum`, and `patch` supporting `--dry-run`. The recorded walkthrough used macOS arm64; other runtimes need their own execution evidence.

Run from the toolkit checkout root. This block uses a subshell, creates a new directory, verifies the frozen sitemap digest, and retains all results at the printed path. The baseline must exit 1 for the known duplicate; an operational error is rejected. Other commands must succeed.

```sh
(
  set -eu
  GEO_TOOLKIT_ROOT="$(pwd -P)"
  GEO_CLI="$GEO_TOOLKIT_ROOT/dist/src/cli.js"
  GEO_REHEARSAL_ROOT="$(mktemp -d /tmp/geo-yinthread-rehearsal.XXXXXX)"
  GEO_REHEARSAL_ROOT="$(cd "$GEO_REHEARSAL_ROOT" && pwd -P)"
  mkdir "$GEO_REHEARSAL_ROOT/case"
  cp -R "$GEO_TOOLKIT_ROOT/docs/case-studies/yinthread/public" "$GEO_REHEARSAL_ROOT/case/public"
  cp -R "$GEO_TOOLKIT_ROOT/docs/case-studies/yinthread/config" "$GEO_REHEARSAL_ROOT/case/config"
  GEO_SITEMAP_SHA="$(shasum -a 256 "$GEO_REHEARSAL_ROOT/case/public/sitemap.xml")"
  if [ "${GEO_SITEMAP_SHA%% *}" != "8edaa414edeedc46b0152db4f7c0bab7b292400f495e40dd4f7d358865a3ea06" ]; then
    echo "Unexpected snapshot bytes; stop before patching." >&2
    exit 2
  fi
  GEO_BEFORE_EXIT=0
  node "$GEO_CLI" audit --config "$GEO_REHEARSAL_ROOT/case/config/config.yaml" --output "$GEO_REHEARSAL_ROOT/before" || GEO_BEFORE_EXIT=$?
  if [ "$GEO_BEFORE_EXIT" -ne 1 ]; then
    echo "Expected baseline exit 1; got $GEO_BEFORE_EXIT." >&2
    exit 2
  fi
  patch --dry-run -f -F 0 -p1 -d "$GEO_REHEARSAL_ROOT/case" -i "$GEO_TOOLKIT_ROOT/docs/case-studies/yinthread/remediation/remove-second-day-master.patch"
  patch -f -F 0 -p1 -d "$GEO_REHEARSAL_ROOT/case" -i "$GEO_TOOLKIT_ROOT/docs/case-studies/yinthread/remediation/remove-second-day-master.patch"
  node "$GEO_CLI" audit --config "$GEO_REHEARSAL_ROOT/case/config/config.yaml" --output "$GEO_REHEARSAL_ROOT/after"
  node "$GEO_CLI" compare --before "$GEO_REHEARSAL_ROOT/before/audit.json" --after "$GEO_REHEARSAL_ROOT/after/audit.json" --output "$GEO_REHEARSAL_ROOT/comparison"
  echo "Rehearsal artifacts: $GEO_REHEARSAL_ROOT"
)
```

Use a fresh copy for each rehearsal. The patch is specific to the digest above and is not a general sitemap repair tool. For a real product change, repair the generating source and build/export it under the applicable authorization; this example edits only a temporary saved export. The separate ten-PR integration decision does not authorize merging this future documentation branch.

## Evidence rights

The source [NOTICE](../public/NOTICE.txt) remains with the copied corpus. Captured website/brand/third-party rights remain with their owners; the scoped data patch does not grant website reuse rights. Full before/after copied XML bodies remain in local verification artifacts rather than being presented as new MIT toolkit source. Toolkit code remains under its existing license.
