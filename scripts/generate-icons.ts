/**
 * Genera tutte le icone PNG della PWA a partire da src/config.ts.
 *
 *   npm run icons
 *
 * Output in public/icons/:
 *   icon-<size>x<size>.png            icone "any" (angoli arrotondati trasparenti)
 *   icon-maskable-<size>x<size>.png   icone "maskable" (sfondo a tutto campo, safe zone)
 *   apple-touch-icon.png (180)        sfondo pieno, iOS applica da solo gli angoli
 *   favicon.png (64)
 *   icon.svg                          versione vettoriale
 *
 * Nota: il testo dell'icona usa Arial/Helvetica; se manca sul computer dove
 * lanci lo script, viene usato un font sans-serif di sistema.
 */
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

import { APP_CONFIG } from "../src/config";
import { buildIconSvg } from "../src/lib/icon-svg";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "icons");

async function png(file: string, size: number, options: Parameters<typeof buildIconSvg>[0]) {
  // Rasterizza a 512 e poi ridimensiona: il risultato è identico a tutte le misure.
  const svg = Buffer.from(buildIconSvg({ ...options, size: 512 }));
  await sharp(svg, { density: 384 })
    .resize(size, size)
    .png({ compressionLevel: 9 })
    .toFile(join(outDir, file));
  console.log(`  ✓ ${file}`);
}

await mkdir(outDir, { recursive: true });
console.log(`Icone per ${APP_CONFIG.codePrefix}${APP_CONFIG.codeName} → public/icons/`);

for (const size of APP_CONFIG.pwa.iconSizes) {
  await png(`icon-${size}x${size}.png`, size, {});
}
for (const size of APP_CONFIG.pwa.maskableSizes) {
  await png(`icon-maskable-${size}x${size}.png`, size, { maskable: true });
}
await png("apple-touch-icon.png", 180, { opaque: true });
await png("favicon.png", 64, {});
await writeFile(join(outDir, "icon.svg"), buildIconSvg({ size: 512 }));
console.log("  ✓ icon.svg");
