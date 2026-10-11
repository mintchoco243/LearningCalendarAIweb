# Activity date format

## What changed

Added a shared activity-date formatter and changed Activity Cards and Activity
Detail to display dates as `DD-MMM-YY`, for example `10-Feb-27`.

## Why

The prior ISO date exposed implementation-oriented formatting to staff and did
not match the requested compact schedule notation.

## Alternative considered

Formatting dates separately inside each component would risk different date
formats between card and detail views. Both now call the same formatter.

## Follow-ups

Use this formatter for any future compact activity date display.
