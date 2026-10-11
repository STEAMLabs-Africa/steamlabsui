import * as React from "react";
import { Icon } from "./Icon";
import { cx } from "./utils";

export type ToastTone = "default" | "success" | "danger";

export interface ToastOptions {
  title: React.ReactNode;
  description?: React.ReactNode;
  tone?: ToastTone;
  /** Milliseconds before it goes. Defaults to 5000; 0 keeps it until dismissed. */
  duration?: number;
  /** One undo-style action. */
  action?: { label: string; onClick: () => void };
}

interface ToastItem extends ToastOptions {
  id: number;
}

interface ToastApi {
  toast: (t: ToastOptions | string) => number;
  dismiss: (id: number) => void;
}

const ToastContext = React.createContext<ToastApi | null>(null);

/** Returns `{ toast, dismiss }`. Must be inside a ToastProvider. */
export function useToast(): ToastApi {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error("useToast needs a <ToastProvider> above it.");
  return ctx;
}

/**
 * Holds the toast stack and renders it in the bottom-right corner (bottom
 * centre on phones). Messages are announced politely; danger ones assertively.
 */
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<ToastItem[]>([]);
  const next = React.useRef(1);

  const dismiss = React.useCallback((id: number) => setItems((xs) => xs.filter((x) => x.id !== id)), []);
  const toast = React.useCallback(
    (t: ToastOptions | string) => {
      const opts = typeof t === "string" ? { title: t } : t;
      const id = next.current++;
      setItems((xs) => [...xs.slice(-2), { ...opts, id }]);
      const ms = opts.duration ?? 5000;
      if (ms > 0) setTimeout(() => dismiss(id), ms);
      return id;
    },
    [dismiss],
  );
  const api = React.useMemo(() => ({ toast, dismiss }), [toast, dismiss]);

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div className="sla-toasts" aria-live="polite">
        {items.map((t) => (
          <div key={t.id} role={t.tone === "danger" ? "alert" : "status"} className={cx("sla-toast", t.tone && t.tone !== "default" && `sla-toast--${t.tone}`)}>
            <div className="sla-toast__body">
              <p className="sla-toast__title">{t.title}</p>
              {t.description ? <p className="sla-toast__description">{t.description}</p> : null}
            </div>
            {t.action ? (
              <button
                type="button"
                className="sla-btn sla-btn--outline sla-btn--sm"
                onClick={() => {
                  t.action!.onClick();
                  dismiss(t.id);
                }}
              >
                {t.action.label}
              </button>
            ) : null}
            <button type="button" className="sla-toast__close" aria-label="Dismiss" onClick={() => dismiss(t.id)}>
              <Icon name="x" size={14} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
