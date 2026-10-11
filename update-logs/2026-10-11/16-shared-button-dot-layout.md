# 16 — Shared button dot layout

**What:** Kept the red hover fill but moved the red dot, label, and optional arrow into one flex row in the shared interactive button. Disabled buttons use a muted dot and no hover fill. Removed the Previous-month-only positioning override.

**Why:** Percentage-based absolute dot positioning and duplicated sliding labels caused the dot to sit too far right or overlap text on buttons of different widths. The design-system spacing token now provides a consistent gap across every button using this primitive.

**Alternative considered:** Adjusting each button's absolute dot offset was rejected because it would repeat the same fragile positioning problem at other widths.

**Follow-ups:** None. Production build and browser spacing checks passed at 1920×900, 1137×1146, and 390×844; the long registration button also stayed within its bounds.
