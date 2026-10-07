import {
  decodeImage,
  findDecoderForData,
  encodeJpg,
  encodePng,
  JpegChroma,
  BmpEncoder,
  GifEncoder,
  TiffEncoder,
  TgaEncoder,
  PvrEncoder,
  WebPEncoder,
  IcoEncoder,
  Transform,
  Interpolation,
} from 'image-in-browser';

import {
  normalizeFormat,
  getFormatById,
  detectFormatFromFilename,
  isImageInBrowserFormat,
  isCrossImageFormat,
} from './imageFormats';

const MAX_DIMENSION = 12000;

function clampDimension(value) {
  if (
    !Number.isFinite(value) ||
    value <= 0
  ) {
    return null;
  }

  return Math.min(
    Math.round(value),
    MAX_DIMENSION
  );
}

function calculateDimensions(
  width,
  height,
  maxDimension
) {
  const max =
    clampDimension(maxDimension);

  if (!max) {
    return {
      width,
      height,
    };
  }

  if (
    width <= max &&
    height <= max
  ) {
    return {
      width,
      height,
    };
  }

  const scale =
    max /
    Math.max(width, height);

  return {
    width: Math.max(
      1,
      Math.round(width * scale)
    ),
    height: Math.max(
      1,
      Math.round(height * scale)
    ),
  };
}

function toUint8Array(buffer) {
  if (buffer instanceof Uint8Array) {
    return buffer;
  }

  return new Uint8Array(buffer);
}

async function loadCrossImage() {
  return import('cross-image');
}

async function loadHeif() {
  return import('libheif-js/wasm-bundle');
}

/**
 * Convert image-in-browser MemoryImage
 * to PNG bytes for crossing to another codec.
 */
function encodeMemoryImageToPng(
  image
) {
  return encodePng({
    image,
    singleFrame: true,
    level: 6,
  });
}

/**
 * Decode a special format supported by
 * image-in-browser.
 */
function decodeWithImageInBrowser(
  bytes
) {
  const decoder =
    findDecoderForData(bytes);

  if (!decoder) {
    return null;
  }

  const image =
    decoder.decode({
      bytes,
      frameIndex: 0,
    });

  if (!image) {
    return null;
  }

  return image;
}

/**
 * HEIC fallback using libheif.
 */
async function decodeHeifFallback(
  file
) {
  const module =
    await loadHeif();

  const libheif =
    module.default || module;

  if (
    !libheif?.HeifDecoder
  ) {
    throw new Error(
      'تعذر تحميل محرك HEIC.'
    );
  }

  const decoder =
    new libheif.HeifDecoder();

  const bytes =
    new Uint8Array(
      await file.arrayBuffer()
    );

  const decoded =
    decoder.decode(bytes);

  if (!decoded?.length) {
    throw new Error(
      'ملف HEIC/HEIF غير صالح أو غير مدعوم.'
    );
  }

  const image =
    decoded[0];

  const width =
    image.get_width();

  const height =
    image.get_height();

  const canvas =
    document.createElement(
      'canvas'
    );

  canvas.width = width;
  canvas.height = height;

  const context =
    canvas.getContext('2d');

  if (!context) {
    throw new Error(
      'المتصفح لا يدعم Canvas.'
    );
  }

  const imageData =
    context.createImageData(
      width,
      height
    );

  await new Promise(
    (resolve, reject) => {
      image.display(
        imageData,
        (result) => {
          if (!result) {
            reject(
              new Error(
                'تعذر فك صورة HEIC.'
              )
            );
            return;
          }

          resolve();
        }
      );
    }
  );

  context.putImageData(
    imageData,
    0,
    0
  );

  /*
   * Convert the canvas to PNG and decode
   * using our primary image MemoryImage.
   */
  const pngBytes =
    await new Promise(
      (resolve, reject) => {
        canvas.toBlob(
          async (blob) => {
            if (!blob) {
              reject(
                new Error(
                  'تعذر تحويل HEIC.'
                )
              );
              return;
            }

            resolve(
              new Uint8Array(
                await blob.arrayBuffer()
              )
            );
          },
          'image/png'
        );
      }
    );

  const memoryImage =
    decodeImage({
      data: pngBytes,
    });

  if (!memoryImage) {
    throw new Error(
      'تعذر تجهيز صورة HEIC للمعالجة.'
    );
  }

  return {
    kind: 'image-in-browser',
    image: memoryImage,
  };
}

async function decodeCrossImage(
  file
) {
  const {
    Image,
  } = await loadCrossImage();

  const bytes =
    new Uint8Array(
      await file.arrayBuffer()
    );

  const image =
    await Image.decode(
      bytes
    );

  if (!image) {
    throw new Error(
      'تعذر قراءة الصورة.'
    );
  }

  return {
    kind: 'cross-image',
    image,
  };
}

/**
 * Unified decoder.
 */
export async function decodeImageFile(
  file
) {
  if (!(file instanceof Blob)) {
    throw new Error(
      'الملف غير صالح.'
    );
  }

  const extension =
    detectFormatFromFilename(
      file.name
    );

  const bytes =
    toUint8Array(
      await file.arrayBuffer()
    );

  /*
   * Primary engine:
   * JPEG, PNG, GIF, WebP, TIFF,
   * BMP, ICO, TGA, PVR, PSD, PNM.
   */
  const memoryImage =
    decodeWithImageInBrowser(
      bytes
    );

  if (memoryImage) {
    return {
      kind:
        'image-in-browser',
      image:
        memoryImage,
      format:
        extension,
    };
  }

  /*
   * Cross-image:
   * AVIF, HEIC, DNG, PNM family,
   * PCX, QOI, etc.
   */
  try {
    const cross =
      await decodeCrossImage(
        file
      );

    return {
      ...cross,
      format:
        extension,
    };
  } catch (crossError) {
    /*
     * Final HEIC/HEIF fallback.
     */
    if (
      extension === 'heic'
    ) {
      return decodeHeifFallback(
        file
      );
    }

    throw crossError;
  }
}

function resizeMemoryImage(
  image,
  maxDimension
) {
  const dimensions =
    calculateDimensions(
      image.width,
      image.height,
      maxDimension
    );

  if (
    dimensions.width ===
      image.width &&
    dimensions.height ===
      image.height
  ) {
    return image;
  }

  return Transform.copyResize({
    image,
    width:
      dimensions.width,
    height:
      dimensions.height,
    maintainAspect: true,
    interpolation:
      Interpolation.cubic,
  });
}

/**
 * Resize Cross Image.
 */
function resizeCrossImage(
  image,
  maxDimension
) {
  const dimensions =
    calculateDimensions(
      image.width,
      image.height,
      maxDimension
    );

  if (
    dimensions.width ===
      image.width &&
    dimensions.height ===
      image.height
  ) {
    return image;
  }

  image.resize({
    width:
      dimensions.width,
    height:
      dimensions.height,
  });

  return image;
}

function encodeMemoryImage(
  image,
  outputFormat,
  quality
) {
  switch (
    normalizeFormat(
      outputFormat
    )
  ) {
    case 'jpeg':
      return {
        bytes: encodeJpg({
          image,
          quality:
            Math.max(
              1,
              Math.min(
                100,
                Number(
                  quality
                ) || 90
              )
            ),
          chroma:
            JpegChroma.yuv420,
          skipExif: true,
        }),
        mime:
          'image/jpeg',
      };

    case 'png':
      return {
        bytes: encodePng({
          image,
          singleFrame: true,
          level: 9,
        }),
        mime:
          'image/png',
      };

    case 'webp':
      return {
        bytes:
          new WebPEncoder()
            .encode({
              image,
              singleFrame: true,
              skipExif: true,
            }),
        mime:
          'image/webp',
      };

    case 'gif':
      return {
        bytes:
          new GifEncoder()
            .encode({
              image,
              singleFrame: true,
              skipExif: true,
            }),
        mime:
          'image/gif',
      };

    case 'bmp':
      return {
        bytes:
          new BmpEncoder()
            .encode({
              image,
              singleFrame: true,
              skipExif: true,
            }),
        mime:
          'image/bmp',
      };

    case 'tiff':
      return {
        bytes:
          new TiffEncoder()
            .encode({
              image,
              singleFrame: true,
              skipExif: true,
            }),
        mime:
          'image/tiff',
      };

    case 'tga':
      return {
        bytes:
          new TgaEncoder()
            .encode({
              image,
              singleFrame: true,
              skipExif: true,
            }),
        mime:
          'image/x-tga',
      };

    case 'pvr':
      return {
        bytes:
          new PvrEncoder()
            .encode({
              image,
              singleFrame: true,
              skipExif: true,
            }),
        mime:
          'image/x-pvr',
      };

    default:
      throw new Error(
        `صيغة ${outputFormat} تحتاج إلى محرك التحويل المتقدم.`
      );
  }
}

async function convertMemoryToCross(
  image,
  outputFormat,
  quality
) {
  const {
    Image,
  } = await loadCrossImage();

  const pngBytes =
    encodeMemoryImageToPng(
      image
    );

  const crossImage =
    await Image.decode(
      toUint8Array(
        pngBytes
      )
    );

  if (!crossImage) {
    throw new Error(
      'تعذر تجهيز الصورة للمحرك المتقدم.'
    );
  }

  return encodeCrossImage(
    crossImage,
    outputFormat,
    quality
  );
}

async function convertCrossToMemory(
  image
) {
  const pngBytes =
    await image.encode(
      'png'
    );

  const memoryImage =
    decodeImage({
      data:
        toUint8Array(
          pngBytes
        ),
    });

  if (!memoryImage) {
    throw new Error(
      'تعذر نقل الصورة بين محركات التحويل.'
    );
  }

  return memoryImage;
}

function encodeCrossImage(
  image,
  outputFormat,
  quality
) {
  const format =
    normalizeFormat(
      outputFormat
    );

  /*
   * cross-image currently supports a broad
   * set of formats and performs the actual
   * encode in the browser.
   */
  return image
    .encode(
      format === 'heic'
        ? 'heic'
        : format,
      format === 'jpeg'
        ? {
            quality:
              Math.max(
                1,
                Math.min(
                  100,
                  Number(
                    quality
                  ) || 90
                )
              ),
          }
        : undefined
    )
    .then(
      (bytes) => ({
        bytes:
          toUint8Array(
            bytes
          ),
        mime:
          getFormatById(
            format
          )?.mime ||
          'application/octet-stream',
      })
    );
}

/**
 * Normal conversion entry point.
 */
export async function convertImage(
  file,
  {
    outputFormat,
    quality = 90,
    maxDimension = 0,
  } = {}
) {
  const format =
    normalizeFormat(
      outputFormat
    );

  const definition =
    getFormatById(format);

  if (
    !definition ||
    !definition.output
  ) {
    throw new Error(
      'صيغة الإخراج غير مدعومة.'
    );
  }

  if (format === 'ico') {
    throw new Error(
      'ICO له مسار إنشاء خاص متعدد المقاسات.'
    );
  }

  const decoded =
    await decodeImageFile(
      file
    );

  let result;

  if (
    decoded.kind ===
    'image-in-browser'
  ) {
    let memoryImage =
      decoded.image;

    memoryImage =
      resizeMemoryImage(
        memoryImage,
        maxDimension
      );

    if (
      isImageInBrowserFormat(
        format
      )
    ) {
      result =
        encodeMemoryImage(
          memoryImage,
          format,
          quality
        );
    } else {
      result =
        await convertMemoryToCross(
          memoryImage,
          format,
          quality
        );
    }

    return {
      blob:
        new Blob(
          [result.bytes],
          {
            type:
              result.mime,
          }
        ),
      width:
        memoryImage.width,
      height:
        memoryImage.height,
      outputFormat:
        format,
    };
  }

  /*
   * Cross-image source.
   */
  let crossImage =
    decoded.image;

  crossImage =
    resizeCrossImage(
      crossImage,
      maxDimension
    );

  if (
    isCrossImageFormat(
      format
    )
  ) {
    result =
      await encodeCrossImage(
        crossImage,
        format,
        quality
      );

    return {
      blob:
        new Blob(
          [result.bytes],
          {
            type:
              result.mime,
          }
        ),
      width:
        crossImage.width,
      height:
        crossImage.height,
      outputFormat:
        format,
    };
  }

  const memoryImage =
    await convertCrossToMemory(
      crossImage
    );

  result =
    encodeMemoryImage(
      memoryImage,
      format,
      quality
    );

  return {
    blob:
      new Blob(
        [result.bytes],
        {
          type:
            result.mime,
        }
      ),
    width:
      memoryImage.width,
    height:
      memoryImage.height,
    outputFormat:
      format,
  };
}

export function createOutputFilename(
  originalName,
  outputFormat
) {
  const format =
    normalizeFormat(
      outputFormat
    );

  const baseName =
    originalName
      .replace(
        /\.[^/.]+$/,
        ''
      )
      .replace(
        /\s+/g,
        '_'
      );

  const extension =
    getFormatById(format)
      ?.extension ||
    format;

  return `${baseName}.${extension}`;
}