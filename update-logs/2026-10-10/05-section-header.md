# SectionHeader primitive

## What changed

Added `SectionHeader`, which composes the existing `Heading` and `Text` primitives. It accepts a required `heading`, optional `description`, semantic heading tag, and the approved `start` or `center` alignment. Added isolated Storybook examples for short content, long content, no description, and centered content.

## Why

Calendar sections need a repeatable heading group without reimplementing approved typography. The component owns only grouping, alignment, and the shared `--space-3` gap.

## Alternative considered

Adding heading and paragraph styles directly to the component would have made it easier to tune locally, but would duplicate token-backed typography and drift from the existing primitives.

## Follow-ups

Use `start` alignment for calendar and list sections. Reserve `center` for standalone contexts where the surrounding layout already calls for it.
