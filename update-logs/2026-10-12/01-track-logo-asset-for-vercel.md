# Track logo asset for Vercel

## What changed

- Moved the Garena logo import from an untracked local folder into the tracked
  `src/assets/` directory.

## Why

Vercel checks out only Git-tracked files. The previous local-only import caused
the production build to fail when the logo was unavailable in its checkout.

## Alternative considered

Committing the existing top-level `LearningAIweb/` folder would work, but it
would keep a project asset outside the application asset location. Keeping the
asset in `src/assets/` follows the current source map.

## Follow-up

- Verify the Git-triggered Vercel deployment after pushing this fix.
