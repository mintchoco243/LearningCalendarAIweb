# Architecture

## Stack

- React with Vite for the single-page application.
- Tailwind CSS for styling.
- Storybook for isolated component examples.

## Source layout

- `src/data/activities.js` contains static training data.
- `src/components/` contains reusable UI components.
- `src/App.jsx` coordinates selection and in-memory registrations.
- `stories/` contains component stories.

## UI boundaries

The app is browser-only. Registration state lives in React state and resets on
page refresh. Activity data is static and has no API layer.
