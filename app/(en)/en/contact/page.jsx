import ContactContent from '../../../components/ContactContent';

import {
  SITE_URL,
  buildGraph,
  breadcrumbNode,
  organizationNode,
  serializeJsonLd,
  websiteNode,
} from '../../../lib/structuredData';

/*
 * English Contact page: /en/contact
 *
 * A real, statically generated HTML page, so it can be opened directly,
 * refreshed and indexed on its own.
 *
 * The contact details are the same verified values used in the site
 * footer. The (en) route group cancels the inherited root title
 * template, so the brand suffix is written here and appears once.
 */
export const metadata = {
  title: 'Contact Us | Data Lynx Tools',
  description:
    'Contact Data Lynx Tools by WhatsApp or email for questions, feedback and technical support with image compression, format conversion and PDF compression.',

  alternates: {
    canonical: `${SITE_URL}/en/contact`,
    languages: {
      ar: `${SITE_URL}/contact`,
      en: `${SITE_URL}/en/contact`,
      'x-default': `${SITE_URL}/contact`,
    },
  },

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: `${SITE_URL}/en/contact`,
    title: 'Contact Us | Data Lynx Tools',
    description:
      'Contact Data Lynx Tools by WhatsApp or email for questions, support and feedback.',
    siteName: 'Data Lynx Tools',
  },
};

/*
 * Structured data: a ContactPage linked to the same stable WebSite and
 * Organization identifiers as the other pages. The contact point lives
 * on the Organization entity, so it is declared once and referenced,
 * never duplicated as a conflicting entity.
 */
const jsonLd = buildGraph([
  {
    '@type': 'ContactPage',
    '@id': `${SITE_URL}/en/contact#contactpage`,
    url: `${SITE_URL}/en/contact`,
    name: 'Contact Us | Data Lynx Tools',
    inLanguage: 'en',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#organization` },
  },
  websiteNode('en'),
  organizationNode(),
  breadcrumbNode([
    { name: 'Home', url: `${SITE_URL}/en` },
    { name: 'Contact Us', url: `${SITE_URL}/en/contact` },
  ]),
]);

export default function EnglishContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />

      <ContactContent lang="en" />
    </>
  );
}
