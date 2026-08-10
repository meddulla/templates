import { describe, expect, it } from "vitest";
import app from "../src/index";

describe("hono worker", () => {
  it("serves text from /", async () => {
    const res = await app.fetch(new Request("http://localhost/"));
    expect(res.status).toBe(200);
    expect(await res.text()).toBe("Hello from Hono!");
  });

  it("serves JSON from /api/hello", async () => {
    const res = await app.fetch(new Request("http://localhost/api/hello"));
    expect(res.status).toBe(200);
    expect(await res.json()).toMatchObject({ ok: true });
  });

  it("404s an unknown route", async () => {
    const res = await app.fetch(new Request("http://localhost/nope"));
    expect(res.status).toBe(404);
  });
});
