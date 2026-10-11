import * as React from "react";
import {
  Accordion, AccordionItem, Avatar, AvatarGroup, Badge, Button, Card, CardContent, CardDescription, CardFooter, CardHeader,
  CardTitle, CodedCard, Icon, List, ListItem, Pill, Progress, ProgressRing, Stat, Steps, Table, TableBody, TableCell,
  TableHead, TableHeader, TableRow, Tile, TileGrid,
} from "../../../src";
import type { Example } from "../types";

export const examples: Example[] = [
  {
    id: "badge",
    name: "Badge and Pill",
    category: "Data display",
    summary: "Badges are square-cornered status labels. Pills are rounded focus-area tags of one or two words.",
    render: () => (
      <div className="demo-stack demo-stack--tight">
        <div className="demo-row">
          <Badge variant="secondary" dot>Approved</Badge>
          <Badge dot>Pending</Badge>
          <Badge variant="destructive" dot>Rejected</Badge>
          <Badge variant="neutral">Draft</Badge>
          <Badge variant="outline">v1.0</Badge>
        </div>
        <div className="demo-row">
          <Pill>AI literacy</Pill>
          <Pill>STEAM learning</Pill>
          <Pill variant="outline">Educator growth</Pill>
        </div>
      </div>
    ),
    code: `<Badge variant="secondary" dot>Approved</Badge>
<Badge dot>Pending</Badge>
<Badge variant="destructive" dot>Rejected</Badge>
<Badge variant="neutral">Draft</Badge>

<Pill>AI literacy</Pill>
<Pill variant="outline">Educator growth</Pill>`,
    props: [
      { name: "Badge variant", type: '"primary" | "secondary" | "destructive" | "neutral" | "outline"', default: '"primary"', description: "Yellow pending, green done, red error, Hampton for the rest." },
      { name: "dot", type: "boolean", description: "Leading status dot." },
      { name: "Pill variant", type: '"primary" | "outline"', default: '"primary"', description: "" },
    ],
  },
  {
    id: "avatar",
    name: "Avatar and AvatarGroup",
    category: "Data display",
    summary: "A photo, or initials on a brand colour picked from the name. Every colour passes 4.5:1.",
    render: () => (
      <div className="demo-row">
        <Avatar name="Amina Wanjiru" />
        <Avatar name="Kwame Mensah" size={44} />
        <Avatar name="Lindiwe Dube" size={44} />
        <Avatar name="STEAMLabs Africa" square size={44} />
        <AvatarGroup people={[{ name: "Amina Wanjiru" }, { name: "Kwame Mensah" }, { name: "Lindiwe Dube" }, { name: "Tendai Moyo" }, { name: "Zainab Bello" }, { name: "Yusuf Ali" }]} />
      </div>
    ),
    code: `<Avatar name="Amina Wanjiru" />
<Avatar name="Kwame Mensah" src={user.photo} size={44} />
<Avatar name="STEAMLabs Africa" square />

<AvatarGroup people={members} max={4} />`,
    props: [
      { name: "name", type: "string", description: "Used for initials, colour and alt text." },
      { name: "src", type: "string | null", description: "Photo URL." },
      { name: "size", type: "number", default: "36", description: "" },
      { name: "square", type: "boolean", description: "Rounded square, for organisations." },
    ],
  },
  {
    id: "card",
    name: "Card",
    category: "Data display",
    summary: "A white panel with a Hampton border. `feature` adds the flat offset shadow.",
    render: () => (
      <div className="demo-grid">
        <Card>
          <CardHeader>
            <CardTitle>Code Clubs</CardTitle>
            <CardDescription>Weekly making and coding for learners aged 9 to 16.</CardDescription>
          </CardHeader>
          <CardFooter><Button size="sm">Register</Button></CardFooter>
        </Card>
        <Card feature>
          <CardHeader>
            <CardTitle>AI Academy</CardTitle>
            <CardDescription>Twelve weeks of applied AI for secondary schools.</CardDescription>
          </CardHeader>
          <CardContent><Pill>AI literacy</Pill></CardContent>
        </Card>
      </div>
    ),
    code: `<Card>
  <CardHeader>
    <CardTitle>Code Clubs</CardTitle>
    <CardDescription>Weekly making and coding…</CardDescription>
  </CardHeader>
  <CardFooter><Button size="sm">Register</Button></CardFooter>
</Card>

<Card feature>…</Card>`,
  },
  {
    id: "coded-card",
    name: "CodedCard",
    category: "Data display",
    summary: "A numbered or code-tagged card for focus-area and value grids.",
    render: () => (
      <div className="demo-grid">
        <CodedCard code="01" title="AI literacy">Every learner understands how AI works and where it fails.</CodedCard>
        <CodedCard code="02" title="Teacher growth">Educators lead the change in their own classrooms.</CodedCard>
      </div>
    ),
    code: `<CodedCard code="01" title="AI literacy">
  Every learner understands how AI works and where it fails.
</CodedCard>`,
  },
  {
    id: "stat",
    name: "Stat",
    category: "Data display",
    summary: "One figure and its label: big and yellow on a green band, or a dashboard tile.",
    ground: "subtle",
    render: () => (
      <div className="demo-stack">
        <div className="demo-grid demo-grid--3">
          <Stat value="128" label="Registrations" icon={<Icon name="check" />} delta="+14 this week" />
          <Stat value="9" label="Forms live" icon={<Icon name="menu" />} />
          <Stat value="72%" label="Completion" icon={<Icon name="arrow-up-right" />} delta="+5 pts" />
        </div>
        <div className="demo-swatch demo-swatch--ink demo-grid demo-grid--3">
          <Stat variant="band" value="12k+" label="Learners reached" />
          <Stat variant="band" value="450" label="Educators trained" />
          <Stat variant="band" value="9" label="Countries" />
        </div>
      </div>
    ),
    code: `<Stat value="128" label="Registrations" icon={<Icon name="check" />} delta="+14 this week" />

<Band tone="ink">
  <Stat variant="band" value="12k+" label="Learners reached" />
</Band>`,
    props: [
      { name: "variant", type: '"tile" | "band"', default: '"tile"', description: "" },
      { name: "value / label", type: "ReactNode", description: "" },
      { name: "delta", type: "ReactNode", description: "Change since last period (tiles)." },
      { name: "icon", type: "ReactNode", description: "Beside the label (tiles)." },
    ],
  },
  {
    id: "table",
    name: "Table",
    category: "Data display",
    summary: "A data table that scrolls sideways on small screens instead of squashing.",
    render: () => (
      <Table>
        <TableHeader>
          <TableRow><TableHead>Learner</TableHead><TableHead>School</TableHead><TableHead>Status</TableHead><TableHead style={{ textAlign: "right" }}>Score</TableHead></TableRow>
        </TableHeader>
        <TableBody>
          <TableRow><TableCell>Amina Wanjiru</TableCell><TableCell>Kibera Girls</TableCell><TableCell><Badge variant="secondary" dot>Passed</Badge></TableCell><TableCell style={{ textAlign: "right" }}>92</TableCell></TableRow>
          <TableRow><TableCell>Kwame Mensah</TableCell><TableCell>Accra Academy</TableCell><TableCell><Badge dot>In review</Badge></TableCell><TableCell style={{ textAlign: "right" }}>78</TableCell></TableRow>
          <TableRow><TableCell>Lindiwe Dube</TableCell><TableCell>Soweto High</TableCell><TableCell><Badge variant="neutral">Not started</Badge></TableCell><TableCell style={{ textAlign: "right" }}>–</TableCell></TableRow>
        </TableBody>
      </Table>
    ),
    code: `<Table>
  <TableHeader>
    <TableRow><TableHead>Learner</TableHead><TableHead>Status</TableHead></TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Amina Wanjiru</TableCell>
      <TableCell><Badge variant="secondary" dot>Passed</Badge></TableCell>
    </TableRow>
  </TableBody>
</Table>`,
    props: [{ name: "compact", type: "boolean", description: "Tighter rows for dense screens." }],
  },
  {
    id: "list",
    name: "List and ListItem",
    category: "Data display",
    summary: "Rows with a leading visual, a title and description, and a trailing detail.",
    render: () => (
      <List>
        <ListItem leading={<Avatar name="Amina Wanjiru" />} title="Amina Wanjiru" description="Submitted the robotics form" trailing="2h ago" href="#list" />
        <ListItem leading={<Avatar name="Kwame Mensah" />} title="Kwame Mensah" description="Requested leave approval" trailing={<Badge dot>Pending</Badge>} href="#list" />
        <ListItem leading={<Avatar name="Lindiwe Dube" />} title="Lindiwe Dube" description="Joined Code Clubs" trailing="Yesterday" />
      </List>
    ),
    code: `<List>
  <ListItem
    leading={<Avatar name="Amina Wanjiru" />}
    title="Amina Wanjiru"
    description="Submitted the robotics form"
    trailing="2h ago"
    href="/submissions/42"
  />
  <ListItem link={<Link to="/people/7" />} title="Kwame Mensah" />
</List>`,
    props: [
      { name: "leading / trailing", type: "ReactNode", description: "" },
      { name: "title / description", type: "ReactNode", description: "" },
      { name: "href", type: "string", description: "Makes the row a link." },
      { name: "link", type: "ReactElement", description: "A router link element to wrap the row in." },
    ],
  },
  {
    id: "tile",
    name: "Tile and TileGrid",
    category: "Data display",
    summary: "Large clickable cards that open a section of an app.",
    ground: "subtle",
    render: () => (
      <TileGrid>
        <Tile href="#tile" tone="ink" icon={<Icon name="menu" size={20} />} title="Forms" description="Build and share forms" meta="9 live" />
        <Tile href="#tile" icon={<Icon name="arrow-up-right" size={20} />} title="Dashboards" description="Charts from your responses" />
        <Tile href="#tile" icon={<Icon name="check" size={20} />} title="Approvals" description="Requests waiting on you" meta="3" />
      </TileGrid>
    ),
    code: `<TileGrid>
  <Tile href="/forms" tone="ink" icon={<FormIcon />} title="Forms" description="Build and share forms" meta="9 live" />
  <Tile href="/dashboards" title="Dashboards" description="Charts from your responses" />
</TileGrid>`,
    props: [
      { name: "title / description / icon / meta", type: "ReactNode", description: "" },
      { name: "tone", type: '"default" | "ink"', default: '"default"', description: "`ink` for the one section that leads." },
      { name: "asChild", type: "boolean", description: "Wrap your router link." },
    ],
  },
  {
    id: "progress",
    name: "Progress and ProgressRing",
    category: "Data display",
    summary: "How far through something a learner is, as a bar or a ring.",
    render: () => (
      <div className="demo-row demo-row--center">
        <div style={{ flex: "1 1 220px" }} className="demo-stack demo-stack--tight">
          <Progress value={64} label="Course progress" showValue />
          <Progress value={30} label="Profile complete" tone="primary" showValue />
        </div>
        <ProgressRing value={64} label="Course progress" />
        <ProgressRing value={100} label="Module 1" size={72} stroke={8}><Icon name="check" size={24} /></ProgressRing>
      </div>
    ),
    code: `<Progress value={64} label="Course progress" showValue />
<ProgressRing value={64} label="Course progress" />`,
    props: [
      { name: "value", type: "number", description: "0 to 100; clamped." },
      { name: "label", type: "string", description: "What it's progress of, for screen readers." },
      { name: "showValue (bar)", type: "boolean", description: "" },
      { name: "size / stroke (ring)", type: "number", default: "56 / 6", description: "" },
    ],
  },
  {
    id: "steps",
    name: "Steps",
    category: "Data display",
    summary: "A row of steps: an approval chain, a sign-up flow, a course path.",
    render: () => (
      <Steps
        steps={[
          { label: "Submitted", state: "done", detail: "Mon 6 Oct" },
          { label: "Head of school", state: "done", detail: "Tue 7 Oct" },
          { label: "Program lead", state: "current", detail: "Waiting" },
          { label: "Finance", state: "pending" },
        ]}
      />
    ),
    code: `<Steps
  steps={[
    { label: "Submitted", state: "done", detail: "Mon 6 Oct" },
    { label: "Program lead", state: "current" },
    { label: "Finance", state: "pending" },
  ]}
/>`,
    props: [{ name: "steps", type: '{ label, state: "done" | "current" | "pending" | "rejected" | "skipped", detail? }[]', description: "" }],
  },
  {
    id: "accordion",
    name: "Accordion",
    category: "Data display",
    summary: "Questions and answers on native <details>, so they work without JavaScript.",
    render: () => (
      <Accordion>
        <AccordionItem name="faq" title="Who can join Code Clubs?" open>Any learner aged 9 to 16. No experience needed.</AccordionItem>
        <AccordionItem name="faq" title="Does it cost anything?">Clubs in partner schools are free. Holiday camps have a small fee.</AccordionItem>
        <AccordionItem name="faq" title="Can my school host a club?">Yes. Register as a partner school and we’ll train a teacher to lead it.</AccordionItem>
      </Accordion>
    ),
    code: `<Accordion>
  <AccordionItem name="faq" title="Who can join Code Clubs?">
    Any learner aged 9 to 16.
  </AccordionItem>
  <AccordionItem name="faq" title="Does it cost anything?">…</AccordionItem>
</Accordion>`,
    props: [
      { name: "title", type: "ReactNode", description: "The question." },
      { name: "name", type: "string", description: "Items sharing a name close each other." },
      { name: "open", type: "boolean", description: "Start open." },
    ],
  },
];
