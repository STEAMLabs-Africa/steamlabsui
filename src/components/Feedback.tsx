import * as React from "react";
import { Icon } from "./Icon";
import { cx } from "./utils";

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Pixel size; defaults to 16. */
  size?: number;
  /** Read to screen readers. Pass an empty string when a parent already says it's busy. */
  label?: string;
}

/** A small rotating ring in the current text colour. */
export function Spinner({ size = 16, label = "Loading", className, style, ...props }: SpinnerProps) {
  return (
    <span
      role={label ? "status" : undefined}
      aria-label={label || undefined}
      aria-hidden={label ? undefined : true}
      className={cx("sla-spinner", className)}
      style={{ width: size, height: size, ...style }}
      {...props}
    />
  );
}

export type AlertTone = "info" | "success" | "warning" | "danger";

export interface AlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  tone?: AlertTone;
  title?: React.ReactNode;
  /** Replaces the tone's icon; pass `null` for none. */
  icon?: React.ReactNode;
  /** A retry button or link, placed after the message. */
  action?: React.ReactNode;
}

const alertIcon: Record<AlertTone, React.ReactNode> = {
  info: <Icon name="info" size={18} />,
  success: <Icon name="check-circle" size={18} />,
  warning: <Icon name="alert" size={18} />,
  danger: <Icon name="alert" size={18} />,
};

/**
 * A message about the page or a section of it. Tones show as a full-strength
 * stripe and icon on white, never a tinted fill. `danger` is announced
 * straight away (role="alert"); the others are polite.
 */
export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ tone = "info", title, icon, action, className, children, ...props }, ref) => (
    <div
      ref={ref}
      role={tone === "danger" ? "alert" : "status"}
      className={cx("sla-alert", `sla-alert--${tone}`, className)}
      {...props}
    >
      {icon === null ? null : <span className="sla-alert__icon">{icon ?? alertIcon[tone]}</span>}
      <div className="sla-alert__body">
        {title ? <p className="sla-alert__title">{title}</p> : null}
        {children ? <div className="sla-alert__text">{children}</div> : null}
      </div>
      {action ? <div className="sla-alert__action">{action}</div> : null}
    </div>
  ),
);
Alert.displayName = "Alert";

export interface EmptyStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  /** Usually one Button that creates the first item. */
  action?: React.ReactNode;
}

/** What a list or page shows before it has anything in it. */
export function EmptyState({ title, description, icon, action, className, ...props }: EmptyStateProps) {
  return (
    <div className={cx("sla-empty", className)} {...props}>
      {icon ? <div className="sla-empty__icon">{icon}</div> : null}
      <p className="sla-empty__title">{title}</p>
      {description ? <p className="sla-empty__description">{description}</p> : null}
      {action ? <div className="sla-empty__action">{action}</div> : null}
    </div>
  );
}

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: number | string;
  height?: number | string;
  /** `circle` for avatars, `text` for a line of copy. */
  shape?: "block" | "text" | "circle";
}

/** A grey placeholder that pulses while content loads. Hidden from screen readers. */
export function Skeleton({ width, height, shape = "block", className, style, ...props }: SkeletonProps) {
  return (
    <div
      aria-hidden
      className={cx("sla-skeleton", shape !== "block" && `sla-skeleton--${shape}`, className)}
      style={{ width, height, ...style }}
      {...props}
    />
  );
}
