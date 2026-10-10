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

/*
 * معرّف القائمة المنسدلة. يُستخدم في aria-controls ويجب أن يكون
 * ثابتًا في كل نسخ الصفحة (العربية والإنجليزية).
 */
const TOOLS_MENU_ID = 'navbar-tools-menu';

export default function Navbar({ activeTool = null }) {
  const { locale, t, lhref } = useLocale();

  const [isOpen, setIsOpen] =
    useState(false);

  /*
   * حالة فتح قائمة الأدوات المنسدلة على سطح المكتب. منفصلة تمامًا عن
   * isOpen الذي يخص قائمة الجوال، فلا تؤثر إحداهما على الأخرى.
   */
  const [isToolsOpen, setIsToolsOpen] = useState(false);

  /* مرجعان للوصول المباشر إلى العنصرين عند معالجة لوحة المفاتيح. */
  const toolsTriggerRef = React.useRef(null);
  const toolsMenuRef = React.useRef(null);

  /*
   * مرجع قائمة الجوال، ومرجع قسم الأدوات داخلها، وقد أُضيفا لدعم
   * إغلاق قائمة الجوال عند النقر خارجها (وهو سلوك كان مفقودًا قبل
   * هذا التغيير، وصار لازمًا لأن الأدوات صارت قائمة فرعية قابلة
   * للفتح والإغلاق على الجوال).
   */
  const mobileMenuRef = React.useRef(null);
  const mobileMenuButtonRef = React.useRef(null);

  /* حالة فتح قسم الأدوات داخل قائمة الجوال. */
  const [isMobileToolsOpen, setIsMobileToolsOpen] = useState(false);

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
   * إغلاق القوائم عند النقر خارجها أو عند الضغط على Escape.
   *
   * تفاصيل مهمة:
   *
   * - نستخدم pointerdown وليس mousedown ولا click حتى يعمل الإغلاق
   *   بالفأرة واللمس معًا بدون تكرار الأحداث.
   * - نتحقق من أن الحدث لم يقع داخل جسم القائمة ولا داخل زر
   *   الفتح، وإلا لأُغلقت القائمة فور فتحها.
   * - Escape يُغلق القائمة ويُعيد التركيز إلى زر الفتح، وهو السلوك
   *   المتوقع في التنقل بلوحة المفاتيح.
   *
   * التشغيل مُقيّد بـ isToolsOpen/isOpen حتى لا نُسجّل أي مستمع في
   * الحالة المغلقة، وهو نفس أسلوب الموقع في تقليل العمل غير اللازم.
   */
  useEffect(() => {
    if (!isToolsOpen) return undefined;

    const handlePointerDown = (event) => {
      const target = event.target;

      const insideMenu =
        toolsMenuRef.current && toolsMenuRef.current.contains(target);
      const insideTrigger =
        toolsTriggerRef.current && toolsTriggerRef.current.contains(target);

      if (!insideMenu && !insideTrigger) {
        setIsToolsOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsToolsOpen(false);
        toolsTriggerRef.current?.focus();
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isToolsOpen]);

  /*
   * إغلاق قائمة الجوال عند النقر خارجها.
   *
   * كان هذا السلوك غير موجود أصلًا: قائمة الجوال تُغلق فقط بزر
   * الهامبرغر أو بالنقر على أحد روابطها. وبعد أن صارت الأدوات قائمة
   * فرعية قابلة للفتح، صار النقر خارجها يجب أن يُغلق القائمة كلها،
   * وإلا بقيت مفتوحة فوق المحتوى بلا طريقة طبيعية لإغلاقها.
   *
   * زر الفتح مستثنى لأن معالجه الخاص يبدّل الحالة، فلو أغلقت
   * هنا أيضًا لأُغلقت ثم أُعيد فتحها في نفس النقرة.
   */
  useEffect(() => {
    if (!isOpen) return undefined;

    const handlePointerDown = (event) => {
      const target = event.target;

      const insideMenu =
        mobileMenuRef.current && mobileMenuRef.current.contains(target);
      const insideButton =
        mobileMenuButtonRef.current &&
        mobileMenuButtonRef.current.contains(target);

      if (!insideMenu && !insideButton) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        mobileMenuButtonRef.current?.focus();
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

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
   * الـhash القديم مدعومًا كما هو.
   *
   * التغيير الوحيد هنا: الأدوات الأربع لم تعد عناصر منفصلة في
   * navLinks، بل انتقلت إلى toolLinks التي تُعرض داخل قائمة منسدلة
   * واحدة. ولم يتغير أي مسار أو نص: نفس الـidentifiers ونفس مفاتيح
   * القاموس ونفس lhref كما كانت تمامًا.
   *
   * ترتيب بقية العناصر محفوظ كما هو: الرئيسية ثم مركز المعرفة ثم
   * من نحن ثم اتصل بنا. والقائمة المنسدلة تأخذ نفس موضع الأدوات
   * الأربع السابق، أي مباشرة بعد "الرئيسية". */
  const toolLinks = [
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
  ];

  const navLinks = [
    {
      name: t('nav.home'),
      to: '',
    },
    {
      name: t('nav.articles'),
      to: 'articles',
    },
    {
      name: t('nav.about'),
      to: 'about',
    },
    {
      name: t('nav.contact'),
      to: 'contact',
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

  /*
   * مناولة لوحة المفاتيح داخل قائمة الأدوات المنسدلة.
   *
   * - سهم لأسفل/أعلى: الانتقال بين روابط الأدوات مع تخطي الأطراف.
   * - Home/End: أول وأخر عنصر.
   * - Escape مُعالج في مستمع document أعلاه.
   *
   * لا نحتاج إلى حصر التركيز (focus trap) لأن القائمة غير معيارية
   * modal: هي قائمة تنقل عادية، وتركيز المستخدم فيها أو الخروج منها
   * بـTab سلوك مقبول ومتوقع.
   */
  const handleToolsMenuKeyDown = (event) => {
    const items = toolsMenuRef.current
      ? Array.from(
          toolsMenuRef.current.querySelectorAll('a[href]')
        )
      : [];

    if (items.length === 0) return;

    const currentIndex = items.indexOf(document.activeElement);

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      const next = currentIndex < 0 ? 0 : (currentIndex + 1) % items.length;
      items[next].focus();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      const previous =
        currentIndex <= 0 ? items.length - 1 : currentIndex - 1;
      items[previous].focus();
    } else if (event.key === 'Home') {
      event.preventDefault();
      items[0].focus();
    } else if (event.key === 'End') {
      event.preventDefault();
      items[items.length - 1].focus();
    }
  };

  return (
    <nav
      className={`fixed w-full top-0 z-[100] transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-lg shadow-sm py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-[auto_1fr_auto] md:grid-cols-[1fr_auto_1fr] items-center">

        {/* Logo Section */}
        {/*
         * shrink-0 يمنع الشعار من التقلّص عند إضافة روابط جديدة إلى
         * القائمة. قبل إضافة "من نحن" و"اتصل بنا" لم يكن الضغط كافيًا
         * ليظهر ذلك، لكن مع ثمانية عناصر صار الشعار يُضغط فيلتصق به
         * رابط "الرئيسية" بدون فاصل.
         *
         * justify-self-start في الشبكة يضعه في بداية الشريط، ويسري
         * تلقائيًا على الاتجاهين: يمينًا في العربية ويسارًا في
         * الإنجليزية - وهو نفس مكانه السابق.
         */}
        <a
          href={logoHref}
          className="flex items-center gap-3 group cursor-pointer shrink-0 justify-self-start col-start-1 row-start-1"
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

        {/*
         * Desktop Navigation — في منتصف الشريط.
         *
         * الحاوية الأم صارت grid بثلاثة أعمدة بدل flex justify-between:
         *
         *   العمود 1: الشعار   (justify-self-start)  - يبقى في مكانه
         *   العمود 2: الروابط  (justify-self-center) - في المنتصف
         *   العمود 3: الأزرار  (justify-self-end)    - تبقى في مكانها
         *
         * السبب في استخدام grid بدل flex مع mx-auto: الروابط تحتاج أن
         * تكون في منتصف الشريط نفسه، لا في منتصف المساحة المتبقية بعد
         * الشعار. لو استخدمنا flex مع mx-auto لحُسبت المنتصف من
         * المساحة الحرّة، فينزاح المركز بمقدار فرق عرض الشعار عن عرض
         * زر datalynx.space. أعمدة 1fr auto 1fr تجعل المركز حقيقياً.
         *
         * ملاحظة: الترتيب البصري على RTL يعكسه المتصفح تلقائيًا،
         * فيبقى الشعار يمينًا في العربية ويسارًا في الإنجليزية بلا أي
         * شرط إضافي - وهو نفس السلوك السابق تمامًا.
         *
         * الأدوات الأربع صارت قائمة منسدلة واحدة بدل أربعة روابط.
         * هذا يعيد المساحة التي كانت تسبّب تجاوزًا أفقيًا عند عرض
         * md (768px)، ولذلك أمكن إعادة المسافة بين العناصر إلى قيمتها
         * الأصلية gap-8 مع نفس شكل ومحاذاة النافبار السابقين.
         */}
        <div className="hidden md:flex items-center gap-8 justify-self-center col-start-2 row-start-1">

          {/* الرئيسية */}
          <a
            href={lhref(navLinks[0].to)}
            className={`text-sm font-bold transition-colors hover:text-datalynx-primary cursor-pointer ${
              isScrolled
                ? 'text-slate-600'
                : 'text-slate-600 md:text-slate-200 md:hover:text-white'
            }`}
          >
            {navLinks[0].name}
          </a>

          {/*
           * قائمة الأدوات المنسدلة.
           *
           * الزر لا ينقل المستخدم إلى أي صفحة (type="button" وبدون
           * href)، لذلك فتحه لا يُسبّب أي تنقل، وهذا هو المطلوب.
           * الحاوية relative لأن اللوحة المُطلقة تُحاذى تحتها.
           */}
          <div className="relative" onKeyDown={handleToolsMenuKeyDown}>
            <button
              ref={toolsTriggerRef}
              type="button"
              id={`${TOOLS_MENU_ID}-trigger`}
              aria-haspopup="true"
              aria-expanded={isToolsOpen}
              aria-controls={TOOLS_MENU_ID}
              onClick={() => setIsToolsOpen((open) => !open)}
              className={`flex items-center gap-1.5 text-sm font-bold transition-colors cursor-pointer ${
                isScrolled
                  ? 'text-slate-600 hover:text-datalynx-primary'
                  : 'text-slate-600 md:text-slate-200 md:hover:text-white'
              }`}
            >
              {t('nav.tools')}

              {/*
               * السهم يدور 180 درجة عند الفتح. انتقال transform فقط،
               * بدون أي مكتبة حركة جديدة.
               */}
              <svg
                aria-hidden="true"
                focusable="false"
                viewBox="0 0 448 512"
                className={`w-3 h-3 transition-transform duration-200 ${
                  isToolsOpen ? 'rotate-180' : ''
                }`}
              >
                <path
                  fill="currentColor"
                  d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
                />
              </svg>
            </button>

            {/* اللوحة المنسدلة */}
            <div
              ref={toolsMenuRef}
              id={TOOLS_MENU_ID}
              aria-labelledby={`${TOOLS_MENU_ID}-trigger`}
              className={`absolute top-full mt-3 min-w-[15rem] p-2 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl transition-all duration-200 origin-top ${
                isToolsOpen
                  ? 'opacity-100 scale-100 visible'
                  : 'opacity-0 scale-95 invisible pointer-events-none'
              } ${isEnglish ? 'left-0' : 'right-0'}`}
            >
              {toolLinks.map((tool) => (
                <a
                  key={tool.to}
                  href={lhref(tool.to)}
                  onClick={() => setIsToolsOpen(false)}
                  className="block px-4 py-3 rounded-xl text-sm font-bold text-slate-200 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer whitespace-nowrap"
                >
                  {tool.name}
                </a>
              ))}
            </div>
          </div>

          {/* مركز المعرفة / من نحن / اتصل بنا */}
          {navLinks.slice(1).map((link) => (
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

        </div>

        {/*
         * الأزرار في نهاية الشريط (اللغة + datalynx.space).
         *
         * خرجت من حاوية الروابط إلى عمودها الخاص حتى تبقى في مكانها
         * بالضبط كما كان، دون أن تتأثر بتمركز الروابط في المنتصف.
         */}
        <div className="hidden md:flex items-center gap-5 justify-self-end col-start-3 row-start-1">
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

        {/*
         * Mobile Menu Button.
         *
         * justify-self-end يُبقيه في نهاية الشريط على الجوال، وهو
         * نفس مكانه السابق.
         */}
        <button
          ref={mobileMenuButtonRef}
          type="button"
          aria-label={t('nav.openMenu')}
          aria-expanded={isOpen}
          aria-controls="navbar-mobile-menu"
          className={`md:hidden p-2 transition-colors duration-300 cursor-pointer justify-self-end col-start-3 row-start-1 ${
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
        ref={mobileMenuRef}
        id="navbar-mobile-menu"
        className={`absolute top-full left-0 w-full bg-white shadow-xl border-t transition-all duration-300 origin-top ${
          isOpen
            ? 'scale-y-100 opacity-100'
            : 'scale-y-0 opacity-0 pointer-events-none'
        }`}
      >

        <div className="p-6 flex flex-col gap-4 text-start">

          {/* الرئيسية */}
          <a
            href={lhref(navLinks[0].to)}
            onClick={() => setIsOpen(false)}
            className="text-lg font-bold text-datalynx-dark hover:text-datalynx-primary transition-colors cursor-pointer"
          >
            {navLinks[0].name}
          </a>

          {/*
           * قسم الأدوات على الجوال.
           *
           * زر قابل للفتح والإغلاق بنفسه، ويعمل بـaria-expanded/
           * aria-controls، فلا يتعارض مع رابطات القائمة الأخرى ولا
           * يمنع الوصول إليها.
           */}
          <div>
            <button
              type="button"
              aria-expanded={isMobileToolsOpen}
              aria-controls="navbar-mobile-tools"
              onClick={() => setIsMobileToolsOpen((open) => !open)}
              className="w-full flex items-center justify-between gap-2 text-lg font-bold text-datalynx-dark hover:text-datalynx-primary transition-colors cursor-pointer"
            >
              <span>{t('nav.tools')}</span>

              <svg
                aria-hidden="true"
                focusable="false"
                viewBox="0 0 448 512"
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  isMobileToolsOpen ? 'rotate-180' : ''
                }`}
              >
                <path
                  fill="currentColor"
                  d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
                />
              </svg>
            </button>

            <div
              id="navbar-mobile-tools"
              className={`grid transition-all duration-300 ${
                isMobileToolsOpen
                  ? 'grid-rows-[1fr] opacity-100 mt-3'
                  : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                {/*
                 * خط جانبي خفيف يوضح أن هذا قائمة فرعية داخل قائمة
                 * الجوال، بنفس لون الحدود المستخدم في الموقع.
                 */}
                <div className="flex flex-col gap-3 ps-4 border-s-2 border-slate-200">
                  {toolLinks.map((tool) => (
                    <a
                      key={tool.to}
                      href={lhref(tool.to)}
                      onClick={() => setIsOpen(false)}
                      className="text-base font-bold text-slate-600 hover:text-datalynx-primary transition-colors cursor-pointer"
                    >
                      {tool.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* مركز المعرفة / من نحن / اتصل بنا */}
          {navLinks.slice(1).map((link) => (
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
