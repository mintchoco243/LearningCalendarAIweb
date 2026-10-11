# Registration form component

## What changed

Added a reusable Storybook registration form with required Name and Email fields, an optional question textarea, and a Register submit action. It reuses Heading, Text, Button, and shared token styles.

## Why

The course registration flow needs a focused, accessible form that can be reviewed independently before it is connected to the activity detail interaction.

## Alternative considered

Putting the fields directly inside the activity detail dialog would make the initial prototype faster to assemble, but would prevent isolated Storybook review and reuse.

## Follow-ups

Connect the form's `onSubmit` callback to the browser-memory registration state when the registration flow is ready to replace the current single-button action.
