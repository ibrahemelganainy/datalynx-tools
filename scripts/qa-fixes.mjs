/*
 * Verifies the two targeted fixes:
 *
 * 1. Dictionary strings that contain <strong> are rendered as a real
 *    bold element, not as visible "strong>" text.
 * 2. The "back to services" button on a standalone tool page navigates
 *    to the locale homepage without a dangling "#tools" hash.
 *
 * Usage: node scripts/qa-fixes.mjs [origin]
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import playwright from '../.qatools/node_modules/playwright-core/index.js';

const { chromium } = playwright;

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const ORIGIN = process.argv[2] || 'http://localhost:4321';

const CHROME_PATHS = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  `${process.env.LOCALAPPDATA}\\Google\\Chrome\\Application\\chrome.exe`,
];

const executablePath = CHROME_PATHS.find((p) => fs.existsSync(p));

const browser = await chromium.launch({ executablePath, headless: true });

const report = { origin: ORIGIN, strongText: {}, backButton: {} };

/* --- 1. literal "strong>" must never be visible --------------------- */

const STRONG_PAGES = [
  { label: 'ar-home', url: '/' },
  { label: 'en-home', url: '/en' },
  { label: 'ar-tool', url: '/tools/image-compression' },
  { label: 'en-tool', url: '/en/tools/image-compression' },
  { label: 'ar-articles', url: '/articles' },
];

for (const p of STRONG_PAGES) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto(`${ORIGIN}${p.url}`, { waitUntil: 'load', timeout: 45000 });
  await page.waitForTimeout(1800);

  const result = await page.evaluate(() => {
    const text = document.body.innerText;

    /*
     * The bug shows up as the literal characters "<strong>" or a bare
     * "strong>" fragment in the rendered, visible text.
     */
    const literalMatches = text.match(/<?strong>/gi) || [];

    return {
      literalOccurrences: literalMatches.length,
      samples: literalMatches.slice(0, 3),
      strongElements: document.querySelectorAll('strong').length,
      strongTexts: Array.from(document.querySelectorAll('strong'))
        .map((el) => el.textContent.trim())
        .filter(Boolean)
        .slice(0, 5),
    };
  });

  report.strongText[p.label] = result;
  await page.close();
}

/* --- 2. "back to services" must go to the locale homepage ---------- */

for (const [label, url, expected] of [
  ['ar-tool', '/tools/pdf-compression', '/'],
  ['en-tool', '/en/tools/pdf-compression', '/en'],
]) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto(`${ORIGIN}${url}`, { waitUntil: 'load', timeout: 45000 });
  await page.waitForTimeout(1800);

  const clicked = await page.evaluate(() => {
    const labels = ['العودة للخدمات', 'Back to services'];

    const button = Array.from(document.querySelectorAll('button')).find((b) =>
      labels.includes(b.textContent.trim())
    );

    if (!button) return { found: false };
    button.click();
    return { found: true };
  });

  await page.waitForTimeout(1800);

  const after = await page.evaluate(() => ({
    pathname: window.location.pathname,
    hash: window.location.hash,
    href: window.location.href,
  }));

  report.backButton[label] = {
    buttonFound: clicked.found,
    expectedPath: expected,
    ...after,
    ok: after.pathname.replace(/\/$/, '') === expected.replace(/\/$/, '') && after.hash === '',
  };

  await page.close();
}

await browser.close();

fs.writeFileSync(
  path.join(root, 'lh', 'fixes-report.json'),
  JSON.stringify(report, null, 2),
  'utf8'
);

console.log(JSON.stringify(report, null, 2));
