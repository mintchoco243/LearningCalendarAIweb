# Hero and mobile navigation feedback

## What changed

- Removed the frame around the hero `Next skill` label.
- Removed the `Skill path · 2026–2027` period caption from the application hero
  while keeping the Hero component capable of rendering a period label in
  other stories.
- Bottom-aligned section counts with their headings.
- Replaced the fixed navigation scroll offset with the measured sticky-header
  height plus a 16px gap.
- Added extra mobile spacing above the `Explore calendar` action.
- Added a Hero story without a period label.

## Why

The framed milestone and period caption added unnecessary visual chrome. The
fixed desktop header offset also placed mobile section headings underneath the
taller, wrapped header, while the hero action sat too close to its description.

## Alternative considered

A larger hard-coded mobile `scroll-margin-top` was considered, but measuring
the actual sticky-header height is more reliable across desktop and mobile
without maintaining separate offset values.

## Follow-ups

- Agentation could not be reached on local port 4747, so the supplied feedback
  could not be replied to or marked resolved in the toolbar.
