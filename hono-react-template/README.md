# Hono + React full-stack Worker

Server-side rendered React inside a Hono Worker, with client hydration.

```sh
npm install
npm run typecheck   # tsc -p tsconfig.worker.json && tsc -p tsconfig.client.json
npm run build       # bundles the SSR entry and the client entry, to dist/
npm run build:run   # builds the SSR entry, then executes the bundle once
```

`npm run build` produces two bundles from two entries: `worker/index.tsx` to
`dist/server`, and `src/client.tsx` to `dist/client`. Both are required — the
server renders the markup and the client hydrates it.

`build:run` exists because a bundle can build cleanly and still not execute. It
runs the SSR bundle after building it, so a missing dependency shows up as a
failed render rather than as a passing build.

## `wrangler.json`

`main` names the Worker entry. Keeping it accurate means tooling can find the
entry without guessing at a filename, so renaming it only needs changing here.

`assets.directory` is `./dist/client`, which is where the client half of
`npm run build` lands.

There is deliberately no `$schema` key. It would point at
`node_modules/wrangler/config-schema.json`, and `wrangler` is not a dependency
of this template — adding it back for editor completion alone would undo most of
the install-size reduction.
