/*
 * تحقق وظيفي من زر "تثبيت التطبيق".
 *
 * المشكلة في اختبار زر PWA أن حدث `beforeinstallprompt` لا يُطلق في متصفح
 * تشغيل آلي بلا واجهة. الحل أن نصنّعه بأنفسنا قبل تحميل الصفحة: نُثبّت
 * الحدث الصناعي على window، ثم نُطلقه بعد الترطيب. هذا هو نفس الحدث
 * الذي يُطلقه كروم الحقيقي بالبيانات نفسها (prompt + userChoice).
 *
 * ما يتحقق منه السكربت فعليًا:
 *
 * 1) المكوّن صامت قبل الحدث (لا زر وهمي على سطح المكتب).
 * 2) بعد الحدث: الزر العربي والإنجليزي يظهران بالاسم الميسّر الصحيح.
 * 3) النقر يستدعي prompt() مرة واحدة على الحدث نفسه.
 * 4) النسخة الإنجليزية تُظهر "Install app" بنفس السلوك.
 * 5) manifest + apple-touch-icon + theme-color موجودة في <head>.
 * 6) manifest.webmanifest صالح ويحتوي أيقونات 192 و512 وmaskable.
 *
 * التشغيل عبر scripts/run-qa-suite.mjs أو مباشرة مع خادم out/.
 */
export default async function run(page) {
  const results = {};

  const HEAD_SELECTORS = [
    'link[rel="manifest"]',
    'link[rel="apple-touch-icon"]',
    'meta[name="theme-color"]',
  ];

  /*
   * للـmanifest وللتحقق من أوسمة <head> لا حاجة إلى زر: نستخدم صفحة
   * عادية بلا أي تثبيت مسبق.
   */
  page.on('pageerror', () => undefined);

  const browserContext = page.context();

  async function fakeInstallPrompt(target) {
    await target.addInitScript(() => {
      const event = new Event('beforeinstallprompt');

      event.prompt = () => {
        window.__promptCalls = (window.__promptCalls || 0) + 1;
      };

      event.userChoice = Promise.resolve({ outcome: 'accepted' });

      window.__fireInstallPrompt = () =>
        window.dispatchEvent(event);
    });
  }

  const sharedBrowser = browserContext.browser();

  const CASES = [
    ['ar', '/', 'تثبيت التطبيق'],
    ['en', '/en/', 'Install app'],
  ];

  for (const [locale, path, expected] of CASES) {
    /*
     * كل حالة في سياق متصفح مستقل تمامًا، وهذا مهم أكثر من كونه تحسينًا:
     * كروم يتذكر ما إذا كان التطبيق مثبتًا أو العامل مسجّلًا، فلا يُطلق
     * `beforeinstallprompt` في السياق الثاني، ويصبح الاختبار كذّابًا.
     */
    const context = await sharedBrowser.newContext({
      viewport: { width: 1350, height: 900 },
      isMobile: false,
      hasTouch: false,
    });

    const isolatedPage = await context.newPage();

    await fakeInstallPrompt(isolatedPage);

    await isolatedPage.goto(`http://localhost:4321${path}`, {
      waitUntil: 'load',
    });
    await isolatedPage.waitForTimeout(500);

    const before = await isolatedPage.evaluate((label) =>
      Array.from(document.querySelectorAll('button')).some(
        (button) =>
          button.getAttribute('aria-label') === label &&
          button.getClientRects().length > 0
      ), expected);

    await isolatedPage.evaluate(() => window.__fireInstallPrompt());
    await isolatedPage.waitForTimeout(120);

    const after = await isolatedPage.evaluate((text) => {
      return Array.from(document.querySelectorAll('button')).filter(
        (button) =>
          button.getAttribute('aria-label') === text &&
          button.getClientRects().length > 0
      ).length;
    }, expected);

    const visibleButtons = after;

    const headReport = await isolatedPage.evaluate((selectors) => {
      return {
        missing: selectors.filter((s) => !document.querySelector(s)),
        controller: 'serviceWorker' in navigator
          ? !!navigator.serviceWorker.controller
          : null,
      };
    }, HEAD_SELECTORS);

    /* انقر زر التثبيت الفعلي وتأكد أن prompt() اشتُغل مرة واحدة. */
    const installButton = isolatedPage.getByRole('button', { name: expected });
    const clicked = await installButton.isVisible();

    if (clicked) await installButton.click();

    await isolatedPage.waitForTimeout(120);

    const promptCalls = await isolatedPage.evaluate(
      () => window.__promptCalls || 0
    );

    results[locale] = {
      hiddenBeforePrompt: before === false,
      visibleAfterPrompt: visibleButtons > 0,
      buttonsShowingLabel: visibleButtons,
      clicked,
      promptCalledOnce: promptCalls === 1,
      headMissing: headReport.missing,
      serviceWorkerController: headReport.controller,
    };

    await context.close();
  }

  const iosContext = await sharedBrowser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });

  await iosContext.addInitScript(() => {
    Object.defineProperty(navigator, 'standalone', {
      configurable: true,
      value: false,
    });
  });

  const iosPage = await iosContext.newPage();
  await iosPage.goto(`http://localhost:4321/`, {
    waitUntil: 'domcontentloaded',
    timeout: 15000,
  });
  await iosPage.waitForTimeout(500);

  const iosButton = iosPage.getByRole('button', { name: 'تثبيت التطبيق' });
  const iosButtonVisible = await iosButton
    .waitFor({ state: 'visible', timeout: 10000 })
    .then(() => true)
    .catch(() => false);
  let iosInstructions = '';

  if (iosButtonVisible) {
    await iosButton.click();
    iosInstructions = await iosPage
      .locator('#install-app-hint')
      .textContent({ timeout: 5000 })
      .catch(() => '');
  }

  results.ios = {
    buttonVisible: iosButtonVisible,
    hasSafariShareStep: iosInstructions.includes(
      'افتح قائمة المشاركة في Safari.'
    ),
    hasAddToHomeScreenStep: iosInstructions.includes(
      'اختر «إضافة إلى الشاشة الرئيسية».'
    ),
    hasConfirmationStep: iosInstructions.includes('أكّد الإضافة.'),
  };

  await iosContext.close();

  const installedContext = await sharedBrowser.newContext();

  await installedContext.addInitScript(() => {
    Object.defineProperty(navigator, 'standalone', {
      configurable: true,
      value: true,
    });
  });

  const installedPage = await installedContext.newPage();
  await installedPage.goto(`http://localhost:4321/en/`, {
    waitUntil: 'domcontentloaded',
    timeout: 15000,
  });
  await installedPage.waitForTimeout(500);
  results.standalone = {
    installButtonHidden: !(await installedPage
      .getByRole('button', { name: 'Install app' })
      .isVisible()
      .catch(() => false)),
  };
  await installedContext.close();

  const manifest = await page.evaluate(async () => {
    const response = await fetch('/manifest.webmanifest');

    if (!response.ok) return { ok: false, status: response.status };

    return { ok: true, data: await response.json() };
  });

  results.manifest = {
    ok: manifest.ok,
    startUrl: manifest.data?.start_url,
    display: manifest.data?.display,
    icons: (manifest.data?.icons || []).map(
      (icon) => `${icon.sizes}:${icon.purpose}`
    ),
  };

  return results;
}
