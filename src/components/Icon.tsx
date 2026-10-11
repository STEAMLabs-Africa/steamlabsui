import * as React from "react";
import { cx } from "./utils";

/**
 * The small line-icon set the components need. Paths are 24×24, drawn with a
 * 2px round stroke so they sit with Poppins. Bring your own icon library for
 * anything else; the components accept any ReactNode where an icon goes.
 */
const paths = {
  check: "M20 6 9 17l-5-5",
  x: "M18 6 6 18M6 6l12 12",
  "chevron-down": "m6 9 6 6 6-6",
  "chevron-up": "m18 15-6-6-6 6",
  "chevron-left": "m15 18-6-6 6-6",
  "chevron-right": "m9 18 6-6-6-6",
  "arrow-left": "M19 12H5m7 7-7-7 7-7",
  "arrow-right": "M5 12h14m-7-7 7 7-7 7",
  "arrow-up-right": "M7 17 17 7M7 7h10v10",
  dots: "M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm7 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM5 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z",
  info: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Zm0-6v-4m0-4h.01",
  alert: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Zm0-14v4m0 4h.01",
  "check-circle": "M22 11.1V12a10 10 0 1 1-5.9-9.1M22 4 12 14l-3-3",
  plus: "M12 5v14m-7-7h14",
  minus: "M5 12h14",
  search: "m21 21-4.3-4.3M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z",
  menu: "M4 6h16M4 12h16M4 18h16",
  external: "M15 3h6v6m-11 5L21 3m-3 10v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",
} as const;

export type IconName = keyof typeof paths;
export const iconNames = Object.keys(paths) as IconName[];

export interface IconProps extends React.SVGAttributes<SVGSVGElement> {
  name: IconName;
  /** Pixel size; defaults to 16. */
  size?: number;
  /** Accessible name. Without it the icon is hidden from screen readers. */
  label?: string;
}

export function Icon({ name, size = 16, label, className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cx("sla-icon", className)}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
      {...props}
    >
      <path d={paths[name]} />
    </svg>
  );
}
