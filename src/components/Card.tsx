import * as React from "react";
import { cx } from "./utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Adds the flat Hampton offset shadow and larger corners. */
  feature?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(({ className, feature, ...props }, ref) => (
  <div ref={ref} className={cx("sla-card", feature && "sla-card--feature", className)} {...props} />
));
Card.displayName = "Card";

const part = <E extends HTMLElement>(name: string, Tag: "div" | "h3" | "p") => {
  const C = React.forwardRef<E, React.HTMLAttributes<E>>(({ className, ...props }, ref) =>
    React.createElement(Tag, { ref, className: cx(`sla-card__${name}`, className), ...props }),
  );
  C.displayName = `Card${name[0]!.toUpperCase()}${name.slice(1)}`;
  return C;
};

export const CardHeader = part<HTMLDivElement>("header", "div");
export const CardTitle = part<HTMLHeadingElement>("title", "h3");
export const CardDescription = part<HTMLParagraphElement>("description", "p");
export const CardContent = part<HTMLDivElement>("content", "div");
export const CardFooter = part<HTMLDivElement>("footer", "div");
