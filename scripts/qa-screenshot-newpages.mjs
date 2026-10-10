/*
 * Visual verification of the four new pages: full-page screenshots in a
 * desktop viewport, plus a mobile-width render of the contact page to
 * confirm the two-column layout collapses to one column.
 */
export default async function run(page) {
  await page.setViewportSize({ width: 1350, height: 940 });

  const shots = [
    ['http://localhost:4321/about/', 'lh/page-about-ar.png'],
    ['http://localhost:4321/contact/', 'lh/page-contact-ar.png'],
    ['http://localhost:4321/en/about/', 'lh/page-about-en.png'],
    ['http://localhost:4321/en/contact/', 'lh/page-contact-en.png'],
  ];

  for (const [url, file] of shots) {
    await page.goto(url, { waitUntil: 'load' });
    await page.waitForTimeout(1200);
    await page.screenshot({ path: file, fullPage: false });
  }

  /* Mobile: the contact grid must be a single column. */
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://localhost:4321/contact/', { waitUntil: 'load' });
  await page.waitForTimeout(1200);

  const mobile = await page.evaluate(() => {
    const grid = document.querySelector('main .grid');
    const cols = grid ? getComputedStyle(grid).gridTemplateColumns : null;

    return {
      gridTemplateColumns: cols,
      isSingleColumn: cols ? cols.split(' ').length === 1 : null,
      docWidth: document.documentElement.scrollWidth,
      viewport: window.innerWidth,
      horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth + 1,
    };
  });

  await page.screenshot({ path: 'lh/page-contact-mobile.png', fullPage: false });

  return { mobile };
}
