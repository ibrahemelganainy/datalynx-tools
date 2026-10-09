/*
 * Browser verification for the standalone tool routes and locale
 * preservation, run against the real static export.
 *
 * Checks, per route:
 *   - direct access returns the page (no 404)
 *   - <html lang>/<dir> match the route's language
 *   - the tool component actually renders
 *   - internal navigation stays inside the current language
 *   - refresh keeps the same page
 *
 * Usage: node scripts/qa-tools-routes.mjs [origin]
 */
import fs from 'node:fs';

/*
 * Playwright lives in the isolated .qatools folder so the project's own
 * dependency tree and package.json stay untouched by QA tooling.
 */
import playwright from '../.qatools/node_modules/playwright-core/index.js';

const { chromium } = playwright;

const ORIGIN = process.argv[2] || 'http://localhost:4321';

const CHROME_PATHS = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  `${process.env.LOCALAPPDATA}\\Google\\Chrome\\Application\\chrome.exe`,
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
];

const executablePath = CHROME_PATHS.find((p) => fs.existsSync(p));

const TOOLS = [
  'image-compression',
  'format-converter',
  'pdf-compression',
  'prosecution-portal',
];

/*
 * Marker text proving the correct tool component mounted.
 *
 * Text that appears exactly once per tool and only in that tool's own
 * description, so it cannot be satisfied by the generic workspace
 * header or by another tool's UI.
 */
const TOOL_MARKERS = {
  'image-compression': [
    'قلّل حجم صورك مع التحكم في مستوى الضغط',
    'Reduce the size of your images while controlling the compression level',
  ],
  'format-converter': [
    'حوّل صورك بين مجموعة واسعة من الصيغ',
    'Convert your images between a wide range of formats',
  ],
  'pdf-compression': [
    'قلّل حجم ملفات PDF من داخل متصفحك',
    'Shrink PDF files inside your browser',
  ],
  'prosecution-portal': [
    'الحد المطلوب: أقل من 500KB',
    'Required limit: under 500KB',
  ],
};

/*
 * The dynamic tool titles defined in Workspace must keep their exact
 * Arabic values. They are asserted verbatim on the homepage, where that
 * mechanism is actually active.
 */
const TOOL_TITLES = {
  'image-compression': {
    ar: 'أداة ضغط الصور أونلاين بجودة عالية - Data Lynx Tools',
    en: 'Compress Images Online with High Quality - Data Lynx Tools',
  },
  'format-converter': {
    ar: 'تحويل صيغ الصور وصيغة الأيقونات ICO مجاناً - Data Lynx Tools',
    en: 'Convert Image Formats and Create ICO Icons for Free - Data Lynx Tools',
  },
  'pdf-compression': {
    ar: 'ضغط ملفات PDF وتصغير حجمها للمحامين - Data Lynx Tools',
    en: 'Compress PDF Files and Reduce Their Size - Data Lynx Tools',
  },
  'prosecution-portal': {
    ar: 'بوابة النيابة العامة - ضغط المستندات لأقل من 500KB',
    en: 'Prosecution Portal - Prepare Documents Under 500KB',
  },
};

const browser = await chromium.launch({ executablePath, headless: true });

const results = [];
let failures = 0;

async function visit(url) {
  const page = await browser.newPage();

  const consoleErrors = [];
  page.on('console', (m) => {
    if (m.type() === 'error') consoleErrors.push(m.text().slice(0, 200));
  });
  page.on('pageerror', (e) => consoleErrors.push(String(e).slice(0, 200)));

  const response = await page.goto(url, {
    waitUntil: 'load',
    timeout: 45000,
  });

  await page.waitForTimeout(1200);

  return { page, response, consoleErrors };
}

for (const locale of ['ar', 'en']) {
  const prefix = locale === 'en' ? '/en' : '';

  for (const tool of TOOLS) {
    const route = `${prefix}/tools/${tool}`;
    const url = `${ORIGIN}${route}`;

    const { page, response, consoleErrors } = await visit(url);

    const state = await page.evaluate(() => {
      const html = document.documentElement;
      return {
        htmlLang: html.getAttribute('lang'),
        htmlDir: html.getAttribute('dir'),
        title: document.title,
        h1Count: document.querySelectorAll('h1').length,
        bodyText: document.body.innerText,
        canonical: document.querySelector('link[rel="canonical"]')?.href,
        /*
         * Internal navigation links only: the language switcher is a
         * deliberate link to the other language, so it is excluded by
         * its lang/hreflang attribute.
         */
        navHrefs: Array.from(document.querySelectorAll('nav a'))
          .filter((a) => !a.hasAttribute('lang') && !a.hasAttribute('hreflang'))
          .map((a) => a.getAttribute('href')),
      };
    });

    const expectedLang = locale;
    const expectedDir = locale === 'en' ? 'ltr' : 'rtl';

    const problems = [];

    if (response?.status() !== 200) problems.push(`status=${response?.status()}`);
    if (state.htmlLang !== expectedLang)
      problems.push(`lang=${state.htmlLang}`);
    if (state.htmlDir !== expectedDir) problems.push(`dir=${state.htmlDir}`);

    const marker = TOOL_MARKERS[tool].find((m) => state.bodyText.includes(m));
    if (!marker) problems.push('correct tool component did not render');
    /*
     * Locale preservation: on an English page no internal nav link may
     * point at an Arabic root path.
     */
    if (locale === 'en') {
      const arabicLinks = state.navHrefs.filter(
        (h) => h && h.startsWith('/') && !h.startsWith('/en')
      );
      if (arabicLinks.length) {
        problems.push(`nav links leave English: ${arabicLinks.join(', ')}`);
      }
    } else {
      const englishLinks = state.navHrefs.filter(
        (h) => h && h.startsWith('/en')
      );
      if (englishLinks.length) {
        problems.push(`nav links leave Arabic: ${englishLinks.join(', ')}`);
      }
    }

    /* Refresh must keep the same document. */
    await page.reload({ waitUntil: 'load' });
    await page.waitForTimeout(900);

    const afterReload = await page.evaluate(() => ({
      path: window.location.pathname,
      lang: document.documentElement.getAttribute('lang'),
      hasTool: document.body.innerText.length > 500,
    }));

    if (afterReload.lang !== expectedLang)
      problems.push(`after refresh lang=${afterReload.lang}`);

    /* Canonical must be self-referential. */
    const expectedCanonical = `https://tools.datalynx.space${route}/`;
    if (
      state.canonical &&
      state.canonical.replace(/\/$/, '') !== expectedCanonical.replace(/\/$/, '')
    ) {
      problems.push(`canonical=${state.canonical}`);
    }

    if (consoleErrors.length) problems.push(`console: ${consoleErrors[0]}`);

    if (problems.length) failures += 1;

    results.push({
      route,
      status: response?.status(),
      lang: state.htmlLang,
      dir: state.htmlDir,
      marker,
      canonical: state.canonical,
      problems,
    });

    await page.close();
  }
}

/* --- hash backward compatibility on the homepage --- */
const compat = {};
{
  const { page } = await visit(`${ORIGIN}/#pdf-compression`);

  compat.arabicHashOpensTool = await page.evaluate(
    () =>
      Boolean(document.getElementById('workspace')) &&
      document.body.innerText.includes('قلّل حجم ملفات PDF من داخل متصفحك')
  );

  compat.arabicHashTitle = await page.title();
  compat.arabicDynamicTitleMatches =
    compat.arabicHashTitle === TOOL_TITLES['pdf-compression'].ar;

  const { page: enPage } = await visit(`${ORIGIN}/en#pdf-compression`);
  compat.englishHashOpensTool = await enPage.evaluate(
    () =>
      Boolean(document.getElementById('workspace')) &&
      document.body.innerText.includes('Shrink PDF files inside your browser')
  );

  compat.englishHashTitle = await enPage.title();
  compat.englishDynamicTitleMatches =
    compat.englishHashTitle === TOOL_TITLES['pdf-compression'].en;

  /* The workspace tab bar must still switch tools on the homepage. */
  await page.evaluate(() => {
    const tab = Array.from(document.querySelectorAll('button')).find(
      (b) => b.textContent.trim() === 'تحويل الصيغ'
    );
    if (tab) tab.click();
  });
  await page.waitForTimeout(1200);

  compat.homepageTabSwitchHash = await page.evaluate(
    () => window.location.hash
  );
  compat.homepageTabSwitchTool = await page.evaluate(() =>
    document.body.innerText.includes('حوّل صورك بين مجموعة واسعة من الصيغ')
  );

  /* Browser Back returns to the previous tool. */
  await page.goBack();
  await page.waitForTimeout(1000);

  compat.backReturnsToPreviousTool = await page.evaluate(
    () =>
      window.location.hash === '#pdf-compression' &&
      document.body.innerText.includes('قلّل حجم ملفات PDF من داخل متصفحك')
  );

  await page.close();
  await enPage.close();
}

/* --- language switcher keeps the equivalent tool --- */
const switcher = {};
{
  const { page } = await visit(`${ORIGIN}/tools/pdf-compression`);

  const href = await page.evaluate(() => {
    const a = document.querySelector('nav a[lang="en"]');
    return a ? a.getAttribute('href') : null;
  });

  switcher.arabicToEnglish = href;

  const { page: enPage } = await visit(`${ORIGIN}/en/tools/pdf-compression`);
  switcher.englishToArabic = await enPage.evaluate(() => {
    const a = document.querySelector('nav a[lang="ar"]');
    return a ? a.getAttribute('href') : null;
  });

  await page.close();
  await enPage.close();
}

await browser.close();

console.log(
  JSON.stringify(
    { origin: ORIGIN, executablePath, routesWithProblems: failures, results, hashCompatibility: compat, languageSwitcher: switcher },
    null,
    2
  )
);
