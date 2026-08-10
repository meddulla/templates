# Hono Worker

A minimal Cloudflare Worker built with Hono.

```sh
npm install
npm run typecheck   # tsc --noEmit
npm test            # vitest, runs test/app.test.ts
npm run build       # vite build src/index.ts -> dist/
```

## `wrangler.json`

`main` names the Worker entry. Keeping it accurate means tooling can find the
entry without guessing at a filename, so renaming it only needs changing here.

There is deliberately no `$schema` key. It would point at
`node_modules/wrangler/config-schema.json`, and `wrangler` is not a dependency
of this template — adding it back for editor completion alone would undo most of
the install-size reduction.
