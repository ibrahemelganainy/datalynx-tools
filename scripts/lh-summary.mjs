/*
 * Summons the key Lighthouse numbers from a JSON report.
 * Usage: node scripts/lh-summary.mjs lh/after-mobile.json
 */
import fs from 'node:fs';

const file = process.argv[2];
const report = JSON.parse(fs.readFileSync(file, 'utf8'));

const cats = {};
for (const [id, c] of Object.entries(report.categories || {})) {
  cats[id] = Math.round((c.score ?? 0) * 100);
}

const a = report.audits || {};
const num = (id) => {
  const audit = a[id];
  if (!audit) return null;
  return {
    value: audit.numericValue != null ? Math.round(audit.numericValue) : null,
    display: audit.displayValue ?? null,
  };
};

const bytes = (id) => {
  const audit = a[id];
  return audit?.numericValue != null ? Math.round(audit.numericValue) : null;
};

console.log(
  JSON.stringify(
    {
      file,
      fetchTime: report.fetchTime,
      formFactor: report.configSettings?.formFactor,
      scores: cats,
      metrics: {
        FCP: num('first-contentful-paint'),
        LCP: num('largest-contentful-paint'),
        SpeedIndex: num('speed-index'),
        TBT: num('total-blocking-time'),
        CLS: num('cumulative-layout-shift'),
        TTI: num('interactive'),
      },
      transfer: {
        totalBytes: bytes('total-byte-weight'),
        mainThreadMs: bytes('mainthread-work-breakdown'),
        bootupMs: bytes('bootup-time'),
        renderBlockingMs: bytes('render-blocking-resources'),
        unusedJsBytes: bytes('unused-javascript'),
      },
      diagnostics: {
        renderBlocking: a['render-blocking-resources']?.details?.items?.slice(0, 6),
        largestContentful: a['largest-contentful-paint-element']?.details?.items?.[0],
        unusedJs: a['unused-javascript']?.details?.items?.slice(0, 6),
        longestTasks: a['long-tasks']?.details?.items?.slice(0, 6),
        networkRequests: a['network-requests']?.details?.items?.slice(0, 30),
        fontDisplay: a['font-display']?.details?.items?.slice(0, 4),
      },
    },
    null,
    2
  )
);
