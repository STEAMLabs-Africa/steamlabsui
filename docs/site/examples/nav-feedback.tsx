import * as React from "react";
import {
  Alert, Breadcrumb, Button, CountUp, Dialog, EmptyState, Field, Icon, Input, Pagination, Reveal, Skeleton, SkipLink,
  Spinner, Tabs, TabsContent, TabsList, TabsTrigger, ToastProvider, Tooltip, useToast, Avatar,
} from "../../../src";
import type { Example } from "../types";

function PaginationDemo() {
  const [page, setPage] = React.useState(4);
  return <Pagination page={page} pageCount={12} onPageChange={setPage} />;
}

function ToastButtons() {
  const { toast } = useToast();
  return (
    <div className="demo-row">
      <Button variant="secondary" onClick={() => toast({ title: "Form published", description: "Share the link with your learners.", tone: "success" })}>Publish</Button>
      <Button variant="outline" onClick={() => toast({ title: "Response deleted", action: { label: "Undo", onClick: () => toast("Restored") } })}>Delete response</Button>
      <Button variant="destructive" onClick={() => toast({ title: "Couldn’t save", description: "Check your connection and try again.", tone: "danger" })}>Fail</Button>
    </div>
  );
}

function DialogDemo() {
  const [open, setOpen] = React.useState<null | "center" | "right" | "bottom">(null);
  const close = () => setOpen(null);
  return (
    <div className="demo-row">
      <Button variant="destructive" onClick={() => setOpen("center")}>Delete form</Button>
      <Button variant="outline" onClick={() => setOpen("right")}>Open side sheet</Button>
      <Button variant="outline" onClick={() => setOpen("bottom")}>Open drawer</Button>
      <Dialog
        open={open === "center"}
        onClose={close}
        size="sm"
        title="Delete this form?"
        description="Its 132 responses will be deleted too. This can’t be undone."
        footer={<><Button variant="outline" onClick={close}>Cancel</Button><Button variant="destructive" onClick={close}>Delete form</Button></>}
      />
      <Dialog open={open === "right"} onClose={close} side="right" title="Invite a teammate" footer={<Button onClick={close}>Send invite</Button>}>
        <Field label="Email"><Input type="email" placeholder="colleague@school.org" /></Field>
      </Dialog>
      <Dialog open={open === "bottom"} onClose={close} side="bottom" title="Filters">
        <p>Drawers suit phones: filters, quick settings, share sheets.</p>
      </Dialog>
    </div>
  );
}

function RevealDemo() {
  const [k, setK] = React.useState(0);
  return (
    <div className="demo-stack demo-stack--tight">
      <div className="demo-row" key={k}>
        {["Learn", "Make", "Share"].map((w, i) => (
          <Reveal key={w} delay={i * 120}><span className="demo-chip">{w}</span></Reveal>
        ))}
        <span className="demo-count"><CountUp to={12000} suffix="+" /> learners</span>
      </div>
      <div><Button size="sm" variant="ghost" onClick={() => setK((n) => n + 1)}>Replay</Button></div>
    </div>
  );
}

export const examples: Example[] = [
  {
    id: "tabs",
    name: "Tabs",
    category: "Navigation",
    summary: "Switches between panels in place. Arrow keys move between tabs.",
    render: () => (
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="responses">Responses</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="overview"><p className="sla-muted">132 responses since Monday.</p></TabsContent>
        <TabsContent value="responses"><p className="sla-muted">The response table goes here.</p></TabsContent>
        <TabsContent value="settings"><p className="sla-muted">Who can respond, and until when.</p></TabsContent>
      </Tabs>
    ),
    code: `<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="responses">Responses</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">…</TabsContent>
  <TabsContent value="responses">…</TabsContent>
</Tabs>`,
    props: [
      { name: "value / defaultValue / onValueChange", type: "string", description: "Controlled or not." },
      { name: "TabsTrigger value", type: "string", description: "Matches a TabsContent value." },
    ],
  },
  {
    id: "breadcrumb",
    name: "Breadcrumb",
    category: "Navigation",
    summary: "Where this page sits. The last item is the current page.",
    render: () => <Breadcrumb items={[{ label: "Home", href: "#breadcrumb" }, { label: "Programs", href: "#breadcrumb" }, { label: "AI Academy" }]} />,
    code: `<Breadcrumb
  items={[
    { label: "Home", href: "/" },
    { label: "Programs", href: "/programs" },
    { label: "AI Academy" },
  ]}
/>`,
  },
  {
    id: "pagination",
    name: "Pagination",
    category: "Navigation",
    summary: "Pages around the current one, with gaps. Works with buttons or links.",
    render: () => <PaginationDemo />,
    code: `<Pagination page={page} pageCount={12} onPageChange={setPage} />

// Server-rendered links
<Pagination page={page} pageCount={12} hrefFor={(p) => \`?page=\${p}\`} />`,
    props: [
      { name: "page / pageCount", type: "number", description: "1-based." },
      { name: "onPageChange", type: "(page) => void", description: "Client-side paging." },
      { name: "hrefFor", type: "(page) => string", description: "Link-based paging; wins over onPageChange." },
    ],
  },
  {
    id: "skip-link",
    name: "SkipLink",
    category: "Navigation",
    summary: "The first thing keyboard users reach: jumps past the navigation. Hidden until focused.",
    render: () => (
      <div className="demo-skip">
        <p className="sla-muted">Click here, then press Tab.</p>
        <SkipLink href="#skip-link" />
      </div>
    ),
    code: `<SkipLink href="#main" />
…
<main id="main">…</main>`,
  },
  {
    id: "alert",
    name: "Alert",
    category: "Feedback",
    summary: "A message about the page or a section of it. Tones show as a stripe and icon, never a tinted fill.",
    render: () => (
      <div className="demo-stack demo-stack--tight">
        <Alert title="Registration closes Friday">Late entries go on the waiting list.</Alert>
        <Alert tone="success" title="Form published" />
        <Alert tone="warning" title="3 responses are missing a school" />
        <Alert tone="danger" title="Couldn’t load responses" action={<Button size="sm" variant="outline">Try again</Button>}>The server didn’t answer.</Alert>
      </div>
    ),
    code: `<Alert title="Registration closes Friday">Late entries go on the waiting list.</Alert>
<Alert tone="success" title="Form published" />
<Alert tone="danger" title="Couldn’t load responses" action={<Button size="sm" variant="outline">Try again</Button>} />`,
    props: [
      { name: "tone", type: '"info" | "success" | "warning" | "danger"', default: '"info"', description: "`danger` is announced at once (role=alert)." },
      { name: "title", type: "ReactNode", description: "" },
      { name: "action", type: "ReactNode", description: "A retry button or link." },
      { name: "icon", type: "ReactNode | null", description: "Replace or remove the icon." },
    ],
  },
  {
    id: "toast",
    name: "Toast",
    category: "Feedback",
    summary: "A short message that confirms an action, bottom right (bottom centre on phones).",
    render: () => <ToastProvider><ToastButtons /></ToastProvider>,
    code: `// Once, near the root
<ToastProvider><App /></ToastProvider>

// Anywhere below it
const { toast } = useToast();
toast({ title: "Form published", tone: "success" });
toast({ title: "Response deleted", action: { label: "Undo", onClick: restore } });`,
    props: [
      { name: "title / description", type: "ReactNode", description: "" },
      { name: "tone", type: '"default" | "success" | "danger"', default: '"default"', description: "" },
      { name: "duration", type: "number", default: "5000", description: "Milliseconds; 0 stays until dismissed." },
      { name: "action", type: "{ label, onClick }", description: "One undo-style action." },
    ],
  },
  {
    id: "empty-state",
    name: "EmptyState",
    category: "Feedback",
    summary: "What a list or page shows before it has anything in it.",
    render: () => (
      <EmptyState
        icon={<Icon name="plus" size={20} />}
        title="No forms yet"
        description="Create a form to start collecting registrations, feedback or applications."
        action={<Button>Create a form</Button>}
      />
    ),
    code: `<EmptyState
  title="No forms yet"
  description="Create a form to start collecting registrations…"
  action={<Button>Create a form</Button>}
/>`,
  },
  {
    id: "spinner",
    name: "Spinner and Skeleton",
    category: "Feedback",
    summary: "A spinner for a short wait on one control; skeletons where content is about to appear.",
    render: () => (
      <div className="demo-row demo-row--center">
        <Spinner />
        <Spinner size={24} />
        <div className="demo-row demo-row--center" style={{ flex: "1 1 240px" }}>
          <Skeleton shape="circle" width={40} height={40} />
          <div className="demo-stack demo-stack--tight" style={{ flex: 1 }}>
            <Skeleton shape="text" width="60%" />
            <Skeleton shape="text" width="90%" />
          </div>
        </div>
      </div>
    ),
    code: `<Spinner />
<Skeleton shape="circle" width={40} height={40} />
<Skeleton shape="text" width="60%" />`,
  },
  {
    id: "dialog",
    name: "Dialog",
    category: "Overlays",
    summary: "A modal on native <dialog>: focus trapping, Escape and the backdrop come from the browser. Also does side sheets and drawers.",
    render: () => <DialogDemo />,
    code: `<Dialog
  open={open}
  onClose={() => setOpen(false)}
  size="sm"
  title="Delete this form?"
  description="Its 132 responses will be deleted too."
  footer={<>
    <Button variant="outline" onClick={close}>Cancel</Button>
    <Button variant="destructive" onClick={remove}>Delete form</Button>
  </>}
/>

<Dialog side="right" title="Invite a teammate" …>…</Dialog>
<Dialog side="bottom" title="Filters" …>…</Dialog>`,
    props: [
      { name: "open / onClose", type: "boolean / () => void", description: "Always controlled." },
      { name: "title / description", type: "ReactNode", description: "Label and describe the dialog." },
      { name: "footer", type: "ReactNode", description: "Buttons, main action last." },
      { name: "side", type: '"center" | "right" | "bottom"', default: '"center"', description: "Modal, side sheet or drawer." },
      { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Width of a centred dialog." },
      { name: "hideClose", type: "boolean", description: "Hide ×, for confirmations." },
    ],
  },
  {
    id: "tooltip",
    name: "Tooltip",
    category: "Overlays",
    summary: "A few words on hover and keyboard focus. Never put links or buttons in one.",
    render: () => (
      <div className="demo-row demo-row--tall-top">
        <Tooltip content="Copy the share link"><Button size="icon" variant="outline" aria-label="Copy link"><Icon name="external" /></Button></Tooltip>
        <Tooltip content="Amina Wanjiru, program lead" side="bottom"><button type="button" className="demo-bare"><Avatar name="Amina Wanjiru" /></button></Tooltip>
      </div>
    ),
    code: `<Tooltip content="Copy the share link">
  <Button size="icon" variant="outline" aria-label="Copy link"><LinkIcon /></Button>
</Tooltip>`,
  },
  {
    id: "reveal",
    name: "Reveal and CountUp",
    category: "Motion",
    summary: "Fade content in as it scrolls into view, and count a figure up. Both are off for people who prefer reduced motion.",
    render: () => <RevealDemo />,
    code: `<Reveal><Card>…</Card></Reveal>
<Reveal delay={120}>…</Reveal>

<CountUp to={12000} suffix="+" />`,
    props: [
      { name: "Reveal delay", type: "number", description: "Milliseconds, for staggering a row." },
      { name: "CountUp to", type: "number", description: "The final figure; server-rendered." },
      { name: "prefix / suffix / duration / format", type: "", description: "" },
    ],
  },
];
