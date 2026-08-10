# Hono + React full-stack Worker

Server-side rendered React inside a Hono Worker, with client hydration.

```sh
npm install
npm run typecheck   # tsc -p tsconfig.worker.json && tsc -p tsconfig.client.json
npm run build       # bundles the SSR entry and the client entry, to dist/
```

`npm run build` is rolldown and nothing else — no Worker isolate is loaded
for it — so it is the thing to try when **Preview** misbehaves: if the build is
clean, the bundling is not what is wrong.

Then hit **Preview** to bundle and open it in a new tab. The equivalent by hand
is `vite dev worker/index.tsx`, which prints a `/__dev/<id>/` URL.

## `wrangler.json`

`main` names the Worker entry, and the IDE's **Preview** button reads it from
here rather than guessing at a filename — so renaming the entry only needs
changing in one place.

There is deliberately no `$schema` key. It would point at
`node_modules/wrangler/config-schema.json`, and `wrangler` is not a dependency
of this template: adding it back for editor completion alone would undo most of
the install-size reduction. Deploying is not wired up in the IDE.
