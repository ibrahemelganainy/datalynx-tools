import { ar } from './ar';
import { en } from './en';

/**
 * The default locale stays Arabic and keeps the original root URLs.
 *
 * Arabic  ->  /
 * English ->  /en
 */
export const DEFAULT_LOCALE = 'ar';

export const LOCALES = ['ar', 'en'];

export const dictionaries = { ar, en };

/**
 * Returns the dictionary for a locale, falling back to Arabic for
 * anything unknown so a bad value can never crash a page.
 */
export function getDictionary(locale) {
  return dictionaries[locale] || dictionaries[DEFAULT_LOCALE];
}

/**
 * Reads a dotted key path such as `tools.imageCompression.title`.
 * Returns `fallback` (or an empty string) when the key is missing.
 */
export function translate(dictionary, path, fallback = '') {
  if (!dictionary || !path) {
    return fallback;
  }

  const value = String(path)
    .split('.')
    .reduce(
      (accumulator, key) =>
        accumulator == null
          ? undefined
          : accumulator[key],
      dictionary
    );

  return value == null ? fallback : value;
}

/**
 * Locale-aware URL builder.
 *
 * Arabic keeps the published root URLs exactly as they are today, so no
 * existing link or search result changes. English lives under /en.
 */
export function localePath(locale, path = '') {
  const normalized = String(path || '').replace(/^\/+/, '');

  if (locale === 'en') {
    return normalized ? `/en/${normalized}` : '/en';
  }

  return normalized ? `/${normalized}` : '/';
}

/**
 * Absolute URL helper used by metadata, canonical tags and the sitemap.
 */
export const SITE_URL = 'https://tools.datalynx.space';

export function absoluteUrl(locale, path = '') {
  const relative = localePath(locale, path);

  return relative === '/' ? SITE_URL : `${SITE_URL}${relative}`;
}

/**
 * Returns the equivalent URL for the *other* language of a page.
 *
 * `path` must be the locale-less canonical path, e.g.
 * 'articles/compress-image-500kb'.
 */
export function alternateUrl(locale, path = '') {
  const other = locale === 'ar' ? 'en' : 'ar';

  return absoluteUrl(other, path);
}
