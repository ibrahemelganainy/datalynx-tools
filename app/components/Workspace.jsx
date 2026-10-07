'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faArrowRight,
  faCompress,
  faImages,
  faFilePdf,
  faScaleBalanced,
} from '@fortawesome/free-solid-svg-icons';

const ImageCompressionTool = dynamic(
  () => import('./ImageCompressionTool'),
  {
    ssr: false,
    loading: () => <ToolLoading />,
  }
);

const FormatConverterTool = dynamic(
  () => import('./FormatConverterTool'),
  {
    ssr: false,
    loading: () => <ToolLoading />,
  }
);

const PdfCompressionTool = dynamic(
  () => import('./PdfCompressionTool'),
  {
    ssr: false,
    loading: () => <ToolLoading />,
  }
);

const ProsecutionTool = dynamic(
  () => import('./ProsecutionTool'),
  {
    ssr: false,
    loading: () => <ToolLoading />,
  }
);

function ToolLoading() {
  return (
    <div className="min-h-[500px] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4 text-slate-400">
        <div className="w-10 h-10 rounded-full border-2 border-slate-700 border-t-datalynx-primary animate-spin" />
        <span className="text-sm font-bold">
          جاري تجهيز الأداة...
        </span>
      </div>
    </div>
  );
}

export default function Workspace({
  activeTool,
  onBack,
  onSelectTool,
}) {
  const tools = [
    {
      id: 'image-compression',
      name: 'ضغط الصور',
      icon: faCompress,
    },
    {
      id: 'format-converter',
      name: 'تحويل الصيغ',
      icon: faImages,
    },
    {
      id: 'pdf-compression',
      name: 'ضغط PDF',
      icon: faFilePdf,
    },
    {
      id: 'prosecution-portal',
      name: 'بوابة النيابة',
      icon: faScaleBalanced,
      isSpecial: true,
    },
  ];

  const renderToolComponent = () => {
    switch (activeTool) {
      case 'image-compression':
        return <ImageCompressionTool />;

      case 'format-converter':
        return <FormatConverterTool />;

      case 'pdf-compression':
        return <PdfCompressionTool />;

      case 'prosecution-portal':
        return <ProsecutionTool />;

      default:
        return <ImageCompressionTool />;
    }
  };

  return (
    <section className="pt-32 pb-16 bg-[#020617] min-h-screen relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">

        {/* Workspace Header */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-5 mb-8 pb-6 border-b border-slate-800">

          {/* العودة */}
          <button
            onClick={onBack}
            type="button"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-sm font-bold transition-all border border-slate-700 hover:border-slate-600 w-full md:w-auto justify-center"
          >
            <FontAwesomeIcon
              icon={faArrowRight}
              className="text-xs"
            />

            <span>العودة للخدمات</span>
          </button>

          {/* الأدوات */}
          <div className="flex flex-nowrap overflow-x-auto scrollbar-hide gap-2 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800 w-full md:w-auto max-w-full">
            {tools.map((tool) => {
              const isActive = activeTool === tool.id;

              return (
                <button
                  key={tool.id}
                  type="button"
                  onClick={() => onSelectTool(tool.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                    isActive
                      ? tool.isSpecial
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                        : 'bg-blue-600 text-white border border-blue-500'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800 border border-transparent'
                  }`}
                >
                  <FontAwesomeIcon icon={tool.icon} />
                  <span>{tool.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Workspace */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl overflow-hidden shadow-2xl relative">

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTool}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{
                duration: 0.3,
                ease: 'easeOut',
              }}
              className="w-full h-full min-h-[500px]"
            >
              {renderToolComponent()}
            </motion.div>
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
}