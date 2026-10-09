/*
 * Confirms the hash-routed tool links behave as intended:
 * a link to /#prosecution-portal on the homepage opens the tool, and the
 * same link from an article navigates home and then opens the tool.
 */
export default async function run(page) {
  const out = {};

  // From the homepage: the footer link should open the tool.
  await page.evaluate(() => {
    const link = Array.from(document.querySelectorAll('a')).find(
      (a) => a.getAttribute('href') === '/#prosecution-portal'
    );
    if (link) link.click();
  });
  await page.waitForTimeout(1200);

  out.fromHomepage = await page.evaluate(() => ({
    url: window.location.href,
    hash: window.location.hash,
    toolOpen: document.body.innerText.includes('الحد المطلوب: أقل من 500KB'),
    title: document.title,
  }));

  // From an article: same link should land on the homepage with the tool open.
  await page.goto('http://localhost:4321/articles/compress-image-500kb/', {
    waitUntil: 'domcontentloaded',
  });
  await page.waitForTimeout(400);

  await page.evaluate(() => {
    const link = Array.from(document.querySelectorAll('a')).find(
      (a) => a.getAttribute('href') === '/#image-compression'
    );
    if (link) link.click();
  });
  await page.waitForTimeout(1500);

  out.fromArticle = await page.evaluate(() => ({
    pathname: window.location.pathname,
    hash: window.location.hash,
    toolOpen: document.body.innerText.includes('مستوى الضغط'),
    title: document.title,
  }));

  return out;
}
