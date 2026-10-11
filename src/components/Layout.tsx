import * as React from "react";
import { Eyebrow } from "./Typography";
import { cx } from "./utils";

/** Standard vertical rhythm for a page section on the plain background. Use `Band` for a coloured one. */
export const Section = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(({ className, ...props }, ref) => (
  <section ref={ref} className={cx("sla-section", className)} {...props} />
));
Section.displayName = "Section";

export interface SectionHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  /** Supporting paragraph. On wide screens it sits to the right of the title. */
  description?: React.ReactNode;
  /** The ground it sits on, so the eyebrow stays readable. */
  on?: "background" | "ink" | "surface";
  /** Heading level; defaults to h2. */
  as?: "h1" | "h2" | "h3";
}

/** Eyebrow, heading and optional supporting text: the house layout for section openers. */
export function SectionHeader({ eyebrow, title, description, on = "background", as: Tag = "h2", className, ...props }: SectionHeaderProps) {
  return (
    <div className={cx("sla-section-header", description != null && "sla-section-header--split", className)} {...props}>
      <div>
        {eyebrow ? <Eyebrow on={on}>{eyebrow}</Eyebrow> : null}
        <Tag className="sla-section-header__title">{title}</Tag>
      </div>
      {description ? <p className="sla-section-header__description">{description}</p> : null}
    </div>
  );
}

export interface PageHeaderProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title: React.ReactNode;
  description?: React.ReactNode;
  eyebrow?: React.ReactNode;
  /** A `BackLink` or breadcrumb shown above the title. */
  back?: React.ReactNode;
  /** Buttons on the right. */
  actions?: React.ReactNode;
  /** Badges and small facts under the title. */
  meta?: React.ReactNode;
  /** `band` puts the header on a Clover Green panel, as the apps do. */
  tone?: "plain" | "band";
}

/** The top of an app page: the way back, where you are, and what you can do. */
export function PageHeader({ title, description, eyebrow, back, actions, meta, tone = "plain", className, ...props }: PageHeaderProps) {
  return (
    <header className={cx("sla-page-header", tone === "band" && "sla-page-header--band", className)} {...props}>
      <div className="sla-page-header__main">
        {back ? <div className="sla-page-header__back">{back}</div> : null}
        {eyebrow ? <Eyebrow on={tone === "band" ? "ink" : "background"}>{eyebrow}</Eyebrow> : null}
        <h1 className="sla-page-header__title">{title}</h1>
        {meta ? <div className="sla-page-header__meta">{meta}</div> : null}
        {description ? <p className="sla-page-header__description">{description}</p> : null}
      </div>
      {actions ? <div className="sla-page-header__actions">{actions}</div> : null}
    </header>
  );
}

export interface SeparatorProps extends React.HTMLAttributes<HTMLHRElement> {
  orientation?: "horizontal" | "vertical";
}

export const Separator = React.forwardRef<HTMLHRElement, SeparatorProps>(({ orientation = "horizontal", className, ...props }, ref) => (
  <hr
    ref={ref}
    aria-orientation={orientation === "vertical" ? "vertical" : undefined}
    className={cx("sla-separator", orientation === "vertical" && "sla-separator--vertical", className)}
    {...props}
  />
));
Separator.displayName = "Separator";
