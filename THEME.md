# Theming Guide — Colors, Fonts, Typography, Logo, Content

This guide explains how to control the site's design system. Most changes are made in WordPress via the **Theme Settings** plugin (Settings → Theme Settings), which exposes a REST endpoint that the Next.js frontend fetches every 60 seconds. A few design decisions live directly in the Next.js codebase.

---

## WordPress-Controlled Settings

The following are managed from the WordPress admin dashboard and take effect immediately (within ~60 seconds) without a redeploy.

### Colors

**Dashboard:** Settings → Theme Settings → Brand Colors

Four brand colors control the entire site palette:

- **Primary Color** — Buttons, links, active nav states, focus indicators, H3 headings
- **Accent Color** — Gold/highlight accents, badges, H2 underlines, blockquote borders
- **Background Color** — Page background
- **Text/Heading Color** — Body text, main headings, footer/top-bar backgrounds

Two additional colors are **derived automatically** from these four (no separate fields):

- **Muted Text** — Blend of text color + background at 55:45 ratio (secondary text, captions)
- **Border** — Blend of text color + background at 12:88 ratio (dividers, subtle borders)

These derived colors stay in harmony with your primary colors automatically.

### Article & Post Content Typography

**Dashboard:** Settings → Theme Settings → Article & Post Content Typography

Controls font sizes (px) and line heights for long-form WYSIWYG content:

- **Body Text** — Size (12–28px) + line height (1.0–2.5)
- **Heading 1** — Size (20–72px) + line height (1.0–2.0)
- **Heading 2** — Size (16–56px) + line height (1.0–2.0)
- **Heading 3** — Size (14–44px) + line height (1.0–2.0)

These apply to:
- The article body (ArticleDetail.tsx)
- Disease "Overview" field (WYSIWYG Editor, DiseaseDetail.tsx)
- Ingredient "Full Description" field (WYSIWYG Editor, IngredientDetail.tsx)

Mobile responsively scales these values proportionally — there are no separate mobile size fields.

### Logo

**Dashboard:** Settings → Theme Settings → Logo

Upload a site logo via the WordPress media picker. It's used in:
- `src/components/Header.tsx` — Full-color header logo
- `src/components/Footer.tsx` — Same logo with `brightness-0 invert` filter (forced to white for the dark footer)

If your new logo doesn't look right in the footer when inverted to white, remove the `brightness-0 invert` class from Footer.tsx and provide a separate white/light-colored logo file instead.

---

## Next.js-Controlled Settings

Changes here require editing code and redeploying the site.

### Fonts

**File:** `src/app/layout.tsx`, top of the file

```tsx
const fontSans = Plus_Jakarta_Sans({ ... });   // body text, rich-content body
const fontHeading = Space_Grotesk({ ... });    // headings, rich-content h1–h4
```

To use different fonts, replace `Plus_Jakarta_Sans` / `Space_Grotesk` with any font from [fonts.google.com](https://fonts.google.com). The fonts are self-hosted at build time — your visitors never contact Google's servers.

**Important:** Keep the `variable: "--font-jakarta"` and `variable: "--font-heading"` names as-is — `globals.css` references these exact variable names.

If you want a custom font file (not from Google), swap `next/font/google` for `next/font/local` — see the [next/font/local docs](https://nextjs.org/docs/app/api-reference/components/font#localfont).

### Base Text Size (site-wide scale)

**File:** `src/app/layout.tsx`, the `<html>` element

```tsx
<html lang="en" className={...} style={{ fontSize: "105%" }}>
```

This sets the browser's root `font-size`, which scales all Tailwind rem-based utilities (`text-sm`, `text-lg`, `text-2xl`, etc.) across the entire site:
- `100%` = normal (16px default)
- `90–110%` = noticeably smaller/larger without editing every component

This is useful for quick site-wide typography adjustments without changing individual component sizes.

---

## WordPress REST Endpoint

The Next.js frontend fetches from:

```
GET {WORDPRESS_API_ROOT}/pcure/v1/theme-settings
```

**Example response:**
```json
{
  "primaryColor": "#1E4D30",
  "accentColor": "#8B6B3E",
  "bgColor": "#FAF8F5",
  "inkColor": "#14261B",
  "contentBodySize": 18,
  "contentBodyLineHeight": 1.85,
  "contentH1Size": 42,
  "contentH1LineHeight": 1.15,
  "contentH2Size": 32,
  "contentH2LineHeight": 1.2,
  "contentH3Size": 24,
  "contentH3LineHeight": 1.3,
  "logoUrl": "https://example.com/wp-content/uploads/logo.webp",
  "logoWidth": 200,
  "logoHeight": 100
}
```

Cached for 60 seconds (tag: `wordpress`). The `/api/revalidate` webhook clears this cache the same way it clears content, so changes are live within ~60 seconds.

---

## ACF Field Types

**Important:** Ensure these ACF fields remain **WYSIWYG Editor** type, not Textarea:

- **Disease** `overview` field → WYSIWYG Editor
- **Ingredient** `full_description` field → WYSIWYG Editor

If either is changed to Textarea, the rich-text HTML (bold, italic, links, lists, blockquotes, etc.) will be printed as raw text instead of rendered, and the Next.js side will need a different rendering approach.

---

## Technical Details

### How fonts are applied to rich content

The WYSIWYG fields use the same fonts as the rest of the site:

- **Body text** → Plus Jakarta Sans (from `--font-sans`)
- **Headings (H1–H4)** → Space Grotesk (from `--font-serif`)
- **Blockquotes** → Space Grotesk for the quote + Plus Jakarta Sans for the citation

This ensures a cohesive typography system across all content.

### Color and typography CSS variables

**File:** `src/app/globals.css`

All theme colors and typography values are injected as CSS variables at runtime:

```css
:root {
  --color-primary: /* from WordPress */;
  --color-accent: /* from WordPress */;
  --color-bg: /* from WordPress */;
  --color-ink: /* from WordPress */;
  --color-muted: /* derived */;
  --color-border: /* derived */;
  
  --content-body-size: /* from WordPress */;
  --content-body-lh: /* from WordPress */;
  --content-h1-size: /* from WordPress */;
  /* ... and so on for h2, h3 */
}
```

The `.patientscure-rich-content` CSS class (used by ArticleDetail, DiseaseDetail, IngredientDetail) references these variables, ensuring consistent rendering across all long-form content on the site.

---

## Workflow Summary

1. **Colors, typography, logo** — Edit in WordPress (Settings → Theme Settings), live in ~60 seconds
2. **Fonts** — Edit `src/app/layout.tsx`, requires redeploy
3. **Base text scale** — Edit `src/app/layout.tsx`, requires redeploy
4. **ACF field types** — Ensure Disease `overview` and Ingredient `full_description` stay as WYSIWYG Editor type

That's it. Everything else is automatically wired up via the REST endpoint and CSS variables.
