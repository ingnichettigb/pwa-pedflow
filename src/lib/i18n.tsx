import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { APP_CONFIG, SUPPORTED_LANGS, type Lang } from "@/config";

import { LANG_STORAGE_KEY, UI, fmt, isLang, pickLang, type UiStrings } from "./i18n-core";

type I18nValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: UiStrings;
  product: (typeof APP_CONFIG.texts)[Lang];
  languages: readonly Lang[];
  format: (template: string) => string;
};

function buildValue(lang: Lang, setLang: (lang: Lang) => void): I18nValue {
  return {
    lang,
    setLang,
    t: UI[lang],
    product: APP_CONFIG.texts[lang],
    languages: SUPPORTED_LANGS,
    format: (template) => fmt(template),
  };
}

// Valore di default: serve alle pagine fuori dal provider (es. errore di root).
const I18nContext = createContext<I18nValue>(buildValue(APP_CONFIG.defaultLang, () => {}));

/** Ordine di priorità: ?lang=xx  >  scelta salvata  >  lingua del sistema/browser. */
function detectLang(): Lang {
  try {
    const fromQuery = new URLSearchParams(window.location.search).get("lang");
    if (isLang(fromQuery)) return fromQuery;
  } catch {
    /* ignora */
  }
  try {
    const stored = window.localStorage.getItem(LANG_STORAGE_KEY);
    if (isLang(stored)) return stored;
  } catch {
    /* localStorage non disponibile */
  }
  return pickLang(navigator.languages?.length ? navigator.languages : [navigator.language]);
}

export function I18nProvider({ children }: { children: ReactNode }) {
  // Server e primo render client usano la lingua di default (niente errori di
  // idratazione); subito dopo il mount si passa alla lingua rilevata.
  const [lang, setLangState] = useState<Lang>(APP_CONFIG.defaultLang);

  useEffect(() => {
    setLangState(detectLang());
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", APP_CONFIG.texts[lang].description);
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(LANG_STORAGE_KEY, next);
    } catch {
      /* ignora */
    }
  }, []);

  const value = useMemo(() => buildValue(lang, setLang), [lang, setLang]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}
