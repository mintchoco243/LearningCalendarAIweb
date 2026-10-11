# 17 — Restore registration on confirmation Back

**What:** Split the confirmation dialog's Back behavior from its close behavior. Back now reopens the preceding registration form with the submitted name, email, and trainer question restored. For cancellation confirmation, Back reopens the relevant activity detail. A missing draft is normalized to an empty form on first open.

**Why:** The registration form was unmounted before confirmation and the Back button only dismissed confirmation, which returned users to the main page and discarded their input.

**Alternative considered:** Keeping both popups mounted behind one another was rejected because stacked modal dialogs create confusing focus and accessibility behavior.

**Follow-ups:** None.
