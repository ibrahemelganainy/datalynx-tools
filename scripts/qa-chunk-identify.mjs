/*
 * Identifies what each chunk in the homepage's initial load contains,
 * so the performance bottleneck is named from evidence rather than
 * guessed at.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const audit = JSON.parse(
  fs.readFileSync(path.join(root, 'lh', 'bundle-audit.json'), 'utf8')
);

const SIGNATURES = {
  'react-dom': /react-dom|reactDom|ReactDOM/,
  'framer-motion': /framer-motion|MotionConfig|useReducedMotion/,
  'font-awesome-core': /@fortawesome\/fontawesome-svg-core|FontAwesomeIcon/,
  'font-awesome-icons': /faArrowRight|faCompress|faFilePdf|faShieldHalved/,
  'next-app-router': /next\/dist\/client\/components\/app-router|usePathname/,
  'next-router-client': /useRouter|app-router-context/,
  /* Must not appear in an initial chunk: */
  'pdf.js': /pdf\.worker|GlobalWorkerOptions/,
  'pdf-lib': /PDFDocument/,
  jszip: /JSZip/,
  'libheif (heic)': /libheif/,
  'browser-image-compression': /browser-image-compression/,
  'cross-image': /cross-image/,
  'image-in-browser': /image-in-browser/,
};

const chunksDir = path.join(root, 'out', '_next', 'static', 'chunks');

const rows = [];

for (const { name, kb } of audit.initialLoad['homepage (ar)'].chunks) {
  const full = path.join(chunksDir, name);
  if (!fs.existsSync(full)) continue;

  const src = fs.readFileSync(full, 'utf8');

  const contains = Object.entries(SIGNATURES)
    .filter(([, re]) => re.test(src))
    .map(([label]) => label);

  rows.push({ name, kb, contains });
}

const heavy = rows.filter((r) =>
  r.contains.some((c) =>
    ['pdf.js', 'pdf-lib', 'jszip', 'libheif (heic)', 'browser-image-compression', 'cross-image', 'image-in-browser'].includes(c)
  )
);

const summary = {
  homepageInitialKB: audit.initialLoad['homepage (ar)'].initialKB,
  chunks: rows,
  heavyLibrariesFoundInInitialLoad: heavy,
};

fs.writeFileSync(
  path.join(root, 'lh', 'chunk-identification.json'),
  JSON.stringify(summary, null, 2),
  'utf8'
);

console.log(JSON.stringify(summary, null, 2));
