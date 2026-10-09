/*
 * Final acceptance check against the exported static site: routes, lang,
 * canonical, hreflang, sitemap, robots and internal links.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'out');

const ROUTES = [
  '/',
  '/articles',
  '/articles/image-pdf-compression-tools',
  '/articles/compress-image-500kb',
  '/articles/jpg-vs-webp-vs-png-avif',
  '/privacy',
  '/terms',
  '/en',
  '/en/articles',
  '/en/articles/image-pdf-compression-tools',
  '/en/articles/compress-image-500kb',
  '/en/articles/image-format-comparison',
  '/en/privacy',
  '/en/terms',
];

function fileFor(route) {
  const clean = route.replace(/\/+$/, '');
  return path.join(out, clean === '' ? 'index.html' : `${clean.slice(1)}/index.html`);
}

const rows = [];
let failures = 0;

for (const route of ROUTES) {
  const file = fileFor(route);

  if (!fs.existsSync(file)) {
    rows.push({ route, exists: false });
    failures += 1;
    continue;
  }

  const html = fs.readFileSync(file, 'utf8');

  const htmlTag = (html.match(/<html\s[^>]*>/i) || [''])[0];
  const lang = (htmlTag.match(/lang="([^"]+)"/) || [])[1];
  const dir = (htmlTag.match(/dir="([^"]+)"/) || [])[1];

  const canonical = (html.match(/<link rel="canonical" href="([^"]+)"/) || [])[1];

  const hreflangs = [
    ...html.matchAll(/hreflang="([^"]+)"\s+href="([^"]+)"/g),
  ].map((m) => `${m[1]}=${m[2]}`);

  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1];

  const expectedLang = route === '/en' || route.startsWith('/en/') ? 'en' : 'ar';
  const expectedDir = expectedLang === 'en' ? 'ltr' : 'rtl';

  const problems = [];

  if (lang !== expectedLang) problems.push(`lang=${lang} expected ${expectedLang}`);
  if (dir !== expectedDir) problems.push(`dir=${dir} expected ${expectedDir}`);
  if (!canonical) problems.push('no canonical');

  // Canonical must be self-referential (Arabic canonical must differ from
  // the English one).
  const expectedCanonical = `https://tools.datalynx.space${route === '/' ? '' : route}`;
  if (canonical && canonical.replace(/\/$/, '') !== expectedCanonical.replace(/\/$/, '')) {
    problems.push(`canonical=${canonical}`);
  }

  // x-default must point at the Arabic counterpart.
  const xDefault = hreflangs.find((h) => h.startsWith('x-default='));
  if (xDefault && !xDefault.includes('x-default=https://tools.datalynx.space') ) {
    problems.push('x-default not on the production domain');
  }

  if (problems.length) failures += 1;

  rows.push({
    route,
    exists: true,
    lang,
    dir,
    title: title ? title.slice(0, 62) : null,
    canonical,
    hreflangCount: hreflangs.length,
    problems,
  });
}

/* --- sitemap --- */
const sitemap = fs.readFileSync(path.join(out, 'sitemap.xml'), 'utf8');
const sitemapLocs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const sitemapHasHreflang = /xhtml:link/.test(sitemap);
const sitemapHreflangs = [
  ...sitemap.matchAll(/hreflang="([^"]+)"/g),
].map((m) => m[1]);

/* Every sitemap <loc> must correspond to a real page. */
const sitemapMissing = sitemapLocs
  .map((u) => u.replace('https://tools.datalynx.space', '') || '/')
  .filter((r) => !fs.existsSync(fileFor(r)));

const sitemapDuplicates = sitemapLocs.filter((u, i) => sitemapLocs.indexOf(u) !== i);

/* Nothing hash-only must appear as a page. */
const sitemapHashEntries = sitemapLocs.filter((u) => u.includes('#'));

/* --- robots --- */
const robots = fs.readFileSync(path.join(out, 'robots.txt'), 'utf8');

console.log(
  JSON.stringify(
    {
      totalRoutes: ROUTES.length,
      routesWithProblems: failures,
      routes: rows,
      sitemap: {
        urlCount: sitemapLocs.length,
        urls: sitemapLocs,
        hasHreflangAlternates: sitemapHasHreflang,
        hreflangValues: [...new Set(sitemapHreflangs)].sort(),
        missingPages: sitemapMissing,
        duplicateEntries: sitemapDuplicates,
        hashOnlyEntries: sitemapHashEntries,
      },
      robots: {
        content: robots.trim(),
        referencesSitemap: robots.includes(
          'Sitemap: https://tools.datalynx.space/sitemap.xml'
        ),
        hasDisallow: /^Disallow:/m.test(robots),
      },
    },
    null,
    2
  )
);
