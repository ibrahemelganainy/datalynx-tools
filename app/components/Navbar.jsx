'use client';

import React, {
  useState,
  useEffect,
} from 'react';

import { usePathname } from 'next/navigation';

import { useLocale } from './LocaleProvider';
import { getAlternatePath } from '../lib/i18n/articles';

/*
 * الأدوات المعروفة. يُستخدم للتحقق من أن الـhash الحالي هو فعلاً
 * معرّف أداة قبل نقلـه إلى رابط اللغة الأخرى.
 */
const TOOL_IDS = [
  'image-compression',
  'format-converter',
  'pdf-compression',
  'prosecution-portal',
];

export default function Navbar({ activeTool = null }) {
  const { locale, t, lhref } = useLocale();

  const [isOpen, setIsOpen] =
    useState(false);

  const [isScrolled, setIsScrolled] =
    useState(false);

  // تغيير شكل النافبار عند التمرير
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(
        window.scrollY > 20
      );
    };

    window.addEventListener(
      'scroll',
      handleScroll
    );

    return () => {
      window.removeEventListener(
        'scroll',
        handleScroll
      );
    };
  }, []);

  /*
   * روابط الخدمات ومركز المعرفة.
   *
   * كل رابط يُبنى من نفس المسار المنشور ثم يمر عبر lhref، الذي
   * يضيف بادئة /en في النسخة الإنجليزية ويترك الروابط العربية على
   * جذر الموقع كما هي. بهذه الطريقة تبقى كل الروابط الداخلية داخل
   * اللغة الحالية بدل العودة إلى العربية.
   *
   * روابط الأدوات تستخدم الآن مساراتها الحقيقية (/tools/... أو
   * /en/tools/...) بدل الـhash، بينما لصفحة الأداة المستقلة يبقى
   * الـhash القديم مدعومًا كما هو. */
  const navLinks = [
    {
      name: t('nav.home'),
      to: '',
    },
    {
      name: t('nav.imageCompression'),
      to: 'tools/image-compression',
    },
    {
      name: t('nav.formatConverter'),
      to: 'tools/format-converter',
    },
    {
      name: t('nav.pdfCompression'),
      to: 'tools/pdf-compression',
    },
    {
      name: t('nav.prosecutionPortal'),
      to: 'tools/prosecution-portal',
    },
    {
      name: t('nav.articles'),
      to: 'articles',
    },
  ];

  /*
   * مبدّل اللغة.
   *
   * رابط عادي قابل للزحف (a href) وليس زرًا JavaScript حتى تصل النسخة
   * الإنجليزية إلى محركات البحث.
   *
   * الوجهة تُحسب من المسار الحالي حتى ينتقل المستخدم إلى الصفحة
   * المكافئة بدل العودة إلى الصفحة الرئيسية. عندما لا يوجد مقابل
   * مترجم تُستخدم الصفحة الرئيسية كقيمة احتياطية آمنة.
   */
  const otherLocale = locale === 'ar' ? 'en' : 'ar';

  const localeSwitchLabel =
    locale === 'ar' ? 'EN' : 'AR';

  /*
   * نحافظ على الأداة المفتوحة حاليًا في الـhash عبر مزامنة الـhash بعد
   * الترطيب فقط. القيمة الابتدائية الفارغة تعني أن أول HTML المُولَّد
   * (قبل أي JavaScript) يحتوي رابطًا نظيفًا وليس hash عابرًا.
   *
   * هذا يخدم الحالة القديمة (/#image-compression) فقط: صفحات الأدوات
   * المستقلة (/tools/...) تُعرّف الأداة من المسار نفسه، ولا تحتاج إلى
   * أي hash. لذلك لا نُضيف hash إلى وجهة مبدّل اللغة عندما يكون
   * المستخدم أصلاً على صفحة أداة مستقلة.
   */
  const [hash, setHash] = useState('');

  useEffect(() => {
    const syncHash = () => setHash(window.location.hash || '');

    syncHash();

    window.addEventListener('hashchange', syncHash);

    return () =>
      window.removeEventListener('hashchange', syncHash);
  }, []);

  const pathname = usePathname();

  const onStandaloneToolPage = /\/tools\/[^/]+\/?$/.test(pathname || '');

  /*
   * الـhash الذي يجب نقله إلى اللغة الأخرى:
   *
   * - على صفحة أداة مستقلة: لا شيء، لأن المسار المكافئ يحمل هوية
   *   الأداة بنفسه.
   * - على الصفحة الرئيسية: الـhash نفسه إذا كان يشير إلى أداة معروفة
   *   (مثل #image-compression)، فينتقل المستخدم إلى نفس الأداة في
   *   اللغة الأخرى بدلًا من العودة إلى الرئيسية.
   */
  const carriedHash = onStandaloneToolPage
    ? ''
    : TOOL_IDS.some((id) => hash === `#${id}`)
      ? hash
      : '';

  const localeSwitchHref = `${getAlternatePath(
    pathname,
    locale
  )}${carriedHash}`;

  const isEnglish = locale === 'en';

  const logoHref = isEnglish ? '/en' : '/';

  return (
    <nav
      className={`fixed w-full top-0 z-[100] transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-lg shadow-sm py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">

        {/* Logo Section */}
        <a
          href={logoHref}
          className="flex items-center gap-3 group cursor-pointer"
          aria-label="Data Lynx Tools"
        >

          {/* الحاوية الخارجية للشعار */}
          <div
            aria-label="Data Lynx logo"
            className={`nav-logo relative flex items-center justify-center rounded-xl select-none
              w-10 h-10 md:w-14 md:h-14 p-1
              ${
                isScrolled
                  ? 'bg-slate-800'
                  : 'bg-slate-900'
              }
              transform -rotate-6 hover:rotate-0 transition-transform duration-500`}
            role="img"
          >

            {/* حرف D */}
            <span
              className="absolute left-1/4 md:left-3/10 text-sm md:text-lg font-extrabold leading-none tracking-tight
              bg-clip-text text-transparent bg-gradient-to-r from-datalynx-primary to-blue-400"
            >
              D
            </span>

            {/* حرف L */}
            <span
              className="absolute right-1/4 md:right-3/10 text-sm md:text-lg font-extrabold leading-none tracking-tight
              text-white opacity-90 transform rotate-12"
            >
              L
            </span>

          </div>

          <div className="flex flex-col">

            <span
              className={`text-xl font-black tracking-tight leading-none transition-colors duration-300 ${
                isScrolled
                  ? 'text-datalynx-dark'
                  : 'text-white md:text-white'
              }`}
            >
              Data
              <span className="text-datalynx-primary">
                Lynx
              </span>
            </span>

            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Tools
            </span>

          </div>

        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10">

          {navLinks.map((link) => (
            <a
              key={link.name}
              href={lhref(link.to)}
              className={`text-sm font-bold transition-colors hover:text-datalynx-primary cursor-pointer ${
                isScrolled
                  ? 'text-slate-600'
                  : 'text-slate-600 md:text-slate-200 md:hover:text-white'
              }`}
            >
              {link.name}
            </a>
          ))}

          {/* AR / EN */}
          <a
            href={localeSwitchHref}
            lang={otherLocale}
            aria-label={t('nav.languageSwitcherLabel')}
            className={`px-3.5 py-2 rounded-full border text-xs font-bold transition-colors cursor-pointer ${
              isScrolled
                ? 'border-slate-200 text-slate-600 hover:text-datalynx-primary hover:border-datalynx-primary/40'
                : 'border-white/20 text-slate-200 hover:text-white hover:border-white/40'
            }`}
          >
            {localeSwitchLabel}
          </a>

          {/* datalynx.space */}
          <a
            href="https://datalynx.space"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 bg-datalynx-primary hover:bg-blue-600 text-white text-sm font-bold rounded-full transition-all shadow-md hover:shadow-blue-500/20 transform hover:-translate-y-0.5 cursor-pointer"
          >
            datalynx.space
          </a>

        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label={t('nav.openMenu')}
          aria-expanded={isOpen}
          className={`md:hidden p-2 transition-colors duration-300 cursor-pointer ${
            isScrolled
              ? 'text-datalynx-dark'
              : 'text-white'
          }`}
          onClick={() =>
            setIsOpen(!isOpen)
          }
        >

          <div
            className={`w-6 h-0.5 bg-current mb-1.5 transition-all ${
              isOpen
                ? 'rotate-45 translate-y-2'
                : ''
            }`}
          />

          <div
            className={`w-6 h-0.5 bg-current mb-1.5 ${
              isOpen
                ? 'opacity-0'
                : ''
            }`}
          />

          <div
            className={`w-4 h-0.5 bg-current ml-auto ${
              isOpen
                ? '-rotate-45 -translate-y-2 w-6'
                : ''
            }`}
          />

        </button>

      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`absolute top-full left-0 w-full bg-white shadow-xl border-t transition-all duration-300 origin-top ${
          isOpen
            ? 'scale-y-100 opacity-100'
            : 'scale-y-0 opacity-0 pointer-events-none'
        }`}
      >

        <div className="p-6 flex flex-col gap-4 text-start">

          {navLinks.map((link) => (
            <a
              key={link.name}
              href={lhref(link.to)}
              onClick={() =>
                setIsOpen(false)
              }
              className="text-lg font-bold text-datalynx-dark hover:text-datalynx-primary transition-colors cursor-pointer"
            >
              {link.name}
            </a>
          ))}

          <a
            href={localeSwitchHref}
            lang={otherLocale}
            onClick={() => setIsOpen(false)}
            className="inline-flex items-center gap-2 self-start px-4 py-2 rounded-full border border-slate-200 text-sm font-bold text-datalynx-dark hover:text-datalynx-primary hover:border-datalynx-primary/40 transition-colors cursor-pointer"
          >
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              {locale === 'ar' ? 'AR' : 'EN'}
            </span>

            <span>{t('languages.switchTo')}</span>
          </a>

          <hr className="border-slate-100" />

          {/* datalynx.space */}
          <a
            href="https://datalynx.space"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 bg-datalynx-dark text-white text-center rounded-2xl font-bold cursor-pointer"
          >
            datalynx.space
          </a>

        </div>

      </div>

      {/* CSS لتأثير العوم الخفيف */}
      <style>{`
        .nav-logo {
          animation: navFloat 4s ease-in-out infinite;
        }

        @keyframes navFloat {
          0% {
            transform: translateY(0) rotate(-6deg);
          }

          50% {
            transform: translateY(-4px) rotate(-6deg);
          }

          100% {
            transform: translateY(0) rotate(-6deg);
          }
        }

        @media (min-width: 768px) {
          .nav-logo span:first-child {
            left: 28%;
          }

          .nav-logo span:last-child {
            right: 28%;
          }
        }
      `}</style>

    </nav>
  );
}
