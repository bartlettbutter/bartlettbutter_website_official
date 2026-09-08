# Bartlett Butter App Marketing System

This document defines the reusable marketing-page system now used by the bespoke `FormuLens` and `Journeyfolio` layouts. It sits on top of the shared Bartlett Butter chrome in `_layouts/default.html`.

## 1. Global Frame

- Keep the Bartlett Butter sticky header and global footer on every app page.
- Keep the app header between them as the app-local frame:
  - icon
  - app name
  - short description
  - primary App Store CTA on marketing pages
  - secondary app nav: `Overview`, `Support`, `Privacy`
- Keep page content inside the centered `content-body`, but allow premium marketing sections to break into full-width bands with negative margins.

## 2. Theme Token Model

Shared app tokens live in `assets/css/app-themes.css`.

- `--app-accent`: vivid brand color for fills, small highlights, hover states
- `--app-accent-rgb`: RGB channel form used for translucent overlays
- `--app-accent-strong`: highest-contrast brand color for display text and buttons
- `--app-accent-strong-rgb`: RGB channel form used for dark overlays
- `--app-accent-soft`: pale tint for surfaces and soft bands
- `--app-highlight`: warm or luminous secondary note inside a page theme
- `--app-header-bg`: shared app-header wash
- `--app-ambient`: default full-band marketing background
- `--app-card-shadow`: shadow profile for cards within that app theme
- `--app-display-font`: display face for headings inside that app
- `--app-display-weight`: default display weight for premium marketing typography

Per-app guidance:

- `FormuLens`: clinical gloss, magenta-to-maroon energy, precise surfaces, sharper contrast.
- `Journeyfolio`: editorial blue with warm ticket-light highlights, serif display, roomier pacing.

## 3. Marketing Page Architecture

Recommended order for an app overview page:

1. Hero headline and lead
2. Hero screenshot gallery
3. Value chips plus quick stats
4. Store CTA row
5. Screenshot showcase / product walkthrough
6. Feature deep-dive band
7. Product architecture band
8. Onboarding flow band
9. Pricing or offer band
10. Final CTA band linking to support and privacy

The architecture is intentionally modular. Not every app needs every module, but each module should render from the same structural vocabulary.

## 4. Shared Marketing Components

Shared styles live in `assets/css/marketing.css`.

- `marketing-chip-row` / `marketing-chip`
  - short proof points near the top of the page
- `marketing-stat-grid` / `marketing-stat`
  - conversion-focused metrics or positioning statements
- `marketing-band`
  - full-width section shell with ambient background
- `marketing-band--plain`
  - quieter variation for alternating rhythm
- `marketing-section-head`
  - eyebrow, section title, intro copy
- `marketing-card-grid`
  - supports 2, 3, or 4-up card layouts
- `marketing-card`
  - feature, release-note, or deep-dive card
- `marketing-step-grid` / `marketing-step`
  - onboarding or workflow storytelling with numbered steps
- `marketing-story-grid` / `marketing-story-card`
  - audience, persona, or library/collection narratives
- `marketing-price-grid` / `marketing-price-card`
  - single-tier or multi-tier pricing and offer presentation
- `marketing-cta-panel`
  - final conversion block with support/privacy paths

## 5. Typography Rules

- Use the site sans by default for body copy and utility UI.
- Route display typography through `--app-display-font`.
- Section titles should feel larger and more editorial than support/privacy headings.
- Keep eyebrow labels uppercase and compact.
- Body copy stays readable and calm; avoid compressed dense paragraphs.

## 6. Interaction and Accessibility

- All primary interactive targets remain at or above 44px minimum height.
- Cards use subtle lift only on pointer hover; content remains fully visible without motion.
- Scroll reveals are progressive enhancement only.
- Focus states use visible outlines tied to each app's accent tokens.
- Color usage must preserve contrast on white and tinted surfaces.

## 7. Extending to More Apps

- Add or refine the app token set in `app-themes.css`.
- Create an app-scoped stylesheet in `assets/css/apps/` only when the shared marketing modules are not enough.
- Prefer composing existing marketing modules before inventing app-specific one-off structures.
- Keep the shared Bartlett Butter frame untouched unless the change benefits all app pages.
