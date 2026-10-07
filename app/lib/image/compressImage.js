import imageCompression from 'browser-image-compression';

import {
  mimeTypeFromFormat,
} from './imageUtils';

function compressionLevelToQuality(level) {
  /*
   * 0  = أقل ضغط / جودة أعلى
   * 100 = ضغط أقوى / جودة أقل
   *
   * لا نربط النسبة مباشرةً بجودة JPEG لأن النسبة
   * ليست هي نفسها قيمة quality في الترميز.
   */

  const normalized = Math.max(
    0,
    Math.min(100, Number(level) || 0)
  );

  const quality = 0.95 - (normalized / 100) * 0.60;

  return Math.max(0.30, Math.min(0.95, quality));
}

export async function compressImage(
  file,
  {
    compressionLevel = 45,
    maxWidthOrHeight = null,
    outputFormat = 'webp',
  } = {}
) {
  if (!(file instanceof Blob)) {
    throw new Error('الملف المرسل غير صالح.');
  }

  const fileType = mimeTypeFromFormat(outputFormat);

  const quality =
    compressionLevelToQuality(compressionLevel);

  const options = {
    initialQuality: quality,
    fileType,
    useWebWorker: true,
    preserveExif: false,
    alwaysKeepResolution: false,
  };

  if (
    Number.isFinite(maxWidthOrHeight) &&
    maxWidthOrHeight > 0
  ) {
    options.maxWidthOrHeight = maxWidthOrHeight;
  }

  const compressedFile = await imageCompression(
    file,
    options
  );

  return compressedFile;
}

export async function compressImageToTarget(
  file,
  {
    targetBytes,
    maxWidthOrHeight = null,
    outputFormat = 'jpeg',
    minQuality = 0.25,
    maxQuality = 0.95,
  } = {}
) {
  if (!targetBytes || targetBytes <= 0) {
    throw new Error('حجم الهدف غير صالح.');
  }

  const fileType =
    mimeTypeFromFormat(outputFormat);

  let low = minQuality;
  let high = maxQuality;

  let bestFile = null;

  /*
   * Binary search على الجودة.
   *
   * هذا سيكون أساس أداة "بوابة النيابة العامة".
   */

  for (let i = 0; i < 8; i += 1) {
    const quality = (low + high) / 2;

    const options = {
      initialQuality: quality,
      fileType,
      useWebWorker: true,
      preserveExif: false,
    };

    if (
      Number.isFinite(maxWidthOrHeight) &&
      maxWidthOrHeight > 0
    ) {
      options.maxWidthOrHeight =
        maxWidthOrHeight;
    }

    const result =
      await imageCompression(file, options);

    if (result.size <= targetBytes) {
      bestFile = result;
      low = quality;
    } else {
      high = quality;
    }
  }

  /*
   * لو لم نصل إلى الهدف بالجودة فقط،
   * سيقوم المستوى التالي في المحرك بتقليل الأبعاد.
   */

  if (!bestFile) {
    const fallbackOptions = {
      initialQuality: minQuality,
      fileType,
      useWebWorker: true,
      preserveExif: false,
      maxWidthOrHeight:
        Number.isFinite(maxWidthOrHeight) &&
        maxWidthOrHeight > 0
          ? maxWidthOrHeight
          : 1280,
    };

    bestFile = await imageCompression(
      file,
      fallbackOptions
    );
  }

  return bestFile;
}