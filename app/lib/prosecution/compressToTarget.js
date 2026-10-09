import imageCompression from 'browser-image-compression';

import {
  convertImage,
} from '../image/convertImage';

import {
  compressPdf,
} from '../pdf/compressPdf';

/*
 * We intentionally target 480 KiB instead of exactly 500 KB.
 *
 * This gives the generated file a safety margin against systems
 * that use slightly different interpretations of "500 KB".
 */
export const PROSECUTION_TARGET_BYTES =
  480 * 1024;

export const PROSECUTION_HARD_LIMIT_BYTES =
  500 * 1024;

/*
 * Image profiles.
 *
 * The engine starts with a visually good profile and gradually
 * becomes more aggressive only when required.
 */
const IMAGE_PROFILES = [
  {
    maxDimension: 1920,
    quality: 0.84,
  },
  {
    maxDimension: 1600,
    quality: 0.80,
  },
  {
    maxDimension: 1400,
    quality: 0.76,
  },
  {
    maxDimension: 1200,
    quality: 0.72,
  },
  {
    maxDimension: 1080,
    quality: 0.68,
  },
  {
    maxDimension: 960,
    quality: 0.64,
  },
  {
    maxDimension: 840,
    quality: 0.60,
  },
  {
    maxDimension: 720,
    quality: 0.56,
  },
  {
    maxDimension: 640,
    quality: 0.52,
  },
  {
    maxDimension: 560,
    quality: 0.47,
  },
  {
    maxDimension: 512,
    quality: 0.42,
  },
  {
    maxDimension: 448,
    quality: 0.37,
  },
  {
    maxDimension: 384,
    quality: 0.32,
  },
  {
    maxDimension: 320,
    quality: 0.27,
  },
  {
    maxDimension: 256,
    quality: 0.22,
  },
];

/*
 * PDF profiles.
 *
 * PDF compression is substantially harder than image compression,
 * especially with multi-page scanned documents.
 *
 * We therefore reduce DPI and JPEG quality progressively.
 */
const PDF_PROFILES = [
  {
    dpi: 120,
    quality: 0.76,
    maxPixels: 4000000,
  },
  {
    dpi: 105,
    quality: 0.72,
    maxPixels: 3200000,
  },
  {
    dpi: 96,
    quality: 0.68,
    maxPixels: 2600000,
  },
  {
    dpi: 88,
    quality: 0.64,
    maxPixels: 2200000,
  },
  {
    dpi: 80,
    quality: 0.60,
    maxPixels: 1800000,
  },
  {
    dpi: 72,
    quality: 0.56,
    maxPixels: 1500000,
  },
  {
    dpi: 66,
    quality: 0.52,
    maxPixels: 1250000,
  },
  {
    dpi: 60,
    quality: 0.49,
    maxPixels: 1050000,
  },
  {
    dpi: 54,
    quality: 0.46,
    maxPixels: 900000,
  },
  {
    dpi: 48,
    quality: 0.43,
    maxPixels: 750000,
  },
  {
    dpi: 44,
    quality: 0.40,
    maxPixels: 650000,
  },
  {
    dpi: 40,
    quality: 0.37,
    maxPixels: 550000,
  },
  {
    dpi: 36,
    quality: 0.34,
    maxPixels: 450000,
  },
  {
    dpi: 32,
    quality: 0.31,
    maxPixels: 360000,
  },
  {
    dpi: 28,
    quality: 0.28,
    maxPixels: 280000,
  },
  {
    dpi: 24,
    quality: 0.25,
    maxPixels: 220000,
  },
];

function isPdfFile(file) {
  if (!file) {
    return false;
  }

  return (
    file.type === 'application/pdf' ||
    /\.pdf$/i.test(file.name || '')
  );
}

function isImageFile(file) {
  if (!file) {
    return false;
  }

  if (
    typeof file.type === 'string' &&
    file.type.startsWith('image/')
  ) {
    return true;
  }

  const name =
    String(file.name || '').toLowerCase();

  return [
    '.jpg',
    '.jpeg',
    '.png',
    '.webp',
    '.avif',
    '.gif',
    '.bmp',
    '.tif',
    '.tiff',
    '.ico',
    '.heic',
    '.heif',
    '.tga',
    '.dng',
    '.psd',
    '.pcx',
    '.qoi',
    '.ppm',
    '.pgm',
    '.pbm',
    '.pam',
  ].some((extension) =>
    name.endsWith(extension)
  );
}

function isAlreadyWithinTarget(
  file,
  targetBytes
) {
  return file.size <= targetBytes;
}

async function optimizeImageProfile(
  file,
  profile,
  targetBytes
) {
  /*
   * First convert the source into JPEG.
   *
   * This allows uncommon image formats to participate in the
   * same target-size compression pipeline.
   */
  const converted =
    await convertImage(
      file,
      {
        outputFormat: 'jpeg',
        quality:
          Math.round(
            profile.quality * 100
          ),
        maxDimension:
          profile.maxDimension,
      }
    );

  /*
   * browser-image-compression is then allowed to make the final
   * size adjustment.
   */
  const compressed =
    await imageCompression(
      converted.blob,
      {
        maxSizeMB:
          targetBytes /
          (1024 * 1024),

        maxWidthOrHeight:
          profile.maxDimension,

        initialQuality:
          profile.quality,

        minQuality: 0.15,

        maxIteration: 10,

        fileType:
          'image/jpeg',

        useWebWorker: true,

        preserveExif: false,

        alwaysKeepResolution:
          false,
      }
    );

  /*
   * The library may return a File/Blob.
   */
  const resultBlob =
    compressed instanceof Blob
      ? compressed
      : new Blob(
          [compressed],
          {
            type: 'image/jpeg',
          }
        );

  return resultBlob;
}

/**
 * Compress an image until it reaches the target.
 */
export async function compressImageForProsecution(
  file,
  {
    targetBytes =
      PROSECUTION_TARGET_BYTES,
    onProgress,
  } = {}
) {
  if (!isImageFile(file)) {
    throw new Error(
      'الملف المرسل ليس صورة مدعومة.'
    );
  }

  /*
   * Do not recompress files that already satisfy the requirement.
   */
  if (
    isAlreadyWithinTarget(
      file,
      targetBytes
    )
  ) {
    return {
      blob: file,
      outputSize: file.size,
      originalSize: file.size,
      targetBytes,
      achieved: true,
      unchanged: true,
      outputFormat:
        file.type ||
        'application/octet-stream',
      mode: 'original',
      qualityLevel: 100,
    };
  }

  let bestBlob = null;

  let bestSize =
    Number.POSITIVE_INFINITY;

  let bestProfileIndex = -1;

  for (
    let index = 0;
    index < IMAGE_PROFILES.length;
    index += 1
  ) {
    const profile =
      IMAGE_PROFILES[index];

    if (
      typeof onProgress ===
      'function'
    ) {
      onProgress({
        phase: 'compression',
        current:
          index + 1,
        total:
          IMAGE_PROFILES.length,
        percent:
          Math.round(
            (index /
              IMAGE_PROFILES.length) *
              100
          ),
      });
    }

    try {
      const blob =
        await optimizeImageProfile(
          file,
          profile,
          targetBytes
        );

      if (
        blob.size <
        bestSize
      ) {
        bestBlob = blob;
        bestSize = blob.size;
        bestProfileIndex =
          index;
      }

      /*
       * Success.
       */
      if (
        blob.size <=
        targetBytes
      ) {
        if (
          typeof onProgress ===
          'function'
        ) {
          onProgress({
            phase: 'complete',
            current:
              index + 1,
            total:
              IMAGE_PROFILES.length,
            percent: 100,
          });
        }

        return {
          blob,
          outputSize:
            blob.size,
          originalSize:
            file.size,
          targetBytes,
          achieved: true,
          unchanged: false,
          outputFormat:
            'image/jpeg',
          mode:
            'adaptive-image',
          qualityLevel:
            profile.quality,
          profileIndex:
            index,
        };
      }
    } catch (error) {
      /*
       * A single codec/profile failure should not stop the
       * complete prosecution pipeline.
       */
      console.warn(
        'Image profile failed:',
        error
      );
    }
  }

  /*
   * The engine exhausted every profile.
   */
  if (!bestBlob) {
    throw new Error(
      'تعذر معالجة الصورة. قد تكون الصيغة أو الصورة غير صالحة.'
    );
  }

  if (
    bestSize >
    PROSECUTION_HARD_LIMIT_BYTES
  ) {
    return {
      blob: bestBlob,
      outputSize: bestSize,
      originalSize:
        file.size,
      targetBytes,
      achieved: false,
      unchanged: false,
      outputFormat:
        'image/jpeg',
      mode:
        'adaptive-image',
      qualityLevel:
        IMAGE_PROFILES[
          Math.max(
            0,
            bestProfileIndex
          )
        ]?.quality ||
        null,
      profileIndex:
        bestProfileIndex,
    };
  }

  /*
   * The file is under the hard 500 KiB boundary but outside
   * the 480 KiB internal target.
   */
  return {
    blob: bestBlob,
    outputSize: bestSize,
    originalSize:
      file.size,
    targetBytes,
    achieved:
      bestSize <=
      PROSECUTION_HARD_LIMIT_BYTES,
    unchanged: false,
    outputFormat:
      'image/jpeg',
    mode:
      'adaptive-image',
    qualityLevel:
      IMAGE_PROFILES[
        Math.max(
          0,
          bestProfileIndex
        )
      ]?.quality ||
      null,
    profileIndex:
      bestProfileIndex,
  };
}

async function optimizePdfProfile(
  file,
  profile,
  targetBytes,
  onProgress,
  profileIndex,
  totalProfiles
) {
  const result =
    await compressPdf(
      file,
      {
        mode: 'visual',

        dpi:
          profile.dpi,

        quality:
          profile.quality,

        maxPixels:
          profile.maxPixels,

        onProgress:
          ({
            current,
            total,
            percent,
          }) => {
            if (
              typeof onProgress !==
              'function'
            ) {
              return;
            }

            /*
             * Reserve most of the visible progress for the
             * actual page rendering, while leaving some room
             * for the next compression profile.
             */
            const profileStart =
              (profileIndex /
                totalProfiles) *
              100;

            const profileWidth =
              100 /
              totalProfiles;

            const overall =
              profileStart +
              (percent / 100) *
                profileWidth;

            onProgress({
              phase: 'compression',
              current,
              total,
              percent:
                Math.min(
                  99,
                  Math.round(
                    overall
                  )
                ),
            });
          },
      }
    );

  if (
    result.blob.size <=
    targetBytes
  ) {
    return {
      ...result,
      achieved: true,
    };
  }

  return {
    ...result,
    achieved: false,
  };
}

/**
 * Compress PDF until the 500 KiB requirement is satisfied.
 */
export async function compressPdfForProsecution(
  file,
  {
    targetBytes =
      PROSECUTION_TARGET_BYTES,
    onProgress,
  } = {}
) {
  if (!isPdfFile(file)) {
    throw new Error(
      'الملف المرسل ليس ملف PDF.'
    );
  }

  /*
   * A file already within the target does not need destructive
   * processing.
   */
  if (
    isAlreadyWithinTarget(
      file,
      targetBytes
    )
  ) {
    return {
      blob: file,
      outputSize: file.size,
      originalSize: file.size,
      targetBytes,
      achieved: true,
      unchanged: true,
      outputFormat:
        'application/pdf',
      mode: 'original',
      preservesText: true,
      pageCount: null,
    };
  }

  let bestResult = null;

  let bestSize =
    Number.POSITIVE_INFINITY;

  for (
    let index = 0;
    index < PDF_PROFILES.length;
    index += 1
  ) {
    const profile =
      PDF_PROFILES[index];

    try {
      const result =
        await optimizePdfProfile(
          file,
          profile,
          targetBytes,
          onProgress,
          index,
          PDF_PROFILES.length
        );

      if (
        result.blob.size <
        bestSize
      ) {
        bestResult = {
          ...result,
          profile,
        };

        bestSize =
          result.blob.size;
      }

      if (
        result.blob.size <=
        targetBytes
      ) {
        if (
          typeof onProgress ===
          'function'
        ) {
          onProgress({
            phase: 'complete',
            current:
              result.pageCount,
            total:
              result.pageCount,
            percent: 100,
          });
        }

        return {
          blob:
            result.blob,
          outputSize:
            result.blob.size,
          originalSize:
            file.size,
          targetBytes,
          achieved: true,
          unchanged: false,
          outputFormat:
            'application/pdf',
          mode: 'visual-target',
          preservesText:
            false,
          pageCount:
            result.pageCount,
          dpi:
            profile.dpi,
          quality:
            profile.quality,
        };
      }
    } catch (error) {
      console.warn(
        `PDF profile ${index + 1} failed:`,
        error
      );
    }
  }

  if (!bestResult) {
    throw new Error(
      'تعذر معالجة ملف PDF. قد يكون الملف محميًا أو تالفًا.'
    );
  }

  return {
    blob:
      bestResult.blob,
    outputSize:
      bestResult.blob.size,
    originalSize:
      file.size,
    targetBytes,
    achieved:
      bestResult.blob.size <=
      PROSECUTION_HARD_LIMIT_BYTES,
    unchanged: false,
    outputFormat:
      'application/pdf',
    mode:
      'visual-target',
    preservesText:
      false,
    pageCount:
      bestResult.pageCount,
    dpi:
      bestResult.profile.dpi,
    quality:
      bestResult.profile.quality,
  };
}

/**
 * Unified prosecution processor.
 */
export async function compressForProsecution(
  file,
  options = {}
) {
  if (isPdfFile(file)) {
    return compressPdfForProsecution(
      file,
      options
    );
  }

  if (isImageFile(file)) {
    return compressImageForProsecution(
      file,
      options
    );
  }

  throw new Error(
    'نوع الملف غير مدعوم. استخدم صورة أو ملف PDF.'
  );
}

/**
 * Human-readable result message.
 *
 * An optional translator can be passed in so the message follows the
 * active interface language. The Arabic text is kept as the fallback,
 * so every existing call site keeps working unchanged.
 */
export function getProsecutionResultMessage(
  result,
  t
) {
  if (!result) {
    return '';
  }

  const translate = (key, fallback) =>
    typeof t === 'function'
      ? t(`tools.prosecution.resultMessages.${key}`, fallback)
      : fallback;

  if (result.unchanged) {
    return translate(
      'unchanged',
      'الملف كان بالفعل ضمن الحد المطلوب ولم تتم إعادة ضغطه.'
    );
  }

  if (result.achieved) {
    return translate(
      'achieved',
      'تم تجهيز الملف بنجاح ليكون ضمن الحد المطلوب.'
    );
  }

  if (
    result.outputSize <=
    PROSECUTION_HARD_LIMIT_BYTES
  ) {
    return translate(
      'nearLimit',
      'تم الوصول إلى أقل من 500KB، مع تجاوز الهامش الداخلي بقليل.'
    );
  }

  return translate(
    'notAchieved',
    'تعذر الوصول إلى أقل من 500KB دون ضغط شديد جدًا.'
  );
}
