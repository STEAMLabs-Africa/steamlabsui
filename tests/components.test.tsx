import { describe, expect, test } from "bun:test";
import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import {
  Badge,
  Band,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Eyebrow,
  Field,
  Heading,
  Input,
  Pill,
  ThemeProvider,
} from "../src";
import { Logo } from "../src/logo";

const html = (el: React.ReactElement) => renderToStaticMarkup(el);

describe("Button", () => {
  test("defaults to a primary type=button", () => {
    expect(html(<Button>Enter ecosystem</Button>)).toBe(
      '<button type="button" class="sla-btn sla-btn--primary">Enter ecosystem</button>',
    );
  });

  test("applies variant and size classes", () => {
    const out = html(<Button variant="secondary" size="cta">Get involved</Button>);
    expect(out).toContain("sla-btn--secondary");
    expect(out).toContain("sla-btn--cta");
  });

  test("asChild styles the child link instead of rendering a button", () => {
    const out = html(
      <Button asChild variant="outline">
        <a href="/about" className="mine">About STEAMLabs</a>
      </Button>,
    );
    expect(out).toBe('<a href="/about" class="sla-btn sla-btn--outline mine">About STEAMLabs</a>');
  });
});

describe("Badge and Pill", () => {
  test("badge variants", () => {
    expect(html(<Badge variant="outline">New</Badge>)).toContain('class="sla-badge sla-badge--outline"');
  });
  test("pill outline", () => {
    expect(html(<Pill variant="outline">AI literacy</Pill>)).toContain("sla-pill sla-pill--outline");
  });
});

describe("Card", () => {
  test("feature card and parts", () => {
    const out = html(
      <Card feature>
        <CardHeader><CardTitle>Code Clubs</CardTitle></CardHeader>
        <CardContent>Body</CardContent>
      </Card>,
    );
    expect(out).toContain('class="sla-card sla-card--feature"');
    expect(out).toContain('<h3 class="sla-card__title">Code Clubs</h3>');
  });
});

describe("Field", () => {
  test("wires label, hint and error to the control", () => {
    const out = html(
      <Field label="Email" id="email" hint="We never share it." error="Enter a valid email.">
        <Input type="email" />
      </Field>,
    );
    expect(out).toContain('<label class="sla-label" for="email">Email</label>');
    expect(out).toContain('id="email"');
    expect(out).toContain('aria-describedby="email-hint email-error"');
    expect(out).toContain('aria-invalid="true"');
  });
});

describe("Typography", () => {
  test("hero heading renders an h1", () => {
    expect(html(<Heading size="hero">Igniting Young Minds</Heading>)).toBe(
      '<h1 class="sla-heading sla-heading--hero">Igniting Young Minds</h1>',
    );
  });
  test("eyebrow on ink", () => {
    expect(html(<Eyebrow on="ink">Impact</Eyebrow>)).toContain("sla-eyebrow--on-ink");
  });
});

describe("Band and ThemeProvider", () => {
  test("band wraps content in a container", () => {
    expect(html(<Band tone="ink">x</Band>)).toBe(
      '<section class="sla-band sla-band--ink"><div class="sla-container">x</div></section>',
    );
  });
  test("theme provider sets data-theme except for global", () => {
    expect(html(<ThemeProvider theme="academy">x</ThemeProvider>)).toBe('<div data-theme="academy" class="sla">x</div>');
    expect(html(<ThemeProvider>x</ThemeProvider>)).toBe('<div class="sla">x</div>');
  });
});

describe("Logo", () => {
  test("renders an accessible inline svg with variant-scoped classes", () => {
    const out = html(<Logo variant="white" width={200} />);
    expect(out).toContain('role="img"');
    expect(out).toContain('aria-label="STEAMLabs Africa"');
    expect(out).toContain("sla-logo-white-1");
    expect(out).not.toContain("cls-1");
    expect(out).toContain("width:200px");
  });
});
