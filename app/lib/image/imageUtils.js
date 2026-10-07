export function formatFileSize(bytes) {
  if (!Number.isFinite(bytes) || bytes <= 0) {
    return '0 Bytes';
  }

  const units = ['Bytes', 'KB', 'MB', 'GB'];

  const index = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1
  );

  const value = bytes / Math.pow(1024, index);

  return `${parseFloat(value.toFixed(2))} ${units[index]}`;
}

export function calculateSavings(originalSize, compressedSize) {
  if (!originalSize || compressedSize == null) {
    return 0;
  }

  const savings = ((originalSize - compressedSize) / originalSize) * 100;

  return Math.max(0, Math.min(100, savings));
}

export function getFileBaseName(filename) {
  const lastDot = filename.lastIndexOf('.');

  if (lastDot === -1) {
    return filename;
  }

  return filename.slice(0, lastDot);
}

export function extensionFromMimeType(mimeType) {
  const map = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
    'image/avif': 'avif',
    'image/bmp': 'bmp',
  };

  return map[mimeType] || 'jpg';
}

export function mimeTypeFromFormat(format) {
  const map = {
    jpeg: 'image/jpeg',
    jpg: 'image/jpeg',
    png: 'image/png',
    webp: 'image/webp',
    avif: 'image/avif',
  };

  return map[format] || 'image/webp';
}

export function createOutputFilename(
  originalName,
  format,
  prefix = 'compressed'
) {
  const baseName = getFileBaseName(originalName);

  const extensionMap = {
    jpeg: 'jpg',
    jpg: 'jpg',
    png: 'png',
    webp: 'webp',
    avif: 'avif',
  };

  const extension = extensionMap[format] || 'webp';

  return `${prefix}_${baseName}.${extension}`;
}