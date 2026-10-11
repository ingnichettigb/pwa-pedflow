import { registerSW } from "virtual:pwa-register";

const APP_SERVICE_WORKER_PATH = "/sw.js";

function isBlockedContext() {
  const { hostname, search } = window.location;
  const blockedHost =
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname.startsWith("id-preview--") ||
    hostname.startsWith("preview--") ||
    hostname === "lovableproject.com" ||
    hostname.endsWith(".lovableproject.com") ||
    hostname === "lovableproject-dev.com" ||
    hostname.endsWith(".lovableproject-dev.com") ||
    hostname === "beta.lovable.dev" ||
    hostname.endsWith(".beta.lovable.dev");

  return (
    !import.meta.env.PROD ||
    window.self !== window.top ||
    blockedHost ||
    new URLSearchParams(search).get("sw") === "off"
  );
}

async function unregisterAppServiceWorkers() {
  if (!("serviceWorker" in navigator)) return;
  const registrations = await navigator.serviceWorker.getRegistrations();
  await Promise.all(
    registrations
      .filter((registration) => {
        const scriptUrl = registration.active?.scriptURL ?? registration.installing?.scriptURL;
        return scriptUrl ? new URL(scriptUrl).pathname === APP_SERVICE_WORKER_PATH : false;
      })
      .map((registration) => registration.unregister()),
  );
}

export async function initializePwa() {
  if (!("serviceWorker" in navigator)) return;

  if (isBlockedContext()) {
    await unregisterAppServiceWorkers();
    return;
  }

  registerSW({ immediate: true });
}
