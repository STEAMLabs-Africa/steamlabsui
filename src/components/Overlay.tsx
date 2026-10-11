import * as React from "react";
import { Icon } from "./Icon";
import { cx } from "./utils";

/* ---------------------------------------------------------------- Dialog */

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  /** Buttons, right-aligned. Put the main action last. */
  footer?: React.ReactNode;
  /** `center` is a modal; `right` is a side sheet; `bottom` slides up like a drawer. */
  side?: "center" | "right" | "bottom";
  /** Width of a centred dialog. */
  size?: "sm" | "md" | "lg";
  /** Hide the × button, for confirmations that need an explicit choice. */
  hideClose?: boolean;
  className?: string;
}

/**
 * A modal on the native `<dialog>`, so focus trapping, Escape and the
 * backdrop come from the browser. Covers what the apps called Modal, Sheet,
 * Drawer and AlertDialog.
 */
export function Dialog({ open, onClose, title, description, children, footer, side = "center", size = "md", hideClose, className }: DialogProps) {
  const ref = React.useRef<HTMLDialogElement>(null);
  const titleId = React.useId();
  const descId = React.useId();

  React.useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal?.();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      aria-describedby={description ? descId : undefined}
      className={cx("sla-dialog", `sla-dialog--${side}`, side === "center" && `sla-dialog--${size}`, className)}
      // Escape fires `cancel`. Keep React in charge of the open state.
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
    >
      <div className="sla-dialog__header">
        <div>
          <h2 id={titleId} className="sla-dialog__title">{title}</h2>
          {description ? <p id={descId} className="sla-dialog__description">{description}</p> : null}
        </div>
        {hideClose ? null : (
          <button type="button" className="sla-btn sla-btn--ghost sla-btn--icon" aria-label="Close" onClick={onClose}>
            <Icon name="x" />
          </button>
        )}
      </div>
      {children ? <div className="sla-dialog__body">{children}</div> : null}
      {footer ? <div className="sla-dialog__footer">{footer}</div> : null}
    </dialog>
  );
}

/* ---------------------------------------------------------------- Tooltip */

export interface TooltipProps {
  /** Short text: a few words. Tooltips can't hold links or buttons. */
  content: React.ReactNode;
  /** One focusable element (a button or link). */
  children: React.ReactElement<Record<string, unknown>>;
  side?: "top" | "bottom";
}

/** A label that appears on hover and keyboard focus, wired with aria-describedby. */
export function Tooltip({ content, children, side = "top" }: TooltipProps) {
  const id = React.useId();
  return (
    <span className={cx("sla-tooltip", side === "bottom" && "sla-tooltip--bottom")}>
      {React.cloneElement(children, { "aria-describedby": id })}
      <span role="tooltip" id={id} className="sla-tooltip__bubble">{content}</span>
    </span>
  );
}
