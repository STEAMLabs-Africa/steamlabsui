# steamlabsui

STEAMLabs Africa's UI library: design tokens, CSS and React components. It's built from two sources:

- **The web design system** ("STEAMLabs Africa Web Design", extracted from the `STEAMLabs_official_website` repo). The default everywhere.
- **The SLA Brand-Manual 2026** (general and print design). It adds Roboto, colour tone steps, the print type scale and the logo rules, in a separate brand layer.

## Install

```sh
bun add steamlabsui
# or
npm install steamlabsui
```

React 18 or later is a peer dependency, and only the components need it. The CSS and tokens work without React.

## Use

```tsx
import "steamlabsui/styles.css"; // Poppins, tokens and component classes
import { ThemeProvider, Band, Eyebrow, Heading, Button } from "steamlabsui";
import { Logo } from "steamlabsui/logo";

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
| `steamlabsui` | React components and a `tokens` namespace |
| `steamlabsui/tokens` | Token values only (safe in server code and build scripts) |
| `steamlabsui/logo` | `<Logo>` with the five official variants inlined |
| `steamlabsui/styles.css` | Everything the components need: `fonts.css` + `tokens.css` + `components.css` |
| `steamlabsui/tokens.css` | CSS variables and program themes only |
| `steamlabsui/components.css` | The `.sla-*` classes only |
| `steamlabsui/fonts.css` | Poppins from Google Fonts (leave it out if you self-host) |
| `steamlabsui/brand.css` | Brand Manual layer: Roboto, tone steps, print type classes |
| `steamlabsui/tailwind.css` | Tailwind v4 theme so `bg-primary`, `text-ink-accent`, `rounded-xl`, `shadow-card` work |
| `steamlabsui/logos/logo-*.svg` | Cropped logo files for `<img>` |

### Tailwind v4

```css
@import "tailwindcss";
@import "steamlabsui/styles.css";
@import "steamlabsui/tailwind.css";
```

### Without React

Every component is a set of plain classes, so HTML, Vue, Svelte or email templates can use them directly:

```html
<link rel="stylesheet" href="node_modules/steamlabsui/dist/styles.css" />
<div class="sla">
  <a class="sla-btn sla-btn--primary sla-btn--cta" href="/join">Get involved</a>
</div>
```

## Components

70 React exports in 45 families, merged from every STEAMLabs repo and restyled to the brand tokens. The [docs site](#docs) shows each one live with its props and code.

| Category | Components |
|---|---|
| Foundations | `ThemeProvider`, `Logo`, `Icon`, `tokens` |
| Layout | `Band`, `Container`, `Section`, `SectionHeader`, `PageHeader`, `Separator` |
| Typography | `Eyebrow`, `Heading`, `Lead`, `TextLink` |
| Actions | `Button` (with `loading` and `asChild`), `BackLink`, `Menu`, `SegmentedControl` |
| Forms | `Field`, `Input`, `Textarea`, `Label`, `Select`, `Checkbox`, `RadioGroup`, `Switch` |
| Data display | `Badge`, `Pill`, `Avatar`, `AvatarGroup`, `Card` and parts, `CodedCard`, `Stat`, `Table` and parts, `List`, `ListItem`, `Tile`, `TileGrid`, `Progress`, `ProgressRing`, `Steps`, `Accordion`, `AccordionItem` |
| Navigation | `Tabs` and parts, `Breadcrumb`, `Pagination`, `SkipLink` |
| Feedback | `Alert`, `EmptyState`, `Spinner`, `Skeleton`, `ToastProvider`, `useToast` |
| Overlays | `Dialog` (modal, side sheet, drawer), `Tooltip` |
| Motion | `Reveal`, `CountUp` |

Interactive pieces use native HTML (`<dialog>`, `<details>`, real form controls), so there are no runtime dependencies beyond React.

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

## Docs

```sh
bun run docs   # writes docs-dist/index.html: ReadMe-style docs with live previews
```

- [docs/INVENTORY.md](docs/INVENTORY.md): every component found across the repos and where it went
- [docs/ADDING-COMPONENTS.md](docs/ADDING-COMPONENTS.md): how to add a component (`bun run new <Name>`)
- [docs/PUBLISHING.md](docs/PUBLISHING.md): publishing to npm and bun
- [CHANGELOG.md](CHANGELOG.md)

## Develop

```sh
bun install
bun run check           # typecheck, build, tests
bun run docs            # build the docs site
bun run new Rating      # scaffold a new component
```

Edit token values in `src/tokens/index.ts`. The CSS in `dist/` is generated from it by `scripts/build-css.ts`.

## Publish

Bump `version` in `package.json`, then `npm publish` (it runs `bun run check` first). The package is scoped and restricted, so the `@steamlabs` npm organisation must exist and you must be logged in (`npm login`). Until it's published, build a tarball with `npm pack` and install that file (`bun add ./steamlabs-ui-0.1.0.tgz`).
