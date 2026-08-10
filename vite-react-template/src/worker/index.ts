import { Hono } from "hono";

const app = new Hono<{ Bindings: Env }>();

app.get("/api/", (c) => c.json({ name: "Cloudflare" }));

// HTML fallback.
//
// On a real deploy this route never runs: `assets` in wrangler.json is checked
// before the Worker, so `/` is answered with the built dist/client/index.html
// and `not_found_handling: single-page-application` handles client routes.
//
// It exists for environments that run the Worker with no static assets
// attached — the in-browser preview this fork targets, where the client bundle
// is served next to the Worker as /main.js. Keep it in sync with index.html.
const INDEX_HTML = `<!doctype html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Vite + React + TS</title>
	</head>
	<body>
		<div id="root"></div>
		<script type="module" src="/main.js"></script>
	</body>
</html>
`;

app.get("*", (c) => c.html(INDEX_HTML));

export default app;
