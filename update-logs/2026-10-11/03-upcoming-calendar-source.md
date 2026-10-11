# Sync upcoming activities with Learning Calendar

## What changed

Updated the active page so `Upcoming activities` and `Learning Calendar` read
from the same `activities` source. The upcoming list now sorts sessions by date,
shows the nearest two by default, and expands the remaining scheduled courses
below the list with an `Explore more` action.

## Why

The former three-card slice made part of the calendar catalogue inaccessible
from the upcoming area and could diverge as activities changed.

## Alternative considered

Filtering upcoming cards by the month currently open in the calendar would hide
the nearest future course when a user browsed another month. A date-sorted list
keeps the purpose of an upcoming section clear while sharing the same source.

## Follow-ups

When a real service replaces browser mock data, keep both components connected
to one selector or query result.
