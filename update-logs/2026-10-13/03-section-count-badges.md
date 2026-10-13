# Section count badges

## What changed

- Updated the shared `SectionHeader` count into a compact badge with a red count and a contextual label.
- Added singular/plural labels for the Learning Calendar, Upcoming Activities, and My Learning section counts.
- Updated the SectionHeader Storybook stories before applying the shared component change to the page.

## Why

A standalone number did not communicate what it measured. The badge now makes the count self-explanatory without restoring the larger overview cards.

## Alternative considered

An icon-only or number-only badge would save a little more space, but would still leave the metric ambiguous. A short text label keeps the interface clear.

## Follow-up

- Storybook and the production app build successfully.
- Browser QA at 1703 x 723 confirms title/badge bottom alignment and no horizontal overflow.
- The local Agentation server on port 4747 was unavailable, so its annotation could not be marked resolved automatically.
