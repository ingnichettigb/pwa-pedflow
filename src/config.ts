/**
 * ============================================================================
 *  UNICA FONTE DI VERITÀ DEL LANCIATORE
 * ============================================================================
 *  Per creare il lanciatore di una nuova SaaS si modifica SOLO questo file
 *  (poi `npm run icons`). Da qui derivano: pagina, meta tag, manifest PWA,
 *  icone (SVG e PNG) e token colore del CSS.
 *
 *  NB: questo file deve restare "puro" (nessun import con alias `@/`), perché
 *  viene letto anche da `vite.config.ts` e da `scripts/generate-icons.ts`.
 * ============================================================================
 */

export const SUPPORTED_LANGS = ["it", "en", "es", "de"] as const;
export type Lang = (typeof SUPPORTED_LANGS)[number];

export const APP_CONFIG = {
  /* ---------- Identità del prodotto ---------- */
  codePrefix: "011",
  codeName: "pedflow",
  shortName: "011pedflow",
  fullName: "011pedflow – Smart Launcher",
  saasUrl: "https://011pedflow.corporateboostservice.eu",

  /* ---------- Marchio / editore ---------- */
  kicker: "CORPORATE BOOST SERVICE",
  author: "Corporate Boost Service",

  /* ---------- Lingue ----------
   * La lingua viene scelta in automatico dalle preferenze del sistema/browser
   * dell'utente (navigator.languages). Se non è tra quelle supportate si usa
   * `defaultLang`. Il manifest PWA e i meta tag renderizzati lato server
   * usano sempre `defaultLang`. */
  defaultLang: "it" as Lang,

  /* ---------- Testi specifici del prodotto, per lingua ----------
   * tagline     = sottotitolo in maiuscolo sotto il nome
   * description = frase per meta description e manifest */
  texts: {
    it: {
      tagline: "LAUNCHER PEDFLOW E GESTIONE DEI FLUSSI DI ATTIVAZIONE",
      description: "Launcher per il programma 011pedflow e gestione dei flussi di attivazione",
    },
    en: {
      tagline: "PEDFLOW LAUNCHER & ACTIVATION FLOW MANAGEMENT",
      description: "Launcher for the 011pedflow program and activation flow management",
    },
    es: {
      tagline: "LANZADOR PEDFLOW Y GESTIÓN DE FLUJOS DE ACTIVACIÓN",
      description: "Lanzador del programa 011pedflow y gestión de flujos de activación",
    },
    de: {
      tagline: "PEDFLOW-LAUNCHER & AKTIVIERUNGSABLÄUFE",
      description: "Launcher für das Programm 011pedflow und Verwaltung der Aktivierungsabläufe",
    },
  } satisfies Record<Lang, { tagline: string; description: string }>,

  /* ---------- Testi disegnati nell'icona (uguali in tutte le lingue) ---------- */
  icon: {
    top: "011", // grande, colore accent
    mid: "PED", // medio, colore testo
    bottom: "PEDFLOW", // piccolo, colore cyan, nella fascia in basso
  },

  /* ---------- Colori (da qui derivano icona, manifest e CSS) ---------- */
  colors: {
    accent: "#22d3ee", // colore primario (pulsante, numero, titoli)
    cyan: "#67e8f9", // colore secondario (bordi, globo, kicker)
    blue: "#0a2a4a", // blu profondo (pannelli, theme-color)
    bg: "#06090f", // sfondo
    fg: "#f8fafc", // testo
  },

  /* ---------- PWA ---------- */
  pwa: {
    display: "standalone" as const,
    orientation: "portrait-primary" as const,
    iconSizes: [72, 96, 128, 144, 152, 192, 384, 512],
    maskableSizes: [192, 512],
  },
} as const;
