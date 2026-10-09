import React from 'react';

/*
 * English tools route-group layout.
 *
 * Adds the crawlable signals that depend on the tool slug:
 *
 * 1. a self-referential canonical for each English tool page
 * 2. reciprocal hreflang alternatives pointing at the real Arabic pages
 *
 * x-default points at the Arabic counterpart, matching the rest of the
 * site. The tool title and description are intentionally not set here:
 * Workspace updates them dynamically, exactly as on the homepage, so
 * there is a single title-management mechanism for both languages.
 */
export async function generateMetadata({ params }) {
  const { tool } = await params;

  const arUrl = `https://tools.datalynx.space/tools/${tool}`;
  const enUrl = `https://tools.datalynx.space/en/tools/${tool}`;

  return {
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
