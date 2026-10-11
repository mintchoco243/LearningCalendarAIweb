# Compact desktop Learning Calendar

## What changed

Changed desktop Learning Calendar rows from width-driven square cells to fixed
68px rows. This keeps a month compact at wide viewport widths while retaining
the date and short activity title. Mobile continues to use square cells with a
44px minimum target.

## Why

Square cells expanded with the seven-column desktop grid, creating far more
vertical space than the contained type required.

## Alternative considered

Reducing the calendar width would leave unused workspace and make activity
titles harder to scan. Compact row heights preserve the useful wide layout.

## Follow-ups

Revisit the 68px desktop density if multi-line activity titles are introduced.
