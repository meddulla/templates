import { Hono } from "hono";
import { renderToString } from "react-dom/server";
import { App } from "../src/App";

const app = new Hono();

app.get("/", (c) => {
  const url = new URL(c.req.url);
  const name = url.searchParams.get("name") ?? "world";
  const count = Number(url.searchParams.get("start")) || 0;
  const html = renderToString(<App name={name} count={count} />);
  return c.html(`
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>hono-react example</title>
  </head>
  <body>
    <div id="app">${html}</div>
    <script>window.__INIT__ = ${JSON.stringify({ name, count })};</script>
    <script type="module" src="./client.js"></script>
  </body>
</html>
`);
});

app.get("/api/hello", (c) =>
  c.json({ greeting: "hi from hono", at: Date.now() }),
);

export default app;
