/*
 * Behavioural test for the Tools dropdown in both languages.
 *
 * Verifies exactly four tool links, that the trigger does not navigate,
 * that click / outside-click / Escape all work, that the four
 * destinations are correct per locale, and that keyboard navigation
 * moves focus through the items.
 */
export default async function run(page) {
  const results = [];

  for (const [url, lang, home] of [
    ['http://localhost:4321/', 'ar', '/'],
    ['http://localhost:4321/en/', 'en', '/en/'],
  ]) {
    await page.setViewportSize({ width: 1350, height: 800 });
    await page.goto(url, { waitUntil: 'load' });
    await page.waitForTimeout(800);

    const triggerId = 'navbar-tools-menu-trigger';
    const menuId = 'navbar-tools-menu';

    /* Initially closed. */
    const initial = await page.evaluate((ids) => ({
      expanded: document.getElementById(ids.trigger)?.getAttribute('aria-expanded'),
      controls: document.getElementById(ids.trigger)?.getAttribute('aria-controls'),
      haspopup: document.getElementById(ids.trigger)?.getAttribute('aria-haspopup'),
      menuExists: Boolean(document.getElementById(ids.menu)),
      url: window.location.href,
    }), { trigger: triggerId, menu: menuId });

    /* Open by click, and confirm no navigation happened. */
    await page.click(`#${triggerId}`);
    await page.waitForTimeout(400);

    const opened = await page.evaluate((ids) => {
      const menu = document.getElementById(ids.menu);
      const links = menu ? Array.from(menu.querySelectorAll('a[href]')) : [];

      return {
        expanded: document.getElementById(ids.trigger)?.getAttribute(
          'aria-expanded'
        ),
        url: window.location.href,
        linkCount: links.length,
        hrefs: links.map((a) => a.getAttribute('href')),
        labels: links.map((a) => a.textContent.trim()),
        visible:
          menu !== null &&
          getComputedStyle(menu).visibility !== 'hidden' &&
          Number(getComputedStyle(menu).opacity) > 0,
      };
    }, { trigger: triggerId, menu: menuId });

    /* Click the trigger again to close. */
    await page.click(`#${triggerId}`);
    await page.waitForTimeout(350);

    const toggledClosed = await page.evaluate(
      (id) => document.getElementById(id)?.getAttribute('aria-expanded'),
      triggerId
    );

    /* Reopen, then click outside. */
    await page.click(`#${triggerId}`);
    await page.waitForTimeout(350);
    await page.mouse.click(60, 600);
    await page.waitForTimeout(350);

    const afterOutside = await page.evaluate(
      (id) => document.getElementById(id)?.getAttribute('aria-expanded'),
      triggerId
    );

    /* Reopen, then press Escape. */
    await page.click(`#${triggerId}`);
    await page.waitForTimeout(350);
    await page.keyboard.press('Escape');
    await page.waitForTimeout(350);

    const afterEscape = await page.evaluate((id) => ({
      expanded: document.getElementById(id)?.getAttribute('aria-expanded'),
      focusReturned: document.activeElement?.id === id,
    }), triggerId);

    /* Keyboard: open, then ArrowDown through the items. */
    await page.click(`#${triggerId}`);
    await page.waitForTimeout(300);
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(200);
    const focus1 = await page.evaluate(() => document.activeElement?.textContent?.trim());
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(200);
    const focus2 = await page.evaluate(() => document.activeElement?.textContent?.trim());

    const focusQuery = await page.evaluate(() => ({
      isInsideMenu: Boolean(
        document.activeElement?.closest('#navbar-tools-menu')
      ),
      outline: getComputedStyle(document.activeElement).outlineStyle,
    }));

    results.push({
      lang,
      homeExpected: home,
      initial: {
        expanded: initial.expanded,
        ariaControls: initial.controls === menuId,
        haspopup: initial.haspopup,
        menuExists: initial.menuExists,
      },
      opened: {
        expanded: opened.expanded,
        linkCount: opened.linkCount,
        labels: opened.labels,
        hrefs: opened.hrefs,
        visible: opened.visible,
        /* Opening must not navigate away. */
        noNavigation: opened.url === url,
        correctLocale: opened.hrefs.every((h) =>
          lang === 'en' ? h.startsWith('/en/') : !h.startsWith('/en/')
        ),
      },
      toggledClosed,
      afterOutside,
      afterEscape,
      keyboard: { focus1, focus2, ...focusQuery },
    });

    /* Close and restore for the next locale. */
    await page.keyboard.press('Escape');
    await page.waitForTimeout(200);
  }

  return { results };
}
