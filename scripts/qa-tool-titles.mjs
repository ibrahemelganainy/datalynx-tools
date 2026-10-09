/*
 * Direct-load hash behaviour: opening a tool URL fresh must apply the
 * dynamic document title, both in Arabic (original values) and English.
 */
export default async function run(page) {
  const out = {};

  for (const [base, lang] of [
    ['http://localhost:4321/', 'ar'],
    ['http://localhost:4321/en/', 'en'],
  ]) {
    const entries = [];

    for (const tool of [
      'image-compression',
      'format-converter',
      'pdf-compression',
      'prosecution-portal',
    ]) {
      await page.goto(`${base}#${tool}`, { waitUntil: 'load' });
      await page.waitForTimeout(700);

      entries.push(
        await page.evaluate(() => ({
          hash: window.location.hash,
          title: document.title,
          metaDescription: document
            .querySelector('meta[name="description"]')
            ?.getAttribute('content'),
          open: Boolean(document.querySelector('#workspace')),
        }))
      );
    }

    out[lang] = entries;
  }

  // Back/Forward across tools within one page load.
  return out;
}
