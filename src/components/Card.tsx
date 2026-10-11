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

export interface CodedCardProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  /** A short code or number shown as a green tag ("01", "AI-2"). */
  code: React.ReactNode;
  title: React.ReactNode;
  children?: React.ReactNode;
}

/** A numbered or code-tagged card: the workhorse of focus-area and value grids. */
export const CodedCard = React.forwardRef<HTMLElement, CodedCardProps>(({ code, title, className, children, ...props }, ref) => (
  <article ref={ref} className={cx("sla-card sla-coded-card", className)} {...props}>
    <span className="sla-coded-card__code" aria-hidden>{code}</span>
    <h3 className="sla-coded-card__title">{title}</h3>
    {children ? <div className="sla-coded-card__text">{children}</div> : null}
  </article>
));
CodedCard.displayName = "CodedCard";
