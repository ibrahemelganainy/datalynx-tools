import Link from 'next/link';

import Navbar from '../components/Navbar';

import Footer from '../components/Footer';

export const metadata = {

  title:
    'مركز المعرفة | Data Lynx Tools',

  description:
    'أدلة ومقالات عملية حول ضغط الصور وتحويل صيغها وضغط ملفات PDF وإنشاء ICO وتجهيز الملفات لأحجام محددة باستخدام أدوات Data Lynx Tools.',

  keywords: [
    'مركز المعرفة',
    'ضغط الصور',
    'تحويل الصور',
    'ضغط PDF',
    'ICO',
    'favicon',
    '500KB',
    'Data Lynx Tools',
  ],

  alternates: {

    canonical:
      'https://tools.datalynx.space/articles',

  },

  openGraph: {

    title:
      'مركز المعرفة | Data Lynx Tools',

    description:
      'أدلة ومقالات عملية حول التعامل مع الصور وملفات PDF وتحويل الصيغ وتقليل أحجام الملفات.',

    url:
      'https://tools.datalynx.space/articles',

    siteName: 'Data Lynx Tools',

    type: 'website',

    locale: 'ar_EG',

  },

};

const categories = [

  {

    title: 'ضغط الصور',

    description:
      'تعرف على طرق تقليل حجم الصور والحفاظ على أفضل توازن بين الجودة والحجم.',

    href: '/#image-compression',

    icon: '01',

    className:
      'border-blue-500/20 bg-blue-500/5 hover:border-blue-500/40',

    iconClass:
      'bg-blue-500/10 text-blue-400',

  },

  {

    title: 'تحويل الصيغ',

    description:
      'دليل لفهم صيغ الصور المختلفة ومتى تستخدم JPG أو PNG أو WebP أو AVIF وغيرها.',

    href: '/#format-converter',

    icon: '02',

    className:
      'border-emerald-500/20 bg-emerald-500/5 hover:border-emerald-500/40',

    iconClass:
      'bg-emerald-500/10 text-emerald-400',

  },

  {

    title: 'ملفات PDF',

    description:
      'تعرف على طرق ضغط ملفات PDF والمستندات الممسوحة ضوئيًا وتقليل حجمها.',

    href: '/#pdf-compression',

    icon: '03',

    className:
      'border-rose-500/20 bg-rose-500/5 hover:border-rose-500/40',

    iconClass:
      'bg-rose-500/10 text-rose-400',

  },

  {

    title: 'ملفات ICO',

    description:
      'تعرف على ملفات ICO وطريقة إنشاء favicon وأيقونات متعددة المقاسات.',

    href: '/#format-converter',

    icon: '04',

    className:
      'border-violet-500/20 bg-violet-500/5 hover:border-violet-500/40',

    iconClass:
      'bg-violet-500/10 text-violet-400',

  },

];

/*
 * المقالات المنشورة حاليًا
 * يتم عرضها كرابط مباشر إلى صفحات المقالات الفعلية.
 */
const plannedArticles = [

  {

    number: '01',

    title:
      'كيف تقلل حجم الصورة إلى أقل من 500KB؟',

    description:
      'دليل عملي لفهم أسباب كبر حجم الصور وكيفية تقليلها باستخدام الجودة والأبعاد والصيغة المناسبة مع الحفاظ على أفضل وضوح ممكن.',

    tag: 'ضغط الصور',

    href:
      '/articles/compress-image-500kb',

  },

  {

    number: '02',

    title:
      'JPG أم PNG أم WebP أم AVIF؟',

    description:
      'دليل عملي لفهم أشهر صيغ الصور ومقارنة استخداماتها واختيار الصيغة المناسبة حسب الجودة والحجم والشفافية والويب.',

    tag: 'صيغ الصور',

    href:
      '/articles/jpg-vs-webp-vs-png-avif',

  },

];

export default function ArticlesPage() {

  return (

    <div
      className="min-h-screen bg-[#020617] text-slate-100 font-sans"
      dir="rtl"
    >

      <Navbar />

      <main className="pt-32 pb-20">

        {/* =========================================
            Hero
        ========================================== */}

        <section className="relative overflow-hidden">

          <div className="absolute inset-0 pointer-events-none">

            <div className="absolute top-0 right-1/4 w-[550px] h-[550px] rounded-full bg-datalynx-primary/10 blur-[160px]" />

            <div className="absolute bottom-0 left-1/4 w-[450px] h-[450px] rounded-full bg-blue-500/5 blur-[160px]" />

            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10" />

          </div>

          <div className="max-w-7xl mx-auto px-5 sm:px-6 relative z-10">

            <div className="max-w-4xl mx-auto text-center">

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-datalynx-primary/20 bg-datalynx-primary/5 text-datalynx-primary text-sm font-bold mb-7">

                <span className="w-2 h-2 rounded-full bg-datalynx-primary" />

                مركز المعرفة

              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">

                أفكار وأدلة عملية

                <br className="hidden sm:block" />

                للتعامل مع ملفاتك

              </h1>

              <p className="text-base md:text-lg text-white leading-8 max-w-3xl mx-auto">

                مقالات وأدلة تساعدك على فهم ضغط الصور،

                تحويل الصيغ، التعامل مع ملفات PDF،

                وإنشاء الأيقونات وتجهيز الملفات للاستخدام

                العملي.

              </p>

            </div>

          </div>

        </section>

        {/* =========================================
            Featured Article
        ========================================== */}

        <section className="max-w-7xl mx-auto px-5 sm:px-6 mt-16">

          <div className="flex items-center justify-between gap-4 mb-7">

            <div>

              <span className="text-sm font-bold text-datalynx-primary">

                المقال المميز

              </span>

              <h2 className="text-2xl md:text-3xl font-black text-white mt-2">

                ابدأ من هنا

              </h2>

            </div>

            <span className="hidden sm:inline-flex px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-sm text-white">

              دليل شامل

            </span>

          </div>

          <Link
            href="/articles/image-pdf-compression-tools"
            className="group block relative overflow-hidden rounded-[2rem] border border-datalynx-primary/20 bg-gradient-to-br from-datalynx-primary/10 via-slate-900/80 to-blue-500/5 hover:border-datalynx-primary/40 transition-all duration-500 cursor-pointer"
          >

            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative p-6 sm:p-8 md:p-10">

              <div className="flex flex-col lg:flex-row lg:items-center gap-8">

                {/* Visual */}

                <div className="shrink-0">

                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-slate-950 border border-slate-800 flex items-center justify-center shadow-2xl group-hover:scale-105 transition-transform duration-500">

                    <div className="text-center">

                      <div className="text-2xl font-black text-datalynx-primary">

                        DL

                      </div>

                      <div className="text-[10px] text-white mt-1">

                        TOOLS

                      </div>

                    </div>

                  </div>

                </div>

                {/* Text */}

                <div className="flex-1">

                  <div className="flex flex-wrap items-center gap-2 mb-4">

                    <span className="px-3 py-1 rounded-full bg-datalynx-primary/10 border border-datalynx-primary/20 text-datalynx-primary text-xs font-bold">

                      دليل شامل

                    </span>

                    <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-white text-xs">

                      8 أكتوبر 2026

                    </span>

                  </div>

                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight mb-4 group-hover:text-datalynx-primary transition-colors">

                    ضغط الصور وتحويل الصيغ

                    <br className="hidden md:block" />

                    وضغط ملفات PDF أونلاين

                  </h3>

                  <p className="text-base text-white leading-8 max-w-3xl">

                    دليل عملي يشرح خدمات Data Lynx Tools،

                    وكيفية ضغط الصور، وتغيير أبعادها،

                    وتحويل صيغها، وإنشاء ICO وfavicon،

                    وضغط ملفات PDF، وتجهيز الصور والمستندات

                    لأحجام محددة مثل 500KB.

                  </p>

                  <div className="mt-7 inline-flex items-center gap-3 text-sm font-black text-datalynx-primary">

                    <span>

                      قراءة المقال

                    </span>

                    <span className="w-9 h-9 rounded-full border border-datalynx-primary/30 flex items-center justify-center group-hover:-translate-x-1 transition-transform">

                      ←

                    </span>

                  </div>

                </div>

              </div>

            </div>

          </Link>

        </section>

        {/* =========================================
            Categories
        ========================================== */}

        <section className="max-w-7xl mx-auto px-5 sm:px-6 mt-16">

          <div className="mb-7">

            <span className="text-sm font-bold text-datalynx-primary">

              تصفح حسب الموضوع

            </span>

            <h2 className="text-2xl md:text-3xl font-black text-white mt-2">

              استكشف مجالات الأدوات

            </h2>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

            {categories.map((category) => (

              <Link
                key={category.title}
                href={category.href}
                className={`group p-5 rounded-3xl border transition-all duration-300 hover:-translate-y-1 cursor-pointer ${category.className}`}
              >

                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 font-black ${category.iconClass}`}
                >

                  {category.icon}

                </div>

                <h3 className="text-lg font-black text-white mb-2">

                  {category.title}

                </h3>

                <p className="text-sm text-white leading-7">

                  {category.description}

                </p>

                <div className="mt-5 text-sm font-bold text-white group-hover:text-datalynx-primary transition-colors">

                  استكشف الأداة ←

                </div>

              </Link>

            ))}

          </div>

        </section>

        {/* =========================================
            Articles
        ========================================== */}

        <section className="max-w-7xl mx-auto px-5 sm:px-6 mt-16">

          <div className="mb-7">

            <span className="text-sm font-bold text-datalynx-primary">

              مكتبة المقالات

            </span>

            <h2 className="text-2xl md:text-3xl font-black text-white mt-2">

              أحدث المقالات

            </h2>

            <p className="text-sm md:text-base text-white leading-7 mt-3 max-w-3xl">

              أدلة عملية تساعدك على فهم التعامل مع الصور
              وملفات PDF واختيار الطريقة المناسبة لمعالجة
              ملفاتك.

            </p>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {plannedArticles.map((article) => (

              <Link
                key={article.number}
                href={article.href}
                className="group block p-6 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-datalynx-primary/30 hover:bg-slate-900/80 transition-all duration-300 cursor-pointer"
              >

                <div className="flex items-start gap-4">

                  <div className="w-12 h-12 shrink-0 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-datalynx-primary font-black">

                    {article.number}

                  </div>

                  <div className="flex-1">

                    <span className="inline-flex px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs text-white mb-3">

                      {article.tag}

                    </span>

                    <h3 className="text-lg md:text-xl font-black text-white mb-2 group-hover:text-datalynx-primary transition-colors">

                      {article.title}

                    </h3>

                    <p className="text-sm text-white leading-7">

                      {article.description}

                    </p>

                    <div className="mt-5 text-sm font-bold text-datalynx-primary">

                      قراءة المقال ←

                    </div>

                  </div>

                </div>

              </Link>

            ))}

          </div>

        </section>

        {/* =========================================
            Why Knowledge Center
        ========================================== */}

        <section className="max-w-7xl mx-auto px-5 sm:px-6 mt-16">

          <div className="rounded-[2rem] border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-6 sm:p-8 md:p-10">

            <div className="max-w-3xl">

              <span className="text-sm font-bold text-datalynx-primary">

                لماذا هذا القسم؟

              </span>

              <h2 className="text-2xl md:text-3xl font-black text-white mt-2 mb-5">

                الأدوات وحدها لا تكفي

              </h2>

              <div className="space-y-4 text-base text-white leading-8">

                <p>

                  أداة ضغط الصور تساعدك على إنجاز المهمة،

                  لكن فهم سبب اختلاف أحجام الملفات والصيغ

                  وطرق الضغط يساعدك على اختيار الإعداد المناسب

                  والحصول على نتيجة أفضل.

                </p>

                <p>

                  لذلك يجمع مركز المعرفة بين الأدوات العملية

                  والمحتوى التعليمي، بحيث يستطيع المستخدم

                  الانتقال من فهم المشكلة إلى حلها مباشرة.

                </p>

              </div>

              <div className="mt-7">

                <Link
                  href="/"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-datalynx-primary text-white font-black hover:opacity-90 transition-all cursor-pointer"
                >

                  تجربة أدوات Data Lynx

                </Link>

              </div>

            </div>

          </div>

        </section>

      </main>

      <Footer />

    </div>

  );

}
