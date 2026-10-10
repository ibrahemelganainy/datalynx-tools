/*
 * Measures whether the desktop Navbar overflows at each breakpoint after
 * the two new links were added.
 *
 * The desktop menu is `hidden md:flex`, so below 768px it is not shown at
 * all and there is nothing to measure. Above that, we compare the nav
 * container's scrollWidth against its clientWidth, and check whether the
 * right-most item extends past the viewport.
 */
export default async function run(page) {
  const widths = [768, 820, 900, 1024, 1280, 1440];
  const results = [];

  for (const width of widths) {
    await page.setViewportSize({ width, height: 400 });
    await page.goto('http://localhost:4321/', { waitUntil: 'load' });
    await page.waitForTimeout(600);

    const m = await page.evaluate(() => {
      const bar = document.querySelector('nav > div');
      const desktop = document.querySelector('nav > div > div.hidden');
      const links = desktop ? Array.from(desktop.querySelectorAll('a')) : [];
      const last = links[links.length - 1];
      const first = links[0];

      const rect = (el) => {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return {
          left: Math.round(r.left),
          right: Math.round(r.right),
          width: Math.round(r.width),
        };
      };

      return {
        barScrollWidth: bar.scrollWidth,
        barClientWidth: bar.clientWidth,
        menuVisible: desktop
          ? getComputedStyle(desktop).display !== 'none'
          : false,
        firstItem: rect(first),
        lastItem: rect(last),
        viewport: window.innerWidth,
      };
    });

    results.push({
      width,
      ...m,
      barOverflow: m.barScrollWidth > m.barClientWidth + 1,
      lastItemClipped: m.lastItem
        ? m.lastItem.right > m.viewport + 1
        : null,
    });
  }

  return { results };
}
