import { crx, defineManifest } from "@crxjs/vite-plugin";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const manifest = defineManifest({
  manifest_version: 3,
  name: "Time Recorder",
  version: "1.0.0",
  permissions: ["bookmarks", "storage"],
  action: {
    default_popup: "index.html",
  },
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), crx({ manifest })],
});
