import { APP_CONFIG } from "../config";

import { UI, pickLangFromHeader } from "./i18n-core";

const escapeHtml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Pagina di errore del server, nella lingua indicata da Accept-Language. */
export function renderErrorPage(acceptLanguage?: string | null): string {
  const lang = pickLangFromHeader(acceptLanguage);
  const t = UI[lang];
  const { bg, blue, fg, accent, cyan } = APP_CONFIG.colors;

  return `<!doctype html>
<html lang="${lang}">
  <head>
    <meta charset="utf-8" />
    <title>${escapeHtml(t.errorTitle)}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body { font: 15px/1.5 Arial, Helvetica, sans-serif; background: ${bg}; color: ${fg}; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
      .card { max-width: 28rem; width: 100%; text-align: center; padding: 2rem; border: 1px solid ${blue}; border-radius: 0.5rem; }
      h1 { font-size: 1.25rem; margin: 0 0 0.5rem; }
      p { opacity: 0.75; margin: 0 0 1.5rem; }
      .actions { display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; }
      a, button { padding: 0.5rem 1rem; border-radius: 0.375rem; font: inherit; cursor: pointer; text-decoration: none; border: 1px solid transparent; }
      .primary { background: ${accent}; color: ${bg}; font-weight: 700; }
      .secondary { background: transparent; color: ${cyan}; border-color: ${cyan}; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>${escapeHtml(t.errorTitle)}</h1>
      <p>${escapeHtml(t.errorText)}</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">${escapeHtml(t.tryAgain)}</button>
        <a class="secondary" href="/">${escapeHtml(t.goHome)}</a>
      </div>
    </div>
  </body>
</html>`;
}
