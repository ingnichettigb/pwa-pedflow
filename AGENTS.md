<!--
  File: AGENTS.md
  Percorso: AGENTS.md (radice del progetto)
  Ultima modifica: 2026-10-11 (Revisione 03)
  Scopo: regole per gli agenti (Lovable e altri) che modificano il progetto.
-->

<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep product identity, copy, destination URL, and brand colors centralized in `src/config.ts` so every launcher surface stays consistent.
- Generate offline support with `vite-plugin-pwa`; never hand-write the app-shell service worker, because preview-safe registration and updates must remain controlled.
- Nessun testo, colore o nome specifico della SaaS fuori da `src/config.ts`: né in componenti, né in `styles.css`, né in `public/`. I colori nel CSS derivano dalle variabili `--cfg-*`.
- Ogni testo visibile all'utente va tradotto in tutte le lingue di `SUPPORTED_LANGS` (it, en, es, de): testi di prodotto in `config.ts` (`texts`), testi generici in `src/lib/i18n-core.ts`. Niente stringhe in una sola lingua dentro i componenti.
- Il manifest PWA è generato da `vite.config.ts` e le icone da `npm run icons`: non creare né modificare a mano `public/manifest.json` o i PNG in `public/icons/`.
- `src/config.ts` e `src/lib/icon-svg.ts` restano puri (import relativi, nessun alias `@/`), perché li leggono anche `vite.config.ts` e `scripts/generate-icons.ts`.
- Dopo ogni modifica al codice eseguire `npm run typecheck` e `npm run build`: devono passare senza errori.
- Ogni file scritto o riscritto deve avere in testa un'intestazione con nome del file, percorso, data dell'ultima modifica e scopo.
