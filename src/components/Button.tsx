import * as React from "react";
import { cx, Slot } from "./utils";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "link" | "destructive";
export type ButtonSize = "default" | "sm" | "lg" | "icon" | "cta";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Fuel Yellow `primary` is the default; use it once per view for the main action. */
  variant?: ButtonVariant;
  /** `cta` is the large hero call to action with a 2px lift on hover. */
  size?: ButtonSize;
  /** Style the single child element (such as a link) instead of rendering a `<button>`. */
  asChild?: boolean;
}

export function buttonClass({ variant = "primary", size = "default" }: Pick<ButtonProps, "variant" | "size"> = {}): string {
  return cx("sla-btn", `sla-btn--${variant}`, size !== "default" && `sla-btn--${size}`);
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, type, ...props }, ref) => {
    const classes = cx(buttonClass({ variant, size }), className);
    if (asChild) return <Slot ref={ref as React.Ref<HTMLElement>} className={classes} {...props} />;
    return <button ref={ref} type={type ?? "button"} className={classes} {...props} />;
  },
);
Button.displayName = "Button";
