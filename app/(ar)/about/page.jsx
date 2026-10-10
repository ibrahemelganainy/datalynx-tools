import AboutContent from '../../components/AboutContent';

import {
  SITE_URL,
  buildGraph,
  breadcrumbNode,
  organizationNode,
  serializeJsonLd,
  websiteNode,
} from '../../lib/structuredData';

/*
 * صفحة "من نحن" العربية: /about
 *
 * صفحة HTML حقيقية تُولَّد وقت البناء (output: 'export'), لذلك تفتح
 * مباشرة ويُمكن تحديثها وتُفهرس كصفحة مستقلة.
 *
 * canonical وhreflang هنا على مستوى الصفحة كما هو معتاد في صفحات
 * المقالات، والعنوان والوصف خاصان بهذه الصفحة الجديدة فقط، فلا
 * يُمَس أي metadata قائم.
 *
 * القالب الموروث من layout الجذر (%s | Data Lynx Tools) يُطبَّق على
 * القيمة أدناه، فاللاحقة تظهر مرة واحدة فقط.
 */
export const metadata = {
  title: 'من نحن',
  description:
    'تعرّف على Data Lynx Tools: مجموعة أدوات تعمل داخل المتصفح لضغط الصور وتحويل صيغها وإنشاء ملفات ICO وضغط ملفات PDF وتجهيز الملفات لأقل من 500KB.',

  alternates: {
    canonical: '/about',
    languages: {
      'ar-EG': `${SITE_URL}/about`,
      en: `${SITE_URL}/en/about`,
      'x-default': `${SITE_URL}/about`,
    },
  },

  openGraph: {
    type: 'website',
    locale: 'ar_AR',
    url: `${SITE_URL}/about`,
    title: 'من نحن | Data Lynx Tools',
    description:
      'تعرّف على Data Lynx Tools وأدواتها لضغط الصور وتحويل الصيغ وإنشاء ملفات ICO وضغط ملفات PDF.',
    siteName: 'Data Lynx Tools',
  },
};

/*
 * بيانات منظمة: AboutPage مرتبطة بكيانات الموقع والمنظمة المعرّفة
 * بمُعرّفات دائمة، مع BreadcrumbList. لا يوجد أي LocalBusiness أو
 * عنوان بريدي أو ساعات عمل لأن المشروع لا يثبت أيًّا منها.
 */
const jsonLd = buildGraph([
  {
    '@type': 'AboutPage',
    '@id': `${SITE_URL}/about#aboutpage`,
    url: `${SITE_URL}/about`,
    name: 'من نحن | Data Lynx Tools',
    inLanguage: 'ar',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#organization` },
  },
  websiteNode('ar'),
  organizationNode(),
  breadcrumbNode([
    { name: 'الرئيسية', url: SITE_URL },
    { name: 'من نحن', url: `${SITE_URL}/about` },
  ]),
]);

export default function ArabicAboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />

      <AboutContent lang="ar" />
    </>
  );
}
