import React from 'react';

import { LocaleProvider } from '../../../components/LocaleProvider';

/*
 * Layout مجموعة مسارات الأدوات العربية (داخل [tool] حتى تتوفر
 * معلمة المسار).
 *
 * الصفحة نفسها لا تُصدّر أي metadata، تمامًا مثل الصفحة الرئيسية: عنوان الأداة ووصفها يُحدَّثان ديناميكيًا من Workspace بنفس
 * الطريقة المستخدمة حاليًا، فلا يوجد نظام ثانٍ لإدارة العناوين.
 *
 * ما يضيفه هذا الـlayout هو الإشارات القابلة للزحف فقط:
 *
 * 1. canonical لكل صفحة أداة (بدل أن ترث canonical الجذر `/`)
 * 2. بدائل اللغة hreflang المقابلة لها في النسخة الإنجليزية
 *
 * وكلاهما مشتق من نفس الـslug، فالنسخة العربية تُشير إلى الإنجليزية
 * والعكس صحيح، وx-default يشير إلى العربية لأنها اللغة الافتراضية،
 * بنفس الاستراتيجية المستخدمة في باقي الموقع.
 */
export async function generateMetadata({ params }) {
  const { tool } = await params;

  const arUrl = `https://tools.datalynx.space/tools/${tool}`;
  const enUrl = `https://tools.datalynx.space/en/tools/${tool}`;

  return {
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
