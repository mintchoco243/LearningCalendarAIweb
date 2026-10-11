# Back-to-top icon button

## What changed

Added a fixed ArrowUp icon button that scrolls the active page smoothly to the
top. Added an isolated Storybook story for the same component.

## Why

The prototype has expanding course lists and a calendar below the fold, so a
persistent return-to-top action shortens navigation.

## Alternative considered

An inline text link would disappear with the footer and require more reading.
The icon button stays in a predictable lower-right position with an accessible
name.

## Follow-ups

The button sits above the bottom corner to avoid overlapping Agentation during
development. Revisit the offset if another persistent bottom-right tool is
added.
