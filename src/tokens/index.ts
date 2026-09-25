/**
 * STEAMLabs Africa design tokens: the single source of truth.
 *
 * Two sources feed this file:
 *   - web: the "STEAMLabs Africa Web Design" system, extracted from
 *     STEAMLabs-Africa/STEAMLabs_official_website (client/styles.css).
 *   - brand: the SLA Brand-Manual 2026 PDF (general / print design).
 *
 * `scripts/build-css.ts` turns these objects into tokens.css, brand.css and
 * tailwind.css, so edit values here and never in the generated CSS.
 */

/** The five brand colours. Hex values are the manual's "Web" codes. */
export const brand = {
  clover: { name: "Clover Green", hex: "#3E9E49", oklch: "oklch(0.6223 0.152 145.52)", cmyk: "C77 M13 Y99 K2" },
  fuel: { name: "Fuel Yellow", hex: "#F0A924", oklch: "oklch(0.7835 0.1557 76.59)", cmyk: "C5 M36 Y98 K0" },
  hampton: { name: "Hampton", hex: "#DDD6B3", oklch: "oklch(0.8727 0.0471 97.9)", cmyk: "C13 M11 Y32 K0" },
  pacific: { name: "Pacific Blue", hex: "#00A1B6", oklch: "oklch(0.6501 0.1128 210.97)", cmyk: "C85 M14 Y27 K0" },
  jazzberry: { name: "Jazzberry Jam", hex: "#A01F60", oklch: "oklch(0.4758 0.1719 355.7)", cmyk: "C34 M100 Y38 K10" },
} as const;

export type BrandColor = keyof typeof brand;

/**
 * Colour tones from the Brand Manual (page 16): each primary mixed with
 * white at 80/60/40/20%. Brand layer only: the web system uses brand colours
 * at full strength and never tints them.
 */
export const tones = {
  clover: { 100: "#3E9E49", 80: "#65B16D", 60: "#8BC592", 40: "#B2D8B6", 20: "#D8ECDB" },
  fuel: { 100: "#F0A924", 80: "#F3BA50", 60: "#F6CB7C", 40: "#F9DDA7", 20: "#FCEED3" },
} as const;

const white = "oklch(1 0 0)";
const ink = "oklch(0.2 0 0)"; // dark grey for type; the brand has no black
const { clover, fuel, hampton, pacific, jazzberry } = brand;

/** Semantic colours for the global site (web system `:root`). */
export const color = {
  background: white,
  foreground: ink,
  card: white,
  "card-foreground": ink,
  popover: white,
  "popover-foreground": ink,
  primary: fuel.oklch,
  "primary-foreground": ink,
  secondary: clover.oklch,
  "secondary-foreground": white,
  "secondary-deep": clover.oklch,
  muted: hampton.oklch,
  "muted-foreground": "oklch(0.45 0 0)",
  accent: fuel.oklch,
  "accent-foreground": ink,
  ink: clover.oklch,
  "ink-foreground": white,
  "ink-accent": fuel.oklch,
  surface: hampton.oklch,
  "surface-foreground": ink,
  "surface-accent": clover.oklch,
  clover: clover.oklch,
  fuel: fuel.oklch,
  hampton: hampton.oklch,
  pacific: pacific.oklch,
  jazzberry: jazzberry.oklch,
  destructive: "oklch(0.577 0.245 27.325)",
  "destructive-foreground": "oklch(0.984 0.003 247.858)",
  border: hampton.oklch,
  input: hampton.oklch,
  ring: clover.oklch,
  "chart-1": clover.oklch,
  "chart-2": fuel.oklch,
  "chart-3": pacific.oklch,
  "chart-4": jazzberry.oklch,
  "chart-5": hampton.oklch,
} as const;

export type ColorToken = keyof typeof color;

/** Partner colours: only on that partner's page, for small touches. */
export const partner = {
  "canva-teal": "oklch(0.7381 0.1187 199.9)",
  "canva-purple": "oklch(0.4877 0.2564 302.9)",
  "canva-violet": "oklch(0.5488 0.2665 301.8)",
  "canva-pink": "oklch(0.7203 0.2003 349.3)",
  "rpi-raspberry": "oklch(0.5557 0.2026 10.66)",
  "microbit-purple": "oklch(0.5119 0.1762 291.86)",
} as const;

/** Program microsite themes, applied with `data-theme` on a root element. */
export const themes = {
  academy: { radius: "0.5rem", surface: fuel.oklch, "surface-foreground": ink, "surface-accent": clover.oklch, ring: fuel.oklch },
  elevate: { radius: "0.25rem", surface: clover.oklch, "surface-foreground": white, "surface-accent": fuel.oklch, ring: clover.oklch },
  showcase: { surface: hampton.oklch, "surface-foreground": ink, "surface-accent": clover.oklch, ring: clover.oklch },
  nextgen: { radius: "0.25rem", surface: fuel.oklch, "surface-foreground": ink, "surface-accent": clover.oklch, ring: fuel.oklch },
  educators: { surface: clover.oklch, "surface-foreground": white, "surface-accent": fuel.oklch, ring: clover.oklch },
} as const;

export type ThemeName = "global" | keyof typeof themes;

/** Base radius (`--radius`); the rest of the scale is derived from it. */
export const radiusBase = "0.375rem";
export const radius = {
  sm: "calc(var(--radius) - 4px)",
  md: "calc(var(--radius) - 2px)",
  lg: "var(--radius)",
  xl: "calc(var(--radius) + 4px)",
  "2xl": "calc(var(--radius) + 8px)",
  "3xl": "calc(var(--radius) + 12px)",
  "4xl": "calc(var(--radius) + 16px)",
  full: "9999px",
} as const;

export const space = {
  1: "4px",
  2: "8px",
  3: "12px",
  4: "16px",
  6: "24px",
  7: "28px",
  8: "32px",
  12: "48px",
  16: "64px",
  20: "80px",
  24: "96px",
} as const;

export const containerMax = "1280px";

export const shadow = {
  card: `0.5rem 0.5rem 0 0 ${hampton.oklch}`,
  glow: `0.5rem 0.5rem 0 0 ${hampton.oklch}`,
  lift: "0 34px 50px -28px rgba(0, 0, 0, 0.5)",
  glass: "0 24px 50px -30px rgba(15, 23, 42, 0.45)",
} as const;

export const motion = {
  ease: "cubic-bezier(0.22, 1, 0.36, 1)",
  reveal: "0.9s",
} as const;

export const font = {
  display: '"Poppins", system-ui, sans-serif',
  body: '"Poppins", system-ui, sans-serif',
  /** Brand Manual secondary font. Brand layer only; the website is Poppins-only. */
  secondary: '"Roboto", system-ui, sans-serif',
  /** Used only in the logo wordmark. Never set UI text in it. */
  logo: '"Montserrat", system-ui, sans-serif',
} as const;

export const fontImport =
  "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap";
export const brandFontImport =
  "https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap";

type TextStyle = { size: string; lineHeight: string | number; weight: number; tracking?: string };

/** Web type scale (px). */
export const text = {
  hero: { size: "72px", lineHeight: 1.02, weight: 900, tracking: "-0.025em" },
  h1: { size: "48px", lineHeight: 1.02, weight: 900, tracking: "-0.025em" },
  h2: { size: "48px", lineHeight: 1.05, weight: 700, tracking: "-0.025em" },
  "h2-sm": { size: "30px", lineHeight: "36px", weight: 700, tracking: "-0.025em" },
  h3: { size: "20px", lineHeight: "28px", weight: 700, tracking: "-0.025em" },
  lead: { size: "18px", lineHeight: "28px", weight: 400 },
  body: { size: "16px", lineHeight: "24px", weight: 400 },
  "body-sm": { size: "14px", lineHeight: "20px", weight: 400 },
  label: { size: "14px", lineHeight: "20px", weight: 600 },
  eyebrow: { size: "12px", lineHeight: "16px", weight: 600, tracking: "0.22em" },
  caption: { size: "12px", lineHeight: "16px", weight: 700 },
} as const satisfies Record<string, TextStyle>;

/** Print type hierarchy from the Brand Manual (page 13), in points. All Poppins. */
export const printText = {
  header: { size: "48pt", lineHeight: "48pt", weight: 700 },
  headline: { size: "34pt", lineHeight: "30pt", weight: 700 },
  section: { size: "16pt", lineHeight: "16pt", weight: 700 },
  subline: { size: "10pt", lineHeight: "10pt", weight: 700 },
  copy: { size: "8pt", lineHeight: "11pt", weight: 400 },
  caption: { size: "6pt", lineHeight: "9pt", weight: 400 },
} as const satisfies Record<string, TextStyle>;

/** Logo rules from the Brand Manual (pages 5 to 7). */
export const logo = {
  /** Smallest printed width of the full logo. */
  minWidthMm: 20,
  minHeightMm: 3.33,
  /** Clearspace on every side equals the height of the logo's lower element. */
  clearspace: "height of the lower element",
  variants: ["full-color", "green", "yellow", "white", "black"] as const,
} as const;

export type LogoVariant = (typeof logo.variants)[number];
