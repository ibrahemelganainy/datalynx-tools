import Link from 'next/link';

import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

import { privacySections } from '../../../lib/i18n/content/privacyEn';

export const metadata = {
  title: 'Privacy Policy | Data Lynx Tools',
  description:
    'The privacy policy of the Data Lynx Tools platform and its tools for image compression, image format conversion and PDF compression.',
  alternates: {
    canonical: 'https://tools.datalynx.space/en/privacy',
    languages: {
      ar: 'https://tools.datalynx.space/privacy',
      en: 'https://tools.datalynx.space/en/privacy',
      'x-default': 'https://tools.datalynx.space/privacy',
    },
  },
};

export default function EnglishPrivacyPage() {
  return (
    <div
      className="min-h-screen text-slate-100 font-sans"
      dir="ltr"
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

            <div className="text-center mb-14">

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-bold mb-6">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Your privacy matters to us
              </div>

              <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-5">
                Privacy Policy
              </h1>

              <p className="text-base md:text-lg text-white max-w-2xl mx-auto leading-relaxed">
                This page explains how Data Lynx Tools handles files,
                technical information and cookies when you use the
                services on this site.
              </p>

              <div className="mt-6 text-sm text-white/70">
                Last updated: 8 October 2026
              </div>

            </div>

            {/* Important notice */}
            <div className="mb-8 p-6 rounded-3xl bg-slate-900/70 backdrop-blur-xl border border-slate-800">

              <div className="flex items-start gap-4">

                <div className="w-12 h-12 shrink-0 rounded-2xl bg-datalynx-primary/10 text-datalynx-primary flex items-center justify-center font-black">
                  DL
                </div>

                <div>
                  <h2 className="text-xl font-black text-white mb-2">
                    Files are processed locally
                  </h2>

                  <p className="text-sm md:text-base text-white leading-relaxed">
                    Data Lynx Tools is designed to process images and
                    PDF files inside the user&rsquo;s browser. We never
                    ask you to upload your files to a Data Lynx server
                    in order to compress or convert them.
                  </p>
                </div>

              </div>
            </div>

            {/* Content */}
            <div className="space-y-6">

              {privacySections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-32 p-6 sm:p-8 rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-slate-800"
                >
                  <h2 className="text-xl md:text-2xl font-black text-white mb-5">
                    {section.title}
                  </h2>

                  <div className="space-y-4 text-sm md:text-base text-white leading-8">
                    {section.paragraphs.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}

                    {section.blocks?.map((block) => (
                      <div
                        key={block.title}
                        className="my-6 p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20"
                      >
                        <div className="flex items-start gap-3">

                          <div className="w-10 h-10 shrink-0 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                            ✓
                          </div>

                          <div>
                            <h3 className="text-white font-bold mb-2">
                              {block.title}
                            </h3>

                            <p className="text-sm text-white/80 leading-relaxed">
                              {block.text}
                            </p>
                          </div>

                        </div>
                      </div>
                    ))}

                    {section.links?.length > 0 && (
                      <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {section.links.map((link) => (
                          <a
                            key={link.href}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-datalynx-primary/50 transition-all cursor-pointer"
                          >
                            <h3 className="font-bold text-white mb-2">
                              {link.title}
                            </h3>

                            <p className="text-sm text-white/70 leading-relaxed">
                              {link.text}
                            </p>
                          </a>
                        ))}
                      </div>
                    )}

                    {section.mailto && (
                      <a
                        href={`mailto:${section.mailto}`}
                        className="inline-flex items-center px-5 py-3 mt-3 rounded-xl bg-datalynx-primary/10 border border-datalynx-primary/20 text-datalynx-primary font-bold hover:bg-datalynx-primary/20 transition-all cursor-pointer"
                      >
                        {section.mailto}
                      </a>
                    )}
                  </div>
                </section>
              ))}

            </div>

            {/* Footer disclaimer */}
            <div className="mt-8 p-5 rounded-2xl bg-slate-900 border border-slate-800 text-sm text-white leading-relaxed">
              This policy describes how Data Lynx Tools operates and
              what data may be processed through the services used on
              the site. It is not legal advice and may need to be
              updated when new services or technologies are added to
              the site.
            </div>

            {/* Back */}
            <div className="mt-8 text-center">

              <Link
                href="/en"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold hover:bg-slate-700 transition-all cursor-pointer"
              >
                Back to Data Lynx Tools
              </Link>

            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
