'use client';

import React, {
  useRef,
  useState,
} from 'react';

import {
  motion,
  AnimatePresence,
} from 'framer-motion';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faCloudArrowUp,
  faCompress,
  faDownload,
  faSpinner,
  faTrash,
  faCheckCircle,
  faXmark,
  faFileImage,
  faRotate,
  faFileZipper,
} from '@fortawesome/free-solid-svg-icons';

import JSZip from 'jszip';

import {
  compressImage,
} from '../lib/image/compressImage';

import {
  formatFileSize,
  calculateSavings,
  createOutputFilename,
} from '../lib/image/imageUtils';

import { useLocale } from './LocaleProvider';

const ACCEPTED_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/bmp',
];

const DEFAULT_SETTINGS = {
  compressionLevel: 45,
  maxWidthOrHeight: 0,
  outputFormat: 'webp',
};

function createItem(file) {
  return {
    id: `${file.name}-${file.lastModified}-${Math.random()}`,
    file,
    status: 'pending',
    result: null,
    error: null,
  };
}

export default function ImageCompressionTool() {
  const { t } = useLocale();

  const fileInputRef = useRef(null);

  const [items, setItems] = useState([]);
  const [settings, setSettings] =
    useState(DEFAULT_SETTINGS);

  const [dragActive, setDragActive] =
    useState(false);

  const [processing, setProcessing] =
    useState(false);

  const [processingIndex, setProcessingIndex] =
    useState(0);

  const addFiles = (incomingFiles) => {
    const validFiles = Array.from(incomingFiles).filter(
      (file) =>
        ACCEPTED_TYPES.includes(file.type)
    );

    if (!validFiles.length) {
      return;
    }

    const newItems = validFiles.map(createItem);

    setItems((prev) => [
      ...prev,
      ...newItems,
    ]);
  };

  const removeItem = (id) => {
    setItems((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const clearAll = () => {
    if (processing) return;

    setItems([]);
  };

  const handleFileInput = (event) => {
    addFiles(event.target.files || []);
    event.target.value = '';
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragActive(false);

    if (event.dataTransfer.files?.length) {
      addFiles(event.dataTransfer.files);
    }
  };

  const updateItem = (id, patch) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, ...patch }
          : item
      )
    );
  };

  const processAll = async () => {
    if (!items.length || processing) {
      return;
    }

    setProcessing(true);
    setProcessingIndex(0);

    const currentItems = [...items];

    for (let index = 0; index < currentItems.length; index += 1) {
      const item = currentItems[index];

      setProcessingIndex(index);

      updateItem(item.id, {
        status: 'processing',
        error: null,
      });

      try {
        const result =
          await compressImage(
            item.file,
            settings
          );

        updateItem(item.id, {
          status: 'done',
          result,
          error: null,
        });
      } catch (error) {
        console.error(
          'Image compression error:',
          error
        );

        updateItem(item.id, {
          status: 'error',
          result: null,
          error: t('tools.imageCompression.error'),
        });
      }
    }

    setProcessing(false);
  };

  const downloadItem = (item) => {
    if (!item.result) {
      return;
    }

    const filename =
      createOutputFilename(
        item.file.name,
        settings.outputFormat
      );

    const url =
      URL.createObjectURL(item.result);

    const link =
      document.createElement('a');

    link.href = url;
    link.download = filename;

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  };

  const downloadAll = async () => {
    const completed =
      items.filter(
        (item) => item.result
      );

    if (!completed.length) {
      return;
    }

    const zip = new JSZip();

    completed.forEach((item) => {
      const filename =
        createOutputFilename(
          item.file.name,
          settings.outputFormat
        );

      zip.file(
        filename,
        item.result
      );
    });

    const blob =
      await zip.generateAsync({
        type: 'blob',
        compression: 'DEFLATE',
        compressionOptions: {
          level: 6,
        },
      });

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement('a');

    link.href = url;
    link.download =
      'datalynx-compressed-images.zip';

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  };

  const doneCount =
    items.filter(
      (item) => item.status === 'done'
    ).length;

  const progress =
    items.length
      ? Math.round(
          (doneCount / items.length) * 100
        )
      : 0;

  return (
    <div className="p-5 sm:p-8 md:p-10">

      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-500/10 text-blue-400 text-2xl mb-5">
          <FontAwesomeIcon
            icon={faCompress}
          />
        </div>

        <h2 className="text-2xl md:text-3xl font-black text-white mb-3">
          {t('tools.imageCompression.title')}
        </h2>

        <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed">
          {t('tools.imageCompression.description')}
        </p>
      </div>

      {/* Upload */}
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
            ? 'border-datalynx-primary bg-datalynx-primary/5'
            : 'border-slate-700 bg-slate-950/40 hover:border-slate-600'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={ACCEPTED_TYPES.join(',')}
          className="hidden"
          onChange={handleFileInput}
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
              className="text-4xl text-blue-400"
            />
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
            {t('tools.common.dropImages')}
          </h3>

          <p className="text-sm text-white mb-6">
            {t('tools.imageCompression.formatsHint')}
          </p>

          <span className="px-6 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold text-sm hover:bg-slate-700 transition-colors">
            {t('tools.common.selectImages')}
          </span>
        </div>
      </div>

      {/* Settings */}
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
            <div className="p-6 rounded-3xl bg-slate-950/60 border border-slate-800">

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {t('tools.imageCompression.settingsTitle')}
                  </h3>

                  <p className="text-sm text-slate-500 mt-1">
                    {t('tools.imageCompression.settingsSubtitle')}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={clearAll}
                  disabled={processing}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer disabled:opacity-40"
                >
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="text-xs"
                  />
                  {t('tools.common.clearAll')}
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Compression */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-sm font-bold text-slate-300">
                      {t('tools.imageCompression.levelLabel')}
                    </label>

                    <span className="text-sm font-black text-blue-400">
                      {settings.compressionLevel}%
                    </span>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="90"
                    step="5"
                    value={
                      settings.compressionLevel
                    }
                    onChange={(event) =>
                      setSettings((prev) => ({
                        ...prev,
                        compressionLevel:
                          Number(
                            event.target.value
                          ),
                      }))
                    }
                    disabled={processing}
                    className="w-full accent-blue-500 hover:cursor-pointer"
                  />

                  <div className="flex justify-between text-[11px] text-white font-bold mt-2">
                    <span>
                      {t('tools.imageCompression.levelLowerQuality')}
                    </span>
                    <span>
                      {t('tools.imageCompression.levelSmallerSize')}
                    </span>
                  </div>
                </div>

                {/* Dimensions */}
                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-3">
                    {t('tools.imageCompression.maxDimensionLabel')}
                  </label>

                  <select
                    value={
                      settings.maxWidthOrHeight
                    }
                    disabled={processing}
                    onChange={(event) =>
                      setSettings((prev) => ({
                        ...prev,
                        maxWidthOrHeight:
                          Number(
                            event.target.value
                          ),
                      }))
                    }
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none focus:border-blue-500"
                  >
                    <option value="0">
                      {t('tools.imageCompression.maxDimensionUnchanged')}
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

                  <p className="text-[11px] text-slate-600 mt-2">
                    {t('tools.imageCompression.maxDimensionHint')}
                  </p>
                </div>

                {/* Format */}
                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-3">
                    {t('tools.imageCompression.outputFormatLabel')}
                  </label>

                  <select
                    value={
                      settings.outputFormat
                    }
                    disabled={processing}
                    onChange={(event) =>
                      setSettings((prev) => ({
                        ...prev,
                        outputFormat:
                          event.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none focus:border-blue-500"
                  >
                    <option value="webp">
                      {t('tools.imageCompression.outputFormatWebp')}
                    </option>

                    <option value="jpeg">
                      JPEG
                    </option>

                    <option value="png">
                      PNG
                    </option>
                  </select>

                  {settings.outputFormat ===
                    'jpeg' && (
                    <p className="text-[11px] text-amber-400/80 mt-2">
                      {t('tools.imageCompression.jpegTransparencyWarning')}
                    </p>
                  )}
                </div>

              </div>

              {/* Start */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={processAll}
                  disabled={
                    processing ||
                    !items.length
                  }
                  className="flex-1 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white cursor-pointer font-black transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {processing ? (
                    <>
                      <FontAwesomeIcon
                        icon={faSpinner}
                        className="animate-spin"
                      />
                      {t('tools.imageCompression.processing')}
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon
                        icon={faCompress}
                      />
                      {t('tools.imageCompression.start')}
                    </>
                  )}
                </button>

                {doneCount > 0 && (
                  <button
                    type="button"
                    onClick={downloadAll}
                    disabled={processing}
                    className="sm:w-56 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 cursor-pointer font-black transition-all flex items-center justify-center gap-2 disabled:opacity-40"
                  >
                    <FontAwesomeIcon
                      icon={faFileZipper}
                    />
                    {t('tools.common.downloadAllZip')}
                  </button>
                )}
              </div>

              {/* Progress */}
              {processing && (
                <div className="mt-6">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-slate-400">
                      {t('tools.common.processingImage')}{' '}
                      {Math.min(
                        processingIndex + 1,
                        items.length
                      )}{' '}
                      {t('tools.common.of')} {items.length}
                    </span>

                    <span className="text-blue-400 font-bold">
                      {progress}%
                    </span>
                  </div>

                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 transition-all duration-300"
                      style={{
                        width: `${progress}%`,
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Files */}
            <div className="mt-6 space-y-4">
              {items.map((item) => {
                const savings =
                  item.result
                    ? calculateSavings(
                        item.file.size,
                        item.result.size
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
                      <div className="shrink-0 w-14 h-14 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center text-xl">
                        <FontAwesomeIcon
                          icon={faFileImage}
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <h4
                              className="font-bold text-white truncate"
                              dir="ltr"
                              title={
                                item.file.name
                              }
                            >
                              {item.file.name}
                            </h4>

                            <p className="text-xs text-slate-500 mt-1">
                              {t('tools.common.originalSize')}{' '}
                              {formatFileSize(
                                item.file.size
                              )}
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
                              className="w-8 h-8 shrink-0 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                            >
                              <FontAwesomeIcon
                                icon={faXmark}
                              />
                            </button>
                          )}
                        </div>

                        {/* Result */}
                        {item.status ===
                          'processing' && (
                          <div className="mt-4 flex items-center gap-2 text-blue-400 text-sm font-bold">
                            <FontAwesomeIcon
                              icon={faSpinner}
                              className="animate-spin"
                            />
                            {t('tools.imageCompression.itemProcessing')}
                          </div>
                        )}

                        {item.status ===
                          'error' && (
                          <div className="mt-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm">
                            {item.error}
                          </div>
                        )}

                        {item.status ===
                          'done' &&
                          item.result && (
                          <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-4">
                            <div className="flex items-center gap-3 text-sm">
                              <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                                <FontAwesomeIcon
                                  icon={
                                    faCheckCircle
                                  }
                                />
                              </div>

                              <div>
                                <div className="font-bold text-emerald-400">
                                  {formatFileSize(
                                    item.result
                                      .size
                                  )}
                                </div>

                                <div className="text-[11px] text-slate-500">
                                  {t('tools.imageCompression.saved')}{' '}
                                  {savings.toFixed(
                                    1
                                  )}
                                  %
                                </div>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() =>
                                downloadItem(
                                  item
                                )
                              }
                              className="sm:mr-auto px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 cursor-pointer text-slate-950 font-bold text-sm flex items-center justify-center gap-2 transition-all"
                            >
                              <FontAwesomeIcon
                                icon={faDownload}
                              />
                              {t('tools.common.download')}
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

      {/* Empty state helper */}
      {!items.length && (
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-white">
          <FontAwesomeIcon
            icon={faRotate}
            className="text-blue-400"
          />
          {t('tools.imageCompression.emptyHelper')}
        </div>
      )}
    </div>
  );
}