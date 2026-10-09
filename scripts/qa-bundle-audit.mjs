/*
 * Bundle audit for the exported static site.
 *
 * Answers two questions with evidence instead of assumption:
 *
 * 1. Which JavaScript chunks does each page load up front, and how big
 *    is that initial payload?
 * 2. Which of those initial chunks contain a heavy processing library?
 *    The heavy libraries (PDF.js, pdf-lib, JSZip, HEIC, image engines)
 *    must be loaded lazily when a tool opens, not with the homepage.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'out');
const chunksDir = path.join(outDir, '_next/static/chunks');

function sizeOf(ref) {
  const clean = ref.split('?')[0].replace(/^\//, '');
  const full = path.join(outDir, clean);
  return fs.existsSync(full) ? fs.statSync(full).size : null;
}

function chunksIn(file) {
  const html = fs.readFileSync(path.join(outDir, file), 'utf8');

  const refs = [
    ...html.matchAll(/(?:src|href)="(\/_next\/static\/[^"]+\.js)"/g),
  ].map((m) => m[1]);

  return [...new Set(refs)];
}

const PAGES = {
  'homepage (ar)': 'index.html',
  'homepage (en)': 'en/index.html',
  'tool page (ar)': 'tools/image-compression/index.html',
  'tool page (en)': 'en/tools/image-compression/index.html',
};

const initialLoad = {};

for (const [label, file] of Object.entries(PAGES)) {
  if (!fs.existsSync(path.join(outDir, file))) {
    initialLoad[label] = { file, missing: true };
    continue;
  }

  const refs = chunksIn(file);
  const total = refs.reduce((sum, r) => sum + (sizeOf(r) || 0), 0);

  initialLoad[label] = {
    file,
    initialChunkCount: refs.length,
    initialKB: Math.round(total / 1024),
    chunks: refs
      .map((r) => ({
        name: r.split('/').pop(),
        kb: Math.round((sizeOf(r) || 0) / 1024),
      }))
      .sort((a, b) => b.kb - a.kb),
  };
}

/* Signatures for the libraries that must never be in the initial load. */
const HEAVY = {
  'pdf.js': /pdf\.worker|GlobalWorkerOptions|PDFWorker/,
  'pdf-lib': /PDFDocument/,
  jszip: /JSZip/,
  'libheif/heic': /libheif|heifImage/,
  'image compression': /browser-image-compression|imageCompression/,
  'cross-image': /cross-image/,
  'image-in-browser': /image-in-browser/,
  'framer-motion': /framer-motion|MotionConfig/,
  'font-awesome': /FontAwesome/,
};

/* Every chunk on disk, with the libraries it contains. */
const allChunkLibs = {};

for (const f of fs.readdirSync(chunksDir)) {
  if (!f.endsWith('.js')) continue;

  const src = fs.readFileSync(path.join(chunksDir, f), 'utf8');
  const found = Object.entries(HEAVY)
    .filter(([, pattern]) => pattern.test(src))
    .map(([lib]) => lib);

  if (found.length) {
    allChunkLibs[f] = {
      kb: Math.round(fs.statSync(path.join(chunksDir, f)).size / 1024),
      contains: found,
    };
  }
}

/* Which libraries leak into each page's initial load. */
const leaks = {};

for (const [label, info] of Object.entries(initialLoad)) {
  if (info.missing) continue;

  const initialNames = new Set(info.chunks.map((c) => c.name));

  leaks[label] = Object.entries(allChunkLibs)
    .filter(([name]) => initialNames.has(name))
    .map(([name, meta]) => ({ chunk: name, ...meta }));
}

const payload = {
  initialLoad,
  heavyLibraryChunksOnDisk: allChunkLibs,
  heavyLibrariesInInitialLoad: leaks,
};

/* Written by the script itself so the file is always valid UTF-8 JSON,
 * regardless of the shell that invoked it. */
fs.writeFileSync(
  path.join(root, 'lh', 'bundle-audit.json'),
  JSON.stringify(payload, null, 2),
  'utf8'
);

console.log(JSON.stringify(payload, null, 2));
