# Storybook-first UX feedback pass

## What changed

- Added distinct primary, secondary, and danger button treatments with a
  surface shine hover based on the approved reference.
- Updated Storybook stories before composing the revised components into the
  website.
- Made the hero more compact, removed the overview metric cards, moved the
  Learning Calendar above Upcoming Activities, and kept both section headings
  at the `h2` level.
- Added red number-only section counts with accessible labels.
- Added progressive Upcoming Activities reveal in batches of three.
- Restyled Activity Detail skills with semantic icons, raised surfaces, grey
  borders, and the same radius as the detail summary.
- Made confirmation actions asymmetric: a compact Back button and a primary or
  danger action that fills the remaining row width.
- Added navigation scrolling to Calendar and My learning.

## Why

User feedback showed that action priority was unclear, the hero and overview
cards hid meaningful page changes, the upcoming list expanded too abruptly,
and skill metadata lacked emphasis. Building the component states in Storybook
first keeps the website composition aligned with reviewed primitives.

## Alternative considered

A rotating border-beam and equal-width confirmation buttons were tried and
rejected. The border effect was visually noisy compared with the requested
shine-hover reference, while equal button widths overstated the Back action.

## Follow-ups

- Recheck the final deployed build at the standard desktop and mobile
  viewports after release.
