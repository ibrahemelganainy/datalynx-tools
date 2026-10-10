/*
 * لقطات لمراجعة بصرية لزر "تثبيت التطبيق".
 *
 * تُصنّع حدث `beforeinstallprompt` لتظهر الأزرار، ثم تُلتقط:
 *   - سطح المكتب الإنجليزي: الزر داخل شريط النافبار + أسفل الفوتر
 *   - الجوال العربي: الزر داخل قائمة الهامبرغر المفتوحة + أسفل الفوتر
 *
 * Usage: node scripts/qa-install-screenshots.mjs
 */
import fs from 'node:fs';

import playwright from '../.qatools/node_modules/playwright-core/index.js';

const { chromium } = playwright;

/*
 * مسارات كروم على ويندوز. يجب أن تطابق ما في scripts/run-qa-suite.mjs،
 * وإلا فشل التشغيل على أجهزة لا يحتوي فيها مسار Program Files الأول
 * على كروم (هو الحال على هذا الجهاز: كروم مثبّت في Program Files (x86)).
 */
const CHROME_PATHS = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  `${process.env.LOCALAPPDATA}\\Google\\Chrome\\Application\\chrome.exe`,
];

const executablePath = CHROME_PATHS.find((p) => fs.existsSync(p));

if (!executablePath) {
  throw new Error('لم يُعثر على كروم في أي من المسارات المعروفة.');
}

console.log(`chrome: ${executablePath}`);

const fakePrompt = () => {
  const event = new Event('beforeinstallprompt');

  event.prompt = () => {
    window.__promptCalls = (window.__promptCalls || 0) + 1;
  };

  event.userChoice = Promise.resolve({ outcome: 'accepted' });

  window.__fire = () => window.dispatchEvent(event);
};

const browser = await chromium.launch({ executablePath, headless: true });

for (const shot of [
  {
    name: 'desktop-en',
    viewport: { width: 1350, height: 820 },
    path: '/en/',
    openMenu: false,
    installLabel: 'Install app',
  },
  {
    name: 'mobile-ar',
    viewport: { width: 390, height: 844 },
    path: '/',
    openMenu: true,
    installLabel: 'تثبيت التطبيق',
  },
]) {
  const context = await browser.newContext({ viewport: shot.viewport });
  const page = await context.newPage();

  await page.addInitScript(fakePrompt);
  await page.goto(`http://localhost:4321${shot.path}`, { waitUntil: 'load' });
  await page.waitForTimeout(300);

  await page.evaluate(() => window.__fire());
  await page.waitForTimeout(250);

  if (shot.openMenu) {
    await page.click('button[aria-controls="navbar-mobile-menu"]');
    await page.waitForTimeout(450);
  }

  await page.screenshot({ path: `.tmp-install-${shot.name}.png` });

  /*
   * لقطة الفوتر: نُمرّر إلى زر التثبيت نفسه لا إلى نهاية الصفحة، لأن
   * نهاية الفوتر أطول من الشاشة وقد يقع الزر أعلى منها خارج الإطار.
   */
  const found = await page.evaluate((label) => {
    const button = Array.from(document.querySelectorAll('button')).find((b) =>
      b.innerText.includes(label)
    );

    if (!button) return false;

    button.scrollIntoView({ block: 'center' });
    return true;
  }, shot.installLabel);

  await page.waitForTimeout(700);

  await page.screenshot({ path: `.tmp-install-footer-${shot.name}.png` });

  console.log(`  footer button found: ${found}`);

  await context.close();

  console.log(`.tmp-install-${shot.name}.png`);
}

await browser.close();
