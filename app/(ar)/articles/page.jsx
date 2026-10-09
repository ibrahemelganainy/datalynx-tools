import ArticlesIndexContent from '../../components/ArticlesIndexContent';

/*
 * مركز المعرفة — النسخة العربية.
 *
 * قيم الـSEO الأصلية محفوظة حرفيًا بدون أي تعديل.
 *
 * إضافة `alternates.languages` لا تغيّر قيمة canonical الحالية،
 * بل تُضيف وسوم hreflang الخاصة بالنسخة الإنجليزية فقط.
 */

export const metadata = {

  title:
    'مركز المعرفة | Data Lynx Tools',

  description:
    'أدلة ومقالات عملية حول ضغط الصور وتحويل صيغها وضغط ملفات PDF وإنشاء ICO وتجهيز الملفات لأحجام محددة باستخدام أدوات Data Lynx Tools.',

  keywords: [
    'مركز المعرفة',
    'ضغط الصور',
    'تحويل الصور',
    'ضغط PDF',
    'ICO',
    'favicon',
    '500KB',
    'Data Lynx Tools',
  ],

  alternates: {

    canonical:
      'https://tools.datalynx.space/articles',

    languages: {
      ar: 'https://tools.datalynx.space/articles',
      en: 'https://tools.datalynx.space/en/articles',
      'x-default': 'https://tools.datalynx.space/articles',
    },

  },

  openGraph: {

    title:
      'مركز المعرفة | Data Lynx Tools',

    description:
      'أدلة ومقالات عملية حول التعامل مع الصور وملفات PDF وتحويل الصيغ وتقليل أحجام الملفات.',

    url:
      'https://tools.datalynx.space/articles',

    siteName: 'Data Lynx Tools',

    type: 'website',

    locale: 'ar_EG',

  },

};

export default function ArticlesPage() {
  return <ArticlesIndexContent />;
}
