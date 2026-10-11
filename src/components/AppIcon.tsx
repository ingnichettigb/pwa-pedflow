import type { HTMLAttributes } from "react";

import { iconInnerMarkup } from "@/lib/icon-svg";

interface AppIconProps extends HTMLAttributes<HTMLSpanElement> {
  size?: number;
  maskable?: boolean;
}

/**
 * Icona dell'app. Il disegno è generato da `src/lib/icon-svg.ts` a partire da
 * `src/config.ts`: stessa fonte usata dallo script `npm run icons`.
 */
export function AppIcon({ size = 128, maskable = false, style, ...props }: AppIconProps) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="${size}" height="${size}" style="display:block">${iconInnerMarkup({ maskable })}</svg>`;

  return (
    <span
      style={{ display: "block", width: size, height: size, ...style }}
      {...props}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
