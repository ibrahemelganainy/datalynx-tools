const PDFJS_VERSION = '6.4.299';

let pdfjsPromise = null;

/**
 * PDF.js is loaded only when the PDF tool is actually used.
 * The PDF itself always stays in the browser.
 */
export async function loadPdfJs() {
  if (!pdfjsPromise) {
    pdfjsPromise = import('pdfjs-dist/build/pdf.mjs').then(
      (pdfjs) => {
        /*
         * The worker is code only; user PDF data is not uploaded.
         *
         * Keep the worker version exactly aligned with the installed
         * pdfjs-dist version.
         */
        pdfjs.GlobalWorkerOptions.workerSrc =
          `https://unpkg.com/pdfjs-dist@${PDFJS_VERSION}/build/pdf.worker.min.mjs`;

        return pdfjs;
      }
    );
  }

  return pdfjsPromise;
}

/**
 * Open a local PDF File inside the browser.
 */
export async function openPdf(file) {
  if (!(file instanceof Blob)) {
    throw new Error('ملف PDF غير صالح.');
  }

  const pdfjs = await loadPdfJs();

  const data = new Uint8Array(
    await file.arrayBuffer()
  );

  const loadingTask = pdfjs.getDocument({
    data,
    useWorkerFetch: false,
    isOffscreenCanvasSupported:
      typeof OffscreenCanvas !== 'undefined',
  });

  const pdf = await loadingTask.promise;

  return {
    pdf,
    data,
    loadingTask,
  };
}

/**
 * Calculate a safe rendering scale.
 *
 * PDF pages are normally 72 points per inch.
 * DPI is converted into the corresponding PDF.js scale.
 */
export function calculateRenderScale(
  page,
  dpi = 120,
  maxPixels = 6000000
) {
  const safeDpi = Math.max(
    50,
    Math.min(300, Number(dpi) || 120)
  );

  const baseViewport = page.getViewport({
    scale: 1,
    rotation: page.rotate || 0,
  });

  let scale = safeDpi / 72;

  const estimatedPixels =
    baseViewport.width *
    baseViewport.height *
    scale *
    scale;

  if (
    estimatedPixels > maxPixels &&
    estimatedPixels > 0
  ) {
    scale *= Math.sqrt(
      maxPixels / estimatedPixels
    );
  }

  return Math.max(0.5, scale);
}

/**
 * Render one PDF page to JPEG.
 *
 * The page is processed one at a time so we do not keep
 * all rendered pages in memory.
 */
export async function renderPdfPageToJpeg(
  page,
  {
    dpi = 120,
    quality = 0.82,
    maxPixels = 6000000,
  } = {}
) {
  const scale = calculateRenderScale(
    page,
    dpi,
    maxPixels
  );

  const viewport = page.getViewport({
    scale,
    rotation: page.rotate || 0,
  });

  const canvas =
    document.createElement('canvas');

  canvas.width = Math.max(
    1,
    Math.ceil(viewport.width)
  );

  canvas.height = Math.max(
    1,
    Math.ceil(viewport.height)
  );

  const context =
    canvas.getContext('2d', {
      alpha: false,
      willReadFrequently: false,
    });

  if (!context) {
    throw new Error(
      'تعذر إنشاء مساحة الرسم لمعالجة PDF.'
    );
  }

  /*
   * JPEG has no transparency.
   * A white background is appropriate for legal documents
   * and scanned paper documents.
   */
  context.save();
  context.fillStyle = '#ffffff';
  context.fillRect(
    0,
    0,
    canvas.width,
    canvas.height
  );
  context.restore();

  const renderTask = page.render({
    canvasContext: context,
    viewport,
    background: '#ffffff',
  });

  await renderTask.promise;

  const normalizedQuality = Math.max(
    0.45,
    Math.min(
      0.98,
      Number(quality) || 0.82
    )
  );

  const jpegBlob =
    await new Promise(
      (resolve, reject) => {
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(
                new Error(
                  'تعذر إنشاء صورة JPEG من صفحة PDF.'
                )
              );
              return;
            }

            resolve(blob);
          },
          'image/jpeg',
          normalizedQuality
        );
      }
    );

  const pageWidthPoints =
    viewport.width / scale;

  const pageHeightPoints =
    viewport.height / scale;

  /*
   * Release canvas memory as soon as possible.
   */
  canvas.width = 1;
  canvas.height = 1;

  try {
    page.cleanup();
  } catch {
    // cleanup is best-effort
  }

  return {
    blob: jpegBlob,
    width: pageWidthPoints,
    height: pageHeightPoints,
    pixelWidth: Math.ceil(viewport.width),
    pixelHeight: Math.ceil(viewport.height),
    scale,
  };
}

/**
 * Render a PDF one page at a time.
 */
export async function renderPdfDocument(
  file,
  {
    dpi = 120,
    quality = 0.82,
    maxPixels = 6000000,
    onProgress,
  } = {}
) {
  const {
    pdf,
    loadingTask,
  } = await openPdf(file);

  const pages = [];

  try {
    for (
      let pageNumber = 1;
      pageNumber <= pdf.numPages;
      pageNumber += 1
    ) {
      const page =
        await pdf.getPage(pageNumber);

      const rendered =
        await renderPdfPageToJpeg(
          page,
          {
            dpi,
            quality,
            maxPixels,
          }
        );

      pages.push({
        pageNumber,
        ...rendered,
      });

      if (typeof onProgress === 'function') {
        onProgress({
          current: pageNumber,
          total: pdf.numPages,
          percent: Math.round(
            (pageNumber / pdf.numPages) *
              100
          ),
        });
      }
    }

    return {
      pages,
      pageCount: pdf.numPages,
    };
  } finally {
    try {
      await pdf.destroy();
    } catch {
      // Ignore cleanup failures.
    }

    try {
      await loadingTask.destroy();
    } catch {
      // Ignore cleanup failures.
    }
  }
}

