/*
 * Internal link + route validation.
 *
 * Crawls every exported HTML page, collects every internal href, and
 * reports any link whose target page does not exist in the static export.
 * Hash-only links are checked as anchors on their own page.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(scriptDir, '..', 'out');

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

function toRoute(file) {
  const rel = path.relative(root, file).replace(/\\/g, '/');
  if (rel === 'index.html') return '/';
  if (rel.endsWith('/index.html')) return `/${rel.slice(0, -'index.html'.length)}`;
  if (rel === '404.html') return '/404.html';
  return `/${rel.replace(/\.html$/, '')}`;
}

function routeExists(route) {
  const clean = route.replace(/\/+$/, '') || '/';
  const candidates =
    clean === '/'
      ? ['index.html']
      : [
          `${clean.replace(/^\//, '')}/index.html`,
          `${clean.replace(/^\//, '')}.html`,
          /*
           * Non-HTML public files (favicon.ico, robots.txt, sitemap.xml,
           * images in public/) are real, servable targets even though
           * they are not pages.
           */
          clean.replace(/^\//, ''),
        ];

  return candidates.some((c) => fs.existsSync(path.join(root, c)));
}

const pages = walk(root).map((f) => ({ file: f, route: toRoute(f) }));
const knownRoutes = new Set(pages.map((p) => p.route));

const broken = [];
const external = new Set();
const hashLinks = [];

for (const page of pages) {
  const html = fs.readFileSync(page.file, 'utf8');
  const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1]);

  for (const raw of hrefs) {
    const href = raw.trim();

    if (
      !href ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      href.startsWith('data:') ||
      href.startsWith('javascript:')
    ) {
      continue;
    }

    if (href.startsWith('http://') || href.startsWith('https://')) {
      external.add(href.split('#')[0]);
      continue;
    }

    const [pathWithQuery, hashPart] = href.split('#');
    const hash = hashPart ? `#${hashPart}` : '';

    /*
     * Next.js writes cache-busting query strings on metadata assets
     * (e.g. /favicon.ico?v=...). The query is not part of the file
     * path and must not be treated as one.
     */
    const pathPart = pathWithQuery.split('?')[0];

    // Hash-only link: anchor on the current page.
    if (pathPart === '') {
      hashLinks.push({ page: page.route, hash });
      continue;
    }

    const normalized = pathPart.startsWith('/') ? pathPart : `/${pathPart}`;

    if (!routeExists(normalized)) {
      broken.push({ page: page.route, href, resolved: normalized });
      continue;
    }

    if (hash) {
      const target = normalized.endsWith('/') ? `${normalized}index.html` : `${normalized}/index.html`;
      const targetFile = path.join(root, target.replace(/^\//, ''));
      if (fs.existsSync(targetFile)) {
        const targetHtml = fs.readFileSync(targetFile, 'utf8');
        if (!targetHtml.includes(`id="${hash.slice(1)}"`)) {
          broken.push({
            page: page.route,
            href,
            resolved: normalized,
            reason: `missing anchor ${hash}`,
          });
        }
      }
    }
  }
}

// Sitemap cross-check.
const sitemapPath = path.join(root, 'sitemap.xml');
const sitemapXml = fs.readFileSync(sitemapPath, 'utf8');
const locs = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const sitemapRoutes = locs
  .filter((u) => u.startsWith('https://tools.datalynx.space'))
  .map((u) => u.replace('https://tools.datalynx.space', '') || '/');

const sitemapMissing = sitemapRoutes.filter((r) => !routeExists(r));
const sitemapDuplicates = sitemapRoutes.filter(
  (r, i) => sitemapRoutes.indexOf(r) !== i
);

// Pages reachable but absent from the sitemap.
const sitemapSet = new Set(sitemapRoutes);

/* Trailing slashes differ between the export and the sitemap, so both
 * sides are normalized before the comparison. */
const normalize = (r) => r.replace(/\/+$/, '') || '/';

const sitemapSetNormalized = new Set([...sitemapSet].map(normalize));

const notInSitemap = pages
  .map((p) => p.route)
  .filter(
    (r) =>
      r !== '/404.html' &&
      r !== '/404/' &&
      r !== '/_not-found/' &&
      !sitemapSetNormalized.has(normalize(r))
  );

const robotsTxt = fs.readFileSync(path.join(root, 'robots.txt'), 'utf8');

const report = {
  exportedPages: pages.map((p) => p.route).sort(),
  totalInternalLinksChecked: pages.length,
  brokenInternalLinks: broken,
  sitemapUrlCount: sitemapRoutes.length,
  sitemapRoutes: [...sitemapRoutes].sort(),
  sitemapMissingPages: sitemapMissing,
  sitemapDuplicateEntries: sitemapDuplicates,
  exportedPagesMissingFromSitemap: notInSitemap,
  robotsReferencesSitemap: robotsTxt.includes(
    'Sitemap: https://tools.datalynx.space/sitemap.xml'
  ),
  robotsBlocksAnything: /^Disallow:\s*\S/m.test(robotsTxt),
  hashOnlyLinksFound: hashLinks.map((h) => `${h.page}${h.hash}`),
  uniqueExternalTargets: [...external].sort(),
};

/*
 * Written by the script itself so the file is always valid UTF-8 JSON.
 * (A PowerShell `>` redirect writes UTF-16 and corrupts the file.)
 */
const outDir = path.join(scriptDir, '..', 'lh');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(
  path.join(outDir, 'links-report.json'),
  JSON.stringify(report, null, 2),
  'utf8'
);

console.log(JSON.stringify(report, null, 2));
