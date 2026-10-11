/**
 * Testi generici dell'interfaccia (uguali per ogni SaaS) in IT / EN / ES / DE
 * e logica di scelta lingua. Nessuna dipendenza da React: la usa anche la
 * pagina di errore renderizzata dal server.
 *
 * I testi specifici del prodotto (tagline, descrizione) stanno in `config.ts`.
 * Il segnaposto {name} viene sostituito con `APP_CONFIG.shortName`.
 */
import { APP_CONFIG, SUPPORTED_LANGS, type Lang } from "../config";

export type UiStrings = {
  open: string;
  installTitle: string;
  installCopy: string;
  installHintPre: string;
  installHintStrong: string;
  installHintPost: string;
  installButton: string;
  iosTitle: string;
  iosTap: string;
  iosShare: string;
  iosThen: string;
  iosAddHome: string;
  installed: string;
  installPanelLabel: string;
  iosPanelLabel: string;
  iconLabel: string;
  languageLabel: string;
  notFoundTitle: string;
  notFoundText: string;
  goHome: string;
  errorTitle: string;
  errorText: string;
  tryAgain: string;
};

export const UI: Record<Lang, UiStrings> = {
  it: {
    open: "Apri {name}",
    installTitle: "Installa {name}",
    installCopy: "Accesso rapido dal desktop o dalla schermata Home.",
    installHintPre: "Su PC: nella finestra del browser spunta ",
    installHintStrong: "«Crea collegamento sul desktop»",
    installHintPost: " prima di confermare.",
    installButton: "Installa",
    iosTitle: "Installa su iPhone o iPad",
    iosTap: "Tocca ",
    iosShare: "Condividi",
    iosThen: ", poi ",
    iosAddHome: "Aggiungi a schermata Home",
    installed: "Applicazione installata",
    installPanelLabel: "Installazione applicazione",
    iosPanelLabel: "Installazione su Safari iOS",
    iconLabel: "Icona {name}",
    languageLabel: "Lingua",
    notFoundTitle: "Pagina non trovata",
    notFoundText: "La pagina che cerchi non esiste o è stata spostata.",
    goHome: "Vai alla home",
    errorTitle: "Questa pagina non si è caricata",
    errorText:
      "Si è verificato un problema da parte nostra. Prova ad aggiornare la pagina o torna alla home.",
    tryAgain: "Riprova",
  },
  en: {
    open: "Open {name}",
    installTitle: "Install {name}",
    installCopy: "Quick access from your desktop or Home screen.",
    installHintPre: "On PC: in the browser window, tick ",
    installHintStrong: "“Create desktop shortcut”",
    installHintPost: " before confirming.",
    installButton: "Install",
    iosTitle: "Install on iPhone or iPad",
    iosTap: "Tap ",
    iosShare: "Share",
    iosThen: ", then ",
    iosAddHome: "Add to Home Screen",
    installed: "App installed",
    installPanelLabel: "App installation",
    iosPanelLabel: "Installation on Safari iOS",
    iconLabel: "{name} icon",
    languageLabel: "Language",
    notFoundTitle: "Page not found",
    notFoundText: "The page you're looking for doesn't exist or has been moved.",
    goHome: "Go home",
    errorTitle: "This page didn't load",
    errorText: "Something went wrong on our end. You can try refreshing or head back home.",
    tryAgain: "Try again",
  },
  es: {
    open: "Abrir {name}",
    installTitle: "Instalar {name}",
    installCopy: "Acceso rápido desde el escritorio o la pantalla de inicio.",
    installHintPre: "En PC: en la ventana del navegador marca ",
    installHintStrong: "«Crear acceso directo en el escritorio»",
    installHintPost: " antes de confirmar.",
    installButton: "Instalar",
    iosTitle: "Instalar en iPhone o iPad",
    iosTap: "Toca ",
    iosShare: "Compartir",
    iosThen: ", luego ",
    iosAddHome: "Añadir a pantalla de inicio",
    installed: "Aplicación instalada",
    installPanelLabel: "Instalación de la aplicación",
    iosPanelLabel: "Instalación en Safari iOS",
    iconLabel: "Icono de {name}",
    languageLabel: "Idioma",
    notFoundTitle: "Página no encontrada",
    notFoundText: "La página que buscas no existe o se ha movido.",
    goHome: "Ir al inicio",
    errorTitle: "Esta página no se ha cargado",
    errorText:
      "Ha ocurrido un problema por nuestra parte. Prueba a actualizar la página o vuelve al inicio.",
    tryAgain: "Reintentar",
  },
  de: {
    open: "{name} öffnen",
    installTitle: "{name} installieren",
    installCopy: "Schneller Zugriff über den Desktop oder den Home-Bildschirm.",
    installHintPre: "Am PC: Im Browserfenster ",
    installHintStrong: "„Verknüpfung auf dem Desktop erstellen“",
    installHintPost: " vor dem Bestätigen anhaken.",
    installButton: "Installieren",
    iosTitle: "Auf iPhone oder iPad installieren",
    iosTap: "Tippe auf ",
    iosShare: "Teilen",
    iosThen: ", dann auf ",
    iosAddHome: "Zum Home-Bildschirm",
    installed: "App installiert",
    installPanelLabel: "App-Installation",
    iosPanelLabel: "Installation in Safari iOS",
    iconLabel: "{name}-Symbol",
    languageLabel: "Sprache",
    notFoundTitle: "Seite nicht gefunden",
    notFoundText: "Die gesuchte Seite existiert nicht oder wurde verschoben.",
    goHome: "Zur Startseite",
    errorTitle: "Diese Seite konnte nicht geladen werden",
    errorText:
      "Auf unserer Seite ist ein Problem aufgetreten. Aktualisiere die Seite oder kehre zur Startseite zurück.",
    tryAgain: "Erneut versuchen",
  },
};

export const LANG_STORAGE_KEY = "launcher-lang";

export function isLang(value: unknown): value is Lang {
  return typeof value === "string" && (SUPPORTED_LANGS as readonly string[]).includes(value);
}

/** Da un codice tipo "es-MX" / "de_AT" ricava la lingua supportata ("es" / "de"). */
export function matchLang(code: string | null | undefined): Lang | null {
  const base = code?.toLowerCase().replace("_", "-").split("-")[0];
  return isLang(base) ? base : null;
}

/** Prima lingua supportata in una lista ordinata per preferenza. */
export function pickLang(preferred: readonly string[] | undefined): Lang {
  for (const code of preferred ?? []) {
    const lang = matchLang(code);
    if (lang) return lang;
  }
  return APP_CONFIG.defaultLang;
}

/** Legge l'header HTTP Accept-Language (lato server) rispettando i pesi q. */
export function pickLangFromHeader(header: string | null | undefined): Lang {
  if (!header) return APP_CONFIG.defaultLang;
  const ordered = header
    .split(",")
    .map((part, index) => {
      const [code, ...params] = part.trim().split(";");
      const q = Number(params.find((p) => p.trim().startsWith("q="))?.split("=")[1] ?? 1);
      return { code: (code ?? "").trim(), q: Number.isNaN(q) ? 0 : q, index };
    })
    .filter((item) => item.code && item.q > 0)
    .sort((a, b) => b.q - a.q || a.index - b.index)
    .map((item) => item.code);
  return pickLang(ordered);
}

/** Sostituisce {name} con il nome breve del prodotto. */
export function fmt(template: string, name: string = APP_CONFIG.shortName) {
  return template.replaceAll("{name}", name);
}

/** Nome di ogni lingua scritto nella lingua stessa (per il selettore). */
export const LANG_NAMES: Record<Lang, string> = {
  it: "Italiano",
  en: "English",
  es: "Español",
  de: "Deutsch",
};
