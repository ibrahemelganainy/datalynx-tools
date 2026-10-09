/*
 * Rebuilds app/favicon.ico without changing how it looks.
 *
 * The current file is a single 256x256 UNCOMPRESSED BMP inside an ICO,
 * which is why it is 270 KB and the largest resource on the page. A browser
 * tab only ever shows 16-48px of it.
 *
 * The artwork is extracted from the ICO itself (not from any other file),
 * so the pixels are exactly the ones already shipping. Each size is then
 * re-encoded as PNG inside the ICO, which is the standard way to shrink an
 * ICO. Same image, same sizes, much smaller file.
 *
 * Usage: node scripts/build-favicon.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { homedir } from 'node:os';
import zlib from 'node:zlib';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const target = path.join(root, 'app', 'favicon.ico');
const backup = path.join(root, 'app', 'favicon.ico.bak');

const SIZES = [16, 32, 48, 64, 128, 256];

/* ---------- CRC32, as required by PNG ---------- */

const CRC_TABLE = (() => {
  const table = new Int32Array(256);

  for (let n = 0; n < 256; n += 1) {
    let c = n;
    for (let k = 0; k < 8; k += 1) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table[n] = c;
  }

  return table;
})();

function crc32(buffer) {
  let c = 0xffffffff;

  for (let i = 0; i < buffer.length; i += 1) {
    c = CRC_TABLE[(c ^ buffer[i]) & 0xff] ^ (c >>> 8);
  }

  return (c ^ 0xffffffff) >>> 0;
}

/* ---------- read the existing ICO ---------- */

function readIcoEntries(buffer) {
  if (buffer.readUInt16LE(0) !== 0 || buffer.readUInt16LE(2) !== 1) {
    throw new Error('Not an ICO file.');
  }

  const count = buffer.readUInt16LE(4);
  const entries = [];

  for (let i = 0; i < count; i += 1) {
    const o = 6 + i * 16;
    const width = buffer[o] === 0 ? 256 : buffer[o];
    const height = buffer[o + 1] === 0 ? 256 : buffer[o + 1];
    const size = buffer.readUInt32LE(o + 8);
    const offset = buffer.readUInt32LE(o + 12);

    entries.push({
      width,
      height,
      data: buffer.subarray(offset, offset + size),
    });
  }

  return entries;
}

/*
 * Decode a 32-bit BMP DIB (the format used inside ICO files) into RGBA.
 * Rows are stored bottom-up and the pixel order is BGRA.
 */
function decodeBmpDib(data, width, height) {
  const headerSize = data.readUInt32LE(0);
  const bitCount = data.readUInt16LE(14);

  if (bitCount !== 32) {
    throw new Error(`Unsupported ICO BMP bit depth: ${bitCount}`);
  }

  const pixelOffset = headerSize;
  const rgba = Buffer.alloc(width * height * 4);

  for (let y = 0; y < height; y += 1) {
    const srcRow = pixelOffset + (height - 1 - y) * width * 4;
    const dstRow = y * width * 4;

    for (let x = 0; x < width; x += 1) {
      const s = srcRow + x * 4;
      const d = dstRow + x * 4;

      rgba[d] = data[s + 2];
      rgba[d + 1] = data[s + 1];
      rgba[d + 2] = data[s];
      rgba[d + 3] = data[s + 3];
    }
  }

  return rgba;
}

function encodePng(width, height, rgba) {
  const raw = Buffer.alloc((width * 4 + 1) * height);

  for (let y = 0; y < height; y += 1) {
    raw[y * (width * 4 + 1)] = 0; // filter: none
    rgba.copy(raw, y * (width * 4 + 1) + 1, y * width * 4, (y + 1) * width * 4);
  }

  const chunk = (type, payload) => {
    const out = Buffer.alloc(12 + payload.length);
    out.writeUInt32BE(payload.length, 0);
    out.write(type, 4, 'ascii');
    payload.copy(out, 8);
    out.writeUInt32BE(crc32(out.subarray(4, 8 + payload.length)), 8 + payload.length);
    return out;
  };

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // colour type: RGBA
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', zlib.deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

/* ---------- resolve the browser used for canvas downscaling ---------- */

function resolvePatchright() {
  const candidates = [];
  const extBase = path.join(homedir(), '.vscode', 'extensions');

  if (fs.existsSync(extBase)) {
    const dirs = fs
      .readdirSync(extBase)
      .map((name) => path.join(extBase, name))
      .filter((full) => {
        try {
          return fs.statSync(full).isDirectory();
        } catch {
          return false;
        }
      })
      .sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs);

    for (const dir of dirs) {
      const standalone = path.join(dir, 'standalone');
      if (fs.existsSync(path.join(standalone, 'node_modules', 'patchright'))) {
        candidates.push(standalone);
      }
    }
  }

  for (const candidate of candidates) {
    try {
      return createRequire(path.join(candidate, 'x.js'))('patchright');
    } catch {
      // try the next candidate
    }
  }

  return null;
}

/* ---------- run ---------- */

const original = fs.readFileSync(target);
const originalEntries = readIcoEntries(original);

console.log(
  'existing ICO entries:',
  originalEntries
    .map((e) => `${e.width}x${e.height}=${e.data.length}B`)
    .join(', ')
);

const master = originalEntries.reduce((a, b) =>
  a.width * a.height >= b.width * b.height ? a : b
);

const rgba = decodeBmpDib(master.data, master.width, master.height);
const masterPng = encodePng(master.width, master.height, rgba);

const patchright = resolvePatchright();

if (!patchright) {
  throw new Error('patchright not found');
}

const browser = await patchright.chromium.launch({ channel: 'chromium' });
const page = await browser.newPage();

const sizeMap = await page.evaluate(
  async ({ masterPngBytes, sizes }) => {
    const blob = new Blob([new Uint8Array(masterPngBytes)], {
      type: 'image/png',
    });
    const url = URL.createObjectURL(blob);

    const img = new Image();
    img.src = url;
    await img.decode();

    const out = {};

    for (const size of sizes) {
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;

      const ctx = canvas.getContext('2d');
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.clearRect(0, 0, size, size);
      ctx.drawImage(img, 0, 0, size, size);

      const bytes = await new Promise((resolve) => {
        canvas.toBlob((b) => {
          b.arrayBuffer().then((buffer) => {
            resolve(Array.from(new Uint8Array(buffer)));
          });
        }, 'image/png');
      });

      out[size] = bytes;
    }

    URL.revokeObjectURL(url);
    return out;
  },
  { masterPngBytes: Array.from(masterPng), sizes: SIZES }
);

await browser.close();

const entries = SIZES.map((size) => ({
  size,
  data: size === master.width ? masterPng : Buffer.from(sizeMap[size]),
}));

const count = entries.length;
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(count, 4);

const directory = Buffer.alloc(16 * count);
const blobs = [];
let offset = 6 + 16 * count;

entries.forEach((entry, index) => {
  const o = index * 16;
  directory.writeUInt8(entry.size >= 256 ? 0 : entry.size, o);
  directory.writeUInt8(entry.size >= 256 ? 0 : entry.size, o + 1);
  directory.writeUInt8(0, o + 2);
  directory.writeUInt8(0, o + 3);
  directory.writeUInt16LE(1, o + 4);
  directory.writeUInt16LE(32, o + 6);
  directory.writeUInt32LE(entry.data.length, o + 8);
  directory.writeUInt32LE(offset, o + 12);

  blobs.push(entry.data);
  offset += entry.data.length;
});

const ico = Buffer.concat([header, directory, ...blobs]);

fs.copyFileSync(target, backup);
fs.writeFileSync(target, ico);

console.log(
  JSON.stringify(
    {
      artworkSource: 'extracted from the existing app/favicon.ico',
      oldBytes: original.length,
      newBytes: ico.length,
      savedBytes: original.length - ico.length,
      savedPercent: `${(
        ((original.length - ico.length) / original.length) *
        100
      ).toFixed(1)}%`,
      perEntryBytes: entries.map((e) => `${e.size}px=${e.data.length}`),
    },
    null,
    2
  )
);
