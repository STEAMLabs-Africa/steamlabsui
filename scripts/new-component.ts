/**
 * Scaffolds a new component so every one starts the same way.
 *
 *   bun run new Rating --category "Data display" --from "SLAP src/components/rating.tsx"
 *
 * Creates or updates:
 *   src/components/<Name>.tsx       the component, with forwardRef and a sla-<name> class
 *   src/styles/components.css       a CSS block for .sla-<name>
 *   tests/<Name>.test.tsx           a render test to fill in
 *   docs/site/examples/<Name>.tsx   the docs page entry (preview, code, props)
 *   src/index.ts                    the export
 *   docs/INVENTORY.md               a row in the "In the library" table
 *
 * Then follow docs/ADDING-COMPONENTS.md from step 3.
 */
import { appendFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const categories = ["Foundations", "Layout", "Typography", "Actions", "Forms", "Data display", "Navigation", "Feedback", "Overlays", "Motion"];

const args = process.argv.slice(2);
const name = args[0];
const flag = (f: string) => {
  const i = args.indexOf(f);
  return i > -1 ? args[i + 1] : undefined;
};
const category = flag("--category") ?? "Data display";
const from = flag("--from") ?? "new";

if (!name || !/^[A-Z][A-Za-z0-9]+$/.test(name)) {
  console.error('Usage: bun run new <PascalCaseName> [--category "Data display"] [--from "<repo> <path>"]');
  process.exit(1);
}
if (!categories.includes(category)) {
  console.error(`--category must be one of: ${categories.join(", ")}`);
  process.exit(1);
}

const root = join(import.meta.dir, "..");
const kebab = name.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const cls = `sla-${kebab}`;
const file = join(root, "src/components", `${name}.tsx`);
if (existsSync(file)) {
  console.error(`${file} already exists.`);
  process.exit(1);
}

writeFileSync(
  file,
  `import * as React from "react";
import { cx } from "./utils";

export interface ${name}Props extends React.HTMLAttributes<HTMLDivElement> {
  /** Describe each prop in one line: what it does, and the default. */
  variant?: "default";
}

/** One sentence: what it is and when to use it. */
export const ${name} = React.forwardRef<HTMLDivElement, ${name}Props>(({ variant = "default", className, ...props }, ref) => (
  <div ref={ref} className={cx("${cls}", variant !== "default" && \`${cls}--\${variant}\`, className)} {...props} />
));
${name}.displayName = "${name}";
`,
);

const css = join(root, "src/styles/components.css");
const cssText = readFileSync(css, "utf8");
const marker = "@media (prefers-reduced-motion: reduce)";
const block = `/* ${name} */
.${cls} {
  /* Tokens only: var(--primary), var(--border), var(--space-4), var(--radius-lg)... No hex, no tints. */
}

`;
writeFileSync(css, cssText.includes(marker) ? cssText.replace(marker, block + marker) : cssText + "\n" + block);

writeFileSync(
  join(root, "tests", `${name}.test.tsx`),
  `import { describe, expect, test } from "bun:test";
import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { ${name} } from "../src";

describe("${name}", () => {
  test("renders its base class", () => {
    expect(renderToStaticMarkup(<${name} />)).toContain("${cls}");
  });
  // Add a test for each prop and for the accessible name or role.
});
`,
);

const exDir = join(root, "docs/site/examples");
mkdirSync(exDir, { recursive: true });
writeFileSync(
  join(exDir, `${name}.tsx`),
  `import * as React from "react";
import { ${name} } from "../../../src";
import type { Example } from "../types";

export const example: Example = {
  id: "${kebab}",
  name: "${name}",
  category: "${category}",
  summary: "One sentence: what it is and when to use it.",
  render: () => <${name}>Example</${name}>,
  code: \`<${name}>Example</${name}>\`,
  props: [
    { name: "variant", type: '"default"', default: '"default"', description: "Describe it." },
  ],
};
`,
);

appendFileSync(join(root, "src/index.ts"), `\nexport { ${name} } from "./components/${name}";\nexport type { ${name}Props } from "./components/${name}";\n`);

const inv = join(root, "docs/INVENTORY.md");
const invText = readFileSync(inv, "utf8");
const row = `| \`${name}\` | ${category} | ${from} |\n`;
writeFileSync(inv, invText.replace(/(## In the library[\s\S]*?\n)(\n## )/, `$1${row}$2`));

console.log(`Created ${name}. Next: port the code, write the CSS, fill in the test and the docs example (docs/ADDING-COMPONENTS.md step 3).`);
