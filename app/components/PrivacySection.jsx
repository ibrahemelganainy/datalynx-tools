'use client';

import React, { useRef } from 'react';
import Link from 'next/link';

import { motion } from 'framer-motion';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faFileLines,
  faCompress,
  faImage,
} from '@fortawesome/free-solid-svg-icons';

import { useLocale } from './LocaleProvider';
import RichText from './RichText';

/*
 * بيانات المقالات: النصوص تأتي من قاموس اللغة، والروابط تبقى ثابتة
 * без بادئة اللغة حتى تعمل الصفحة الرئيسية في العربية وتحت /en معًا.
 */
const articleLinks = [
  {
    id: '01',
    slug: 'image-pdf-compression-tools',
    icon: <FontAwesomeIcon icon={faFileLines} />,
    colorClass:
      'text-datalynx-primary bg-datalynx-primary/10 border-datalynx-primary/20',
  },
  {
    id: '02',
    slug: 'compress-image-500kb',
    icon: <FontAwesomeIcon icon={faCompress} />,
    colorClass: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  },
  {
    id: '03',
    slug: 'jpg-vs-webp-vs-png-avif',
    icon: <FontAwesomeIcon icon={faImage} />,
    colorClass: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  },
];

function ClauseRow({ article, index, t, href, articleLabel, readMore }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="relative flex gap-6 md:gap-8 pb-14 last:pb-0"
    >
      {/* نقطة على الخط */}
      <div className="relative shrink-0 w-9 flex justify-center">
        <motion.span
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.35,
            delay: index * 0.05 + 0.15,
          }}
          className="mt-1 w-3 h-3 rounded-full bg-datalynx-primary ring-4 ring-datalynx-primary/20 z-10"
        />
      </div>

      <div className="flex-1">
        <Link href={href} className="group block cursor-pointer">
          <div className="flex items-center gap-3 mb-3">
            <span
              className={`w-10 h-10 rounded-xl border flex items-center justify-center text-base ${article.colorClass}`}
            >
              {article.icon}
            </span>

            <span className="font-mono text-xs font-bold text-slate-400 tracking-wider">
              {articleLabel} {article.id}
            </span>
          </div>

          <h3 className="text-xl font-bold text-white mb-2 transition-colors group-hover:text-datalynx-primary">
            {t(`knowledgeSection.articles.${article.slug}.title`)}
          </h3>

          <p className="text-slate-400 leading-relaxed text-sm md:text-base max-w-xl">
            {t(`knowledgeSection.articles.${article.slug}.description`)}
          </p>

          <div className="mt-4 text-sm font-bold text-datalynx-primary opacity-90 group-hover:opacity-100 transition-opacity">
            {readMore}
          </div>
        </Link>
      </div>
    </motion.div>
  );
}

export default function PrivacySection() {
  const { t, dir, lhref } = useLocale();

  const listRef = useRef(null);

  return (
    <section
      id="knowledge"
      dir={dir}
      className="relative min-h-screen py-24 bg-[#020617] text-start overflow-hidden flex items-center"
    >
      {/* نفس خلفية الهيرو تماماً */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        {/* شبكة برمجية خفيفة */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-25" />

        {/* إضاءة زرقاء */}
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-datalynx-primary/15 rounded-full blur-[120px] mix-blend-screen" />

        {/* إضاءة ذهبية/برتقالية */}
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] mix-blend-screen" />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10 w-full">
        {/* العناوين الرئيسية */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mb-16"
        >
          <div className="flex items-center gap-3 mb-6 font-mono text-xs tracking-[0.2em] text-datalynx-primary/90">
            <span>{t('knowledgeSection.kickerNumber')}</span>
            <span className="w-8 h-px bg-datalynx-primary/40" />
            <span>{t('knowledgeSection.kicker')}</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-5">
            {t('knowledgeSection.titleBefore')}{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-datalynx-primary to-blue-300">
              {t('knowledgeSection.titleHighlight')}
            </span>
          </h2>

          <p className="text-slate-400 text-base md:text-lg leading-relaxed">
            <RichText text={t('knowledgeSection.description')} strongClassName="font-bold text-white" />
          </p>
        </motion.div>

        {/* قائمة المقالات */}
        <div ref={listRef} className="relative">
          {/* الخط الأساسي الداكن */}
          <div
            className="absolute top-2 bottom-2 start-[17px] w-px bg-slate-800"
            aria-hidden="true"
          />

          {/* خط المعرفة الأزرق — يمتلئ مع تقدّم القسم عبر الشاشة */}
          <div
            className="dl-knowledge-line absolute top-2 bottom-2 start-[17px] w-px bg-datalynx-primary"
            aria-hidden="true"
          />

          <div className="pt-1">
            {articleLinks.map((article, i) => (
              <ClauseRow
                key={article.id}
                article={article}
                index={i}
                t={t}
                href={lhref(`articles/${article.slug}`)}
                articleLabel={t('knowledgeSection.articleLabel')}
                readMore={t('knowledgeSection.readMore')}
              />
            ))}
          </div>
        </div>

        {/* صندوق الالتزام الختامي */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 bg-slate-900/60 backdrop-blur-md border border-white/10 text-white rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl"
        >
          <div className="space-y-2 text-center md:text-start">
            <h4 className="text-xl font-bold text-white">
              {t('knowledgeSection.ctaTitle')}
            </h4>

            <p className="text-slate-400 text-sm md:text-base">
              {t('knowledgeSection.ctaDescription')}
            </p>
          </div>

          <Link
            href={lhref('articles')}
            className="px-8 py-3.5 bg-datalynx-primary hover:bg-blue-600 text-white font-bold rounded-2xl transition-all whitespace-nowrap text-sm md:text-base shrink-0 shadow-[0_0_20px_rgba(59,130,246,0.3)] cursor-pointer"
          >
            {t('knowledgeSection.ctaButton')}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}