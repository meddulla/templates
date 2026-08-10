# Hono Worker

A minimal Cloudflare Worker built with Hono.

```sh
npm install
npm run typecheck   # tsc --noEmit
npm test            # vitest, runs test/app.test.ts
npm run build       # vite build src/index.ts -> dist/
```

Hit **Preview** to bundle this Worker and open it in a new tab. It saves the
open file first, then runs `vite dev src/index.ts` in the terminal below, so
bundle errors show up there. Each Preview builds afresh — re-run it after an
edit.

## `wrangler.json`

`main` names the Worker entry, and the IDE's **Preview** button reads it from
here rather than guessing at a filename — so renaming the entry only needs
changing in one place.

There is deliberately no `$schema` key. It would point at
`node_modules/wrangler/config-schema.json`, and `wrangler` is not a dependency
of this template: adding it back for editor completion alone would undo most of
the install-size reduction. Deploying is not wired up in the IDE.
