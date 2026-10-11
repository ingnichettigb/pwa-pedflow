<!--
  File: README.md
  Percorso: README.md (radice del progetto)
  Ultima modifica: 2026-10-11 (Revisione 03)
  Scopo: istruzioni per usare il lanciatore come stampone di una nuova SaaS.
-->

# PWA Lanciatore Base — Revisione 03

Modello riutilizzabile di **lanciatore PWA** per le SaaS CorporateBoostService:
una pagina scura con logo, titolo e pulsante che apre la SaaS, più l'installazione
come app (Chrome/Edge su desktop e Android, Safari su iOS). Costruito con
TanStack Start + `vite-plugin-pwa`, compatibile con [Lovable](https://lovable.dev).

L'interfaccia è in **italiano, inglese, spagnolo e tedesco** e si adegua da sola
alla lingua del sistema/browser dell'utente.

## Nuova SaaS in 3 passi

1. **Modifica `src/config.ts`** (è l'unico file da toccare):
   - `codePrefix`, `codeName`, `shortName`, `fullName`, `saasUrl`
   - `kicker` e `author` (marchio)
   - `texts`: `tagline` e `description` nelle 4 lingue
   - `icon`: i tre testi disegnati nell'icona (`top`, `mid`, `bottom`)
   - `colors`: `accent`, `cyan`, `blue`, `bg`, `fg`
2. **Rigenera le icone**: `npm install` (la prima volta) e poi `npm run icons`.
   Crea in `public/icons/` tutti i PNG (any, maskable, apple-touch, favicon) e `icon.svg`.
3. **Deploy.** Manifest, meta tag e colori della pagina si aggiornano da soli.

Poi, solo nel nuovo repository: cambia il campo `name` in `package.json` e, se vuoi, ripulisci `.lovable/`.

## Cosa deriva da `config.ts`

| Elemento | Dove |
| --- | --- |
| Testi pagina, pulsante, installazione | `src/routes/index.tsx` (+ `src/lib/i18n-core.ts` per i testi generici) |
| Meta tag, `lang`, autore | `src/routes/__root.tsx` |
| Manifest PWA (`/manifest.json`) | generato da `vite.config.ts` al build |
| Token colore CSS (`--primary`, `--card`, …) | variabili `--cfg-*` su `<html>` → `src/styles.css` |
| Icona nella pagina | `src/components/AppIcon.tsx` ← `src/lib/icon-svg.ts` |
| Icone PNG | `npm run icons` ← `src/lib/icon-svg.ts` |
| Pagina di errore del server | `src/lib/error-page.ts` |

## Lingue

- Supportate: `it`, `en`, `es`, `de` (`SUPPORTED_LANGS` in `config.ts`).
- Scelta in quest'ordine: `?lang=xx` nell'URL → scelta salvata con il selettore in
  fondo alla pagina → lingue del sistema/browser (`navigator.languages`) → `defaultLang`.
- Il rendering lato server e il manifest usano `defaultLang`; la pagina passa alla
  lingua dell'utente subito dopo il caricamento.
- I testi generici (installazione, 404, errori) sono in `src/lib/i18n-core.ts`:
  vanno tradotti una volta sola. Per aggiungere una lingua: aggiungila a
  `SUPPORTED_LANGS` e `texts` in `config.ts`, poi a `UI` e `LANG_NAMES` in `i18n-core.ts`.

## Sviluppo

```sh
npm install
npm run dev      # il service worker è disattivato in sviluppo e nelle anteprime Lovable
npm run icons    # rigenera le icone da config.ts
npm run typecheck # controllo dei tipi TypeScript
npm run build
```

Prima di consegnare una nuova SaaS eseguire `npm run typecheck` e `npm run build`: devono finire senza errori.

Il testo nelle icone PNG usa Arial/Helvetica: se manca sul computer dove lanci
`npm run icons`, viene usato un font sans-serif di sistema.

## Safe area e schermi con notch

Il viewport usa `viewport-fit=cover` e `styles.css` aggiunge i margini `env(safe-area-inset-*)`:
nell'app installata su iPhone (barra di stato traslucida) niente finisce sotto notch o barra Home.

Vedi `CHANGELOG.md` per la storia delle revisioni.
