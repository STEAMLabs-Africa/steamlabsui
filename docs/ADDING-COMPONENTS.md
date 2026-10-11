# Adding a component

The short version: check it belongs, run `bun run new`, port and restyle, test, document, open a pull request.

## 1. Check it belongs

Look it up in [INVENTORY.md](./INVENTORY.md) first. A component joins the library when **at least one** of these is true:

- Two or more STEAMLabs apps need it (or already built their own copy).
- It's a generic building block (a control, a layout piece, a feedback pattern) with no app data in it.
- It's on the "Next candidates" list.

It stays in its app when it fetches data, knows about routes or tenants, or only makes sense for one product (a form builder, a course card, an event editor). Build those from library pieces instead.

## 2. Scaffold it

```sh
bun run new Rating --category "Data display" --from "SLAP src/components/rating.tsx"
```

Categories: Foundations, Layout, Typography, Actions, Forms, Data display, Navigation, Feedback, Overlays, Motion.

This creates `src/components/Rating.tsx`, a `.sla-rating` block in `src/styles/components.css`, `tests/Rating.test.tsx` and `docs/site/examples/Rating.tsx`, adds the export to `src/index.ts`, and adds a row to the inventory.

## 3. Port and restyle

Copy the behaviour across, then make it a library component:

- **Strip app ties.** No router `Link`, data fetching, i18n, tenant or auth code. Take content as props and offer `asChild` (see `Button`) or a `link` prop (see `ListItem`) so apps can pass their own router link.
- **Classes, not Tailwind.** Style with `.sla-<name>` classes in `components.css` (BEM: `.sla-rating__star`, `.sla-rating--large`) so apps without Tailwind can use them too.
- **Tokens only.** Use `var(--primary)`, `var(--secondary)`, `var(--border)`, `var(--subtle)`, `var(--space-4)`, `var(--radius-lg)`, `var(--font-display)`. No hex codes, no Tailwind palette colours (slate, indigo), and no brand-colour tints such as `bg-secondary/10`. Hover rows and tracks use `var(--subtle)`.
- **Brand rules.** Fuel Yellow carries dark text. White on Clover Green only for 18px bold or 24px text and up. Pacific Blue and Jazzberry Jam are small accents. No black: text is `var(--foreground)`.
- **Native first.** Prefer `<dialog>`, `<details>`, `<select>`, real checkboxes and radios over custom widgets. Don't add a runtime dependency without agreeing it in the pull request.
- **API shape.** Forward the ref, spread the remaining props onto the root, merge `className` with `cx()`, give it a `displayName`, and keep prop names consistent with existing components (`variant`, `size`, `tone`, `label`, `onValueChange`).

## 4. Accessibility checklist

- It has an accessible name (visible label, `aria-label` or `aria-labelledby`).
- Everything clickable is a `<button>` or `<a>` and works with Tab, Enter and Space; composite widgets support arrow keys.
- The focus ring shows (`:focus-visible` uses `var(--ring)`).
- State is exposed (`aria-expanded`, `aria-selected`, `aria-checked`, `aria-current`, `aria-invalid`).
- Text contrast is at least 4.5:1 (3:1 for 18px bold and up).
- Motion is turned off under `prefers-reduced-motion` (add it to the block at the end of `components.css`).

## 5. Test

Fill in `tests/<Name>.test.tsx`: one test per prop and one for the role or accessible name. Then:

```sh
bun run check
```

This typechecks, builds, and runs every test. Two library-wide tests also fail if a class your component uses is missing from `components.css`, or if the component isn't in the inventory.

## 6. Document

Fill in `docs/site/examples/<Name>.tsx`: a one-sentence summary, a `render()` preview, the matching `code` string and the props table. The HTML tab is generated from the preview. Check it:

```sh
bun run docs        # writes docs-dist/index.html
```

## 7. Version and pull request

Add a line under "Unreleased" in `CHANGELOG.md`. A new component or prop is a **minor** release; a fix is a **patch**; renaming or removing a prop or class is a **major** release.

Open a pull request. CI runs `bun run check`. After merge, the release steps in [PUBLISHING.md](./PUBLISHING.md) publish it.

## 8. Swap the app copy

Once it's published, replace the app's own copy with the library import and delete the old file.
