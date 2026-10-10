import React from 'react';

import { LocaleProvider } from '../components/LocaleProvider';

/*
 * English layout.
 *
 * The document element is owned by the root layout in app/layout.tsx.
 * Next.js does not allow a second <html> element in the tree: the browser
 * unwraps a nested <html> and silently drops its lang/dir, leaving the
 * document as lang="ar" dir="rtl". That was verified against the exported
 * HTML, so this layout does not render one.
 *
 * Instead, language and direction are applied by wrapping the whole
 * English tree in a div[lang="en"][dir="ltr"]. That is valid HTML, is
 * present in the static output before any JavaScript runs, and every
 * element inside inherits the correct language and direction.
 *
 * Do NOT patch <html lang> from inline script here. React hydrates the
 * document element from the root layout's server HTML, so mutating it
 * before hydration produces a hydration mismatch and the attribute is not
 * patched up. If <html lang> must be locale-specific, it has to be
 * produced by the server render instead.
 */

export const metadata = {
  alternates: {
    languages: {
      'ar-EG': 'https://tools.datalynx.space/',
      en: 'https://tools.datalynx.space/en',
    },
  },

  /*
   * الصفحات الإنجليزية تُعرّف عنوانها كاملًا بنفسها، بما في ذلك
   * لاحقة "| Data Lynx Tools". لذلك نُلغي قالب العنوان الموروث من
   * layout الجذر لإزالة التكرار.
   *
   * القالب الأصلي يبقى كما هو تمامًا للمسارات العربية، وهذا التغيير
   * يخص مجموعة (en) وحدها.
   *
   * ملاحظة: `template: '%s'` يُلغي القالب الموروث لأبناء هذه المجموعة
   * فقط. أما `default` فيمرّ عبر قالب layout الجذر، لذلك يُكتب هنا
   * بدون لاحقة العلامة، لأن الجذر يضيفها.
   */
  title: {
    template: '%s',
    default:
      'Professional tools to compress images, convert formats and compress PDF files',
  },
};

export default function EnglishLayout({ children }) {
  return (
    <div
      lang="en"
      dir="ltr"
      className="min-h-screen text-slate-100 font-sans"
    >
      <LocaleProvider locale="en">{children}</LocaleProvider>
    </div>
  );
}
