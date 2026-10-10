'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFacebook, 
  faWhatsapp 
} from '@fortawesome/free-brands-svg-icons';

import {
  faPhone,
  faEnvelope,
  faArrowUp,
  faCaretLeft,
  faShieldHalved,
  faFileContract,
  faCircleInfo,
  faPaperPlane
} from '@fortawesome/free-solid-svg-icons';

import { useLocale } from './LocaleProvider';
import RichText from './RichText';

export default function Footer() {
  const { t, lhref } = useLocale();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /*
   * روابط الأدوات في الفوتر تشير الآن إلى المسارات الحقيقية
   * (/tools/... أو /en/tools/...) بدل الحالات المعبّرة بالـhash،
   * مع الاحتفاظ بـlhref حتى تبقى الروابط داخل اللغة الحالية.
   */
  const toolLinks = [
    {
      id: 'image-compression',
      iconClass: 'text-datalynx-primary',
      highlight: false,
    },
    {
      id: 'format-converter',
      iconClass: 'text-datalynx-primary',
      highlight: false,
    },
    {
      id: 'pdf-compression',
      iconClass: 'text-datalynx-primary',
      highlight: false,
    },
    {
      id: 'prosecution-portal',
      iconClass: 'text-amber-400',
      highlight: true,
    },
  ];

  return (
    <footer className="bg-[#020617] text-slate-400 pt-20 pb-10 relative overflow-hidden">
      {/* تأثير إضاءة خفي خلف الفوتر */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-datalynx-primary/50 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">

          {/* العمود الأول: هوية منصة الأدوات */}
          <div className="col-span-1 lg:col-span-1 text-start">
            <div className="flex items-center gap-3 mb-6">
              {/* شعار DL بنفس شكل النافبار */}
              <div
                aria-label="Data Lynx logo"
                className="nav-logo relative flex items-center justify-center rounded-xl select-none
              w-10 h-10 md:w-14 md:h-14 p-1 bg-slate-900
                transform -rotate-6 hover:rotate-0 transition-transform duration-500"
                role="img"
              >
                {/* حرف D */}
                <span className="absolute left-1/4 md:left-3/10 text-sm md:text-lg font-extrabold leading-none tracking-tight
              bg-clip-text text-transparent bg-gradient-to-r from-datalynx-primary to-blue-400">
                  D
                </span>

                {/* حرف L */}
                <span className="absolute right-1/4 md:right-3/10 text-sm md:text-lg font-extrabold leading-none tracking-tight
              text-white opacity-90 transform rotate-12">
                  L
                </span>
              </div>

              <div className="flex flex-col">
                <h2 className="text-2xl font-black text-white tracking-tighter leading-none">
                  Data<span className="text-datalynx-primary">Lynx</span>
                </h2>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tools</span>
              </div>
            </div>

            <p className="text-sm leading-relaxed mb-8 opacity-80">
              {t('footer.tagline')}
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/profile.php?id=61562579024299" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-datalynx-primary hover:text-white hover:border-datalynx-primary transition-all duration-300">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
            </div>
          </div>

          {/* العمود الثاني: الأدوات المتاحة */}
          <div>
            <h4 className="text-white font-bold mb-8 text-lg flex items-center gap-2">
              <span className="w-2 h-2 bg-datalynx-primary rounded-full"></span>
              {t('footer.toolsTitle')}
            </h4>
            <ul className="space-y-4">
              {toolLinks.map((tool) => (
                <li key={tool.id}>
                  <a href={lhref(`tools/${tool.id}`)} className="group flex items-center gap-3 hover:text-white transition-colors">
                    <FontAwesomeIcon icon={faCaretLeft} className={`${tool.iconClass} text-xs opacity-0 group-hover:opacity-100 transition-all rtl:rotate-180`} />
                    <div>
                      <span className={`block font-bold ${tool.highlight ? 'text-amber-400' : ''}`}>
                        {t(`footer.tools.${tool.id}.label`)}
                      </span>
                      <span className="text-[11px] opacity-60 italic">
                        {t(`footer.tools.${tool.id}.hint`)}
                      </span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* العمود الثالث: الشروط والخصوصية (ضروري لقابليات AdSense) */}
          <div>
            <h4 className="text-white font-bold mb-8 text-lg flex items-center gap-2">
              <span className="w-2 h-2 bg-datalynx-primary rounded-full"></span>
              {t('footer.privacyTitle')}
            </h4>
            <ul className="space-y-4">
              <li>
                <a href={lhref('about')} className="group flex items-center gap-2 hover:text-white transition-colors">
                  <FontAwesomeIcon icon={faCircleInfo} className="text-blue-400 text-xs" />
                  <span>{t('nav.about')}</span>
                </a>
              </li>
              <li>
                <a href={lhref('contact')} className="group flex items-center gap-2 hover:text-white transition-colors">
                  <FontAwesomeIcon icon={faPaperPlane} className="text-amber-400 text-xs" />
                  <span>{t('nav.contact')}</span>
                </a>
              </li>
              <li>
                <a href={lhref('privacy')} className="group flex items-center gap-2 hover:text-white transition-colors">
                  <FontAwesomeIcon icon={faShieldHalved} className="text-emerald-400 text-xs" />
                  <span>{t('footer.privacyLink')}</span>
                </a>
              </li>
              <li>
                <a href={lhref('terms')} className="group flex items-center gap-2 hover:text-white transition-colors">
                  <FontAwesomeIcon icon={faFileContract} className="text-slate-400 text-xs" />
                  <span>{t('footer.termsLink')}</span>
                </a>
              </li>
              <li>
                <a href="https://datalynx.space" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors block pt-2">
                  {t('footer.mainSiteLink')}
                </a>
              </li>
            </ul>
          </div>

          {/* العمود الرابع: بيانات التواصل */}
          <div>
            <h4 className="text-white font-bold mb-8 text-lg flex items-center gap-2">
              <span className="w-2 h-2 bg-datalynx-primary rounded-full"></span>
              {t('footer.contactTitle')}
            </h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-datalynx-primary shrink-0">
                  <FontAwesomeIcon icon={faPhone} />
                </div>
                <div>
                  <span className="block text-xs text-slate-500 mb-1">{t('footer.callUs')}</span>
                  <span className="font-bold text-white tracking-widest" dir="ltr">+20 150 707 1671</span>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-datalynx-primary shrink-0">
                  <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <div>
                  <span className="block text-xs text-slate-500 mb-1">{t('footer.support')}</span>
                  <span className="font-bold text-white text-sm">lexoffice.datalynx@proton.me</span>
                </div>
              </li>
              <li className="flex items-start gap-4 text-lex-gold group cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-lex-gold/10 flex items-center justify-center shrink-0 group-hover:bg-lex-gold group-hover:text-black transition-all">
                  <FontAwesomeIcon icon={faWhatsapp} className="text-xl" />
                </div>

                <div className="flex flex-col">
                  <span className="block text-[10px] uppercase font-bold mb-1 opacity-80">{t('footer.availableNow')}</span>

                  <a
                    href="https://wa.me/201507071671"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <span className="font-bold block group-hover:underline">{t('footer.whatsapp')}</span>
                  </a>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* الجزء السفلي: حقوق الملكية */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm opacity-60 text-center md:text-start">
            © {new Date().getFullYear()}{' '}
            <RichText text={t('footer.copyright')} strongClassName="font-bold text-slate-200" />
          </div>

          {/* زر العودة للأعلى */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-3 text-sm font-bold text-white/50 hover:text-datalynx-primary transition-all"
          >
            {t('footer.backToTop')}
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-datalynx-primary group-hover:bg-datalynx-primary group-hover:text-white transition-all">
              <FontAwesomeIcon icon={faArrowUp} />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}