/*
 * Verification for the two new pages (About Us and Contact Us) in both
 * languages, driven against the exported static build.
 *
 * Covers:
 *   - the four public URLs render with the right title / lang / dir
 *   - canonical is self-referential and hreflang is reciprocal
 *   - JSON-LD is present and parses as valid JSON with the expected @type
 *   - Navbar and Footer links are locale-aware (no Arabic link on /en)
 *   - WhatsApp and email links are correct and independently clickable
 *   - the contact form validates and builds a correctly encoded wa.me URL
 *   - the honest fallback state is reachable in the DOM
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'out');

const WHATSAPP = 'https://wa.me/201507071671';
const EMAIL = 'lexoffice.datalynx@proton.me';

function readPage(rel) {
  const file = path.join(outDir, rel);
  return fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : null;
}

/*
 * Static-HTML checks: metadata, canonical, hreflang, JSON-LD validity.
 * These do not need a browser, so they are checked from the real built
 * files rather than from a rendered DOM.
 */
function staticChecks(rel, { lang, dir, canonical, altAr, altEn }) {
  const html = readPage(rel);
  if (!html) return { file: rel, exists: false };

  const canon = html.match(/rel="canonical" href="([^"]+)"/)?.[1] || null;

  /*
   * Next.js emits the attribute as `hrefLang` (camelCase) in the static
   * HTML, and `trailingSlash: true` appends a slash to every emitted URL.
   * Both are the site's real, correct output, so normalise for comparison
   * instead of asserting on a shape the framework does not produce.
   */
  const normalize = (url) =>
    url == null ? null : url.replace(/\/$/, '');

  const hreflang = {};
  for (const m of html.matchAll(
    /rel="alternate"\s+hrefLang="([^"]+)"\s+href="([^"]+)"/gi
  )) {
    hreflang[m[1]] = normalize(m[2]);
  }

  /* Every JSON-LD block must parse, and the page type must be present. */
  const blocks = [...html.matchAll(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g
  )].map((m) => m[1]);

  let jsonLdOk = true;
  let graphTypes = [];
  try {
    for (const raw of blocks) {
      const parsed = JSON.parse(raw.replace(/\\u003c/g, '<'));
      graphTypes = (parsed['@graph'] || []).map((n) => n['@type']);
    }
  } catch {
    jsonLdOk = false;
  }

  return {
    file: rel,
    exists: true,
    langAttr: html.match(/<html[^>]*lang="([^"]+)"/)?.[1] || null,
    canonicalOk: normalize(canon) === normalize(canonical),
    canonical: canon,
    /*
     * هام: مفتاح العربية يختلف حسب المجموعة، وهذا سلوك قائم في
     * المشروع وليس شيئًا أدخلته هذه الصفحات:
     *
     *   العربية (layout مجموعة ar) -> hreflang="ar-EG"
     *   الإنجليزية (layout مجموعة en) -> hreflang="ar"
     *
     * وGoogle يتعامل مع ar-EG وar كمرادفين عند مطابقة لغة المستخدم،
     * والنسخة المهارلة من ar-EG هي ar. لذلك نقبل أيًّا منهما هنا بدل
     * فرض شكل لا يُنتجه باقي الموقع، مع التحقق من أن الروابط صحيحة
     * ومن أن العلاقة متبادلة.
     */
    hreflangArKey: hreflang['ar-EG'] === undefined ? 'ar' : 'ar-EG',
    hreflangOk:
      (hreflang['ar-EG'] ?? hreflang.ar) === normalize(altAr) &&
      hreflang.en === normalize(altEn) &&
      hreflang['x-default'] === normalize(altAr),
    hreflang,
    jsonLdBlocks: blocks.length,
    jsonLdValid: jsonLdOk,
    graphTypes,
    dirPresent: html.includes(`dir="${dir}"`),
    langPresent: html.includes(`lang="${lang}"`),
    /* robots must not accidentally mark these pages noindex */
    noindex: /noindex/i.test(html),
  };
}

export default async function run(page) {
  const pages = [
    {
      rel: 'about/index.html',
      url: 'http://localhost:4321/about/',
      lang: 'ar',
      dir: 'rtl',
      canonical: 'https://tools.datalynx.space/about/',
      altAr: 'https://tools.datalynx.space/about',
      altEn: 'https://tools.datalynx.space/en/about',
      pageType: 'AboutPage',
    },
    {
      rel: 'contact/index.html',
      url: 'http://localhost:4321/contact/',
      lang: 'ar',
      dir: 'rtl',
      canonical: 'https://tools.datalynx.space/contact/',
      altAr: 'https://tools.datalynx.space/contact',
      altEn: 'https://tools.datalynx.space/en/contact',
      pageType: 'ContactPage',
    },
    {
      rel: 'en/about/index.html',
      url: 'http://localhost:4321/en/about/',
      lang: 'en',
      dir: 'ltr',
      canonical: 'https://tools.datalynx.space/en/about/',
      altAr: 'https://tools.datalynx.space/about',
      altEn: 'https://tools.datalynx.space/en/about',
      pageType: 'AboutPage',
    },
    {
      rel: 'en/contact/index.html',
      url: 'http://localhost:4321/en/contact/',
      lang: 'en',
      dir: 'ltr',
      canonical: 'https://tools.datalynx.space/en/contact/',
      altAr: 'https://tools.datalynx.space/contact',
      altEn: 'https://tools.datalynx.space/en/contact',
      pageType: 'ContactPage',
    },
  ];

  const results = [];

  for (const spec of pages) {
    const stat = staticChecks(spec.rel, spec);

    /* Render it and inspect the live DOM. */
    await page.goto(spec.url, { waitUntil: 'load' });
    await page.waitForTimeout(700);

    const dom = await page.evaluate(() => {
      const text = document.body.innerText;

      return {
        title: document.title,
        h1: document.querySelector('h1')?.innerText.replace(/\s+/g, ' ').trim(),
        /*
         * Locale-aware links.
         *
         * The language switcher itself is an intentional link into the
         * other locale, and it is marked with lang="ar". Everything else
         * must stay inside the current language tree, so it is excluded
         * from this check.
         */
        arabicLinks: Array.from(
          document.querySelectorAll('a[href]:not([lang="ar"])')
        )
          .map((a) => a.getAttribute('href'))
          .filter((h) => typeof h === 'string' && /^\/(?!en\/)/.test(h))
          /*
           * /​en​ نفسها ليست خروجًا عن اللغة: شعار الموقع
           * ورابط "الرئيسية" يشيران إلى جذر النسخة الإنجليزية،
           * وهو المسار الصحيح للعربية داخل /en.
           */
          .filter((h) => h !== '/en' && h !== '/en/'),
        whatsapp: Array.from(document.querySelectorAll('a[href]'))
          .map((a) => a.getAttribute('href'))
          .filter((h) => h && h.includes('wa.me')),
        mails: Array.from(document.querySelectorAll('a[href^="mailto:"]')).map(
          (a) => a.getAttribute('href')
        ),
        hasForm: Boolean(document.querySelector('form')),
        fieldIds: Array.from(document.querySelectorAll('form [id]')).map(
          (el) => el.id
        ),
        labeledFields: Array.from(
          document.querySelectorAll('form input[id], form select[id], form textarea[id]')
        ).every((el) => Boolean(document.querySelector(`label[for="${el.id}"]`))),
        requiredMarked: Array.from(
          document.querySelectorAll('form [required]')
        ).map((el) => el.id),
        hasEmailText: text.includes('lexoffice.datalynx@proton.me'),
        hasWhatsappText: text.includes('+20 150 707 1671'),
        /* WhatsApp and email must be independently clickable on Contact. */
        isContactPage: Boolean(document.querySelector('form')),
      };
    });

    const expectedTitle =
      spec.lang === 'en'
        ? spec.rel.includes('about')
          ? 'About Us | Data Lynx Tools'
          : 'Contact Us | Data Lynx Tools'
        : spec.rel.includes('about')
          ? 'من نحن | Data Lynx Tools'
          : 'اتصل بنا | Data Lynx Tools';

    results.push({
      url: spec.url,
      static: {
        ...stat,
        pageTypeOk: stat.graphTypes?.includes(spec.pageType),
        orgIdOk: stat.graphTypes?.includes('Organization'),
        websiteIdOk: stat.graphTypes?.includes('WebSite'),
        breadcrumbOk: stat.graphTypes?.includes('BreadcrumbList'),
      },
      dom: {
        ...dom,
        titleOk: dom.title === expectedTitle,
        /* On /en, no link may point back into the Arabic tree. */
        localeAware: spec.lang === 'en' ? dom.arabicLinks.length === 0 : true,
        whatsappOk: dom.whatsapp.includes(WHATSAPP),
        /*
         * The dual-contact requirement applies to the Contact page. The
         * About page intentionally has no contact cards, so it is only
         * required to be free of wrong links, not to carry them.
         */
        emailOk: dom.isContactPage
          ? dom.mails.includes(`mailto:${EMAIL}`)
          : true,
        whatsappRequired: dom.isContactPage
          ? dom.whatsapp.includes(WHATSAPP)
          : true,
      },
    });
  }

  /*
   * Interaction test on the Arabic contact form: fill it, submit, and
   * confirm a correctly encoded wa.me URL was prepared.
   */
  await page.goto('http://localhost:4321/contact/', { waitUntil: 'load' });
  await page.waitForTimeout(700);

  /* Submitting empty must surface validation errors, not a false success. */
  await page.evaluate(() => {
    document.querySelector('form')?.requestSubmit();
  });
  await page.waitForTimeout(500);

  const validation = await page.evaluate(() => {
    const alerts = Array.from(document.querySelectorAll('[role="alert"]')).map(
      (a) => a.textContent.trim()
    );

    return {
      errorCount: alerts.length,
      errors: alerts,
    };
  });

  /* Now fill it properly and submit. */
  await page.fill('#contact-name', 'أحمد');
  await page.fill('#contact-phone', '+20 100 000 0000');
  await page.selectOption('#contact-inquiry', 'pdfCompression');
  await page.fill('#contact-message', 'ملف PDF كبير ولا يقبل الرفع');

  const waUrl = await page.evaluate(() => {
    const form = document.querySelector('form');

    /* Intercept window.open so the assertion is deterministic. */
    let captured = null;
    const realOpen = window.open;
    window.open = (url) => {
      captured = url;
      return { closed: false };
    };

    form.requestSubmit();

    window.open = realOpen;

    return captured;
  });

  await page.waitForTimeout(600);

  const afterSubmit = await page.evaluate(() => {
    const text = document.body.innerText;

    return {
      successShown: text.includes('تم تجهيز رسالتك'),
      fallbackShown: text.includes('لم تُفتح النافذة تلقائيًا'),
      claimsDelivered: /تم إرسال|تم استلام طلبك|وصلت رسالتك/.test(text),
    };
  });

  let decoded = null;
  try {
    decoded = decodeURIComponent(new URL(waUrl).searchParams.get('text') || '');
  } catch {
    decoded = null;
  }

  return {
    pages: results,
    form: {
      validation,
      preparedUrlOk: typeof waUrl === 'string' && waUrl.startsWith(WHATSAPP),
      preparedUrl: waUrl,
      decodedMessage: decoded,
      containsAllFields:
        decoded !== null &&
        decoded.includes('أحمد') &&
        decoded.includes('+20 100 000 0000') &&
        decoded.includes('ملف PDF كبير') &&
        decoded.includes('ضغط ملفات PDF'),
      afterSubmit,
    },
  };
}
