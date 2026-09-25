import * as React from "react";
import { cx } from "./utils";
import type { ThemeName } from "../tokens";

export interface BandProps extends React.HTMLAttributes<HTMLElement> {
  /** `surface` re-themes per program; `ink` is the deep Clover Green band. */
  tone?: "background" | "surface" | "ink";
  compact?: boolean;
  /** Wrap children in the 1280px container. Defaults to true. */
  contained?: boolean;
}

/** A full-width page section. */
export const Band = React.forwardRef<HTMLElement, BandProps>(
  ({ className, tone = "background", compact, contained = true, children, ...props }, ref) => (
    <section
      ref={ref}
      className={cx("sla-band", tone !== "background" && `sla-band--${tone}`, compact && "sla-band--compact", className)}
      {...props}
    >
      {contained ? <div className="sla-container">{children}</div> : children}
    </section>
  ),
);
Band.displayName = "Band";

export const Container = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cx("sla-container", className)} {...props} />
));
Container.displayName = "Container";

export interface ThemeProviderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Program microsite theme. `global` is the main site. */
  theme?: ThemeName;
}

/** Root wrapper: applies base styles and the program theme. */
export const ThemeProvider = React.forwardRef<HTMLDivElement, ThemeProviderProps>(({ className, theme = "global", ...props }, ref) => (
  <div ref={ref} data-theme={theme === "global" ? undefined : theme} className={cx("sla", className)} {...props} />
));
ThemeProvider.displayName = "ThemeProvider";
