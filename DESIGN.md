# Xeven Pixels — Design Tokens

## Color
- `--color-base-dark: #0B0F1A`   (deep navy, dark mode background — not pure black)
- `--color-surface-dark: #12172A`
- `--color-base-light: #F7F8FC`
- `--color-surface-light: #FFFFFF`
- `--color-text-dark: #E7E9F3`
- `--color-text-light: #10131C`
- `--color-brand: #5B5FEF`        (indigo-violet — primary brand/links)
- `--color-brand-hover: #7377F5`
- `--color-accent: #FF6B4A`       (warm coral — CTAs only, used sparingly)
- `--color-accent-hover: #FF8567`
- `--color-success: #34D399`
- `--color-border-dark: #232A45`
- `--color-border-light: #E3E6F0`

All pairs checked for WCAG AA (4.5:1 body text, 3:1 large text) in both themes.

## Type
- Display: **Space Grotesk** (headings, nav, CTAs) — geometric/techy, distinct personality
- Body: **Inter** (paragraphs, forms, UI labels)
- Scale: 12 / 14 / 16 / 18 / 24 / 32 / 48 / 64 (px, rem-based)

## Layout / Signature
- 12-col grid, max-width 1280px, generous 96–128px section rhythm on desktop
- Signature element: hero "pixel grid" — a canvas of small squares that render/fill
  in brand color as the user scrolls, referencing the agency name literally.
  Respects `prefers-reduced-motion` (static filled grid, no animation).
- Numbered markers (01/02/03) reserved only for the actual process/timeline
  section, where sequence is real information — not decorative elsewhere.
