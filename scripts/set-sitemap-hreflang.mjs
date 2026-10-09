/*
 * Adds hreflang alternates to the exported sitemap.xml.
 *
 * Why: Next.js generates sitemap.xml from app/sitemap.js, but it does not
 * emit xhtml:link alternates for the `alternates.languages` field (verified
 * against the real output). This site needs them: Arabic lives at the root
 * and English under /en, so without hreflang the two versions of the same
 * page can be treated as competing duplicates.
 *
 * The URL list is not duplicated here. This script reads the exported
 * sitemap and derives each page's English counterpart from the same
 * route map the app uses, so there is a single source of truth.
 *
 * Usage: node scripts/set-sitemap-hreflang.mjs   (runs after `next build`)
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const sitemapFile = path.join(root, 'out', 'sitemap.xml');

if (!fs.existsSync(sitemapFile)) {
  console.error('out/sitemap.xml not found. Run `next build` first.');
  process.exit(1);
}

const SITE_URL = 'https://tools.datalynx.space';

/*
 * Arabic path (without leading slash) -> English path.
 * Kept in step with app/lib/i18n/articles.js ROUTE_MAP.
 */
const EN_PATH = {
  '': '',
  articles: 'articles',
  privacy: 'privacy',
  terms: 'terms',
  'articles/image-pdf-compression-tools':
    'articles/image-pdf-compression-tools',
  'articles/compress-image-500kb': 'articles/compress-image-500kb',
  'articles/jpg-vs-webp-vs-png-avif': 'articles/image-format-comparison',
};

const xml = fs.readFileSync(sitemapFile, 'utf8');

if (xml.includes('xmlns:xhtml')) {
  console.log('sitemap.xml already declares hreflang; leaving it unchanged.');
  process.exit(0);
}

let converted = 0;
const skipped = [];

const output = xml.replace(
  /<url>([\s\S]*?)<\/url>/g,
  (block) => {
    const loc = (block.match(/<loc>([^<]+)<\/loc>/) || [])[1];

    if (!loc) return block;

    const arPath = loc.replace(SITE_URL, '').replace(/^\/+/, '').replace(/\/+$/, '');
    const enPath = EN_PATH[arPath];

    if (enPath === undefined) {
      skipped.push(loc);
      return block;
    }

    const arUrl = arPath ? `${SITE_URL}/${arPath}` : SITE_URL;
    const enUrl = enPath ? `${SITE_URL}/en/${enPath}` : `${SITE_URL}/en`;

    const alternates =
      `<xhtml:link rel="alternate" hreflang="ar-EG" href="${arUrl}"/>` +
      `<xhtml:link rel="alternate" hreflang="en" href="${enUrl}"/>` +
      `<xhtml:link rel="alternate" hreflang="x-default" href="${arUrl}"/>`;

    converted += 1;

    // Insert the alternates immediately after <loc>.
    return block.replace(
      /(<loc>[^<]+<\/loc>)/,
      `$1${alternates}`
    );
  }
);

const withNamespace = output.replace(
  /<urlset([^>]*)>/,
  (match, attrs) =>
    attrs.includes('xmlns:xhtml')
      ? match
      : `<urlset${attrs.replace(/\/>$/, '')} xmlns:xhtml="http://www.w3.org/1999/xhtml">`
);

fs.writeFileSync(sitemapFile, withNamespace);

console.log(
  JSON.stringify(
    {
      entriesWithAlternates: converted,
      skippedWithoutEnglishCounterpart: skipped,
      declaresXhtmlNamespace: withNamespace.includes('xmlns:xhtml'),
    },
    null,
    2
  )
);
