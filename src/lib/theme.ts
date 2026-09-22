/**
 * Site-wide theme (brand colors, fonts, and typography scale), controlled
 * from the WordPress dashboard by the "PatientsCure Theme Settings" plugin.
 *
 * The plugin exposes a public REST endpoint:
 *   GET {WORDPRESS_SITE_URL}/wp-json/pcure/v1/theme-settings
 *
 * Fetched with the same 'wordpress' cache tag used by contentService.ts, so
 * it's covered by the existing /api/revalidate webhook — saving settings in
 * WordPress busts this cache the same way publishing a post does.
 */

export interface ThemeSettings {
  primaryColor: string;
  accentColor: string;
  bgColor: string;
  inkColor: string;
  headingFont: string;
  bodyFont: string;

  /**
   * Root font-size, as a percentage (100 = browser default, 16px).
   * Almost everything in the app is sized in Tailwind's rem-based scale
   * (text-sm, text-lg, text-2xl, headings, cards, CPT detail pages, nav,
   * etc.), so scaling this one value scales body copy, headings, and every
   * custom-post-type page proportionally — site-wide, in one control.
   */
  baseTextScale: number;

  /**
   * Fine-grained typography for long-form WP post content specifically
   * (the article body — see .patientscure-article-content in
   * ArticleDetail.tsx). Sizes in px, line-heights unitless.
   */
  contentBodySize: number;
  contentBodyLineHeight: number;
  contentH1Size: number;
  contentH1LineHeight: number;
  contentH2Size: number;
  contentH2LineHeight: number;
  contentH3Size: number;
  contentH3LineHeight: number;
}

export const DEFAULT_THEME: ThemeSettings = {
  primaryColor: '#1E4D30',
  accentColor: '#8B6B3E',
  bgColor: '#FAF8F5',
  inkColor: '#14261B',
  headingFont: 'Playfair Display',
  bodyFont: 'Plus Jakarta Sans',

  baseTextScale: 100,

  contentBodySize: 18,
  contentBodyLineHeight: 1.85,
  contentH1Size: 42,
  contentH1LineHeight: 1.15,
  contentH2Size: 32,
  contentH2LineHeight: 1.2,
  contentH3Size: 24,
  contentH3LineHeight: 1.3,
};

const WP_API_URL =
  (typeof process !== 'undefined'
    ? (process.env.NEXT_PUBLIC_WORDPRESS_API_URL as string | undefined)
    : undefined) || 'http://pcure.test/wp-json/wp/v2';

// contentService.ts talks to the `wp/v2` namespace; the theme-settings route
// lives at the site's wp-json root under our own `pcure/v1` namespace.
const WP_ROOT = WP_API_URL.replace(/\/wp\/v2\/?$/, '');
const THEME_ENDPOINT = `${WP_ROOT}/pcure/v1/theme-settings`;

/** How long (seconds) Next.js keeps the theme settings in its Data Cache. */
export const THEME_REVALIDATE_SECONDS = 60;

const HEX_RE = /^#[0-9a-fA-F]{6}$/;
// Google Fonts family names: letters, numbers, spaces only (no CSS/HTML
// injection risk since this string is interpolated directly into a <style>
// tag and a Google Fonts URL further down).
const FONT_NAME_RE = /^[A-Za-z0-9 ]{1,60}$/;

function sanitizeHex(value: unknown, fallback: string): string {
  if (typeof value === 'string' && HEX_RE.test(value.trim())) return value.trim();
  return fallback;
}

function sanitizeFont(value: unknown, fallback: string): string {
  if (typeof value === 'string' && FONT_NAME_RE.test(value.trim())) return value.trim();
  return fallback;
}

/** Coerces to a finite number within [min, max], else returns the fallback. */
function sanitizeNumber(value: unknown, fallback: number, min: number, max: number): number {
  const n = typeof value === 'string' ? parseFloat(value) : typeof value === 'number' ? value : NaN;
  if (Number.isFinite(n) && n >= min && n <= max) return n;
  return fallback;
}

export async function getThemeSettings(): Promise<ThemeSettings> {
  try {
    const res = await fetch(THEME_ENDPOINT, {
      next: { revalidate: THEME_REVALIDATE_SECONDS, tags: ['wordpress'] },
    });

    if (!res.ok) return DEFAULT_THEME;

    const data = await res.json();

    return {
      primaryColor: sanitizeHex(data.primaryColor, DEFAULT_THEME.primaryColor),
      accentColor: sanitizeHex(data.accentColor, DEFAULT_THEME.accentColor),
      bgColor: sanitizeHex(data.bgColor, DEFAULT_THEME.bgColor),
      inkColor: sanitizeHex(data.inkColor, DEFAULT_THEME.inkColor),
      headingFont: sanitizeFont(data.headingFont, DEFAULT_THEME.headingFont),
      bodyFont: sanitizeFont(data.bodyFont, DEFAULT_THEME.bodyFont),

      baseTextScale: sanitizeNumber(data.baseTextScale, DEFAULT_THEME.baseTextScale, 80, 130),

      contentBodySize: sanitizeNumber(data.contentBodySize, DEFAULT_THEME.contentBodySize, 12, 28),
      contentBodyLineHeight: sanitizeNumber(
        data.contentBodyLineHeight,
        DEFAULT_THEME.contentBodyLineHeight,
        1,
        2.5
      ),
      contentH1Size: sanitizeNumber(data.contentH1Size, DEFAULT_THEME.contentH1Size, 20, 72),
      contentH1LineHeight: sanitizeNumber(data.contentH1LineHeight, DEFAULT_THEME.contentH1LineHeight, 1, 2),
      contentH2Size: sanitizeNumber(data.contentH2Size, DEFAULT_THEME.contentH2Size, 16, 56),
      contentH2LineHeight: sanitizeNumber(data.contentH2LineHeight, DEFAULT_THEME.contentH2LineHeight, 1, 2),
      contentH3Size: sanitizeNumber(data.contentH3Size, DEFAULT_THEME.contentH3Size, 14, 44),
      contentH3LineHeight: sanitizeNumber(data.contentH3LineHeight, DEFAULT_THEME.contentH3LineHeight, 1, 2),
    };
  } catch {
    // WordPress unreachable at build/request time — fall back quietly so
    // the site still renders with the last-known-good look.
    return DEFAULT_THEME;
  }
}

/** True when the site is using fonts other than the two built-in, self-hosted defaults. */
export function usesCustomFonts(theme: ThemeSettings): boolean {
  return theme.headingFont !== DEFAULT_THEME.headingFont || theme.bodyFont !== DEFAULT_THEME.bodyFont;
}

/** Google Fonts CSS2 stylesheet URL for whichever fonts differ from the defaults. */
export function googleFontsHref(theme: ThemeSettings): string {
  const families = Array.from(new Set([theme.headingFont, theme.bodyFont]))
    .map((f) => `family=${f.trim().replace(/\s+/g, '+')}:wght@300;400;500;600;700`)
    .join('&');
  return `https://fonts.googleapis.com/css2?${families}&display=swap`;
}
