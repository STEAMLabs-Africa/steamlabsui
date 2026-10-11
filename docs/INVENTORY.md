# Component inventory

Every UI component found across the STEAMLabs Africa repositories on 2026-10-11, and what the library does with it.

**Repos scanned:** `STEAMLabs_official_website` (website), `steam-forms` (forms), `SLAP` (workspace app), `African-educators` (educators site), `steamlabslms` (LMS) and `steamlabsui` (this library). `STEAMlabs-Auth` is empty, `sla-reiki-api` is archived and has no UI, and `Ultimate-Hacker-Roadmap` is a fork.

**How to read it.** Where several repos built the same thing, the library keeps one component and lists every source it replaces. Every component is restyled to the STEAMLabs tokens: SLAP used Tailwind's slate and indigo palette and `steam-forms` used brand-colour tints, and neither survives into the library. Interactive pieces use native HTML (`<dialog>`, `<details>`, real form controls) instead of Radix, so the package has no runtime dependencies beyond React.

## In the library (v1.0)

| Library component | Category | Replaces |
|---|---|---|
| `tokens`, `tokens.css`, `brand.css`, `tailwind.css` | Foundations | website `client/styles.css`; Brand Manual 2026 |
| `ThemeProvider` (program themes) | Foundations | website program themes |
| `Logo` | Foundations | website logo files; LMS `Logo`; forms `Brand`, `BrandLogo` |
| `Icon` | Foundations | SLAP `ui/icon`; LMS `Icon`; forms `icons` (a small shared set only) |
| `Container`, `Band`, `Section` | Layout | website bands; educators `Section`, `Band` |
| `SectionHeader` | Layout | educators `SectionHead`; website section openers |
| `PageHeader` | Layout | forms `PageHeader`; SLAP `PageHead`; website `PageHeader` |
| `Eyebrow`, `Heading`, `Lead` | Typography | website type styles |
| `TextLink` | Typography | educators `TextLink` |
| `Button` (adds `loading`) | Actions | website `ui/button`; forms `Button`, `ButtonLink`, `ButtonAnchor`; educators `ButtonLink`, `ButtonAnchor`; LMS `ui/button`; SLAP `SubmitButton`, `MiniButton`, `RetryButton` |
| `BackLink` | Actions | SLAP `BackLink`; forms `BackButton` |
| `Menu` | Actions | SLAP `ActionMenu`; website `ui/dropdown-menu`; forms `AccountMenu` |
| `SegmentedControl` | Actions | SLAP `Seg`; forms `SectionSwitch`; SLAP `Pill` filter buttons |
| `Input`, `Textarea`, `Label` | Forms | website `ui/input`, `ui/textarea`, `ui/label`; forms `Input`, `Textarea` |
| `Field` (adds `required`) | Forms | forms `Field`; educators `Field`; website `auth/AuthField` |
| `Select` | Forms | forms `Select`; website `auth/AuthSelect` (native, not Radix) |
| `Checkbox` | Forms | forms `CheckboxRow`; website `ui/checkbox` |
| `RadioGroup` | Forms | website `ui/radio-group` |
| `Switch` | Forms | SLAP `Toggle`; website `ui/switch`; forms `builder/Switch` |
| `Badge` (adds tones and `dot`) | Data display | website `ui/badge`; SLAP `Badge`, `StatusBadge`, `PriorityBadge`; LMS `SyncBadge` |
| `Pill` | Data display | website pills; forms `Pill` |
| `Avatar`, `AvatarGroup` | Data display | SLAP `Avatar` (both copies); website `ui/avatar` |
| `Card` and parts | Data display | website `ui/card`; forms `Card`; SLAP `Card`; LMS `ui/card`; educators `ItemCard` |
| `CodedCard` | Data display | educators `CodedCard` |
| `Stat` (band and tile) | Data display | educators `Stat`; SLAP `StatTile`; forms `dashboard/StatTile`; LMS `StatsStrip` |
| `Table` and parts | Data display | website `ui/table`; SLAP table markup in `task-table`, `submissions-table` |
| `List`, `ListItem` | Data display | SLAP `RowItem`, `RowLink` |
| `Tile`, `TileGrid` | Data display | forms `Tile`, `TileGrid`; SLAP `SectionTiles` |
| `Progress` | Data display | website `ui/progress`; SLAP `ui/progress` |
| `ProgressRing` | Data display | LMS `ProgressRing` |
| `Steps` | Data display | SLAP `ApprovalChain` (made general) |
| `Accordion`, `AccordionItem` | Data display | website `ui/accordion`, `ui/collapsible` |
| `Tabs` | Navigation | website `ui/tabs`; SLAP `ui/tabs` |
| `Breadcrumb` | Navigation | website `ui/breadcrumb` |
| `Pagination` | Navigation | website `ui/pagination` |
| `SkipLink` | Navigation | LMS `SkipLink` |
| `Alert` | Feedback | website `ui/alert`; forms `Banner`; SLAP `SectionError`; educators `FormError` |
| `EmptyState` | Feedback | forms `EmptyState` |
| `Spinner` | Feedback | SLAP `Spinner` |
| `Skeleton` | Feedback | website `ui/skeleton`; SLAP `Skeleton`, `PageSkeleton` |
| `ToastProvider`, `useToast` | Feedback | forms `toast`; SLAP `toast`; website `ui/sonner` |
| `Tooltip` | Overlays | website `ui/tooltip` |
| `Dialog` (center, right, bottom) | Overlays | forms `Dialog`; SLAP `Modal`; website `ui/dialog`, `ui/sheet`, `ui/drawer`, `ui/alert-dialog` |
| `Separator` | Layout | website `ui/separator` |
| `Reveal` | Motion | website `Reveal`; SLAP `Reveal`; forms `landing/Reveal` |
| `CountUp` | Motion | website `CountUp` |

## Next candidates (not in v1.0)

Generic enough to join later. Use the procedure in [ADDING-COMPONENTS.md](./ADDING-COMPONENTS.md).

| Component | Source | Why it waits |
|---|---|---|
| Charts (bar, donut, stacked bar, heatmap, timeseries, histogram, box plot) | forms `dashboard/charts`; website `ui/chart` (Recharts); SLAP `ui/chart` | Three different implementations; needs one API decided first |
| `Marquee` | website `MarqueeRail`, `about/TeamMarquee` | Marketing-only so far |
| `VideoEmbed` | website `YouTubeEmbed`, `VideoBand`, `HeroVideoSection` | Needs a privacy (no-cookie) decision |
| `Calendar`, `DatePicker` | website `ui/calendar` | Needs a date library choice |
| `Combobox`, `Command` | website `ui/command`; SLAP `PeoplePicker` | Needs keyboard-list behaviour built properly |
| `Popover`, `HoverCard` | website `ui/popover`, `ui/hover-card` | Native `popover` attribute support is recent |
| `InputOTP` | website `ui/input-otp` | Only used by sign-in |
| `Carousel` | website `ui/carousel`, `about/TeamCoverflow` | Marketing-only so far |
| `Sidebar`, `NavigationMenu`, `Menubar`, `ContextMenu`, `Resizable`, `ScrollArea`, `AspectRatio`, `ToggleGroup`, `Slider` | website `ui/*` | Generated by shadcn and unused on the website today |
| `SignaturePad` | SLAP `signature-pad` | Only one app needs it |
| `FileTypeIcon` | SLAP `ui/file-type-icon` | Office-file specific |

## Staying in their apps

These are tied to one product's data or routing, so they stay where they are and are built from library pieces.

- **website:** `SiteShell`, `ProgramShell`, `ProgramDetail`, `ProgramsPreview`, `ProgramsStory`, `ProjectsPreview`, `HallOfFame`, `HeroConcept`, `SteamlabsRobot`, `ProgramChatWidget`, `LanguageSwitcher`, `LanguageTransition`, `LocaleLink`, `RouteLoader`, `PortalGate`, `AuthCard`, `AdminShell`, `BlogContent`, `EventPageEditor`, `RegistrationCard`, `RichEventPage`.
- **forms:** `AppShell`, `PublicShell`, `AuthLayout`, `StaffGate`, `PolicyPage`, `ComplianceCard`, `TeamCard`, `RequestExportDialog`, the form builder (`builder/*`), the dashboard builder (`dashboard/*` apart from charts), the form renderer (`form-renderer/*`), `DoorApp`, motion helpers (`grow`, `crack`, `morph`).
- **SLAP:** `ViewShell`, `DetailShell`, `DetailPanel`, `TaskTable`, `TaskBadges` logic, `SubmissionsTable`, `PeoplePicker`, `FolderBadge`, `SharedFilesPane`, `ContentPreview`, `OnlyofficeEditor`, `PdfPage`, `AttachButton`, `InviteLinkBox`, `ChangePasswordForm`, `CompanyMark`, `InstallApp`, `AppUpdate`, `SwRegister`, `NavProgress`, `LiveEvents`, `UnitCascade`, `OnboardingStateBadge`, `TenantLink`.
- **educators:** `SiteShell`, `AuthLayout`, `MemberGate`, `MemberActions`, `Photo` (tied to its image registry).
- **LMS:** `CourseCard`, `CourseArt`, `SubjectChip`, `QuizLesson`, `ScheduleStrip`.

## Totals

| | Count |
|---|---|
| Component files scanned (excluding hooks and index files) | 181 |
| Component families in the library (v1.0) | 45 |
| React exports in the library (including `Logo`) | 70 |
| Next candidates | 20 |
| Staying in their apps | the rest, listed above |
