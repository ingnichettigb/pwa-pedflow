import { createFileRoute } from "@tanstack/react-router";
import { Download, ExternalLink, Share, SquarePlus } from "lucide-react";
import { useEffect, useState } from "react";

import { AppIcon } from "@/components/AppIcon";
import { Button } from "@/components/ui/button";
import { APP_CONFIG } from "@/config";
import { LANG_NAMES } from "@/lib/i18n-core";
import { useI18n } from "@/lib/i18n";
import { initializePwa } from "@/lib/pwa";

const DEFAULT_DESCRIPTION = APP_CONFIG.texts[APP_CONFIG.defaultLang].description;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: APP_CONFIG.fullName },
      { name: "description", content: DEFAULT_DESCRIPTION },
      { property: "og:title", content: APP_CONFIG.fullName },
      { property: "og:description", content: DEFAULT_DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Launcher,
});

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

function Launcher() {
  const { lang, setLang, t, product, languages, format } = useI18n();
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showIosInstructions, setShowIosInstructions] = useState(false);

  useEffect(() => {
    void initializePwa();

    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as Navigator & { standalone?: boolean }).standalone === true;
    const userAgent = window.navigator.userAgent;
    const isIos = /iPad|iPhone|iPod/.test(userAgent);
    const isSafari = /Safari/.test(userAgent) && !/CriOS|FxiOS|EdgiOS/.test(userAgent);

    setIsInstalled(standalone);
    setShowIosInstructions(isIos && isSafari && !standalone);

    const handleInstallAvailable = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as BeforeInstallPromptEvent);
    };
    const handleInstalled = () => {
      setIsInstalled(true);
      setInstallPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handleInstallAvailable);
    window.addEventListener("appinstalled", handleInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", handleInstallAvailable);
      window.removeEventListener("appinstalled", handleInstalled);
    };
  }, []);

  const installApp = async () => {
    if (!installPrompt) return;
    await installPrompt.prompt();
    await installPrompt.userChoice;
    setInstallPrompt(null);
  };

  return (
    <main className="launcher-shell">
      <div className="launcher-grid" aria-hidden="true" />
      <section className="launcher-card" aria-labelledby="launcher-title">
        <div className="launcher-mark">
          <AppIcon
            size={140}
            aria-label={t.iconLabel.replace(
              "{name}",
              `${APP_CONFIG.codePrefix}${APP_CONFIG.codeName}`,
            )}
            role="img"
          />
        </div>

        <div className="space-y-3">
          <p className="launcher-kicker">{APP_CONFIG.kicker}</p>
          <h1 id="launcher-title" className="launcher-title">
            <span>{APP_CONFIG.codePrefix}</span>
            {APP_CONFIG.codeName}
          </h1>
          <div className="launcher-rule" aria-hidden="true" />
          {lang !== "en" && (
            <p className="launcher-tagline launcher-tagline-secondary" lang="en">
              {APP_CONFIG.texts.en.tagline}
            </p>
          )}
          <p className="launcher-tagline launcher-tagline-primary">{product.tagline}</p>
        </div>

        <Button asChild variant="launcher" size="lg" className="mt-8 w-full sm:w-auto">
          <a href={APP_CONFIG.saasUrl} rel="noopener noreferrer">
            {format(t.open)}
            <ExternalLink aria-hidden="true" />
          </a>
        </Button>

        {installPrompt && !isInstalled && (
          <aside className="install-panel" aria-label={t.installPanelLabel}>
            <Download aria-hidden="true" />
            <div className="min-w-0 flex-1 text-left">
              <p className="install-title">{format(t.installTitle)}</p>
              <p className="install-copy">{t.installCopy}</p>
              <p className="install-hint">
                {t.installHintPre}
                <strong>{t.installHintStrong}</strong>
                {t.installHintPost}
              </p>
            </div>
            <Button type="button" variant="outline" size="sm" onClick={installApp}>
              {t.installButton}
            </Button>
          </aside>
        )}

        {showIosInstructions && (
          <aside className="install-panel" aria-label={t.iosPanelLabel}>
            <Share aria-hidden="true" />
            <div className="min-w-0 text-left">
              <p className="install-title">{t.iosTitle}</p>
              <p className="install-copy">
                {t.iosTap}
                <strong>{t.iosShare}</strong>
                {t.iosThen}
                <SquarePlus aria-hidden="true" /> <strong>{t.iosAddHome}</strong>.
              </p>
            </div>
          </aside>
        )}

        {isInstalled && <p className="installed-label">{t.installed}</p>}
      </section>

      <footer className="launcher-footer">
        <nav className="lang-switch" aria-label={t.languageLabel}>
          {languages.map((code) => (
            <button
              key={code}
              type="button"
              lang={code}
              title={LANG_NAMES[code]}
              aria-label={LANG_NAMES[code]}
              aria-pressed={code === lang}
              data-active={code === lang}
              onClick={() => setLang(code)}
            >
              {code.toUpperCase()}
            </button>
          ))}
        </nav>
        <p>
          © {new Date().getFullYear()} {APP_CONFIG.shortName}
        </p>
      </footer>
    </main>
  );
}
