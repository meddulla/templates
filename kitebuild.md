# Running Cloudflare Templates In Kitebuild

This compatibility overlay targets `cloudflare/templates` commit
`2c1eab4781979befe557aec6634eddc44c38a935`. It adapts commands that cannot run
inside a Cloudflare Worker; it is not a replacement for the repository's normal
Node development environment.

Apply it to a clean checkout of that commit:

```sh
git apply kitebuild.patch
pnpm install --frozen-lockfile
```

## Workspace Tasks

Turbo is replaced by Vite+'s `vp run` applet. The root scripts use
`--filter '*'` to select workspace packages without recursively selecting the
root package.

`vp run` starts independent package jobs concurrently, using four workers by
default. It preserves package dependency order, reports prerequisite failures
without starting dependants, and accepts `--concurrency-limit <n>` when a lower
cap is needed. The explicit build passes before `check` and `cf-typegen`
preserve the prerequisites formerly declared in `turbo.json`.

Manifest scripts are deliberately uncached. Kitebuild cannot use Turbo's native
automatic filesystem tracing, and safe `vp` caching requires configured tasks
with explicit `input` and `output` globs.

Run one template at a time when deploying:

```sh
vp run --filter vite-react-template build
vp run --filter vite-react-template check
vp run --filter vite-react-template deploy
```

A repository-wide deploy would modify many unrelated Cloudflare resources.
Templates with bindings also require their named resources and secrets to be
provisioned before deployment.

## Verification

A deployed Kitebuild probe cloned the target upstream commit and ran two
workspace jobs whose scripts require overlap: the first exits with status 9
unless the second starts before it finishes. One `vp run` invocation completed
both in 1.0 seconds with status 0, confirming that independent workspace jobs
run concurrently in a production Worker isolate.

The focused Kitebuild recipe also completed the patched Node HTTP server build
and x402 Oxlint check in 21 seconds. This verifies the Vite scratch-file fix in
a deployed Worker; serial execution was not required.

One repository-wide limit remains independent of the scheduler:

- An unchanged repository-wide frozen install reaches every importer and stops
  at Astro's `@astrojs/compiler` because its package Wasm exceeds Kitebuild's
  4 MiB package-Wasm limit. Use a workspace subset that excludes unsupported
  templates when validating supported packages.

## Other Compatibility Changes

- `wrangler build` becomes `wrangler deploy --dry-run`.
- Browser-only esbuild commands become config-free `vite build` commands.
- Selected ESLint and Prettier scripts use `oxlint` and `oxfmt`.
- Remote CSS font imports become browser-loaded stylesheet links.

Framework CLIs or Vite plugins that require native Node addons remain
unsupported. In particular, Next/OpenNext, Remix, React Router framework mode,
Astro's runtime Wasm dependencies, and SWC-based Vite plugins cannot be made
compatible by replacing the workspace task runner alone.
