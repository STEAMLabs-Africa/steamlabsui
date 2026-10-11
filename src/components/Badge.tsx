import * as React from "react";
import { cx } from "./utils";

export type BadgeVariant = "primary" | "secondary" | "destructive" | "outline" | "neutral";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * `primary` (Fuel Yellow) for pending or warning, `secondary` (Clover Green)
   * for done or success, `destructive` for errors, `neutral` (Hampton) for
   * everything else, `outline` for quiet labels.
   */
  variant?: BadgeVariant;
  /** A leading dot in the text colour, for status lists. */
  dot?: boolean;
}

/** Small square-cornered status label. */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(({ className, variant = "primary", dot, children, ...props }, ref) => (
  <span ref={ref} className={cx("sla-badge", `sla-badge--${variant}`, className)} {...props}>
    {dot ? <span className="sla-badge__dot" aria-hidden /> : null}
    {children}
  </span>
));
Badge.displayName = "Badge";

export interface PillProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "outline";
}

/** Rounded focus-area tag, 1 to 2 words ("AI literacy", "STEAM learning"). */
export const Pill = React.forwardRef<HTMLSpanElement, PillProps>(({ className, variant = "primary", ...props }, ref) => (
  <span ref={ref} className={cx("sla-pill", variant === "outline" && "sla-pill--outline", className)} {...props} />
));
Pill.displayName = "Pill";
