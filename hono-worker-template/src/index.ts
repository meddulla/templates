import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => c.text("Hello from edgeblitz!"));
app.get("/api/hello", (c) => c.json({ ok: true, at: Date.now() }));

export default app;
