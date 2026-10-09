/*
 * Reports the Lighthouse diagnostics that explain the main-thread cost:
 * long tasks, bootup time by URL, unused JS and render-blocking work.
 *
 * Usage: node scripts/lh-diagnose.mjs lh/after-mobile.json
 */
import fs from 'node:fs';

const file = process.argv[2];
const raw = JSON.parse(fs.readFileSync(file, 'utf8'));

/*
 * Lighthouse wrote the report under `report` when it was saved through
 * our runner, and directly when saved by the Lighthouse CLI. Accept
 * both shapes so this script works on either.
 */
const report = raw.audits ? raw : raw.report?.audits ? raw.report : raw;
const a = report.audits;

if (!a) {
  throw new Error(`No audits found in ${file}. Top-level keys: ${Object.keys(raw).join(', ')}`);
}

const items = (id) => a[id]?.details?.items || [];

const summary = {
  file,
  formFactor: report.configSettings?.formFactor,
  score: Math.round((report.categories?.performance?.score ?? 0) * 100),

  metrics: Object.fromEntries(
    ['first-contentful-paint', 'largest-contentful-paint', 'speed-index', 'total-blocking-time', 'cumulative-layout-shift', 'interactive']
      .map((id) => [id, a[id]?.displayValue])
  ),

  bootupByUrl: items('bootup-time')
    .slice(0, 8)
    .map((i) => ({ url: i.url?.split('/').pop(), total: i.total, script: i.scripting })),

  mainThreadByCategory: (a['mainthread-work-breakdown']?.details?.items || []).map(
    (i) => ({ group: i.groupLabel, ms: Math.round(i.duration) })
  ),

  longestTasks: items('long-tasks')
    .slice(0, 8)
    .map((i) => ({ url: i.url?.split('/').pop(), ms: Math.round(i.duration) })),

  unusedJs: items('unused-javascript')
    .slice(0, 8)
    .map((i) => ({
      url: i.url?.split('/').pop(),
      totalKB: Math.round(i.totalBytes / 1024),
      wastedKB: Math.round(i.wastedBytes / 1024),
    })),

  renderBlocking: items('render-blocking-resources').map((i) => ({
    url: i.url,
    kb: Math.round(i.totalBytes / 1024),
    wastedMs: Math.round(i.wastedMs),
  })),

  lcpElement: a['largest-contentful-paint-element']?.details?.items?.[0]?.node?.nodeLabel,

  networkChain: items('network-requests')
    .slice(0, 6)
    .map((i) => ({ url: i.url?.split('/').pop(), kb: Math.round((i.transferSize || 0) / 1024), ms: Math.round((i.networkEndTime || 0) - (i.networkRequestTime || 0)) })),
};

fs.writeFileSync(
  file.replace(/\.json$/, '-diagnose.json'),
  JSON.stringify(summary, null, 2),
  'utf8'
);

console.log(JSON.stringify(summary, null, 2));
