import React from 'react';

import { LocaleProvider } from '../../../components/LocaleProvider';
import { getToolTitle } from '../../../lib/i18n/toolTitles';
/*
 * Layout مجموعة مسارات الأدوات العربية (داخل [tool] حتى تتوفر
 * معلمة المسار).
 *
 * ما يضيفه هذا الـlayout هو الإشارات القابلة للزحف فقط:
 *
 * 1. canonical لكل صفحة أداة (بدل أن ترث canonical الجذر `/`)
 * 2. بدائل اللغة hreflang المقابلة لها في النسخة الإنجليزية
 *
 * وكلاهما مشتق من نفس الـslug، فالنسخة العربية تُشير إلى الإنجليزية
 * والعكس صحيح، وx-default يشير إلى العربية لأنها اللغة الافتراضية،
 * بنفس الاستراتيجية المستخدمة في باقي الموقع.
 *
 * العنوان: يُكتب هنا للـHTML الثابت أيضًا، لا للعميل فقط.
 *
 * كانت القيمة الافتراضية للعنوان تأتي من layout الجذر، وتُعدّلها
 * بعد ذلك StreamedMetadata بتأثير جانبي على `document.title` بعد
 * الترطيب. النتيجة كانت أن تحميل الصفحة مباشرةً (أو عمل refresh)
 * يُبقي عنوان الجذر لحظيًا بدل عنوان الأداة.
 *
 * بإضافة العنوان هنا يصبح الـ`<title>` في HTML المبني مكتوبًا
 * بالعنوان الصحيح من أول بايت، وبنفس البنية تمامًا، فلا يظهر أي
 * تعارض ولا flash. قالب layout الجذر (%s | Data Lynx Tools) لا
 * يُطبَّق على هذا الحقل لأن القيمة النهائية جاهزة باللاحقة، وهذا
 * مُعرّف في app/lib/i18n/toolTitles.js.
 */
export async function generateMetadata({ params }) {
  const { tool } = await params;

  const arUrl = `https://tools.datalynx.space/tools/${tool}`;
  const enUrl = `https://tools.datalynx.space/en/tools/${tool}`;

  return {
    title: getToolTitle('ar', tool) || undefined,

    alternates: {
      canonical: arUrl,

      languages: {
        'ar-EG': arUrl,
        en: enUrl,
        'x-default': arUrl,
      },
    },
  };
}

export default function ArabicToolsLayout({ children }) {
  return <LocaleProvider locale="ar">{children}</LocaleProvider>;
}
