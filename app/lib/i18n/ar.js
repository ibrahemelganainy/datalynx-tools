/*
 * Arabic dictionary.
 *
 * IMPORTANT:
 * Every user-facing string in this file was moved verbatim from the
 * existing components so that the Arabic interface stays byte-identical.
 * Do not reword, shorten, or "improve" strings in this file.
 */

export const ar = {
  dir: 'rtl',
  lang: 'ar',

  nav: {
    home: 'الرئيسية',
    imageCompression: 'ضغط الصور',
    formatConverter: 'تحويل الصيغ',
    pdfCompression: 'ضغط PDF',
    prosecutionPortal: 'بوابة النيابة العامة',
    articles: 'مركز المعرفة',
    openMenu: 'فتح القائمة',
    languageSwitcherLabel: 'تغيير اللغة',
  },

  hero: {
    badge: 'معالجة آمنة 100% داخل متصفحك',
    titleLine1: 'أدوات احترافية لضغط',
    titleLine2: 'الصور وملفات PDF',
    description:
      'منصة متكاملة من <strong>Data Lynx</strong> تتيح لك تصغير حجم ملفاتك وتحويل صيغها بسرعة فائقة. تتم كافة العمليات محلياً على جهازك لضمان أقصى درجات الخصوصية والسرية لمستنداتك.',
    startNow: 'ابدأ الآن',
    tools: {
      'image-compression': {
        title: 'ضغط الصور',
        desc: 'تقليل حجم الصور بذكاء مع الحفاظ على الدقة العالية، لتوفير المساحة وتسريع الرفع.',
      },
      'format-converter': {
        title: 'تحويل الصيغ',
        desc: 'تحويل الصور بين صيغ WebP, JPEG, PNG بمرونة كاملة وبدون فقدان للجودة.',
      },
      'pdf-compression': {
        title: 'ضغط ملفات PDF',
        desc: 'تصغير حجم المستندات القانونية والملفات الممسوحة ضوئياً لتسهيل إرسالها.',
      },
      'prosecution-portal': {
        title: 'بوابة النيابة العامة',
        desc: 'أداة مخصصة لضبط حجم أي مستند تلقائياً ليكون أقل من 500KB بضغطة زر واحدة.',
      },
    },
  },

  features: {
    titleBefore: 'لماذا تثق في',
    titleHighlight: 'أدواتنا؟',
    description:
      'صممنا هذه المنصة لتكون المساعد الأول للمحامين والمحترفين، مع التركيز التام على حماية البيانات وسرعة الإنجاز.',
    items: [
      {
        title: 'معالجة محلية 100%',
        desc: 'نستخدم تقنيات المتصفح المتقدمة (WebAssembly). ملفاتك لا يتم رفعها إطلاقاً إلى أي سيرفر خارجي.',
      },
      {
        title: 'أمان وخصوصية تامة',
        desc: 'بما أن المعالجة تتم على جهازك، فمستنداتك القانونية وصورك الشخصية في أمان تام ولا يمكن لأحد الاطلاع عليها.',
      },
      {
        title: 'سرعة البرق',
        desc: 'تخلص من أوقات الانتظار المملة لرفع وتحميل الملفات. المعالجة تتم في أجزاء من الثانية بفضل موارد جهازك.',
      },
      {
        title: 'خوارزميات ذكية',
        desc: 'تقنيات ضغط متطورة تحافظ على الجودة العالية للصور ودقة النصوص في ملفات PDF مع تقليل الحجم لأقصى درجة.',
      },
    ],
  },

  workspace: {
    backToServices: 'العودة للخدمات',
    preparingTool: 'جاري تجهيز الأداة...',
    tools: {
      'image-compression': 'ضغط الصور',
      'format-converter': 'تحويل الصيغ',
      'pdf-compression': 'ضغط PDF',
      'prosecution-portal': 'بوابة النيابة',
    },
  },

  knowledgeSection: {
    kicker: 'KNOWLEDGE CENTER',
    kickerNumber: '٠٣',
    titleBefore: 'المعرفة تبدأ من',
    titleHighlight: 'فهم أدواتك',
    description:
      'في <strong>Data Lynx Tools</strong>، نقدم لك أدلة عملية تساعدك على فهم ضغط الصور وتحويل الصيغ والتعامل مع ملفات PDF واختيار الطريقة المناسبة لمعالجة ملفاتك بكفاءة.',
    articleLabel: 'المقال',
    readMore: 'قراءة المقال ←',
    ctaTitle: 'تبحث عن المزيد من الأدلة؟',
    ctaDescription:
      'استكشف جميع المقالات والأدلة العملية في مركز المعرفة وتعرف على أفضل الطرق للتعامل مع ملفاتك الرقمية.',
    ctaButton: 'استكشف مركز المعرفة',
    articles: {
      'image-pdf-compression-tools': {
        title:
          'ضغط الصور وتحويل الصيغ وضغط ملفات PDF أونلاين: دليل عملي للتعامل مع الملفات بسرعة وأمان',
        description:
          'دليل شامل يشرح كيفية ضغط الصور وتحويل صيغها وإنشاء ملفات ICO وضغط ملفات PDF، مع توضيح أفضل الطرق للتعامل مع الملفات بسرعة وأمان.',
      },
      'compress-image-500kb': {
        title: 'كيف تقلل حجم الصورة إلى أقل من 500KB؟',
        description:
          'دليل عملي لفهم أسباب كبر حجم الصور وكيفية تقليلها باستخدام الجودة والأبعاد والصيغة المناسبة مع الحفاظ على أفضل وضوح ممكن.',
      },
      'jpg-vs-webp-vs-png-avif': {
        title:
          'JPG أم PNG أم WebP أم AVIF؟ دليل اختيار صيغة الصورة المناسبة',
        description:
          'دليل عملي لفهم أشهر صيغ الصور ومقارنة استخداماتها واختيار الصيغة المناسبة حسب الجودة والحجم والشفافية وطبيعة الاستخدام على الويب.',
      },
    },
  },

  footer: {
    tagline:
      'مجموعة أدوات مجانية فائقة السرعة لضغط الصور وتصغير ملفات PDF وتجهيز مستندات المحاكم والنيابة العامة. تتم المعالجة بالكامل داخل متصفحك لضمان أقصى درجات الخصوصية والأمان.',
    toolsTitle: 'أدواتنا السريعة',
    privacyTitle: 'الخصوصية والأمان',
    contactTitle: 'تواصل مباشر',
    tools: {
      'image-compression': {
        label: 'أداة ضغط الصور',
        hint: 'تصغير الحجم للحفاظ على سرعة التصفح',
      },
      'format-converter': {
        label: 'تحويل صيغ الصور',
        hint: 'تحويل بين WebP, PNG, JPEG',
      },
      'pdf-compression': {
        label: 'ضغط ملفات PDF',
        hint: 'تقليل حجم المستندات الممسوخة',
      },
      'prosecution-portal': {
        label: 'بوابة النيابة العامة',
        hint: 'ضبط الحجم تلقائياً لأقل من 500KB',
      },
    },
    privacyLink: 'سياسة الخصوصية وحماية البيانات',
    termsLink: 'شروط وأحكام الاستخدام',
    mainSiteLink: 'زيارة موقع Data Lynx الرئيسي',
    callUs: 'اتصل بنا',
    support: 'الدعم الفني',
    availableNow: 'متاح الآن',
    whatsapp: 'تحدث عبر واتساب',
    copyright: 'جميع الحقوق محفوظة لـ <strong>Data Lynx Tools</strong>. جميع عمليات المعالجة تتم محلياً 100% على جهازك.',
    backToTop: 'العودة للأعلى',
  },

  tools: {
    common: {
      dropImages: 'اسحب الصور وأفلتها هنا',
      dropPdfs: 'اسحب ملفات PDF وأفلتها هنا',
      dropFiles: 'اسحب الملفات وأفلتها هنا',
      selectImages: 'اختيار الصور',
      selectFiles: 'اختيار الملفات',
      selectPdfFiles: 'اختيار ملفات PDF',
      clearAll: 'مسح الكل',
      processingFile: 'معالجة الملف',
      processingImage: 'معالجة الصورة',
      of: 'من',
      download: 'تحميل',
      downloadAllZip: 'تحميل الكل ZIP',
      originalSize: 'الحجم الأصلي:',
      result: 'النتيجة:',
      removeFile: 'حذف الملف',
    },

    imageCompression: {
      title: 'ضغط الصور',
      description:
        'قلّل حجم صورك مع التحكم في مستوى الضغط، الأبعاد، وصيغة الإخراج، مع تنفيذ المعالجة بالكامل داخل متصفحك.',
      formatsHint: 'JPG, PNG, WebP, BMP',
      settingsTitle: 'إعدادات الضغط',
      settingsSubtitle: 'كل الإعدادات تتم على جهازك',
      levelLabel: 'مستوى الضغط',
      levelLowerQuality: 'جودة أعلى',
      levelSmallerSize: 'حجم أصغر',
      maxDimensionLabel: 'أقصى بُعد للصورة',
      maxDimensionUnchanged: 'بدون تغيير الأبعاد',
      maxDimensionHint: 'الحفاظ على نسبة الأبعاد تلقائيًا',
      outputFormatLabel: 'صيغة الإخراج',
      outputFormatWebp: 'WebP — موصى بها',
      jpegTransparencyWarning:
        'الصور الشفافة ستتحول إلى خلفية غير شفافة.',
      start: 'ابدأ الضغط',
      processing: 'جاري ضغط الصور...',
      itemProcessing: 'جاري الضغط...',
      saved: 'تم توفير',
      emptyHelper: 'يمكنك إضافة عدة صور ومعالجتها دفعة واحدة',
      error: 'تعذر ضغط هذه الصورة. جرّب صيغة أخرى أو صورة أصغر.',
    },

    formatConverter: {
      title: 'تحويل صيغ الصور',
      description:
        'حوّل صورك بين مجموعة واسعة من الصيغ مباشرة داخل متصفحك، دون رفع ملفاتك إلى خادم.',
      settingsTitle: 'إعدادات التحويل',
      settingsSubtitle: 'اختر صيغة الإخراج والإعدادات المناسبة للملفات المحددة.',
      outputFormatLabel: 'صيغة الإخراج',
      outputFormatHint: 'تتغير الخيارات المتاحة حسب الصيغة والمحرك المستخدم.',
      qualityLabel: 'الجودة',
      qualitySmallerSize: 'حجم أصغر',
      qualityHigherQuality: 'جودة أعلى',
      qualityHint: 'التحكم في الجودة متاح للصيغ التي تدعم الضغط الفقدي.',
      maxDimensionLabel: 'أقصى بُعد للصورة',
      maxDimensionUnchanged: 'بدون تغيير',
      maxDimensionHint: 'يتم الحفاظ على نسبة أبعاد الصورة تلقائيًا.',
      runtimeDependentWarning:
        'هذه الصيغة تعتمد جزئيًا على إمكانيات المتصفح ومحرك الصور المتاح. إذا لم يكن الترميز المطلوب متاحًا، ستظهر رسالة واضحة بدل إنشاء ملف غير صالح.',
      iconSizesTitle: 'مقاسات الأيقونات',
      iconSizesDescription:
        'اختر المقاسات المطلوبة. سيتم إنشاء ملف ICO مستقل لكل مقاس، بالإضافة إلى favicon.ico متعدد المقاسات.',
      iconSizesReset: 'تحديد المقاسات الافتراضية',
      iconSizesCurrent: 'المقاسات المحددة حاليًا:',
      iconSizesNone: 'لم يتم اختيار أي مقاس',
      start: 'بدء التحويل',
      startIco: 'إنشاء الأيقونات',
      processing: 'جاري التحويل...',
      itemProcessing: 'جاري معالجة الملف...',
      processingLocal: 'تتم المعالجة محليًا داخل المتصفح.',
      icoResult: 'تم إنشاء',
      icoIcons: 'أيقونات',
      icoFaviconNote: 'بالإضافة إلى favicon.ico متعدد المقاسات',
      saved: 'توفير',
      downloadIcoPack: 'تحميل حزمة ICO',
      emptyHelper: 'يمكنك اختيار عدة ملفات وتحويلها دفعة واحدة.',
      error:
        'تعذر تحويل الملف. تأكد من أن الملف سليم ومدعوم ثم حاول مرة أخرى.',
      outputGroups: {
        common: 'الصيغ الشائعة',
        modern: 'الصيغ الحديثة',
        advanced: 'الصيغ المتقدمة',
        icons: 'الأيقونات',
        technical: 'الصيغ التقنية',
      },
    },

    pdfCompression: {
      title: 'ضغط ملفات PDF',
      description:
        'قلّل حجم ملفات PDF من داخل متصفحك، مع التحكم في جودة الصفحات ودقة المعالجة. لا يتم رفع ملفاتك إلى خادم.',
      dropHint: 'يمكنك اختيار عدة ملفات دفعة واحدة',
      settingsTitle: 'إعدادات الضغط',
      settingsSubtitle: 'اختر مستوى المعالجة المناسب لنوع المستند.',
      modeLabel: 'طريقة الضغط',
      modeSmart: 'ضغط ذكي — موصى به',
      modePreserve: 'الحفاظ على النص',
      modeVisual: 'ضغط بصري قوي',
      modeHint: 'الضغط الذكي يجرب أكثر من مسار ويختار النتيجة الأصغر.',
      dpiLabel: 'دقة الصفحات',
      dpi96: '96 DPI — ضغط قوي',
      dpi120: '120 DPI — متوازن',
      dpi150: '150 DPI — جودة عالية',
      dpi200: '200 DPI — جودة مرتفعة جدًا',
      dpiHint:
        'دقة أعلى تعني جودة أفضل وحجمًا أكبر، خصوصًا في المستندات الممسوحة ضوئيًا.',
      qualityLabel: 'جودة الصور',
      qualitySmallerSize: 'حجم أصغر',
      qualityHigherQuality: 'جودة أعلى',
      qualityHint:
        'يؤثر هذا الخيار على وضع الضغط البصري فقط والجزء البصري من الضغط الذكي.',
      smartTitle: 'الوضع الذكي',
      smartDescription:
        'سنحاول أولًا الحفاظ على بنية المستند، ثم نختبر ضغطًا بصريًا للصفحات. سيتم اختيار الملف الأصغر تلقائيًا.',
      preserveTitle: 'الحفاظ على النص',
      preserveDescription:
        'لن يتم تحويل الصفحات إلى صور، لذلك تبقى إمكانية تحديد النص والبحث فيه محفوظة. قد يكون الانخفاض في الحجم محدودًا لبعض الملفات.',
      visualTitle: 'الضغط البصري',
      visualDescription:
        'سيتم إعادة إنشاء صفحات المستند كصور مضغوطة. هذا مناسب جدًا للمستندات الممسوحة ضوئيًا، لكنه قد يلغي إمكانية تحديد النص والبحث فيه.',
      start: 'ابدأ الضغط',
      processing: 'جاري ضغط PDF...',
      itemProcessing: 'جاري معالجة الصفحات...',
      processingLocal: 'تتم المعالجة بالكامل داخل المتصفح.',
      page: 'الصفحة',
      success: 'تم ضغط الملف بنجاح',
      saved: 'توفير',
      pageCount: 'صفحة',
      textPreserved: 'النص محفوظ',
      pagesAsImages: 'صفحات كصور',
      downloadResult: 'تحميل PDF المضغوط',
      emptyHelper: 'يدعم الموقع معالجة عدة ملفات PDF دفعة واحدة.',
      error:
        'تعذر ضغط ملف PDF. تأكد من أن الملف سليم وغير محمي بكلمة مرور.',
    },

    prosecution: {
      title: 'تجهيز ملفات بوابة النيابة العامة',
      description:
        'ارفع الصورة أو ملف PDF، وسيتولى النظام تلقائيًا ضغطه وتجهيزه ليكون أقل من 500KB دون الحاجة إلى ضبط أي إعدادات.',
      noticeTitle: 'معالجة محلية بالكامل',
      noticeDescription:
        'ملفاتك لا يتم رفعها إلى خوادم Data Lynx. تتم المعالجة داخل متصفحك، ثم يتم إنشاء الملف النهائي على جهازك.',
      formatsHint:
        'JPG · PNG · WebP · GIF · BMP · TIFF · AVIF · HEIC · وغيرها، بالإضافة إلى ملفات PDF',
      requirementBadge: 'الحد المطلوب: أقل من 500KB',
      targetBadge: 'الهدف الداخلي: 480KB',
      selectedFiles: 'الملفات المحددة',
      selectedFilesHint:
        'سيعمل المحرك تلقائيًا على كل ملف حتى الوصول إلى النتيجة المناسبة.',
      start: 'تجهيز الملفات لأقل من 500KB',
      processing: 'جاري تجهيز الملفات...',
      itemProcessing: 'جاري الضغط تلقائيًا...',
      overallHint: 'قد تتم عدة محاولات تلقائية للوصول إلى الحجم المطلوب.',
      processingPage: 'معالجة الصفحة',
      ready: 'جاهز للرفع',
      newSize: 'الحجم الجديد:',
      saved: 'توفير',
      under500: 'أقل من 500KB',
      unchanged: 'بدون إعادة ضغط',
      pagesAsImages: 'صفحات كصور',
      downloadReady: 'تحميل الملف الجاهز',
      failedTitle: 'تعذر الوصول إلى الحجم المطلوب',
      failedSmallest: 'أصغر نتيجة تم الوصول إليها:',
      failedHint: '. الضغط أكثر من ذلك قد يؤثر بشدة على وضوح المستند.',
      downloadFailedResult: 'تحميل النتيجة الأقل من 500KB',
      batchTitle: 'تم تجهيز',
      batchTitleSuffix: 'ملفات',
      batchHint: 'جميع الملفات الناجحة أصبحت جاهزة للرفع.',
      emptyHelper: 'اختر صورة أو PDF وسنتولى الباقي تلقائيًا.',
      error: 'تعذر تجهيز الملف. تأكد من أن الملف سليم وغير محمي.',
      resultMessages: {
        unchanged: 'الملف كان بالفعل ضمن الحد المطلوب ولم تتم إعادة ضغطه.',
        achieved: 'تم تجهيز الملف بنجاح ليكون ضمن الحد المطلوب.',
        nearLimit: 'تم الوصول إلى أقل من 500KB، مع تجاوز الهامش الداخلي بقليل.',
        notAchieved: 'تعذر الوصول إلى أقل من 500KB دون ضغط شديد جدًا.',
      },
    },
  },

  articlesIndex: {
    badge: 'مركز المعرفة',
    titleLine1: 'أفكار وأدلة عملية',
    titleLine2: 'للتعامل مع ملفاتك',
    description:
      'مقالات وأدلة تساعدك على فهم ضغط الصور، تحويل الصيغ، التعامل مع ملفات PDF، وإنشاء الأيقونات وتجهيز الملفات للاستخدام العملي.',
    featuredLabel: 'المقال المميز',
    featuredTitle: 'ابدأ من هنا',
    featuredBadge: 'دليل شامل',
    featuredDate: '8 أكتوبر 2026',
    featuredCardTitle: 'ضغط الصور وتحويل الصيغ وضغط ملفات PDF أونلاين',
    featuredCardDescription:
      'دليل عملي يشرح خدمات Data Lynx Tools، وكيفية ضغط الصور، وتغيير أبعادها، وتحويل صيغها، وإنشاء ICO وfavicon، وضغط ملفات PDF، وتجهيز الصور والمستندات لأحجام محددة مثل 500KB.',
    readArticle: 'قراءة المقال',
    categoriesLabel: 'تصفح حسب الموضوع',
    categoriesTitle: 'استكشف مجالات الأدوات',
    categoryExplore: 'استكشف الأداة ←',
    libraryLabel: 'مكتبة المقالات',
    libraryTitle: 'أحدث المقالات',
    libraryDescription:
      'أدلة عملية تساعدك على فهم التعامل مع الصور وملفات PDF واختيار الطريقة المناسبة لمعالجة ملفاتك.',
    whyLabel: 'لماذا هذا القسم؟',
    whyTitle: 'الأدوات وحدها لا تكفي',
    whyParagraph1:
      'أداة ضغط الصور تساعدك على إنجاز المهمة، لكن فهم سبب اختلاف أحجام الملفات والصيغ وطرق الضغط يساعدك على اختيار الإعداد المناسب والحصول على نتيجة أفضل.',
    whyParagraph2:
      'لذلك يجمع مركز المعرفة بين الأدوات العملية والمحتوى التعليمي، بحيث يستطيع المستخدم الانتقال من فهم المشكلة إلى حلها مباشرة.',
    whyCta: 'تجربة أدوات Data Lynx',
    categories: {
      imageCompression: {
        title: 'ضغط الصور',
        description:
          'تعرف على طرق تقليل حجم الصور والحفاظ على أفضل توازن بين الجودة والحجم.',
      },
      formatConverter: {
        title: 'تحويل الصيغ',
        description:
          'دليل لفهم صيغ الصور المختلفة ومتى تستخدم JPG أو PNG أو WebP أو AVIF وغيرها.',
      },
      pdf: {
        title: 'ملفات PDF',
        description:
          'تعرف على طرق ضغط ملفات PDF والمستندات الممسوحة ضوئيًا وتقليل حجمها.',
      },
      ico: {
        title: 'ملفات ICO',
        description:
          'تعرف على ملفات ICO وطريقة إنشاء favicon وأيقونات متعددة المقاسات.',
      },
    },
    articles: {
      'compress-image-500kb': {
        title: 'كيف تقلل حجم الصورة إلى أقل من 500KB؟',
        description:
          'دليل عملي لفهم أسباب كبر حجم الصور وكيفية تقليلها باستخدام الجودة والأبعاد والصيغة المناسبة مع الحفاظ على أفضل وضوح ممكن.',
        tag: 'ضغط الصور',
      },
      'jpg-vs-webp-vs-png-avif': {
        title: 'JPG أم PNG أم WebP أم AVIF؟',
        description:
          'دليل عملي لفهم أشهر صيغ الصور ومقارنة استخداماتها واختيار الصيغة المناسبة حسب الجودة والحجم والشفافية والويب.',
        tag: 'صيغ الصور',
      },
    },
  },

  articleTitles: {
    'compress-image-500kb': 'كيف تقلل حجم الصورة إلى أقل من 500KB؟',
    'jpg-vs-webp-vs-png-avif':
      'JPG أم PNG أم WebP أم AVIF؟ دليل اختيار صيغة الصورة المناسبة',
  },

  privacy: {
    badge: 'خصوصيتك مهمة لدينا',
    title: 'سياسة الخصوصية',
    description:
      'توضح هذه الصفحة كيفية تعامل Data Lynx Tools مع الملفات والمعلومات التقنية وملفات تعريف الارتباط عند استخدام خدمات الموقع.',
    lastUpdated: 'آخر تحديث: 8 أكتوبر 2026',
    noticeTitle: 'معالجة الملفات محليًا',
    noticeDescription:
      'أدوات Data Lynx Tools مصممة لمعالجة الصور وملفات PDF داخل متصفح المستخدم. لا نطلب منك رفع ملفاتك إلى خادم Data Lynx من أجل ضغطها أو تحويلها.',
    backHome: 'العودة إلى Data Lynx Tools',
    disclaimer:
      'هذه السياسة تصف طريقة تشغيل Data Lynx Tools والبيانات التي قد تتم معالجتها من خلال الخدمات المستخدمة على الموقع. وهي ليست استشارة قانونية، وقد تحتاج إلى تحديثها عندما تتم إضافة خدمات أو تقنيات جديدة إلى الموقع.',
  },

  terms: {
    kicker: 'LEGAL',
    title: 'سياسة الاستخدام',
    description: 'يوضح هذا المستند الشروط التي تحكم استخدامك لأدوات Data Lynx Tools.',
    lastUpdated: 'آخر تحديث: 8 أكتوبر 2026',
    contentsTitle: 'المحتويات',
    indexLabel: 'فهرس الصفحة',
    backHome: '→ العودة إلى الرئيسية',
  },

  articlePage: {
    tocTitle: 'محتويات المقال',
    tryTools: 'تجربة الأدوات',
    toolCta: 'تجربة أدوات Data Lynx',
    privacyCta: 'قراءة سياسة الخصوصية',
    updatedLabel: 'آخر تحديث: 8 أكتوبر 2026',
    updatedShort: 'تحديث: 8 أكتوبر 2026',
    authorLabel: 'Data Lynx Tools',
    breadcrumbGuides: 'دليل Data Lynx Tools',
    breadcrumbPractical: 'دليل عملي',
    breadcrumbFormats: 'دليل صيغ الصور',
    readComprehensiveGuide: 'قراءة الدليل الشامل',
  },

  languages: {
    ar: 'العربية',
    en: 'English',
    switchTo: 'English',
  },
};
