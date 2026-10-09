/*
 * Renders the OLD (backup) and NEW favicon side by side on a plain page so
 * both can be compared visually at the sizes a browser actually shows.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

const oldIco = fs.readFileSync(path.join(root, 'app', 'favicon.ico.bak'));
const newIco = fs.readFileSync(path.join(root, 'app', 'favicon.ico'));

fs.writeFileSync(
  path.join(root, 'shots', 'favicon-compare.html'),
  `<!doctype html>
<meta charset="utf-8">
<style>
  body { background:#0b1220; color:#e2e8f0; font:14px system-ui; margin:0; padding:28px; }
  h2 { font-size:13px; letter-spacing:.08em; text-transform:uppercase; color:#94a3b8; margin:0 0 14px; }
  .row { display:flex; align-items:flex-end; gap:22px; margin-bottom:30px; }
  .cell { text-align:center; }
  .cell img { image-rendering:auto; background:#020617; border-radius:6px; }
  .cell span { display:block; font-size:11px; color:#64748b; margin-top:6px; }
</style>
<h2>Old favicon.ico (270 KB, single uncompressed 256&times;256 BMP)</h2>
<div class="row">
  <div class="cell"><img width="16" height="16" src="data:image/x-icon;base64,${oldIco.toString('base64')}"><span>16</span></div>
  <div class="cell"><img width="32" height="32" src="data:image/x-icon;base64,${oldIco.toString('base64')}"><span>32</span></div>
  <div class="cell"><img width="48" height="48" src="data:image/x-icon;base64,${oldIco.toString('base64')}"><span>48</span></div>
  <div class="cell"><img width="128" height="128" src="data:image/x-icon;base64,${oldIco.toString('base64')}"><span>128</span></div>
</div>
<h2>New favicon.ico (30 KB, multi-size PNG entries)</h2>
<div class="row">
  <div class="cell"><img width="16" height="16" src="data:image/x-icon;base64,${newIco.toString('base64')}"><span>16</span></div>
  <div class="cell"><img width="32" height="32" src="data:image/x-icon;base64,${newIco.toString('base64')}"><span>32</span></div>
  <div class="cell"><img width="48" height="48" src="data:image/x-icon;base64,${newIco.toString('base64')}"><span>48</span></div>
  <div class="cell"><img width="128" height="128" src="data:image/x-icon;base64,${newIco.toString('base64')}"><span>128</span></div>
</div>
`
);

console.log('wrote shots/favicon-compare.html');
