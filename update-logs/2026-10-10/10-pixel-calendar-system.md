# Pixel calendar system and Storybook parity

## What changed

Updated shared tokens and DESIGN.md to use the Kippo-inspired pixel arcade system: Source Code Pro, black canvas, white wireframe outlines, and hot-pink action treatment. Added a single-month `LearningCalendar`, `RegistrationDialog`, and ActivityDetail stories. The running app imports these source components, opens activity detail from event days, and opens RegistrationForm in a popup before storing the registration in browser memory.

## Storybook parity

Storybook stories import the same component source files as the app; component styles live beside those source files. Changing a component or its shared tokens updates both products. Story args remain examples only and do not change production content. The deprecated CalendarMonth story is excluded from Storybook and the site no longer imports CalendarMonth.

## Alternative considered

Keeping a yearly grid would preserve more dates on screen but conflicts with the requested month-navigation interaction and makes individual event titles unreadable.

## Follow-ups

Retire the unused CalendarMonth source in a future cleanup after confirming no external consumer imports it.
