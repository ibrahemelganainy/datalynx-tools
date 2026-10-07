export const IMAGE_FORMATS = [
  // =========================
  // Common
  // =========================
  {
    id: 'jpeg',
    label: 'JPG / JPEG',
    extension: 'jpg',
    mime: 'image/jpeg',
    group: 'common',
    input: true,
    output: true,
    engine: 'image-in-browser',
    lossy: true,
  },
  {
    id: 'png',
    label: 'PNG',
    extension: 'png',
    mime: 'image/png',
    group: 'common',
    input: true,
    output: true,
    engine: 'image-in-browser',
    lossy: false,
  },
  {
    id: 'webp',
    label: 'WebP',
    extension: 'webp',
    mime: 'image/webp',
    group: 'common',
    input: true,
    output: true,
    engine: 'image-in-browser',
    lossy: false,
  },
  {
    id: 'gif',
    label: 'GIF',
    extension: 'gif',
    mime: 'image/gif',
    group: 'common',
    input: true,
    output: true,
    engine: 'image-in-browser',
    lossy: false,
  },
  {
    id: 'bmp',
    label: 'BMP',
    extension: 'bmp',
    mime: 'image/bmp',
    group: 'common',
    input: true,
    output: true,
    engine: 'image-in-browser',
    lossy: false,
  },

  // =========================
  // Professional / legacy
  // =========================
  {
    id: 'tiff',
    label: 'TIFF / TIF',
    extension: 'tiff',
    mime: 'image/tiff',
    group: 'advanced',
    input: true,
    output: true,
    engine: 'image-in-browser',
    lossy: false,
  },
  {
    id: 'tga',
    label: 'TGA',
    extension: 'tga',
    mime: 'image/x-tga',
    group: 'advanced',
    input: true,
    output: true,
    engine: 'image-in-browser',
    lossy: false,
  },
  {
    id: 'pvr',
    label: 'PVR',
    extension: 'pvr',
    mime: 'image/x-pvr',
    group: 'advanced',
    input: true,
    output: true,
    engine: 'image-in-browser',
    lossy: false,
  },
  {
    id: 'psd',
    label: 'PSD — Photoshop',
    extension: 'psd',
    mime: 'image/vnd.adobe.photoshop',
    group: 'advanced',
    input: true,
    output: false,
    engine: 'image-in-browser',
    lossy: false,
  },

  // =========================
  // Icons
  // =========================
  {
    id: 'ico',
    label: 'ICO — Windows Icon',
    extension: 'ico',
    mime: 'image/x-icon',
    group: 'icons',
    input: true,
    output: true,
    engine: 'image-in-browser',
    special: true,
  },
  {
    id: 'cur',
    label: 'CUR — Windows Cursor',
    extension: 'cur',
    mime: 'image/x-icon',
    group: 'icons',
    input: false,
    output: true,
    engine: 'image-in-browser',
    special: true,
  },

  // =========================
  // Modern / extended codecs
  // =========================
  {
    id: 'avif',
    label: 'AVIF',
    extension: 'avif',
    mime: 'image/avif',
    group: 'modern',
    input: true,
    output: true,
    engine: 'cross-image',
    runtimeDependent: true,
  },
  {
    id: 'heic',
    label: 'HEIC / HEIF',
    extension: 'heic',
    mime: 'image/heic',
    group: 'modern',
    input: true,
    output: true,
    engine: 'cross-image',
    runtimeDependent: true,
  },

  // =========================
  // RAW / technical
  // =========================
  {
    id: 'dng',
    label: 'DNG',
    extension: 'dng',
    mime: 'image/x-adobe-dng',
    group: 'technical',
    input: true,
    output: true,
    engine: 'cross-image',
  },
  {
    id: 'pam',
    label: 'PAM',
    extension: 'pam',
    mime: 'image/x-portable-anymap',
    group: 'technical',
    input: true,
    output: true,
    engine: 'cross-image',
  },
  {
    id: 'ppm',
    label: 'PPM',
    extension: 'ppm',
    mime: 'image/x-portable-pixmap',
    group: 'technical',
    input: true,
    output: true,
    engine: 'cross-image',
  },
  {
    id: 'pgm',
    label: 'PGM',
    extension: 'pgm',
    mime: 'image/x-portable-graymap',
    group: 'technical',
    input: true,
    output: true,
    engine: 'cross-image',
  },
  {
    id: 'pbm',
    label: 'PBM',
    extension: 'pbm',
    mime: 'image/x-portable-bitmap',
    group: 'technical',
    input: true,
    output: true,
    engine: 'cross-image',
  },
  {
    id: 'pcx',
    label: 'PCX',
    extension: 'pcx',
    mime: 'image/x-pcx',
    group: 'technical',
    input: true,
    output: true,
    engine: 'cross-image',
  },
  {
    id: 'qoi',
    label: 'QOI',
    extension: 'qoi',
    mime: 'image/qoi',
    group: 'technical',
    input: true,
    output: true,
    engine: 'cross-image',
  },
];

export const FORMAT_ALIASES = {
  jpg: 'jpeg',
  jpeg: 'jpeg',

  tif: 'tiff',
  tiff: 'tiff',

  heif: 'heic',
  heic: 'heic',

  ico: 'ico',

  png: 'png',
  apng: 'png',

  bmp: 'bmp',
  gif: 'gif',
  webp: 'webp',
  avif: 'avif',

  tga: 'tga',
  psd: 'psd',
  pvr: 'pvr',

  dng: 'dng',
  pam: 'pam',
  ppm: 'ppm',
  pgm: 'pgm',
  pbm: 'pbm',
  pcx: 'pcx',
  qoi: 'qoi',
};

export const IMAGE_INPUT_EXTENSIONS =
  IMAGE_FORMATS
    .filter((format) => format.input)
    .map((format) => `.${format.extension}`)
    .concat([
      '.heif',
      '.tif',
      '.jpeg',
    ]);

export const IMAGE_INPUT_ACCEPT =
  IMAGE_INPUT_EXTENSIONS.join(',');

export function normalizeFormat(format) {
  if (!format) {
    return null;
  }

  const normalized =
    String(format)
      .trim()
      .toLowerCase()
      .replace('.', '');

  return (
    FORMAT_ALIASES[normalized] ||
    normalized
  );
}

export function getFormatById(format) {
  const normalized =
    normalizeFormat(format);

  return (
    IMAGE_FORMATS.find(
      (item) =>
        item.id === normalized
    ) || null
  );
}

export function detectFormatFromFilename(
  filename = ''
) {
  const index =
    filename.lastIndexOf('.');

  if (index === -1) {
    return null;
  }

  return normalizeFormat(
    filename.slice(index + 1)
  );
}

export function isImageInBrowserFormat(
  format
) {
  const definition =
    getFormatById(format);

  return (
    definition?.engine ===
    'image-in-browser'
  );
}

export function isCrossImageFormat(
  format
) {
  const definition =
    getFormatById(format);

  return (
    definition?.engine ===
    'cross-image'
  );
}

export function getMimeType(
  format
) {
  return (
    getFormatById(format)?.mime ||
    'application/octet-stream'
  );
}

export function getOutputExtension(
  format
) {
  return (
    getFormatById(format)
      ?.extension ||
    normalizeFormat(format) ||
    'bin'
  );
}