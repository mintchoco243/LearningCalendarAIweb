# Red-surface text and calendar controls

## What changed

Changed the interactive hover button's red hover state to use the shared white
text token. Learning Calendar event days now retain white text and make both
the day and activity title bold on hover. Removed the static chevrons and the
hover arrow from Previous and Next controls only.

The legacy CalendarMonth selected-state and shared primary-button rules now
also use white text on the red action background.

## Why

Black text on the approved red accent broke the intended visual treatment and
reduced consistency between app and Storybook previews.

## Alternative considered

Changing the red token to a lighter colour would not guarantee a durable text
contrast rule across components. The shared foreground token applies the rule
at each red surface.

## Follow-ups

Apply the same foreground pairing to any future red status component.
