# 18 — Completed course state

**What:** Added a date-based completed state for activities before the current date in Vietnam time. Completed activities remain visible on the calendar with a `Done` label and check icon, while upcoming and current-month availability exclude them. My Learning now includes only registered activities; a registered past activity renders as a subdued Done card. An extra past unregistered mock course demonstrates the calendar-only case. Its detail remains readable but uses a disabled `Completed` action without hover animation.

**Why:** A completed course must remain available as learning history without competing with upcoming opportunities or looking like an active registration.

**Alternative considered:** Maintaining a separate manual completed-ID list was rejected because a course's completion treatment should follow its past event date, while My Learning membership must still depend on registration.

**Follow-ups:** None.
