/*
 * Inspects the largest unnamed initial chunks and reports the strings
 * that identify them, so we know if any of it is deferrable app code
 * rather than framework runtime.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const chunksDir = path.join(root, 'out', '_next', 'static', 'chunks');

const TARGETS = process.argv.slice(2);
const CHUNK_DIR = chunksDir;

function describe(name) {
  const full = path.join(CHUNK_DIR, name);
  if (!fs.existsSync(full)) return { name, missing: true };

  const src = fs.readFileSync(full, 'utf8');

  /* Long, human-readable string literals usually name the module. */
  const strings = [...src.matchAll(/["']([A-Za-z][A-Za-z0-9 ./_@-]{18,90})["']/g)]
    .map((m) => m[1])
    .filter((s) => !/^https?:|^[0-9a-f]{20,}$/.test(s));

  const unique = [...new Set(strings)];

  /* Heuristics for what this chunk is. */
  const hints = [];
  if (/webpack|turbopack|__turbopack|__webpack_require__/.test(src)) hints.push('bundler-runtime');
  if (/react-dom|ReactDOM|reactDom/.test(src)) hints.push('react-dom');
  if (/scheduler/.test(src)) hints.push('scheduler');
  if (/framer-motion|MotionConfig/.test(src)) hints.push('framer-motion');
  if (/FontAwesome/.test(src)) hints.push('font-awesome');
  if (/usePathname|app-router-context/.test(src)) hints.push('next-router');
  if (/ImageCompression|drag|dropzone|drop-images|اختيار الصور/.test(src)) hints.push('tool-ui');

  return {
    name,
    kb: Math.round(fs.statSync(full).size / 1024),
    hints,
    sampleStrings: unique.slice(0, 14),
  };
}

const out = TARGETS.map(describe);

fs.writeFileSync(
  path.join(root, 'lh', 'chunk-detail.json'),
  JSON.stringify(out, null, 2),
  'utf8'
);

console.log(JSON.stringify(out, null, 2));
