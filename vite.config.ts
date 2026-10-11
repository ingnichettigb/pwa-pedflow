// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { VitePWA } from "vite-plugin-pwa";

// Import relativo (non `@/`): la config Vite non conosce gli alias del progetto.
import { APP_CONFIG } from "./src/config";

/** Manifest PWA generato da src/config.ts: niente più file statico da tenere allineato. */
const manifest = {
  name: APP_CONFIG.fullName,
  short_name: APP_CONFIG.shortName,
  description: APP_CONFIG.texts[APP_CONFIG.defaultLang].description,
  lang: APP_CONFIG.defaultLang,
  start_url: "/",
  id: "/",
  scope: "/",
  display: APP_CONFIG.pwa.display,
  orientation: APP_CONFIG.pwa.orientation,
  theme_color: APP_CONFIG.colors.blue,
  background_color: APP_CONFIG.colors.bg,
  icons: [
    ...APP_CONFIG.pwa.iconSizes.map((size) => ({
      src: `/icons/icon-${size}x${size}.png`,
      sizes: `${size}x${size}`,
      type: "image/png",
      purpose: "any",
    })),
    ...APP_CONFIG.pwa.maskableSizes.map((size) => ({
      src: `/icons/icon-maskable-${size}x${size}.png`,
      sizes: `${size}x${size}`,
      type: "image/png",
      purpose: "maskable",
    })),
  ],
};

export default defineConfig({
  vite: {
    plugins: [
      VitePWA({
        strategies: "generateSW",
        filename: "sw.js",
        registerType: "autoUpdate",
        injectRegister: null,
        manifest,
        manifestFilename: "manifest.json",
        includeManifestIcons: false,
        devOptions: { enabled: false },
        workbox: {
          cleanupOutdatedCaches: true,
          navigateFallback: null,
          runtimeCaching: [
            {
              urlPattern: ({ request, url }) =>
                request.mode === "navigate" && !url.pathname.startsWith("/~oauth"),
              handler: "NetworkFirst",
              options: {
                cacheName: "pwa-launcher-v1-pages",
                networkTimeoutSeconds: 4,
              },
            },
            {
              urlPattern: ({ request, url }) =>
                url.origin === self.location.origin &&
                ["script", "style", "image", "font"].includes(request.destination),
              handler: "CacheFirst",
              options: {
                cacheName: "pwa-launcher-v1-assets",
                expiration: { maxEntries: 80, maxAgeSeconds: 60 * 60 * 24 * 30 },
              },
            },
          ],
        },
      }),
    ],
  },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});
