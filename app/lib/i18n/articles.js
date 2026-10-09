/*
 * خريطة المسارات بين العربية والإنجليزية.
 *
 * هذا هو المصدر الوحيد للحقيقة لكل من:
 *
 * - مبدّل اللغة (للانتقال إلى الترجمة المقابلة)
 * - وسوم hreflang
 * - ملف sitemap
 * - التحقق من صحة المسارات الداخلية
 *
 * المسارات العربية هنا منشورة فعليًا، ولا يجوز تغييرها حتى لا تنكسر
 * الروابط الخارجية أو نتائج البحث الحالية.
 *
 * المفتاح هو المسار بدون اللغة (locale-less):
 *
 *   ''                -> /                        و /en
 *   'articles'        -> /articles                و /en/articles
 *   'privacy'         -> /privacy                 و /en/privacy
 *   'terms'           -> /terms                   و /en/terms
 *   'articles/<slug>' -> /articles/<slug>          و /en/articles/<enSlug>
 *
 * `en` يساوي `slug` ما لم يكن للمقال الإنجليزي مسار طبيعي مختلف.
 */
export const ROUTE_MAP = {
  '': { en: '' },

  articles: { en: 'articles' },
  privacy: { en: 'privacy' },
  terms: { en: 'terms' },

  'articles/image-pdf-compression-tools': {
    en: 'articles/image-pdf-compression-tools',
  },
  'articles/compress-image-500kb': {
    en: 'articles/compress-image-500kb',
  },
  'articles/jpg-vs-webp-vs-png-avif': {
    en: 'articles/image-format-comparison',
  },
};

/*
 * الاتجاه المعاكس: من المسار الإنجليزي إلى المسار العربي.
 * مبني مباشرة من ROUTE_MAP في الاتجاه العكسي.
 */
const EN_TO_AR = (() => {
  const map = {};

  Object.entries(ROUTE_MAP).forEach(([arPath, entry]) => {
    if (entry.en === undefined) {
      return;
    }

    map[entry.en] = arPath;
  });

  return map;
})();

export const ARTICLE_SLUGS = [
  'image-pdf-compression-tools',
  'compress-image-500kb',
  'jpg-vs-webp-vs-png-avif',
];

/**
 * يحوّل المسار الحالي إلى المسار المكافئ في اللغة الأخرى.
 *
 * يشتقّ المسار بدون اللغة من المسار الحالي، لذلك لا تحتاج الصفحات إلى
 * تمرير أي بيانات إضافية.
 *
 * @param {string} pathname   المسار الحالي، مثل /en/articles/foo
 * @param {'ar'|'en'} locale  اللغة النشطة
 * @returns {string}          مسار اللغة الأخرى، أو الصفحة الرئيسية
 *                            كقيمة احتياطية آمنة عند عدم وجود مقابل
 */
export function getAlternatePath(pathname, locale) {
  const clean = String(pathname || '/').replace(/\/+$/, '') || '/';

  if (locale === 'en') {
    const withoutPrefix =
      clean === '/en' ? '' : clean.replace(/^\/en\//, '');

    const arPath = EN_TO_AR[withoutPrefix];

    if (arPath === undefined) {
      return '/';
    }

    return arPath ? `/${arPath}` : '/';
  }

  const withoutPrefix = clean === '/' ? '' : clean.replace(/^\//, '');
  const entry = ROUTE_MAP[withoutPrefix];

  if (!entry || entry.en === undefined) {
    return '/en';
  }

  return entry.en ? `/en/${entry.en}` : '/en';
}

/**
 * روابط الترجمة البديلة لمقال، جاهزة لوسوم hreflang.
 *
 * تُرجع undefined لو لم يكن للمقال مقابل إنجليزي، حتى لا نُنشئ بديل
 * لغة وهميًا.
 */
export function articleAlternates(slug) {
  const entry = ROUTE_MAP[`articles/${slug}`];

  if (!entry || entry.en === undefined) {
    return undefined;
  }

  const arUrl = `https://tools.datalynx.space/articles/${slug}`;
  const enUrl = `https://tools.datalynx.space/en/${entry.en}`;

  return {
    languages: {
      'ar-EG': arUrl,
      en: enUrl,
      'x-default': arUrl,
    },
  };
}
