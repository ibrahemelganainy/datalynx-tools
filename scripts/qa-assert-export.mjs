/*
 * Honest final assertions against the deployed-shape static export.
 *
 * The document element <html> belongs to the root layout, whose static
 * markup is always lang="ar" dir="rtl" and is hydrated from the server
 * render. It cannot be made per-route in a static export without a build
 * flag, so this script reports it truthfully instead of asserting it.
 *
 * What IS guaranteed for English routes: the whole rendered page sits in
 * a div[lang="en"][dir="ltr"], so all visible content is English and
 * LTR, in the static HTML, with no JavaScript required.
 */
export default async function run(page) {
  return page.evaluate(() => {
    const html = document.documentElement;
    const wrapper = document.querySelector('div[lang="en"][dir="ltr"]');
    const h1 = document.querySelector('h1');
    const main = document.querySelector('main');
    const nav = document.querySelector('nav');
    const footer = document.querySelector('footer');

    return {
      documentElement: {
        lang: html.getAttribute('lang'),
        dir: html.getAttribute('dir'),
        note:
          'Owned by the root layout; always ar/rtl in the static markup of both languages.',
      },
      englishWrapper: wrapper
        ? {
            direction: getComputedStyle(wrapper).direction,
            wrapsMain: wrapper.contains(main),
            wrapsNavbar: wrapper.contains(nav),
            wrapsFooter: wrapper.contains(footer),
          }
        : null,
      // Effective direction of the actual visible content.
      contentDirection: main ? getComputedStyle(main).direction : null,
      headingDirection: h1 ? getComputedStyle(h1).direction : null,
      title: document.title,
      heroText: h1 ? h1.textContent.replace(/\s+/g, ' ').trim() : null,
      navLabels: Array.from(document.querySelectorAll('nav a')).map((a) =>
        a.textContent.trim()
      ),
    };
  });
}
