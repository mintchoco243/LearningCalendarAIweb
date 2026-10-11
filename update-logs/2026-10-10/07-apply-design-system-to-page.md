# Apply approved design system to the page

## What changed

Connected the Storybook primitives to the running React application through `CalendarApp`. The site now uses the approved Hero, Button, Heading, Text, and SectionHeader components; token-based dark canvas and surfaces; outline-led activity cards and calendar months; and responsive calendar, overview, and registration layouts. The activity detail dialog was also restyled with the shared token system.

## Why

The earlier component work was isolated in Storybook by request. This change makes the approved DESIGN.md direction visible in the local application while preserving calendar browsing, details, and browser-memory registration state.

## Alternative considered

Keeping the original light page and using the new components only in Storybook would leave the implementation inconsistent with the approved design direction.

## Follow-ups

Replace the abstract Hero visual only when an approved trainer or event image is supplied.
