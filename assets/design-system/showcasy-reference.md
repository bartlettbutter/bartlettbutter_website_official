# Showcasy Design System Reference
## Adapted for Bartlett Butter

Source: Showcasy by Pixeflow (https://showcasy.webflow.io)

---

## Colors (Neutral Palette)

| Token | Hex       | Usage                          |
|-------|-----------|--------------------------------|
| 0     | #FFFFFF   | Background, cards              |
| 10    | #F9FAFB   | Subtle background, hover       |
| 20    | #E5E7EB   | Borders, dividers              |
| 30    | #D1D5DB   | Disabled states                |
| 40    | #AEB2BA   | Placeholder text               |
| 50    | #6B7280   | Muted/secondary text           |
| 60    | #4B5563   | Body text                      |
| 70    | #374151   | Emphasis text                  |
| 80    | #1F2937   | Headings, strong text          |
| 90    | #111827   | Panel backgrounds (dark)       |
| 100   | #030712   | Maximum contrast               |

---

## Typography

**Font Family:** Inter Tight (Google Fonts)
- Weights: Regular (400), Medium (500), SemiBold (600), Bold (700)

### Desktop Headings
| Level | Weight   | Size   | Line Height |
|-------|----------|--------|-------------|
| H1    | SemiBold | 104px  | 100%        |
| H2    | SemiBold | 72px   | 100%        |
| H3    | SemiBold | 64px   | 100%        |
| H4    | SemiBold | 56px   | 100%        |
| H5    | SemiBold | 40px   | 100%        |
| H6    | SemiBold | 32px   | 100%        |

### Mobile Headings
| Level | Weight   | Size   | Line Height |
|-------|----------|--------|-------------|
| H1    | Bold     | 64px   | 100%        |
| H2    | SemiBold | 56px   | 100%        |
| H3    | SemiBold | 48px   | 100%        |
| H4    | SemiBold | 40px   | 100%        |
| H5    | SemiBold | 32px   | 100%        |
| H6    | SemiBold | 28px   | 100%        |

### Body Text
| Variant        | Weight  | Size | Line Height |
|----------------|---------|------|-------------|
| Extra-Large    | Regular | 28px | 28px        |
| Large          | Regular | 22px | 26px        |
| Medium (Base)  | Regular | 18px | 26px        |
| Semi-Large     | Regular | 16px | 24px        |
| Small          | Regular | 14px | 22px        |
| Caption        | Regular | 12px | 20px        |

---

## Spacing Scale

4px, 8px, 12px, 16px, 24px, 32px, 40px, 48px, 56px, 64px, 72px, 80px

---

## Layout

- **Grid:** 2-column, 3-column, 4-column, 2:1 and 1:2 asymmetric
- **Max content width:** ~1200px (centered)
- **Section padding:** 80px vertical (desktop), 48px (mobile)
- **Component gaps:** 24px–32px

---

## Components (Pattern Library)

### Navigation
- Fixed top, minimal
- Logo left, nav links right
- "Let's Talk" CTA button (pill/rounded)
- Dark menu toggle for mobile

### Hero Section
- Small label text (uppercase, caption size)
- Large heading (H1, semibold)
- Subtitle paragraph (body-large, muted)
- CTA button

### Work/Project Cards
- Large image thumbnails
- Project title below image
- Category/tag labels
- Hover: subtle opacity or scale transition

### About Section
- Section label (uppercase, small, muted)
- Large descriptive heading
- Body text
- Skill/capability pills/tags

### Footer
- Dark background (#111827)
- Logo + tagline
- Social links
- Page navigation columns
- Copyright

### Buttons
- Primary: Dark fill (#111827), white text, rounded corners
- Secondary: Outlined, dark border, dark text
- Text links: Underlined with hover opacity

---

## Animations & Transitions

- Hover opacity: 0.6–0.8
- Panel slides: cubic-bezier(0.0, 0, 0.2, 1) ~500ms
- Scroll-triggered fade-in for sections
- Subtle scale on card hover (1.02)

---

## Adaptation Notes for Bartlett Butter

1. Keep Inter Tight as the font (upgrade from Inter)
2. Use the neutral grayscale palette — no accent colors
3. Adopt the spacing scale for consistency
4. Replace slide-in panels with full-page sections (better UX for a multi-app studio)
5. Keep the dark info panel as a footer/about section
6. Cards adapted for app icons rather than large project images
7. Maintain privacy-first, no-nonsense tone in all copy
