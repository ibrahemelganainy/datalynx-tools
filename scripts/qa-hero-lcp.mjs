/*
 * Measures how long the Hero <h1> stays invisible.
 *
 * Framer Motion's `initial="hidden"` renders the hero text at opacity 0 in
 * the server HTML; it only becomes visible once React hydrates and the
 * animation runs. The LCP trace shows ~1.8s of pure Render Delay on that
 * element, which is the animation gate, not a network or layout cost.
 *
 * This script records: when the h1 exists in the DOM, its opacity over
 * time, and the paint timings — so the animation gate is measured rather
 * than assumed.
 */
export default async function run(page) {
  await page.goto('http://localhost:4321/', { waitUntil: 'domcontentloaded' });

  const samples = [];
  const start = Date.now();

  for (let i = 0; i < 40; i += 1) {
    const s = await page.evaluate(() => {
      const h1 = document.querySelector('h1');
      return {
        exists: Boolean(h1),
        opacity: h1 ? getComputedStyle(h1).opacity : null,
        styleAttr: h1 ? h1.getAttribute('style') : null,
        textLength: h1 ? h1.textContent.trim().length : 0,
      };
    });

    samples.push({ t: Date.now() - start, ...s });

    /* Stop once it has been fully visible for a while. */
    if (Number(s.opacity) === 1 && samples.filter((x) => Number(x.opacity) === 1).length > 5) {
      break;
    }

    await page.waitForTimeout(100);
  }

  const firstVisible = samples.find((s) => Number(s.opacity) === 1);
  const firstInDom = samples.find((s) => s.exists);

  /*
   * Also confirm the h1 text is present in the STATIC HTML (server-rendered),
   * which is what makes it eligible as an LCP candidate at all.
   */
  const staticHtml = await page.evaluate(async () => {
    const res = await fetch('/');
    const html = await res.text();
    const m = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
    return m ? m[1].replace(/<[^>]+>/g, ' ').trim().slice(0, 80) : null;
  });

  return {
    h1InStaticHtml: staticHtml,
    firstInDomMs: firstInDom ? firstInDom.t : null,
    firstOpacity1Ms: firstVisible ? firstVisible.t : null,
    firstOpacity: samples.find((s) => s.exists)?.opacity ?? null,
    timeline: samples.slice(0, 14).map((s) => ({
      t: s.t,
      opacity: s.opacity,
    })),
  };
}
