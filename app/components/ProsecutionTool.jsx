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
  faFileImage,
  faFilePdf,
  faDownload,
  faSpinner,
  faCheckCircle,
  faXmark,
  faScaleBalanced,
  faRotate,
  faFileCircleCheck,
  faTriangleExclamation,
  faShieldHalved,
  faFileCircleXmark,
} from '@fortawesome/free-solid-svg-icons';

import {
  compressForProsecution,
  PROSECUTION_TARGET_BYTES,
  PROSECUTION_HARD_LIMIT_BYTES,
  getProsecutionResultMessage,
} from '../lib/prosecution/compressToTarget';

import {
  formatFileSize,
  calculateSavings,
} from '../lib/image/imageUtils';

import { useLocale } from './LocaleProvider';

const ACCEPT =
  'image/*,.jpg,.jpeg,.png,.webp,.gif,.bmp,.tif,.tiff,.avif,.heic,.heif,.tga,.dng,.psd,.pcx,.qoi,.ppm,.pgm,.pbm,.pam,.pdf,application/pdf';

function isPdfFile(file) {
  return (
    file?.type ===
      'application/pdf' ||
    /\.pdf$/i.test(
      file?.name || ''
    )
  );
}

function isImageFile(file) {
  if (
    file?.type?.startsWith(
      'image/'
    )
  ) {
    return true;
  }

  const name =
    String(
      file?.name || ''
    ).toLowerCase();

  return [
    '.jpg',
    '.jpeg',
    '.png',
    '.webp',
    '.gif',
    '.bmp',
    '.tif',
    '.tiff',
    '.avif',
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
  ].some(
    (extension) =>
      name.endsWith(
        extension
      )
  );
}

function createItem(file) {
  return {
    id:
      `${file.name}-${file.lastModified}-${Math.random()}`,
    file,
    status: 'pending',
    progress: 0,
    pageCurrent: 0,
    pageTotal: 0,
    result: null,
    error: null,
  };
}

export default function ProsecutionTool() {
  const { t } = useLocale();

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

  const addFiles =
    (incomingFiles) => {
      const files =
        Array.from(
          incomingFiles || []
        );

      const validFiles =
        files.filter(
          (file) =>
            isPdfFile(file) ||
            isImageFile(file)
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
            pageCurrent: 0,
            pageTotal: 0,
            result: null,
            error: null,
          }
        );

        try {
          const result =
            await compressForProsecution(
              item.file,
              {
                targetBytes:
                  PROSECUTION_TARGET_BYTES,

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
                          current ||
                          0,
                        pageTotal:
                          total ||
                          0,
                      }
                    );
                  },
              }
            );

          updateItem(
            item.id,
            {
              status:
                result.achieved
                  ? 'done'
                  : 'failed',
              progress: 100,
              result,
              error:
                result.achieved
                  ? null
                  : getProsecutionResultMessage(
                      result,
                      t
                    ),
            }
          );
        } catch (error) {
          console.error(
            'Prosecution processing error:',
            error
          );

          updateItem(
            item.id,
            {
              status:
                'error',
              progress: 0,
              result: null,
              error:
                error?.message ||
                t('tools.prosecution.error'),
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
        !item?.result?.blob
      ) {
        return;
      }

      const baseName =
        item.file.name
          .replace(
            /\.[^/.]+$/,
            ''
          )
          .replace(
            /\s+/g,
            '_'
          );

      const extension =
        isPdfFile(
          item.file
        )
          ? 'pdf'
          : 'jpg';

      downloadBlob(
        item.result.blob,
        `${baseName}_under-500kb.${extension}`
      );
    };

  const completedItems =
    items.filter(
      (item) =>
        item.status ===
        'done'
    );

  const completedCount =
    completedItems.length;

  const overallProgress =
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

        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-400/10 text-amber-400 text-2xl mb-5">
          <FontAwesomeIcon
            icon={
              faScaleBalanced
            }
          />
        </div>

        <h2 className="text-2xl md:text-3xl font-black text-white mb-3">
          {t('tools.prosecution.title')}
        </h2>

        <p className="text-white max-w-2xl mx-auto leading-relaxed">
          {t('tools.prosecution.description')}
        </p>

      </div>

      {/* =========================================
          Privacy / Safety Notice
      ========================================== */}
      <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/15">

        <div className="flex items-start gap-3">

          <div className="w-10 h-10 shrink-0 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
            <FontAwesomeIcon
              icon={
                faShieldHalved
              }
            />
          </div>

          <div>

            <h3 className="text-white font-bold mb-1">
              {t('tools.prosecution.noticeTitle')}
            </h3>

            <p className="text-sm text-white leading-relaxed">
              {t('tools.prosecution.noticeDescription')}
            </p>

          </div>

        </div>
      </div>

      {/* =========================================
          Upload
      ========================================== */}
      <div
        onDragOver={(event) => {
          event.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() =>
          setDragActive(false)
        }
        onDrop={
          handleDrop
        }
        className={`relative border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center transition-all duration-300 ${
          dragActive
            ? 'border-amber-400 bg-amber-400/5'
            : 'border-slate-700 bg-slate-950/40 hover:border-slate-600'
        }`}
      >

        <input
          ref={
            fileInputRef
          }
          type="file"
          multiple
          accept={ACCEPT}
          className="hidden"
          onChange={
            handleInput
          }
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
            {t('tools.common.dropFiles')}
          </h3>

          <p className="text-sm text-white mb-6 max-w-2xl leading-relaxed">
            {t('tools.prosecution.formatsHint')}
          </p>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();

              fileInputRef.current?.click();
            }}
            className="px-7 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm transition-all cursor-pointer"
          >
            {t('tools.common.selectFiles')}
          </button>

        </div>
      </div>

      {/* =========================================
          Requirement Badge
      ========================================== */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">

        <div className="px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-bold">
          {t('tools.prosecution.requirementBadge')}
        </div>

        <div className="px-4 py-2 rounded-full bg-slate-800 border border-slate-700 text-white text-sm">
          {t('tools.prosecution.targetBadge')}
        </div>

      </div>

      {/* =========================================
          Results
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

            {/* Top Actions */}
            <div className="p-6 rounded-3xl bg-slate-950/60 border border-slate-800">

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                <div>

                  <h3 className="text-lg font-bold text-white">
                    {t('tools.prosecution.selectedFiles')}
                  </h3>

                  <p className="text-sm text-white mt-1">
                    {t('tools.prosecution.selectedFilesHint')}
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
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-700 text-white hover:bg-slate-800 hover:border-slate-600 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >

                  <FontAwesomeIcon
                    icon={
                      faXmark
                    }
                  />

                  {t('tools.common.clearAll')}

                </button>

              </div>

              {/* Main Button */}
              <button
                type="button"
                onClick={
                  processAll
                }
                disabled={
                  processing ||
                  !items.length
                }
                className="w-full mt-7 py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-3"
              >

                {processing ? (
                  <>
                    <FontAwesomeIcon
                      icon={
                        faSpinner
                      }
                      className="animate-spin"
                    />

                    {t('tools.prosecution.processing')}
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon
                      icon={
                        faScaleBalanced
                      }
                    />

                    {t('tools.prosecution.start')}
                  </>
                )}

              </button>

              {/* Overall Progress */}
              {processing && (
                <div className="mt-6">

                  <div className="flex items-center justify-between text-sm mb-2">

                    <span className="text-white">
                      {t('tools.common.processingFile')}{' '}
                      {Math.min(
                        processingIndex +
                          1,
                        items.length
                      )}{' '}
                      {t('tools.common.of')}{' '}
                      {
                        items.length
                      }
                    </span>

                    <span className="text-amber-400 font-bold">
                      {
                        overallProgress
                      }
                      %
                    </span>

                  </div>

                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">

                    <div
                      className="h-full bg-amber-500 transition-all duration-300"
                      style={{
                        width:
                          `${overallProgress}%`,
                      }}
                    />

                  </div>

                  <p className="text-sm text-white mt-2">
                    {t('tools.prosecution.overallHint')}
                  </p>

                </div>
              )}

            </div>

            {/* File Cards */}
            <div className="mt-6 space-y-4">

              {items.map(
                (item) => {
                  const isPdf =
                    isPdfFile(
                      item.file
                    );

                  const done =
                    item.status ===
                    'done';

                  const failed =
                    item.status ===
                    'failed';

                  const error =
                    item.status ===
                    'error';

                  const result =
                    item.result;

                  const outputSize =
                    result
                      ?.outputSize ||
                    null;

                  const savings =
                    outputSize
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

                        {/* File Icon */}
                        <div
                          className={`shrink-0 w-14 h-14 rounded-xl flex items-center justify-center text-xl ${
                            isPdf
                              ? 'bg-rose-500/10 text-rose-400'
                              : 'bg-blue-500/10 text-blue-400'
                          }`}
                        >
                          <FontAwesomeIcon
                            icon={
                              isPdf
                                ? faFilePdf
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
                                {t('tools.common.originalSize')}{' '}
                                <span className="font-bold text-white">
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
                                aria-label={t('tools.common.removeFile')}
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

                              <div className="flex items-center justify-between mb-2">

                                <span className="flex items-center gap-2 text-amber-400 font-bold text-sm">

                                  <FontAwesomeIcon
                                    icon={
                                      faSpinner
                                    }
                                    className="animate-spin"
                                  />

                                  {t('tools.prosecution.itemProcessing')}
                                </span>

                                <span className="text-sm text-white font-bold">
                                  {
                                    item
                                      .progress
                                  }
                                  %
                                </span>

                              </div>

                              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">

                                <div
                                  className="h-full bg-amber-500 transition-all duration-300"
                                  style={{
                                    width:
                                      `${item.progress}%`,
                                  }}
                                />

                              </div>

                              {isPdf &&
                                item
                                  .pageTotal >
                                  0 && (
                                  <p className="text-sm text-white mt-2">
                                    {t('tools.prosecution.processingPage')}{' '}
                                    {
                                      item
                                        .pageCurrent
                                    }{' '}
                                    {t('tools.common.of')}{' '}
                                    {
                                      item
                                        .pageTotal
                                    }
                                  </p>
                                )}

                            </div>
                          )}

                          {/* Success */}
                          {done &&
                            result && (
                            <div className="mt-4">

                              <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/15">

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

                                      <div className="font-black text-emerald-400">
                                        {t('tools.prosecution.ready')}
                                      </div>

                                      <div className="text-sm text-white mt-1">

                                        {t('tools.prosecution.newSize')}{' '}

                                        <span className="font-bold text-white">
                                          {
                                            formatFileSize(
                                              outputSize
                                            )
                                          }
                                        </span>

                                        <span className="mx-2 text-white/40">
                                          |
                                        </span>

                                        {t('tools.prosecution.saved')}{' '}

                                        {
                                          savings.toFixed(
                                            1
                                          )
                                        }
                                        %

                                      </div>

                                    </div>

                                  </div>

                                  <div className="flex flex-wrap gap-2 lg:mr-auto">

                                    <span className="px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-400">
                                      {t('tools.prosecution.under500')}
                                    </span>

                                    {result
                                      .unchanged && (
                                      <span className="px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-xs font-bold text-white">
                                        {t('tools.prosecution.unchanged')}
                                      </span>
                                    )}

                                    {isPdf &&
                                      !result
                                        .preservesText && (
                                        <span className="px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs font-bold text-amber-400">
                                          {t('tools.prosecution.pagesAsImages')}
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
                                  className="w-full mt-4 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black flex items-center justify-center gap-2 transition-all cursor-pointer"
                                >

                                  <FontAwesomeIcon
                                    icon={
                                      faDownload
                                    }
                                  />

                                  {t('tools.prosecution.downloadReady')}

                                </button>

                              </div>

                              <p className="text-sm text-white mt-3">
                                {
                                  getProsecutionResultMessage(
                                    result,
                                    t
                                  )
                                }
                              </p>

                            </div>
                          )}

                          {/* Failed - could not reach 500 */}
                          {failed &&
                            result && (
                            <div className="mt-4">

                              <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/20">

                                <div className="flex items-start gap-3">

                                  <div className="w-10 h-10 shrink-0 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center">

                                    <FontAwesomeIcon
                                      icon={
                                        faFileCircleXmark
                                      }
                                    />

                                  </div>

                                  <div>

                                    <h4 className="font-black text-rose-400">
                                      {t('tools.prosecution.failedTitle')}
                                    </h4>

                                    <p className="text-sm text-white mt-1 leading-relaxed">
                                      {t('tools.prosecution.failedSmallest')}
                                      {' '}
                                      <span className="font-bold">
                                        {
                                          formatFileSize(
                                            result.outputSize
                                          )
                                        }
                                      </span>
                                      {t('tools.prosecution.failedHint')}
                                    </p>

                                  </div>

                                </div>

                                {result
                                  .outputSize <=
                                  PROSECUTION_HARD_LIMIT_BYTES && (
                                  <button
                                    type="button"
                                    onClick={() =>
                                      downloadItem(
                                        item
                                      )
                                    }
                                    className="w-full mt-4 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black flex items-center justify-center gap-2 transition-all cursor-pointer"
                                  >
                                    <FontAwesomeIcon
                                      icon={
                                        faDownload
                                      }
                                    />

                                    {t('tools.prosecution.downloadFailedResult')}
                                  </button>
                                )}

                              </div>

                            </div>
                          )}

                          {/* Error */}
                          {error &&
                            !failed && (
                            <div className="mt-4 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20">

                              <div className="flex items-start gap-3">

                                <FontAwesomeIcon
                                  icon={
                                    faTriangleExclamation
                                  }
                                  className="text-rose-400 mt-0.5 shrink-0"
                                />

                                <p className="text-sm text-white leading-relaxed">
                                  {
                                    item.error
                                  }
                                </p>

                              </div>

                            </div>
                          )}

                        </div>
                      </div>
                    </motion.div>
                  );
                }
              )}

            </div>

            {/* Batch summary */}
            {completedCount > 1 && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="mt-6 p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/15"
              >
                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                    <FontAwesomeIcon
                      icon={
                        faFileCircleCheck
                      }
                    />
                  </div>

                  <div>
                    <h4 className="text-white font-black">
                      {t('tools.prosecution.batchTitle')}{' '}
                      {
                        completedCount
                      }{' '}
                      {t('tools.prosecution.batchTitleSuffix')}
                    </h4>

                    <p className="text-sm text-white mt-1">
                      {t('tools.prosecution.batchHint')}
                    </p>
                  </div>

                </div>
              </motion.div>
            )}

          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================
          Empty Helper
      ========================================== */}
      {!items.length && (
        <div className="mt-7 text-center">

          <div className="inline-flex items-center gap-2 text-sm text-white">

            <FontAwesomeIcon
              icon={
                faRotate
              }
              className="text-amber-400"
            />

            <span>
              {t('tools.prosecution.emptyHelper')}
            </span>

          </div>

        </div>
      )}

    </div>
  );
}
