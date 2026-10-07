'use client';

import React, { useRef, useState } from 'react';

import {
  motion,
  AnimatePresence,
} from 'framer-motion';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faCloudArrowUp,
  faImages,
  faDownload,
  faSpinner,
  faCheckCircle,
  faXmark,
  faFileImage,
  faFileZipper,
  faRotate,
  faWandMagicSparkles,
  faCube,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';

import JSZip from 'jszip';

import {
  convertImage,
  createOutputFilename,
} from '../lib/image/convertImage';

import {
  createIcoPack,
} from '../lib/ico/createIco';

import {
  ICON_SIZES,
  DEFAULT_ICON_SIZES,
} from '../lib/ico/iconSizes';

import {
  IMAGE_FORMATS,
  IMAGE_INPUT_ACCEPT,
} from '../lib/image/imageFormats';

import {
  formatFileSize,
  calculateSavings,
} from '../lib/image/imageUtils';

const OUTPUT_GROUPS = [
  {
    id: 'common',
    label: 'الصيغ الشائعة',
  },
  {
    id: 'modern',
    label: 'الصيغ الحديثة',
  },
  {
    id: 'advanced',
    label: 'الصيغ المتقدمة',
  },
  {
    id: 'icons',
    label: 'الأيقونات',
  },
  {
    id: 'technical',
    label: 'الصيغ التقنية',
  },
];

function createItem(file) {
  return {
    id: `${file.name}-${file.lastModified}-${Math.random()}`,
    file,
    status: 'pending',
    result: null,
    error: null,
  };
}

function getOutputOptionsByGroup(groupId) {
  return IMAGE_FORMATS.filter(
    (format) =>
      format.output &&
      format.group === groupId
  );
}

export default function FormatConverterTool() {
  const fileInputRef = useRef(null);

  const [items, setItems] = useState([]);

  const [settings, setSettings] = useState({
    outputFormat: 'webp',
    quality: 90,
    maxDimension: 0,
    iconSizes: DEFAULT_ICON_SIZES,
  });

  const [dragActive, setDragActive] = useState(false);

  const [processing, setProcessing] = useState(false);

  const [processingIndex, setProcessingIndex] = useState(0);

  const addFiles = (incomingFiles) => {
    const files = Array.from(incomingFiles || []);

    const acceptedExtensions = IMAGE_INPUT_ACCEPT
      .split(',')
      .map((extension) => extension.trim().toLowerCase())
      .filter(Boolean);

    const validFiles = files.filter((file) => {
      const fileName = file.name?.toLowerCase() || '';

      return acceptedExtensions.some((extension) =>
        fileName.endsWith(extension)
      );
    });

    if (!validFiles.length) {
      return;
    }

    setItems((previous) => [
      ...previous,
      ...validFiles.map(createItem),
    ]);
  };

  const handleInputChange = (event) => {
    addFiles(event.target.files || []);
    event.target.value = '';
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragActive(false);

    if (event.dataTransfer?.files?.length) {
      addFiles(event.dataTransfer.files);
    }
  };

  const updateItem = (id, patch) => {
    setItems((previous) =>
      previous.map((item) =>
        item.id === id
          ? {
              ...item,
              ...patch,
            }
          : item
      )
    );
  };

  const removeItem = (id) => {
    if (processing) {
      return;
    }

    setItems((previous) =>
      previous.filter((item) => item.id !== id)
    );
  };

  const clearAll = () => {
    if (processing) {
      return;
    }

    setItems([]);
  };

  const toggleIconSize = (size) => {
    if (processing) {
      return;
    }

    setSettings((previous) => {
      const exists = previous.iconSizes.includes(size);

      const nextSizes = exists
        ? previous.iconSizes.filter(
            (item) => item !== size
          )
        : [...previous.iconSizes, size];

      return {
        ...previous,
        iconSizes: nextSizes.sort(
          (a, b) => a - b
        ),
      };
    });
  };

  const processAll = async () => {
    if (processing || !items.length) {
      return;
    }

    if (
      settings.outputFormat === 'ico' &&
      !settings.iconSizes.length
    ) {
      return;
    }

    setProcessing(true);
    setProcessingIndex(0);

    const snapshot = [...items];

    for (
      let index = 0;
      index < snapshot.length;
      index += 1
    ) {
      const item = snapshot[index];

      setProcessingIndex(index);

      updateItem(item.id, {
        status: 'processing',
        error: null,
        result: null,
      });

      try {
        if (settings.outputFormat === 'ico') {
          const pack = await createIcoPack(
            item.file,
            settings.iconSizes
          );

          updateItem(item.id, {
            status: 'done',
            result: {
              kind: 'ico-pack',
              ...pack,
            },
            error: null,
          });
        } else {
          const result = await convertImage(
            item.file,
            {
              outputFormat:
                settings.outputFormat,
              quality: settings.quality,
              maxDimension:
                Number(settings.maxDimension) || 0,
            }
          );

          updateItem(item.id, {
            status: 'done',
            result: {
              kind: 'image',
              blob: result.blob,
              width: result.width,
              height: result.height,
              outputFormat:
                result.outputFormat,
            },
            error: null,
          });
        }
      } catch (error) {
        console.error(
          'Format conversion error:',
          error
        );

        updateItem(item.id, {
          status: 'error',
          result: null,
          error:
            error?.message ||
            'تعذر تحويل الملف. تأكد من أن الملف سليم ومدعوم ثم حاول مرة أخرى.',
        });
      }
    }

    setProcessing(false);
  };

  const downloadBlob = (blob, filename) => {
    if (!blob) {
      return;
    }

    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');

    link.href = url;
    link.download = filename;
    link.style.display = 'none';

    document.body.appendChild(link);
    link.click();
    link.remove();

    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 1000);
  };

  const downloadItem = (item) => {
    if (!item?.result) {
      return;
    }

    if (item.result.kind === 'ico-pack') {
      const baseName = item.file.name
        .replace(/\.[^/.]+$/, '')
        .replace(/\s+/g, '_');

      downloadBlob(
        item.result.zip,
        `${baseName}-icons.zip`
      );

      return;
    }

    downloadBlob(
      item.result.blob,
      createOutputFilename(
        item.file.name,
        item.result.outputFormat
      )
    );
  };

  const downloadAll = async () => {
    const completed = items.filter(
      (item) =>
        item.status === 'done' &&
        item.result
    );

    if (!completed.length) {
      return;
    }

    const zip = new JSZip();

    for (const item of completed) {
      const baseName = item.file.name
        .replace(/\.[^/.]+$/, '')
        .replace(/\s+/g, '_');

      if (item.result.kind === 'ico-pack') {
        for (const icon of item.result.files) {
          zip.file(
            `${baseName}/${icon.filename}`,
            icon.blob
          );
        }

        zip.file(
          `${baseName}/favicon.ico`,
          item.result.favicon
        );
      } else {
        zip.file(
          createOutputFilename(
            item.file.name,
            item.result.outputFormat
          ),
          item.result.blob
        );
      }
    }

    const zipBlob = await zip.generateAsync({
      type: 'blob',
      compression: 'DEFLATE',
      compressionOptions: {
        level: 6,
      },
    });

    downloadBlob(
      zipBlob,
      'datalynx-converted-images.zip'
    );
  };

  const completedCount = items.filter(
    (item) => item.status === 'done'
  ).length;

  const progress = items.length
    ? Math.round(
        (completedCount / items.length) * 100
      )
    : 0;

  const isIco =
    settings.outputFormat === 'ico';

  const selectedDefinition =
    IMAGE_FORMATS.find(
      (format) =>
        format.id === settings.outputFormat
    );

  return (
    <div className="p-5 sm:p-8 md:p-10">

      {/* =========================================
          Header
      ========================================== */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-400 text-2xl mb-5">
          <FontAwesomeIcon icon={faImages} />
        </div>

        <h2 className="text-2xl md:text-3xl font-black text-white mb-3">
          تحويل صيغ الصور
        </h2>

        <p className="text-white max-w-2xl mx-auto leading-relaxed">
          حوّل صورك بين مجموعة واسعة من
          الصيغ مباشرة داخل متصفحك، دون رفع
          ملفاتك إلى خادم.
        </p>
      </div>

      {/* =========================================
          Upload / Dropzone
      ========================================== */}
      <div
        onDragOver={(event) => {
          event.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => {
          setDragActive(false);
        }}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center transition-all duration-300 ${
          dragActive
            ? 'border-emerald-400 bg-emerald-400/5'
            : 'border-slate-700 bg-slate-950/40 hover:border-slate-600'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={IMAGE_INPUT_ACCEPT}
          className="hidden"
          onChange={handleInputChange}
        />

        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={() =>
            fileInputRef.current?.click()
          }
        >
          <div className="w-20 h-20 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center mb-5">
            <FontAwesomeIcon
              icon={faCloudArrowUp}
              className="text-4xl text-slate-300"
            />
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
            اسحب الصور وأفلتها هنا
          </h3>

          <p className="text-sm text-white mb-6 max-w-2xl leading-relaxed">
            JPG · PNG · WebP · GIF · BMP · TIFF ·
            TGA · ICO · PSD · AVIF · HEIC · DNG ·
            PNM · PCX · QOI
          </p>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              fileInputRef.current?.click();
            }}
            className="px-6 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold text-sm hover:bg-slate-700 hover:border-slate-600 transition-all cursor-pointer"
          >
            اختيار الملفات
          </button>
        </div>
      </div>

      {/* =========================================
          Workspace
      ========================================== */}
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
                Settings Card
            ====================================== */}
            <div className="p-6 rounded-3xl bg-slate-950/60 border border-slate-800">

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">

                <div>
                  <h3 className="text-lg font-bold text-white">
                    إعدادات التحويل
                  </h3>

                  <p className="text-sm text-white mt-1">
                    اختر صيغة الإخراج والإعدادات
                    المناسبة للملفات المحددة.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={clearAll}
                  disabled={processing}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-slate-700 text-white hover:text-white hover:bg-slate-800 hover:border-slate-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  <FontAwesomeIcon
                    icon={faXmark}
                  />

                  مسح الكل
                </button>

              </div>

              {/* ===================================
                  Main Settings
              ==================================== */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Output Format */}
                <div>
                  <label className="block text-sm font-bold text-white mb-3">
                    صيغة الإخراج
                  </label>

                  <select
                    value={settings.outputFormat}
                    disabled={processing}
                    onChange={(event) =>
                      setSettings((previous) => ({
                        ...previous,
                        outputFormat:
                          event.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none focus:border-emerald-500 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                  >
                    {OUTPUT_GROUPS.map(
                      (group) => {
                        const options =
                          getOutputOptionsByGroup(
                            group.id
                          );

                        if (!options.length) {
                          return null;
                        }

                        return (
                          <optgroup
                            key={group.id}
                            label={group.label}
                          >
                            {options.map(
                              (format) => (
                                <option
                                  key={format.id}
                                  value={format.id}
                                >
                                  {
                                    format.label
                                  }
                                </option>
                              )
                            )}
                          </optgroup>
                        );
                      }
                    )}
                  </select>

                  <p className="text-xs text-white mt-2 leading-relaxed">
                    تتغير الخيارات المتاحة حسب
                    الصيغة والمحرك المستخدم.
                  </p>
                </div>

                {/* Quality */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-sm font-bold text-white">
                      الجودة
                    </label>

                    <span className="text-sm font-black text-emerald-400">
                      {settings.quality}%
                    </span>
                  </div>

                  <input
                    type="range"
                    min="20"
                    max="100"
                    step="5"
                    value={settings.quality}
                    disabled={
                      processing ||
                      !selectedDefinition?.lossy
                    }
                    onChange={(event) =>
                      setSettings((previous) => ({
                        ...previous,
                        quality:
                          Number(
                            event.target.value
                          ),
                      }))
                    }
                    className="w-full accent-emerald-500 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                  />

                  <div className="flex justify-between text-xs text-white mt-2">
                    <span>حجم أصغر</span>
                    <span>جودة أعلى</span>
                  </div>

                  <p className="text-xs text-white mt-2 leading-relaxed">
                    التحكم في الجودة متاح للصيغ
                    التي تدعم الضغط الفقدي.
                  </p>
                </div>

                {/* Max Dimension */}
                <div>
                  <label className="block text-sm font-bold text-white mb-3">
                    أقصى بُعد للصورة
                  </label>

                  <select
                    value={settings.maxDimension}
                    disabled={
                      processing || isIco
                    }
                    onChange={(event) =>
                      setSettings((previous) => ({
                        ...previous,
                        maxDimension:
                          Number(
                            event.target.value
                          ),
                      }))
                    }
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none focus:border-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <option value="0">
                      بدون تغيير
                    </option>

                    <option value="1024">
                      1024px
                    </option>

                    <option value="1280">
                      1280px
                    </option>

                    <option value="1600">
                      1600px
                    </option>

                    <option value="1920">
                      1920px
                    </option>

                    <option value="2560">
                      2560px
                    </option>

                    <option value="3840">
                      3840px
                    </option>
                  </select>

                  <p className="text-xs text-white mt-2 leading-relaxed">
                    يتم الحفاظ على نسبة أبعاد
                    الصورة تلقائيًا.
                  </p>
                </div>

              </div>

              {/* ===================================
                  Runtime Warning
              ==================================== */}
              <AnimatePresence>
                {selectedDefinition?.runtimeDependent && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 8,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    className="mt-6 flex items-start gap-3 p-4 rounded-2xl bg-amber-500/5 border border-amber-500/15"
                  >
                    <FontAwesomeIcon
                      icon={
                        faTriangleExclamation
                      }
                      className="text-amber-400 mt-0.5 shrink-0"
                    />

                    <p className="text-sm text-white leading-relaxed">
                      هذه الصيغة تعتمد جزئيًا على
                      إمكانيات المتصفح ومحرك
                      الصور المتاح. إذا لم يكن
                      الترميز المطلوب متاحًا، ستظهر
                      رسالة واضحة بدل إنشاء ملف غير
                      صالح.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ===================================
                  ICO Settings
              ==================================== */}
              <AnimatePresence>
                {isIco && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    className="mt-7 p-5 rounded-2xl bg-blue-500/5 border border-blue-500/15"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">

                      <div>
                        <h4 className="text-white font-bold flex items-center gap-2">
                          <FontAwesomeIcon
                            icon={faCube}
                            className="text-blue-400"
                          />

                          مقاسات الأيقونات
                        </h4>

                        <p className="text-sm text-white mt-1 leading-relaxed">
                          اختر المقاسات المطلوبة. سيتم
                          إنشاء ملف ICO مستقل لكل مقاس،
                          بالإضافة إلى favicon.ico
                          متعدد المقاسات.
                        </p>
                      </div>

                      <button
                        type="button"
                        disabled={processing}
                        onClick={() =>
                          setSettings(
                            (previous) => ({
                              ...previous,
                              iconSizes:
                                DEFAULT_ICON_SIZES,
                            })
                          )
                        }
                        className="text-sm text-blue-400 hover:text-blue-300 font-bold transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                      >
                        تحديد المقاسات الافتراضية
                      </button>

                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                      {ICON_SIZES.map((icon) => {
                        const active =
                          settings.iconSizes.includes(
                            icon.value
                          );

                        return (
                          <button
                            key={icon.value}
                            type="button"
                            disabled={processing}
                            onClick={() =>
                              toggleIconSize(
                                icon.value
                              )
                            }
                            className={`px-3 py-3 rounded-xl border text-xs font-bold transition-all cursor-pointer disabled:cursor-not-allowed ${
                              active
                                ? 'bg-blue-500/15 border-blue-500/40 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.08)]'
                                : 'bg-slate-900 border-slate-800 text-white hover:text-white hover:border-slate-700 hover:bg-slate-800'
                            }`}
                          >
                            {icon.label}
                          </button>
                        );
                      })}
                    </div>

                    <p className="text-xs text-white mt-4 leading-relaxed">
                      المقاسات المحددة حاليًا:{' '}
                      {settings.iconSizes.length
                        ? settings.iconSizes
                            .map(
                              (size) =>
                                `${size}px`
                            )
                            .join(' · ')
                        : 'لم يتم اختيار أي مقاس'}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ===================================
                  Start Buttons
              ==================================== */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3">

                <button
                  type="button"
                  onClick={processAll}
                  disabled={
                    processing ||
                    !items.length ||
                    (
                      isIco &&
                      !settings.iconSizes.length
                    )
                  }
                  className="flex-1 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-3"
                >
                  {processing ? (
                    <>
                      <FontAwesomeIcon
                        icon={faSpinner}
                        className="animate-spin"
                      />

                      جاري التحويل...
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon
                        icon={
                          faWandMagicSparkles
                        }
                      />

                      {isIco
                        ? 'إنشاء الأيقونات'
                        : 'بدء التحويل'}
                    </>
                  )}
                </button>

                {completedCount > 0 && (
                  <button
                    type="button"
                    onClick={downloadAll}
                    disabled={processing}
                    className="sm:w-56 py-3.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-white font-black transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
                  >
                    <FontAwesomeIcon
                      icon={faFileZipper}
                    />

                    تحميل الكل ZIP
                  </button>
                )}

              </div>

              {/* ===================================
                  Progress
              ==================================== */}
              {processing && (
                <div className="mt-6">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-white">
                      معالجة الملف{' '}
                      {Math.min(
                        processingIndex + 1,
                        items.length
                      )}{' '}
                      من{' '}
                      {items.length}
                    </span>

                    <span className="text-emerald-400 font-bold">
                      {progress}%
                    </span>
                  </div>

                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 transition-all duration-300"
                      style={{
                        width: `${progress}%`,
                      }}
                    />
                  </div>

                  <p className="text-xs text-white mt-2">
                    تتم المعالجة محليًا داخل المتصفح.
                  </p>
                </div>
              )}

            </div>

            {/* =====================================
                Files / Results
            ====================================== */}
            <div className="mt-6 space-y-4">

              {items.map((item) => {
                const done =
                  item.status === 'done' &&
                  item.result;

                const icoPack =
                  done &&
                  item.result.kind ===
                    'ico-pack';

                const outputSize =
                  done &&
                  !icoPack
                    ? item.result.blob.size
                    : null;

                const savings =
                  outputSize
                    ? calculateSavings(
                        item.file.size,
                        outputSize
                      )
                    : 0;

                return (
                  <motion.div
                    key={item.id}
                    layout
                    className="p-4 sm:p-5 rounded-2xl bg-slate-900/70 border border-slate-800"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center gap-5">

                      {/* Icon */}
                      <div className="shrink-0 w-14 h-14 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-xl">
                        <FontAwesomeIcon
                          icon={
                            icoPack
                              ? faCube
                              : faFileImage
                          }
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">

                        <div className="flex items-start justify-between gap-4">

                          <div className="min-w-0">
                            <h4
                              className="font-bold text-white truncate"
                              dir="ltr"
                              title={item.file.name}
                            >
                              {item.file.name}
                            </h4>

                            <p className="text-sm text-white mt-1">
                              الحجم الأصلي:{' '}
                              <span className="font-bold text-white">
                                {formatFileSize(
                                  item.file.size
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
                                icon={faXmark}
                              />
                            </button>
                          )}

                        </div>

                        {/* Processing */}
                        {item.status ===
                          'processing' && (
                          <div className="mt-4 flex items-center gap-2 text-blue-400 text-sm font-bold">
                            <FontAwesomeIcon
                              icon={faSpinner}
                              className="animate-spin"
                            />

                            جاري معالجة الملف...
                          </div>
                        )}

                        {/* Error */}
                        {item.status === 'error' && (
                          <div className="mt-4 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-white text-sm leading-relaxed">
                            <div className="flex items-start gap-3">
                              <FontAwesomeIcon
                                icon={
                                  faTriangleExclamation
                                }
                                className="text-rose-400 mt-0.5 shrink-0"
                              />

                              <span>
                                {item.error}
                              </span>
                            </div>
                          </div>
                        )}

                        {/* Done */}
                        {done && (
                          <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-4">

                            <div className="flex items-center gap-3">

                              <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                                <FontAwesomeIcon
                                  icon={
                                    faCheckCircle
                                  }
                                />
                              </div>

                              <div>
                                {icoPack ? (
                                  <>
                                    <div className="font-bold text-emerald-400">
                                      تم إنشاء{' '}
                                      {
                                        item
                                          .result
                                          .files
                                          .length
                                      }{' '}
                                      أيقونات
                                    </div>

                                    <div className="text-sm text-white mt-1">
                                      بالإضافة إلى
                                      favicon.ico
                                      متعدد المقاسات
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <div className="font-bold text-emerald-400">
                                      {
                                        item
                                          .result
                                          .width
                                      }{' '}
                                      ×{' '}
                                      {
                                        item
                                          .result
                                          .height
                                      }{' '}
                                      px
                                    </div>

                                    <div className="text-sm text-white mt-1">
                                      {formatFileSize(
                                        outputSize
                                      )}

                                      {savings >
                                        0 && (
                                        <>
                                          {' '}
                                          · توفير{' '}
                                          {savings.toFixed(
                                            1
                                          )}
                                          %
                                        </>
                                      )}
                                    </div>
                                  </>
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
                              className={`sm:mr-auto px-5 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                                icoPack
                                  ? 'bg-blue-500 hover:bg-blue-400 text-white'
                                  : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
                              }`}
                            >
                              <FontAwesomeIcon
                                icon={
                                  icoPack
                                    ? faFileZipper
                                    : faDownload
                                }
                              />

                              {icoPack
                                ? 'تحميل حزمة ICO'
                                : 'تحميل'}
                            </button>

                          </div>
                        )}

                      </div>
                    </div>
                  </motion.div>
                );
              })}

            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================
          Empty State
      ========================================== */}
      {!items.length && (
        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-white">
          <FontAwesomeIcon
            icon={faRotate}
            className="text-emerald-400"
          />

          <span>
            يمكنك اختيار عدة ملفات وتحويلها دفعة
            واحدة.
          </span>
        </div>
      )}

    </div>
  );
}

