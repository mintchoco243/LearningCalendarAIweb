# Agentation widget

## What changed

Installed `agentation` as a development dependency. Rendered its widget from
the application root and from the global Storybook decorator, each protected by
the Vite development environment check.

## Why

The feedback widget must be available throughout the prototype and in every
component story without shipping in a production build.

## Alternative considered

Adding the widget to individual pages or stories would leave coverage gaps and
duplicate setup. Root-level rendering covers both surfaces consistently.

## Follow-ups

No MCP server or endpoint was configured. Add integration only when external
annotation syncing is explicitly requested.
