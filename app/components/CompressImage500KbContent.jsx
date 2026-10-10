'use client';

import React from 'react';
import Link from 'next/link';

import Navbar from './Navbar';
import Footer from './Footer';
import { useLocale } from './LocaleProvider';

import {
  toc,
  sizeFactors,
  fiveHundredKbSteps,
  faq,
  paragraphs as p,
} from '../lib/i18n/content/articleCompress500En';

/*
 * English translation of the published guide
 * "How do you reduce an image to less than 500KB?".
 */

function SectionTitle({ children }) {
  return (
    <h2 className="text-2xl md:text-3xl font-black text-white leading-tight mb-6">
      {children}
    </h2>
  );
}

export default function CompressImage500KbContent() {
  const { t, lhref, dir } = useLocale();

  return (
    <div
      className="min-h-screen text-slate-100 font-sans"
      dir={dir}
    >
      <Navbar />

      <main className="pt-32 pb-20">

        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-amber-500/5 blur-[160px]" />
          <div className="absolute bottom-0 left-0 w-[450px] h-[450px] rounded-full bg-blue-500/5 blur-[160px]" />
        </div>

        <article className="relative z-10">

          {/* Hero */}
          <section className="max-w-5xl mx-auto px-5 sm:px-6">

            <div className="text-center">

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-400 text-sm font-bold mb-7">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                {t('articlePage.breadcrumbPractical')}
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.25] mb-7">
                How do you reduce an image
                <br className="hidden sm:block" />
                to less than 500KB?
              </h1>

              <p className="text-base md:text-lg text-white leading-8 max-w-3xl mx-auto">
                A practical explanation of why images grow in size,
                and how to reduce the size using the right quality,
                dimensions and format without any unnecessary loss of
                clarity.
              </p>

              <div className="mt-7 flex flex-wrap justify-center gap-3 text-sm text-white">
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
                {p.intro1}
              </p>

              <p className="mt-5 text-base md:text-lg text-white leading-9">
                {p.intro2}
              </p>
            </div>

          </section>

          {/* Content */}
          <section className="max-w-7xl mx-auto px-5 sm:px-6 mt-10">

            <div className="grid grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)] gap-8 items-start">

              {/* TOC */}
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
                      href={lhref('tools/image-compression')}
                      className="block w-full text-center px-4 py-3 rounded-xl bg-blue-500 text-white font-bold hover:bg-blue-400 transition-all cursor-pointer"
                    >
                      {p.compressNow}
                    </Link>
                  </div>

                </div>

              </aside>

              <div className="order-1 lg:order-2 space-y-7 min-w-0">

                {/* Introduction */}
                <section
                  id="introduction"
                  className="scroll-mt-28 p-6 sm:p-8 md:p-10 rounded-3xl bg-slate-900/60 border border-slate-800"
                >
                  <SectionTitle>Why does an image become large?</SectionTitle>

                  <div className="space-y-5 text-base text-white leading-9">
                    <p>{p.why1}</p>
                    <p>{p.why2}</p>
                    <p>{p.why3}</p>
                  </div>
                </section>

                {/* Size Factors */}
                <section
                  id="size-factors"
                  className="scroll-mt-28 p-6 sm:p-8 md:p-10 rounded-3xl bg-slate-900/60 border border-slate-800"
                >
                  <SectionTitle>What determines image size?</SectionTitle>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {sizeFactors.map((item) => (
                      <div
                        key={item.title}
                        className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800"
                      >
                        <h3 className="text-white font-black mb-2">
                          {item.title}
                        </h3>

                        <p className="text-sm text-white leading-8">
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Compression */}
                <section
                  id="compression"
                  className="scroll-mt-28 p-6 sm:p-8 md:p-10 rounded-3xl bg-slate-900/60 border border-slate-800"
                >
                  <SectionTitle>What does image compression mean?</SectionTitle>

                  <div className="space-y-5 text-base text-white leading-9">
                    <p>{p.compression1}</p>
                    <p>{p.compression2}</p>
                    <p>{p.compression3}</p>
                  </div>
                </section>

                {/* Dimensions */}
                <section
                  id="dimensions"
                  className="scroll-mt-28 p-6 sm:p-8 md:p-10 rounded-3xl bg-slate-900/60 border border-slate-800"
                >
                  <SectionTitle>
                    The role of image dimensions in reducing size
                  </SectionTitle>

                  <div className="space-y-5 text-base text-white leading-9">
                    <p>{p.dimensions1}</p>
                    <p>{p.dimensions2}</p>
                    <p>{p.dimensions3}</p>
                  </div>

                  <div className="mt-7 p-5 rounded-2xl bg-blue-500/5 border border-blue-500/15">
                    <h3 className="text-white font-black mb-2">
                      {p.dimensionsTipTitle}
                    </h3>

                    <p className="text-sm text-white leading-8">
                      {p.dimensionsTipText}
                    </p>
                  </div>
                </section>

                {/* Format */}
                <section
                  id="format"
                  className="scroll-mt-28 p-6 sm:p-8 md:p-10 rounded-3xl bg-slate-900/60 border border-slate-800"
                >
                  <SectionTitle>Choosing the image format</SectionTitle>

                  <div className="space-y-5 text-base text-white leading-9">
                    <p>{p.format1}</p>
                    <p>{p.format2}</p>
                    <p>{p.format3}</p>
                  </div>
                </section>

                {/* 500 KB */}
                <section
                  id="500kb"
                  className="scroll-mt-28 p-6 sm:p-8 md:p-10 rounded-3xl bg-gradient-to-br from-amber-500/10 via-slate-900/70 to-slate-900/60 border border-amber-500/20"
                >
                  <SectionTitle>How do I get below 500KB?</SectionTitle>

                  <div className="space-y-5 text-base text-white leading-9">
                    <p>{p.kb1}</p>
                    <p>{p.kb2}</p>
                  </div>

                  <div className="mt-8 space-y-3">
                    {fiveHundredKbSteps.map((step, index) => (
                      <div
                        key={step}
                        className="flex items-start gap-4 p-4 rounded-2xl bg-slate-950/60 border border-slate-800"
                      >
                        <div className="w-8 h-8 shrink-0 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center font-black text-sm">
                          {index + 1}
                        </div>

                        <p className="text-sm md:text-base text-white leading-7">
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Prosecution */}
                <section
                  id="prosecution"
                  className="scroll-mt-28 p-6 sm:p-8 md:p-10 rounded-3xl bg-slate-900/60 border border-slate-800"
                >
                  <SectionTitle>Preparing images for strict limits</SectionTitle>

                  <div className="space-y-5 text-base text-white leading-9">
                    <p>{p.prosecution1}</p>
                    <p>{p.prosecution2}</p>
                    <p>{p.prosecution3}</p>
                  </div>

                  <div className="mt-8">
                    <Link
                      href={lhref('tools/prosecution-portal')}
                      className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl bg-amber-500 text-slate-950 font-black hover:bg-amber-400 transition-all cursor-pointer"
                    >
                      {p.toolCta}
                    </Link>
                  </div>

                  <div className="mt-6 p-4 rounded-2xl bg-slate-950 border border-slate-800">
                    <p className="text-sm text-white leading-8">
                      <strong className="text-amber-400">Note:</strong>{' '}
                      {p.prosecutionNote}
                    </p>
                  </div>
                </section>

                {/* Quality */}
                <section
                  id="quality"
                  className="scroll-mt-28 p-6 sm:p-8 md:p-10 rounded-3xl bg-slate-900/60 border border-slate-800"
                >
                  <SectionTitle>How do I keep the document clear?</SectionTitle>

                  <div className="space-y-5 text-base text-white leading-9">
                    <p>{p.quality1}</p>
                    <p>{p.quality2}</p>
                    <p>{p.quality3}</p>
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

                {/* CTA */}
                <section className="p-6 sm:p-8 md:p-10 rounded-3xl bg-gradient-to-br from-datalynx-primary/10 to-blue-500/5 border border-datalynx-primary/20">

                  <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
                    {p.ctaTitle}
                  </h2>

                  <p className="text-base text-white leading-8 max-w-2xl">
                    {p.ctaText}
                  </p>

                  <div className="mt-7 flex flex-col sm:flex-row gap-3">
                    <Link
                      href={lhref('tools/image-compression')}
                      className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl bg-datalynx-primary text-white font-black hover:opacity-90 transition-all cursor-pointer"
                    >
                      {p.ctaPrimary}
                    </Link>

                    <Link
                      href={lhref('articles/image-pdf-compression-tools')}
                      className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold hover:bg-slate-700 transition-all cursor-pointer"
                    >
                      {p.ctaSecondary}
                    </Link>
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
