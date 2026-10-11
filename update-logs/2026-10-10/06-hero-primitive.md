# Hero primitive

## What changed

Added a reusable `Hero` composed from `SectionHeader`, `Button`, and shared theme tokens. It receives heading, description, action label, action handler, period label, and an optional approved image source with alt text. Without an image source, it renders the approved abstract schedule graphic. Added desktop, narrow, and long-content Storybook examples.

## Reference decisions

- Borrowed the two-column orientation layout, dark surface, outline-led structure, one primary action, and faint hero-only grid texture.
- Adapted the reference accent to `--ld-action`, the type to the approved readable sans-plus-mono pairing, and imagery to an abstract schedule graphic or a supplied approved image.
- Excluded the phone mockup, QR/store badges, two-tone all-caps headline, profile-card stack, stock lifestyle imagery, shadows, and large decorative gradients.

## Why

The hero orients staff before the calendar while keeping the schedule workspace as the product's focus. It exposes content and image data without turning visual treatment into caller-controlled styling.

## Alternative considered

Using a full-bleed photographic banner would have made image replacement easier, but conflicts with the approved image treatment and would compete with calendar information.

## Follow-ups

Use only supplied and approved trainer or event imagery through `imageSrc`; otherwise retain the abstract default.
