// Mounts each live preview so the interactive components work, and wires the
// docs chrome: code tabs, copy buttons, search and the active sidebar link.
import * as React from "react";
import { createRoot } from "react-dom/client";
import { examples } from "./all-examples.generated";

// Loading screen: hold the drawn logo for at least 1.9s and until the page has
// loaded, then fly it into the top bar's logo and drop the splash.
const splash = document.getElementById("splash");
if (splash) {
  const done = () => {
    splash.remove();
    document.getElementById("loadbar")?.remove();
    document.body.classList.remove("splashing");
  };
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) done();
  else {
    document.body.classList.add("splashing");
    const start = performance.now();
    const fly = () => {
      const logo = splash.querySelector<HTMLElement>(".splash-logo");
      const target = document.getElementById("brand-logo");
      if (!logo || !target) return done();
      window.scrollTo(0, 0);
      const from = logo.getBoundingClientRect();
      const to = target.getBoundingClientRect();
      splash.classList.add("leaving");
      logo.style.transform = `translate(${to.left - from.left}px, ${to.top - from.top}px) scale(${to.width / from.width})`;
      setTimeout(done, 720);
    };
    const ready = () => setTimeout(fly, Math.max(0, 1900 - (performance.now() - start)));
    if (document.readyState === "complete") ready();
    else addEventListener("load", ready, { once: true });
  }
}

for (const ex of examples) {
  const el = document.querySelector<HTMLElement>(`[data-example="${ex.id}"]`);
  if (el) createRoot(el).render(<div className="sla">{ex.render()}</div>);
}

document.querySelectorAll<HTMLElement>(".code-panel").forEach((panel) => {
  const tabs = panel.querySelectorAll<HTMLButtonElement>("[data-tab]");
  tabs.forEach((tab) =>
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.setAttribute("aria-selected", String(t === tab)));
      panel.querySelectorAll<HTMLElement>("[data-pane]").forEach((p) => (p.hidden = p.dataset.pane !== tab.dataset.tab));
    }),
  );
  panel.querySelector<HTMLButtonElement>(".copy")?.addEventListener("click", (e) => {
    const btn = e.currentTarget as HTMLButtonElement;
    const pane = panel.querySelector<HTMLElement>("[data-pane]:not([hidden]) code");
    const text = pane?.textContent ?? "";
    const done = () => {
      btn.textContent = "Copied";
      setTimeout(() => (btn.textContent = "Copy"), 1500);
    };
    navigator.clipboard?.writeText(text).then(done, () => {
      const range = document.createRange();
      if (pane) range.selectNodeContents(pane);
      getSelection()?.removeAllRanges();
      getSelection()?.addRange(range);
    });
  });
});

const search = document.querySelector<HTMLInputElement>("#doc-search");
search?.addEventListener("input", () => {
  const q = search.value.trim().toLowerCase();
  document.querySelectorAll<HTMLElement>(".side-group").forEach((g) => {
    let any = false;
    g.querySelectorAll<HTMLElement>("li").forEach((li) => {
      const hit = !q || li.textContent!.toLowerCase().includes(q);
      li.hidden = !hit;
      any ||= hit;
    });
    g.hidden = !any;
  });
});

const links = new Map<string, HTMLAnchorElement>();
document.querySelectorAll<HTMLAnchorElement>(".sidebar a[href^='#']").forEach((a) => links.set(a.hash.slice(1), a));
const io = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      links.forEach((a) => a.removeAttribute("aria-current"));
      links.get(e.target.id)?.setAttribute("aria-current", "true");
    }
  },
  { rootMargin: "-20% 0px -70% 0px" },
);
document.querySelectorAll("section.doc").forEach((s) => io.observe(s));

const toggle = document.querySelector<HTMLButtonElement>("#nav-toggle");
toggle?.addEventListener("click", () => {
  const open = document.body.classList.toggle("nav-open");
  toggle.setAttribute("aria-expanded", String(open));
});
document.querySelectorAll(".sidebar a").forEach((a) =>
  a.addEventListener("click", () => {
    document.body.classList.remove("nav-open");
    toggle?.setAttribute("aria-expanded", "false");
  }),
);
