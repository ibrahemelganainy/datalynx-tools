/*
 * Debug helper: inspect what the homepage actually renders when opened
 * with a tool hash, and what the tool pages render after hydration.
 */
import fs from 'node:fs';
import playwright from '../.qatools/node_modules/playwright-core/index.js';

const { chromium } = playwright;

const CHROME_PATHS = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  `${process.env.LOCALAPPDATA}\\Google\\Chrome\\Application\\chrome.exe`,
];

const executablePath = CHROME_PATHS.find((p) => fs.existsSync(p));
const ORIGIN = process.argv[2] || 'http://localhost:4321';

const browser = await chromium.launch({ executablePath, headless: true });
const page = await browser.newPage();

const errors = [];
page.on('console', (m) => {
  if (m.type() === 'error') errors.push(m.text().slice(0, 300));
});
page.on('pageerror', (e) => errors.push(String(e).slice(0, 300)));

async function probe(url) {
  errors.length = 0;
  await page.goto(url, { waitUntil: 'load', timeout: 45000 });
  await page.waitForTimeout(2500);

  const info = await page.evaluate(() => ({
    path: window.location.pathname,
    hash: window.location.hash,
    h1: document.querySelector('h1')?.innerText.slice(0, 60),
    h2s: Array.from(document.querySelectorAll('h2'))
      .map((h) => h.textContent.trim())
      .slice(0, 4),
    hasWorkspace: Boolean(document.getElementById('workspace')),
    hasSpinner: document.body.innerText.includes('جاري تجهيز'),
    bodySnippet: document.body.innerText.replace(/\s+/g, ' ').slice(0, 260),
  }));

  return { url: url.replace(ORIGIN, ''), info, errors: [...errors] };
}

const out = [];
out.push(await probe(`${ORIGIN}/#image-compression`));
out.push(await probe(`${ORIGIN}/tools/image-compression`));
out.push(await probe(`${ORIGIN}/en/tools/image-compression`));

await browser.close();
console.log(JSON.stringify(out, null, 2));
