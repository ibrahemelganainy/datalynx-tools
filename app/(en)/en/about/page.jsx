import AboutContent from '../../../components/AboutContent';

import {
  SITE_URL,
  buildGraph,
  breadcrumbNode,
  organizationNode,
  serializeJsonLd,
  websiteNode,
} from '../../../lib/structuredData';

/*
 * English About page: /en/about
 *
 * A real, statically generated HTML page, so it can be opened directly,
 * refreshed and indexed on its own.
 *
 * The (en) route group cancels the inherited root title template
 * (`template: '%s'`), so the brand suffix is written here explicitly and
 * appears exactly once.
 */
export const metadata = {
  title: 'About Us | Data Lynx Tools',
  description:
    'Learn about Data Lynx Tools: browser-based utilities for compressing images, converting image formats, creating ICO files, compressing PDF documents and preparing files for size-limited portals.',

  alternates: {
    canonical: `${SITE_URL}/en/about`,
    languages: {
      ar: `${SITE_URL}/about`,
      en: `${SITE_URL}/en/about`,
      'x-default': `${SITE_URL}/about`,
    },
  },

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: `${SITE_URL}/en/about`,
    title: 'About Us | Data Lynx Tools',
    description:
      'Learn about Data Lynx Tools and its image compression, format conversion, ICO creation and PDF compression tools.',
    siteName: 'Data Lynx Tools',
  },
};

/*
 * Structured data: an AboutPage linked to the same stable WebSite and
 * Organization identifiers used on the Arabic page, so the two language
 * versions describe one entity rather than two conflicting ones.
 */
const jsonLd = buildGraph([
  {
    '@type': 'AboutPage',
    '@id': `${SITE_URL}/en/about#aboutpage`,
    url: `${SITE_URL}/en/about`,
    name: 'About Us | Data Lynx Tools',
    inLanguage: 'en',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#organization` },
  },
  websiteNode('en'),
  organizationNode(),
  breadcrumbNode([
    { name: 'Home', url: `${SITE_URL}/en` },
    { name: 'About Us', url: `${SITE_URL}/en/about` },
  ]),
]);

export default function EnglishAboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />

      <AboutContent lang="en" />
    </>
  );
}
