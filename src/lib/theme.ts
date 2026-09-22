/**
 * Site-wide theme settings — brand colors, fonts, and typography scale.
 * Fetched from WordPress at request time via the "PatientsCure Theme Settings" plugin.
 *
 * REST endpoint: GET {WORDPRESS_SITE_URL}/wp-json/pcure/v1/theme-settings
 * Cached by Next.js Data Cache with a 'wordpress' tag so the /api/revalidate
 * webhook clears it the same way post content does.
 */

export interface ThemeSettings {
  primaryColor: string;
  accentColor: string;
  bgColor: string;
  inkColor: string;
  contentBodySize: number;
  contentBodyLineHeight: number;
  contentH1Size: number;
  contentH1LineHeight: number;
  contentH2Size: number;
  contentH2LineHeight: number;
  contentH3Size: number;
  contentH3LineHeight: number;
  logoUrl: string | null;
  logoWidth: number | null;
  logoHeight: number | null;
}

export const DEFAULT_THEME: ThemeSettings = {
  primaryColor: '#1E4D30',
  accentColor: '#8B6B3E',
  bgColor: '#FAF8F5',
  inkColor: '#14261B',
  contentBodySize: 18,
  contentBodyLineHeight: 1.85,
  contentH1Size: 42,
  contentH1LineHeight: 1.15,
  contentH2Size: 32,
  contentH2LineHeight: 1.2,
  contentH3Size: 24,
  contentH3LineHeight: 1.3,
  logoUrl: null,
  logoWidth: null,
  logoHeight: null,
};

const WP_API_URL =
  (typeof process !== 'undefined'
    ? (process.env.NEXT_PUBLIC_WORDPRESS_API_URL as string | undefined)
    : undefined) || 'http://pcure.test/wp-json/wp/v2';

const WP_ROOT = WP_API_URL.replace(/\/wp\/v2\/?$/, '');
const THEME_ENDPOINT = `${WP_ROOT}/pcure/v1/theme-settings`;

export const THEME_REVALIDATE_SECONDS = 60;

const HEX_RE = /^#[0-9a-fA-F]{6}$/;

function sanitizeHex(value: unknown, fallback: string): string {
  if (typeof value === 'string' && HEX_RE.test(value.trim())) return value.trim();
  return fallback;
}

function sanitizeNumber(value: unknown, fallback: number, min: number, max: number): number {
  const n = typeof value === 'string' ? parseFloat(value) : typeof value === 'number' ? value : NaN;
  if (Number.isFinite(n) && n >= min && n <= max) return n;
  return fallback;
}

function sanitizeUrl(value: unknown): string | null {
  if (typeof value === 'string' && value.trim()) {
    try {
      new URL(value);
      return value.trim();
    } catch {
      return null;
    }
  }
  return null;
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
      contentBodySize: sanitizeNumber(data.contentBodySize, DEFAULT_THEME.contentBodySize, 12, 28),
      contentBodyLineHeight: sanitizeNumber(data.contentBodyLineHeight, DEFAULT_THEME.contentBodyLineHeight, 1, 2.5),
      contentH1Size: sanitizeNumber(data.contentH1Size, DEFAULT_THEME.contentH1Size, 20, 72),
      contentH1LineHeight: sanitizeNumber(data.contentH1LineHeight, DEFAULT_THEME.contentH1LineHeight, 1, 2),
      contentH2Size: sanitizeNumber(data.contentH2Size, DEFAULT_THEME.contentH2Size, 16, 56),
      contentH2LineHeight: sanitizeNumber(data.contentH2LineHeight, DEFAULT_THEME.contentH2LineHeight, 1, 2),
      contentH3Size: sanitizeNumber(data.contentH3Size, DEFAULT_THEME.contentH3Size, 14, 44),
      contentH3LineHeight: sanitizeNumber(data.contentH3LineHeight, DEFAULT_THEME.contentH3LineHeight, 1, 2),
      logoUrl: sanitizeUrl(data.logoUrl),
      logoWidth: sanitizeNumber(data.logoWidth, 0, 0, 4000) || null,
      logoHeight: sanitizeNumber(data.logoHeight, 0, 0, 4000) || null,
    };
  } catch {
    return DEFAULT_THEME;
  }
}
