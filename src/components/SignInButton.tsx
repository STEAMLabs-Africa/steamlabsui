import * as React from "react";
import { Logo } from "../logo";
import { cx, Slot } from "./utils";

export type SignInButtonVariant = "light" | "dark";

export interface SignInButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Where the app starts its STEAMLabs ID sign-in. Default "/auth/signin", the route
   * @steamlabs-africa/id-check answers. Sign-in always opens as a full page, never a pop-up or frame.
   */
  href?: string;
  /** `light` (default): white, full-colour logo, for light pages. `dark`: Clover Green, white logo. */
  variant?: SignInButtonVariant;
  /** Full width of its container. Default false. */
  block?: boolean;
  /** The words on the button. Default "Sign in with STEAMLabs ID". */
  label?: string;
  /** Style your own link element (for example a router link) instead of rendering an `<a>`. */
  asChild?: boolean;
}

/**
 * The one "Sign in with STEAMLabs ID" button every STEAMLabs app uses, so sign-in looks the
 * same everywhere. It's a real link to the app's own sign-in route, which sends the person to
 * the STEAMLabs ID page as a full page, so they can see its address.
 */
export const SignInButton = React.forwardRef<HTMLAnchorElement, SignInButtonProps>(
  (
    { href = "/auth/signin", variant = "light", block = false, label = "Sign in with STEAMLabs ID", asChild = false, className, children, ...props },
    ref,
  ) => {
    const classes = cx("sla-sign-in-button", `sla-sign-in-button--${variant}`, block && "sla-sign-in-button--block", className);
    const inner = (
      <>
        <span className="sla-sign-in-button__mark" aria-hidden="true">
          <Logo variant={variant === "dark" ? "white" : "full-color"} width={34} title="" aria-hidden="true" role={undefined} />
        </span>
        <span className="sla-sign-in-button__label">{label}</span>
      </>
    );
    if (asChild) {
      return (
        <Slot ref={ref as React.Ref<HTMLElement>} className={classes} {...props}>
          {children}
        </Slot>
      );
    }
    return (
      <a ref={ref} href={href} className={classes} {...props}>
        {inner}
      </a>
    );
  },
);
SignInButton.displayName = "SignInButton";
