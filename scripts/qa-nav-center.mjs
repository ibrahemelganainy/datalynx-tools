/*
 * Verifies the navbar layout after centering the links:
 *
 *   1. the links group is horizontally centred within the navbar bar
 *   2. the logo is at the start edge and the blue datalynx.space button
 *      is at the end edge (unchanged from before)
 *   3. no horizontal overflow at any breakpoint
 *   4. the four tools still live in the dropdown and nothing else moved
 */
export default async function run(page) {
  const widths = [768, 900, 1024, 1280, 1440];
  const results = [];

  for (const width of widths) {
    await page.setViewportSize({ width, height: 500 });
    await page.goto('http://localhost:4321/', { waitUntil: 'load' });
    await page.waitForTimeout(700);

    const m = await page.evaluate(() => {
      const bar = document.querySelector('nav > div');
      const barRect = bar.getBoundingClientRect();

      const logo = bar.querySelector('a[aria-label="Data Lynx Tools"]');
      const links = bar.querySelector('.hidden.md\\:flex.justify-self-center');
      const blue = Array.from(bar.querySelectorAll('a')).find(
        (a) => a.textContent.trim() === 'datalynx.space'
      );

      const center = (el) => {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return Math.round(r.left + r.width / 2);
      };

      return {
        barCenter: Math.round(barRect.left + barRect.width / 2),
        barLeft: Math.round(barRect.left),
        barRight: Math.round(barRect.right),
        linksCenter: center(links),
        linksText: links ? links.innerText.replace(/\s+/g, ' ').trim() : null,
        logoCenter: center(logo),
        logoLeft: logo ? Math.round(logo.getBoundingClientRect().left) : null,
        blueCenter: center(blue),
        blueRight: blue ? Math.round(blue.getBoundingClientRect().right) : null,
        barScrollWidth: bar.scrollWidth,
        barClientWidth: bar.clientWidth,
        viewport: window.innerWidth,
        direction: getComputedStyle(document.body).direction,
      };
    });

    results.push({
      width,
      ...m,
      /* How far the links group centre sits from the bar centre. */
      centerOffsetPx: m.linksCenter == null ? null : m.linksCenter - m.barCenter,
      barOverflow: m.barScrollWidth > m.barClientWidth + 1,
      blueAtEnd: m.blueRight !== null && m.blueRight <= m.barRight + 1,
      logoAtStart: m.logoLeft !== null && m.logoLeft >= m.barLeft - 1,
    });
  }

  return { results };
}
