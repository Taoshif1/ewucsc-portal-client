import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const configuredApi = (env.VITE_API_URL || "http://localhost:5000/api").replace(/\/$/, "");

  let proxyTarget = "http://localhost:5000";
  let proxyApiBase = "/api";

  try {
    const parsed = new URL(configuredApi);
    proxyTarget = parsed.origin;
    proxyApiBase = parsed.pathname.replace(/\/$/, "") || "/api";
  } catch {
    // Relative VITE_API_URL values fall back to the standard local Express server.
  }

  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        "/api": {
          target: proxyTarget,
          changeOrigin: true,
          secure: true,
          rewrite: (path) =>
            proxyApiBase + path.replace(/^\/api/, ""),
        },
      },
    },
  };
});
