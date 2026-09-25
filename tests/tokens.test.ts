import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { brand, color, themes, tones } from "../src/tokens";

const dist = join(import.meta.dir, "../dist");

describe("tokens", () => {
  test("brand hex codes match the Brand Manual web codes", () => {
    expect(brand.clover.hex).toBe("#3E9E49");
    expect(brand.fuel.hex).toBe("#F0A924");
    expect(brand.hampton.hex).toBe("#DDD6B3");
    expect(brand.pacific.hex).toBe("#00A1B6");
    expect(brand.jazzberry.hex).toBe("#A01F60");
  });

  test("tone 100 equals the brand colour", () => {
    expect(tones.clover[100]).toBe(brand.clover.hex);
    expect(tones.fuel[100]).toBe(brand.fuel.hex);
  });

  test("primary is Fuel Yellow with dark text, never white", () => {
    expect(color.primary).toBe(brand.fuel.oklch);
    expect(color["primary-foreground"]).not.toBe("oklch(1 0 0)");
  });

  test("no black anywhere in the semantic palette", () => {
    for (const v of Object.values(color)) expect(v).not.toMatch(/oklch\(0 0 0\)|#000\b|#000000/i);
  });
});

describe("generated css", () => {
  const tokensCss = readFileSync(join(dist, "tokens.css"), "utf8");
  test("every semantic colour becomes a variable", () => {
    for (const k of Object.keys(color)) expect(tokensCss).toContain(`--${k}:`);
  });
  test("every program theme has a selector", () => {
    for (const t of Object.keys(themes)) expect(tokensCss).toContain(`[data-theme="${t}"]`);
  });
  test("tone steps live only in brand.css", () => {
    expect(tokensCss).not.toContain("--clover-40");
    expect(readFileSync(join(dist, "brand.css"), "utf8")).toContain("--clover-40: #B2D8B6;");
  });
  test("styles.css starts with the font @import so browsers honour it", () => {
    const styles = readFileSync(join(dist, "styles.css"), "utf8");
    const firstRule = styles.replace(/\/\*[\s\S]*?\*\//g, "").trim();
    expect(firstRule.startsWith("@import")).toBe(true);
  });
  test("every component class used by React exists in the stylesheet", () => {
    const css = readFileSync(join(dist, "components.css"), "utf8");
    for (const cls of ["sla-btn--primary", "sla-btn--link", "sla-btn--icon", "sla-card__footer", "sla-heading--hero", "sla-field__error", "sla-band--surface", "sla-container"]) {
      expect(css).toContain(`.${cls}`);
    }
  });
});
