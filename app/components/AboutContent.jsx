'use client';

import React from 'react';
import Link from 'next/link';

import Navbar from './Navbar';
import Footer from './Footer';

import { useLocale } from './LocaleProvider';

/*
 * محتوى صفحة "من نحن" في اللغتين.
 *
 * القسمان (About وContact) يقرآن نصوصهما من قاموس اللغة، فيبقى الملف
 * واحدًا ويخدم اللغتين بنفس التصميم تمامًا. اللغة تُمرَّر من layout
 * المجموعة عبر LocaleProvider كما هو معتاد في بقية الموقع.
 *
 * التصميم مأخوذ حرفيًا من نظام الموقع الحالي:
 *
 * - نفس خلفية #020617 والشبكة الخفيفة وإضاءة blur الملوّنة المستخدمة
 *   في صفحة الخصوصية وقسم Hero.
 * - نفس البطاقات rounded-3xl مع bg-slate-900/60 و backdrop-blur-xl
 *   وborder-slate-800.
 * - نفس شرائح الـbadge الحالية وفيها نقطة ملوّنة.
 *
 * لم يُضف أي خط أو لون أو ظل جديد، ولم تُستخدم أي أيقونة خارج حزمة
 * Font Awesome المستخدمة بالفعل في الموقع.
 */
export default function AboutContent({ lang = 'ar' }) {
  const { t, lhref } = useLocale();

  const isEnglish = lang === 'en';

  const items = t('about.items') || [];
  const values = t('about.values') || [];
  const paragraphs = t('about.privacyParagraphs') || [];

  return (
    <div
      className="min-h-screen bg-[#020617] text-slate-100 font-sans"
      lang={lang}
      dir={isEnglish ? 'ltr' : 'rtl'}
    >
      <Navbar />

      <main className="pt-32 pb-20">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-datalynx-primary/10 blur-[150px]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10" />
          </div>

          <div className="max-w-5xl mx-auto px-5 sm:px-6 relative z-10">
            {/* العنوان المقدمة */}
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-datalynx-primary/10 border border-datalynx-primary/20 text-datalynx-primary text-sm font-bold mb-6">
                <span className="w-2 h-2 rounded-full bg-datalynx-primary" />
                {t('about.badge')}
              </div>

              <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-5">
                {t('about.titleLine1')}{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-datalynx-primary">
                  {t('about.titleLine2')}
                </span>
              </h1>

              <p className="text-base md:text-lg text-white/90 max-w-3xl mx-auto leading-relaxed">
                {t('about.intro')}
              </p>
            </div>

            {/* ما الذي تقدمه المنصة */}
            <section className="mb-8 p-6 sm:p-8 rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-slate-800">
              <h2 className="text-xl md:text-2xl font-black text-white mb-4">
                {t('about.whatTitle')}
              </h2>

              <p className="text-sm md:text-base text-white/90 leading-8 mb-6">
                {t('about.whatIntro')}
              </p>

              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {items.map((item) => (
                  <li
                    key={item.title}
                    className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-datalynx-primary/40 transition-all"
                  >
                    <h3 className="font-bold text-white mb-2 flex items-start gap-2">
                      <span
                        aria-hidden="true"
                        className="mt-2 w-1.5 h-1.5 rounded-full bg-datalynx-primary shrink-0"
                      />
                      <span>{item.title}</span>
                    </h3>

                    <p className="text-sm text-white/80 leading-relaxed">
                      {item.desc}
                    </p>
                  </li>
                ))}
              </ul>
            </section>

            {/* لماذا هذه الأدوات */}
            <section className="mb-8 p-6 sm:p-8 rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-slate-800">
              <h2 className="text-xl md:text-2xl font-black text-white mb-4">
                {t('about.valueTitle')}
              </h2>

              <p className="text-sm md:text-base text-white/90 leading-8 mb-6">
                {t('about.valueIntro')}
              </p>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {values.map((value) => (
                  <li
                    key={value.title}
                    className="p-5 rounded-2xl bg-slate-900 border border-slate-800"
                  >
                    <h3 className="font-bold text-white mb-2">
                      {value.title}
                    </h3>

                    <p className="text-sm text-white/80 leading-relaxed">
                      {value.desc}
                    </p>
                  </li>
                ))}
              </ul>
            </section>

            {/* كيف تتم معالجة الملفات */}
            <section className="mb-8 p-6 sm:p-8 rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-slate-800">
              <h2 className="text-xl md:text-2xl font-black text-white mb-4">
                {t('about.privacyTitle')}
              </h2>

              <div className="space-y-4 text-sm md:text-base text-white/90 leading-8">
                {paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <Link
                href={lhref('privacy')}
                className="inline-flex items-center mt-6 px-5 py-3 rounded-xl bg-datalynx-primary/10 border border-datalynx-primary/20 text-datalynx-primary font-bold hover:bg-datalynx-primary/20 transition-all cursor-pointer"
              >
                {t('privacy.title')}
              </Link>
            </section>

            {/* دعوة لاتخاذ إجراء */}
            <section className="p-6 sm:p-8 rounded-3xl bg-slate-900/70 backdrop-blur-xl border border-slate-800 text-center">
              <h2 className="text-xl md:text-2xl font-black text-white mb-4">
                {t('about.ctaTitle')}
              </h2>

              <p className="text-sm md:text-base text-white/90 leading-8 mb-8 max-w-2xl mx-auto">
                {t('about.ctaDescription')}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href={lhref('')}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl bg-datalynx-primary hover:bg-blue-600 text-white font-bold transition-all shadow-md cursor-pointer"
                >
                  {t('about.ctaPrimary')}
                </Link>

                <Link
                  href={lhref('articles')}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold hover:bg-slate-700 transition-all cursor-pointer"
                >
                  {t('about.ctaSecondary')}
                </Link>

                <Link
                  href={lhref('contact')}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold hover:bg-slate-700 transition-all cursor-pointer"
                >
                  {t('about.ctaContact')}
                </Link>
              </div>
            </section>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
