/*
 * Captures screenshots of the key pages and tool states, desktop and
 * mobile, so the visual design can be compared against the previous
 * working site.
 *
 * Usage: node scripts/qa-screenshots.mjs [origin] [outSubdir]
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import playwright from '../.qatools/node_modules/playwright-core/index.js';

const { chromium } = playwright;

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const ORIGIN = process.argv[2] || 'http://localhost:4321';
const SUBDIR = process.argv[3] || 'current';
const outDir = path.join(root, 'lh', 'shots', SUBDIR);

fs.mkdirSync(outDir, { recursive: true });

const CHROME_PATHS = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  `${process.env.LOCALAPPDATA}\\Google\\Chrome\\Application\\chrome.exe`,
];

const executablePath = CHROME_PATHS.find((p) => fs.existsSync(p));

const SHOTS = [
  { name: 'ar-home-desktop', url: '/', w: 1440, h: 900 },
  { name: 'ar-home-mobile', url: '/', w: 390, h: 844 },
  { name: 'ar-tool-desktop', url: '/tools/image-compression', w: 1440, h: 900 },
  { name: 'ar-tool-mobile', url: '/tools/prosecution-portal', w: 390, h: 844 },
  { name: 'ar-articles-desktop', url: '/articles', w: 1440, h: 900 },
  { name: 'ar-article-desktop', url: '/articles/compress-image-500kb', w: 1440, h: 900 },
  { name: 'ar-privacy-desktop', url: '/privacy', w: 1440, h: 900 },
  { name: 'en-home-desktop', url: '/en', w: 1440, h: 900 },
  { name: 'en-home-mobile', url: '/en', w: 390, h: 844 },
  { name: 'en-tool-desktop', url: '/en/tools/image-compression', w: 1440, h: 900 },
  { name: 'en-tool-mobile', url: '/en/tools/pdf-compression', w: 390, h: 844 },
  { name: 'en-articles-desktop', url: '/en/articles', w: 1440, h: 900 },
  { name: 'en-article-desktop', url: '/en/articles/image-format-comparison', w: 1440, h: 900 },
  { name: 'en-privacy-desktop', url: '/en/privacy', w: 1440, h: 900 },
  { name: 'en-terms-desktop', url: '/en/terms', w: 1440, h: 900 },
];

const browser = await chromium.launch({ executablePath, headless: true });

const captured = [];

for (const shot of SHOTS) {
  const page = await browser.newPage({
    viewport: { width: shot.w, height: shot.h },
  });

  await page.goto(`${ORIGIN}${shot.url}`, {
    waitUntil: 'load',
    timeout: 45000,
  });

  /* Let fonts and entry animations settle so the capture is stable. */
  await page.waitForTimeout(2200);

  const file = path.join(outDir, `${shot.name}.png`);
  await page.screenshot({ path: file, fullPage: false });

  captured.push({ ...shot, file: path.relative(root, file) });

  await page.close();
}

await browser.close();

fs.writeFileSync(
  path.join(outDir, 'manifest.json'),
  JSON.stringify({ origin: ORIGIN, captured }, null, 2),
  'utf8'
);

console.log(JSON.stringify({ origin: ORIGIN, count: captured.length, dir: outDir }, null, 2));
