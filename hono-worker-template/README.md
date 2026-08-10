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
