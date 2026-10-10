/*
 * مولّد أيقونات تطبيق الويب (PWA) لمشروع Data Lynx Tools.
 *
 * المصدر الوحيد للفن هو الشعار المنشور فعلاً داخل app/favicon.ico، وليس
 * أي شكل مرسوم من جديد. ملف الأيقونة يحتوي صور PNG بمقاسات 16..256
 * (انظر scripts/build-favicon.mjs)، لذلك يُنتقى أكبر مقاس (256x256)
 * كمصدر، ثم يُقاس في متصفح Chromium (Canvas) ويُكتب PNG في public/.
 * لا يُعاد ترميز المصدر أبدًا، فالبكسلات هي الموزّعة فعلاً.
 *
 * لماذا Chromium: المشروع لا يحتوي أي مكتبة معالجة صور على الخادم،
 * ونفس الأسلوب مستخدم أصلاً في scripts/build-favicon.mjs لتقليص الأيقونة.
 * بهذا لا يُضاف أي اعتماد جديد إلى package.json.
 *
 * لماذا maskable منفصلة: أندرويد يقصّ أيقونة maskable حسب شكل المشغّل
 * (دائرة/مربع مستدير)، فيجب أن يبقى الشعار داخل "المنطقة الآمنة"
 * (80% المركزية). لذلك تُرسم بنسبة أصغر داخل إطار بخلفية العلامة.
 *
 * التشغيل (مرة واحدة، والناتج يُرفع مع الكود):
 *   node scripts/generate-pwa-icons.mjs
 *
 * لا يُشغَّل هذا السكربت أثناء `next build` حتى لا يصبح البناء معتمدًا
 * على وجود متصفح أو على فك ترميز ICO.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { homedir } from 'node:os';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = path.join(root, 'app', 'favicon.ico');
const publicDir = path.join(root, 'public');

/*
 * خلفية العلامة: نفس اللون المستخدم في شعار النافبار والفوتر (slate-900).
 * وتُستخدم فقط في نسخة maskable حيث لا بد من خلفية معتمة كاملة.
 */
const BRAND_BACKGROUND = '#0f172a';

/*
 * logoRatio: نسبة الشعار من ضلع الأيقونة.
 * 0.92 للنسخ العادية (الشعار يملأ الإطار تقريبًا).
 * 0.72 للـmaskable ليبقى داخل المنطقة الآمنة بعد القص.
 */
const ICONS = [
  { file: 'icon-192.png', size: 192, logoRatio: 0.92, maskable: false },
  { file: 'icon-512.png', size: 512, logoRatio: 0.92, maskable: false },
  { file: 'icon-512-maskable.png', size: 512, logoRatio: 0.72, maskable: true },
  { file: 'apple-touch-icon.png', size: 180, logoRatio: 0.92, maskable: false },
];

/* ---------- قراءة ICO واستخراج الصورة الأكبر ---------- */

function readIcoEntries(buffer) {
  if (buffer.readUInt16LE(0) !== 0 || buffer.readUInt16LE(2) !== 1) {
    throw new Error('app/favicon.ico ليس ملف ICO صالحًا.');
  }

  const count = buffer.readUInt16LE(4);
  const entries = [];

  for (let i = 0; i < count; i += 1) {
    const o = 6 + i * 16;
    const size = buffer.readUInt32LE(o + 8);
    const offset = buffer.readUInt32LE(o + 12);

    entries.push({
      width: buffer[o] === 0 ? 256 : buffer[o],
      height: buffer[o + 1] === 0 ? 256 : buffer[o + 1],
      data: buffer.subarray(offset, offset + size),
    });
  }

  return entries;
}

/*
 * يتحقق أن الإدخال صورة PNG فعلية (توقيع IHDR) لا BMP DIB قديم.
 * الملف الحالي يستخدم PNG بالفعل، وهذه الحماية تمنع تمرير بايتات ليست
 * صورة إلى `img.decode()` فتظهر الأيقونة فارغة بلا أي رسالة خطأ.
 */
function assertPng(data, label) {
  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

  if (!data.subarray(0, 8).equals(signature)) {
    throw new Error(
      `المقاس ${label} داخل app/favicon.ico ليس PNG. ` +
        'شغّل scripts/build-favicon.mjs أولاً أو حدّث هذا السكربت ليدعم BMP DIB.'
    );
  }
}

/* ---------- متصفح التحويل (نفس أسلوب scripts/build-favicon.mjs) ---------- */

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
      // جرّب المرشّح التالي
    }
  }

  return null;
}

/* ---------- التشغيل ---------- */

const original = fs.readFileSync(source);
const icoEntries = readIcoEntries(original);

const master = icoEntries.reduce((a, b) =>
  a.width * a.height >= b.width * b.height ? a : b
);

assertPng(master.data, `${master.width}x${master.height}`);

const masterPng = master.data;

const patchright = resolvePatchright();

if (!patchright) {
  throw new Error('patchright not found');
}

const browser = await patchright.chromium.launch({ channel: 'chromium' });
const page = await browser.newPage();

const rendered = await page.evaluate(
  async ({ masterPngBytes, icons, background }) => {
    const blob = new Blob([new Uint8Array(masterPngBytes)], {
      type: 'image/png',
    });
    const url = URL.createObjectURL(blob);

    const img = new Image();
    img.src = url;
    await img.decode();

    const out = {};

    for (const icon of icons) {
      const { size, logoRatio, maskable } = icon;
      const canvas = document.createElement('canvas');

      canvas.width = size;
      canvas.height = size;

      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, size, size);

      if (maskable) {
        ctx.fillStyle = background;
        ctx.fillRect(0, 0, size, size);
      }

      const box = size * logoRatio;
      const offset = (size - box) / 2;

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, offset, offset, box, box);

      const bytes = await new Promise((resolve) => {
        canvas.toBlob((b) => {
          b.arrayBuffer().then((buffer) => {
            resolve(Array.from(new Uint8Array(buffer)));
          });
        }, 'image/png');
      });

      out[icon.file] = bytes;
    }

    URL.revokeObjectURL(url);
    return out;
  },
  {
    masterPngBytes: Array.from(masterPng),
    icons: ICONS,
    background: BRAND_BACKGROUND,
  }
);

await browser.close();

fs.mkdirSync(publicDir, { recursive: true });

for (const [file, bytes] of Object.entries(rendered)) {
  const buffer = Buffer.from(bytes);

  fs.writeFileSync(path.join(publicDir, file), buffer);

  console.log(`${file} (${buffer.length} bytes)`);
}

console.log(
  JSON.stringify(
    {
      artworkSource: `extracted from app/favicon.ico (${master.width}x${master.height})`,
      output: Object.keys(rendered),
    },
    null,
    2
  )
);
