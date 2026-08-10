import { hydrateRoot } from "react-dom/client";
import { App } from "./App";

declare global {
  interface Window { __INIT__?: { name: string; count: number } }
}

const init = window.__INIT__ ?? { name: "world", count: 0 };
const el = document.getElementById("app");
if (el) {
  hydrateRoot(el, <App name={init.name} count={init.count} />);
}
