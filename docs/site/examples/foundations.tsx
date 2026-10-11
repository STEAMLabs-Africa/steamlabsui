import * as React from "react";
import {
  Band, Eyebrow, Heading, Icon, iconNames, Lead, SectionHeader, PageHeader, Separator, TextLink,
  BackLink, Badge, Button,
} from "../../../src";
import { Logo } from "../../../src/logo";
import type { Example } from "../types";

export const examples: Example[] = [
  {
    id: "logo",
    name: "Logo",
    category: "Foundations",
    summary: "The STEAMLabs Africa logo, inlined as SVG in its five official variants.",
    render: () => (
      <div className="demo-row">
        <Logo width={140} />
        <span className="demo-swatch demo-swatch--ink"><Logo variant="white" width={120} /></span>
      </div>
    ),
    code: `import { Logo } from "steamlabsui/logo";

<Logo width={140} />
<Logo variant="white" width={120} /> {/* on green, ink or photos */}`,
    props: [
      { name: "variant", type: '"full-color" | "green" | "yellow" | "white" | "black"', default: '"full-color"', description: "Full colour on white; white on green, ink or photos." },
      { name: "width", type: "number", description: "Pixel width. Never print narrower than 20mm." },
    ],
    notes: "Keep clear space equal to the height of the logo's lower element. Never recolour or stretch it.",
  },
  {
    id: "icon",
    name: "Icon",
    category: "Foundations",
    summary: "The small line-icon set the components use. Bring your own library for anything else.",
    render: () => (
      <div className="demo-row demo-row--icons">
        {iconNames.map((n) => (
          <span key={n} className="demo-icon"><Icon name={n} size={20} /><code>{n}</code></span>
        ))}
      </div>
    ),
    code: `<Icon name="check" />
<Icon name="info" size={20} label="More information" />`,
    props: [
      { name: "name", type: "IconName", description: "One of the names shown." },
      { name: "size", type: "number", default: "16", description: "Pixel size." },
      { name: "label", type: "string", description: "Accessible name. Without it the icon is decorative and hidden." },
    ],
  },
  {
    id: "band",
    name: "Band, Container, Section",
    category: "Layout",
    summary: "Full-width page sections. Band adds a background tone; Section is the plain rhythm; Container caps the width at 1280px.",
    render: () => (
      <div className="demo-stack">
        <Band tone="surface" compact><Eyebrow on="surface">Surface band</Eyebrow><Heading size="h3">Re-themes per program</Heading></Band>
        <Band tone="ink" compact><Eyebrow on="ink">Ink band</Eyebrow><Heading size="h3">The deep Clover Green band</Heading></Band>
      </div>
    ),
    code: `<Band tone="surface">…</Band>
<Band tone="ink" compact>…</Band>
<Section><Container>…</Container></Section>`,
    props: [
      { name: "tone", type: '"background" | "surface" | "ink"', default: '"background"', description: "Background. `surface` changes with the program theme." },
      { name: "compact", type: "boolean", description: "Less vertical padding." },
      { name: "contained", type: "boolean", default: "true", description: "Wrap children in the container." },
    ],
  },
  {
    id: "section-header",
    name: "SectionHeader",
    category: "Layout",
    summary: "Eyebrow, heading and supporting text: the house layout for section openers.",
    render: () => (
      <SectionHeader
        eyebrow="What we do"
        title={<>Programs for every <em>learner</em></>}
        description="From after-school code clubs to teacher training, each program builds on the last."
      />
    ),
    code: `<SectionHeader
  eyebrow="What we do"
  title={<>Programs for every <em>learner</em></>}
  description="From after-school code clubs to teacher training…"
/>`,
    props: [
      { name: "eyebrow", type: "ReactNode", description: "Uppercase kicker." },
      { name: "title", type: "ReactNode", description: "Wrap one phrase in <em> to colour it green." },
      { name: "description", type: "ReactNode", description: "Sits to the right of the title on wide screens." },
      { name: "on", type: '"background" | "ink" | "surface"', default: '"background"', description: "The ground, so the eyebrow stays readable." },
      { name: "as", type: '"h1" | "h2" | "h3"', default: '"h2"', description: "Heading level." },
    ],
  },
  {
    id: "page-header",
    name: "PageHeader",
    category: "Layout",
    summary: "The top of an app page: the way back, where you are, and what you can do.",
    render: () => (
      <div className="demo-stack">
        <PageHeader
          back={<BackLink href="#page-header">Forms</BackLink>}
          title="Code Club registration"
          meta={<><Badge variant="secondary">Live</Badge><span>132 responses</span></>}
          actions={<><Button variant="outline">Preview</Button><Button>Share</Button></>}
        />
        <PageHeader tone="band" eyebrow="Workspace" title="Approvals" description="Requests waiting on you." back={<BackLink on="ink" href="#page-header">Home</BackLink>} actions={<Button>New request</Button>} />
      </div>
    ),
    code: `<PageHeader
  back={<BackLink href="/forms">Forms</BackLink>}
  title="Code Club registration"
  meta={<Badge variant="secondary">Live</Badge>}
  actions={<Button>Share</Button>}
/>

<PageHeader tone="band" title="Approvals" … />`,
    props: [
      { name: "title", type: "ReactNode", description: "Rendered as the page's h1." },
      { name: "back", type: "ReactNode", description: "A BackLink or Breadcrumb above the title." },
      { name: "actions", type: "ReactNode", description: "Buttons on the right." },
      { name: "meta", type: "ReactNode", description: "Badges and small facts under the title." },
      { name: "description", type: "ReactNode", description: "One line of context." },
      { name: "tone", type: '"plain" | "band"', default: '"plain"', description: "`band` puts it on a Clover Green panel." },
    ],
  },
  {
    id: "separator",
    name: "Separator",
    category: "Layout",
    summary: "A Hampton rule between groups of content.",
    render: () => (
      <div>
        <p className="sla-muted">Above</p>
        <Separator />
        <div className="demo-row" style={{ height: 24 }}><span>Left</span><Separator orientation="vertical" /><span>Right</span></div>
      </div>
    ),
    code: `<Separator />
<Separator orientation="vertical" />`,
  },
  {
    id: "typography",
    name: "Eyebrow, Heading, Lead",
    category: "Typography",
    summary: "Poppins headings with tight tracking. Wrap one phrase in <em> to colour it Clover Green.",
    render: () => (
      <div className="demo-stack demo-stack--tight">
        <Eyebrow>STEAMLabs Africa</Eyebrow>
        <Heading size="h1">Building Africa’s <em>Learning</em> Ecosystem</Heading>
        <Lead>Equipping learners, educators and schools through AI, STEAM and digital learning.</Lead>
      </div>
    ),
    code: `<Eyebrow>STEAMLabs Africa</Eyebrow>
<Heading size="h1">Building Africa’s <em>Learning</em> Ecosystem</Heading>
<Lead>Equipping learners, educators and schools…</Lead>`,
    props: [
      { name: "Heading size", type: '"hero" | "h1" | "h2" | "h3"', default: '"h2"', description: "Visual size; the element matches unless you set `as`." },
      { name: "Eyebrow on", type: '"background" | "ink" | "surface"', default: '"background"', description: "Picks the readable accent." },
    ],
  },
  {
    id: "text-link",
    name: "TextLink",
    category: "Typography",
    summary: "The quiet inline “read more” link in Clover Green.",
    render: () => (
      <div className="demo-row">
        <TextLink href="#text-link">Read the story</TextLink>
        <TextLink href="https://www.raspberrypi.org" arrow="external">Raspberry Pi Foundation</TextLink>
      </div>
    ),
    code: `<TextLink href="/stories/code-clubs">Read the story</TextLink>
<TextLink href="https://www.raspberrypi.org" arrow="external">Raspberry Pi Foundation</TextLink>

// With a router link
<TextLink asChild><Link to="/about">About us</Link></TextLink>`,
    props: [
      { name: "arrow", type: '"forward" | "external" | false', default: '"forward"', description: "`external` also opens a new tab." },
      { name: "asChild", type: "boolean", description: "Style your router link instead of rendering an <a>." },
    ],
  },
];
