import * as React from "react";
import type { LogoVariant } from "../tokens";
import { LOGO_ASPECT, logoSvgs } from "./svgs.generated";

export { logoSvgs, LOGO_ASPECT };

export interface LogoProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children" | "dangerouslySetInnerHTML"> {
  /**
   * `full-color` on white; `white` on Clover Green, `ink` bands and photos;
   * `green`, `yellow` or `black` only where a single colour is required.
   */
  variant?: LogoVariant;
  /** Rendered width in px (height follows the logo's aspect ratio). */
  width?: number;
  /** Accessible name. Defaults to "STEAMLabs Africa". */
  title?: string;
}

/**
 * The STEAMLabs Africa logo. Keep clear space around it equal to the height
 * of the logo's lower element, never recolour or stretch it, and don't print
 * it narrower than 20mm.
 */
export function Logo({ variant = "full-color", width = 160, title = "STEAMLabs Africa", className, style, ...props }: LogoProps) {
  return (
    <span
      role="img"
      aria-label={title}
      className={["sla-logo", className].filter(Boolean).join(" ")}
      style={{ width, height: Math.round(width / LOGO_ASPECT), lineHeight: 0, ...style }}
      dangerouslySetInnerHTML={{ __html: logoSvgs[variant].replace("<svg ", '<svg width="100%" height="100%" aria-hidden="true" ') }}
      {...props}
    />
  );
}
