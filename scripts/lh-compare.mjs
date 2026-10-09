/*
 * Builds the before/after comparison table from Lighthouse summaries.
 *
 * Usage: node scripts/lh-compare.mjs <before-summary.json> <after-summary.json>
 */
import fs from 'node:fs';

const [beforeFile, afterFile] = process.argv.slice(2);

function load(file) {
  const raw = JSON.parse(fs.readFileSync(file, 'utf8'));
  return raw.audits ? raw : raw.report || raw;
}

function read(file) {
  const raw = JSON.parse(fs.readFileSync(file, 'utf8'));

  /*
   * Accept either a full Lighthouse report or one of our condensed
   * summaries, so the same comparison works for everything in lh/.
   */
  if (raw.scores && raw.metrics) return raw;

  const report = raw.report || raw;
  const a = report.audits || {};
  const cats = {};

  for (const [id, c] of Object.entries(report.categories || {})) {
    cats[id] = Math.round((c.score ?? 0) * 100);
  }

  return {
    label: file,
    scores: cats,
    metrics: {
      FCP: { display: a['first-contentful-paint']?.displayValue },
      LCP: { display: a['largest-contentful-paint']?.displayValue },
      SpeedIndex: { display: a['speed-index']?.displayValue },
      TBT: { display: a['total-blocking-time']?.displayValue },
      CLS: { display: a['cumulative-layout-shift']?.displayValue },
    },
    transfer: {
      totalBytes: a['total-byte-weight']?.numericValue,
      mainThreadMs: a['mainthread-work-breakdown']?.numericValue,
    },
  };
}

const b = read(beforeFile);
const a2 = read(afterFile);

const pct = (from, to) => {
  if (!from || !to) return 'n/a';
  const delta = ((to - from) / from) * 100;
  return `${delta >= 0 ? '+' : ''}${delta.toFixed(1)}%`;
};

const rows = [];

for (const key of ['performance', 'best-practices', 'seo']) {
  if (b.scores?.[key] == null && a2.scores?.[key] == null) continue;
  rows.push({
    metric: key,
    before: b.scores?.[key] ?? 'NOT VERIFIED',
    after: a2.scores?.[key] ?? 'NOT VERIFIED',
  });
}

for (const key of ['FCP', 'LCP', 'SpeedIndex', 'TBT', 'CLS']) {
  rows.push({
    metric: key,
    before: b.metrics?.[key]?.display ?? 'NOT VERIFIED',
    after: a2.metrics?.[key]?.display ?? 'NOT VERIFIED',
  });
}

rows.push({
  metric: 'totalBytes',
  before: b.transfer?.totalBytes ?? 'NOT VERIFIED',
  after: a2.transfer?.totalBytes ?? 'NOT VERIFIED',
  change: pct(b.transfer?.totalBytes, a2.transfer?.totalBytes),
});

console.log(
  JSON.stringify(
    {
      before: beforeFile,
      after: afterFile,
      formFactor: a2.formFactor || a2.configSettings?.formFactor || null,
      rows,
    },
    null,
    2
  )
);
