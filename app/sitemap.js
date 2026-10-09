import { ARTICLE_SLUGS, ROUTE_MAP } from './lib/i18n/articles';
import { TOOLS } from './lib/i18n/tools';

/*
 * Sitemap الموقع.
 *
 * كل مسار مذكور هنا هو صفحة HTML عامة قابلة للفهرسة فعليًا، أو مسار
 * ترجمة سيتم إنشاؤه فعليًا عند البناء. لا يتم إدراج أي حالة واجهة
 * (مثل /#image-compression) ولا أي ملف ثابت.
 *
 * العربي يحتفظ بمساراته المنشورة كما هي، والإنجليزي تحت /en.
 */

const SITE_URL = 'https://tools.datalynx.space';

/*
 * مطلوب مع `output: 'export'` حتى يتم توليد /sitemap.xml كملف ثابت
 * في مجلد out بدل الاعتماد على معالجة وقت الطلب.
 */
export const dynamic = 'force-static';

/**
 * الصفحات الثابتة: [المسار بدون بادئة اللغة, الأولوية, معدل التغيير]
 */
const STATIC_PAGES = [
  ['', 1, 'weekly'],
  ['articles', 0.8, 'weekly'],
  ['privacy', 0.5, 'monthly'],
  ['terms', 0.5, 'monthly'],
];

/*
 * صفحات الأدوات المستقلة.
 *
 * كل عنصر هنا هو صفحة HTML حقيقية أُنشئت وقت البناء في العربية
 * (/tools/<tool>) وفي الإنجليزية (/en/tools/<tool>).
 *
 * لا تُدرج حالات الـhash هنا إطلاقًا: /#image-compression ليس
 * مستندًا مستقلًا ولا يجوز فهرسته كصفحة.
 */
const TOOL_PAGES = TOOLS.map((tool) => [
  `tools/${tool.id}`,
  tool.priority,
  tool.changeFrequency,
]);

/*
 * ملاحظة مهمة:
 *
 * Next.js يبني ملف sitemap.xml من هذه الدالة، لكنه لا يُصدر عناصر
 * xhtml:link الخاصة بـhreflang (تم التحقق من ذلك على الناتج الفعلي).
 * لذلك تُكتب بدائل اللغة أدناه يدويًا.
 *
 * هذا مهم لهذا الموقع تحديدًا: العربي على الجذر والإنجليزي تحت /en،
 * وبدون hreflang قد يُعاملان كصفحتين متنافستين بنفس المحتوى.
 */

/**
 * يبني كائن URL واحد مع بدائله اللغوية.
 *
 * المفتاح `ar-EG` هو النسخة العربية، وهو نفس المفتاح المستخدم في
 * وسوم hreflang الصادرة من الـlayouts، حتى لا تتعارض الإشارتان.
 * x-default يشير إلى النسخة العربية لأنها اللغة الافتراضية.
 */
function buildEntry(path, priority, changeFrequency, enPath) {
  const arUrl =
    path === '' ? SITE_URL : `${SITE_URL}/${path}`;

  const enUrl =
    enPath === ''
      ? `${SITE_URL}/en`
      : `${SITE_URL}/en/${enPath == null ? path : enPath}`;

  return {
    arUrl,
    enUrl,
    priority,
    changeFrequency,
  };
}

/*
 * نفس المنطق لكن لعنصر إنجليزي مستقل: يضمن أن يكون كل <loc> في
 * sitemap بلا شرطة نهائية، بنفس الصيغة المستخدمة في canonical كل صفحة.
 */
export function sitemapUrlFor(locale, path) {
  if (!path) return locale === 'en' ? `${SITE_URL}/en` : SITE_URL;
  return locale === 'en' ? `${SITE_URL}/en/${path}` : `${SITE_URL}/${path}`;
}

/*
 * يُنتج ملف sitemap.xml النهائي من قائمة عناوين URL المولّدة.
 *
 * يُستخدم داخل scripts/set-sitemap-hreflang.mjs بعد البناء، لأن
 * Next.js لا يُصدر عناصر xhtml:link الخاصة بـhreflang بنفسه.
 */
export function renderSitemap(entries) {
  const urls = entries
    .map((entry) => {
      const alternates = [
        `<xhtml:link rel="alternate" hreflang="ar-EG" href="${entry.arUrl}"/>`,
        `<xhtml:link rel="alternate" hreflang="en" href="${entry.enUrl}"/>`,
        `<xhtml:link rel="alternate" hreflang="x-default" href="${entry.arUrl}"/>`,
      ].join('');

      return (
        '<url>' +
        `<loc>${entry.arUrl}</loc>` +
        alternates +
        `<lastmod>${entry.lastModified.toISOString()}</lastmod>` +
        `<changefreq>${entry.changeFrequency}</changefreq>` +
        `<priority>${entry.priority ?? 0.5}</priority>` +
        '</url>'
      );
    })
    .join('');

  return (
    '<?xml version="1.0" encoding="UTF-8"?>' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ' +
    'xmlns:xhtml="http://www.w3.org/1999/xhtml">' +
    urls +
    '</urlset>'
  );
}

/**
 * تُصدّر نفس أزواج (الهريف + بديلها الإنجليزي) التي يحتاجها ملف
 * sitemap.xml بعد البناء، حتى لا تتكرر القائمة في مكانين.
 */
export function sitemapEntries() {
  const now = new Date();

  const staticEntries = [...STATIC_PAGES, ...TOOL_PAGES].map(
    ([path, priority, changeFrequency]) => ({
      ...buildEntry(path, priority, changeFrequency),
      lastModified: now,
    })
  );

  const articleEntries = ARTICLE_SLUGS.map((slug) => {
    const arabicPath = `articles/${slug}`;
    const entry = ROUTE_MAP[arabicPath];

    return {
      ...buildEntry(arabicPath, 0.6, 'monthly', entry.en),
      lastModified: now,
    };
  });

  return [...staticEntries, ...articleEntries];
}

/*
 * كل صفحة حقيقية في اللغتين تُدرج كعنصر مستقل في sitemap.
 *
 * السبب: ملف sitemap يجب أن يحتوي على كل صفحة قابلة للفهرسة. لو
 * أدرجنا العربية فقط مع بدائلها الإنجليزية، فإن الصفحات الإنجليزية
 * نفسها لا تظهر كـ<loc> مستقل. إدراج اللغتين مع بدائل متبادلة هو
 * النمط الذي توصي به Google للتناوب ثنائي الاتجاه للـhreflang.
 *
 * حالات الواجهة (مثل /#image-compression) لا تُدرج إطلاقًا.
 */
export default function sitemap() {
  const entries = [];

  for (const entry of sitemapEntries()) {
    const languages = {
      'ar-EG': entry.arUrl,
      en: entry.enUrl,
      'x-default': entry.arUrl,
    };

    entries.push({
      url: entry.arUrl,
      lastModified: entry.lastModified,
      changeFrequency: entry.changeFrequency,
      priority: entry.priority,
      alternates: { languages },
    });

    /*
     * الصفحة الإنجليزية كعنصر مستقل بنفس البدائل المتبادلة، حتى
     * تكون إشارة hreflang متطابقة من الاتجاهين.
     */
    entries.push({
      url: entry.enUrl,
      lastModified: entry.lastModified,
      changeFrequency: entry.changeFrequency,
      priority: entry.priority,
      alternates: { languages },
    });
  }

  return entries;
}
