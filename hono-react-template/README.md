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
