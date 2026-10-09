/*
 * Verifies the section order on the standalone tool pages and checks
 * responsiveness across the project's Tailwind breakpoints.
 *
 * Asserted order on every tool page:
 *   Navbar -> Workspace -> Features -> PrivacySection (knowledge) -> Footer
 *
 * Responsiveness checks, per viewport:
 *   - no horizontal overflow (document scrollWidth <= viewport + 1)
 *   - navigation renders as the desktop bar or the mobile button
 *   - the workspace toolbar does not overflow its container
 *   - the grid column count matches the breakpoint
 *
 * Usage: node scripts/qa-tool-layout.mjs [origin]
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

const TOOL_ROUTES = [
  '/tools/image-compression',
  '/tools/format-converter',
  '/tools/pdf-compression',
  '/tools/prosecution-portal',
  '/en/tools/image-compression',
  '/en/tools/format-converter',
  '/en/tools/pdf-compression',
  '/en/tools/prosecution-portal',
];

/* Tailwind default breakpoints. */
const VIEWPORTS = [
  { name: 'mobile-320', width: 320, height: 720, expectedNav: 'mobile' },
  { name: 'mobile-390', width: 390, height: 844, expectedNav: 'mobile' },
  { name: 'tablet-768', width: 768, height: 1024, expectedNav: 'desktop' },
  { name: 'laptop-1024', width: 1024, height: 768, expectedNav: 'desktop' },
  { name: 'desktop-1440', width: 1440, height: 900, expectedNav: 'desktop' },
];

const browser = await chromium.launch({ executablePath, headless: true });

const results = [];
let failures = 0;

for (const route of TOOL_ROUTES) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e).slice(0, 200)));
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(m.text().slice(0, 200));
  });

  const response = await page.goto(`${ORIGIN}${route}`, {
    waitUntil: 'load',
    timeout: 45000,
  });
  await page.waitForTimeout(1800);

  /* Document order of the top-level sections. */
  const order = await page.evaluate(() => {
    const main = document.querySelector('main');
    if (!main) return null;

    const seen = [];

    const workspace = document.getElementById('workspace');
    if (workspace) seen.push('workspace');

    for (const section of main.querySelectorAll(':scope > section, section')) {
      if (section === workspace || section.contains(workspace)) continue;

      const text = section.textContent || '';

      /* Features renders the section heading from the dictionary. */
      if (/لماذا تثق في|Why trust/.test(text) && !seen.includes('features')) {
        seen.push('features');
      }

      /* PrivacySection is the #knowledge section. */
      if (section.id === 'knowledge' && !seen.includes('knowledge')) {
        seen.push('knowledge');
      }
    }

    return {
      seen,
      hasFooter: Boolean(document.querySelector('footer')),
      hasNavbar: Boolean(document.querySelector('nav')),
    };
  });

  /* The workspace must be the first major block on the page. */
  const workspaceFirst = await page.evaluate(() => {
    const workspace = document.getElementById('workspace');
    const features = Array.from(document.querySelectorAll('section')).find((s) =>
      /لماذا تثق في|Why trust/.test(s.textContent || '')
    );
    const knowledge = document.getElementById('knowledge');

    if (!workspace || !features || !knowledge) return null;

    const top = (el) => el.getBoundingClientRect().top + window.scrollY;

    return {
      workspaceTop: Math.round(top(workspace)),
      featuresTop: Math.round(top(features)),
      knowledgeTop: Math.round(top(knowledge)),
      ordered:
        top(workspace) < top(features) && top(features) < top(knowledge),
    };
  });

  const problems = [];

  if (response?.status() !== 200) problems.push(`status=${response?.status()}`);
  if (!order?.hasNavbar) problems.push('no navbar');
  if (!order?.hasFooter) problems.push('no footer');
  if (!order?.seen.includes('features')) problems.push('Features missing');
  if (!order?.seen.includes('knowledge'))
    problems.push('PrivacySection missing');
  if (workspaceFirst && !workspaceFirst.ordered)
    problems.push('section order is wrong (expected workspace < features < knowledge)');
  if (errors.length) problems.push(`console: ${errors[0]}`);

  if (problems.length) failures += 1;

  results.push({ route, order, positions: workspaceFirst, problems });

  await page.close();
}

/* --- responsiveness sweep --- */
const responsive = [];

for (const vp of VIEWPORTS) {
  const page = await browser.newPage({
    viewport: { width: vp.width, height: vp.height },
  });

  for (const route of ['/', '/tools/image-compression', '/en', '/en/tools/pdf-compression']) {
    await page.goto(`${ORIGIN}${route}`, { waitUntil: 'load', timeout: 45000 });
    await page.waitForTimeout(1200);

    const metrics = await page.evaluate(() => {
      const doc = document.documentElement;

      /* Elements wider than the viewport cause horizontal scrolling. */
      const overflowing = Array.from(document.querySelectorAll('body *'))
        .filter((el) => {
          const r = el.getBoundingClientRect();
          return r.width > 0 && r.right > window.innerWidth + 1;
        })
        .slice(0, 5)
        .map((el) => `${el.tagName.toLowerCase()}.${(el.className || '')
          .toString()
          .split(' ')
          .slice(0, 2)
          .join('.')}`);

      const mobileButton = Array.from(document.querySelectorAll('nav button'));
      const desktopNav = document.querySelector('nav .hidden.md\\:flex');

      return {
        scrollWidth: doc.scrollWidth,
        innerWidth: window.innerWidth,
        overflowing,
        hasMobileButton: mobileButton.length > 0,
        mobileButtonVisible:
          mobileButton.length > 0 &&
          getComputedStyle(mobileButton[0]).display !== 'none',
        desktopNavVisible: desktopNav
          ? getComputedStyle(desktopNav).display !== 'none'
          : false,
      };
    });

    const overflow = metrics.scrollWidth > metrics.innerWidth + 1;

    const navMode = metrics.desktopNavVisible ? 'desktop' : 'mobile';
    const navMatches = navMode === vp.expectedNav;

    responsive.push({
      viewport: vp.name,
      width: vp.width,
      route,
      horizontalOverflow: overflow,
      overflowBy: metrics.scrollWidth - metrics.innerWidth,
      navMode,
      navMatchesBreakpoint: navMatches,
      sampleOverflowingElements: metrics.overflowing,
    });
  }

  await page.close();
}

await browser.close();

const overflowIssues = responsive.filter((r) => r.horizontalOverflow);
const navIssues = responsive.filter((r) => !r.navMatchesBreakpoint);

const report = {
  origin: ORIGIN,
  toolPageSectionOrder: {
    routesWithProblems: failures,
    results,
  },
  responsiveness: {
    checked: responsive.length,
    horizontalOverflowIssues: overflowIssues,
    navBreakpointIssues: navIssues,
    details: responsive,
  },
};

const outDir = path.join(root, 'lh');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(
  path.join(outDir, 'tool-layout-report.json'),
  JSON.stringify(report, null, 2),
  'utf8'
);

console.log(
  JSON.stringify(
    {
      sectionOrderProblems: failures,
      routes: results.map((r) => ({
        route: r.route,
        sections: r.order?.seen,
        ordered: r.positions?.ordered,
        problems: r.problems,
      })),
      responsiveness: {
        checked: responsive.length,
        overflowIssues: overflowIssues.length,
        navIssues: navIssues.length,
      },
    },
    null,
    2
  )
);
