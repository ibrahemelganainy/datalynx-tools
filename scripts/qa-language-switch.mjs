/*
 * Verifies language switching keeps the user on the equivalent page:
 *  - Arabic homepage  -> /en   (and back)
 *  - Arabic article   -> /en/articles/<english-slug>
 *  - Arabic privacy   -> /en/privacy
 * Also checks the switcher is a real, crawlable <a href>.
 */
export default async function run(page) {
  const results = [];

  const cases = [
    ['http://localhost:4321/', '/en', 'https://tools.datalynx.space/en'],
    ['http://localhost:4321/articles', '/en/articles', null],
    ['http://localhost:4321/privacy', '/en/privacy', null],
    [
      'http://localhost:4321/articles/jpg-vs-webp-vs-png-avif',
      '/en/articles/image-format-comparison',
      null,
    ],
    [
      'http://localhost:4321/articles/compress-image-500kb',
      '/en/articles/compress-image-500kb',
      null,
    ],
    [
      'http://localhost:4321/articles/image-pdf-compression-tools',
      '/en/articles/image-pdf-compression-tools',
      null,
    ],
  ];

  for (const [url, expectedPath] of cases) {
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(300);

    const switcher = await page.evaluate(() => {
      const link = document.querySelector('nav a[hreflang], nav a[lang]');
      return link
        ? {
            tag: link.tagName.toLowerCase(),
            href: link.getAttribute('href'),
            hreflang: link.getAttribute('hreflang'),
            lang: link.getAttribute('lang'),
            text: link.textContent.trim(),
          }
        : null;
    });

    results.push({
      from: url.replace('http://localhost:4321', ''),
      switcher,
      matchesExpected: switcher?.href === expectedPath,
      expected: expectedPath,
    });
  }

  // Follow the switcher on the Arabic article with a different English slug.
  await page.goto('http://localhost:4321/articles/jpg-vs-webp-vs-png-avif', {
    waitUntil: 'domcontentloaded',
  });
  await page.waitForTimeout(300);
  await page.evaluate(() => {
    const link = document.querySelector('nav a[hreflang], nav a[lang]');
    if (link) link.click();
  });
  await page.waitForTimeout(900);

  const followed = await page.evaluate(() => ({
    url: window.location.pathname,
    lang: document.documentElement.getAttribute('lang'),
    dir: document.documentElement.getAttribute('dir'),
    title: document.title,
    h1: document.querySelector('h1')?.innerText.replace(/\s+/g, ' ').trim(),
  }));

  return { results, followed };
}
