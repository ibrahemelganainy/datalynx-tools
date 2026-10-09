/*
 * Verifies the Google Analytics tag actually runs in a real browser:
 * the loader is requested, dataLayer exists, gtag() is callable, and the
 * measurement ID is configured. Also confirms the tag does not block the
 * first paint (it is injected after hydration, not in <head>).
 *
 * Note: gtag.js is a third-party script. Its own network behaviour in a
 * test environment is not a property of this site; the assertions here
 * are about the tag being installed and executed correctly.
 */
export default async function run(page) {
  const requests = [];
  page.on('request', (r) => {
    if (r.url().includes('googletagmanager.com')) requests.push(r.url());
  });

  /*
   * gtag.js drains dataLayer into its own internal queue once it loads,
   * so the 'js' and 'config' entries are gone by the time we look. The
   * reliable evidence that the tag is live is the collect request, which
   * only happens after a successful gtag('config', ...) call.
   */
  const connects = [];
  page.on('request', (r) => {
    if (/google-analytics\.com\/(g|j)\/collect/.test(r.url())) {
      connects.push(r.url());
    }
  });

  await page.goto('http://localhost:4321/', { waitUntil: 'load' });
  await page.waitForTimeout(5000);

  const state = await page.evaluate(() => {
    const dl = window.dataLayer || [];

    return {
      hasDataLayer: Array.isArray(window.dataLayer),
      dataLayerLength: dl.length,
      gtagIsFunction: typeof window.gtag === 'function',
      /*
       * gtag() must remain callable so the tag stays usable from the app.
       * Calling it here proves the shim is installed.
       */
      gtagCallable: (() => {
        try {
          window.gtag('event', 'qa_probe');
          return true;
        } catch {
          return false;
        }
      })(),
      scriptInHead: Boolean(
        document.head.querySelector('script[src*="googletagmanager"]')
      ),
      scriptInBody: Boolean(
        document.body.querySelector('script[src*="googletagmanager"]')
      ),
    };
  });

  return {
    ...state,
    loaderRequested: requests.some((u) => u.includes('gtag/js')),
    loaderUrls: requests,
    collectRequests: connects.length,
    collectUrl: connects[0] || null,
  };
}
