# Section count baseline alignment

## What changed

- Aligned the number-only SectionHeader badge to the title baseline.
- Made the badge inherit the title font size and line height.
- Reduced the badge to horizontal padding only, retaining its red treatment, border, and subtle background.

## Why

The raised superscript marker felt visually unbalanced. A baseline-aligned badge keeps the count compact while giving the title and count a stable shared rhythm.

## Alternative considered

Keeping the superscript position made the count more visibly secondary, but introduced an uneven vertical relationship with the title.

## Follow-up

- Storybook and application builds pass.
- Browser QA at 1703 x 723 measures a 1px top/bottom difference from the title due to the badge border, with no horizontal overflow.
