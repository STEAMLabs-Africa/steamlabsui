/** Renders examples/preview.html, a static page showing every component. `bun examples/render.tsx` after a build. */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import {
  Badge, Band, Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
  Eyebrow, Field, Heading, Input, Lead, Pill, Textarea, ThemeProvider,
} from "../src";
import { Logo } from "../src/logo";
import { tones } from "../src/tokens";

const dist = join(import.meta.dir, "../dist");
const css = readFileSync(join(dist, "styles.css"), "utf8") + readFileSync(join(dist, "brand.css"), "utf8").replace(/@import[^;]+;/, "");

const Page = () => (
  <ThemeProvider>
    <Band tone="surface">
      <Logo width={140} />
      <div style={{ marginTop: 32 }}>
        <Eyebrow on="surface">STEAMLabs Africa</Eyebrow>
        <Heading size="hero" style={{ marginTop: 12 }}>Building Africa’s <em>Learning</em> Ecosystem</Heading>
        <Lead style={{ marginTop: 16, maxWidth: 640 }}>Equipping learners, educators and schools through AI, STEAM, digital learning and innovation ecosystems.</Lead>
        <div style={{ display: "flex", gap: 12, marginTop: 24, flexWrap: "wrap" }}>
          <Button size="cta">Enter ecosystem</Button>
          <Button size="cta" variant="secondary">About STEAMLabs</Button>
        </div>
      </div>
    </Band>
    <Band>
      <Eyebrow>Components</Eyebrow>
      <Heading style={{ marginTop: 12 }}>Buttons, <em>pills</em> and badges</Heading>
      <div style={{ display: "flex", gap: 12, marginTop: 24, flexWrap: "wrap", alignItems: "center" }}>
        <Button>Primary</Button><Button variant="secondary">Secondary</Button><Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button><Button variant="link">Link</Button><Button variant="destructive">Delete</Button>
        <Button size="sm">Small</Button><Button size="lg">Large</Button><Button disabled>Disabled</Button>
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap" }}>
        <Pill>AI literacy</Pill><Pill>STEAM learning</Pill><Pill variant="outline">Educator growth</Pill>
        <Badge>New</Badge><Badge variant="secondary">Live</Badge><Badge variant="outline">Draft</Badge>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24, marginTop: 40 }}>
        <Card>
          <CardHeader><CardTitle>Code Clubs</CardTitle><CardDescription>Weekly making and coding for learners aged 9 to 16.</CardDescription></CardHeader>
          <CardFooter><Button size="sm">Register</Button></CardFooter>
        </Card>
        <Card feature>
          <CardHeader><CardTitle>Feature card</CardTitle><CardDescription>Flat Hampton offset shadow, larger corners.</CardDescription></CardHeader>
          <CardContent><Pill>School innovation</Pill></CardContent>
        </Card>
        <Card>
          <CardContent style={{ paddingTop: 24, display: "grid", gap: 16 }}>
            <Field label="Email" hint="We’ll only use it to reply."><Input type="email" placeholder="you@school.org" /></Field>
            <Field label="Message" error="Tell us a little more."><Textarea placeholder="How can we help?" /></Field>
          </CardContent>
        </Card>
      </div>
    </Band>
    <Band tone="ink" compact>
      <div style={{ display: "flex", gap: 32, alignItems: "center", flexWrap: "wrap" }}>
        <Logo variant="white" width={120} />
        <div>
          <Eyebrow on="ink">Impact</Eyebrow>
          <Heading size="h2" style={{ marginTop: 8 }}>Igniting young minds</Heading>
        </div>
      </div>
    </Band>
    <Band compact>
      <Eyebrow>Brand layer (print and general design only)</Eyebrow>
      <div style={{ display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap" }}>
        {(["clover", "fuel"] as const).flatMap((c) =>
          ([100, 80, 60, 40, 20] as const).map((p) => (
            <div key={c + p} style={{ width: 72, height: 48, background: tones[c][p], borderRadius: 6, fontSize: 11, padding: 6 }}>{p}%</div>
          )),
        )}
      </div>
      <p className="sla-secondary-font" style={{ marginTop: 16 }}>Roboto, the secondary font from the Brand Manual.</p>
    </Band>
  </ThemeProvider>
);

writeFileSync(
  join(import.meta.dir, "preview.html"),
  `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>@steamlabs/ui preview</title><style>body{margin:0}${css}</style></head><body>${renderToStaticMarkup(<Page />)}</body></html>`,
);
console.log("wrote examples/preview.html");
