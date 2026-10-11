import * as React from "react";
import { Icon } from "./Icon";
import { cx, Slot } from "./utils";

/* ---------------------------------------------------------------- Tabs */

interface TabsContextValue {
  value: string;
  setValue: (v: string) => void;
  base: string;
}
const TabsContext = React.createContext<TabsContextValue | null>(null);
const useTabs = () => {
  const ctx = React.useContext(TabsContext);
  if (!ctx) throw new Error("Tabs parts must sit inside <Tabs>.");
  return ctx;
};

export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

/** Switches between panels in place. Arrow keys move between tabs. */
export function Tabs({ value, defaultValue = "", onValueChange, className, ...props }: TabsProps) {
  const [internal, setInternal] = React.useState(defaultValue);
  const base = React.useId();
  const current = value ?? internal;
  const setValue = React.useCallback(
    (v: string) => {
      if (value === undefined) setInternal(v);
      onValueChange?.(v);
    },
    [value, onValueChange],
  );
  return (
    <TabsContext.Provider value={{ value: current, setValue, base }}>
      <div className={cx("sla-tabs", className)} {...props} />
    </TabsContext.Provider>
  );
}

export function TabsList({ className, onKeyDown, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      role="tablist"
      className={cx("sla-tabs__list", className)}
      onKeyDown={(e) => {
        onKeyDown?.(e);
        if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) return;
        const tabs = Array.from(e.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]:not(:disabled)'));
        const i = tabs.indexOf(document.activeElement as HTMLButtonElement);
        const next =
          e.key === "Home" ? 0 : e.key === "End" ? tabs.length - 1 : (i + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
        tabs[next]?.focus();
        tabs[next]?.click();
        e.preventDefault();
      }}
      {...props}
    />
  );
}

export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

export function TabsTrigger({ value, className, ...props }: TabsTriggerProps) {
  const tabs = useTabs();
  const selected = tabs.value === value;
  return (
    <button
      type="button"
      role="tab"
      id={`${tabs.base}-tab-${value}`}
      aria-controls={`${tabs.base}-panel-${value}`}
      aria-selected={selected}
      tabIndex={selected ? 0 : -1}
      className={cx("sla-tabs__trigger", className)}
      onClick={() => tabs.setValue(value)}
      {...props}
    />
  );
}

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export function TabsContent({ value, className, ...props }: TabsContentProps) {
  const tabs = useTabs();
  return (
    <div
      role="tabpanel"
      id={`${tabs.base}-panel-${value}`}
      aria-labelledby={`${tabs.base}-tab-${value}`}
      hidden={tabs.value !== value}
      tabIndex={0}
      className={cx("sla-tabs__content", className)}
      {...props}
    />
  );
}

/* ---------------------------------------------------------------- Breadcrumb */

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  /** The trail. Leave `href` off the last item: it's the current page. */
  items: { label: React.ReactNode; href?: string }[];
}

export function Breadcrumb({ items, className, ...props }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cx("sla-breadcrumb", className)} {...props}>
      <ol>
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={i}>
              {item.href && !last ? <a href={item.href}>{item.label}</a> : <span aria-current={last ? "page" : undefined}>{item.label}</span>}
              {!last ? <Icon name="chevron-right" size={14} className="sla-breadcrumb__sep" /> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/* ---------------------------------------------------------------- Pagination */

export interface PaginationProps extends Omit<React.HTMLAttributes<HTMLElement>, "onChange"> {
  page: number;
  pageCount: number;
  /** Client-side paging. */
  onPageChange?: (page: number) => void;
  /** Link-based paging: return the URL for a page. Takes priority over onPageChange. */
  hrefFor?: (page: number) => string;
}

/** Pages shown around the current one, with ellipses for the gaps. */
export function pageRange(page: number, count: number): (number | "…")[] {
  if (count <= 7) return Array.from({ length: count }, (_, i) => i + 1);
  const out: (number | "…")[] = [1];
  const start = Math.max(2, page - 1);
  const end = Math.min(count - 1, page + 1);
  if (start > 2) out.push("…");
  for (let p = start; p <= end; p++) out.push(p);
  if (end < count - 1) out.push("…");
  out.push(count);
  return out;
}

export function Pagination({ page, pageCount, onPageChange, hrefFor, className, ...props }: PaginationProps) {
  const item = (p: number, label: React.ReactNode, extra: { current?: boolean; disabled?: boolean; aria?: string } = {}) => {
    const cls = cx("sla-pagination__item", extra.current && "sla-pagination__item--current");
    if (extra.disabled) return <span className={cx(cls, "sla-pagination__item--disabled")} aria-hidden>{label}</span>;
    if (hrefFor) return <a className={cls} href={hrefFor(p)} aria-current={extra.current ? "page" : undefined} aria-label={extra.aria}>{label}</a>;
    return (
      <button type="button" className={cls} onClick={() => onPageChange?.(p)} aria-current={extra.current ? "page" : undefined} aria-label={extra.aria}>
        {label}
      </button>
    );
  };
  return (
    <nav aria-label="Pagination" className={cx("sla-pagination", className)} {...props}>
      {item(page - 1, <Icon name="chevron-left" />, { disabled: page <= 1, aria: "Previous page" })}
      {pageRange(page, pageCount).map((p, i) =>
        p === "…" ? <span key={`gap-${i}`} className="sla-pagination__gap">…</span> : <React.Fragment key={p}>{item(p, p, { current: p === page, aria: `Page ${p}` })}</React.Fragment>,
      )}
      {item(page + 1, <Icon name="chevron-right" />, { disabled: page >= pageCount, aria: "Next page" })}
    </nav>
  );
}

/* ---------------------------------------------------------------- SkipLink */

/** The first focusable thing on the page: jumps keyboard users past the navigation. */
export function SkipLink({ href = "#main", children = "Skip to content", className, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a href={href} className={cx("sla-skip-link", className)} {...props}>{children}</a>;
}

/* ---------------------------------------------------------------- BackLink */

export interface BackLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** `ink` for a white outline on a green header band. */
  on?: "background" | "ink";
  asChild?: boolean;
}

/** A bordered "← Back" link with a real hit area, for the top of app pages. */
export const BackLink = React.forwardRef<HTMLAnchorElement, BackLinkProps>(({ on = "background", asChild, className, children = "Back", ...props }, ref) => {
  const classes = cx("sla-back-link", on === "ink" && "sla-back-link--on-ink", className);
  if (asChild && React.isValidElement<{ children?: React.ReactNode }>(children)) {
    return (
      <Slot ref={ref as React.Ref<HTMLElement>} className={classes} {...props}>
        {React.cloneElement(children, {}, <Icon name="arrow-left" size={14} />, children.props.children)}
      </Slot>
    );
  }
  return (
    <a ref={ref} className={classes} {...props}>
      <Icon name="arrow-left" size={14} />
      {children}
    </a>
  );
});
BackLink.displayName = "BackLink";

/* ---------------------------------------------------------------- Menu */

export interface MenuItem {
  label: React.ReactNode;
  onSelect?: () => void;
  href?: string;
  icon?: React.ReactNode;
  tone?: "default" | "danger";
  disabled?: boolean;
}

export interface MenuProps {
  items: (MenuItem | "separator")[];
  /** The button's content. Defaults to a "…" icon. */
  trigger?: React.ReactNode;
  /** Accessible name for the trigger. Required when the trigger is only an icon. */
  label?: string;
  /** Which edge the menu lines up with. */
  align?: "start" | "end";
  className?: string;
}

/**
 * A button that opens a short list of actions. Closes on Escape, outside
 * click or selection, and arrow keys move through the items. It stops click
 * propagation so it can sit inside a clickable row.
 */
export function Menu({ items, trigger, label = "More actions", align = "end", className }: MenuProps) {
  const [open, setOpen] = React.useState(false);
  const root = React.useRef<HTMLDivElement>(null);
  const button = React.useRef<HTMLButtonElement>(null);
  const id = React.useId();

  React.useEffect(() => {
    if (!open) return;
    const first = root.current?.querySelector<HTMLElement>('[role="menuitem"]:not([aria-disabled="true"])');
    first?.focus();
    const onDoc = (e: MouseEvent) => {
      if (root.current && !root.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const close = () => {
    setOpen(false);
    button.current?.focus();
  };

  return (
    <div ref={root} className={cx("sla-menu", className)} onClick={(e) => e.stopPropagation()}>
      <button
        ref={button}
        type="button"
        className={cx("sla-btn", trigger ? "sla-btn--outline" : "sla-btn--ghost sla-btn--icon")}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? id : undefined}
        aria-label={trigger ? undefined : label}
        onClick={() => setOpen((v) => !v)}
      >
        {trigger ?? <Icon name="dots" />}
      </button>
      {open ? (
        <div
          id={id}
          role="menu"
          className={cx("sla-menu__list", align === "start" && "sla-menu__list--start")}
          onKeyDown={(e) => {
            if (e.key === "Escape" || e.key === "Tab") return close();
            if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
            e.preventDefault();
            const els = Array.from(e.currentTarget.querySelectorAll<HTMLElement>('[role="menuitem"]:not([aria-disabled="true"])'));
            const i = els.indexOf(document.activeElement as HTMLElement);
            els[(i + (e.key === "ArrowDown" ? 1 : -1) + els.length) % els.length]?.focus();
          }}
        >
          {items.map((item, i) => {
            if (item === "separator") return <div key={i} role="separator" className="sla-menu__separator" />;
            const cls = cx("sla-menu__item", item.tone === "danger" && "sla-menu__item--danger");
            const content = (
              <>
                {item.icon ? <span className="sla-menu__icon">{item.icon}</span> : null}
                {item.label}
              </>
            );
            if (item.href && !item.disabled) {
              return <a key={i} role="menuitem" tabIndex={-1} href={item.href} className={cls} onClick={() => setOpen(false)}>{content}</a>;
            }
            return (
              <button
                key={i}
                type="button"
                role="menuitem"
                tabIndex={-1}
                aria-disabled={item.disabled || undefined}
                className={cls}
                onClick={() => {
                  if (item.disabled) return;
                  close();
                  item.onSelect?.();
                }}
              >
                {content}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
