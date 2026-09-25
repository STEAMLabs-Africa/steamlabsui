import * as React from "react";
import { cx } from "./utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "secondary" | "destructive" | "outline";
}

/** Small square-cornered status label. */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(({ className, variant = "primary", ...props }, ref) => (
  <span ref={ref} className={cx("sla-badge", `sla-badge--${variant}`, className)} {...props} />
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
