# @steamlabs/ui

STEAMLabs Africa's UI library: design tokens, CSS and React components. It's built from two sources:

- **The web design system** ("STEAMLabs Africa Web Design", extracted from the `STEAMLabs_official_website` repo). The default everywhere.
- **The SLA Brand-Manual 2026** (general and print design). It adds Roboto, colour tone steps, the print type scale and the logo rules, in a separate brand layer.

## Install

```sh
bun add @steamlabs/ui
# or
npm install @steamlabs/ui
```

React 18 or later is a peer dependency, and only the components need it. The CSS and tokens work without React.

## Use

```tsx
import "@steamlabs/ui/styles.css"; // Poppins, tokens and component classes
import { ThemeProvider, Band, Eyebrow, Heading, Button } from "@steamlabs/ui";
import { Logo } from "@steamlabs/ui/logo";

export function Hero() {
  return (
    <ThemeProvider theme="academy">
      <Band tone="surface">
        <Logo />
        <Eyebrow on="surface">STEAMLabs Africa</Eyebrow>
        <Heading size="hero">Building Africa’s <em>Learning</em> Ecosystem</Heading>
        <Button size="cta">Enter ecosystem</Button>
        <Button size="cta" variant="secondary" asChild><a href="/about">About STEAMLabs</a></Button>
      </Band>
    </ThemeProvider>
  );
}
```

### Entry points

| Import | What it is |
|---|---|
| `@steamlabs/ui` | React components and a `tokens` namespace |
| `@steamlabs/ui/tokens` | Token values only (safe in server code and build scripts) |
| `@steamlabs/ui/logo` | `<Logo>` with the five official variants inlined |
| `@steamlabs/ui/styles.css` | Everything the components need: `fonts.css` + `tokens.css` + `components.css` |
| `@steamlabs/ui/tokens.css` | CSS variables and program themes only |
| `@steamlabs/ui/components.css` | The `.sla-*` classes only |
| `@steamlabs/ui/fonts.css` | Poppins from Google Fonts (leave it out if you self-host) |
| `@steamlabs/ui/brand.css` | Brand Manual layer: Roboto, tone steps, print type classes |
| `@steamlabs/ui/tailwind.css` | Tailwind v4 theme so `bg-primary`, `text-ink-accent`, `rounded-xl`, `shadow-card` work |
| `@steamlabs/ui/logos/logo-*.svg` | Cropped logo files for `<img>` |

### Tailwind v4

```css
@import "tailwindcss";
@import "@steamlabs/ui/styles.css";
@import "@steamlabs/ui/tailwind.css";
```

### Without React

Every component is a set of plain classes, so HTML, Vue, Svelte or email templates can use them directly:

```html
<link rel="stylesheet" href="node_modules/@steamlabs/ui/dist/styles.css" />
<div class="sla">
  <a class="sla-btn sla-btn--primary sla-btn--cta" href="/join">Get involved</a>
</div>
```

## Components

`Button` (primary, secondary, outline, ghost, link, destructive; sizes default, sm, lg, icon, cta; `asChild`), `Badge`, `Pill`, `Card` with `CardHeader`, `CardTitle`, `CardDescription`, `CardContent` and `CardFooter` (`feature` adds the flat offset shadow), `Input`, `Textarea`, `Label`, `Field` (wires the label, hint and error for screen readers), `Eyebrow`, `Heading` (wrap a phrase in `<em>` to colour it green), `Lead`, `Band` (background, surface, ink), `Container`, `ThemeProvider` and `Logo`.

## Program themes

Set `theme` on `ThemeProvider` (or `data-theme` on any element) to one of `academy`, `elevate`, `showcase`, `nextgen` or `educators`. The theme swaps `surface`, `surface-foreground`, `surface-accent`, `ring` and the base radius. Everything else is inherited.

## Brand rules the library follows

- The brand has no black. Text is dark grey (`foreground`), and "dark" bands are Clover Green (`ink`).
- Fuel Yellow carries dark text, never white. Don't set it as small text on white (about 2:1).
- White on Clover Green reaches only 3.4:1, so use it for 18px bold or 24px text and up.
- Use brand colours at full strength on the web. The tone steps in `brand.css` (`--clover-80` … `--fuel-20`) are for print and general design only.
- Pacific Blue and Jazzberry Jam are small accents only. Partner colours (`--canva-*`, `--rpi-raspberry`, `--microbit-purple`) belong only on that partner's page.
- Logo: use full colour on white and white on green, ink or photos. Keep clear space equal to the height of the logo's lower element. Never recolour or stretch it, and don't print it narrower than 20mm.

The Brand Manual's RGB values don't match its own hex codes (for example, Clover Green is listed as RGB 60,153,56 but #3E9E49). This library follows the hex codes, as the website does.

## Develop

```sh
bun install
bun run check          # typecheck, build, tests
bun examples/render.tsx # writes examples/preview.html showing every component
```

Edit token values in `src/tokens/index.ts`. The CSS in `dist/` is generated from it by `scripts/build-css.ts`.

## Publish

Bump `version` in `package.json`, then `npm publish` (it runs `bun run check` first). The package is scoped and restricted, so the `@steamlabs` npm organisation must exist and you must be logged in (`npm login`). To install from GitHub before publishing, use `bun add github:STEAMLabs-Africa/<repo>` once a built `dist/` is available, or install a packed tarball (`npm pack`).
