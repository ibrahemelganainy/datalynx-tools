/*
 * Verifies the exported Arabic metadata against the exact values that
 * shipped before the i18n work. Any difference is a preservation
 * failure and is reported explicitly.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

/* The Arabic values taken verbatim from app/layout.tsx. */
const EXPECTED = {
  title:
    'Data Lynx Tools - أدوات احترافية لضغط الصور، تحويل الصيغ، وملفات PDF',
  description:
    'منصة متكاملة لضغط الصور، تحويل صيغ الصور (WebP, PNG, JPEG, ICO)، ضغط ملفات PDF، وتجهيز وتصغير مستندات النيابة العامة أقل من 500KB بضغطة زر وبدون رفعها لسيرفر.',
  keywords: [
    'ضغط الصور أونلاين',
    'تحويل صيغ الصور',
    'تحويل صورة إلى ICO',
    'ضغط ملفات PDF مجاناً',
    'بوابة النيابة العامة ضغط المستندات',
    'تصغير حجم التوكيل أقل من 500 كيلو',
    'Data Lynx Tools',
  ],
  canonical: 'https://tools.datalynx.space/',
};

const PAGES = {
  'homepage (ar)': 'index.html',
  'knowledge center (ar)': 'articles/index.html',
  'privacy (ar)': 'privacy/index.html',
  'terms (ar)': 'terms/index.html',
  'tool page (ar)': 'tools/pdf-compression/index.html',
};

const attr = (html, re) => {
  const m = html.match(re);
  return m ? m[1] : null;
};

const results = [];
let failures = 0;

/* The homepage must match every preserved value exactly. */
{
  const html = fs.readFileSync(path.join(root, 'out', 'index.html'), 'utf8');

  const actual = {
    title: attr(html, /<title>([^<]*)<\/title>/),
    description: attr(html, /<meta name="description" content="([^"]*)"/),
    keywords: attr(html, /<meta name="keywords" content="([^"]*)"/),
    canonical: attr(html, /<link rel="canonical" href="([^"]*)"/),
  };

  const checks = {
    title: actual.title === EXPECTED.title,
    description: actual.description === EXPECTED.description,
    keywords: actual.keywords === EXPECTED.keywords.join(','),
    canonical: actual.canonical === EXPECTED.canonical,
  };

  if (Object.values(checks).some((v) => !v)) failures += 1;

  results.push({ page: 'homepage (ar)', checks, actual });
}

/* Every other Arabic page must keep its own Arabic metadata. */
for (const [label, file] of Object.entries(PAGES)) {
  if (label === 'homepage (ar)') continue;

  const full = path.join(root, 'out', file);
  if (!fs.existsSync(full)) {
    results.push({ page: label, missing: true });
    failures += 1;
    continue;
  }

  const html = fs.readFileSync(full, 'utf8');

  const title = attr(html, /<title>([^<]*)<\/title>/);
  const description = attr(html, /<meta name="description" content="([^"]*)"/);
  const canonical = attr(html, /<link rel="canonical" href="([^"]*)"/);

  /* Arabic metadata must contain Arabic text, and the canonical must be
   * on the production Arabic path (never /en). */
  const checks = {
    titleIsArabic: Boolean(title && /[\u0600-\u06FF]/.test(title)),
    descriptionIsArabic: Boolean(
      description && /[\u0600-\u06FF]/.test(description)
    ),
    canonicalIsArabicNotEnglish: Boolean(
      canonical &&
        canonical.startsWith('https://tools.datalynx.space/') &&
        !canonical.startsWith('https://tools.datalynx.space/en')
    ),
  };

  if (Object.values(checks).some((v) => !v)) failures += 1;

  results.push({ page: label, checks, title, description, canonical });
}

const report = {
  failures,
  expectedArabic: EXPECTED,
  results,
};

fs.writeFileSync(
  path.join(root, 'lh', 'arabic-metadata-check.json'),
  JSON.stringify(report, null, 2),
  'utf8'
);

console.log(JSON.stringify(report, null, 2));
