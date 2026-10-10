import React from 'react';

import { LocaleProvider } from '../components/LocaleProvider';
import InstallAppButton from '../components/InstallAppButton';

/*
 * Layout لمجموعة المسارات العربية.
 *
 * لا يتم تغيير `title` أو `description` أو `keywords` هنا: كل القيم
 * الموروثة من layout الجذر تبقى كما هي بدون أي تعديل.
 *
 * بخصوص hreflang:
 *
 * `alternates.languages` في Next.js يستخدم مفاتيح بصيغة
 * `language-region` (مثل ar-EG) ويُصدر hreflang بنفس القيمة.
 * لذلك نستخدم `ar-EG` لأن الموقع يستخدم `ar_EG` كلغة أساسية في
 * openGraph، وبذلك تكون إشارة hreflang دقيقة ومتسقة، وGoogle يعامل
 * `ar-EG` كمرادف لـ`ar` عند مطابقة لغة المستخدم.
 *
 * canonical يبقى كما هو تمامًا (`/`) بدون أي تغيير في الروابط المنشورة.
 */
export const metadata = {
  alternates: {
    canonical: '/',

    languages: {
      'ar-EG': 'https://tools.datalynx.space/',
      en: 'https://tools.datalynx.space/en',
    },
  },
};

export default function ArabicLayout({ children }) {
  return (
    <LocaleProvider locale="ar">
      <InstallAppButton />
      {children}
    </LocaleProvider>
  );
}
