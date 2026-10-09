/*
 * Compares the dynamic document-title mechanism between two builds.
 *
 * The Workspace component updates document.title when a tool is opened.
 * This script records the title right after opening a tool, in Arabic
 * and in English, so the "before" and "after" behaviour can be compared
 * directly instead of assumed.
 *
 * Usage: node scripts/qa-title-behaviour.mjs [origin] [label]
 */
import fs from 'node:fs';
import playwright from '../../.qatools/node_modules/playwright-core/index.js';

const { chromium } = playwright;

const CHROME_PATHS = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  `${process.env.LOCALAPPDATA}\\Google\\Chrome\\Application\\chrome.exe`,
];
const executablePath = CHROME_PATHS.find((p) => fs.existsSync(p));
const ORIGIN = process.argv[2] || 'http://localhost:4321';
const LABEL = process.argv[3] || 'unknown';

const browser = await chromium.launch({ executablePath, headless: true });
const page = await browser.newPage();

const out = { label: LABEL, origin: ORIGIN };

async function openTool(origin, hash, tabLabel) {
  await page.goto(`${origin}/${hash}`, { waitUntil: 'load', timeout: 45000 });
  await page.waitForTimeout(3000);

  const initialTitle = await page.title();

  /* Switch tool through the workspace tab bar, which is the trigger the
   * Arabic dynamic-title mechanism listens to. */
  const clicked = await page.evaluate((label) => {
    const tab = Array.from(document.querySelectorAll('button')).find(
      (b) => b.textContent.trim() === label
    );
    if (tab) {
      tab.click();
      return true;
    }
    return false;
  }, tabLabel);

  await page.waitForTimeout(2000);

  return {
    initialTitle,
    clicked,
    afterSwitchTitle: await page.title(),
    afterSwitchHash: await page.evaluate(() => window.location.hash),
    metaDescription: await page.evaluate(
      () =>
        document.querySelector('meta[name="description"]')?.getAttribute('content')
    ),
  };
}

out.arabic = await openTool(ORIGIN, '#image-compression', 'بوابة النيابة');
out.english = await openTool(`${ORIGIN}/en`, '#image-compression', 'Prosecution Portal');

await browser.close();
console.log(JSON.stringify(out, null, 2));
