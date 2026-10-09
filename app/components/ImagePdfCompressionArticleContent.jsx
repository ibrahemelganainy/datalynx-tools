'use client';

import React from 'react';
import Link from 'next/link';

import Navbar from './Navbar';
import Footer from './Footer';
import { useLocale } from './LocaleProvider';

import {
  tocItems,
  relatedTools,
  imageFormats,
  iconSizes,
  toolChooser,
  faqItems,
  sectionParagraphs as p,
} from '../lib/i18n/content/articleImagePdfEn';

/*
 * English translation of the comprehensive Data Lynx Tools guide.
 *
 * The Arabic version stays in app/(ar)/articles/image-pdf-compression-tools
 * with byte-identical text. This component renders the English content
 * with the same layout, spacing and visual language.
 */

function SectionTitle({ children }) {
  return (
    <h2 className="text-2xl md:text-3xl font-black text-white leading-tight mb-6">
      {children}
    </h2>
  );
}

function InlineCode({ children }) {
  return (
    <code
      dir="ltr"
      className="px-2 py-1 rounded-lg bg-slate-800 border border-slate-700 text-datalynx-primary text-sm"
    >
      {children}
    </code>
  );
}

const modeTones = {
  emerald: 'bg-emerald-500/5 border-emerald-500/15',
  amber: 'bg-amber-500/5 border-amber-500/15',
  blue: 'bg-blue-500/5 border-blue-500/15',
};

export default function ImagePdfCompressionArticleContent() {
  const { t } = useLocale();

  return (
    <div
      className="min-h-screen bg-[#020617] text-slate-100 font-sans"
      dir="ltr"
    >
      <Navbar />

      <main className="pt-32 pb-20">

        {/* Background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-datalynx-primary/5 blur-[160px]" />
          <div className="absolute top-[700px] left-0 w-[450px] h-[450px] rounded-full bg-blue-500/5 blur-[160px]" />
        </div>

        <article className="relative z-10">

          {/* =========================================
              Article Hero
          ========================================== */}
          <section className="max-w-5xl mx-auto px-5 sm:px-6">

            <div className="text-center">

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-datalynx-primary/20 bg-datalynx-primary/5 text-datalynx-primary text-sm font-bold mb-7">
                <span className="w-2 h-2 rounded-full bg-datalynx-primary" />
                {t('articlePage.breadcrumbGuides')}
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.25] mb-7">
                Compress images and convert formats,
                <br className="hidden sm:block" />
                and compress PDF files online
              </h1>

              <p className="text-base md:text-lg text-white leading-8 max-w-3xl mx-auto">
                A practical guide to handling images and PDF files,
                from reducing size and changing dimensions and
                formats, to creating ICO icons and preparing files
                for strict size limits such as 500KB.
              </p>

              <div className="mt-7 flex flex-wrap items-center justify-center gap-3 text-sm text-white">
                <span className="px-4 py-2 rounded-full bg-slate-900 border border-slate-800">
                  {t('articlePage.updatedLabel')}
                </span>

                <span className="px-4 py-2 rounded-full bg-slate-900 border border-slate-800">
                  {t('articlePage.authorLabel')}
                </span>
              </div>

            </div>

            {/* Article introduction card */}
            <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-slate-900/70 backdrop-blur-xl border border-slate-800 shadow-2xl">

              <p className="text-base md:text-lg text-white leading-9">
                {p.intro1}
              </p>

              <p className="mt-5 text-base md:text-lg text-white leading-9">
                {p.intro2}
              </p>

            </div>

          </section>

          {/* =========================================
              Content + TOC
          ========================================== */}
          <section className="max-w-7xl mx-auto px-5 sm:px-6 mt-10">

            <div className="grid grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)] gap-8 items-start">

              {/* Table of Contents */}
              <aside className="lg:sticky lg:top-28 order-2 lg:order-1">

                <div className="p-5 rounded-3xl bg-slate-900/70 backdrop-blur-xl border border-slate-800">

                  <h3 className="text-lg font-black text-white mb-5">
                    {t('articlePage.tocTitle')}
                  </h3>

                  <nav>
                    <ul className="space-y-2">
                      {tocItems.map((item) => (
                        <li key={item.id}>
                          <a
                            href={`#${item.id}`}
                            className="block px-3 py-2 rounded-xl text-sm text-white hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                          >
                            {item.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>

                  <div className="mt-6 pt-5 border-t border-slate-800">
                    <Link
                      href="/"
                      className="block w-full text-center px-4 py-3 rounded-xl bg-datalynx-primary text-white font-bold hover:opacity-90 transition-all cursor-pointer"
                    >
                      {t('articlePage.tryTools')}
                    </Link>
                  </div>

                </div>

              </aside>

              {/* Article Body */}
              <div className="order-1 lg:order-2 space-y-7 min-w-0">

                {/* What is Data Lynx */}
                <section
                  id="what-is-datalynx-tools"
                  className="scroll-mt-28 p-6 sm:p-8 md:p-10 rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-slate-800"
                >
                  <SectionTitle>What is Data Lynx Tools?</SectionTitle>

                  <div className="space-y-5 text-base text-white leading-9">
                    <p>{p.whatIs1}</p>
                    <p>{p.whatIs2}</p>
                    <p>
                      The design is based on a simple idea:{' '}
                      <strong className="text-white">
                        choose the file, choose the operation, then
                        get the result.
                      </strong>
                    </p>
                  </div>

                  <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      'Image compression',
                      'Image format conversion',
                      'PDF compression',
                      'Preparing files for under 500KB',
                    ].map((item) => (
                      <div
                        key={item}
                        className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-white font-bold"
                      >
                        <span className="text-datalynx-primary mr-2">
                          ✓
                        </span>
                        {item}
                      </div>
                    ))}
                  </div>
                </section>

                {/* Image Compression */}
                <section
                  id="image-compression"
                  className="scroll-mt-28 p-6 sm:p-8 md:p-10 rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-slate-800"
                >
                  <SectionTitle>Compressing images online</SectionTitle>

                  <div className="space-y-5 text-base text-white leading-9">
                    <p>{p.compression1}</p>
                    <p>{p.compression2}</p>
                    <p>{p.compression3}</p>
                  </div>

                  <div className="mt-8 overflow-hidden rounded-2xl border border-slate-800">
                    <div className="grid grid-cols-1 md:grid-cols-3 bg-slate-950/70">

                      <div className="p-5 border-b md:border-b-0 md:border-r border-slate-800">
                        <h3 className="text-white font-black mb-2">Quality</h3>
                        <p className="text-sm text-white leading-7">
                          Choose the right balance between image clarity
                          and file size.
                        </p>
                      </div>

                      <div className="p-5 border-b md:border-b-0 md:border-r border-slate-800">
                        <h3 className="text-white font-black mb-2">Dimensions</h3>
                        <p className="text-sm text-white leading-7">
                          You can set the maximum dimension while
                          preserving the aspect ratio.
                        </p>
                      </div>

                      <div className="p-5">
                        <h3 className="text-white font-black mb-2">Format</h3>
                        <p className="text-sm text-white leading-7">
                          Pick an output format that suits what the
                          image will be used for.
                        </p>
                      </div>

                    </div>
                  </div>

                  <div className="mt-8">
                    <Link
                      href="/#image-compression"
                      className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-blue-500 text-white font-black hover:bg-blue-400 transition-all cursor-pointer"
                    >
                      Try the image compression tool
                    </Link>
                  </div>
                </section>

                {/* Image Conversion */}
                <section
                  id="image-conversion"
                  className="scroll-mt-28 p-6 sm:p-8 md:p-10 rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-slate-800"
                >
                  <SectionTitle>Converting image formats</SectionTitle>

                  <div className="space-y-5 text-base text-white leading-9">
                    <p>{p.conversion1}</p>
                    <p>{p.conversion2}</p>
                    <p>{p.conversion3}</p>
                  </div>

                  <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {imageFormats.map((format) => (
                      <div
                        key={format}
                        className="px-4 py-3 rounded-xl bg-slate-950/70 border border-slate-800 text-center text-sm font-bold text-white"
                      >
                        {format}
                      </div>
                    ))}
                  </div>

                  <div className="mt-8">
                    <Link
                      href="/#format-converter"
                      className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-emerald-500 text-slate-950 font-black hover:bg-emerald-400 transition-all cursor-pointer"
                    >
                      Try the format converter
                    </Link>
                  </div>
                </section>

                {/* ICO */}
                <section
                  id="ico"
                  className="scroll-mt-28 p-6 sm:p-8 md:p-10 rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-slate-800"
                >
                  <SectionTitle>
                    Converting images to ICO and creating favicons
                  </SectionTitle>

                  <div className="space-y-5 text-base text-white leading-9">
                    <p>{p.ico1}</p>
                    <p>{p.ico2}</p>
                    <p>{p.ico3}</p>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    {iconSizes.map((size) => (
                      <span
                        key={size}
                        className="px-4 py-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold text-sm"
                      >
                        {size}
                      </span>
                    ))}
                  </div>

                  <div className="mt-7 p-5 rounded-2xl bg-blue-500/5 border border-blue-500/15">
                    <h3 className="text-white font-black mb-3">
                      What do you get?
                    </h3>

                    <p className="text-sm text-white leading-8">
                      When using the ICO path you can create separate
                      files for the selected sizes in addition to a{' '}
                      <InlineCode>favicon.ico</InlineCode> file, then
                      collect the files into a single ZIP package so
                      they are easy to download and use.
                    </p>
                  </div>
                </section>

                {/* PDF */}
                <section
                  id="pdf-compression"
                  className="scroll-mt-28 p-6 sm:p-8 md:p-10 rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-slate-800"
                >
                  <SectionTitle>Compressing PDF files</SectionTitle>

                  <div className="space-y-5 text-base text-white leading-9">
                    <p>{p.pdf1}</p>
                    <p>{p.pdf2}</p>
                    <p>{p.pdf3}</p>
                  </div>

                  <div className="mt-8 space-y-4">
                    {[
                      {
                        tone: 'emerald',
                        title: 'Preserve the text',
                        text:
                          'This mode tries to reduce the size without turning the document pages into images. It is suitable when selectable, searchable text is a priority.',
                      },
                      {
                        tone: 'amber',
                        title: 'Visual compression',
                        text:
                          'Pages are redrawn as compressed images and the PDF is rebuilt. This works very well for scanned documents, but it may make the text unselectable if the original file relied on page images.',
                      },
                      {
                        tone: 'blue',
                        title: 'Smart compression',
                        text:
                          'The system tries more than one processing route and then picks the smallest result according to the settings in use.',
                      },
                    ].map((mode) => (
                      <div
                        key={mode.title}
                        className={`p-5 rounded-2xl border ${modeTones[mode.tone]}`}
                      >
                        <h3 className="text-white font-black mb-2">
                          {mode.title}
                        </h3>

                        <p className="text-sm text-white leading-8">
                          {mode.text}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8">
                    <Link
                      href="/#pdf-compression"
                      className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-rose-500 text-white font-black hover:bg-rose-400 transition-all cursor-pointer"
                    >
                      Try the PDF compression tool
                    </Link>
                  </div>
                </section>

                {/* Prosecution */}
                <section
                  id="prosecution"
                  className="scroll-mt-28 p-6 sm:p-8 md:p-10 rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-slate-800"
                >
                  <SectionTitle>Preparing files for under 500KB</SectionTitle>

                  <div className="space-y-5 text-base text-white leading-9">
                    <p>{p.prosecution1}</p>
                    <p>{p.prosecution2}</p>
                    <p>{p.prosecution3}</p>
                  </div>

                  <div className="mt-8 p-6 rounded-3xl bg-amber-500/5 border border-amber-500/20">
                    <div className="flex flex-col sm:flex-row gap-5 items-center">

                      <div className="w-16 h-16 shrink-0 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center text-2xl font-black">
                        500
                      </div>

                      <div>
                        <h3 className="text-white text-lg font-black mb-2">
                          The goal is clear
                        </h3>

                        <p className="text-sm text-white leading-8">
                          The tool is designed to reach a size below
                          500KB while leaving an internal margin,
                          instead of compressing to the exact limit.
                        </p>
                      </div>

                    </div>
                  </div>

                  <div className="mt-6 p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
                    <p className="text-sm text-white leading-8">
                      <strong className="text-amber-400">Note:</strong>{' '}
                      {p.prosecutionNote}
                    </p>
                  </div>

                  <div className="mt-8">
                    <Link
                      href="/#prosecution-portal"
                      className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-amber-500 text-slate-950 font-black hover:bg-amber-400 transition-all cursor-pointer"
                    >
                      Try the file preparation tool
                    </Link>
                  </div>
                </section>

                {/* Privacy */}
                <section
                  id="privacy"
                  className="scroll-mt-28 p-6 sm:p-8 md:p-10 rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-slate-800"
                >
                  <SectionTitle>
                    Why processing happens inside the browser
                  </SectionTitle>

                  <div className="space-y-5 text-base text-white leading-9">
                    <p>{p.privacy1}</p>
                    <p>{p.privacy2}</p>
                  </div>

                  <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { number: '01', title: p.privacyStep1Title, text: p.privacyStep1Text },
                      { number: '02', title: p.privacyStep2Title, text: p.privacyStep2Text },
                      { number: '03', title: p.privacyStep3Title, text: p.privacyStep3Text },
                    ].map((step) => (
                      <div
                        key={step.number}
                        className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800"
                      >
                        <div className="text-datalynx-primary font-black text-xl mb-2">
                          {step.number}
                        </div>

                        <h3 className="text-white font-black mb-2">
                          {step.title}
                        </h3>

                        <p className="text-sm text-white leading-7">
                          {step.text}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-7">
                    <Link
                      href="/privacy"
                      className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold hover:bg-slate-700 transition-all cursor-pointer"
                    >
                      {t('articlePage.privacyCta')}
                    </Link>
                  </div>
                </section>

                {/* Choosing a tool */}
                <section
                  id="choose-tool"
                  className="scroll-mt-28 p-6 sm:p-8 md:p-10 rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-slate-800"
                >
                  <SectionTitle>How do you choose the right tool?</SectionTitle>

                  <div className="overflow-hidden rounded-2xl border border-slate-800">

                    <div className="hidden md:grid grid-cols-[1fr_2fr] bg-slate-950/80 border-b border-slate-800">
                      <div className="p-4 font-black text-white">
                        Your need
                      </div>

                      <div className="p-4 font-black text-white">
                        The right tool
                      </div>
                    </div>

                    {toolChooser.map((row, index) => (
                      <div
                        key={row.need}
                        className={`grid grid-cols-1 md:grid-cols-[1fr_2fr] ${
                          index !== toolChooser.length - 1
                            ? 'border-b border-slate-800'
                            : ''
                        }`}
                      >
                        <div className="p-4 text-sm md:text-base text-white">
                          {row.need}
                        </div>

                        <div className="p-4 text-sm md:text-base text-datalynx-primary font-bold">
                          {row.tool}
                        </div>
                      </div>
                    ))}

                  </div>
                </section>

                {/* Related tools */}
                <section className="p-6 sm:p-8 md:p-10 rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-slate-800">
                  <SectionTitle>Try the Data Lynx Tools</SectionTitle>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {relatedTools.map((tool) => (
                      <Link
                        key={tool.title}
                        href={tool.href}
                        className={`group p-5 rounded-2xl border transition-all cursor-pointer ${tool.className}`}
                      >
                        <div
                          className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${tool.iconClass}`}
                        >
                          <span className="font-black">→</span>
                        </div>

                        <h3 className="text-lg font-black text-white mb-2 group-hover:text-white">
                          {tool.title}
                        </h3>

                        <p className="text-sm text-white leading-7">
                          {tool.description}
                        </p>
                      </Link>
                    ))}
                  </div>
                </section>

                {/* FAQ */}
                <section
                  id="faq"
                  className="scroll-mt-28 p-6 sm:p-8 md:p-10 rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-slate-800"
                >
                  <SectionTitle>Frequently asked questions</SectionTitle>

                  <div className="space-y-4">
                    {faqItems.map((item) => (
                      <details
                        key={item.question}
                        className="group rounded-2xl bg-slate-950/70 border border-slate-800 overflow-hidden"
                      >
                        <summary className="flex items-center justify-between gap-4 p-5 text-white font-bold cursor-pointer list-none">
                          <span>{item.question}</span>

                          <span className="w-8 h-8 shrink-0 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center transition-transform group-open:rotate-45">
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

                {/* Conclusion */}
                <section className="p-6 sm:p-8 md:p-10 rounded-3xl bg-gradient-to-br from-datalynx-primary/10 via-slate-900/70 to-blue-500/5 border border-datalynx-primary/20">

                  <h2 className="text-2xl md:text-3xl font-black text-white mb-5">
                    Conclusion
                  </h2>

                  <div className="space-y-5 text-base text-white leading-9">
                    <p>{p.conclusion1}</p>
                    <p>{p.conclusion2}</p>
                    <p className="font-bold text-white">{p.conclusion3}</p>
                  </div>

                  <div className="mt-8 flex flex-col sm:flex-row gap-3">
                    <Link
                      href="/"
                      className="flex-1 inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-datalynx-primary text-white font-black hover:opacity-90 transition-all cursor-pointer"
                    >
                      {p.openTools}
                    </Link>

                    <Link
                      href="/privacy"
                      className="sm:w-52 inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold hover:bg-slate-700 transition-all cursor-pointer"
                    >
                      {t('articlePage.privacyCta')}
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
