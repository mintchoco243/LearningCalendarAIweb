# Restore readable theme and add registration confirmation

## What changed

Restored the shared Inter and JetBrains Mono typography and the earlier restrained red theme tokens. Kept the pixel calendar layout, wireframe surfaces, and scanline treatment. Added a shared RegistrationConfirmation component with registered and cancelled stories; the live site shows it after either registration action.

## Why

Source Code Pro at every weight made the staff-facing interface too dense, while the hot-pink accent departed from the approved red direction. Registration changes also needed explicit feedback.

## Alternative considered

Using a transient toast would require more timing and focus rules. The confirmation popup gives a clear acknowledgement and works in Storybook and the application from the same source.

## Follow-ups

Use the confirmation component for future failed-registration messages if an availability state is introduced.
