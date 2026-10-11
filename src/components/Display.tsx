import * as React from "react";
import { Icon } from "./Icon";
import { cx, Slot } from "./utils";

/* ---------------------------------------------------------------- Avatar */

/** Up to two initials from a name. */
export function initials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .map((w) => w[0] ?? "")
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/**
 * Brand colours an avatar can take, each with a text colour that passes 4.5:1.
 * Clover, Fuel, Pacific and Hampton carry dark text; Jazzberry carries white.
 */
const avatarTones = ["clover", "fuel", "pacific", "jazzberry", "hampton"] as const;
export type AvatarTone = (typeof avatarTones)[number];

/** Picks the same tone for the same name every time. */
export function avatarTone(name: string): AvatarTone {
  const sum = [...name].reduce((a, c) => a + c.charCodeAt(0), 0);
  return avatarTones[sum % avatarTones.length]!;
}

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  name: string;
  src?: string | null;
  /** Pixel size; defaults to 36. */
  size?: number;
  /** Rounded square instead of a circle, for organisations. */
  square?: boolean;
  tone?: AvatarTone;
}

/** A photo, or initials on a brand colour when there's no photo. */
export function Avatar({ name, src, size = 36, square, tone, className, style, ...props }: AvatarProps) {
  const t = tone ?? avatarTone(name);
  return (
    <span
      className={cx("sla-avatar", `sla-avatar--${t}`, square && "sla-avatar--square", className)}
      style={{ width: size, height: size, fontSize: Math.round(size / 2.7), ...style }}
      {...props}
    >
      {src ? <img src={src} alt={name} className="sla-avatar__img" /> : <span role="img" aria-label={name}>{initials(name)}</span>}
    </span>
  );
}

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  people: { name: string; src?: string | null }[];
  /** How many to show before "+N". Defaults to 4. */
  max?: number;
  size?: number;
}

/** Overlapping avatars with a "+N" for the rest. */
export function AvatarGroup({ people, max = 4, size = 32, className, ...props }: AvatarGroupProps) {
  const shown = people.slice(0, max);
  const rest = people.length - shown.length;
  return (
    <div className={cx("sla-avatar-group", className)} {...props}>
      {shown.map((p, i) => <Avatar key={i} name={p.name} src={p.src} size={size} />)}
      {rest > 0 ? (
        <span className="sla-avatar sla-avatar--more" style={{ width: size, height: size, fontSize: Math.round(size / 2.7) }} aria-label={`${rest} more`}>
          +{rest}
        </span>
      ) : null}
    </div>
  );
}

/* ---------------------------------------------------------------- Stat */

export interface StatProps extends React.HTMLAttributes<HTMLDivElement> {
  value: React.ReactNode;
  label: React.ReactNode;
  /** `band` is the big Fuel Yellow figure on a green band; `tile` is a dashboard card. */
  variant?: "band" | "tile";
  /** Change since last period, shown under the value on tiles ("+12% this month"). */
  delta?: React.ReactNode;
  /** Small icon beside the label on tiles. */
  icon?: React.ReactNode;
}

/** A single figure with its label. */
export function Stat({ value, label, variant = "tile", delta, icon, className, ...props }: StatProps) {
  if (variant === "band") {
    return (
      <div className={cx("sla-stat sla-stat--band", className)} {...props}>
        <div className="sla-stat__value">{value}</div>
        <p className="sla-stat__label">{label}</p>
      </div>
    );
  }
  return (
    <div className={cx("sla-stat sla-stat--tile", className)} {...props}>
      <p className="sla-stat__label">
        {icon ? <span className="sla-stat__icon">{icon}</span> : null}
        {label}
      </p>
      <div className="sla-stat__value">{value}</div>
      {delta ? <p className="sla-stat__delta">{delta}</p> : null}
    </div>
  );
}

/* ---------------------------------------------------------------- Table */

const tablePart = <E extends HTMLElement>(Tag: string, cls: string, name: string) => {
  const C = React.forwardRef<E, React.HTMLAttributes<E> & React.TdHTMLAttributes<E> & React.ThHTMLAttributes<E>>(({ className, ...props }, ref) =>
    React.createElement(Tag, { ref, className: cx(cls, className), ...props }),
  );
  C.displayName = name;
  return C;
};

export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  /** Tighter rows for dense app screens. */
  compact?: boolean;
}

/** A data table that scrolls sideways on small screens instead of squashing. */
export const Table = React.forwardRef<HTMLTableElement, TableProps>(({ className, compact, ...props }, ref) => (
  <div className="sla-table-wrap">
    <table ref={ref} className={cx("sla-table", compact && "sla-table--compact", className)} {...props} />
  </div>
));
Table.displayName = "Table";
export const TableHeader = tablePart<HTMLTableSectionElement>("thead", "sla-table__head", "TableHeader");
export const TableBody = tablePart<HTMLTableSectionElement>("tbody", "sla-table__body", "TableBody");
export const TableFooter = tablePart<HTMLTableSectionElement>("tfoot", "sla-table__foot", "TableFooter");
export const TableRow = tablePart<HTMLTableRowElement>("tr", "sla-table__row", "TableRow");
export const TableHead = tablePart<HTMLTableCellElement>("th", "sla-table__th", "TableHead");
export const TableCell = tablePart<HTMLTableCellElement>("td", "sla-table__td", "TableCell");
export const TableCaption = tablePart<HTMLTableCaptionElement>("caption", "sla-table__caption", "TableCaption");

/* ---------------------------------------------------------------- List */

export const List = React.forwardRef<HTMLUListElement, React.HTMLAttributes<HTMLUListElement>>(({ className, ...props }, ref) => (
  <ul ref={ref} className={cx("sla-list", className)} {...props} />
));
List.displayName = "List";

export interface ListItemProps extends Omit<React.HTMLAttributes<HTMLLIElement>, "title"> {
  /** Avatar or icon on the left. */
  leading?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Badge, date or menu on the right. */
  trailing?: React.ReactNode;
  /** Makes the whole row a link. */
  href?: string;
  /** Pass a router link here instead of `href` to make the row navigate client-side. */
  link?: React.ReactElement;
}

/** One row in a List: leading visual, title and description, trailing detail. */
export function ListItem({ leading, title, description, trailing, href, link, className, ...props }: ListItemProps) {
  const inner = (
    <>
      {leading ? <span className="sla-list__leading">{leading}</span> : null}
      <span className="sla-list__text">
        <span className="sla-list__title">{title}</span>
        {description ? <span className="sla-list__description">{description}</span> : null}
      </span>
      {trailing ? <span className="sla-list__trailing">{trailing}</span> : null}
    </>
  );
  return (
    <li className={cx("sla-list__item", className)} {...props}>
      {link ? (
        <Slot className="sla-list__row sla-list__row--link">{React.cloneElement(link, {}, inner)}</Slot>
      ) : href ? (
        <a href={href} className="sla-list__row sla-list__row--link">{inner}</a>
      ) : (
        <div className="sla-list__row">{inner}</div>
      )}
    </li>
  );
}

/* ---------------------------------------------------------------- Tile */

export const TileGrid = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cx("sla-tile-grid", className)} {...props} />
));
TileGrid.displayName = "TileGrid";

export interface TileProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "title"> {
  title: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  /** A count or badge in the corner. */
  meta?: React.ReactNode;
  /** `ink` is a Clover Green tile, for the one section that leads. */
  tone?: "default" | "ink";
  asChild?: boolean;
}

/** A large clickable card that opens a section of an app. */
export const Tile = React.forwardRef<HTMLAnchorElement, TileProps>(
  ({ title, description, icon, meta, tone = "default", asChild, className, children, ...props }, ref) => {
    const classes = cx("sla-tile", tone === "ink" && "sla-tile--ink", className);
    const inner = (
      <>
        <span className="sla-tile__top">
          {icon ? <span className="sla-tile__icon">{icon}</span> : <span />}
          {meta ? <span className="sla-tile__meta">{meta}</span> : null}
        </span>
        <span className="sla-tile__title">{title}</span>
        {description ? <span className="sla-tile__description">{description}</span> : null}
      </>
    );
    if (asChild && React.isValidElement(children)) {
      return <Slot ref={ref as React.Ref<HTMLElement>} className={classes} {...props}>{React.cloneElement(children, {}, inner)}</Slot>;
    }
    return <a ref={ref} className={classes} {...props}>{inner}</a>;
  },
);
Tile.displayName = "Tile";

/* ---------------------------------------------------------------- Progress */

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 0 to 100. */
  value: number;
  /** What this is progress of; read by screen readers. */
  label: string;
  /** Show the percentage to the right of the bar. */
  showValue?: boolean;
  tone?: "secondary" | "primary";
}

const clamp = (n: number) => Math.max(0, Math.min(100, n));

/** A horizontal progress bar. Clover Green by default. */
export function Progress({ value, label, showValue, tone = "secondary", className, ...props }: ProgressProps) {
  const v = clamp(value);
  return (
    <div className={cx("sla-progress", className)} {...props}>
      <div
        role="progressbar"
        aria-label={label}
        aria-valuenow={Math.round(v)}
        aria-valuemin={0}
        aria-valuemax={100}
        className="sla-progress__track"
      >
        <div className={cx("sla-progress__bar", tone === "primary" && "sla-progress__bar--primary")} style={{ width: `${v}%` }} />
      </div>
      {showValue ? <span className="sla-progress__value" aria-hidden>{Math.round(v)}%</span> : null}
    </div>
  );
}

export interface ProgressRingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  value: number;
  label: string;
  size?: number;
  stroke?: number;
  /** Replaces the percentage in the middle. */
  children?: React.ReactNode;
}

/** A circular progress indicator, for course and goal headers. */
export function ProgressRing({ value, label, size = 56, stroke = 6, className, style, children, ...props }: ProgressRingProps) {
  const v = clamp(value);
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuenow={Math.round(v)}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cx("sla-ring", className)}
      style={{ width: size, height: size, ...style }}
      {...props}
    >
      <svg width={size} height={size} aria-hidden className="sla-ring__svg">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={stroke} className="sla-ring__track" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c - (v / 100) * c}
          className="sla-ring__bar"
        />
      </svg>
      <span className="sla-ring__label">{children ?? `${Math.round(v)}%`}</span>
    </div>
  );
}

/* ---------------------------------------------------------------- Steps */

export type StepState = "done" | "current" | "pending" | "rejected" | "skipped";

export interface Step {
  label: React.ReactNode;
  state: StepState;
  /** A date or "by Amina", under the label. */
  detail?: React.ReactNode;
}

export interface StepsProps extends React.HTMLAttributes<HTMLOListElement> {
  steps: Step[];
}

const stateText: Record<StepState, string> = {
  done: "done",
  current: "in progress",
  pending: "not started",
  rejected: "rejected",
  skipped: "skipped",
};

/** A row of numbered steps: an approval chain, a sign-up flow, a course path. */
export function Steps({ steps, className, ...props }: StepsProps) {
  return (
    <ol className={cx("sla-steps", className)} {...props}>
      {steps.map((s, i) => (
        <li key={i} className={cx("sla-steps__item", `sla-steps__item--${s.state}`)} aria-current={s.state === "current" ? "step" : undefined}>
          <span className="sla-steps__marker" aria-hidden>
            {s.state === "done" ? <Icon name="check" size={14} /> : s.state === "rejected" ? <Icon name="x" size={14} /> : i + 1}
          </span>
          <span className="sla-steps__text">
            <span className="sla-steps__label">{s.label}</span>
            <span className="sla-visually-hidden">, {stateText[s.state]}</span>
            {s.detail ? <span className="sla-steps__detail">{s.detail}</span> : null}
          </span>
        </li>
      ))}
    </ol>
  );
}

/* ---------------------------------------------------------------- Accordion */

export const Accordion = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cx("sla-accordion", className)} {...props} />
));
Accordion.displayName = "Accordion";

export interface AccordionItemProps extends Omit<React.DetailsHTMLAttributes<HTMLDetailsElement>, "title"> {
  title: React.ReactNode;
  /**
   * Items sharing a `name` close each other, so only one stays open
   * (supported in current browsers; older ones allow several).
   */
  name?: string;
}

/** One question and answer, built on `<details>` so it works without JavaScript. */
export function AccordionItem({ title, className, children, ...props }: AccordionItemProps) {
  return (
    <details className={cx("sla-accordion__item", className)} {...props}>
      <summary className="sla-accordion__trigger">
        <span>{title}</span>
        <Icon name="chevron-down" className="sla-accordion__chevron" />
      </summary>
      <div className="sla-accordion__content">{children}</div>
    </details>
  );
}
