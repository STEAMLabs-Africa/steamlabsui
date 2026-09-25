import { defineConfig, type Options } from "tsup";

const shared: Options = {
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: false,
  external: ["react", "react-dom", "react/jsx-runtime"],
};

export default defineConfig([
  // Components carry "use client" so they work in React Server Component apps.
  { ...shared, entry: { index: "src/index.ts", logo: "src/logo/index.tsx" }, banner: { js: '"use client";' } },
  // Tokens stay plain values so server code can read them.
  { ...shared, entry: { tokens: "src/tokens/index.ts" } },
]);
