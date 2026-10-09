/*
 * Lighthouse runner for the exported static site.
 *
 * Runs Lighthouse against the local static server with a fixed Chrome
 * binary, so measurements are comparable between runs. Results are
 * written as JSON plus a condensed summary.
 *
 * Usage:
 *   node scripts/run-lighthouse.mjs <label> <formFactor> <url>
 * Example:
 *   node scripts/run-lighthouse.mjs after-desktop desktop http://localhost:4321/
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/*
 * Lighthouse lives in the isolated .qatools folder so the project's own
 * dependency tree and package.json stay untouched.
 */
const { default: lighthouse } = await import(
  '../.qatools/node_modules/lighthouse/core/index.js'
);
const chromeLauncher = await import(
  '../.qatools/node_modules/chrome-launcher/dist/chrome-launcher.js'
);

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'lh');

const [label, formFactor = 'desktop', url = 'http://localhost:4321/'] =
  process.argv.slice(2);

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const CHROME_PATH = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';

const chrome = await chromeLauncher.launch({
  chromePath: process.env.CHROME_PATH || CHROME_PATH,
  chromeFlags: ['--headless=new', '--no-sandbox', '--disable-gpu'],
});

try {
  const result = await lighthouse(url, {
    port: chrome.port,
    output: 'json',
    logLevel: 'error',
    onlyCategories: ['performance', 'best-practices', 'seo'],
    formFactor,
    screenEmulation:
      formFactor === 'mobile'
        ? {
            mobile: true,
            width: 360,
            height: 640,
            deviceScaleFactor: 2.625,
            disabled: false,
          }
        : {
            mobile: false,
            width: 1350,
            height: 940,
            deviceScaleFactor: 1,
            disabled: false,
          },
    throttling:
      formFactor === 'mobile'
        ? {
            rttMs: 150,
            throughputKbps: 1638.4,
            cpuSlowdownMultiplier: 4,
            requestLatencyMs: 0,
            downloadThroughputKbps: 0,
            uploadThroughputKbps: 0,
          }
        : {
            rttMs: 40,
            throughputKbps: 10240,
            cpuSlowdownMultiplier: 1,
          },
  });

  const jsonPath = path.join(outDir, `${label}.json`);
  fs.writeFileSync(
    jsonPath,
    JSON.stringify(result.lhr, null, 2),
    'utf8'
  );

  const report = result.lhr;
  const cats = {};
  for (const [id, c] of Object.entries(report.categories || {})) {
    cats[id] = Math.round((c.score ?? 0) * 100);
  }

  const a = report.audits;
  const metric = (id) => a[id]?.numericValue ?? null;
  const display = (id) => a[id]?.displayValue ?? null;

  const summary = {
    label,
    formFactor,
    url,
    fetchTime: report.fetchTime,
    scores: cats,
    metrics: {
      FCP: { value: metric('first-contentful-paint'), display: display('first-contentful-paint') },
      LCP: { value: metric('largest-contentful-paint'), display: display('largest-contentful-paint') },
      SpeedIndex: { value: metric('speed-index'), display: display('speed-index') },
      TBT: { value: metric('total-blocking-time'), display: display('total-blocking-time') },
      CLS: { value: metric('cumulative-layout-shift'), display: display('cumulative-layout-shift') },
      TTI: { value: metric('interactive'), display: display('interactive') },
    },
    transfer: {
      totalBytes: metric('total-byte-weight'),
      mainThreadMs: metric('mainthread-work-breakdown'),
      bootupMs: metric('bootup-time'),
      renderBlockingMs: metric('render-blocking-resources'),
      unusedJsBytes: metric('unused-javascript'),
    },
    diagnostics: {
      renderBlocking: a['render-blocking-resources']?.details?.items?.slice(0, 5),
      unusedJs: a['unused-javascript']?.details?.items?.slice(0, 5),
      longestTasks: a['long-tasks']?.details?.items?.slice(0, 5),
      largestContentful: a['largest-contentful-paint-element']?.details?.items?.[0]?.node
        ?.nodeLabel,
    },
  };

  const summaryPath = path.join(outDir, `${label}-summary.json`);
  fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2), 'utf8');

  console.log(JSON.stringify(summary, null, 2));
  console.log(`\nwrote ${jsonPath} and ${summaryPath}`);
} finally {
  await chrome.kill();
}
