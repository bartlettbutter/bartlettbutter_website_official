# LinkHQ Localization & Convention Audit

**Repository:** `/Volumes/Workplace_Dev/Apps_Sharing/bartlettbutter_website_official` (branch `main`)
**Scope:** The newly-added LinkHQ app pages (45 markdown files across marketing/support/privacy × 15 locales) plus all shared wiring (layouts, `_data`, CSS, icon).
**Method:** READ-ONLY. No build (no Gemfile; GitHub Pages builds server-side). Verified via file reads, YAML front-matter parsing (`ruby -ryaml`), and grep/diff. Comparison baselines: **sayminder** (placeholder-screenshot template, primary structural comparison) and **solcast** (convention reference).

---

## Overall result: **PASS**

LinkHQ is correctly built on the placeholder path, structurally aligned with sayminder, and all 14 translated locales are consistent with the English source. No rendering-breaking, link-breaking, missing-file, or wrong-layout issues were found. Every per-locale check passed.

### Issue counts by severity

| Severity | Count | Summary |
|----------|-------|---------|
| **High** (broken rendering/links/missing files/wrong layout) | **0** | — |
| **Medium** (convention mismatch vs other apps) | **0** | — |
| **Low** (cosmetic / informational) | **2** | (L1) `app_store_url` omits the app-name slug segment that sayminder uses; (L2) linkhq omits the optional `--app-display-font` / `--app-display-weight` theme tokens that sayminder/journeyfolio define. Both are consistent with the majority convention (solcast) and are not defects. |

### Section verdicts

| Section | Check | Verdict |
|---------|-------|---------|
| A | File-set completeness | **PASS** |
| B | Front-matter alignment | **PASS** |
| C | Body / content structural alignment | **PASS** |
| D | Support & privacy alignment | **PASS** |
| E | Shared wiring / settings parity | **PASS** |
| F | Duplicate-permalink safety | **PASS** |

---

## A. File-set completeness — PASS

- LinkHQ has exactly **45** md files: 15 in each of `marketing-url`, `support-url`, `privacy-policies`. ✅
- Locale set per section is **byte-identical** to sayminder AND to solcast (`diff` returned IDENTICAL for all three sections). ✅
- The 15 locales are present everywhere: `ar, de, en, es, fr, hi, it, ja, ko, nl, pt, ru, tr, zh-Hans, zh-Hant`. No missing or extra locale. ✅

---

## B. Front-matter alignment — PASS

### Key set & order (vs `apps/linkhq/marketing-url/en.md` and vs sayminder)

- **Marketing** non-en key order: `layout, title, app_icon, app_description, app_store_url, lang, permalink, redirect_from` — identical to sayminder's non-en marketing order. en omits `lang` (order: `layout, title, app_icon, app_description, app_store_url, permalink, redirect_from`). ✅
- **Support / Privacy** key order: `layout, title, app_icon, app_description, lang, permalink, redirect_from` (en omits `lang`) — identical to sayminder's support/privacy key set. ✅

### Specific value checks (all 15 marketing files unless noted)

| Check | Result |
|-------|--------|
| `layout: app-linkhq` on all 15 marketing | ✅ |
| `layout: default` on all 15 support + all 15 privacy | ✅ |
| `app_icon: /assets/app-icons/icon_LinkHQ.png` identical across all marketing | ✅ |
| `app_store_url` identical across all marketing (`https://apps.apple.com/app/id0000000000`) | ✅ same placeholder everywhere |
| en files carry **no** `lang:` key | ✅ (all three sections) |
| every non-en file has `lang: <code>` matching filename | ✅ (42/42 non-en files) |
| `title: LinkHQ` across all locales (name not translated) | ✅ (all 45 files) |

### Permalink / redirect_from pattern (shape vs sayminder)

LinkHQ's pattern is **byte-identical in shape** to sayminder's:

| | en | non-en (e.g. `de`) |
|---|---|---|
| marketing permalink | `/linkhq/` | `/linkhq/de/` |
| marketing redirect_from | `/marketing-url/linkhq/` | `/marketing-url/linkhq/de/` |
| support permalink | `/linkhq/support/` | `/linkhq/support/de/` |
| support redirect_from | `/support-url/linkhq/` | `/support-url/linkhq/de/` |
| privacy permalink | `/linkhq/privacy/` | `/linkhq/privacy/de/` |
| privacy redirect_from | `/privacy-policies/linkhq/` | `/privacy-policies/linkhq/de/` |

Trailing slashes present everywhere; sayminder uses the exact same `<app>/<section>/<code>/` shape. ✅

### Low-severity note (L1)

- **File:** all `apps/linkhq/marketing-url/*.md`, front-matter key `app_store_url`.
- **Observation:** LinkHQ uses `https://apps.apple.com/app/id0000000000` (no app-name slug), whereas sayminder uses `https://apps.apple.com/app/sayminder/id0000000000` (with slug). Across all apps the format is inconsistent anyway (barkpedia/etfwise/solcast use `/us/app/<name>/id…`; huepick uses `/app/huepick`; trafficvibe is empty). The placeholder id `id0000000000` is expected for an unlaunched app and is **identical across all 15 LinkHQ locales**, which is what the brief requires. Severity Low / informational only — update the slug when the real App Store id is assigned.

---

## C. Body / content structural alignment — PASS

### Block counts & order (each non-en marketing vs en.md)

All 15 marketing files have identical structural block counts and ordering:

| Block | Count (every locale) |
|-------|----------------------|
| `.marketing-shot-placeholder` (children of placeholder-grid) | 3 |
| `.marketing-chip` | 4 |
| `.marketing-stat` | 3 |
| `<section class="marketing-band"` | 4 |
| `.marketing-cta-panel` | 1 |

- **Hero cluster precedes first `marketing-band` in all 15 locales** (the `.marketing-cta-row` closing the hero appears before the first band line in every file). This is required for the layout's else-branch hero-shell split. ✅
- Five section anchors present in all 15 marketing files: `lk-why-title`, `lk-arch-title`, `lk-flow-title`, `lk-audience-title`, `lk-next-title` (each appears twice per file: once as `aria-labelledby`, once as the heading `id`). ✅

### Structural attribute identity (classes / ids / href / src / alt / aria-labelledby)

Extracted and sorted every `class=/id=/href=/src=/alt=/aria-labelledby=` attribute per file and diffed each non-en locale against en. **The ONLY differences in every locale** are the two expected in-body links:

```
en:    href="/linkhq/privacy/"      href="/linkhq/support/"
<lang>: href="/linkhq/privacy/<lang>/"  href="/linkhq/support/<lang>/"
```

All CSS class names, anchor ids, img `src`, badge SVG path (`/assets/badges/download-on-the-app-store.svg`), badge `alt` ("Download on the App Store"), and the App Store `href` (`https://apps.apple.com/app/id0000000000`) are **byte-identical** across all locales. No class renamed, no href changed, no structural attribute altered. ✅

### In-body support/privacy link suffixing

- en: un-suffixed (`/linkhq/support/`, `/linkhq/privacy/`). ✅
- All 14 non-en: suffixed with the locale code, matching the permalink pattern. ✅ (verified per locale)

### Translation spot-checks

- **h1** of all 15 marketing files is genuinely translated into the target language (e.g. `ar` = «احتفظ بالأشياء التي تستحق العودة إليها.», `ja` = 「また戻ってきたいものを、とっておく。」, `ru` = «Храните то, к чему стоит возвращаться.»). ✅
- **Lead paragraph** translated (verified `ar`, `ja`, `ru`). ✅
- Product name **`LinkHQ` preserved untranslated** — appears exactly **14 times in every locale** (identical count), confirming it is never localized. ✅
- **`The Quiet Current`** does not appear anywhere in LinkHQ content; nothing to mistranslate. ✅
- The only English residue in non-en marketing bodies is the Apple App Store badge filename/alt (`download-on-the-app-store.svg` / "Download on the App Store"), which is Apple's official badge and must stay English and identical across locales. ✅

### Style rules

- **No em dashes (`—`)** anywhere in LinkHQ content. ✅
- **No spaced en dashes (` – `)** used as breaks. ✅
- **No manual `dir=` attribute** anywhere in LinkHQ content (ar relies on `lang=ar`). ✅

---

## D. Support & privacy page alignment — PASS

### Support (all 15 locales)

- Same front-matter key set as `apps/linkhq/support-url/en.md` and as sayminder's support pages. ✅
- `app_description` is the **localized equivalent of "Support"** per locale (en=`Support`, es=`Soporte`, fr=`Assistance`, de=`Support`, ja=`サポート`, ar=`الدعم`, ru=`Поддержка`, zh-Hans=`支持`, zh-Hant=`支援`, …). ✅
- Body structure identical across all 15: **h1=1, h2=5, h3=21**, exactly 1 `mailto:` link. ✅
- h1 translated per locale (e.g. en="How can we help?", de="Wie können wir helfen?", ja="どんなことでお手伝いできますか？"). ✅
- In-body privacy link correctly locale-suffixed (`/linkhq/privacy/<code>/` for non-en, `/linkhq/privacy/` for en). ✅

### Privacy (all 15 locales)

- Same front-matter key set as `apps/linkhq/privacy-policies/en.md` and as sayminder's privacy pages. ✅
- `app_description` is the **localized equivalent of "Privacy Policy"** per locale (en=`Privacy Policy`, de=`Datenschutzerklärung`, fr=`Politique de confidentialité`, ja=`プライバシーポリシー`, ko=`개인정보 처리방침`, ar=`سياسة الخصوصية`, …). ✅
- Body structure identical across all 15: **h2=13, h3=3, 17 table rows**, exactly 1 `mailto:` link. ✅
- **Effective date identical across all 15 locales: March 3, 2026** (localized label/format per language, same date). ✅
- "The Short Version" English heading appears only in en.md → the heading is translated in every other locale. ✅

### Contact convention

- Contact email is **`contact@bartlettbutter.com`** everywhere — the ONLY email string found anywhere in `apps/linkhq/` (grep of all email-shaped tokens returned exactly one unique value). This matches the convention used by sayminder/solcast (same address in their CTA/support/privacy). ✅

### Structural count vs sayminder (informational)

LinkHQ's own counts differ slightly from sayminder's (support h3 21 vs 22; privacy h2 13 vs 12, rows 17 vs 15) because the body copy differs per app. The brief only requires LinkHQ **internal** consistency across its 15 locales + the same front-matter key set + the same page shape, all of which pass. Not a defect.

---

## E. Shared wiring / settings parity — PASS

### `_data/translations.yml`

- `linkhq` appears exactly **3 times** — once under `marketing` (line 19), `support` (line 31), `privacy` (line 43). ✅
- **Alpha-ordered** in all three lists: `…journeyfolio, linkhq, nekopedia, sayminder, solcast, trafficvibe` — same placement as the other apps. ✅

### `_data/app_slogans.yml`

- A `linkhq:` block exists with **all 15 locales**, each having `marketing / support / privacy` sub-keys — the exact same shape as sayminder and solcast (confirmed uniq sub-key set `["marketing","privacy","support"]` for all three apps, all 15 locales). ✅
- Slogans are populated and translated (en marketing="Keep the things worth returning to"; ar marketing="احتفظ بما يستحق العودة إليه"). ✅
- *Note:* the top-level app ordering in this file is not alphabetical for any app (solcast/sayminder are last); `linkhq`'s position is consistent with the file's own existing (non-alpha) convention. Not a defect.

### `_layouts/default.html`

- Exactly **one** `{%- when "linkhq" -%}` theme-color case (line 74, `#125877`). ✅
- Exactly **one** per-app CSS `<link>` line (line 158): `{% if section == "marketing" and app_slug == "linkhq" %}<link rel="stylesheet" href="/assets/css/apps/linkhq.css">{% endif %}` — formatted identically to the other apps' lines. ✅

### `_layouts/home.html`

- Exactly **one** LinkHQ work-card (line 194) and **one** LinkHQ footer-app-icon (line 288). ✅
- Markup shape matches the other apps exactly: work-card has `data-app-name="LinkHQ"`, `aria-label="{{ t.open_app_prefix }} LinkHQ {{ t.open_app_suffix }}"`, inner `<img … width="104" height="104" loading="lazy">`; footer icon has `width="36" height="36" loading="lazy"`. ✅
- **Position: LinkHQ is LAST (right end)** in both the works-grid (after sayminder) and the footer icon row — matching the user's explicit request that LinkHQ show at the right end as the latest app. ✅

### `_layouts/app-linkhq.html` vs `_layouts/app-sayminder.html`

Structurally **identical**. The only differences are exactly the three expected ones:

| Aspect | app-linkhq | app-sayminder |
|--------|-----------|---------------|
| data slug | `site.data.apps.linkhq` | `site.data.apps.sayminder` |
| wrapper class | `.lk-page` | `.sy-page` |
| variant string | `variant="lk"` | `variant="sy"` |

- The `if`-branch (showcase/gallery injection at `<!--showcase-->` / `<!--gallery-->` markers) is present and identical. ✅
- The **else-branch split-on-`<section class="marketing-band"` + wrap `m_body[0]` in `.marketing-hero-shell`** (then `remove_first` for the bands) is present and matches sayminder line-for-line. ✅

### `assets/css/app-themes.css`

- A `[data-app="linkhq"]` block exists (line 162) with **9 custom-property tokens** including the `-rgb` triples: `--app-accent`, `--app-accent-rgb`, `--app-accent-strong`, `--app-accent-strong-rgb`, `--app-accent-soft`, `--app-highlight`, `--app-header-bg`, `--app-ambient`, `--app-card-shadow`. ✅
- This token set is **identical to solcast's** (9 tokens, zero diff both directions) — the standard baseline shared by 8 of 10 apps. ✅

#### Low-severity note (L2)

- **File:** `assets/css/app-themes.css`, `[data-app="linkhq"]` block.
- **Observation:** sayminder (and journeyfolio) additionally define `--app-display-font` and `--app-display-weight`; linkhq does not. However, these two tokens are **optional** — only 2 of 10 apps define them. The other 8 (barkpedia, etfwise, huepick, nekopedia, solcast, trafficvibe, + linkhq) use the 9-token baseline. LinkHQ's set exactly matches solcast's, so this is a legitimate per-app typographic choice (default display font vs sayminder's serif), not a missing-token defect. Severity Low / informational.

### `assets/css/apps/linkhq.css`

- **Scoped to `.lk-page`** (all page-level rules carry the `.lk-page` prefix; `.app-showcase--lk` / `.hero-gallery--lk` are variant-namespaced, mirroring sayminder's `--sy` variant selectors). ✅
- `.lk-page .marketing-hero-shell::before` keeps the backdrop **white (`background: #FFFFFF`)** — same as sayminder's rule. ✅
- Placeholder-frame rules present and scoped: `.lk-page .marketing-shot-placeholder-grid` and `.lk-page .marketing-shot-placeholder` (+ label/caption + two responsive overrides) — parallel to sayminder's placeholder CSS at matching line positions. ✅
- **No leftover solcast/sayminder tokens** — grep for `sc-`, `sy-`, `variant="sc"`, `variant="sy"`, `.sc-page`, `.sy-page`, `solcast`, `sayminder` returned nothing. ✅

### Icon

- `assets/app-icons/icon_LinkHQ.png` exists, **397,646 bytes** (not 0-byte), and is referenced from the marketing front-matter, home.html work-card, and home.html footer icon. ✅

---

## F. Duplicate-permalink safety — PASS

- Collected all **450** permalinks across `apps/*/*/*.md` (10 apps × 3 sections × 15 locales). **Zero duplicates.** ✅
- Collected all `redirect_from` entries across the same files. **Zero duplicate redirect targets.** ✅
- LinkHQ introduced no permalink or redirect collision anywhere on the site. ✅

---

## Conclusions & recommendations

LinkHQ is **ready**. All 14 translated locales are structurally and content-wise aligned with the English source, and every setting/convention matches the comparison apps (sayminder for shape, solcast for the theme-token baseline). The app correctly follows the placeholder path: no `_data/apps/linkhq.yml`, no screenshots folder, in-body placeholder frames, and the else-branch hero-shell split in `app-linkhq.html`. LinkHQ sits at the right end of both the works-grid and footer icons, as requested.

Optional (non-blocking) follow-ups, to apply only if desired:

1. **(L1)** When the real App Store id is assigned, replace the placeholder `app_store_url` (`https://apps.apple.com/app/id0000000000`) in all 15 marketing files and the matching in-body badge `href`, and consider adding the `/linkhq/` app-name slug to match sayminder/solcast's URL format. Keep it identical across all locales.
2. **(L2)** If LinkHQ is intended to use a custom display typeface (as sayminder/journeyfolio do), add `--app-display-font` / `--app-display-weight` to its `[data-app="linkhq"]` block. If the default is intended (matching solcast), no change is needed.

Nothing was modified during this audit.
