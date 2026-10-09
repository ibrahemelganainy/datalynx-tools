import Link from 'next/link';

import { termsSections } from '../../../lib/i18n/content/termsEn';

export const metadata = {
  title: 'Terms of Use | Data Lynx Tools',
  description:
    'Read the terms and conditions for using the Data Lynx Tools to compress images, convert formats and compress PDF files.',
  alternates: {
    canonical: 'https://tools.datalynx.space/en/terms',
    languages: {
      ar: 'https://tools.datalynx.space/terms',
      en: 'https://tools.datalynx.space/en/terms',
      'x-default': 'https://tools.datalynx.space/terms',
    },
  },
};

export default function EnglishTermsPage() {
  return (
    <main
      dir="ltr"
      className="min-h-screen bg-slate-900 text-slate-100 font-sans"
    >
      <div className="max-w-3xl mx-auto px-6 py-20">
        <Link
          href="/en"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors cursor-pointer mb-10"
        >
          → Back to home
        </Link>

        <header className="mb-12">
          <div className="font-mono text-xs tracking-[0.2em] text-datalynx-primary/90 mb-4">
            LEGAL
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-4">
            Terms of Use
          </h1>
          <p className="text-slate-400 leading-relaxed">
            This document explains the terms that govern your use of the
            Data Lynx Tools.
          </p>
          <p className="text-slate-500 text-sm mt-4">
            Last updated: 8 October 2026
          </p>
        </header>

        <nav
          aria-label="Page index"
          className="mb-12 p-6 rounded-2xl border border-slate-800 bg-slate-900/60"
        >
          <h2 className="text-sm font-bold text-white mb-4">Contents</h2>
          <ul className="space-y-2 text-sm">
            {termsSections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="text-slate-400 hover:text-datalynx-primary transition-colors cursor-pointer"
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-10">
          {termsSections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-24">
              <h2 className="text-xl font-bold text-white mb-4">
                {section.title}
              </h2>
              <div className="space-y-4 text-slate-400 leading-relaxed">
                {section.content.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
