'use client';

import React, {
  useRef,
  useState,
} from 'react';

import {
  motion,
  AnimatePresence,
} from 'framer-motion';

import {
  FontAwesomeIcon,
} from '@fortawesome/react-fontawesome';

import {
  faCloudArrowUp,
  faFilePdf,
  faDownload,
  faFileZipper,
  faSpinner,
  faCheckCircle,
  faXmark,
  faCompress,
  faRotate,
  faTriangleExclamation,
  faGaugeHigh,
  faLayerGroup,
  faTextHeight,
} from '@fortawesome/free-solid-svg-icons';

import JSZip from 'jszip';

import {
  compressPdf,
} from '../lib/pdf/compressPdf';

import {
  formatFileSize,
} from '../lib/image/imageUtils';

const PDF_ACCEPT =
  '.pdf,application/pdf';

function createItem(file) {
  return {
    id:
      `${file.name}-${file.lastModified}-${Math.random()}`,
    file,
    status: 'pending',
    result: null,
    error: null,
    progress: 0,
  };
}

function calculateSavings(
  original,
  output
) {
  if (
    !original ||
    !output
  ) {
    return 0;
  }

  return Math.max(
    0,
    Math.min(
      100,
      ((original - output) /
        original) *
        100
    )
  );
}

export default function PdfCompressionTool() {
  const fileInputRef =
    useRef(null);

  const [items, setItems] =
    useState([]);

  const [dragActive, setDragActive] =
    useState(false);

  const [processing, setProcessing] =
    useState(false);

  const [processingIndex, setProcessingIndex] =
    useState(0);

  const [settings, setSettings] =
    useState({
      mode: 'smart',
      dpi: 120,
      quality: 82,
    });

  const addFiles =
    (incomingFiles) => {
      const files =
        Array.from(
          incomingFiles || []
        );

      const validFiles =
        files.filter(
          (file) => {
            const name =
              file.name
                ?.toLowerCase() ||
              '';

            return (
              file.type ===
                'application/pdf' ||
              name.endsWith(
                '.pdf'
              )
            );
          }
        );

      if (!validFiles.length) {
        return;
      }

      setItems(
        (previous) => [
          ...previous,
          ...validFiles.map(
            createItem
          ),
        ]
      );
    };

  const handleInput =
    (event) => {
      addFiles(
        event.target.files ||
          []
      );

      event.target.value = '';
    };

  const handleDrop =
    (event) => {
      event.preventDefault();
      setDragActive(false);

      if (
        event.dataTransfer
          ?.files?.length
      ) {
        addFiles(
          event.dataTransfer
            .files
        );
      }
    };

  const updateItem =
    (id, patch) => {
      setItems(
        (previous) =>
          previous.map(
            (item) =>
              item.id === id
                ? {
                    ...item,
                    ...patch,
                  }
                : item
          )
      );
    };

  const removeItem =
    (id) => {
      if (processing) {
        return;
      }

      setItems(
        (previous) =>
          previous.filter(
            (item) =>
              item.id !== id
          )
      );
    };

  const clearAll = () => {
    if (processing) {
      return;
    }

    setItems([]);
  };

  const processAll =
    async () => {
      if (
        processing ||
        !items.length
      ) {
        return;
      }

      setProcessing(true);
      setProcessingIndex(0);

      const snapshot =
        [...items];

      for (
        let index = 0;
        index < snapshot.length;
        index += 1
      ) {
        const item =
          snapshot[index];

        setProcessingIndex(
          index
        );

        updateItem(
          item.id,
          {
            status:
              'processing',
            progress: 0,
            error: null,
            result: null,
          }
        );

        try {
          const result =
            await compressPdf(
              item.file,
              {
                mode:
                  settings.mode,

                dpi:
                  Number(
                    settings.dpi
                  ),

                quality:
                  Number(
                    settings.quality
                  ) / 100,

                maxPixels:
                  6000000,

                onProgress:
                  ({
                    current,
                    total,
                    percent,
                  }) => {
                    updateItem(
                      item.id,
                      {
                        progress:
                          percent,
                        pageCurrent:
                          current,
                        pageTotal:
                          total,
                      }
                    );
                  },
              }
            );

          updateItem(
            item.id,
            {
              status: 'done',
              progress: 100,
              result,
              error: null,
            }
          );
        } catch (error) {
          console.error(
            'PDF compression error:',
            error
          );

          updateItem(
            item.id,
            {
              status:
                'error',
              result: null,
              progress: 0,
              error:
                error?.message ||
                'تعذر ضغط ملف PDF. تأكد من أن الملف سليم وغير محمي بكلمة مرور.',
            }
          );
        }
      }

      setProcessing(false);
    };

  const downloadBlob =
    (
      blob,
      filename
    ) => {
      if (!blob) {
        return;
      }

      const url =
        URL.createObjectURL(
          blob
        );

      const link =
        document.createElement(
          'a'
        );

      link.href = url;
      link.download =
        filename;
      link.style.display =
        'none';

      document.body.appendChild(
        link
      );

      link.click();
      link.remove();

      setTimeout(
        () =>
          URL.revokeObjectURL(
            url
          ),
        1000
      );
    };

  const downloadItem =
    (item) => {
      if (
        !item?.result
      ) {
        return;
      }

      const baseName =
        item.file.name
          .replace(
            /\.pdf$/i,
            ''
          )
          .replace(
            /\s+/g,
            '_'
          );

      downloadBlob(
        item.result.blob,
        `${baseName}_compressed.pdf`
      );
    };

  const downloadAll =
    async () => {
      const completed =
        items.filter(
          (item) =>
            item.status ===
              'done' &&
            item.result
        );

      if (!completed.length) {
        return;
      }

      const zip =
        new JSZip();

      completed.forEach(
        (item) => {
          const baseName =
            item.file.name
              .replace(
                /\.pdf$/i,
                ''
              )
              .replace(
                /\s+/g,
                '_'
              );

          zip.file(
            `${baseName}_compressed.pdf`,
            item.result.blob
          );
        }
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

      downloadBlob(
        zipBlob,
        'datalynx-compressed-pdfs.zip'
      );
    };

  const completedCount =
    items.filter(
      (item) =>
        item.status ===
        'done'
    ).length;

  const progress =
    items.length
      ? Math.round(
          (completedCount /
            items.length) *
            100
        )
      : 0;

  return (
    <div className="p-5 sm:p-8 md:p-10">

      {/* =========================================
          Header
      ========================================== */}
      <div className="text-center mb-10">

        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-rose-500/10 text-rose-400 text-2xl mb-5">
          <FontAwesomeIcon
            icon={faFilePdf}
          />
        </div>

        <h2 className="text-2xl md:text-3xl font-black text-white mb-3">
          ضغط ملفات PDF
        </h2>

        <p className="text-white max-w-2xl mx-auto leading-relaxed">
          قلّل حجم ملفات PDF من داخل متصفحك،
          مع التحكم في جودة الصفحات ودقة
          المعالجة. لا يتم رفع ملفاتك إلى
          خادم.
        </p>

      </div>

      {/* =========================================
          Dropzone
      ========================================== */}
      <div
        onDragOver={(event) => {
          event.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() =>
          setDragActive(false)
        }
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center transition-all duration-300 ${
          dragActive
            ? 'border-rose-400 bg-rose-400/5'
            : 'border-slate-700 bg-slate-950/40 hover:border-slate-600'
        }`}
      >

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={PDF_ACCEPT}
          className="hidden"
          onChange={handleInput}
        />

        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={() =>
            fileInputRef.current?.click()
          }
        >

          <div className="w-20 h-20 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center mb-5">
            <FontAwesomeIcon
              icon={
                faCloudArrowUp
              }
              className="text-4xl text-slate-300"
            />
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
            اسحب ملفات PDF وأفلتها هنا
          </h3>

          <p className="text-sm text-white mb-6">
            يمكنك اختيار عدة ملفات دفعة واحدة
          </p>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();

              fileInputRef.current?.click();
            }}
            className="px-6 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold text-sm hover:bg-slate-700 hover:border-slate-600 transition-all cursor-pointer"
          >
            اختيار ملفات PDF
          </button>

        </div>
      </div>

      <AnimatePresence>
        {items.length > 0 && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: 'auto',
            }}
            className="mt-8"
          >

            {/* =====================================
                Settings
            ====================================== */}
            <div className="p-6 rounded-3xl bg-slate-950/60 border border-slate-800">

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">

                <div>
                  <h3 className="text-lg font-bold text-white">
                    إعدادات الضغط
                  </h3>

                  <p className="text-sm text-white mt-1">
                    اختر مستوى المعالجة المناسب
                    لنوع المستند.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={
                    clearAll
                  }
                  disabled={
                    processing
                  }
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-slate-700 text-white hover:bg-slate-800 hover:border-slate-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  <FontAwesomeIcon
                    icon={faXmark}
                  />

                  مسح الكل
                </button>

              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Mode */}
                <div>

                  <label className="block text-sm font-bold text-white mb-3">
                    طريقة الضغط
                  </label>

                  <select
                    value={
                      settings.mode
                    }
                    disabled={
                      processing
                    }
                    onChange={(event) =>
                      setSettings(
                        (previous) => ({
                          ...previous,
                          mode:
                            event
                              .target
                              .value,
                        })
                      )
                    }
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none focus:border-rose-500 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                  >

                    <option value="smart">
                      ضغط ذكي — موصى به
                    </option>

                    <option value="preserve">
                      الحفاظ على النص
                    </option>

                    <option value="visual">
                      ضغط بصري قوي
                    </option>

                  </select>

                  <p className="text-sm text-white mt-2 leading-relaxed">
                    الضغط الذكي يجرب أكثر من
                    مسار ويختار النتيجة الأصغر.
                  </p>

                </div>

                {/* DPI */}
                <div>

                  <label className="block text-sm font-bold text-white mb-3">
                    دقة الصفحات
                  </label>

                  <select
                    value={
                      settings.dpi
                    }
                    disabled={
                      processing ||
                      settings.mode ===
                        'preserve'
                    }
                    onChange={(event) =>
                      setSettings(
                        (previous) => ({
                          ...previous,
                          dpi:
                            Number(
                              event
                                .target
                                .value
                            ),
                        })
                      )
                    }
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none focus:border-rose-500 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                  >

                    <option value="96">
                      96 DPI — ضغط قوي
                    </option>

                    <option value="120">
                      120 DPI — متوازن
                    </option>

                    <option value="150">
                      150 DPI — جودة عالية
                    </option>

                    <option value="200">
                      200 DPI — جودة مرتفعة جدًا
                    </option>

                  </select>

                  <p className="text-sm text-white mt-2 leading-relaxed">
                    دقة أعلى تعني جودة أفضل وحجمًا
                    أكبر، خصوصًا في المستندات
                    الممسوحة ضوئيًا.
                  </p>

                </div>

                {/* Quality */}
                <div>

                  <div className="flex justify-between items-center mb-3">

                    <label className="text-sm font-bold text-white">
                      جودة الصور
                    </label>

                    <span className="text-sm font-black text-rose-400">
                      {settings.quality}%
                    </span>

                  </div>

                  <input
                    type="range"
                    min="55"
                    max="95"
                    step="5"
                    value={
                      settings.quality
                    }
                    disabled={
                      processing ||
                      settings.mode ===
                        'preserve'
                    }
                    onChange={(event) =>
                      setSettings(
                        (previous) => ({
                          ...previous,
                          quality:
                            Number(
                              event
                                .target
                                .value
                            ),
                        })
                      )
                    }
                    className="w-full accent-rose-500 cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
                  />

                  <div className="flex justify-between text-xs text-white mt-2">
                    <span>
                      حجم أصغر
                    </span>

                    <span>
                      جودة أعلى
                    </span>
                  </div>

                  <p className="text-sm text-white mt-2 leading-relaxed">
                    يؤثر هذا الخيار على وضع الضغط
                    البصري فقط والجزء البصري من
                    الضغط الذكي.
                  </p>

                </div>

              </div>

              {/* Smart warning */}
              <AnimatePresence>
                {settings.mode ===
                  'smart' && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 8,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    className="mt-6 p-4 rounded-2xl bg-blue-500/5 border border-blue-500/15"
                  >

                    <div className="flex items-start gap-3">

                      <FontAwesomeIcon
                        icon={
                          faGaugeHigh
                        }
                        className="text-blue-400 mt-0.5 shrink-0"
                      />

                      <div>

                        <h4 className="text-white font-bold mb-1">
                          الوضع الذكي
                        </h4>

                        <p className="text-sm text-white leading-relaxed">
                          سنحاول أولًا الحفاظ على
                          بنية المستند، ثم نختبر
                          ضغطًا بصريًا للصفحات.
                          سيتم اختيار الملف الأصغر
                          تلقائيًا.
                        </p>

                      </div>

                    </div>

                  </motion.div>
                )}
              </AnimatePresence>

              {/* Preserve text */}
              <AnimatePresence>
                {settings.mode ===
                  'preserve' && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 8,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    className="mt-6 p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/15"
                  >

                    <div className="flex items-start gap-3">

                      <FontAwesomeIcon
                        icon={
                          faTextHeight
                        }
                        className="text-emerald-400 mt-0.5 shrink-0"
                      />

                      <div>

                        <h4 className="text-white font-bold mb-1">
                          الحفاظ على النص
                        </h4>

                        <p className="text-sm text-white leading-relaxed">
                          لن يتم تحويل الصفحات إلى صور،
                          لذلك تبقى إمكانية تحديد النص
                          والبحث فيه محفوظة. قد يكون
                          الانخفاض في الحجم محدودًا لبعض
                          الملفات.
                        </p>

                      </div>

                    </div>

                  </motion.div>
                )}
              </AnimatePresence>

              {/* Visual warning */}
              <AnimatePresence>
                {settings.mode ===
                  'visual' && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 8,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    className="mt-6 p-4 rounded-2xl bg-amber-500/5 border border-amber-500/15"
                  >

                    <div className="flex items-start gap-3">

                      <FontAwesomeIcon
                        icon={
                          faTriangleExclamation
                        }
                        className="text-amber-400 mt-0.5 shrink-0"
                      />

                      <div>

                        <h4 className="text-white font-bold mb-1">
                          الضغط البصري
                        </h4>

                        <p className="text-sm text-white leading-relaxed">
                          سيتم إعادة إنشاء صفحات
                          المستند كصور مضغوطة. هذا
                          مناسب جدًا للمستندات الممسوحة
                          ضوئيًا، لكنه قد يلغي إمكانية
                          تحديد النص والبحث فيه.
                        </p>

                      </div>

                    </div>

                  </motion.div>
                )}
              </AnimatePresence>

              {/* Start */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3">

                <button
                  type="button"
                  onClick={
                    processAll
                  }
                  disabled={
                    processing ||
                    !items.length
                  }
                  className="flex-1 py-3.5 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-black transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-3"
                >

                  {processing ? (
                    <>
                      <FontAwesomeIcon
                        icon={
                          faSpinner
                        }
                        className="animate-spin"
                      />

                      جاري ضغط PDF...
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon
                        icon={
                          faCompress
                        }
                      />

                      ابدأ الضغط
                    </>
                  )}

                </button>

                {completedCount >
                  0 && (
                  <button
                    type="button"
                    onClick={
                      downloadAll
                    }
                    disabled={
                      processing
                    }
                    className="sm:w-56 py-3.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-white font-black transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
                  >

                    <FontAwesomeIcon
                      icon={
                        faFileZipper
                      }
                    />

                    تحميل الكل ZIP

                  </button>
                )}

              </div>

              {/* Overall progress */}
              {processing && (
                <div className="mt-6">

                  <div className="flex items-center justify-between text-sm mb-2">

                    <span className="text-white">
                      معالجة الملف{' '}
                      {Math.min(
                        processingIndex +
                          1,
                        items.length
                      )}{' '}
                      من{' '}
                      {items.length}
                    </span>

                    <span className="text-rose-400 font-bold">
                      {progress}%
                    </span>

                  </div>

                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">

                    <div
                      className="h-full bg-rose-500 transition-all duration-300"
                      style={{
                        width:
                          `${progress}%`,
                      }}
                    />

                  </div>

                  <p className="text-sm text-white mt-2">
                    تتم المعالجة بالكامل داخل
                    المتصفح.
                  </p>

                </div>
              )}

            </div>

            {/* =====================================
                Files
            ====================================== */}
            <div className="mt-6 space-y-4">

              {items.map(
                (item) => {
                  const done =
                    item.status ===
                      'done' &&
                    item.result;

                  const outputSize =
                    done
                      ? item.result
                          .outputSize
                      : null;

                  const savings =
                    done
                      ? calculateSavings(
                          item.file.size,
                          outputSize
                        )
                      : 0;

                  return (
                    <motion.div
                      key={
                        item.id
                      }
                      layout
                      className="p-4 sm:p-5 rounded-2xl bg-slate-900/70 border border-slate-800"
                    >

                      <div className="flex flex-col lg:flex-row lg:items-center gap-5">

                        {/* Icon */}
                        <div className="shrink-0 w-14 h-14 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center text-xl">

                          <FontAwesomeIcon
                            icon={
                              faFilePdf
                            }
                          />

                        </div>

                        {/* Main */}
                        <div className="flex-1 min-w-0">

                          <div className="flex items-start justify-between gap-4">

                            <div className="min-w-0">

                              <h4
                                className="font-bold text-white truncate"
                                dir="ltr"
                                title={
                                  item
                                    .file
                                    .name
                                }
                              >
                                {
                                  item
                                    .file
                                    .name
                                }
                              </h4>

                              <p className="text-sm text-white mt-1">
                                الحجم الأصلي:{' '}
                                <span className="font-bold">
                                  {formatFileSize(
                                    item
                                      .file
                                      .size
                                  )}
                                </span>
                              </p>

                            </div>

                            {!processing && (
                              <button
                                type="button"
                                onClick={() =>
                                  removeItem(
                                    item.id
                                  )
                                }
                                aria-label="حذف الملف"
                                className="w-8 h-8 shrink-0 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                              >
                                <FontAwesomeIcon
                                  icon={
                                    faXmark
                                  }
                                />
                              </button>
                            )}

                          </div>

                          {/* Processing */}
                          {item.status ===
                            'processing' && (
                            <div className="mt-4">

                              <div className="flex items-center justify-between text-sm mb-2">

                                <span className="flex items-center gap-2 text-blue-400 font-bold">

                                  <FontAwesomeIcon
                                    icon={
                                      faSpinner
                                    }
                                    className="animate-spin"
                                  />

                                  جاري معالجة الصفحات...

                                </span>

                                <span className="text-white">
                                  {
                                    item
                                      .progress
                                  }
                                  %
                                </span>

                              </div>

                              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">

                                <div
                                  className="h-full bg-blue-500 transition-all duration-300"
                                  style={{
                                    width:
                                      `${item.progress}%`,
                                  }}
                                />

                              </div>

                              {item.pageTotal && (
                                <p className="text-sm text-white mt-2">
                                  الصفحة{' '}
                                  {
                                    item
                                      .pageCurrent
                                  }{' '}
                                  من{' '}
                                  {
                                    item
                                      .pageTotal
                                  }
                                </p>
                              )}

                            </div>
                          )}

                          {/* Error */}
                          {item.status ===
                            'error' && (
                            <div className="mt-4 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-white text-sm leading-relaxed">

                              <div className="flex items-start gap-3">

                                <FontAwesomeIcon
                                  icon={
                                    faTriangleExclamation
                                  }
                                  className="text-rose-400 mt-0.5 shrink-0"
                                />

                                <span>
                                  {
                                    item.error
                                  }
                                </span>

                              </div>

                            </div>
                          )}

                          {/* Success */}
                          {done && (
                            <div className="mt-4">

                              <div className="flex flex-col lg:flex-row lg:items-center gap-4">

                                <div className="flex items-center gap-3">

                                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">

                                    <FontAwesomeIcon
                                      icon={
                                        faCheckCircle
                                      }
                                    />

                                  </div>

                                  <div>

                                    <div className="font-bold text-emerald-400">
                                      تم ضغط الملف بنجاح
                                    </div>

                                    <div className="text-sm text-white mt-1">

                                      {formatFileSize(
                                        outputSize
                                      )}

                                      <span className="mx-2 text-white/40">
                                        |
                                      </span>

                                      توفير{' '}
                                      {savings.toFixed(
                                        1
                                      )}
                                      %

                                    </div>

                                  </div>

                                </div>

                                <div className="flex flex-wrap gap-2 lg:mr-auto">

                                  <span className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-sm text-white">

                                    <FontAwesomeIcon
                                      icon={
                                        faLayerGroup
                                      }
                                      className="text-slate-300"
                                    />

                                    {
                                      item
                                        .result
                                        .pageCount
                                    }{' '}
                                    صفحة

                                  </span>

                                  {item
                                    .result
                                    .preservesText ? (
                                    <span className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-sm text-emerald-400">

                                      <FontAwesomeIcon
                                        icon={
                                          faTextHeight
                                        }
                                      />

                                      النص محفوظ

                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-sm text-amber-400">

                                      <FontAwesomeIcon
                                        icon={
                                          faTriangleExclamation
                                        }
                                      />

                                      صفحات كصور

                                    </span>
                                  )}

                                </div>

                              </div>

                              <button
                                type="button"
                                onClick={() =>
                                  downloadItem(
                                    item
                                  )
                                }
                                className="mt-4 w-full lg:w-auto lg:mr-auto px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                              >

                                <FontAwesomeIcon
                                  icon={
                                    faDownload
                                  }
                                />

                                تحميل PDF المضغوط

                              </button>

                            </div>
                          )}

                        </div>

                      </div>

                    </motion.div>
                  );
                }
              )}

            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {!items.length && (
        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-white">

          <FontAwesomeIcon
            icon={faRotate}
            className="text-rose-400"
          />

          <span>
            يدعم الموقع معالجة عدة ملفات PDF
            دفعة واحدة.
          </span>

        </div>
      )}

    </div>
  );
}
