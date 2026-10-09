/*
 * Consolidated Lighthouse comparison.
 *
 * Reports every run for a label prefix and the median, so a claim of
 * improvement is backed by more than one measurement.
 *
 * Usage: node scripts/lh-summarize.mjs <prefix> [label]
 *   e.g. node scripts/lh-summarize.mjs final-desktop
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const lhDir = path.join(root, 'lh');

const prefix = process.argv[2];

const files = fs
  .readdirSync(lhDir)
  .filter((f) => f.startsWith(prefix) && f.endsWith('-summary.json'))
  .sort();

if (!files.length) {
  console.error(`No summaries found for prefix "${prefix}" in lh/`);
  process.exit(1);
}

const median = (nums) => {
  const sorted = [...nums].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
};

const runs = files.map((f) => {
  const s = JSON.parse(fs.readFileSync(path.join(lhDir, f), 'utf8'));
  return {
    file: f,
    fetchTime: s.fetchTime,
    formFactor: s.formFactor,
    performance: s.scores.performance,
    fcp: s.metrics.FCP.value,
    lcp: s.metrics.LCP.value,
    si: s.metrics.SpeedIndex.value,
    tbt: s.metrics.TBT.value,
    cls: s.metrics.CLS.value,
    bytes: s.transfer.totalBytes,
    mainThread: s.transfer.mainThreadMs,
    unusedJs: s.transfer.unusedJsBytes,
  };
});

const round = (n) => (n == null ? null : Math.round(n));

const summary = {
  prefix,
  runs: runs.map((r) => ({
    file: r.file,
    performance: r.performance,
    FCP: r.fcp,
    LCP: r.lcp,
    TBT: r.tbt,
    CLS: r.cls,
    totalKB: round(r.bytes / 1024),
  })),
  median: {
    performance: median(runs.map((r) => r.performance)),
    FCP: round(median(runs.map((r) => r.fcp))),
    LCP: round(median(runs.map((r) => r.lcp))),
    SpeedIndex: round(median(runs.map((r) => r.si))),
    TBT: round(median(runs.map((r) => r.tbt))),
    CLS: Number(median(runs.map((r) => r.cls)).toFixed(4)),
    totalKB: round(median(runs.map((r) => r.bytes)) / 1024),
    mainThreadMs: round(median(runs.map((r) => r.mainThread))),
    unusedJsBytes: round(median(runs.map((r) => r.unusedJs))),
  },
};

fs.writeFileSync(
  path.join(lhDir, `${prefix}-consolidated.json`),
  JSON.stringify(summary, null, 2),
  'utf8'
);

console.log(JSON.stringify(summary, null, 2));
