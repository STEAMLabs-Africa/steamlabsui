import * as React from "react";
import { BackLink, Button, Checkbox, Field, Input, Menu, RadioGroup, SegmentedControl, Select, Switch, Textarea, Icon } from "../../../src";
import type { Example } from "../types";

function SegmentedDemo() {
  const [v, setV] = React.useState("Month");
  return (
    <div className="demo-stack demo-stack--tight">
      <SegmentedControl aria-label="Range" options={["Week", "Month", "Year"]} value={v} onValueChange={setV} />
      <p className="sla-muted">Showing: {v}</p>
    </div>
  );
}

function SwitchDemo() {
  const [on, setOn] = React.useState(true);
  return (
    <div className="demo-stack demo-stack--tight">
      <Switch checked={on} onCheckedChange={setOn} label="Email me when someone registers" />
      <Switch defaultChecked={false} label="Weekly summary" />
    </div>
  );
}

function ButtonDemo() {
  const [busy, setBusy] = React.useState(false);
  return (
    <div className="demo-stack">
      <div className="demo-row">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
        <Button variant="destructive">Delete</Button>
      </div>
      <div className="demo-row">
        <Button size="sm">Small</Button>
        <Button size="lg">Large</Button>
        <Button size="icon" aria-label="Add"><Icon name="plus" /></Button>
        <Button
          loading={busy}
          onClick={() => {
            setBusy(true);
            setTimeout(() => setBusy(false), 1500);
          }}
        >
          {busy ? "Saving" : "Save (click me)"}
        </Button>
        <Button disabled>Disabled</Button>
      </div>
      <div className="demo-row"><Button size="cta">Enter ecosystem</Button></div>
    </div>
  );
}

export const examples: Example[] = [
  {
    id: "button",
    name: "Button",
    category: "Actions",
    summary: "Fuel Yellow primary for the main action, Clover Green secondary, and quieter variants for everything else.",
    render: () => <ButtonDemo />,
    code: `<Button>Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button size="cta">Enter ecosystem</Button>
<Button loading={saving}>Save</Button>

// A link that looks like a button
<Button asChild variant="outline"><a href="/about">About</a></Button>`,
    props: [
      { name: "variant", type: '"primary" | "secondary" | "outline" | "ghost" | "link" | "destructive"', default: '"primary"', description: "Use primary once per view." },
      { name: "size", type: '"default" | "sm" | "lg" | "icon" | "cta"', default: '"default"', description: "`cta` is the large hero button with a lift on hover." },
      { name: "loading", type: "boolean", description: "Spinner, disabled, aria-busy. Keeps the label." },
      { name: "asChild", type: "boolean", description: "Style the single child (a link) instead of a <button>." },
    ],
    notes: "Buttons default to type=\"button\" so they never submit a form by accident. Set type=\"submit\" when you mean it.",
  },
  {
    id: "back-link",
    name: "BackLink",
    category: "Actions",
    summary: "A bordered “← Back” link with a real hit area, for the top of app pages.",
    render: () => (
      <div className="demo-row">
        <BackLink href="#back-link">Forms</BackLink>
        <span className="demo-swatch demo-swatch--ink"><BackLink on="ink" href="#back-link">Dashboard</BackLink></span>
      </div>
    ),
    code: `<BackLink href="/forms">Forms</BackLink>
<BackLink on="ink" href="/">Dashboard</BackLink>
<BackLink asChild><Link to="/forms">Forms</Link></BackLink>`,
    props: [
      { name: "on", type: '"background" | "ink"', default: '"background"', description: "`ink` for a green header band." },
      { name: "asChild", type: "boolean", description: "Wrap your router link." },
    ],
  },
  {
    id: "menu",
    name: "Menu",
    category: "Actions",
    summary: "A button that opens a short list of actions. Arrow keys, Escape and outside clicks work.",
    render: () => (
      <div className="demo-row demo-row--tall">
        <Menu
          items={[
            { label: "Edit", icon: <Icon name="arrow-right" /> },
            { label: "Duplicate", icon: <Icon name="plus" /> },
            "separator",
            { label: "Delete", tone: "danger", icon: <Icon name="x" /> },
          ]}
        />
        <Menu trigger={<>Export <Icon name="chevron-down" /></>} align="start" items={[{ label: "CSV" }, { label: "Excel" }, { label: "PDF", disabled: true }]} />
      </div>
    ),
    code: `<Menu
  items={[
    { label: "Edit", onSelect: edit },
    { label: "Duplicate", onSelect: duplicate },
    "separator",
    { label: "Delete", tone: "danger", onSelect: remove },
  ]}
/>

<Menu trigger="Export" items={[{ label: "CSV", href: "/export.csv" }]} />`,
    props: [
      { name: "items", type: '(MenuItem | "separator")[]', description: "Each item has label, onSelect or href, icon, tone, disabled." },
      { name: "trigger", type: "ReactNode", description: "Button content. Defaults to a “…” icon button." },
      { name: "label", type: "string", default: '"More actions"', description: "Accessible name for the icon-only trigger." },
      { name: "align", type: '"start" | "end"', default: '"end"', description: "Which edge the list lines up with." },
    ],
  },
  {
    id: "segmented-control",
    name: "SegmentedControl",
    category: "Actions",
    summary: "Two to five mutually exclusive choices that switch a view.",
    render: () => <SegmentedDemo />,
    code: `const [range, setRange] = useState("Month");

<SegmentedControl
  aria-label="Range"
  options={["Week", "Month", "Year"]}
  value={range}
  onValueChange={setRange}
/>`,
    props: [
      { name: "options", type: "(string | { value, label })[]", description: "The choices." },
      { name: "value / onValueChange", type: "string / (v) => void", description: "Always controlled." },
      { name: "size", type: '"default" | "sm"', default: '"default"', description: "" },
    ],
  },
  {
    id: "field",
    name: "Field, Input, Textarea, Label",
    category: "Forms",
    summary: "Field wires a label, hint and error to its control for screen readers.",
    render: () => (
      <div className="demo-form">
        <Field label="Full name" required><Input placeholder="Amina Wanjiru" /></Field>
        <Field label="Email" hint="We’ll only use it to reply."><Input type="email" placeholder="you@school.org" /></Field>
        <Field label="Message" error="Tell us a little more."><Textarea placeholder="How can we help?" /></Field>
      </div>
    ),
    code: `<Field label="Full name" required>
  <Input placeholder="Amina Wanjiru" />
</Field>
<Field label="Email" hint="We’ll only use it to reply.">
  <Input type="email" />
</Field>
<Field label="Message" error="Tell us a little more.">
  <Textarea />
</Field>`,
    props: [
      { name: "label", type: "ReactNode", description: "Visible label." },
      { name: "hint", type: "ReactNode", description: "Help text, linked with aria-describedby." },
      { name: "error", type: "ReactNode", description: "Sets aria-invalid and a red border." },
      { name: "required", type: "boolean", description: "Marker on the label and `required` on the control." },
      { name: "children", type: "Input | Textarea | Select", description: "One control. Gets the id and aria wiring." },
    ],
  },
  {
    id: "select",
    name: "Select",
    category: "Forms",
    summary: "A native select styled like Input, so it stays accessible and uses the phone's own picker.",
    render: () => (
      <div className="demo-form">
        <Field label="Program">
          <Select defaultValue="">
            <option value="" disabled>Choose a program</option>
            <option>Code Clubs</option>
            <option>AI Academy</option>
            <option>Educators Network</option>
          </Select>
        </Field>
      </div>
    ),
    code: `<Field label="Program">
  <Select defaultValue="">
    <option value="" disabled>Choose a program</option>
    <option>Code Clubs</option>
    <option>AI Academy</option>
  </Select>
</Field>`,
  },
  {
    id: "checkbox",
    name: "Checkbox",
    category: "Forms",
    summary: "A checkbox and its label as one clickable row.",
    render: () => (
      <div className="demo-stack demo-stack--tight">
        <Checkbox label="I agree to the data policy" defaultChecked />
        <Checkbox label="Send me the monthly newsletter" hint="One email a month. Unsubscribe any time." />
        <Checkbox label="Unavailable option" disabled />
      </div>
    ),
    code: `<Checkbox label="I agree to the data policy" required />
<Checkbox label="Send me the newsletter" hint="One email a month." />`,
    props: [
      { name: "label", type: "ReactNode", description: "Clickable label." },
      { name: "hint", type: "ReactNode", description: "Help under the label." },
    ],
  },
  {
    id: "radio-group",
    name: "RadioGroup",
    category: "Forms",
    summary: "Native radio buttons in a fieldset, so arrow keys and form submission just work.",
    render: () => (
      <RadioGroup
        legend="Age group"
        name="age"
        defaultValue="13-17"
        options={[
          { value: "8-12", label: "8 to 12" },
          { value: "13-17", label: "13 to 17" },
          { value: "18+", label: "18 and over", hint: "Joins the mentors track." },
        ]}
      />
    ),
    code: `<RadioGroup
  legend="Age group"
  name="age"
  defaultValue="13-17"
  options={[
    { value: "8-12", label: "8 to 12" },
    { value: "13-17", label: "13 to 17" },
  ]}
/>`,
    props: [
      { name: "legend", type: "ReactNode", description: "The question." },
      { name: "options", type: "{ value, label, hint?, disabled? }[]", description: "" },
      { name: "value / defaultValue / onValueChange", type: "string", description: "Controlled or not." },
      { name: "inline", type: "boolean", description: "Options in a row." },
    ],
  },
  {
    id: "switch",
    name: "Switch",
    category: "Forms",
    summary: "An on/off setting that applies straight away. Use a Checkbox when the choice is submitted with a form.",
    render: () => <SwitchDemo />,
    code: `<Switch checked={on} onCheckedChange={setOn} label="Email me when someone registers" />
<Switch defaultChecked name="weekly" label="Weekly summary" />`,
    props: [
      { name: "checked / defaultChecked", type: "boolean", description: "Controlled or self-managed." },
      { name: "onCheckedChange", type: "(checked: boolean) => void", description: "" },
      { name: "label", type: "ReactNode", description: "Visible label; otherwise pass aria-label." },
      { name: "name", type: "string", description: "Adds a hidden input that submits “on” or “off”." },
    ],
  },
];
