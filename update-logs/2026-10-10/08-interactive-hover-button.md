# Interactive hover button

## What changed

Installed `lucide-react`, added `src/components/ui/interactive-hover-button.jsx`, a Storybook story, and used the component for the Hero primary action. The button keeps the requested reveal animation while taking colour, focus, sizing, and disabled values from the shared theme.

## Setup notes

The repository already supports React, Vite, and Tailwind CSS. It does not use TypeScript or shadcn: there is no `tsconfig.json`, `components.json`, `@/` alias, or `cn` utility. The requested component is therefore implemented as JSX with a local class-name joiner and relative import paths. `src/components/ui/` separates imported UI primitives from the product-specific components in `src/components/`.

To migrate the project to shadcn and TypeScript later, initialise shadcn with `npx shadcn@latest init`, choose the Vite and TypeScript settings, then configure its component alias to `src/components/ui` and migrate JavaScript files incrementally. This integration does not require that migration.

## Alternative considered

Keeping the Hero on the standard Button would preserve its rectangular shape but would leave the requested component isolated from the site.

## Follow-ups

Use this button for one primary action in a local action group. The existing standard Button remains available for dense calendar controls and secondary actions.
