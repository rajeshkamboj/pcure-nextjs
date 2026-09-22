/**
 * Helpers for rendering raw HTML from WordPress WYSIWYG (rich text) fields
 * — the article body, plus ACF WYSIWYG Editor fields like Disease "Overview"
 * and Ingredient "Full Description".
 *
 * Pair with the `.patientscure-rich-content` class in globals.css.
 */

/**
 * WordPress body HTML: make sure images/iframes inside the content are
 * lazy-loaded (WordPress usually adds this already; this only fills in
 * tags that lack it). Content rendered above the fold with its own cover
 * image should keep using `priority` on that image instead.
 */
export const lazyLoadContentMedia = (html: string): string =>
  html.replace(/<(img|iframe)\b(?![^>]*\sloading=)/gi, '<$1 loading="lazy"');
