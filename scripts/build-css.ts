/**
 * Generates the package's CSS from src/tokens. Run with `bun scripts/build-css.ts`.
 *
 * Outputs (in dist/):
 *   fonts.css      Poppins from Google Fonts (skip it if you self-host)
 *   tokens.css     CSS variables: semantic colours, program themes, scales
 *   components.css the .sla-* component classes
 *   styles.css     fonts + tokens + components in one file (the usual import)
 *   brand.css      Brand Manual layer: Roboto, tone steps, print type scale
 *   tailwind.css   Tailwind v4 theme mapping the variables to utilities
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import {
  brandFontImport,
  color,
  containerMax,
  font,
  fontImport,
  motion,
  partner,
  printText,
  radius,
  radiusBase,
  shadow,
  space,
  text,
  themes,
  tones,
} from "../src/tokens";

const root = join(import.meta.dir, "..");
const out = join(root, "dist");
mkdirSync(out, { recursive: true });

const header = "/* @steamlabs/ui — generated from src/tokens by scripts/build-css.ts. Do not edit. */\n";
const decls = (entries: [string, string | number][], indent = "  ") =>
  entries.map(([k, v]) => `${indent}--${k}: ${v};`).join("\n");

const textVars = (prefix: string, scale: Record<string, { size: string; lineHeight: string | number; weight: number; tracking?: string }>) =>
  Object.entries(scale).flatMap(([name, s]) => {
    const rows: [string, string | number][] = [
      [`${prefix}-${name}-size`, s.size],
      [`${prefix}-${name}-line-height`, s.lineHeight],
      [`${prefix}-${name}-weight`, s.weight],
    ];
    if (s.tracking) rows.push([`${prefix}-${name}-tracking`, s.tracking]);
    return rows;
  });

const tokensCss =
  header +
  `:root {
${decls([["radius", radiusBase]])}
${decls(Object.entries(color))}
${decls(Object.entries(partner))}
${decls(Object.entries(radius).map(([k, v]) => [`radius-${k}`, v]))}
${decls(Object.entries(space).map(([k, v]) => [`space-${k}`, v]))}
${decls([["container-max", containerMax]])}
${decls(Object.entries(shadow).map(([k, v]) => [`shadow-${k}`, v]))}
${decls([["ease", motion.ease], ["reveal-duration", motion.reveal]])}
${decls([["font-display", font.display], ["font-body", font.body]])}
${decls(textVars("text", text))}
}
` +
  Object.entries(themes)
    .map(([name, vars]) => `\n[data-theme="${name}"] {\n${decls(Object.entries(vars))}\n}\n`)
    .join("");

const fontsCss = `${header}@import url("${fontImport}");\n`;

const components = readFileSync(join(root, "src/styles/components.css"), "utf8");

const brandCss =
  header +
  `@import url("${brandFontImport}");

/* Brand Manual layer. The web system never tints brand colours, so use the
   tone steps only in print and general design (slides, posters, documents). */
:root {
${decls(Object.entries(tones).flatMap(([c, steps]) => Object.entries(steps).map(([p, v]) => [`${c}-${p}`, v] as [string, string])))}
${decls([["font-secondary", font.secondary], ["font-logo", font.logo]])}
${decls(textVars("print", printText))}
  --gradient-clover: linear-gradient(90deg, ${tones.clover[100]}, #ffffff);
  --gradient-fuel: linear-gradient(90deg, ${tones.fuel[100]}, #ffffff);
}

` +
  Object.keys(printText)
    .map(
      (n) =>
        `.sla-print-${n} { font-family: var(--font-display); font-size: var(--print-${n}-size); line-height: var(--print-${n}-line-height); font-weight: var(--print-${n}-weight); }`,
    )
    .join("\n") +
  `\n.sla-secondary-font { font-family: var(--font-secondary); }\n`;

const twColors = [...Object.keys(color), ...Object.keys(partner)];
const tailwindCss =
  header +
  `/* Import after tokens.css (or styles.css) and "tailwindcss". */
@theme inline {
${twColors.map((k) => `  --color-${k}: var(--${k});`).join("\n")}
${Object.keys(radius).map((k) => `  --radius-${k}: var(--radius-${k});`).join("\n")}
  --font-display: var(--font-display);
  --font-sans: var(--font-body);
  --shadow-card: var(--shadow-card);
  --shadow-glow: var(--shadow-glow);
  --shadow-lift: var(--shadow-lift);
  --shadow-glass: var(--shadow-glass);
  --ease-brand: var(--ease);
}
`;

writeFileSync(join(out, "tokens.css"), tokensCss);
writeFileSync(join(out, "fonts.css"), fontsCss);
writeFileSync(join(out, "components.css"), header + components);
writeFileSync(join(out, "styles.css"), `${fontsCss}\n${tokensCss}\n${components}`);
writeFileSync(join(out, "brand.css"), brandCss);
writeFileSync(join(out, "tailwind.css"), tailwindCss);
console.log("css: wrote tokens, fonts, components, styles, brand, tailwind");
