/*
 * Hydration check: visits each page in the DEV server (where React reports
 * hydration mismatches) and reports any console error/warning.
 */
export default async function run(page) {
  const routes = [
    '/',
    '/en/',
    '/articles/',
    '/en/articles/',
    '/privacy/',
    '/en/privacy/',
    '/articles/compress-image-500kb/',
    '/en/articles/compress-image-500kb/',
    '/articles/jpg-vs-webp-vs-png-avif/',
    '/en/articles/image-format-comparison/',
    '/articles/image-pdf-compression-tools/',
    '/en/articles/image-pdf-compression-tools/',
  ];

  const problems = [];

  for (const route of routes) {
    const messages = [];

    const onConsole = (msg) => {
      const text = msg.text();
      if (
        msg.type() === 'error' ||
        /hydrat|didn't match|mismatch/i.test(text)
      ) {
        messages.push({ type: msg.type(), text: text.slice(0, 400) });
      }
    };

    const onPageError = (err) => {
      messages.push({ type: 'pageerror', text: String(err).slice(0, 400) });
    };

    page.on('console', onConsole);
    page.on('pageerror', onPageError);

    await page.goto(`http://localhost:3000${route}`, {
      waitUntil: 'load',
      timeout: 60000,
    });
    await page.waitForTimeout(2500);

    page.off('console', onConsole);
    page.off('pageerror', onPageError);

    // Ignore Next.js dev-overlay housekeeping noise, keep real signals.
    const real = messages.filter(
      (m) =>
        !/Download the React DevTools|webpack-hmr|\[Fast Refresh\]/i.test(m.text)
    );

    problems.push({ route, count: real.length, messages: real });
  }

  return {
    routesWithProblems: problems.filter((p) => p.count > 0),
    cleanRoutes: problems.filter((p) => p.count === 0).map((p) => p.route),
  };
}
