import { ar } from './ar';
import { en } from './en';
import { ROUTE_MAP } from './articles';

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
  const raw = String(path || '');

  /*
   * الروابط الخارجية والروابط الفعلية (mailto:, tel: ...) تُترك كما هي.
   * هذا مهم لأن localePath يُستدعى من sources كثيرة قد تحتوي على روابط
   * خارجية أصلًا.
   */
  if (/^(?:[a-z][a-z0-9+.-]*:)?\/\//i.test(raw)) {
    return raw;
  }

  const normalized = raw.replace(/^\/+/, '');

  if (locale === 'en') {
    return normalized ? `/en/${normalized}` : '/en';
  }

  return normalized ? `/${normalized}` : '/';
}

/**
 * يحوّل مسارًا داخليًا إلى مساره المكافئ في اللغة المطلوبة.
 *
 * الفرق المهم عن localePath: هذا التابع يمرّ عبر ROUTE_MAP، لذلك
 * المسارات التي لها slug مختلف بين اللغتين تُترجم بشكل صحيح.
 *
 * مثال: المقال العربي المنشور
 *   articles/jpg-vs-webp-vs-png-avif
 * له مسار إنجليزي طبيعي مختلف:
 *   articles/image-format-comparison
 *
 * بدون هذه الخطوة يُبنى الرابط الخاطئ
 *   /en/articles/jpg-vs-webp-vs-png-avif
 * وهو مسار غير موجود ويؤدي إلى 404.
 */
export function translatedPath(locale, path = '') {
  const normalized = String(path || '').replace(/^\/+/, '');

  if (!normalized) {
    return locale === 'en' ? '/en' : '/';
  }

  const entry = ROUTE_MAP[normalized];
  const slug = entry && entry.en !== undefined ? entry.en : normalized;

  return locale === 'en'
    ? slug
      ? `/en/${slug}`
      : '/en'
    : `/${normalized}`;
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

/**
 * مسار الأداة المستقل داخل اللغة النشطة.
 *
 * العربية: /tools/image-compression
 * الإنجليزية: /en/tools/image-compression
 *
 * يُستخدم بواسطة روابط التنقل الداخلية (النافبار، الفوتر، الكروت،
 * مقالات مركز المعرفة) حتى لا تعتمد على الـhash، وحتى تبقى داخل نفس
 * اللغة بدل العودة إلى العربية.
 */
export function toolPath(locale, toolId) {
  return localePath(locale, `tools/${toolId}`);
}

/**
 * يبني رابطًا داخليًا معبّرًا عن اللغة الحالية. يفعل كل من:
 *
 * - إضافة /en للمسارات الداخلية في النسخة الإنجليزية
 * - الحفاظ على اللغة النشطة أثناء التنقل الداخلي
 * - تمرير الروابط الخارجية (http, mailto, tel) بدون تعديل
 * - إضافة أداة عبر مسارها الحقيقي مع الحفاظ على سلوك الـhash الحالي
 *
 * @param {'ar'|'en'} locale اللغة النشطة
 * @param {string} to المسار بدون بادئة اللغة، مثل 'articles' أو '/privacy'
 */
export function localizedHref(locale, to = '') {
  const raw = String(to == null ? '' : to);

  // روابط خارجية أو مخططات خاصة: تمر كما هي.
  if (/^(?:[a-z][a-z0-9+.-]*:)?\/\//i.test(raw)) {
    return raw;
  }

  if (raw.startsWith('#')) {
    return raw;
  }

  const [pathPart, hashPart] = raw.split('#');

  const searchIndex = pathPart.indexOf('?');
  const search = searchIndex === -1 ? '' : pathPart.slice(searchIndex);
  const cleanPath = searchIndex === -1 ? pathPart : pathPart.slice(0, searchIndex);

  const normalized = String(cleanPath).replace(/^\/+/, '');

  if (
    /\.(?:html?|xml|txt|json|ico|png|jpe?g|svg|webp|avif|gif|bmp|css|js|woff2?)$/i.test(
      normalized
    )
  ) {
    // ملف ثابت: يبقى مساره كما هو بدون بادئة اللغة.
    return `/${normalized}${search}${hashPart ? `#${hashPart}` : ''}`;
  }

  const localized = translatedPath(locale, normalized);

  return `${localized}${search}${hashPart ? `#${hashPart}` : ''}`;
}
