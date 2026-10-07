import {
  PDFDocument,
} from 'pdf-lib';

import {
  openPdf,
  renderPdfDocument,
} from './renderPdf';

/**
 * Remove the original document's editable metadata as much as
 * the browser-side rebuild allows.
 *
 * This is intentionally conservative. We do not alter page content,
 * page order, or annotations in structural mode.
 */
async function structuralOptimizePdf(
  file
) {
  const bytes =
    new Uint8Array(
      await file.arrayBuffer()
    );

  const pdfDoc =
    await PDFDocument.load(
      bytes,
      {
        updateMetadata: false,
      }
    );

  const pageCount =
    pdfDoc.getPageCount();

  const outputBytes =
    await pdfDoc.save({
      /*
       * Object streams generally produce a more compact PDF.
       */
      useObjectStreams: true,

      /*
       * Prevent an accidental blank page from being added.
       */
      addDefaultPage: false,

      /*
       * Keep the browser responsive while pdf-lib serializes
       * large documents.
       */
      objectsPerTick: 25,

      /*
       * There is no form editing operation in the compressor.
       */
      updateFieldAppearances: false,
    });

  return {
    bytes: outputBytes,
    pageCount,
    mode: 'structural',
    preservesText: true,
  };
}

/**
 * Build a new PDF using compressed JPEG representations
 * of the original pages.
 *
 * This is the strongest browser-only PDF compression route
 * for scanned/image-heavy PDFs.
 */
async function rasterCompressPdf(
  file,
  {
    dpi = 120,
    quality = 0.82,
    maxPixels = 6000000,
    onProgress,
  } = {}
) {
  const rendered =
    await renderPdfDocument(
      file,
      {
        dpi,
        quality,
        maxPixels,
        onProgress,
      }
    );

  const outputPdf =
    await PDFDocument.create();

  for (
    const pageData of rendered.pages
  ) {
    const page =
      outputPdf.addPage([
        pageData.width,
        pageData.height,
      ]);

    const jpegBytes =
      new Uint8Array(
        await pageData.blob.arrayBuffer()
      );

    const image =
      await outputPdf.embedJpg(
        jpegBytes
      );

    page.drawImage(
      image,
      {
        x: 0,
        y: 0,
        width: pageData.width,
        height: pageData.height,
      }
    );
  }

  const outputBytes =
    await outputPdf.save({
      useObjectStreams: true,
      addDefaultPage: false,
      objectsPerTick: 10,
      updateFieldAppearances: false,
    });

  return {
    bytes: outputBytes,
    pageCount:
      rendered.pageCount,
    mode: 'raster',
    preservesText: false,
  };
}

/**
 * Main PDF compression API.
 *
 * modes:
 *
 * preserve
 *   Structural optimization only.
 *
 * visual
 *   Always rasterize pages.
 *
 * smart
 *   Generate both candidates and return the smaller result.
 */
export async function compressPdf(
  file,
  {
    mode = 'smart',
    dpi = 120,
    quality = 0.82,
    maxPixels = 6000000,
    onProgress,
  } = {}
) {
  if (!(file instanceof Blob)) {
    throw new Error(
      'ملف PDF غير صالح.'
    );
  }

  const originalBytes =
    new Uint8Array(
      await file.arrayBuffer()
    );

  if (!originalBytes.length) {
    throw new Error(
      'ملف PDF فارغ.'
    );
  }

  /*
   * Preserve-text mode.
   */
  if (mode === 'preserve') {
    const structural =
      await structuralOptimizePdf(
        file
      );

    return {
      blob: new Blob(
        [structural.bytes],
        {
          type: 'application/pdf',
        }
      ),
      originalSize:
        originalBytes.length,
      outputSize:
        structural.bytes.length,
      pageCount:
        structural.pageCount,
      mode:
        structural.mode,
      preservesText:
        true,
      reduction:
        Math.max(
          0,
          1 -
            structural.bytes.length /
              originalBytes.length
        ),
    };
  }

  /*
   * Visual mode.
   */
  if (mode === 'visual') {
    const raster =
      await rasterCompressPdf(
        file,
        {
          dpi,
          quality,
          maxPixels,
          onProgress,
        }
      );

    return {
      blob: new Blob(
        [raster.bytes],
        {
          type: 'application/pdf',
        }
      ),
      originalSize:
        originalBytes.length,
      outputSize:
        raster.bytes.length,
      pageCount:
        raster.pageCount,
      mode:
        raster.mode,
      preservesText:
        false,
      reduction:
        Math.max(
          0,
          1 -
            raster.bytes.length /
              originalBytes.length
        ),
    };
  }

  /*
   * Smart mode:
   *
   * 1. Preserve-text candidate.
   * 2. Raster candidate.
   * 3. Choose the smaller.
   *
   * If the structural version is smaller, text remains text.
   * Otherwise the visual candidate wins because compression
   * is the primary objective.
   */
  const structural =
    await structuralOptimizePdf(
      file
    );

  const raster =
    await rasterCompressPdf(
      file,
      {
        dpi,
        quality,
        maxPixels,
        onProgress,
      }
    );

  const selected =
    raster.bytes.length <
    structural.bytes.length
      ? raster
      : structural;

  return {
    blob: new Blob(
      [selected.bytes],
      {
        type: 'application/pdf',
      }
    ),
    originalSize:
      originalBytes.length,
    outputSize:
      selected.bytes.length,
    pageCount:
      selected.pageCount,
    mode:
      selected.mode,
    preservesText:
      selected.preservesText,
    reduction:
      Math.max(
        0,
        1 -
          selected.bytes.length /
            originalBytes.length
      ),
  };
}

/**
 * Public helper for PDF page count.
 */
export async function getPdfPageCount(
  file
) {
  const {
    pdf,
    loadingTask,
  } = await openPdf(file);

  try {
    return pdf.numPages;
  } finally {
    try {
      await pdf.destroy();
    } catch {}

    try {
      await loadingTask.destroy();
    } catch {}
  }
}

