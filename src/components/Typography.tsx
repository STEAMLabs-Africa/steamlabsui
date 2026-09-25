import * as React from "react";
import { cx } from "./utils";

export interface EyebrowProps extends React.HTMLAttributes<HTMLParagraphElement> {
  /** Which ground it sits on; picks the readable accent colour. */
  on?: "background" | "ink" | "surface";
}

/** Uppercase kicker above a section heading. */
export const Eyebrow = React.forwardRef<HTMLParagraphElement, EyebrowProps>(({ className, on = "background", ...props }, ref) => (
  <p ref={ref} className={cx("sla-eyebrow", on !== "background" && `sla-eyebrow--on-${on}`, className)} {...props} />
));
Eyebrow.displayName = "Eyebrow";

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** Visual size. Wrap one phrase in `<em>` to colour it Clover Green. */
  size?: "hero" | "h1" | "h2" | "h3";
  /** The element to render; defaults to match `size` (hero renders an h1). */
  as?: "h1" | "h2" | "h3" | "h4";
}

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(({ className, size = "h2", as, ...props }, ref) => {
  const Tag = as ?? (size === "hero" ? "h1" : size);
  return <Tag ref={ref} className={cx("sla-heading", `sla-heading--${size}`, className)} {...props} />;
});
Heading.displayName = "Heading";

export const Lead = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({ className, ...props }, ref) => (
  <p ref={ref} className={cx("sla-lead", className)} {...props} />
));
Lead.displayName = "Lead";
