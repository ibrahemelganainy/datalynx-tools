import React from 'react';

import { getToolTitle } from '../../../../lib/i18n/toolTitles';

/*
 * English tools route-group layout.
 *
 * Adds the crawlable signals that depend on the tool slug:
 *
 * 1. a self-referential canonical for each English tool page
 * 2. reciprocal hreflang alternatives pointing at the real Arabic pages
 * 3. the exact English tool title, so it is present in the static HTML
 *    instead of only being applied to document.title after hydration
 *
 * x-default points at the Arabic counterpart, matching the rest of the
 * site. The title value already carries the "| Data Lynx Tools" suffix,
 * and the (en) route group sets `title.template: '%s'`, so the suffix is
 * not appended a second time.
 */
export async function generateMetadata({ params }) {
  const { tool } = await params;

  const arUrl = `https://tools.datalynx.space/tools/${tool}`;
  const enUrl = `https://tools.datalynx.space/en/tools/${tool}`;

  const baseTitle = getToolTitle('en', tool);

  return {
    /*
     * القيمة يجب أن تحمل لاحقة العلامة، لأن أي layout في مسار هذا
     * الملف يستطيع إلغاء القالب الموروث لكن لا يوجد له hooks لكل
     * عنوان صفحة على حدة، فاللاحقة تُضاف هنا مرة واحدة.
     */
    title: baseTitle ? `${baseTitle} | Data Lynx Tools` : undefined,

    alternates: {
      canonical: enUrl,

      languages: {
        ar: arUrl,
        en: enUrl,
        'x-default': arUrl,
      },
    },
  };
}

export default function EnglishToolsLayout({ children }) {
  return children;
}
