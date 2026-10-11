/**
 * File: AppIcon.tsx
 * Percorso: src/components/AppIcon.tsx
 * Ultima modifica: 2026-10-11
 * Scopo: mostra l'icona ufficiale dell'app (PNG in public/icons).
 */
import type { HTMLAttributes } from "react";

interface AppIconProps extends HTMLAttributes<HTMLSpanElement> {
  size?: number;
  maskable?: boolean;
}

export function AppIcon({ size = 128, maskable: _maskable, style, ...props }: AppIconProps) {
  return (
    <span role="img" style={{ display: "block", width: size, height: size, ...style }} {...props}>
      <img src="/icons/icon-512x512.png" width={size} height={size} alt="" style={{ display: "block", width: size, height: size }} />
    </span>
  );
}
