# Registration confirmation and outcome flow

## What changed

Added a registration action confirmation dialog. Register and cancel now first
ask for confirmation. Only after that confirmation does local registration state
change and the existing outcome dialog show `Registration successful` or
`Cancellation successful`.

Added Storybook stories for both confirmation actions and updated the existing
outcome copy.

## Why

The prototype needed a distinct decision step and a separate acknowledgement
after the action completes.

## Alternative considered

Reusing the outcome dialog as the confirmation prompt would overload one
component with two states and make the action result ambiguous.

## Follow-ups

Connect the outcome state to a real request result if the prototype later gains
a backend.
