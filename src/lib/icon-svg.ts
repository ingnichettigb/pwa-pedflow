/**
 * Costruttore dell'icona dell'app come stringa SVG.
 * Funzione pura, senza React: la usano sia il componente <AppIcon /> sia lo
 * script `npm run icons`, così la pagina e i PNG sono sempre identici.
 */
import { APP_CONFIG } from "../config";

type IconOptions = {
  /** Icona "maskable": sfondo a tutto campo e disegno ridotto nella safe zone. */
  maskable?: boolean;
  /** Sfondo pieno a tutto campo senza angoli arrotondati (apple-touch-icon). */
  opaque?: boolean;
};

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Riduce il corpo del testo se la stringa è lunga, per restare nel riquadro. */
const fit = (text: string, base: number, maxWidth: number, charWidth: number) =>
  Math.min(base, Math.floor(maxWidth / (Math.max(text.length, 1) * charWidth)));

function artwork() {
  const { accent, cyan, blue, bg, fg } = APP_CONFIG.colors;
  const { top, mid, bottom } = APP_CONFIG.icon;
  const font = 'font-family="Arial, Helvetica, sans-serif" text-anchor="middle"';

  return `
  <rect x="16" y="16" width="480" height="480" rx="104" fill="${bg}" stroke="${cyan}" stroke-width="4"/>
  <rect x="24" y="24" width="464" height="464" rx="98" fill="${blue}" fill-opacity="0.48"/>
  <ellipse cx="256" cy="210" rx="170" ry="170" fill="${blue}" fill-opacity="0.44" stroke="${cyan}" stroke-width="6"/>
  <line x1="86" y1="210" x2="426" y2="210" stroke="${cyan}" stroke-width="5"/>
  <ellipse cx="256" cy="210" rx="170" ry="100" fill="none" stroke="${cyan}" stroke-width="5"/>
  <line x1="256" y1="40" x2="256" y2="380" stroke="${cyan}" stroke-width="5"/>
  <ellipse cx="256" cy="210" rx="110" ry="170" fill="none" stroke="${cyan}" stroke-width="5"/>
  <rect x="90" y="130" width="332" height="150" rx="28" fill="${bg}" stroke="${accent}" stroke-width="3"/>
  <text x="256" y="248" ${font} font-weight="900" font-size="${fit(top, 124, 300, 0.62)}" fill="${accent}">${esc(top)}</text>
  <text x="256" y="348" ${font} font-weight="900" font-size="${fit(mid, 54, 380, 0.66)}" fill="${fg}">${esc(mid)}</text>
  <rect x="80" y="395" width="352" height="55" rx="18" fill="${bg}" stroke="${cyan}" stroke-opacity="0.7" stroke-width="2"/>
  <text x="256" y="432" ${font} font-weight="800" font-size="${fit(bottom, 22, 330, 0.62)}" fill="${cyan}">${esc(bottom)}</text>`;
}

/** Contenuto interno (senza tag <svg>) – viewBox 0 0 512 512. */
export function iconInnerMarkup({ maskable = false, opaque = false }: IconOptions = {}) {
  const { bg } = APP_CONFIG.colors;
  if (maskable) {
    // Safe zone Android: il disegno resta in un cerchio di raggio ~40%.
    return `<rect width="512" height="512" fill="${bg}"/><g transform="translate(76.8 76.8) scale(0.7)">${artwork()}</g>`;
  }
  if (opaque) {
    return `<rect width="512" height="512" fill="${bg}"/>${artwork()}`;
  }
  return artwork();
}

/** SVG completo come stringa (per file, sharp, ecc.). */
export function buildIconSvg(options: IconOptions & { size?: number } = {}) {
  const size = options.size ?? 512;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="${size}" height="${size}">${iconInnerMarkup(options)}</svg>`;
}
