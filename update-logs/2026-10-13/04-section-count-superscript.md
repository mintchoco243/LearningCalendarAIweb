# Section count superscript marker

## What changed

- Reworked the shared SectionHeader count badge into a number-only marker.
- Raised the compact red badge above the title baseline so it reads as a supporting count rather than title text.
- Kept the contextual count label available as an accessibility label without rendering additional text.

## Why

The approved direction prioritises a concise layout: the visual count should be recognisable as a badge but should not add explanatory UI copy.

## Alternative considered

The earlier badge with a visible label made the metric explicit, but added text the user did not want. A detached corner badge was also considered, but weakens the link to its section title.

## Follow-up

- Storybook and application builds pass.
- Browser QA at 1703 x 723 confirms the marker is 5px above the title top and there is no horizontal overflow.
