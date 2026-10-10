/*
 * Reports the exact horizontal geometry of the desktop navbar, so the
 * centring of the links group can be verified numerically rather than
 * from a screenshot.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import playwright from '../.qatools/node_modules/playwright-core/index.js';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const EXE = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
].find((p) => fs.existsSync(p));

const browser = await playwright.chromium.launch({
  executablePath: EXE,
  headless: true,
});

const out = [];

for (const [url, label] of [
  ['http://localhost:4321/', 'ar'],
  ['http://localhost:4321/en/', 'en'],
]) {
  for (const width of [768, 900, 1024, 1280, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 500 } });
    await page.goto(url, { waitUntil: 'load' });
    await page.waitForTimeout(600);

    const m = await page.evaluate(() => {
      const bar = document.querySelector('nav > div');
      const br = bar.getBoundingClientRect();

      const links = bar.querySelector('.hidden.md\\:flex.justify-self-center');
      const logo = bar.querySelector('a[aria-label="Data Lynx Tools"]');
      const blue = Array.from(bar.querySelectorAll('a')).find(
        (a) => a.textContent.trim() === 'datalynx.space'
      );

      const R = (el) => {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return {
          left: Math.round(r.left),
          right: Math.round(r.right),
          center: Math.round(r.left + r.width / 2),
          width: Math.round(r.width),
        };
      };

      return {
        bar: {
          left: Math.round(br.left),
          right: Math.round(br.right),
          center: Math.round(br.left + br.width / 2),
        },
        logo: R(logo),
        links: R(links),
        blue: R(blue),
        linksText: links ? links.innerText.replace(/\s+/g, ' ').trim() : null,
        overflow: bar.scrollWidth > bar.clientWidth + 1,
      };
    });

    out.push({
      label,
      width,
      direction: label === 'ar' ? 'rtl' : 'ltr',
      logoAtStart:
        label === 'ar'
          ? m.logo.right >= m.bar.right - 2
          : m.logo.left <= m.bar.left + 2,
      blueAtEnd:
        label === 'ar'
          ? m.blue.left <= m.bar.left + 2
          : m.blue.right >= m.bar.right - 2,
      linksCenterOffsetPx: m.links ? m.links.center - m.bar.center : null,
      linksText: m.linksText,
      overflow: m.overflow,
      logo: m.logo,
      links: m.links,
      blue: m.blue,
      bar: m.bar,
    });

    await page.close();
  }
}

await browser.close();

fs.writeFileSync(
  path.join(root, 'lh', 'nav-geometry.json'),
  JSON.stringify(out, null, 2),
  'utf8'
);

for (const r of out) {
  console.log(
    `${r.label} w=${r.width} dir=${r.direction} ` +
      `offset=${r.linksCenterOffsetPx}px logoStart=${r.logoAtStart} ` +
      `blueEnd=${r.blueAtEnd} overflow=${r.overflow}`
  );
}
