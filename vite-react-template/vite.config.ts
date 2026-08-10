import { defineConfig } from "vite";

// No plugins.
//
// The upstream template uses @vitejs/plugin-react and @cloudflare/vite-plugin.
// Neither is usable in the in-browser environment this fork targets: the React
// plugin exists for Fast Refresh and pulls in @babel/core, and the Cloudflare
// plugin drives wrangler/miniflare as a local Node process. JSX itself needs
// no plugin — the bundler transforms .tsx natively.
//
// See README for the full list of adaptations.
export default defineConfig({
	build: {
		minify: true,
	},
});
