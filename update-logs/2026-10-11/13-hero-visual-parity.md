# 13 — Hero visual parity and interaction correction

**What:** Reworked the skill-path scene with restrained terrain layers, platform-shaped nodes, and a stronger focused Build node. Removed the hero-wide hover animation.

**Why:** The first implementation reduced the approved concept to a flat route diagram. Its hover response made a decorative visual appear clickable while providing no meaningful action.

**Alternative considered:** Retaining node-specific hover states was considered, but removed because the hero has one actual action — `Explore calendar` — and the decorative nodes should not create a competing click expectation.

**Follow-ups:** Review browser rendering against the approved mockup before introducing optional media or more elaborate terrain texture.
