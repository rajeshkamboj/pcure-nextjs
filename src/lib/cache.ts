/**
 * Lightweight centralized caching layer for WordPress API.
 * Provides sensible revalidation periods and cache tag helpers.
 * Keep it simple — no plugin framework, just utilities.
 */

export const REVALIDATE = {
  /** Articles: frequently updated editorial content */
  articles: 300, // 5 minutes
  articleList: 300,
  /** Diseases: monographs, relatively stable */
  diseases: 600, // 10 minutes
  /** Remedies: stable formulations */
  remedies: 600,
  /** Ingredients: botanical data, stable */
  ingredients: 600,
  /** Search: user-specific, short cache */
  search: 60, // 1 minute
  /** Authors: rarely change */
  authors: 3600, // 1 hour
} as const;

export const CACHE_TAGS = {
  diseases: 'diseases',
  remedies: 'remedies',
  ingredients: 'ingredients',
  articles: 'articles',
  authors: 'authors',
  search: 'search',
} as const;

export type RevalidateKey = keyof typeof REVALIDATE;

/**
 * Helper to get fetch options with Next.js caching.
 * On the client (window defined) Next.js caching is ignored, so we return undefined.
 */
export function getCacheOptions(
  revalidate: number,
  tags?: string[]
): RequestInit & { next?: { revalidate: number; tags?: string[] } } | undefined {
  if (typeof window !== 'undefined') {
    return undefined;
  }
  return {
    next: {
      revalidate,
      ...(tags ? { tags } : {}),
    },
  };
}

/**
 * Diagnostic helper - logs cache config in development
 */
export function logCacheDiagnostics() {
  if (process.env.NODE_ENV === 'development') {
    console.log('[Cache] Revalidation config:', REVALIDATE);
  }
}
