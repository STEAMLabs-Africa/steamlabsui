import * as React from "react";
import { Icon } from "./Icon";
import { cx } from "./utils";

/** A native `<select>` styled to match Input. Native keeps it accessible and mobile-friendly. */
export const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, ...props }, ref) => (
    <span className={cx("sla-select", className)}>
      <select ref={ref} className="sla-input sla-select__control" {...props} />
      <Icon name="chevron-down" className="sla-select__chevron" />
    </span>
  ),
);
Select.displayName = "Select";

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: React.ReactNode;
  hint?: React.ReactNode;
}

/** A checkbox and its label as one clickable row. */
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(({ label, hint, id, className, ...props }, ref) => {
  const auto = React.useId();
  const inputId = id ?? auto;
  const hintId = hint ? `${inputId}-hint` : undefined;
  return (
    <div className={cx("sla-check", className)}>
      <input ref={ref} id={inputId} type="checkbox" className="sla-check__input" aria-describedby={hintId} {...props} />
      <div>
        <label htmlFor={inputId} className="sla-check__label">{label}</label>
        {hint ? <p id={hintId} className="sla-field__hint">{hint}</p> : null}
      </div>
    </div>
  );
});
Checkbox.displayName = "Checkbox";

export interface RadioOption {
  value: string;
  label: React.ReactNode;
  hint?: React.ReactNode;
  disabled?: boolean;
}

export interface RadioGroupProps extends Omit<React.FieldsetHTMLAttributes<HTMLFieldSetElement>, "onChange" | "defaultValue"> {
  /** The group's question, rendered as the fieldset legend. */
  legend: React.ReactNode;
  name: string;
  options: RadioOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Lay the options out in a row instead of a column. */
  inline?: boolean;
}

/** Native radio buttons in a fieldset, so arrow keys and form submission just work. */
export function RadioGroup({ legend, name, options, value, defaultValue, onValueChange, inline, className, ...props }: RadioGroupProps) {
  const base = React.useId();
  return (
    <fieldset className={cx("sla-radio-group", inline && "sla-radio-group--inline", className)} {...props}>
      <legend className="sla-label">{legend}</legend>
      <div className="sla-radio-group__options">
        {options.map((o, i) => {
          const id = `${base}-${i}`;
          return (
            <div key={o.value} className="sla-check">
              <input
                id={id}
                type="radio"
                name={name}
                value={o.value}
                disabled={o.disabled}
                className="sla-check__input sla-check__input--radio"
                {...(value !== undefined ? { checked: value === o.value, onChange: () => onValueChange?.(o.value) } : { defaultChecked: defaultValue === o.value, onChange: () => onValueChange?.(o.value) })}
              />
              <div>
                <label htmlFor={id} className="sla-check__label">{o.label}</label>
                {o.hint ? <p className="sla-field__hint">{o.hint}</p> : null}
              </div>
            </div>
          );
        })}
      </div>
    </fieldset>
  );
}

export interface SwitchProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange" | "value"> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  /** Visible label beside the switch. Without it, pass aria-label. */
  label?: React.ReactNode;
  /** Adds a hidden input so the switch submits with a plain form ("on" or "off"). */
  name?: string;
}

/** An on/off switch. Controlled with `checked`, or self-managed from `defaultChecked`. */
export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ checked, defaultChecked = false, onCheckedChange, label, name, className, disabled, id, onClick, ...props }, ref) => {
    const [internal, setInternal] = React.useState(defaultChecked);
    const on = checked ?? internal;
    const auto = React.useId();
    const switchId = id ?? auto;
    const button = (
      <button
        ref={ref}
        id={switchId}
        type="button"
        role="switch"
        aria-checked={on}
        disabled={disabled}
        className={cx("sla-switch", !label && className)}
        onClick={(e) => {
          onClick?.(e);
          if (e.defaultPrevented) return;
          if (checked === undefined) setInternal(!on);
          onCheckedChange?.(!on);
        }}
        {...props}
      >
        <span className="sla-switch__thumb" aria-hidden />
        {name ? <input type="hidden" name={name} value={on ? "on" : "off"} /> : null}
      </button>
    );
    if (!label) return button;
    return (
      <div className={cx("sla-switch-row", className)}>
        {button}
        <label htmlFor={switchId} className="sla-check__label">{label}</label>
      </div>
    );
  },
);
Switch.displayName = "Switch";

export interface SegmentedControlProps<T extends string> extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  options: readonly (T | { value: T; label: React.ReactNode })[];
  value: T;
  onValueChange: (value: T) => void;
  /** Names the group for screen readers. */
  "aria-label": string;
  size?: "default" | "sm";
}

/** Two to five mutually exclusive choices that switch a view (Week / Month / Year). */
export function SegmentedControl<T extends string>({ options, value, onValueChange, size = "default", className, ...props }: SegmentedControlProps<T>) {
  return (
    <div role="radiogroup" className={cx("sla-segmented", size === "sm" && "sla-segmented--sm", className)} {...props}>
      {options.map((opt) => {
        const o = typeof opt === "string" ? { value: opt, label: opt } : opt;
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={active}
            className="sla-segmented__item"
            onClick={() => onValueChange(o.value)}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
