<!--
  File: CHANGELOG.md
  Percorso: CHANGELOG.md (radice del progetto)
  Ultima modifica: 2026-10-11 (Revisione 03)
  Scopo: storia delle revisioni del lanciatore PWA base.
-->

# Changelog

## Revisione 03

Revisione migliorata, ripartita dalla revisione 01 (la linea 006SmMntnnc, che non conteneva tutto il contenuto della 01, non è stata usata come base).

- **Dipendenze aggiornate**: TanStack Router/Start/Router-plugin e i pacchetti `router-core`, `start-client-core`, `start-server-core` alle versioni più recenti già usate nella linea 006SmMntnnc; `@lovable.dev/vite-tanstack-config` 2.25.3. `bun.lock` rigenerato.
- **Correzione tipi** in `__root.tsx`: la pagina di errore accetta `ErrorComponentProps` (con `error` di tipo `unknown`); con le nuove versioni il typecheck falliva.
- **Nuovo script `npm run typecheck`** (`tsc --noEmit`): typecheck, lint e build verificati senza errori.
- **Safe area**: `viewport-fit=cover` e margini `env(safe-area-inset-*)` in `styles.css`, per notch e barra Home sull'app installata.
- `package.json`: versione 0.3.0 e campo `//` con intestazione del file.
- Intestazioni (nome file, percorso, data, scopo) nei file modificati.
- Icone, `config.ts`, i18n e manifest invariati rispetto alla revisione 01.

## Revisione 01

Prima revisione del lanciatore come modello riutilizzabile (base: 040RegistroWEB).

- **Configurazione unica**: tutti i testi, i colori, i testi dell'icona, autore, kicker e lingua sono in `src/config.ts`.
- **Interfaccia multilingua** italiano / inglese / spagnolo / tedesco, scelta in automatico dalla lingua del sistema, con selettore manuale e override `?lang=xx`.
- **Pagine 404 ed errore** tradotte; la pagina di errore del server usa l'header `Accept-Language`.
- **Manifest generato** da `config.ts` in `vite.config.ts` (rimosso `public/manifest.json`).
- **Colori derivati dalla config**: `styles.css` non contiene più colori fissi del prodotto.
- **Script `npm run icons`**: genera tutti i PNG, la versione `maskable` separata (192/512), l'apple-touch-icon opaco, il favicon e `icon.svg`.
- Icone 192/512 non più dichiarate `any maskable` insieme: ora `any` e `maskable` sono file distinti.
- `twitter:card` impostato su `summary` (non c'è un'immagine OG).
- Pulizia: `package.json` rinominato `pwa-lanciatore-base` (versione 0.1.0), README riscritto, rimosso il piano Lovable specifico di 040.
