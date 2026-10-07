import JSZip from 'jszip';

import {
  decodeImage,
  IcoEncoder,
  Transform,
  Interpolation,
} from 'image-in-browser';

import {
  DEFAULT_ICON_SIZES,
  FAVICON_SIZES,
} from './iconSizes';

function createIconImage(
  source,
  size
) {
  return Transform.copyResizeCropSquare(
    {
      image: source,
      size,
      interpolation:
        Interpolation.cubic,
    }
  );
}

function createIcoBlob(
  images
) {
  const encoder =
    new IcoEncoder();

  const bytes =
    encoder.encodeImages(
      images
    );

  return new Blob(
    [bytes],
    {
      type:
        'image/x-icon',
    }
  );
}

export async function createIcoPack(
  file,
  selectedSizes = DEFAULT_ICON_SIZES
) {
  if (!(file instanceof Blob)) {
    throw new Error(
      'الملف غير صالح.'
    );
  }

  const bytes =
    new Uint8Array(
      await file.arrayBuffer()
    );

  const source =
    decodeImage({
      data: bytes,
      largest: true,
    });

  if (!source) {
    throw new Error(
      'تعذر قراءة الصورة لإنشاء ICO.'
    );
  }

  const sizes =
    [...selectedSizes]
      .map(Number)
      .filter(
        (size) =>
          Number.isInteger(size) &&
          size >= 16 &&
          size <= 256
      )
      .sort(
        (a, b) => a - b
      );

  if (!sizes.length) {
    throw new Error(
      'اختر مقاسًا واحدًا على الأقل.'
    );
  }

  const files = [];

  for (const size of sizes) {
    const iconImage =
      createIconImage(
        source,
        size
      );

    const blob =
      createIcoBlob([
        iconImage,
      ]);

    files.push({
      size,
      filename:
        `icon-${size}x${size}.ico`,
      blob,
    });
  }

  /*
   * favicon.ico should contain the
   * standard favicon sizes regardless
   * of the user's individual exports.
   */
  const faviconImages =
    FAVICON_SIZES.map(
      (size) =>
        createIconImage(
          source,
          size
        )
    );

  const favicon =
    createIcoBlob(
      faviconImages
    );

  const zip =
    new JSZip();

  files.forEach(
    ({
      filename,
      blob,
    }) => {
      zip.file(
        filename,
        blob
      );
    }
  );

  zip.file(
    'favicon.ico',
    favicon
  );

  const zipBlob =
    await zip.generateAsync(
      {
        type: 'blob',
        compression:
          'DEFLATE',
        compressionOptions:
          {
            level: 6,
          },
      }
    );

  return {
    files,
    favicon,
    zip: zipBlob,
    originalWidth:
      source.width,
    originalHeight:
      source.height,
  };
}