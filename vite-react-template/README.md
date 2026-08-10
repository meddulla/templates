# React + Vite + Hono + Cloudflare Workers

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/templates/tree/main/vite-react-template)

This template provides a minimal setup for building a React application with TypeScript and Vite, designed to run on Cloudflare Workers.

> **This is an adapted copy.** It is the upstream `vite-react-template` changed
> to build and run inside an in-browser Worker IDE, where there is no Node
> process. See [Adaptations](#adaptations) for every change and what it costs —
> notably, deploying to Cloudflare is no longer wired up.

![React + TypeScript + Vite + Cloudflare Workers](https://imagedelivery.net/wSMYJvS3Xw-n339CbDyDIA/fc7b4b62-442b-4769-641b-ad4422d74300/public)

<!-- dash-content-start -->

🚀 Supercharge your web development with this powerful stack:

- [**React**](https://react.dev/) - A modern UI library for building interactive interfaces
- [**Vite**](https://vite.dev/) - Lightning-fast build tooling and development server
- [**Hono**](https://hono.dev/) - Ultralight, modern backend framework
- [**Cloudflare Workers**](https://developers.cloudflare.com/workers/) - Edge computing platform for global deployment

### ✨ Key Features

- 📦 TypeScript support out of the box
- 🎯 API routes with Hono's elegant routing
- 🔄 Full-stack development setup
- 🔎 Built-in Observability to monitor your Worker

Get started in minutes with local development or deploy directly via the Cloudflare dashboard. Perfect for building modern, performant web applications at the edge.

<!-- dash-content-end -->

## Getting Started

To start a new project with this template, run:

```bash
npm create cloudflare@latest -- --template=cloudflare/templates/vite-react-template
```

A live deployment of this template is available at:
[https://react-vite-template.templates.workers.dev](https://react-vite-template.templates.workers.dev)

## Development

Install dependencies:

```bash
npm install
```

Start a preview of the Worker with:

```bash
npm run dev
```

This bundles `src/worker/index.ts` and serves it, with the client bundle
alongside it. There is no HMR — see [Adaptations](#adaptations).

Typecheck:

```bash
npm run typecheck
```

## Production

Build the Worker and the client bundle into `dist/`:

```bash
npm run build
```

Deploying is not wired up in this copy — see
[What no longer works](#what-no-longer-works).

## Adaptations

Everything below is a change from upstream `vite-react-template`. Each one is
here because the target environment runs the toolchain as WebAssembly inside a
Worker isolate: there is no Node process, no `eval`, and the bundler is
rolldown without Vite's plugin pipeline.

| Change | Why |
| --- | --- |
| `vite.config.ts` no longer uses `@vitejs/plugin-react` | It exists for Fast Refresh and pulls in `@babel/core`. JSX needs no plugin — the bundler transforms `.tsx` natively. |
| `vite.config.ts` no longer uses `@cloudflare/vite-plugin` | It runs wrangler/miniflare as a local Node process. |
| SVG imports replaced by `src/react-app/assets.ts` | `import logo from "./react.svg"` is a Vite asset-plugin feature. The SVGs are inlined as data URIs; the page renders identically. |
| `import "./index.css"` replaced by `src/react-app/styles.ts` | Same reason. The CSS is injected into `<head>` at startup. `index.css` and `App.css` are still the sources. |
| `scripts/gen-assets.mjs` added | Regenerates the two files above from the real SVG and CSS sources, so they are not hand-maintained. Needs Node, and is not run at build time. |
| `build` names its entries explicitly | The bundler here builds a named entry rather than discovering one from `index.html`. |
| `tsc -b` replaced by `tsc -p` per project | Project references are not supported. The same three configs are still checked. |
| ESLint removed | ~100 packages for a linter that cannot run without Node. |
| An HTML fallback route in `src/worker/index.ts` | The preview runs the Worker with no static assets attached, so `/` has to come from somewhere. On a real deploy `assets` is matched first and this route never runs. |

### What no longer works

- **`npm run deploy`.** Removing `@cloudflare/vite-plugin` removes the build
  step that produces a deployable Worker + assets pair. `wrangler.json` is
  still correct and unchanged, so restoring the plugin restores deployment.
- **HMR / Fast Refresh.** No dev server; the preview is a full rebuild.
- **`npm run preview`.** It was `npm run build && vite preview`; `vite preview`
  is a Node HTTP server.

## Additional Resources

- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [Vite Documentation](https://vitejs.dev/guide/)
- [React Documentation](https://reactjs.org/)
- [Hono Documentation](https://hono.dev/)
