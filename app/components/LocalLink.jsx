'use client';

import React from 'react';

import { useLocale } from './LocaleProvider';

/*
 * LocalLink — رابط داخلي يحترم اللغة النشطة.
 *
 * سبب وجوده:
 *
 * صفحات المقالات العربية تُصدّر `metadata` (وهي قيم لا يجوز تعديلها)،
 * وبالتالي يجب أن تبقى Server Components. لكن روابطها الداخلية تحتاج
 * إلى معرفة اللغة النشطة حتى لا تعود إلى العربية أثناء التصفح الإنجليزي.
 *
 * هذا المكوّن الصغير هو الجسر: يقرأ اللغة من LocaleProvider ثم يبني
 * الرابط الصحيح عبر lhref. الشكل والكلاسات تأتي من الصفحة الأم كما هي،
 * فالتصميم لا يتغير إطلاقًا.
 *
 * @param {string} to  المسار بدون بادئة اللغة، مثل 'tools/image-compression'
 */
export default function LocalLink({ to, children, ...rest }) {
  const { lhref } = useLocale();

  return (
    <a href={lhref(to)} {...rest}>
      {children}
    </a>
  );
}
