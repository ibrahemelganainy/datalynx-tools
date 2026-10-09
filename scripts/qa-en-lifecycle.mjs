/*
 * Verifies the English homepage renders correctly:
 *  - language/direction in both the static markup and the live DOM
 *  - English section headings
 *  - opening a tool updates the hash, the title (in English) and the UI
 *  - Back navigation returns to the previous tool
 */
export default async function run(page) {
  const out = {};

  out.staticWrapper = await page.evaluate(() => {
    const wrapper = document.querySelector('div[lang="en"][dir="ltr"]');
    return wrapper
      ? {
          present: true,
          dir: getComputedStyle(wrapper).direction,
          containsMain: wrapper.contains(document.querySelector('main')),
          containsNav: wrapper.contains(document.querySelector('nav')),
        }
      : { present: false };
  });

  out.document = await page.evaluate(() => ({
    htmlLang: document.documentElement.getAttribute('lang'),
    htmlDir: document.documentElement.getAttribute('dir'),
    rootComputedDir: getComputedStyle(document.documentElement).direction,
  }));

  out.sections = await page.evaluate(() => {
    const text = document.body.innerText;
    return {
      hasFeaturesHeading: text.includes('Why trust'),
      hasKnowledgeHeading: text.includes('Knowledge starts with'),
      hasFooterTagline: text.includes('A free, extremely fast'),
      heroHeading: document.querySelector('h1')?.innerText.replace(/\s+/g, ' ').trim(),
    };
  });

  out.titleBefore = await page.title();

  // Open the Image Compression tool from the hero card.
  await page.evaluate(() => {
    const heading = Array.from(document.querySelectorAll('h3')).find(
      (h) => h.textContent.trim() === 'Image Compression'
    );
    const card = heading && heading.closest('.cursor-pointer');
    if (card) card.click();
  });
  await page.waitForTimeout(900);

  out.afterOpen = await page.evaluate(() => ({
    hash: window.location.hash,
    title: document.title,
    toolHeadings: Array.from(document.querySelectorAll('h2'))
      .map((h) => h.textContent.trim())
      .filter(Boolean)
      .slice(0, 2),
    dropzoneEnglish: document.body.innerText.includes('Drag and drop your images here'),
    settingsEnglish: document.body.innerText.includes('Compression settings'),
    arabicLeftovers: (
      document.body.innerText.match(/[\u0600-\u06FF\u060C\u061B\u061F]+/g) || []
    ).filter((s) => s !== 'العربية'),
  }));

  // Switch tools through the workspace tabs.
  out.switched = await page.evaluate(() => {
    const tab = Array.from(document.querySelectorAll('button')).find(
      (b) => b.textContent.trim() === 'Format Converter'
    );
    if (tab) tab.click();
    return Boolean(tab);
  });
  await page.waitForTimeout(900);

  out.afterSwitch = await page.evaluate(() => ({
    hash: window.location.hash,
    title: document.title,
    hasConverterUi: document.body.innerText.includes('Conversion settings'),
  }));

  // Browser Back returns to the previous tool.
  await page.goBack();
  await page.waitForTimeout(800);

  out.afterBack = await page.evaluate(() => ({
    hash: window.location.hash,
    title: document.title,
  }));

  return out;
}
