/*
 * Minimal static file server used only for local verification of the
 * exported static site. Not part of the application or the deployment.
 *
 * Usage: node scripts/serve-out.mjs [port]
 */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'out');
const port = Number(process.argv[2] || 4321);

const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

function resolveFile(urlPath) {
  const clean = decodeURIComponent(urlPath.split('?')[0].split('#')[0]);
  const candidates = [];

  if (clean === '/' || clean === '') {
    candidates.push('index.html');
  } else {
    const rel = clean.replace(/^\/+/, '');
    candidates.push(rel);
    candidates.push(path.join(rel, 'index.html'));
    candidates.push(`${rel}.html`);
  }

  for (const candidate of candidates) {
    const full = path.join(root, candidate);
    if (!full.startsWith(root)) continue;
    if (fs.existsSync(full) && fs.statSync(full).isFile()) return full;
  }

  return null;
}

http
  .createServer((req, res) => {
    const file = resolveFile(req.url || '/');

    if (!file) {
      const notFound = path.join(root, '404.html');
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(fs.existsSync(notFound) ? fs.readFileSync(notFound) : 'Not found');
      return;
    }

    res.writeHead(200, {
      'Content-Type': types[path.extname(file).toLowerCase()] || 'application/octet-stream',
    });
    fs.createReadStream(file).pipe(res);
  })
  .listen(port, () => {
    console.log(`serving ${root} at http://localhost:${port}`);
  });
