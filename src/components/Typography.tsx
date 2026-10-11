import * as React from "react";
import { cx, Slot } from "./utils";

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

export interface TextLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Adds a trailing arrow; `external` also opens in a new tab. */
  arrow?: "forward" | "external" | false;
  /** Style the single child (a router link) instead of rendering an `<a>`. */
  asChild?: boolean;
}

/** The quiet inline "read more" link in Clover Green. */
export const TextLink = React.forwardRef<HTMLAnchorElement, TextLinkProps>(
  ({ className, arrow = "forward", asChild, children, ...props }, ref) => {
    const external = arrow === "external";
    const mark = arrow ? <span aria-hidden>{external ? " ↗" : " →"}</span> : null;
    const classes = cx("sla-textlink", className);
    if (asChild && React.isValidElement<{ children?: React.ReactNode }>(children)) {
      return (
        <Slot ref={ref as React.Ref<HTMLElement>} className={classes} {...props}>
          {React.cloneElement(children, {}, children.props.children, mark)}
        </Slot>
      );
    }
    return (
      <a ref={ref} className={classes} {...(external ? { target: "_blank", rel: "noreferrer" } : {})} {...props}>
        {children}
        {mark}
      </a>
    );
  },
);
TextLink.displayName = "TextLink";
