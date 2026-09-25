import * as React from "react";
import { cx } from "./utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => <input ref={ref} className={cx("sla-input", className)} {...props} />,
);
Input.displayName = "Input";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => <textarea ref={ref} className={cx("sla-input sla-textarea", className)} {...props} />,
);
Textarea.displayName = "Textarea";

export const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => <label ref={ref} className={cx("sla-label", className)} {...props} />,
);
Label.displayName = "Label";

export interface FieldProps {
  label: React.ReactNode;
  /** Id of the control; generated when omitted. */
  id?: string;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  className?: string;
  /** A single Input, Textarea or select. It receives id and aria wiring. */
  children: React.ReactElement<Record<string, unknown>>;
}

/** A label, a control and an optional hint or error, wired for screen readers. */
export function Field({ label, id, hint, error, className, children }: FieldProps) {
  const auto = React.useId();
  const controlId = id ?? auto;
  const hintId = hint ? `${controlId}-hint` : undefined;
  const errorId = error ? `${controlId}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;
  return (
    <div className={cx("sla-field", className)}>
      <Label htmlFor={controlId}>{label}</Label>
      {React.cloneElement(children, {
        id: controlId,
        "aria-describedby": describedBy,
        "aria-invalid": error ? true : undefined,
      })}
      {hint ? <p id={hintId} className="sla-field__hint">{hint}</p> : null}
      {error ? <p id={errorId} className="sla-field__error">{error}</p> : null}
    </div>
  );
}
