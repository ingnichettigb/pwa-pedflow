## Ribranding MiniFAT → PedFlow (riferimenti residui)

Sostituire gli ultimi riferimenti testuali a "MiniFAT"/"mnfat"/"002mnfat" rimasti dal clone del template. Solo testo, nessuna modifica alla struttura del launcher.

### Modifiche

**1. `src/routes/index.tsx` — riga 4**
- `const SAAS_URL = "https://002mnfat.corporateboostservice.eu";`
  → `const SAAS_URL = "https://011pedflow.corporateboostservice.eu";`

**2. `README.md` — righe 1 e 6-7**
- Riga 1: `# PWA Template — MiniFAT` → `# PWA Template — PedFlow`
- Riga 6: `Current configuration: **MiniFAT – Smart Dossier**` → `Current configuration: **PedFlow – Smart Launcher**`
- Riga 7: `→ https://002mnfat.corporateboostservice.eu` → `→ https://011pedflow.corporateboostservice.eu`

**3. `public/sw.js` — riga 1 (commento)**
- `// MiniFAT PWA service worker —` → `// PedFlow PWA service worker —`
- `CACHE_NAME` è già `pedflow-v1`: non si tocca.

### File NON toccati (già corretti, verificati)
- `public/manifest.json` — già "PedFlow"
- `src/routes/__root.tsx` — meta tag già "PedFlow"
- Resto del launcher (struttura, stili, animazioni, icone, route)

### Riepilogo occorrenze trovate (ricerca case-insensitive di `minifat|mnfat|002mnfat` su tutto il progetto, esclusi node_modules/dist)
| File | Riga | Contenuto attuale |
| --- | --- | --- |
| README.md | 1 | `# PWA Template — MiniFAT` |
| README.md | 6 | `Current configuration: **MiniFAT – Smart Dossier**` |
| README.md | 7 | `→ https://002mnfat.corporateboostservice.eu` |
| public/sw.js | 1 | `// MiniFAT PWA service worker — ...` |
| src/routes/index.tsx | 4 | `const SAAS_URL = "https://002mnfat.corporateboostservice.eu";` |

Totale: 5 occorrenze in 3 file. Nessun riferimento nascosto in meta tag, alt text o altri commenti.
