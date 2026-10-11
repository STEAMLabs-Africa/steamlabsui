import * as React from "react";
import { cx } from "./utils";

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/** Calls back once when the element first scrolls into view. */
function useInView<T extends Element>(onEnter: () => void, threshold = 0.15) {
  const ref = React.useRef<T>(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return onEnter();
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          onEnter();
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return ref;
}

export interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Milliseconds to wait after it enters view, for staggering a row. */
  delay?: number;
}

/**
 * Fades and lifts its children in when they scroll into view. Content is
 * visible without JavaScript and for people who prefer reduced motion.
 */
export function Reveal({ delay = 0, className, style, ...props }: RevealProps) {
  const [shown, setShown] = React.useState(false);
  const [armed, setArmed] = React.useState(false);
  React.useEffect(() => setArmed(!prefersReducedMotion()), []);
  const ref = useInView<HTMLDivElement>(() => setShown(true));
  return (
    <div
      ref={ref}
      className={cx("sla-reveal", armed && "sla-reveal--armed", shown && "sla-reveal--shown", className)}
      style={{ transitionDelay: delay ? `${delay}ms` : undefined, ...style }}
      {...props}
    />
  );
}

export interface CountUpProps extends React.HTMLAttributes<HTMLSpanElement> {
  to: number;
  /** Milliseconds; defaults to 1600. */
  duration?: number;
  prefix?: string;
  suffix?: string;
  /** Formats the number; defaults to en-US grouping ("12,000"). */
  format?: (n: number) => string;
}

/**
 * Counts from zero to a figure when it scrolls into view. Server-renders the
 * final number so it is right without JavaScript, and screen readers only
 * ever hear the final number.
 */
export function CountUp({ to, duration = 1600, prefix = "", suffix = "", format = (n) => Math.round(n).toLocaleString("en-US"), className, ...props }: CountUpProps) {
  const [n, setN] = React.useState(to);
  const ref = useInView<HTMLSpanElement>(() => {
    if (prefersReducedMotion()) return;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      setN(to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    };
    setN(0);
    requestAnimationFrame(tick);
  });
  const final = `${prefix}${format(to)}${suffix}`;
  return (
    <span ref={ref} className={cx("sla-count-up", className)} {...props}>
      <span aria-hidden>{`${prefix}${format(n)}${suffix}`}</span>
      <span className="sla-visually-hidden">{final}</span>
    </span>
  );
}
