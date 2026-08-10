import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const SAAS_URL = "https://011-pedflow.corporateboostservice.eu";
const APP_NAME = "PedFlow";
const APP_FULL_NAME = "PedFlow - Smart Launcher";
const SUBTITLE_IT = "Launcher per il programma PedFlow e gestione dei flussi di attivazione";
const SUBTITLE_EN = "Launcher for the PedFlow program and activation flow management";
const ACCENT = "#22d3ee"; // cyan-blue
const ACCENT_SOFT = "rgba(34,211,238,0.25)";
const BG = "#06090f";
const BLUE = "#0a2a4a";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: APP_FULL_NAME },
      { name: "description", content: SUBTITLE_IT },
      { property: "og:title", content: APP_FULL_NAME },
      { property: "og:description", content: SUBTITLE_IT },
      { property: "og:image", content: "/icons/icon-512x512.png" },
    ],
  }),
  component: Landing,
});

type BIPEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

function Landing() {
  const [deferred, setDeferred] = useState<BIPEvent | null>(null);
  const [installed, setInstalled] = useState(false);
  const [isIosSafari, setIsIosSafari] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const host = window.location.hostname;
    const isPreview =
      host.startsWith("id-preview--") ||
      host.startsWith("preview--") ||
      host.endsWith(".lovableproject.com") ||
      host.endsWith(".lovableproject-dev.com") ||
      host.endsWith(".beta.lovable.dev") ||
      host === "localhost" ||
      host === "127.0.0.1";
    if ("serviceWorker" in navigator && !isPreview && window.isSecureContext) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    } else if ("serviceWorker" in navigator && isPreview) {
      navigator.serviceWorker.getRegistrations().then((rs) =>
        rs.forEach((r) => {
          if (r.active?.scriptURL.endsWith("/sw.js")) r.unregister();
        }),
      );
    }

    const ua = window.navigator.userAgent;
    const iOS = /iPad|iPhone|iPod/.test(ua) && !("MSStream" in window);
    const safari = /Safari/.test(ua) && !/CriOS|FxiOS|EdgiOS/.test(ua);
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as Navigator & { standalone?: boolean }).standalone === true;
    setIsIosSafari(iOS && safari && !standalone);
    setInstalled(standalone);

    const onBIP = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BIPEvent);
    };
    const onInstalled = () => {
      setInstalled(true);
      setDeferred(null);
    };
    window.addEventListener("beforeinstallprompt", onBIP);
    window.addEventListener("appinstalled", onInstalled);

    const t = setTimeout(() => setReady(true), 450);
    return () => {
      window.removeEventListener("beforeinstallprompt", onBIP);
      window.removeEventListener("appinstalled", onInstalled);
      clearTimeout(t);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferred) return;
    await deferred.prompt();
    await deferred.userChoice;
    setDeferred(null);
  };

  return (
    <>
      <style>{`
        @keyframes pf-fade-up { from { opacity: 0; transform: translateY(14px) } to { opacity: 1; transform: none } }
        @keyframes pf-pulse { 0%,100% { box-shadow: 0 0 0 0 ${ACCENT_SOFT}, 0 0 40px 0 ${ACCENT_SOFT} } 50% { box-shadow: 0 0 0 10px rgba(34,211,238,0), 0 0 70px 10px rgba(34,211,238,0.35) } }
        @keyframes pf-spin { to { transform: rotate(360deg) } }
        .pf-fade { opacity: 0; animation: pf-fade-up .7s ease-out forwards; }
        .pf-glow { animation: pf-pulse 2.8s ease-in-out infinite; }
        .pf-loader { width: 42px; height: 42px; border-radius: 50%; border: 3px solid rgba(34,211,238,0.2); border-top-color: ${ACCENT}; animation: pf-spin .9s linear infinite; }
      `}</style>

      {!ready && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: BG,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50,
          }}
        >
          <div className="pf-loader" />
        </div>
      )}

      <main
        style={{
          minHeight: "100vh",
          background: `radial-gradient(1200px 600px at 50% -10%, rgba(34,211,238,0.10), transparent 60%), ${BG}`,
          color: "#fff",
          fontFamily:
            "system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "32px 20px",
          textAlign: "center",
        }}
      >
        <div
          aria-label="PedFlow logo"
          className="pf-fade pf-glow"
          style={{
            animationDelay: "0s, .2s",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px 36px",
            background: BLUE,
            border: `2px solid ${ACCENT}`,
            borderRadius: 20,
            marginBottom: 28,
          }}
        >
          <span
            style={{
              fontSize: 44,
              fontWeight: 900,
              letterSpacing: -1.5,
              lineHeight: 1,
            }}
          >
            <span style={{ color: ACCENT }}>Ped</span>
            <span style={{ color: "#ffffff" }}>Flow</span>
          </span>
        </div>

        <h1
          className="pf-fade"
          style={{
            animationDelay: ".15s",
            fontSize: 30,
            fontWeight: 800,
            letterSpacing: -0.5,
            margin: "0 0 10px",
            textShadow: `0 0 24px ${ACCENT_SOFT}`,
          }}
        >
          {APP_NAME}
          <span style={{ color: ACCENT }}> - Smart Launcher</span>
        </h1>

        <p
          className="pf-fade"
          style={{
            animationDelay: ".25s",
            fontSize: 14,
            color: "#cbd5e1",
            margin: "0 0 6px",
            maxWidth: 460,
          }}
        >
          {SUBTITLE_IT}
        </p>
        <p
          className="pf-fade"
          style={{
            animationDelay: ".3s",
            fontSize: 13,
            color: "#7c93a8",
            margin: "0 0 36px",
            maxWidth: 460,
            fontStyle: "italic",
          }}
        >
          {SUBTITLE_EN}
        </p>

        <a
          className="pf-fade"
          href={SAAS_URL}
          style={{
            animationDelay: ".4s",
            display: "inline-block",
            background: ACCENT,
            color: BG,
            fontWeight: 700,
            padding: "14px 28px",
            borderRadius: 12,
            textDecoration: "none",
            fontSize: 16,
            boxShadow: `0 8px 28px ${ACCENT_SOFT}, 0 0 0 1px rgba(34,211,238,0.4)`,
          }}
        >
          Avvia PedFlow / Gestisci flusso →
        </a>

        {deferred && !installed && (
          <div
            className="pf-fade"
            style={{
              animationDelay: ".5s",
              marginTop: 32,
              background: BLUE,
              border: `1px solid ${ACCENT}55`,
              borderRadius: 16,
              padding: 20,
              maxWidth: 360,
              width: "100%",
              boxShadow: `0 0 40px ${ACCENT_SOFT}`,
            }}
          >
            <p style={{ margin: "0 0 6px", fontSize: 14 }}>
              Install <strong>{APP_NAME}</strong> on your device for quick access.
            </p>
            <p style={{ margin: "0 0 12px", fontSize: 13, color: "#9fb3c8" }}>
              Installa <strong>{APP_NAME}</strong> sul tuo dispositivo per accesso rapido.
            </p>
            <button
              onClick={handleInstall}
              style={{
                background: ACCENT,
                color: BG,
                border: "none",
                fontWeight: 700,
                padding: "10px 20px",
                borderRadius: 10,
                cursor: "pointer",
                fontSize: 14,
              }}
            >
              Install app / Installa app
            </button>
          </div>
        )}

        {isIosSafari && (
          <div
            className="pf-fade"
            style={{
              animationDelay: ".5s",
              marginTop: 32,
              background: BLUE,
              borderRadius: 16,
              padding: 16,
              maxWidth: 360,
              fontSize: 14,
              color: "#dbeafe",
            }}
          >
            <p style={{ margin: "0 0 6px" }}>
              📱 To install: tap <strong>Share</strong> →{" "}
              <strong>Add to Home Screen</strong>
            </p>
            <p style={{ margin: 0, color: "#9fb3c8", fontSize: 13 }}>
              Per installare: tocca <strong>Condividi</strong> →{" "}
              <strong>Aggiungi a schermata Home</strong>
            </p>
          </div>
        )}

        <footer style={{ marginTop: 48, fontSize: 11, color: "#475569" }}>
          © {new Date().getFullYear()} {APP_NAME}
        </footer>
      </main>
    </>
  );
}
