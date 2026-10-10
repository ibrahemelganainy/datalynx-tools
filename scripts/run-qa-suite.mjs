/*
 * Runs every qa-*.mjs module that exports a default async function
 * taking a Playwright page.
 *
 * Those modules were written as page scripts and were previously driven
 * by hand. This runner gives them a single entry point so the whole
 * regression suite is repeatable.
 *
 * Usage: node scripts/run-qa-suite.mjs [origin]
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import playwright from '../.qatools/node_modules/playwright-core/index.js';

const { chromium } = playwright;

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const scriptsDir = path.join(root, 'scripts');
const ORIGIN = process.argv[2] || 'http://localhost:4321';

const CHROME_PATHS = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  `${process.env.LOCALAPPDATA}\\Google\\Chrome\\Application\\chrome.exe`,
];

const executablePath = CHROME_PATHS.find((p) => fs.existsSync(p));

/*
 * qa-hydration.mjs expects the DEV server on :3000, and the assert-export
 * check is a pure DOM inspection. Both are run when their target exists.
 */
const MODULES = [
  { file: 'qa-new-pages.mjs', url: `${ORIGIN}/about/` },
  { file: 'qa-lang-switch-newpages.mjs', url: `${ORIGIN}/about/` },
  { file: 'qa-nav-overflow.mjs', url: `${ORIGIN}/` },
  { file: 'qa-nav-center.mjs', url: `${ORIGIN}/` },
  { file: 'qa-tool-titles.mjs', url: `${ORIGIN}/` },
  { file: 'qa-google-analytics.mjs', url: `${ORIGIN}/` },
  { file: 'qa-icons-restored.mjs', url: `${ORIGIN}/` },
  { file: 'qa-ar-preservation.mjs', url: `${ORIGIN}/` },
  { file: 'qa-en-lifecycle.mjs', url: `${ORIGIN}/en` },
  { file: 'qa-language-switch.mjs', url: `${ORIGIN}/` },
  { file: 'qa-hash-nav.mjs', url: `${ORIGIN}/` },
  { file: 'qa-assert-export.mjs', url: `${ORIGIN}/en` },
];

const browser = await chromium.launch({ executablePath, headless: true });

const results = [];
let failed = 0;

for (const { file, url } of MODULES) {
  const full = path.join(scriptsDir, file);

  if (!fs.existsSync(full)) {
    results.push({ file, status: 'MISSING' });
    failed += 1;
    continue;
  }

  const page = await browser.newPage();
  const errors = [];

  page.on('pageerror', (e) => errors.push(String(e).slice(0, 200)));
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(m.text().slice(0, 200));
  });

  try {
    await page.goto(url, { waitUntil: 'load', timeout: 45000 });
    await page.waitForTimeout(1500);

    const mod = await import(pathToFileURL(full).href);
    const output = await mod.default(page);

    results.push({ file, status: 'PASS', output, consoleErrors: errors });
  } catch (error) {
    failed += 1;
    results.push({ file, status: 'FAIL', error: String(error).slice(0, 400) });
  } finally {
    await page.close();
  }
}

await browser.close();

const report = { origin: ORIGIN, failed, results };

fs.writeFileSync(
  path.join(root, 'lh', 'qa-suite.json'),
  JSON.stringify(report, null, 2),
  'utf8'
);

console.log(JSON.stringify(report, null, 2));
