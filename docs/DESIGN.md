# DESIGN — Garena Learning & Development Calendar

## Status

**Approved direction, values proposed.** Values in this file are design decisions,
not measured values or approved Garena brand values.

## Product context

### Audience

Garena staff who need to scan a yearly L&D calendar, find relevant training,
understand its value, and manage registrations quickly.

### Primary goal

Make upcoming learning opportunities easy to notice, compare, and act on.

### Design direction

Use the Kippo pixel-arcade reference for wireframe structure and texture: a
dark canvas, crisp outlines, grid or scanline detail, and a restrained red
action accent. Use Chakra Petch for headings and Montserrat for all body,
metadata, navigation, and control text.

## Reference adaptation

| Reference detail | Decision | Application |
| --- | --- | --- |
| Black void canvas | Borrow | App shell and calendar workspace |
| Thin white outline cards | Borrow | Calendar, activity and dialog structure |
| Single neon accent | Adapt | Restrained Garena red interactive and event treatment |
| Heading/body typography | Adapt | Chakra Petch for hierarchy; Montserrat for readable UI and schedule text |
| All-uppercase text | Adapt | Use for mission labels, navigation, counters, and hero display |
| No semantic state colours | Adapt | Keep registered text plus its marker; avoid colour-only meaning |
| No shadows | Adapt | Cards use borders; overlays receive limited depth |
| Product mockups/profile stacks | Exclude | Use trainer image or abstract event graphic |
| Large section gaps | Exclude | Calendar requires denser internal-tool spacing |
| Decorative gradients | Adapt selectively | Hero or empty-state atmosphere only |

## Visual principles

1. **Schedule first** — date, time, title, and registration status scan before
   descriptions or decoration.
2. **One action at a time** — each activity has one primary action: `Register`
   or `Cancel registration`.
3. **Outline creates structure** — borders separate cards and calendar areas;
   shadows are secondary.
4. **Accent is earned** — red appears on active navigation, selected dates,
   and primary actions only.
5. **Readable over thematic** — the gaming influence cannot reduce legibility,
   accessibility, or semantic clarity.

## Tokens

### Colour tokens

| Token | Proposed value | Applies to |
| --- | --- | --- |
| `--ld-canvas` | `#09090B` | App background |
| `--ld-surface` | `#121214` | Calendar cards, activity cards |
| `--ld-surface-raised` | `#1A1A1E` | Hovered cards and panels |
| `--ld-border` | `#3A3A40` | Default 1px borders and dividers |
| `--ld-border-strong` | `#F2F2F3` | Focused or selected outlines |
| `--ld-text` | `#F7F7F8` | Primary text |
| `--ld-text-muted` | `#A6A6B0` | Supporting information |
| `--ld-text-subtle` | `#72727D` | Labels and disabled metadata |
| `--ld-action` | `#EE3D2B` | Primary button, event day, active navigation |
| `--ld-action-hover` | `#FF5746` | Primary button hover |
| `--ld-action-soft` | `#3A1714` | Event-day and action-tinted backgrounds |
| `--ld-success` | `#3DDC97` | Registered/confirmed state |
| `--ld-warning` | `#FFC857` | Low availability or schedule warning |
| `--ld-danger` | `#FF6B6B` | Cancellation or failed action |
| `--ld-info` | `#66B5FF` | Informational notices |

`--ld-action` is a proposed red token. Replace it with an official Garena
brand token when a brand guide is supplied.

### Typography tokens

| Token | Proposed value | Applies to |
| --- | --- | --- |
| `--font-heading` | `Chakra Petch, ui-sans-serif, system-ui, sans-serif` | H1–H6 and activity titles |
| `--font-body` | `Montserrat, ui-sans-serif, system-ui, sans-serif` | Body, labels, metadata, controls, navigation |
| `--text-label` | `12px / 16px / 700` | Uppercase metadata labels |
| `--text-body-sm` | `14px / 20px / 400` | Card metadata and descriptions |
| `--text-body` | `16px / 24px / 400` | Detail descriptions |
| `--text-body-lg` | `18px / 28px / 400` | Orientation and large supporting copy |
| `--text-h6` | `16px / 22px / 600` | Small panel titles |
| `--text-h5` | `18px / 24px / 600` | Detail subsections |
| `--text-h4` | `22px / 28px / 700` | Activity-card titles |
| `--text-h3` | `28px / 34px / 600` | Group headings and overview values |
| `--text-h2` | `36px / 44px / 600` | Page section headings |
| `--text-h1` | `48px / 56px / 700` | Hero heading; reduces to `40px / 48px` below 768px |

Use uppercase and `0.08em` tracking only for `--text-label`. Do not uppercase
activity titles, trainer names, descriptions, or long date strings.

### Spacing and layout tokens

| Token | Proposed value | Applies to |
| --- | --- | --- |
| `--space-1` | `4px` | Icon/text micro gap |
| `--space-2` | `8px` | Compact item gap |
| `--space-3` | `12px` | Related metadata |
| `--space-4` | `16px` | Standard component gap |
| `--space-5` | `24px` | Card padding and local sections |
| `--space-6` | `32px` | Major card grouping |
| `--space-7` | `48px` | Page section gap |
| `--content-max` | `1440px` | Desktop content width |
| `--shell-padding` | `32px` | Desktop horizontal padding |
| `--calendar-cell-min` | `44px` | Minimum day target size |

### Shape and depth tokens

| Token | Proposed value | Applies to |
| --- | --- | --- |
| `--radius-sm` | `8px` | Tags and small controls |
| `--radius-md` | `12px` | Buttons and calendar cells |
| `--radius-lg` | `16px` | Cards and panels |
| `--border-default` | `1px solid var(--ld-border)` | Default container edge |
| `--border-focus` | `2px solid var(--ld-border-strong)` | Keyboard focus |
| `--shadow-overlay` | `0 24px 64px rgba(0,0,0,.48)` | Modal and detail drawer only |

Cards do not use drop shadows. Borders establish structure. Modals and drawers
may use `--shadow-overlay` to separate an active task from the schedule.

## Layout

### Desktop baseline

Design at **1920 × 900** usable viewport.

- Header: logo left; `Calendar` and `My learning` navigation right.
- Hero: compact orientation area with title, current learning period, and one
  `Explore calendar` action.
- Overview strip: three compact counters for activities, next session, and
  personal registrations.
- Main workspace: yearly calendar is dominant; selected-date activities appear
  in a connected detail region.
- Detail: contextual modal or right-side drawer, never a separate page for the
  first prototype.
- Content remains centred within `--content-max`.

### Calendar rules

- Show one full month at a time with previous and next month controls.
- A day with an activity includes its short title and hot-pink event treatment.
- Selecting an event day opens its activity detail dialog; no selected-date panel appears below the calendar.
- Never encode availability with colour alone; pair status colour with text or
  an icon.
- Activity cards show date, time, title, trainer, location, short description,
  and registration status in that scan order.

### Responsive rules

| Range | Layout behaviour |
| --- | --- |
| `≥ 1440px` | 3-column month grid; detail drawer up to 560px |
| `1024–1439px` | 2-column month grid; cards retain full metadata |
| `768–1023px` | 2-column grid; overview cards stack as needed |
| `< 768px` | 1-column month list; vertical scrolling only |
| `< 480px` | Compact header; preserve primary action and hide only duplicate metadata |

Minimum interactive target: `44 × 44px`.

## Components and states

### Primary button

- Filled `--ld-action`, `--ld-canvas` text, and `--radius-md`.
- Hover uses `--ld-action-hover`.
- Pressed state darkens without layout shift.
- Disabled state uses muted border and text; it never uses ambiguous inactive red.
- Use once per action group.

### Secondary button

- Transparent surface with `--ld-border-strong` outline and primary text.
- Hover uses `--ld-surface-raised`.
- Use for `View details`, `Back to today`, and non-destructive actions.

### Activity card

- `--ld-surface`, `--border-default`, and `--radius-lg`.
- Hover increases border contrast and surface value; no elevation shadow.
- Keyboard focus uses `--border-focus`.
- Registered state includes a text badge and `--ld-success` icon or marker.
- Completed state uses subdued neutral surface, text, and media treatment with a visible `Done` label; it remains selectable for review.

### Calendar day

- Default: transparent.
- Has activity: subtle `--ld-action-soft` marker.
- Hover: raised surface.
- Selected: `--ld-action` fill and `--ld-canvas` text.
- Today: strong outline, independent from selection.
- Unavailable/past: muted text while remaining readable.
- Completed past activity: subdued neutral marker plus a visible `Done` label/icon; it remains selectable for review.

### Detail drawer or modal

- Fixed readable header and footer; only body scrolls.
- Footer contains `Register` or `Cancel registration`; completed courses show a disabled `Completed` action with no hover behavior.
- Confirm cancellation before committing it.
- Show success and error feedback as text plus semantic colour.

### Empty, loading, and error states

- Empty: explain that no session is scheduled for the selected day and offer a
  clear next action.
- Loading: use skeleton calendar cells and cards while preserving page geometry.
- Error: provide a clear message and `Retry` action.
- Registration success: confirm the activity title and update `My learning`.

## Imagery and texture

- Use trainer headshots only when supplied and approved.
- Activity Cards may use a category-appropriate workshop image with a dark
  overlay so schedule text remains primary.
- Avoid gaming characters, phone mockups, and unrelated neon imagery.
- An optional 2–4% opacity grid or scanline may appear in the hero only; never
  place texture behind dense schedule content.

## Motion

| Interaction | Proposed motion |
| --- | --- |
| Button hover | 160ms colour/border transition |
| Card hover | 160ms surface/border transition |
| Calendar selection | 180ms fill transition |
| Drawer/modal open | 220ms ease-out opacity + 12px translate |
| Toast/message | 180ms entry with standard dismissal timing |

Respect `prefers-reduced-motion`: remove transforms and retain only immediate
opacity/state changes. Do not use glitch effects, flashing, continuous neon
pulses, or autoplay motion.

## Accessibility and content

- System UI chrome is English.
- Use explicit English date formatting; never inherit browser locale.
- Minimum normal-text contrast target: WCAG AA.
- Every icon-only control has an accessible name.
- Focus remains visible on every interactive element.
- Registration, cancellation, availability, and errors never rely on colour alone.

## Avoid list

- All-caps body copy or activity titles.
- Mono-only body typography.
- Pure-white borders on every surface; reserve strong outlines for focus and selection.
- Large neon gradients behind cards, tables, or calendar cells.
- Pills for primary buttons.
- Shadows on ordinary cards.
- Multiple competing primary actions.
- Decorative illustrations that push schedule data below the fold.
- Red, green, or yellow status signals without text or icon support.
- Responsive horizontal page scrolling.

## Implementation handoff

The project uses Tailwind CSS. Implement these as named CSS custom properties
and map utilities to token names; do not hardcode values across components.

Reusable foundations to create after approval:

- `CalendarMonth`
- `CalendarDay`
- `ActivityCard`
- `ActivityDetail`
- `RegistrationStatus`
- `ActionButton`
- `EmptyScheduleState`

This document owns visual and interaction rules. Page structure remains owned
by the project layout plan.
