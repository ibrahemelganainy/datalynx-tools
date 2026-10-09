'use client';

import React from 'react';
import Link from 'next/link';

import Navbar from './Navbar';
import Footer from './Footer';
import { useLocale } from './LocaleProvider';

import {
  toc,
  formats,
  chooseGuide,
  faq,
  iconSizes,
  paragraphs as p,
} from '../lib/i18n/content/articleFormatsEn';

/*
 * English translation of the published guide
 * "JPG or PNG or WebP or AVIF?".
 */

function SectionTitle({ children }) {
  return (
    <h2 className="text-2xl md:text-3xl font-black text-white leading-tight mb-6">
      {children}
    </h2>
  );
}

export default function ImageFormatComparisonContent() {
  const { t } = useLocale();

  return (
    <div
      className="min-h-screen bg-[#020617] text-slate-100 font-sans"
      dir="ltr"
    >
      <Navbar />

      <main className="pt-32 pb-20">

        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-violet-500/5 blur-[160px]" />
          <div className="absolute bottom-0 right-0 w-[450px] h-[450px] rounded-full bg-datalynx-primary/5 blur-[160px]" />
        </div>

        <article className="relative z-10">

          {/* Hero */}
          <section className="max-w-5xl mx-auto px-5 sm:px-6">

            <div className="text-center">

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/20 bg-violet-500/5 text-violet-400 text-sm font-bold mb-7">
                {t('articlePage.breadcrumbFormats')}
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.25] mb-7">
                JPG or PNG or WebP
                <br className="hidden sm:block" />
                or AVIF?
              </h1>

              <p className="text-base md:text-lg text-white leading-8 max-w-3xl mx-auto">
                The difference between the most common image formats,
                when to use each one, and how to choose the right type
                based on quality, size, transparency and use.
              </p>

              <div className="mt-7 flex flex-wrap justify-center gap-3 text-sm text-white">
                <span className="px-4 py-2 rounded-full bg-slate-900 border border-slate-800">
                  {t('articlePage.breadcrumbPractical')}
                </span>

                <span className="px-4 py-2 rounded-full bg-slate-900 border border-slate-800">
                  {t('articlePage.authorLabel')}
                </span>

                <span className="px-4 py-2 rounded-full bg-slate-900 border border-slate-800">
                  {t('articlePage.updatedShort')}
                </span>
              </div>

            </div>

            <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800">
              <p className="text-base md:text-lg text-white leading-9">
                {p.intro}
              </p>
            </div>

          </section>

          {/* Content */}
          <section className="max-w-7xl mx-auto px-5 sm:px-6 mt-10">

            <div className="grid grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)] gap-8 items-start">

              <aside className="lg:sticky lg:top-28 order-2 lg:order-1">

                <div className="p-5 rounded-3xl bg-slate-900/70 border border-slate-800">

                  <h3 className="text-lg font-black text-white mb-5">
                    {t('articlePage.tocTitle')}
                  </h3>

                  <nav>
                    <ul className="space-y-2">
                      {toc.map((item) => (
                        <li key={item.id}>
                          <a
                            href={`#${item.id}`}
                            className="block px-3 py-2 rounded-xl text-sm text-white hover:bg-slate-800 transition-colors cursor-pointer"
                          >
                            {item.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>

                  <div className="mt-6 pt-5 border-t border-slate-800">
                    <Link
                      href="/#format-converter"
                      className="block w-full text-center px-4 py-3 rounded-xl bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition-all cursor-pointer"
                    >
                      {p.convertNow}
                    </Link>
                  </div>

                </div>

              </aside>

              <div className="order-1 lg:order-2 space-y-7 min-w-0">

                {/* Intro */}
                <section
                  id="intro"
                  className="scroll-mt-28 p-6 sm:p-8 md:p-10 rounded-3xl bg-slate-900/60 border border-slate-800"
                >
                  <SectionTitle>Why are there so many image formats?</SectionTitle>

                  <div className="space-y-5 text-base text-white leading-9">
                    <p>{p.why1}</p>
                    <p>{p.why2}</p>
                  </div>
                </section>

                {/* JPG */}
                <section
                  id="jpg"
                  className="scroll-mt-28 p-6 sm:p-8 md:p-10 rounded-3xl bg-slate-900/60 border border-slate-800"
                >
                  <SectionTitle>When should you use JPG?</SectionTitle>

                  <div className="space-y-5 text-base text-white leading-9">
                    <p>{p.jpg1}</p>
                    <p>{p.jpg2}</p>
                    <p>{p.jpg3}</p>
                  </div>
                </section>

                {/* PNG */}
                <section
                  id="png"
                  className="scroll-mt-28 p-6 sm:p-8 md:p-10 rounded-3xl bg-slate-900/60 border border-slate-800"
                >
                  <SectionTitle>When should you use PNG?</SectionTitle>

                  <div className="space-y-5 text-base text-white leading-9">
                    <p>{p.png1}</p>
                    <p>{p.png2}</p>
                    <p>{p.png3}</p>
                  </div>
                </section>

                {/* WebP */}
                <section
                  id="webp"
                  className="scroll-mt-28 p-6 sm:p-8 md:p-10 rounded-3xl bg-slate-900/60 border border-slate-800"
                >
                  <SectionTitle>When should you use WebP?</SectionTitle>

                  <div className="space-y-5 text-base text-white leading-9">
                    <p>{p.webp1}</p>
                    <p>{p.webp2}</p>
                    <p>{p.webp3}</p>
                  </div>
                </section>

                {/* AVIF */}
                <section
                  id="avif"
                  className="scroll-mt-28 p-6 sm:p-8 md:p-10 rounded-3xl bg-slate-900/60 border border-slate-800"
                >
                  <SectionTitle>When should you use AVIF?</SectionTitle>

                  <div className="space-y-5 text-base text-white leading-9">
                    <p>{p.avif1}</p>
                    <p>{p.avif2}</p>
                  </div>

                  <div className="mt-7 p-5 rounded-2xl bg-amber-500/5 border border-amber-500/15">
                    <p className="text-sm text-white leading-8">
                      <strong className="text-amber-400">
                        A practical rule:
                      </strong>{' '}
                      {p.avifTip}
                    </p>
                  </div>
                </section>

                {/* GIF */}
                <section
                  id="gif"
                  className="scroll-mt-28 p-6 sm:p-8 md:p-10 rounded-3xl bg-slate-900/60 border border-slate-800"
                >
                  <SectionTitle>When should you use GIF?</SectionTitle>

                  <div className="space-y-5 text-base text-white leading-9">
                    <p>{p.gif1}</p>
                    <p>{p.gif2}</p>
                  </div>
                </section>

                {/* TIFF */}
                <section
                  id="tiff"
                  className="scroll-mt-28 p-6 sm:p-8 md:p-10 rounded-3xl bg-slate-900/60 border border-slate-800"
                >
                  <SectionTitle>When should you use TIFF?</SectionTitle>

                  <div className="space-y-5 text-base text-white leading-9">
                    <p>{p.tiff1}</p>
                    <p>{p.tiff2}</p>
                  </div>
                </section>

                {/* ICO */}
                <section
                  id="ico"
                  className="scroll-mt-28 p-6 sm:p-8 md:p-10 rounded-3xl bg-gradient-to-br from-violet-500/10 to-slate-900/70 border border-violet-500/20"
                >
                  <SectionTitle>What is ICO for?</SectionTitle>

                  <div className="space-y-5 text-base text-white leading-9">
                    <p>{p.ico1}</p>
                    <p>{p.ico2}</p>
                    <p>{p.ico3}</p>
                  </div>

                  <div className="mt-7 flex flex-wrap gap-3">
                    {iconSizes.map((size) => (
                      <span
                        key={size}
                        className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-violet-400 text-sm font-bold"
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </section>

                {/* Comparison */}
                <section
                  id="comparison"
                  className="scroll-mt-28 p-6 sm:p-8 md:p-10 rounded-3xl bg-slate-900/60 border border-slate-800"
                >
                  <SectionTitle>A quick comparison between formats</SectionTitle>

                  <div className="space-y-4">
                    {formats.map((format) => (
                      <div
                        key={format.name}
                        className={`p-5 rounded-2xl border ${format.className}`}
                      >
                        <h3 className="text-lg font-black text-white mb-4">
                          {format.name}
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                          <div>
                            <span className="block text-xs text-white mb-1">
                              Best for
                            </span>

                            <p className="text-sm text-white leading-7">
                              {format.best}
                            </p>
                          </div>

                          <div>
                            <span className="block text-xs text-white mb-1">
                              Main strength
                            </span>

                            <p className="text-sm text-white leading-7">
                              {format.strength}
                            </p>
                          </div>

                          <div>
                            <span className="block text-xs text-white mb-1">
                              Worth noting
                            </span>

                            <p className="text-sm text-white leading-7">
                              {format.weakness}
                            </p>
                          </div>

                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Choose */}
                <section
                  id="choose"
                  className="scroll-mt-28 p-6 sm:p-8 md:p-10 rounded-3xl bg-slate-900/60 border border-slate-800"
                >
                  <SectionTitle>How do you choose the right format?</SectionTitle>

                  <div className="space-y-4">
                    {chooseGuide.map((item) => (
                      <div
                        key={item.title}
                        className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800"
                      >
                        <h3 className="text-white font-black mb-2">
                          {item.title}
                        </h3>

                        <p className="text-sm text-white leading-8">
                          {item.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Tool CTA */}
                <section className="p-6 sm:p-8 md:p-10 rounded-3xl bg-gradient-to-br from-emerald-500/10 via-slate-900/70 to-blue-500/5 border border-emerald-500/20">

                  <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
                    {p.ctaTitle}
                  </h2>

                  <p className="text-base text-white leading-8 max-w-2xl">
                    {p.ctaText}
                  </p>

                  <div className="mt-7">
                    <Link
                      href="/#format-converter"
                      className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl bg-emerald-500 text-slate-950 font-black hover:bg-emerald-400 transition-all cursor-pointer"
                    >
                      {p.ctaButton}
                    </Link>
                  </div>

                </section>

                {/* FAQ */}
                <section
                  id="faq"
                  className="scroll-mt-28 p-6 sm:p-8 md:p-10 rounded-3xl bg-slate-900/60 border border-slate-800"
                >
                  <SectionTitle>Frequently asked questions</SectionTitle>

                  <div className="space-y-4">
                    {faq.map((item) => (
                      <details
                        key={item.question}
                        className="group rounded-2xl bg-slate-950/70 border border-slate-800 overflow-hidden"
                      >
                        <summary className="flex items-center justify-between gap-4 p-5 text-white font-bold cursor-pointer list-none">
                          <span>{item.question}</span>

                          <span className="w-8 h-8 shrink-0 rounded-lg bg-slate-800 flex items-center justify-center text-white text-xl transition-transform group-open:rotate-45">
                            +
                          </span>
                        </summary>

                        <div className="px-5 pb-5">
                          <p className="text-sm md:text-base text-white leading-8">
                            {item.answer}
                          </p>
                        </div>
                      </details>
                    ))}
                  </div>
                </section>

              </div>
            </div>
          </section>

        </article>
      </main>

      <Footer />
    </div>
  );
}
