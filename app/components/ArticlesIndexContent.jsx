'use client';

import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileLines, faCompress, faImage } from '@fortawesome/free-solid-svg-icons';

import Navbar from './Navbar';
import Footer from './Footer';

import { useLocale } from './LocaleProvider';

/*
 * مركز المعرفة (واجهة).
 *
 * كل النصوص تُقرأ من قاموس اللغة النشطة بدل أن تكون مكتوبة داخل
 * المكوّن، بحيث تبقى النسخة العربية مطابقة تمامًا لما كان معروضًا.
 */
const categoryLinks = [
  {
    key: 'imageCompression',
    to: 'tools/image-compression',
    icon: '01',
    className: 'border-blue-500/20 bg-blue-500/5 hover:border-blue-500/40',
    iconClass: 'bg-blue-500/10 text-blue-400',
  },
  {
    key: 'formatConverter',
    to: 'tools/format-converter',
    icon: '02',
    className: 'border-emerald-500/20 bg-emerald-500/5 hover:border-emerald-500/40',
    iconClass: 'bg-emerald-500/10 text-emerald-400',
  },
  {
    key: 'pdf',
    to: 'tools/pdf-compression',
    icon: '03',
    className: 'border-rose-500/20 bg-rose-500/5 hover:border-rose-500/40',
    iconClass: 'bg-rose-500/10 text-rose-400',
  },
  {
    key: 'ico',
    to: 'tools/format-converter',
    icon: '04',
    className: 'border-violet-500/20 bg-violet-500/5 hover:border-violet-500/40',
    iconClass: 'bg-violet-500/10 text-violet-400',
  },
];

/* المقالات المنشورة حاليًا — الروابط بدون بادئة اللغة. */
const publishedArticles = [
  {
    number: '01',
    slug: 'compress-image-500kb',
  },
  {
    number: '02',
    slug: 'jpg-vs-webp-vs-png-avif',
  },
];

const articleIcons = {
  'compress-image-500kb': <FontAwesomeIcon icon={faFileLines} />,
  'jpg-vs-webp-vs-png-avif': <FontAwesomeIcon icon={faCompress} />,
};

export default function ArticlesIndexContent() {
  const { t, lhref, dir } = useLocale();

  return (
    <div
      className="min-h-screen bg-[#020617] text-slate-100 font-sans"
      dir={dir}
    >
      <Navbar />

      <main className="pt-32 pb-20">

        {/* =========================================
            Hero
        ========================================== */}

        <section className="relative overflow-hidden">

          <div className="absolute inset-0 pointer-events-none">

            <div className="absolute top-0 right-1/4 w-[550px] h-[550px] rounded-full bg-datalynx-primary/10 blur-[160px]" />

            <div className="absolute bottom-0 left-1/4 w-[450px] h-[450px] rounded-full bg-blue-500/5 blur-[160px]" />

            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10" />

          </div>

          <div className="max-w-7xl mx-auto px-5 sm:px-6 relative z-10">

            <div className="max-w-4xl mx-auto text-center">

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-datalynx-primary/20 bg-datalynx-primary/5 text-datalynx-primary text-sm font-bold mb-7">

                <span className="w-2 h-2 rounded-full bg-datalynx-primary" />

                {t('articlesIndex.badge')}

              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">

                {t('articlesIndex.titleLine1')}

                <br className="hidden sm:block" />

                {t('articlesIndex.titleLine2')}

              </h1>

              <p className="text-base md:text-lg text-white leading-8 max-w-3xl mx-auto">

                {t('articlesIndex.description')}

              </p>

            </div>

          </div>

        </section>

        {/* =========================================
            Featured Article
        ========================================== */}

        <section className="max-w-7xl mx-auto px-5 sm:px-6 mt-16">

          <div className="flex items-center justify-between gap-4 mb-7">

            <div>

              <span className="text-sm font-bold text-datalynx-primary">

                {t('articlesIndex.featuredLabel')}

              </span>

              <h2 className="text-2xl md:text-3xl font-black text-white mt-2">

                {t('articlesIndex.featuredTitle')}

              </h2>

            </div>

            <span className="hidden sm:inline-flex px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-sm text-white">

              {t('articlesIndex.featuredBadge')}

            </span>

          </div>

          <Link
            href={lhref('articles/image-pdf-compression-tools')}
            className="group block relative overflow-hidden rounded-[2rem] border border-datalynx-primary/20 bg-gradient-to-br from-datalynx-primary/10 via-slate-900/80 to-blue-500/5 hover:border-datalynx-primary/40 transition-all duration-500 cursor-pointer"
          >

            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative p-6 sm:p-8 md:p-10">

              <div className="flex flex-col lg:flex-row lg:items-center gap-8">

                {/* Visual */}

                <div className="shrink-0">

                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-slate-950 border border-slate-800 flex items-center justify-center shadow-2xl group-hover:scale-105 transition-transform duration-500">

                    <div className="text-center">

                      <div className="text-2xl font-black text-datalynx-primary">

                        DL

                      </div>

                      <div className="text-[10px] text-white mt-1">

                        TOOLS

                      </div>

                    </div>

                  </div>

                </div>

                {/* Text */}

                <div className="flex-1">

                  <div className="flex flex-wrap items-center gap-2 mb-4">

                    <span className="px-3 py-1 rounded-full bg-datalynx-primary/10 border border-datalynx-primary/20 text-datalynx-primary text-xs font-bold">

                      {t('articlesIndex.featuredBadge')}

                    </span>

                    <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-white text-xs">

                      {t('articlesIndex.featuredDate')}

                    </span>

                  </div>

                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight mb-4 group-hover:text-datalynx-primary transition-colors">

                    {t('articlesIndex.featuredCardTitle')}

                  </h3>

                  <p className="text-base text-white leading-8 max-w-3xl">

                    {t('articlesIndex.featuredCardDescription')}

                  </p>

                  <div className="mt-7 inline-flex items-center gap-3 text-sm font-black text-datalynx-primary">

                    <span>{t('articlesIndex.readArticle')}</span>

                    <span className="w-9 h-9 rounded-full border border-datalynx-primary/30 flex items-center justify-center group-hover:-translate-x-1 transition-transform">

                      ←

                    </span>

                  </div>

                </div>

              </div>

            </div>

          </Link>

        </section>

        {/* =========================================
            Categories
        ========================================== */}

        <section className="max-w-7xl mx-auto px-5 sm:px-6 mt-16">

          <div className="mb-7">

            <span className="text-sm font-bold text-datalynx-primary">

              {t('articlesIndex.categoriesLabel')}

            </span>

            <h2 className="text-2xl md:text-3xl font-black text-white mt-2">

              {t('articlesIndex.categoriesTitle')}

            </h2>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

            {categoryLinks.map((category) => (

              <Link
                key={category.key}
                href={lhref(category.to)}
                className={`group p-5 rounded-3xl border transition-all duration-300 hover:-translate-y-1 cursor-pointer ${category.className}`}
              >

                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 font-black ${category.iconClass}`}
                >

                  {category.icon}

                </div>

                <h3 className="text-lg font-black text-white mb-2">

                  {t(`articlesIndex.categories.${category.key}.title`)}

                </h3>

                <p className="text-sm text-white leading-7">

                  {t(`articlesIndex.categories.${category.key}.description`)}

                </p>

                <div className="mt-5 text-sm font-bold text-white group-hover:text-datalynx-primary transition-colors">

                  {t('articlesIndex.categoryExplore')}

                </div>

              </Link>

            ))}

          </div>

        </section>

        {/* =========================================
            Articles
        ========================================== */}

        <section className="max-w-7xl mx-auto px-5 sm:px-6 mt-16">

          <div className="mb-7">

            <span className="text-sm font-bold text-datalynx-primary">

              {t('articlesIndex.libraryLabel')}

            </span>

            <h2 className="text-2xl md:text-3xl font-black text-white mt-2">

              {t('articlesIndex.libraryTitle')}

            </h2>

            <p className="text-sm md:text-base text-white leading-7 mt-3 max-w-3xl">

              {t('articlesIndex.libraryDescription')}

            </p>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {publishedArticles.map((article) => (

              <Link
                key={article.number}
                href={lhref(`articles/${article.slug}`)}
                className="group block p-6 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-datalynx-primary/30 hover:bg-slate-900/80 transition-all duration-300 cursor-pointer"
              >

                <div className="flex items-start gap-4">

                  <div className="w-12 h-12 shrink-0 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-datalynx-primary font-black">

                    {article.number}

                  </div>

                  <div className="flex-1">

                    <span className="inline-flex px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs text-white mb-3">

                      {t(`articlesIndex.articles.${article.slug}.tag`)}

                    </span>

                    <h3 className="text-lg md:text-xl font-black text-white mb-2 group-hover:text-datalynx-primary transition-colors">

                      {t(`articlesIndex.articles.${article.slug}.title`)}

                    </h3>

                    <p className="text-sm text-white leading-7">

                      {t(`articlesIndex.articles.${article.slug}.description`)}

                    </p>

                    <div className="mt-5 text-sm font-bold text-datalynx-primary">

                      {t('knowledgeSection.readMore')}

                    </div>

                  </div>

                </div>

              </Link>

            ))}

          </div>

        </section>

        {/* =========================================
            Why Knowledge Center
        ========================================== */}

        <section className="max-w-7xl mx-auto px-5 sm:px-6 mt-16">

          <div className="rounded-[2rem] border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-6 sm:p-8 md:p-10">

            <div className="max-w-3xl">

              <span className="text-sm font-bold text-datalynx-primary">

                {t('articlesIndex.whyLabel')}

              </span>

              <h2 className="text-2xl md:text-3xl font-black text-white mt-2 mb-5">

                {t('articlesIndex.whyTitle')}

              </h2>

              <div className="space-y-4 text-base text-white leading-8">

                <p>

                  {t('articlesIndex.whyParagraph1')}

                </p>

                <p>

                  {t('articlesIndex.whyParagraph2')}

                </p>

              </div>

              <div className="mt-7">

                <Link
                  href={lhref('tools/image-compression')}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-datalynx-primary text-white font-black hover:opacity-90 transition-all cursor-pointer"
                >

                  {t('articlesIndex.whyCta')}

                </Link>

              </div>

            </div>

          </div>

        </section>

      </main>

      <Footer />

    </div>

  );

}
