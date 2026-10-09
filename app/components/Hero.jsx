'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCompress, 
  faImages, 
  faFilePdf,
  faScaleBalanced,
  faArrowLeft
} from '@fortawesome/free-solid-svg-icons';

import { useLocale } from './LocaleProvider';
import RichText from './RichText';

export default function Hero({ onSelectTool }) {
  const { t, lhref } = useLocale();

  // إعدادات الحركة لظهور العناصر بسلاسة عند التحميل فقط
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  // بيانات الخدمات لعرضها في الكروت
  const tools = [
    {
      id: 'image-compression',
      title: t('hero.tools.image-compression.title'),
      desc: t('hero.tools.image-compression.desc'),
      icon: faCompress,
      iconColor: 'text-blue-400',
      iconBg: 'bg-blue-400/10',
    },
    {
      id: 'format-converter',
      title: t('hero.tools.format-converter.title'),
      desc: t('hero.tools.format-converter.desc'),
      icon: faImages,
      iconColor: 'text-emerald-400',
      iconBg: 'bg-emerald-400/10',
    },
    {
      id: 'pdf-compression',
      title: t('hero.tools.pdf-compression.title'),
      desc: t('hero.tools.pdf-compression.desc'),
      icon: faFilePdf,
      iconColor: 'text-rose-400',
      iconBg: 'bg-rose-400/10',
    },
    {
      id: 'prosecution-portal',
      title: t('hero.tools.prosecution-portal.title'),
      desc: t('hero.tools.prosecution-portal.desc'),
      icon: faScaleBalanced,
      iconColor: 'text-amber-400',
      iconBg: 'bg-amber-400/10',
      highlight: true
    }
  ];

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#020617] pt-32 pb-20">

      {/* خلفية احترافية (إضاءات هادئة وشبكة) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] opacity-20"></div>
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-datalynx-primary/10 rounded-full blur-[150px] mix-blend-screen"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">

        {/* القسم العلوي: النصوص (Hero Text) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <motion.div variants={itemVariants} className="mb-6 flex justify-center">
            <span className="px-4 py-1.5 rounded-full border border-slate-700 bg-slate-800/50 text-slate-300 text-sm font-bold flex items-center gap-2 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              {t('hero.badge')}
            </span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight md:leading-tight mb-6">
            {t('hero.titleLine1')} <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-datalynx-primary">
              {t('hero.titleLine2')}
            </span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-slate-400 text-base md:text-lg mb-8 leading-relaxed max-w-2xl mx-auto">
            <RichText text={t('hero.description')} strongClassName="font-bold text-slate-200" />
          </motion.p>
        </motion.div>

        {/* القسم السفلي: كروت الخدمات (Enterprise Cards Grid) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {tools.map((tool) => (
            <motion.a
              href={lhref(`tools/${tool.id}`)}
              onClick={() => onSelectTool(tool.id)}
              variants={itemVariants}
              key={tool.id}
              className={`group relative flex flex-col p-6 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden text-start
                ${tool.highlight
                  ? 'bg-slate-800/80 border-amber-500/30 hover:border-amber-400/60 shadow-[0_0_15px_rgba(251,191,36,0.05)] hover:shadow-[0_0_25px_rgba(251,191,36,0.15)]'
                  : 'bg-slate-800/40 border-slate-700 hover:bg-slate-800/60 hover:border-slate-600 hover:shadow-xl'
                } hover:-translate-y-1 backdrop-blur-sm`}
            >
              {/* تأثير إضاءة خفيف يظهر عند الهوفر (Enterprise Touch) */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* الأيقونة */}
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-5 transition-transform duration-300 group-hover:scale-110 ${tool.iconBg} ${tool.iconColor}`}>
                <FontAwesomeIcon icon={tool.icon} />
              </div>

              {/* المحتوى */}
              <h3 className="text-xl font-bold text-white mb-3">
                {tool.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed flex-grow">
                {tool.desc}
              </p>

              {/* رابط/سهم في أسفل الكارت */}
              <div className={`mt-6 flex items-center gap-2 text-sm font-bold transition-colors ${tool.highlight ? 'text-amber-400' : 'text-blue-400 opacity-0 group-hover:opacity-100'}`}>
                <span>{t('hero.startNow')}</span>
                <FontAwesomeIcon icon={faArrowLeft} className="text-xs transform group-hover:-translate-x-1 transition-transform rtl:rotate-180" />
              </div>

              {/* شريط تمييز جانبي لكارت النيابة */}
              {tool.highlight && (
                <div className="absolute top-0 start-0 w-1 h-full bg-gradient-to-b from-amber-400 to-amber-600 rounded-s-2xl"></div>
              )}
            </motion.a>
          ))}
        </motion.div>

      </div>
    </section>
  );
}