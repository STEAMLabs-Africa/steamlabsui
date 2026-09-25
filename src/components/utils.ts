import * as React from "react";

type ClassValue = string | false | null | undefined;

/** Joins class names, skipping falsy values. */
export function cx(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Renders its single child element instead of a wrapper, merging props and
 * class names onto it. Lets `<Button asChild><a href="/">…</a></Button>`
 * style a link as a button.
 */
export const Slot = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement> & { children?: React.ReactNode }>(
  ({ children, className, ...props }, ref) => {
    if (!React.isValidElement<Record<string, unknown>>(children)) return null;
    const childProps = children.props;
    return React.cloneElement(children, {
      ...props,
      ...childProps,
      className: cx(className, childProps.className as string | undefined),
      ref,
    });
  },
);
Slot.displayName = "Slot";
