import { describe, expect, test } from "bun:test";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import * as lib from "../src";
import {
  Accordion, AccordionItem, Alert, Avatar, AvatarGroup, BackLink, Badge, Breadcrumb, Button, Checkbox, CodedCard,
  CountUp, Dialog, EmptyState, Field, ListItem, List, Menu, PageHeader, Pagination, Progress, ProgressRing,
  RadioGroup, SectionHeader, SegmentedControl, Select, Skeleton, Stat, Steps, Switch, Table, TableBody, TableCell,
  TableHead, TableHeader, TableRow, Tabs, TabsContent, TabsList, TabsTrigger, TextLink, Tile, ToastProvider, Tooltip,
  avatarTone, initials, pageRange,
} from "../src";

const html = (el: React.ReactElement) => renderToStaticMarkup(el);
const root = join(import.meta.dir, "..");

describe("stylesheet coverage", () => {
  test("every sla-* class the components use exists in components.css", () => {
    const css = readFileSync(join(root, "src/styles/components.css"), "utf8");
    const dir = join(root, "src/components");
    const used = new Set<string>();
    for (const f of readdirSync(dir)) {
      const src = readFileSync(join(dir, f), "utf8");
      for (const m of src.matchAll(/sla-[a-z0-9_-]*[a-z0-9]/g)) used.add(m[0]);
    }
    const missing = [...used].filter((c) => !css.includes(`.${c}`));
    expect(missing).toEqual([]);
  });

  test("every export is documented in the inventory", () => {
    const inventory = readFileSync(join(root, "docs/INVENTORY.md"), "utf8");
    const components = Object.keys(lib).filter((k) => /^[A-Z]/.test(k) && !k.startsWith("Table") && !k.startsWith("Tabs") && !k.startsWith("Card"));
    const missing = components.filter((c) => !inventory.includes(`\`${c}`) && !inventory.includes(` ${c}\``) && !inventory.includes(`${c}\``));
    expect(missing).toEqual([]);
  });
});

describe("Button", () => {
  test("loading disables, marks busy and adds a spinner", () => {
    const out = html(<Button loading>Save</Button>);
    expect(out).toContain('disabled=""');
    expect(out).toContain('aria-busy="true"');
    expect(out).toContain("sla-spinner");
    expect(out).toContain("Save");
  });
});

describe("Forms", () => {
  test("Field marks required and sets it on the control", () => {
    const out = html(<Field label="Name" id="n" required><Select><option>A</option></Select></Field>);
    expect(out).toContain("sla-label__required");
    expect(out).toContain('required=""');
    expect(out).toContain('id="n"');
  });
  test("Checkbox ties label and hint to the input", () => {
    const out = html(<Checkbox id="c" label="Email me" hint="Monthly" />);
    expect(out).toContain('for="c"');
    expect(out).toContain('aria-describedby="c-hint"');
  });
  test("RadioGroup renders a fieldset with native radios", () => {
    const out = html(<RadioGroup legend="Age group" name="age" defaultValue="b" options={[{ value: "a", label: "8-12" }, { value: "b", label: "13-17" }]} />);
    expect(out).toContain("<legend");
    expect(out.match(/type="radio"/g)?.length).toBe(2);
    expect(out).toContain('checked=""');
  });
  test("Switch is a role=switch button with a form value", () => {
    const out = html(<Switch defaultChecked name="alerts" label="Alerts" />);
    expect(out).toContain('role="switch"');
    expect(out).toContain('aria-checked="true"');
    expect(out).toContain('name="alerts" value="on"');
  });
  test("SegmentedControl marks the active option", () => {
    const out = html(<SegmentedControl aria-label="Range" options={["Week", "Month"]} value="Month" onValueChange={() => {}} />);
    expect(out).toContain('role="radiogroup"');
    expect(out).toMatch(/aria-checked="true"[^>]*>Month/);
  });
});

describe("Data display", () => {
  test("Badge dot and neutral", () => {
    expect(html(<Badge variant="neutral" dot>Draft</Badge>)).toContain("sla-badge__dot");
  });
  test("Avatar falls back to initials with a stable tone", () => {
    expect(initials("Amina Wanjiru Otieno")).toBe("AW");
    expect(avatarTone("Amina")).toBe(avatarTone("Amina"));
    const out = html(<Avatar name="Amina Wanjiru" />);
    expect(out).toContain(">AW<");
    expect(out).toContain('aria-label="Amina Wanjiru"');
  });
  test("AvatarGroup shows +N for the rest", () => {
    const out = html(<AvatarGroup max={2} people={[{ name: "A B" }, { name: "C D" }, { name: "E F" }]} />);
    expect(out).toContain("+1");
  });
  test("Stat band and tile", () => {
    expect(html(<Stat variant="band" value="12,000+" label="Learners" />)).toContain("sla-stat--band");
    expect(html(<Stat value="42" label="Forms" delta="+3 this week" />)).toContain("sla-stat__delta");
  });
  test("Table wraps for horizontal scroll", () => {
    const out = html(
      <Table><TableHeader><TableRow><TableHead>Name</TableHead></TableRow></TableHeader><TableBody><TableRow><TableCell>A</TableCell></TableRow></TableBody></Table>,
    );
    expect(out.startsWith('<div class="sla-table-wrap"><table class="sla-table">')).toBe(true);
  });
  test("ListItem with href is a link row", () => {
    expect(html(<List><ListItem title="Report" href="/r" /></List>)).toContain('<a href="/r" class="sla-list__row sla-list__row--link">');
  });
  test("Tile renders as a link", () => {
    expect(html(<Tile href="/forms" title="Forms" />)).toContain('<a class="sla-tile" href="/forms">');
  });
  test("Progress and ProgressRing clamp and expose values", () => {
    expect(html(<Progress value={140} label="Course" />)).toContain('aria-valuenow="100"');
    expect(html(<ProgressRing value={-5} label="Goal" />)).toContain('aria-valuenow="0"');
  });
  test("Steps marks the current step", () => {
    const out = html(<Steps steps={[{ label: "Apply", state: "done" }, { label: "Review", state: "current" }]} />);
    expect(out).toContain('aria-current="step"');
    expect(out).toContain("sla-steps__item--done");
  });
  test("Accordion uses details and summary", () => {
    const out = html(<Accordion><AccordionItem title="Who can join?">Anyone 8 to 18.</AccordionItem></Accordion>);
    expect(out).toContain("<details");
    expect(out).toContain("<summary");
  });
  test("CodedCard", () => {
    expect(html(<CodedCard code="01" title="AI literacy">x</CodedCard>)).toContain("sla-coded-card__code");
  });
});

describe("Navigation", () => {
  test("Tabs link triggers to panels and hide inactive panels", () => {
    const out = html(
      <Tabs defaultValue="a">
        <TabsList><TabsTrigger value="a">A</TabsTrigger><TabsTrigger value="b">B</TabsTrigger></TabsList>
        <TabsContent value="a">one</TabsContent><TabsContent value="b">two</TabsContent>
      </Tabs>,
    );
    expect(out).toContain('aria-selected="true"');
    expect(out).toMatch(/hidden=""[^>]*>two/);
  });
  test("Breadcrumb marks the current page", () => {
    const out = html(<Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Programs" }]} />);
    expect(out).toContain('aria-current="page"');
  });
  test("pageRange adds gaps", () => {
    expect(pageRange(5, 10)).toEqual([1, "…", 4, 5, 6, "…", 10]);
    expect(pageRange(1, 3)).toEqual([1, 2, 3]);
  });
  test("Pagination with hrefFor renders links", () => {
    const out = html(<Pagination page={2} pageCount={3} hrefFor={(p) => `?p=${p}`} />);
    expect(out).toContain('href="?p=3"');
    expect(out).toContain('aria-current="page"');
  });
  test("BackLink and TextLink", () => {
    expect(html(<BackLink href="/">Forms</BackLink>)).toContain("sla-back-link");
    expect(html(<TextLink href="https://x.org" arrow="external">Partner</TextLink>)).toContain('target="_blank"');
  });
  test("Menu renders a closed trigger with an accessible name", () => {
    const out = html(<Menu items={[{ label: "Edit" }]} />);
    expect(out).toContain('aria-haspopup="menu"');
    expect(out).toContain('aria-label="More actions"');
    expect(out).not.toContain('role="menu"');
  });
});

describe("Feedback and overlays", () => {
  test("Alert danger is role=alert", () => {
    expect(html(<Alert tone="danger" title="Couldn't save" />)).toContain('role="alert"');
    expect(html(<Alert tone="success" title="Saved" />)).toContain('role="status"');
  });
  test("EmptyState and Skeleton", () => {
    expect(html(<EmptyState title="No forms yet" />)).toContain("sla-empty__title");
    expect(html(<Skeleton shape="circle" width={32} height={32} />)).toContain('aria-hidden="true"');
  });
  test("Dialog is labelled by its title", () => {
    const out = html(<Dialog open={false} onClose={() => {}} title="Delete form?" />);
    expect(out).toMatch(/<dialog aria-labelledby="([^"]+)"[\s\S]*<h2 id="\1"/);
  });
  test("Tooltip describes its trigger", () => {
    const out = html(<Tooltip content="Copy link"><button>Copy</button></Tooltip>);
    expect(out).toMatch(/aria-describedby="([^"]+)"[\s\S]*role="tooltip" id="\1"/);
  });
  test("ToastProvider renders a live region", () => {
    expect(html(<ToastProvider><p>x</p></ToastProvider>)).toContain('aria-live="polite"');
  });
  test("CountUp server-renders the final number", () => {
    expect(html(<CountUp to={12000} suffix="+" />)).toContain("12,000+");
  });
});

describe("Layout", () => {
  test("SectionHeader splits when there is a description", () => {
    expect(html(<SectionHeader title="Programs" description="x" />)).toContain("sla-section-header--split");
  });
  test("PageHeader band tone", () => {
    expect(html(<PageHeader title="Forms" tone="band" />)).toContain("sla-page-header--band");
  });
});
