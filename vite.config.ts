import { vitePlugin as remix } from "@remix-run/dev";
import { vercelPreset } from "@vercel/remix/vite";
import { flatRoutes } from "remix-flat-routes";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    remix({
      routes: async (defineRoutes) => flatRoutes("routes", defineRoutes),
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
      presets: [...(process.env.VERCEL ? [vercelPreset()] : [])],
    }),
    tsconfigPaths(),
  ],
});
