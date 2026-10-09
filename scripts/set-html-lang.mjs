/*
 * Sets the correct lang/dir on <html> for each exported page.
 *
 * Why this is done after the export instead of inside the app:
 *
 * The <html> element is owned by the single root layout, and the static
 * export writes one HTML file per route from that one layout. There is no
 * per-route hook for the document element in a static export: a second
 * <html> in a route-group layout is invalid HTML and is unwrapped by the
 * browser, and patching the attribute after hydration causes a React
 * hydration mismatch.
 *
 * So the document element is corrected on the exported HTML itself, which
 * is exactly what a static host serves to a browser or a crawler. The
 * attribute is present in the file before any JavaScript runs.
 *
 * Arabic routes keep lang="ar" dir="rtl". Everything under /en gets
 * lang="en" dir="ltr".
 *
 * Usage: node scripts/set-html-lang.mjs   (runs after `next build`)
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'out');

if (!fs.existsSync(outDir)) {
  console.error('out/ not found. Run `next build` first.');
  process.exit(1);
}

function walk(dir, results = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(full, results);
    } else if (entry.name.endsWith('.html')) {
      results.push(full);
    }
  }

  return results;
}

const changes = [];

for (const file of walk(outDir)) {
  const rel = path.relative(outDir, file).replace(/\\/g, '/');

  // English pages live under out/en/.
  const isEnglish = rel === 'en' || rel.startsWith('en/');

  const lang = isEnglish ? 'en' : 'ar';
  const dir = isEnglish ? 'ltr' : 'rtl';

  const html = fs.readFileSync(file, 'utf8');

  // Only rewrite the opening <html ...> tag, never anything else.
  // Note: the tag is not at the start of a line in the exported HTML
  // (it follows the doctype on the same line), so the pattern is not
  // anchored.
  const updated = html.replace(
    /<html\s[^>]*>/i,
    `<html lang="${lang}" dir="${dir}" data-locale="${lang}">`
  );

  if (updated !== html) {
    fs.writeFileSync(file, updated);
    changes.push({ file: rel, lang, dir });
  }
}

console.log(
  JSON.stringify(
    {
      pagesUpdated: changes.length,
      english: changes.filter((c) => c.lang === 'en').length,
      arabic: changes.filter((c) => c.lang === 'ar').length,
      files: changes.map((c) => `${c.file} -> lang="${c.lang}" dir="${c.dir}"`),
    },
    null,
    2
  )
);
