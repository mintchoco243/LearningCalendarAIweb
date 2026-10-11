# L&D Activities Calendar — Requirements

## Outcome

Create a one-page React prototype for Garena staff to view Learning &
Development activities throughout a year and manage prototype registrations.

## Primary action

Browse a yearly calendar to identify upcoming activities and see each activity's
date, time, location, title, trainer, and short description.

## Secondary actions

- Open an activity to view its full description, skills developed, and trainer
  profile.
- Register for or cancel a registration from an activity.
- Review registered activities in a personal registrations section, including completed courses only when the user was registered.
- Distinguish past courses as completed in the calendar; completed courses are not shown in upcoming activities.

## Constraints and non-goals

- Frontend only, built with React, Vite, Tailwind CSS, and Storybook.
- Use static mock data and browser-memory state only.
- Do not add authentication, payments, a CMS, a database, backend APIs, or
  persistent storage.

## Success criteria

- The page runs locally.
- A user can browse activities by year, month, and selected day.
- Activity cards expose the requested summary fields.
- A detail view exposes the requested extended content.
- Registration and cancellation update the personal registrations view during
  the browser session.
