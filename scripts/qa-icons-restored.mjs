/*
 * Visual confirmation that the original Font Awesome icons are restored:
 * counts the rendered <svg class="svg-inline--fa"> elements, checks each
 * has a non-zero bounding box (i.e. is actually painted, not collapsed),
 * reads the computed fill colour (must not be a "colourless" value), and
 * writes screenshots of the hero and footer icon areas.
 */
export default async function run(page) {
  await page.setViewportSize({ width: 1350, height: 940 });
  await page.goto('http://localhost:4321/', { waitUntil: 'load' });
  await page.waitForTimeout(2000);

  const measure = async (selector) =>
    page.evaluate((sel) => {
      const nodes = Array.from(document.querySelectorAll(sel));
      return nodes.map((n) => {
        const r = n.getBoundingClientRect();
        const s = getComputedStyle(n);
        return {
          w: Math.round(r.width * 100) / 100,
          h: Math.round(r.height * 100) / 100,
          color: s.color,
          fill: s.fill,
          opacity: s.opacity,
          viewBox: n.getAttribute('viewBox'),
          collapsed: r.width < 1 || r.height < 1,
        };
      });
    }, selector);

  const hero = await measure('#hero-reveal svg, section:first-of-type svg');
  const footer = await measure('footer svg');

  const heroSection = page.locator('main > section').first();
  await page.screenshot({
    path: 'lh/restored-hero.png',
    clip: await heroSection.boundingBox(),
  });

  const footerEl = page.locator('footer');
  await footerEl.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await page.screenshot({
    path: 'lh/restored-footer.png',
    clip: await footerEl.boundingBox(),
  });

  return {
    heroIconCount: hero.length,
    footerIconCount: footer.length,
    heroCollapsed: hero.filter((h) => h.collapsed).length,
    footerCollapsed: footer.filter((f) => f.collapsed).length,
    heroSample: hero.slice(0, 5),
    footerSample: footer.slice(0, 5),
  };
}
