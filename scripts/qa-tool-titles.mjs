/*
 * Dynamic tool-title regression test.
 *
 * Expected strings are the exact SEO titles from the task spec, and the
 * brand suffix must appear exactly once.
 *
 * Note: this module is invoked by run-qa-suite.mjs with a page already
 * on the origin, so ORIGIN is derived from the page itself.
 */
const EXPECTED = {
  ar: {
    'image-compression':
      'ضغط الصور أونلاين مجانًا وتقليل حجم الصور | Data Lynx Tools',
    'format-converter':
      'تحويل صيغ الصور أونلاين: JPG وPNG وWebP وAVIF وICO | Data Lynx Tools',
    'pdf-compression':
      'ضغط ملفات PDF أونلاين وتقليل حجم PDF | Data Lynx Tools',
    'prosecution-portal':
      'تصغير الصور وملفات PDF إلى أقل من 500KB للنيابة العامة | Data Lynx Tools',
  },
  en: {
    'image-compression':
      'Free Online Image Compressor – Reduce Image Size | Data Lynx Tools',
    'format-converter':
      'Online Image Converter – JPG, PNG, WebP, AVIF & ICO | Data Lynx Tools',
    'pdf-compression':
      'Compress PDF Online – Reduce PDF File Size | Data Lynx Tools',
    'prosecution-portal':
      'Compress Images & PDFs Under 500 KB for the Prosecution Portal | Data Lynx Tools',
  },
};

const TOOLS = Object.keys(EXPECTED.ar);

const HOMEPAGE_TITLE = {
  ar: 'Data Lynx Tools - أدوات احترافية لضغط الصور، تحويل الصيغ، وملفات PDF',
  /*
   * الصفحة الإنجليزية ترى عنوان layout مجموعة (en) عبر قالب layout
   * الجذر، فاللاحقة تُضاف إليها وتظهر فعليًا في التبويب. هذه القيمة
   * الحالية للموقع قبل هذا العمل ولم تتغيّر.
   */
  en:
    'Professional tools to compress images, convert formats and compress PDF files | Data Lynx Tools',
};

const suffixCount = (title) => title.split('| Data Lynx Tools').length - 1;

export default async function run(page) {
  const ORIGIN = new URL(page.url()).origin;
  const results = [];
  const record = (name, detail) => results.push({ name, ...detail });

  /* ---------- 1. direct load of the standalone tool routes ---------- */
  for (const lang of ['ar', 'en']) {
    for (const tool of TOOLS) {
      const url =
        lang === 'ar'
          ? `${ORIGIN}/tools/${tool}/`
          : `${ORIGIN}/en/tools/${tool}/`;

      await page.goto(url, { waitUntil: 'load' });
      await page.waitForTimeout(900);

      const state = await page.evaluate(() => ({
        title: document.title,
        hasWorkspace: Boolean(document.querySelector('#workspace')),
      }));

      record(`direct:${lang}:${tool}`, {
        url,
        expected: EXPECTED[lang][tool],
        actual: state.title,
        workspaceRendered: state.hasWorkspace,
      });
    }
  }

  /* ---------- 2. homepage hash + switching + history ---------- */
  for (const lang of ['ar', 'en']) {
    const home = lang === 'ar' ? `${ORIGIN}/` : `${ORIGIN}/en/`;

    await page.goto(home, { waitUntil: 'load' });
    await page.waitForTimeout(900);
    record(`home:${lang}`, {
      expected: HOMEPAGE_TITLE[lang],
      actual: await page.title(),
    });

    for (const tool of TOOLS) {
      await page.evaluate((id) => {
        window.location.hash = `#${id}`;
      }, tool);
      await page.waitForTimeout(800);

      const switched = await page.evaluate(() => ({
        title: document.title,
        hasWorkspace: Boolean(document.querySelector('#workspace')),
      }));
      record(`hash:${lang}:${tool}`, {
        expected: EXPECTED[lang][tool],
        actual: switched.title,
        workspaceRendered: switched.hasWorkspace,
      });
    }

    /* Browser Back / Forward across the tool history entries. */
    await page.evaluate(() => {
      window.location.hash = '#image-compression';
    });
    await page.waitForTimeout(900);

    await page.evaluate(() => {
      window.location.hash = '#prosecution-portal';
    });
    await page.waitForTimeout(900);

    await page.goBack({ waitUntil: 'load' });
    await page.waitForTimeout(1200);
    const backTitle = await page.title();

    await page.goForward({ waitUntil: 'load' });
    await page.waitForTimeout(1200);
    const forwardTitle = await page.title();

    record(`history:${lang}`, {
      expected: {
        back: EXPECTED[lang]['image-compression'],
        forward: EXPECTED[lang]['prosecution-portal'],
      },
      actual: { back: backTitle, forward: forwardTitle },
    });

    /* Homepage with no active tool restores the root layout title. */
    await page.goto(home, { waitUntil: 'load' });
    await page.waitForTimeout(900);
    record(`home-restore:${lang}`, {
      expected: HOMEPAGE_TITLE[lang],
      actual: await page.title(),
    });
  }

  /* ---------- 3. verdicts ---------- */
  const checks = results.map((r) => {
    if (r.name.startsWith('history:')) {
      return {
        ...r,
        ok:
          r.actual.back === r.expected.back &&
          r.actual.forward === r.expected.forward,
        suffixOnce:
          suffixCount(r.actual.back) <= 1 &&
          suffixCount(r.actual.forward) <= 1,
      };
    }

    return {
      ...r,
      ok: r.actual === r.expected,
      suffixOnce: suffixCount(r.actual) === 1,
    };
  });

  const failed = checks.filter((c) => !c.ok);

  return {
    total: checks.length,
    failed: failed.length,
    summary: checks.map((c) => ({
      name: c.name,
      ok: c.ok,
      expected: c.expected,
      actual: c.actual,
    })),
  };
}
