import ContactContent from '../../components/ContactContent';

import {
  SITE_URL,
  buildGraph,
  breadcrumbNode,
  organizationNode,
  serializeJsonLd,
  websiteNode,
} from '../../lib/structuredData';

/*
 * صفحة "اتصل بنا" العربية: /contact
 *
 * صفحة HTML حقيقية تُولَّد وقت البناء، فتُفتح مباشرة ويُمكن تحديثها
 * وتُفهرس بشكل مستقل.
 *
 * بيانات التواصل المستخدمة في المحتوى هي نفسها الموجودة فعلاً في
 * الفوتر (واتساب +20 150 707 1671 والبريد lexoffice.datalynx@proton.me).
 * لم تُضف أي بيانات جديدة، ولا ساعات عمل ولا عنوان لأن المشروع لا
 * يثبت أيًّا منها.
 */
export const metadata = {
  title: 'اتصل بنا',
  description:
    'تواصل مع Data Lynx Tools عبر واتساب أو البريد الإلكتروني للاستفسارات والملاحظات والدعم الفني المتعلق بأدوات ضغط الصور وتحويل الصيغ وضغط ملفات PDF.',

  alternates: {
    canonical: '/contact',
    languages: {
      'ar-EG': `${SITE_URL}/contact`,
      en: `${SITE_URL}/en/contact`,
      'x-default': `${SITE_URL}/contact`,
    },
  },

  openGraph: {
    type: 'website',
    locale: 'ar_AR',
    url: `${SITE_URL}/contact`,
    title: 'اتصل بنا | Data Lynx Tools',
    description:
      'تواصل مع Data Lynx Tools عبر واتساب أو البريد الإلكتروني للاستفسارات والدعم الفني والملاحظات.',
    siteName: 'Data Lynx Tools',
  },
};

/*
 * بيانات منظمة: ContactPage مرتبطة بنفس كيانات الموقع والمنظمة، مع
 * BreadcrumbList.
 *
 * يوجد contactPoint على كيان Organization (بريد إلكتروني ونوع
 * التواصل)، ولا يوجد LocalBusiness ولا عنوان بريدي ولا ساعات عمل،
 * لأن أياً منها غير مثبت في المشروع.
 */
const jsonLd = buildGraph([
  {
    '@type': 'ContactPage',
    '@id': `${SITE_URL}/contact#contactpage`,
    url: `${SITE_URL}/contact`,
    name: 'اتصل بنا | Data Lynx Tools',
    inLanguage: 'ar',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#organization` },
  },
  websiteNode('ar'),
  organizationNode(),
  breadcrumbNode([
    { name: 'الرئيسية', url: SITE_URL },
    { name: 'اتصل بنا', url: `${SITE_URL}/contact` },
  ]),
]);

export default function ArabicContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />

      <ContactContent lang="ar" />
    </>
  );
}
