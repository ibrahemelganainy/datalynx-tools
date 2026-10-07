import Link from 'next/link';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export const metadata = {
  title:
    'ضغط الصور وتحويل الصيغ وضغط ملفات PDF أونلاين | Data Lynx Tools',

  description:
    'دليل شامل لاستخدام أدوات Data Lynx Tools لضغط الصور، تغيير أبعادها، تحويل صيغها، إنشاء ICO وfavicon، وضغط ملفات PDF وتجهيز الملفات لأقل من 500KB.',

  keywords: [
    'ضغط الصور أونلاين',
    'تصغير حجم الصور',
    'ضغط الصور',
    'تحويل صيغ الصور',
    'تحويل JPG إلى WebP',
    'تحويل PNG إلى JPG',
    'تحويل الصورة إلى ICO',
    'إنشاء favicon',
    'ضغط PDF',
    'تصغير حجم PDF',
    'ضغط ملف PDF',
    'صورة أقل من 500KB',
    'ضغط الصور للنيابة العامة',
  ],

  alternates: {
    canonical:
      'https://tools.datalynx.space/articles/image-pdf-compression-tools',
  },

  openGraph: {
    title:
      'ضغط الصور وتحويل الصيغ وضغط ملفات PDF أونلاين',
    description:
      'دليل عملي لاستخدام أدوات Data Lynx Tools لمعالجة الصور وملفات PDF وتحويل صيغها.',
    url:
      'https://tools.datalynx.space/articles/image-pdf-compression-tools',
    siteName: 'Data Lynx Tools',
    type: 'article',
    locale: 'ar_EG',
  },
};

const tocItems = [
  {
    id: 'what-is-datalynx-tools',
    title: 'ما هي Data Lynx Tools؟',
  },
  {
    id: 'image-compression',
    title: 'ضغط الصور أونلاين',
  },
  {
    id: 'image-conversion',
    title: 'تحويل صيغ الصور',
  },
  {
    id: 'ico',
    title: 'تحويل الصور إلى ICO وإنشاء favicon',
  },
  {
    id: 'pdf-compression',
    title: 'ضغط ملفات PDF',
  },
  {
    id: 'prosecution',
    title: 'تجهيز الملفات لأقل من 500KB',
  },
  {
    id: 'privacy',
    title: 'لماذا تتم المعالجة داخل المتصفح؟',
  },
  {
    id: 'choose-tool',
    title: 'كيف تختار الأداة المناسبة؟',
  },
  {
    id: 'faq',
    title: 'الأسئلة الشائعة',
  },
];

const relatedTools = [
  {
    href: '/#image-compression',
    title: 'ضغط الصور',
    description:
      'تقليل حجم الصور مع التحكم في الجودة والأبعاد وصيغة الإخراج.',
    className:
      'border-blue-500/20 bg-blue-500/5 hover:border-blue-500/40',
    iconClass:
      'bg-blue-500/10 text-blue-400',
  },
  {
    href: '/#format-converter',
    title: 'تحويل الصيغ',
    description:
      'تحويل الصور بين مجموعة واسعة من الصيغ وإنشاء حزم ICO.',
    className:
      'border-emerald-500/20 bg-emerald-500/5 hover:border-emerald-500/40',
    iconClass:
      'bg-emerald-500/10 text-emerald-400',
  },
  {
    href: '/#pdf-compression',
    title: 'ضغط PDF',
    description:
      'تقليل حجم ملفات PDF مع أوضاع مختلفة للمستندات النصية والممسوحة.',
    className:
      'border-rose-500/20 bg-rose-500/5 hover:border-rose-500/40',
    iconClass:
      'bg-rose-500/10 text-rose-400',
  },
  {
    href: '/#prosecution-portal',
    title: 'بوابة النيابة العامة',
    description:
      'تجهيز الصور وملفات PDF تلقائيًا للوصول إلى حد أقل من 500KB.',
    className:
      'border-amber-500/20 bg-amber-500/5 hover:border-amber-500/40',
    iconClass:
      'bg-amber-500/10 text-amber-400',
  },
];

const faqItems = [
  {
    question:
      'هل تحتاج Data Lynx Tools إلى تثبيت برنامج؟',
    answer:
      'لا. الأدوات مصممة للعمل مباشرة من متصفح الويب، دون الحاجة إلى تثبيت برنامج منفصل لمعالجة الملفات.',
  },
  {
    question:
      'هل يتم رفع الصور إلى خادم Data Lynx؟',
    answer:
      'أدوات المعالجة الأساسية مصممة بحيث تتم معالجة الملفات داخل متصفح المستخدم، بدل رفع الملف إلى خادم مركزي تابع لـ Data Lynx لأغراض الضغط أو التحويل.',
  },
  {
    question:
      'ما الفرق بين ضغط الصور وتحويل الصيغة؟',
    answer:
      'ضغط الصور يركز على تقليل حجم الملف، بينما تحويل الصيغة يغير نوع الملف نفسه، مثل تحويل PNG إلى WebP أو JPEG إلى PNG. ويمكن الجمع بين العمليتين عند الحاجة.',
  },
  {
    question:
      'هل يمكن تحويل الصورة إلى ICO؟',
    answer:
      'نعم. أداة تحويل الصيغ توفر مسارًا خاصًا لإنشاء ملفات ICO بمقاسات متعددة، كما يمكن إنشاء favicon.ico وحزمة ZIP تحتوي على الأيقونات.',
  },
  {
    question:
      'هل يمكن ضغط عدة ملفات مرة واحدة؟',
    answer:
      'نعم. الأدوات تدعم معالجة مجموعة من الملفات في الحالات المناسبة، ويمكن تنزيل النتائج على شكل ملفات منفصلة أو حزمة ZIP.',
  },
  {
    question:
      'هل كل ملفات PDF يتم ضغطها بالطريقة نفسها؟',
    answer:
      'لا. تختلف طريقة الضغط حسب طبيعة المستند. ملفات PDF النصية تختلف عن الملفات الممسوحة ضوئيًا، ولذلك توفر أداة PDF أكثر من نمط للمعالجة.',
  },
  {
    question:
      'هل يمكن تجهيز ملف ليصبح أقل من 500KB؟',
    answer:
      'نعم، توفر المنصة أداة مخصصة لذلك. تحاول الأداة تلقائيًا الوصول إلى حجم آمن أقل من الحد المستهدف، مع الحفاظ على جودة عملية قدر الإمكان.',
  },
  {
    question:
      'هل أداة بوابة النيابة العامة تابعة للنيابة العامة؟',
    answer:
      'لا. الاسم يصف حالة استخدام الأداة لتجهيز الملفات وفق حد الحجم المطلوب، والمنصة ليست خدمة رسمية تابعة للنيابة العامة أو ممثلة لها.',
  },
];

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

export default function ImagePdfCompressionArticlePage() {
  return (
    <div
      className="min-h-screen bg-[#020617] text-slate-100 font-sans"
      dir="rtl"
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
                دليل Data Lynx Tools
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.25] mb-7">
                ضغط الصور وتحويل الصيغ
                <br className="hidden sm:block" />
                وضغط ملفات PDF أونلاين
              </h1>

              <p className="text-base md:text-lg text-white leading-8 max-w-3xl mx-auto">
                دليل عملي للتعامل مع الصور وملفات PDF،
                من تقليل الحجم وتغيير الأبعاد والصيغ،
                إلى إنشاء أيقونات ICO وتجهيز الملفات
                لحدود الحجم الصارمة مثل 500KB.
              </p>

              <div className="mt-7 flex flex-wrap items-center justify-center gap-3 text-sm text-white">
                <span className="px-4 py-2 rounded-full bg-slate-900 border border-slate-800">
                  آخر تحديث: 8 أكتوبر 2026
                </span>

                <span className="px-4 py-2 rounded-full bg-slate-900 border border-slate-800">
                  Data Lynx Tools
                </span>
              </div>

            </div>

            {/* Article introduction card */}
            <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-slate-900/70 backdrop-blur-xl border border-slate-800 shadow-2xl">

              <p className="text-base md:text-lg text-white leading-9">
                أصبحت معالجة الصور والمستندات الرقمية جزءًا
                طبيعيًا من العمل اليومي. قد يحتاج المستخدم إلى
                إرسال صورة عبر البريد الإلكتروني، أو رفعها إلى
                نظام إلكتروني، أو تحويلها إلى صيغة أخرى، أو
                تقليل حجم مستند PDF كبير حتى يصبح من الممكن
                مشاركته بسهولة.
              </p>

              <p className="mt-5 text-base md:text-lg text-white leading-9">
                المشكلة أن البرامج التقليدية لا تكون متاحة
                دائمًا، وبعض خدمات الويب تطلب رفع الملفات إلى
                خوادمها قبل معالجتها. من هنا جاءت فكرة
                <strong className="text-datalynx-primary">
                  {' '}
                  Data Lynx Tools
                </strong>{' '}
                كمساحة مجانية تجمع مجموعة من الأدوات العملية
                التي تعمل مباشرة من المتصفح.
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
                    محتويات المقال
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
                      تجربة الأدوات
                    </Link>
                  </div>

                </div>

              </aside>

              {/* Article Body */}
              <div className="order-1 lg:order-2 space-y-7 min-w-0">

                {/* =====================================
                    What is Data Lynx
                ====================================== */}
                <section
                  id="what-is-datalynx-tools"
                  className="scroll-mt-28 p-6 sm:p-8 md:p-10 rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-slate-800"
                >
                  <SectionTitle>
                    ما هي Data Lynx Tools؟
                  </SectionTitle>

                  <div className="space-y-5 text-base text-white leading-9">

                    <p>
                      Data Lynx Tools هي منصة مجانية تقدم
                      مجموعة من الأدوات لمعالجة الصور وملفات
                      PDF مباشرة من متصفح الويب.
                    </p>

                    <p>
                      بدل الانتقال بين عدة برامج ومواقع،
                      يستطيع المستخدم الوصول من مساحة عمل
                      واحدة إلى أدوات ضغط الصور، وتحويل صيغ
                      الصور، وضغط PDF، وتجهيز الملفات لحدود
                      حجم محددة.
                    </p>

                    <p>
                      التصميم قائم على فكرة بسيطة:
                      <strong className="text-white">
                        {' '}
                        اختر الملف، اختر العملية، ثم احصل
                        على النتيجة.
                      </strong>
                    </p>

                  </div>

                  <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      'ضغط الصور',
                      'تحويل صيغ الصور',
                      'ضغط ملفات PDF',
                      'تجهيز الملفات لأقل من 500KB',
                    ].map((item) => (
                      <div
                        key={item}
                        className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-white font-bold"
                      >
                        <span className="text-datalynx-primary ml-2">
                          ✓
                        </span>
                        {item}
                      </div>
                    ))}
                  </div>
                </section>

                {/* =====================================
                    Image Compression
                ====================================== */}
                <section
                  id="image-compression"
                  className="scroll-mt-28 p-6 sm:p-8 md:p-10 rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-slate-800"
                >
                  <SectionTitle>
                    ضغط الصور أونلاين
                  </SectionTitle>

                  <div className="space-y-5 text-base text-white leading-9">

                    <p>
                      حجم الصورة يتأثر بعدة عوامل، من بينها
                      أبعاد الصورة، وعدد البكسلات، ونوع
                      الترميز، وجودة الضغط، ووجود بيانات إضافية
                      داخل الملف.
                    </p>

                    <p>
                      لذلك فإن تصغير حجم الصورة لا يعني
                      بالضرورة التضحية الكبيرة بجودتها. في كثير
                      من الحالات يمكن الحصول على فرق كبير في
                      الحجم من خلال اختيار أبعاد مناسبة وصيغة
                      أكثر كفاءة ومستوى ضغط متوازن.
                    </p>

                    <p>
                      توفر أداة ضغط الصور في Data Lynx Tools
                      إعدادات تسمح بالتحكم في مستوى الضغط، وأقصى
                      بُعد للصورة، وصيغة الإخراج.
                    </p>

                  </div>

                  <div className="mt-8 overflow-hidden rounded-2xl border border-slate-800">
                    <div className="grid grid-cols-1 md:grid-cols-3 bg-slate-950/70">

                      <div className="p-5 border-b md:border-b-0 md:border-l border-slate-800">
                        <h3 className="text-white font-black mb-2">
                          الجودة
                        </h3>

                        <p className="text-sm text-white leading-7">
                          اختر التوازن المناسب بين وضوح
                          الصورة وحجم الملف.
                        </p>
                      </div>

                      <div className="p-5 border-b md:border-b-0 md:border-l border-slate-800">
                        <h3 className="text-white font-black mb-2">
                          الأبعاد
                        </h3>

                        <p className="text-sm text-white leading-7">
                          يمكنك تحديد أقصى بُعد مع الحفاظ
                          على نسبة الأبعاد.
                        </p>
                      </div>

                      <div className="p-5">
                        <h3 className="text-white font-black mb-2">
                          الصيغة
                        </h3>

                        <p className="text-sm text-white leading-7">
                          اختر صيغة إخراج مناسبة للغرض
                          الذي ستستخدم الصورة من أجله.
                        </p>
                      </div>

                    </div>
                  </div>

                  <div className="mt-8">
                    <Link
                      href="/#image-compression"
                      className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-blue-500 text-white font-black hover:bg-blue-400 transition-all cursor-pointer"
                    >
                      تجربة أداة ضغط الصور
                    </Link>
                  </div>
                </section>

                {/* =====================================
                    Image Conversion
                ====================================== */}
                <section
                  id="image-conversion"
                  className="scroll-mt-28 p-6 sm:p-8 md:p-10 rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-slate-800"
                >
                  <SectionTitle>
                    تحويل صيغ الصور
                  </SectionTitle>

                  <div className="space-y-5 text-base text-white leading-9">

                    <p>
                      أحيانًا تكون المشكلة في صيغة الصورة
                      وليس حجمها. قد يحتاج المستخدم إلى تحويل
                      ملف من PNG إلى JPG، أو من JPG إلى WebP،
                      أو استخدام صيغة أخرى تناسب نظامًا أو
                      تطبيقًا معينًا.
                    </p>

                    <p>
                      لهذا تدعم أداة التحويل مجموعة واسعة من
                      الصيغ، بما في ذلك الصيغ الشائعة والصيغ
                      المتقدمة والتقنية.
                    </p>

                    <p>
                      تشمل حالات الاستخدام الشائعة تحويل
                      الصور لأغراض النشر على الويب، تجهيز الصور
                      لبعض الأنظمة، أو إنشاء ملفات بامتدادات
                      مختلفة من الصورة الأصلية.
                    </p>

                  </div>

                  <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {[
                      'JPG / JPEG',
                      'PNG',
                      'WebP',
                      'GIF',
                      'BMP',
                      'TIFF / TIF',
                      'TGA',
                      'AVIF',
                      'HEIC / HEIF',
                      'ICO',
                      'DNG',
                      'PSD',
                    ].map((format) => (
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
                      تجربة أداة تحويل الصيغ
                    </Link>
                  </div>
                </section>

                {/* =====================================
                    ICO
                ====================================== */}
                <section
                  id="ico"
                  className="scroll-mt-28 p-6 sm:p-8 md:p-10 rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-slate-800"
                >
                  <SectionTitle>
                    تحويل الصور إلى ICO وإنشاء favicon
                  </SectionTitle>

                  <div className="space-y-5 text-base text-white leading-9">

                    <p>
                      ملفات ICO تستخدم بشكل شائع للأيقونات،
                      وخصوصًا أيقونة المواقع والتطبيقات والاختصارات
                      في أنظمة مختلفة.
                    </p>

                    <p>
                      لذلك لا تكتفي Data Lynx Tools بتغيير
                      امتداد الملف، بل تتعامل مع ICO كعملية
                      إنشاء أيقونات حقيقية بمقاسات مختلفة.
                    </p>

                    <p>
                      يستطيع المستخدم اختيار عدة مقاسات من
                      نفس الصورة، مثل:
                    </p>

                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    {[
                      '16 × 16',
                      '24 × 24',
                      '32 × 32',
                      '48 × 48',
                      '64 × 64',
                      '128 × 128',
                      '256 × 256',
                    ].map((size) => (
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
                      ماذا تحصل عليه؟
                    </h3>

                    <p className="text-sm text-white leading-8">
                      عند استخدام مسار ICO، يمكن إنشاء ملفات
                      مستقلة للمقاسات المختارة بالإضافة إلى
                      ملف{' '}
                      <InlineCode>
                        favicon.ico
                      </InlineCode>
                      ، ثم جمع الملفات داخل حزمة ZIP واحدة
                      ليسهل تنزيلها واستخدامها.
                    </p>
                  </div>
                </section>

                {/* =====================================
                    PDF
                ====================================== */}
                <section
                  id="pdf-compression"
                  className="scroll-mt-28 p-6 sm:p-8 md:p-10 rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-slate-800"
                >
                  <SectionTitle>
                    ضغط ملفات PDF
                  </SectionTitle>

                  <div className="space-y-5 text-base text-white leading-9">

                    <p>
                      ملفات PDF تختلف عن الصور في طريقة بنائها.
                      فقد يحتوي ملف واحد على نصوص وخطوط ورسومات
                      ومتجهات وصور ممسوحة ضوئيًا.
                    </p>

                    <p>
                      لهذا السبب لا توجد طريقة واحدة تعطي
                      أفضل نتيجة لكل ملفات PDF.
                    </p>

                    <p>
                      إذا كان الملف يحتوي على نص أصلي، فقد
                      يكون من المهم الحفاظ على قابلية تحديد
                      النص والبحث فيه. أما إذا كان المستند
                      عبارة عن صفحات ممسوحة ضوئيًا، فقد تكون
                      الصور هي السبب الرئيسي في تضخم الحجم.
                    </p>

                  </div>

                  <div className="mt-8 space-y-4">

                    <div className="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/15">
                      <h3 className="text-white font-black mb-2">
                        الحفاظ على النص
                      </h3>

                      <p className="text-sm text-white leading-8">
                        يحاول هذا النمط تقليل الحجم دون تحويل
                        صفحات المستند إلى صور، وهو مناسب عندما
                        تكون قابلية تحديد النص والبحث فيه
                        أولوية.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-amber-500/5 border border-amber-500/15">
                      <h3 className="text-white font-black mb-2">
                        الضغط البصري
                      </h3>

                      <p className="text-sm text-white leading-8">
                        يعاد رسم الصفحات كصور مضغوطة ثم يعاد
                        بناء ملف PDF. هذا الأسلوب مناسب جدًا
                        للمستندات الممسوحة ضوئيًا، لكنه قد
                        يجعل النص غير قابل للتحديد إذا كان
                        الملف الأصلي يعتمد على صور الصفحات.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-blue-500/5 border border-blue-500/15">
                      <h3 className="text-white font-black mb-2">
                        الضغط الذكي
                      </h3>

                      <p className="text-sm text-white leading-8">
                        يجرب النظام أكثر من مسار للمعالجة ثم
                        يختار النتيجة الأصغر وفق الإعدادات
                        المستخدمة.
                      </p>
                    </div>

                  </div>

                  <div className="mt-8">
                    <Link
                      href="/#pdf-compression"
                      className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-rose-500 text-white font-black hover:bg-rose-400 transition-all cursor-pointer"
                    >
                      تجربة أداة ضغط PDF
                    </Link>
                  </div>
                </section>

                {/* =====================================
                    Prosecution
                ====================================== */}
                <section
                  id="prosecution"
                  className="scroll-mt-28 p-6 sm:p-8 md:p-10 rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-slate-800"
                >
                  <SectionTitle>
                    تجهيز الملفات لأقل من 500KB
                  </SectionTitle>

                  <div className="space-y-5 text-base text-white leading-9">

                    <p>
                      بعض الأنظمة الإلكترونية تضع حدًا صارمًا
                      لحجم الملف، بحيث يؤدي تجاوز هذا الحد إلى
                      رفض الرفع حتى لو كان المستند نفسه صحيحًا.
                    </p>

                    <p>
                      لهذا توفر Data Lynx Tools مسارًا خاصًا
                      باسم <strong>بوابة النيابة العامة</strong>
                      يركز على حالة استخدام محددة: تجهيز
                      الصورة أو ملف PDF تلقائيًا ليصبح ضمن
                      الحد المطلوب.
                    </p>

                    <p>
                      في هذه الأداة لا يحتاج المستخدم إلى فهم
                      معنى الجودة أو DPI أو أبعاد الصورة. كل ما
                      عليه فعله هو اختيار الملف، ثم يتولى
                      المحرك محاولة الوصول إلى الحجم المستهدف
                      من خلال عدة مستويات من الضغط.
                    </p>

                  </div>

                  <div className="mt-8 p-6 rounded-3xl bg-amber-500/5 border border-amber-500/20">

                    <div className="flex flex-col sm:flex-row gap-5 items-center">

                      <div className="w-16 h-16 shrink-0 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center text-2xl font-black">
                        500
                      </div>

                      <div>
                        <h3 className="text-white text-lg font-black mb-2">
                          الهدف واضح
                        </h3>

                        <p className="text-sm text-white leading-8">
                          الأداة مصممة للوصول إلى حجم أقل من
                          500KB مع ترك هامش داخلي، بدل الضغط إلى
                          الحد النهائي بالضبط.
                        </p>
                      </div>

                    </div>

                  </div>

                  <div className="mt-6 p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
                    <p className="text-sm text-white leading-8">
                      <strong className="text-amber-400">
                        ملاحظة:
                      </strong>{' '}
                      اسم "بوابة النيابة العامة" يصف استخدام
                      الأداة لتجهيز الملفات وفق حد الحجم،
                      ولا يعني أن Data Lynx Tools جهة رسمية
                      تابعة للنيابة العامة أو ممثلة لها.
                    </p>
                  </div>

                  <div className="mt-8">
                    <Link
                      href="/#prosecution-portal"
                      className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-amber-500 text-slate-950 font-black hover:bg-amber-400 transition-all cursor-pointer"
                    >
                      تجربة أداة تجهيز الملفات
                    </Link>
                  </div>
                </section>

                {/* =====================================
                    Privacy
                ====================================== */}
                <section
                  id="privacy"
                  className="scroll-mt-28 p-6 sm:p-8 md:p-10 rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-slate-800"
                >
                  <SectionTitle>
                    لماذا تتم المعالجة داخل المتصفح؟
                  </SectionTitle>

                  <div className="space-y-5 text-base text-white leading-9">

                    <p>
                      تم تصميم أدوات Data Lynx Tools الأساسية
                      بحيث تتم معالجة الملفات داخل متصفح
                      المستخدم. وهذا يقلل الحاجة إلى إرسال
                      الملفات إلى خادم مركزي من أجل تنفيذ
                      عملية الضغط أو التحويل.
                    </p>

                    <p>
                      عند اختيار الملف، يتم تحميله داخل بيئة
                      المتصفح، ثم تقوم JavaScript والمكتبات
                      المستخدمة بقراءة البيانات وتنفيذ عملية
                      التحويل أو الضغط، وبعد ذلك يتم إنشاء الملف
                      الناتج ليتم تنزيله إلى جهاز المستخدم.
                    </p>

                  </div>

                  <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">

                    <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800">
                      <div className="text-datalynx-primary font-black text-xl mb-2">
                        01
                      </div>

                      <h3 className="text-white font-black mb-2">
                        اختيار الملف
                      </h3>

                      <p className="text-sm text-white leading-7">
                        يختار المستخدم الملف من جهازه.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800">
                      <div className="text-datalynx-primary font-black text-xl mb-2">
                        02
                      </div>

                      <h3 className="text-white font-black mb-2">
                        المعالجة
                      </h3>

                      <p className="text-sm text-white leading-7">
                        تتم عملية الضغط أو التحويل داخل
                        المتصفح.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800">
                      <div className="text-datalynx-primary font-black text-xl mb-2">
                        03
                      </div>

                      <h3 className="text-white font-black mb-2">
                        التنزيل
                      </h3>

                      <p className="text-sm text-white leading-7">
                        يتم إنشاء النتيجة وتنزيلها إلى جهاز
                        المستخدم.
                      </p>
                    </div>

                  </div>

                  <div className="mt-7">
                    <Link
                      href="/privacy"
                      className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold hover:bg-slate-700 transition-all cursor-pointer"
                    >
                      قراءة سياسة الخصوصية
                    </Link>
                  </div>
                </section>

                {/* =====================================
                    Choosing tool
                ====================================== */}
                <section
                  id="choose-tool"
                  className="scroll-mt-28 p-6 sm:p-8 md:p-10 rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-slate-800"
                >
                  <SectionTitle>
                    كيف تختار الأداة المناسبة؟
                  </SectionTitle>

                  <div className="overflow-hidden rounded-2xl border border-slate-800">

                    <div className="hidden md:grid grid-cols-[1fr_2fr] bg-slate-950/80 border-b border-slate-800">
                      <div className="p-4 font-black text-white">
                        احتياجك
                      </div>

                      <div className="p-4 font-black text-white">
                        الأداة المناسبة
                      </div>
                    </div>

                    {[
                      {
                        need:
                          'الصورة كبيرة وتريد تقليل حجمها',
                        tool:
                          'ضغط الصور',
                      },
                      {
                        need:
                          'تحتاج تغيير امتداد الصورة',
                        tool:
                          'تحويل الصيغ',
                      },
                      {
                        need:
                          'تريد إنشاء ICO أو favicon',
                        tool:
                          'تحويل الصيغ — ICO',
                      },
                      {
                        need:
                          'ملف PDF كبير الحجم',
                        tool:
                          'ضغط PDF',
                      },
                      {
                        need:
                          'تحتاج الوصول إلى حد أقل من 500KB',
                        tool:
                          'بوابة النيابة العامة',
                      },
                    ].map((row, index) => (
                      <div
                        key={row.need}
                        className={`grid grid-cols-1 md:grid-cols-[1fr_2fr] ${
                          index !== 4
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

                {/* =====================================
                    Related Tools
                ====================================== */}
                <section className="p-6 sm:p-8 md:p-10 rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-slate-800">

                  <SectionTitle>
                    جرّب أدوات Data Lynx Tools
                  </SectionTitle>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    {relatedTools.map(
                      (tool) => (
                        <Link
                          key={
                            tool.title
                          }
                          href={
                            tool.href
                          }
                          className={`group p-5 rounded-2xl border transition-all cursor-pointer ${tool.className}`}
                        >

                          <div
                            className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${tool.iconClass}`}
                          >
                            <span className="font-black">
                              →
                            </span>
                          </div>

                          <h3 className="text-lg font-black text-white mb-2 group-hover:text-white">
                            {tool.title}
                          </h3>

                          <p className="text-sm text-white leading-7">
                            {
                              tool.description
                            }
                          </p>

                        </Link>
                      )
                    )}

                  </div>

                </section>

                {/* =====================================
                    FAQ
                ====================================== */}
                <section
                  id="faq"
                  className="scroll-mt-28 p-6 sm:p-8 md:p-10 rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-slate-800"
                >
                  <SectionTitle>
                    الأسئلة الشائعة
                  </SectionTitle>

                  <div className="space-y-4">

                    {faqItems.map(
                      (item) => (
                        <details
                          key={
                            item.question
                          }
                          className="group rounded-2xl bg-slate-950/70 border border-slate-800 overflow-hidden"
                        >

                          <summary className="flex items-center justify-between gap-4 p-5 text-white font-bold cursor-pointer list-none">
                            <span>
                              {
                                item.question
                              }
                            </span>

                            <span className="w-8 h-8 shrink-0 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center transition-transform group-open:rotate-45">
                              +
                            </span>
                          </summary>

                          <div className="px-5 pb-5">
                            <p className="text-sm md:text-base text-white leading-8">
                              {
                                item.answer
                              }
                            </p>
                          </div>

                        </details>
                      )
                    )}

                  </div>
                </section>

                {/* =====================================
                    Conclusion
                ====================================== */}
                <section className="p-6 sm:p-8 md:p-10 rounded-3xl bg-gradient-to-br from-datalynx-primary/10 via-slate-900/70 to-blue-500/5 border border-datalynx-primary/20">

                  <h2 className="text-2xl md:text-3xl font-black text-white mb-5">
                    الخلاصة
                  </h2>

                  <div className="space-y-5 text-base text-white leading-9">

                    <p>
                      التعامل مع الصور وملفات PDF لا يحتاج
                      دائمًا إلى برامج ضخمة أو خطوات معقدة.
                      في كثير من الاستخدامات اليومية، يكون
                      المطلوب مجرد ضغط ملف، تغيير صيغة، تقليل
                      أبعاد، أو تجهيز مستند وفق حد معين للحجم.
                    </p>

                    <p>
                      تجمع Data Lynx Tools هذه العمليات في
                      مساحة واحدة مع التركيز على سهولة الاستخدام
                      والمعالجة المحلية داخل المتصفح.
                    </p>

                    <p className="font-bold text-white">
                      اختر الأداة المناسبة، ارفع الملف، ودع
                      المتصفح يتولى المعالجة.
                    </p>

                  </div>

                  <div className="mt-8 flex flex-col sm:flex-row gap-3">

                    <Link
                      href="/"
                      className="flex-1 inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-datalynx-primary text-white font-black hover:opacity-90 transition-all cursor-pointer"
                    >
                      فتح Data Lynx Tools
                    </Link>

                    <Link
                      href="/privacy"
                      className="sm:w-52 inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold hover:bg-slate-700 transition-all cursor-pointer"
                    >
                      سياسة الخصوصية
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
