/*
 * Verifies the Arabic site is unchanged by the i18n work:
 *  - lang/dir
 *  - the ORIGINAL Arabic titles, including the dynamic tool titles
 *  - the original Arabic tool UI strings
 *  - Back/Forward hash behaviour
 */
export default async function run(page) {
  const out = {};

  out.document = await page.evaluate(() => ({
    htmlLang: document.documentElement.getAttribute('lang'),
    htmlDir: document.documentElement.getAttribute('dir'),
    computedDir: getComputedStyle(document.documentElement).direction,
    title: document.title,
    metaDescription: document
      .querySelector('meta[name="description"]')
      ?.getAttribute('content'),
    canonical: document.querySelector('link[rel="canonical"]')?.href,
  }));

  out.home = await page.evaluate(() => ({
    heroHeading: document.querySelector('h1')?.innerText.replace(/\s+/g, ' ').trim(),
    hasFeaturesHeading: document.body.innerText.includes('لماذا تثق في'),
    hasKnowledgeHeading: document.body.innerText.includes('المعرفة تبدأ من'),
    hasFooterTagline: document.body.innerText.includes('مجموعة أدوات مجانية فائقة السرعة'),
    // Anything English left on the Arabic homepage (product names,
    // format names and the EN switcher label are expected).
    latinLeftovers: (document.body.innerText.match(/[A-Za-z]{3,}/g) || [])
      .filter(
        (w) =>
          !/^(Data|Lynx|Tools|PDF|WebP|PNG|JPG|JPEG|ICO|BMP|favicon|KB|MB|DL|TOOLS|AR|EN|data|HTML|tiff|docs)$/i.test(
            w
          )
      )
      .slice(0, 20),
  }));

  // Open the image compression tool and check the ORIGINAL Arabic title.
  await page.evaluate(() => {
    const heading = Array.from(document.querySelectorAll('h3')).find(
      (h) => h.textContent.trim() === 'ضغط الصور'
    );
    const card = heading && heading.closest('.cursor-pointer');
    if (card) card.click();
  });
  await page.waitForTimeout(900);

  out.afterOpen = await page.evaluate(() => ({
    hash: window.location.hash,
    title: document.title,
    metaDescription: document
      .querySelector('meta[name="description"]')
      ?.getAttribute('content'),
    toolHeadings: Array.from(document.querySelectorAll('h2'))
      .map((h) => h.textContent.trim())
      .filter(Boolean)
      .slice(0, 2),
    dropzoneArabic: document.body.innerText.includes('اسحب الصور وأفلتها هنا'),
    formatsHint: document.body.innerText.includes('JPG, PNG, WebP, BMP'),
    startButton: document.body.innerText.includes('ابدأ الضغط'),
    backButton: document.body.innerText.includes('العودة للخدمات'),
  }));

  // The prosecution portal title is the one that differs from the template.
  await page.evaluate(() => {
    const tab = Array.from(document.querySelectorAll('button')).find(
      (b) => b.textContent.trim() === 'بوابة النيابة'
    );
    if (tab) tab.click();
  });
  await page.waitForTimeout(900);

  out.prosecution = await page.evaluate(() => ({
    hash: window.location.hash,
    title: document.title,
    heading: Array.from(document.querySelectorAll('h2'))
      .map((h) => h.textContent.trim())
      .filter(Boolean)[0],
    readyBadge: document.body.innerText.includes('الحد المطلوب: أقل من 500KB'),
  }));

  await page.goBack();
  await page.waitForTimeout(800);

  out.afterBack = await page.evaluate(() => ({
    hash: window.location.hash,
    title: document.title,
  }));

  return out;
}
