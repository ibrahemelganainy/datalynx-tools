/*
 * Language-switcher check for the four new pages.
 *
 * Clicking the switcher on /about must land on /en/about (and the
 * reverse), which is what getAlternatePath derives from ROUTE_MAP. This
 * proves the new entries are wired into the existing switcher rather
 * than only existing as standalone files.
 */
export default async function run(page) {
  /*
   * يتم تجاهل الشرطة النهائية في المقارنة: ROUTE_MAP يعرّف المسارات
   * بدونها (وهو نفسه ما يفعله مبدّل اللغة لبقية صفحات الموقع مثل
   * /privacy و/en/privacy)، وGitHub Pages يخدم المسارين بنفس النتيجة.
   * الهدف هو التحقق من الانتقال بين اللغتين، لا من شكل الشرطة.
   */
  const strip = (p) => (p == null ? null : p.replace(/\/$/, ''));

  const pairs = [
    { from: 'http://localhost:4321/about/', to: '/en/about' },
    { from: 'http://localhost:4321/contact/', to: '/en/contact' },
    { from: 'http://localhost:4321/en/about/', to: '/about' },
    { from: 'http://localhost:4321/en/contact/', to: '/contact' },
  ];

  const results = [];

  for (const pair of pairs) {
    await page.goto(pair.from, { waitUntil: 'load' });
    await page.waitForTimeout(600);

    /* The switcher is the anchor carrying the other locale's lang attr. */
    const before = await page.evaluate(() => ({
      title: document.title,
      dir: getComputedStyle(document.body).direction,
    }));

    const href = await page.evaluate(() => {
      const link =
        document.querySelector('nav a[lang="ar"]') ||
        document.querySelector('nav a[lang="en"]');

      return link ? link.getAttribute('href') : null;
    });

    results.push({
      from: pair.from,
      expectedTarget: pair.to,
      observedHref: href,
      ok: strip(href) === pair.to,
      title: before.title,
      dir: before.dir,
    });
  }

  return { pairs: results };
}
