import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

import LocalLink from '../../../components/LocalLink';

export const metadata = {
  title:
    'JPG أم PNG أم WebP أم AVIF؟ دليل اختيار صيغة الصورة المناسبة | Data Lynx Tools',

  description:
    'تعرف على الفرق بين JPG وPNG وWebP وAVIF وGIF وTIFF وICO، ومتى تستخدم كل صيغة، وكيف تختار الصيغة المناسبة للحجم والجودة والويب.',

  keywords: [
    'JPG أم WebP',
    'PNG أم WebP',
    'AVIF أم WebP',
    'أفضل صيغة للصور',
    'أفضل صيغة للويب',
    'الفرق بين JPG وPNG',
    'الفرق بين WebP وJPG',
    'تحويل JPG إلى WebP',
    'تحويل PNG إلى JPG',
    'تحويل الصور',
    'ICO',
  ],

  alternates: {
    canonical:
      'https://tools.datalynx.space/articles/jpg-vs-webp-vs-png-avif',

    languages: {
      ar: 'https://tools.datalynx.space/articles/jpg-vs-webp-vs-png-avif',
      en: 'https://tools.datalynx.space/en/articles/image-format-comparison',
      'x-default':
        'https://tools.datalynx.space/articles/jpg-vs-webp-vs-png-avif',
    },
  },

  openGraph: {
    title:
      'JPG أم PNG أم WebP أم AVIF؟',
    description:
      'دليل عملي لاختيار صيغة الصورة المناسبة حسب الجودة والحجم والاستخدام.',
    url:
      'https://tools.datalynx.space/articles/jpg-vs-webp-vs-png-avif',
    siteName: 'Data Lynx Tools',
    type: 'article',
    locale: 'ar_EG',
  },
};

const toc = [
  {
    id: 'intro',
    title: 'لماذا توجد صيغ كثيرة للصور؟',
  },
  {
    id: 'jpg',
    title: 'متى تستخدم JPG؟',
  },
  {
    id: 'png',
    title: 'متى تستخدم PNG؟',
  },
  {
    id: 'webp',
    title: 'متى تستخدم WebP؟',
  },
  {
    id: 'avif',
    title: 'متى تستخدم AVIF؟',
  },
  {
    id: 'gif',
    title: 'متى تستخدم GIF؟',
  },
  {
    id: 'tiff',
    title: 'متى تستخدم TIFF؟',
  },
  {
    id: 'ico',
    title: 'ما وظيفة ICO؟',
  },
  {
    id: 'comparison',
    title: 'مقارنة سريعة بين الصيغ',
  },
  {
    id: 'choose',
    title: 'كيف تختار الصيغة المناسبة؟',
  },
  {
    id: 'faq',
    title: 'الأسئلة الشائعة',
  },
];

const formats = [
  {
    name: 'JPG / JPEG',
    best:
      'الصور الفوتوغرافية والصور الملونة',
    strength:
      'انتشار واسع وحجم مناسب في كثير من الحالات',
    weakness:
      'ضغط فقدي ولا يدعم الشفافية بالطريقة نفسها التي توفرها PNG',
    className:
      'border-blue-500/20 bg-blue-500/5',
  },
  {
    name: 'PNG',
    best:
      'الشفافية والرسومات والصور التي تحتاج إلى الحفاظ على تفاصيلها',
    strength:
      'يدعم الشفافية ويستخدم ضغطًا غير فقدي',
    weakness:
      'قد ينتج ملفات كبيرة للصور الفوتوغرافية',
    className:
      'border-emerald-500/20 bg-emerald-500/5',
  },
  {
    name: 'WebP',
    best:
      'الويب والاستخدامات التي تحتاج توازنًا بين الحجم والجودة',
    strength:
      'يوفر خيارات جيدة للضغط والاستخدام الحديث على الويب',
    weakness:
      'قد تحتاج بعض الأنظمة القديمة إلى تحويله لصيغة أخرى',
    className:
      'border-violet-500/20 bg-violet-500/5',
  },
  {
    name: 'AVIF',
    best:
      'الحالات التي تكون فيها كفاءة الضغط أولوية',
    strength:
      'صيغة حديثة تستهدف كفاءة ضغط عالية',
    weakness:
      'الدعم والترميز يختلفان حسب البيئة والمتصفح',
    className:
      'border-amber-500/20 bg-amber-500/5',
  },
];

const faq = [
  {
    question:
      'هل WebP أفضل من JPG في كل الحالات؟',
    answer:
      'ليس بالضرورة. WebP خيار ممتاز في كثير من الاستخدامات الحديثة، لكن JPG يظل خيارًا عمليًا واسع الانتشار وقد يكون الأنسب عندما تحتاج إلى توافق كبير مع الأنظمة المختلفة.',
  },
  {
    question:
      'متى أستخدم PNG بدل JPG؟',
    answer:
      'PNG مناسب عندما تحتاج إلى الشفافية أو عندما تكون طبيعة الصورة رسومات أو عناصر بصرية تستفيد من ضغط غير فقدي.',
  },
  {
    question:
      'هل AVIF هو الأفضل دائمًا؟',
    answer:
      'لا. اختيار الصيغة يعتمد على الاستخدام والبيئة المستهدفة ودعمها للصيغة وأهمية حجم الملف وجودة الصورة.',
  },
  {
    question:
      'ما أفضل صيغة لموقع إلكتروني؟',
    answer:
      'في كثير من الحالات تكون WebP أو AVIF خيارات مناسبة للويب، بينما يعتمد القرار النهائي على المتصفحات والأنظمة المستهدفة وطبيعة الصور.',
  },
  {
    question:
      'ما الصيغة المناسبة للأيقونات؟',
    answer:
      'ICO مصممة للأيقونات، وخصوصًا حالات استخدام favicon وأيقونات Windows وبعض الاختصارات.',
  },
];

function SectionTitle({ children }) {
  return (
    <h2 className="text-2xl md:text-3xl font-black text-white leading-tight mb-6">
      {children}
    </h2>
  );
}

export default function ImageFormatsComparisonPage() {
  return (
    <div
      className="min-h-screen text-slate-100 font-sans"
      dir="rtl"
    >
      <Navbar />

      <main className="pt-32 pb-20">

        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-violet-500/5 blur-[160px]" />
          <div className="absolute bottom-0 right-0 w-[450px] h-[450px] rounded-full bg-datalynx-primary/5 blur-[160px]" />
        </div>

        <article className="relative z-10">

          {/* Hero */}
          <section className="max-w-5xl mx-auto px-5 sm:px-6">

            <div className="text-center">

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/20 bg-violet-500/5 text-violet-400 text-sm font-bold mb-7">
                دليل صيغ الصور
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.25] mb-7">
                JPG أم PNG أم WebP
                <br className="hidden sm:block" />
                أم AVIF؟
              </h1>

              <p className="text-base md:text-lg text-white leading-8 max-w-3xl mx-auto">
                الفرق بين أشهر صيغ الصور، ومتى تستخدم
                كل صيغة، وكيف تختار النوع المناسب حسب
                الجودة والحجم والشفافية والاستخدام.
              </p>

              <div className="mt-7 flex flex-wrap justify-center gap-3 text-sm text-white">

                <span className="px-4 py-2 rounded-full bg-slate-900 border border-slate-800">
                  دليل عملي
                </span>

                <span className="px-4 py-2 rounded-full bg-slate-900 border border-slate-800">
                  Data Lynx Tools
                </span>

                <span className="px-4 py-2 rounded-full bg-slate-900 border border-slate-800">
                  تحديث: 8 أكتوبر 2026
                </span>

              </div>

            </div>

            <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800">

              <p className="text-base md:text-lg text-white leading-9">
                عندما تحفظ صورة على جهازك، فإن اختيار
                الامتداد ليس مجرد اسم في نهاية الملف. كل
                صيغة تستخدم طريقة مختلفة لتخزين الصورة
                وضغطها، وقد يؤثر ذلك على حجم الملف وجودته
                وشفافيته ومدى توافقه مع البرامج والمتصفحات.
              </p>

            </div>

          </section>

          {/* Content */}
          <section className="max-w-7xl mx-auto px-5 sm:px-6 mt-10">

            <div className="grid grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)] gap-8 items-start">

              <aside className="lg:sticky lg:top-28 order-2 lg:order-1">

                <div className="p-5 rounded-3xl bg-slate-900/70 border border-slate-800">

                  <h3 className="text-lg font-black text-white mb-5">
                    محتويات المقال
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

                    <LocalLink
                      to={'tools/format-converter'}
                      className="block w-full text-center px-4 py-3 rounded-xl bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition-all cursor-pointer"
                    >
                      تحويل صورة الآن
                    </LocalLink>

                  </div>

                </div>

              </aside>

              <div className="order-1 lg:order-2 space-y-7 min-w-0">

                {/* Intro */}
                <section
                  id="intro"
                  className="scroll-mt-28 p-6 sm:p-8 md:p-10 rounded-3xl bg-slate-900/60 border border-slate-800"
                >

                  <SectionTitle>
                    لماذا توجد صيغ كثيرة للصور؟
                  </SectionTitle>

                  <div className="space-y-5 text-base text-white leading-9">

                    <p>
                      لا توجد صيغة واحدة مثالية لجميع أنواع
                      الصور. الصورة الفوتوغرافية تختلف عن الشعار،
                      والشعار يختلف عن صورة مستند ممسوح ضوئيًا،
                      والأيقونة تختلف عن كل ذلك.
                    </p>

                    <p>
                      لهذا ظهرت صيغ متعددة، لكل منها خصائص
                      مختلفة تتعلق بالحجم والجودة والشفافية
                      والحركة والتوافق مع البرامج والأنظمة.
                    </p>

                  </div>

                </section>

                {/* JPG */}
                <section
                  id="jpg"
                  className="scroll-mt-28 p-6 sm:p-8 md:p-10 rounded-3xl bg-slate-900/60 border border-slate-800"
                >

                  <SectionTitle>
                    متى تستخدم JPG؟
                  </SectionTitle>

                  <div className="space-y-5 text-base text-white leading-9">

                    <p>
                      JPG أو JPEG من أكثر صيغ الصور انتشارًا،
                      خصوصًا للصور الفوتوغرافية والصور التي
                      تحتوي على عدد كبير من الألوان والتدرجات.
                    </p>

                    <p>
                      يعتمد JPEG على ضغط فقدي، أي أن الوصول إلى
                      حجم أصغر قد يتطلب التخلي عن جزء من بيانات
                      الصورة.
                    </p>

                    <p>
                      لذلك يعد JPG اختيارًا عمليًا عندما يكون
                      الحجم والتوافق الواسع أهم من الحفاظ على
                      كل بيانات الصورة الأصلية.
                    </p>

                  </div>

                </section>

                {/* PNG */}
                <section
                  id="png"
                  className="scroll-mt-28 p-6 sm:p-8 md:p-10 rounded-3xl bg-slate-900/60 border border-slate-800"
                >

                  <SectionTitle>
                    متى تستخدم PNG؟
                  </SectionTitle>

                  <div className="space-y-5 text-base text-white leading-9">

                    <p>
                      PNG مناسبة بشكل خاص عندما تحتاج إلى
                      الشفافية أو عندما تكون الصورة عبارة عن
                      رسومات أو واجهات أو عناصر تحتوي على مناطق
                      واضحة وخطوط دقيقة.
                    </p>

                    <p>
                      تستخدم PNG ضغطًا غير فقدي، ولذلك يمكن
                      الحفاظ على التفاصيل دون إدخال تشوهات
                      الضغط الفقدي المعتادة في JPEG.
                    </p>

                    <p>
                      لكن ذلك لا يعني أنها دائمًا أصغر حجمًا،
                      وخصوصًا عندما تكون الصورة فوتوغرافية
                      وملونة بدرجة كبيرة.
                    </p>

                  </div>

                </section>

                {/* WebP */}
                <section
                  id="webp"
                  className="scroll-mt-28 p-6 sm:p-8 md:p-10 rounded-3xl bg-slate-900/60 border border-slate-800"
                >

                  <SectionTitle>
                    متى تستخدم WebP؟
                  </SectionTitle>

                  <div className="space-y-5 text-base text-white leading-9">

                    <p>
                      WebP صممت مع وضع الاستخدام على الويب في
                      الاعتبار، وتوفر طريقة حديثة للتعامل مع
                      حجم الصور مع دعم حالات استخدام متعددة.
                    </p>

                    <p>
                      يمكن أن تكون WebP اختيارًا جيدًا عندما تريد
                      نشر الصور على موقع إلكتروني وتقليل حجم
                      التنزيل مع الحفاظ على مظهر جيد.
                    </p>

                    <p>
                      ولذلك توفر Data Lynx Tools WebP كأحد
                      خيارات الإخراج الرئيسية في أدوات الضغط
                      والتحويل.
                    </p>

                  </div>

                </section>

                {/* AVIF */}
                <section
                  id="avif"
                  className="scroll-mt-28 p-6 sm:p-8 md:p-10 rounded-3xl bg-slate-900/60 border border-slate-800"
                >

                  <SectionTitle>
                    متى تستخدم AVIF؟
                  </SectionTitle>

                  <div className="space-y-5 text-base text-white leading-9">

                    <p>
                      AVIF صيغة حديثة تركز على كفاءة الضغط، ولهذا
                      يمكن أن تكون خيارًا جذابًا عندما يكون تقليل
                      حجم الصور مهمًا.
                    </p>

                    <p>
                      لكن اختيارها يجب أن يعتمد أيضًا على البيئة
                      التي ستستخدم فيها الصورة، لأن مستوى الدعم
                      للقراءة والترميز قد يختلف بحسب المتصفح
                      والبرامج المستخدمة.
                    </p>

                  </div>

                  <div className="mt-7 p-5 rounded-2xl bg-amber-500/5 border border-amber-500/15">
                    <p className="text-sm text-white leading-8">
                      <strong className="text-amber-400">
                        قاعدة عملية:
                      </strong>{' '}
                      لا تختَر الصيغة الأكثر حداثة لمجرد أنها
                      أحدث. اختر ما يناسب الاستخدام الفعلي
                      للمستخدمين والأنظمة التي ستتعامل مع الملف.
                    </p>
                  </div>

                </section>

                {/* GIF */}
                <section
                  id="gif"
                  className="scroll-mt-28 p-6 sm:p-8 md:p-10 rounded-3xl bg-slate-900/60 border border-slate-800"
                >

                  <SectionTitle>
                    متى تستخدم GIF؟
                  </SectionTitle>

                  <div className="space-y-5 text-base text-white leading-9">

                    <p>
                      GIF معروف باستخدامه في الصور المتحركة
                      البسيطة والرسوم المحدودة الألوان.
                    </p>

                    <p>
                      لكنه ليس خيارًا مثاليًا للصور الفوتوغرافية
                      الحديثة أو الصور التي تحتوي على عدد كبير
                      من الألوان والتدرجات.
                    </p>

                  </div>

                </section>

                {/* TIFF */}
                <section
                  id="tiff"
                  className="scroll-mt-28 p-6 sm:p-8 md:p-10 rounded-3xl bg-slate-900/60 border border-slate-800"
                >

                  <SectionTitle>
                    متى تستخدم TIFF؟
                  </SectionTitle>

                  <div className="space-y-5 text-base text-white leading-9">

                    <p>
                      TIFF يستخدم كثيرًا في بيئات الطباعة
                      والمسح الضوئي والعمل الاحترافي مع الصور،
                      حيث تكون الجودة والبيانات الأصلية أكثر
                      أهمية من صغر حجم الملف.
                    </p>

                    <p>
                      لذلك فإن TIFF ليس عادةً الاختيار الأول
                      لنشر الصور على الويب، لكنه قد يكون مهمًا
                      جدًا كصيغة إدخال أو إخراج في بيئات احترافية.
                    </p>

                  </div>

                </section>

                {/* ICO */}
                <section
                  id="ico"
                  className="scroll-mt-28 p-6 sm:p-8 md:p-10 rounded-3xl bg-gradient-to-br from-violet-500/10 to-slate-900/70 border border-violet-500/20"
                >

                  <SectionTitle>
                    ما وظيفة ICO؟
                  </SectionTitle>

                  <div className="space-y-5 text-base text-white leading-9">

                    <p>
                      ICO ليست مجرد صيغة أخرى للصور العادية،
                      وإنما تستخدم أساسًا للأيقونات.
                    </p>

                    <p>
                      ومن أشهر استخداماتها ملفات favicon
                      وأيقونات Windows وبعض اختصارات التطبيقات
                      والمواقع.
                    </p>

                    <p>
                      لذلك قد تحتاج الصورة الواحدة إلى أكثر من
                      مقاس داخل حزمة الأيقونة نفسها، مثل 16×16
                      و32×32 و48×48 و256×256.
                    </p>

                  </div>

                  <div className="mt-7 flex flex-wrap gap-3">

                    {[
                      '16×16',
                      '24×24',
                      '32×32',
                      '48×48',
                      '64×64',
                      '128×128',
                      '256×256',
                    ].map((size) => (
                      <span
                        key={size}
                        className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-violet-400 text-sm font-bold"
                      >
                        {size}
                      </span>
                    ))}

                  </div>

                </section>

                {/* Comparison */}
                <section
                  id="comparison"
                  className="scroll-mt-28 p-6 sm:p-8 md:p-10 rounded-3xl bg-slate-900/60 border border-slate-800"
                >

                  <SectionTitle>
                    مقارنة سريعة بين الصيغ
                  </SectionTitle>

                  <div className="space-y-4">

                    {formats.map((format) => (
                      <div
                        key={format.name}
                        className={`p-5 rounded-2xl border ${format.className}`}
                      >

                        <h3 className="text-lg font-black text-white mb-4">
                          {format.name}
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                          <div>
                            <span className="block text-xs text-white mb-1">
                              الأفضل لـ
                            </span>

                            <p className="text-sm text-white leading-7">
                              {format.best}
                            </p>
                          </div>

                          <div>
                            <span className="block text-xs text-white mb-1">
                              أهم ميزة
                            </span>

                            <p className="text-sm text-white leading-7">
                              {format.strength}
                            </p>
                          </div>

                          <div>
                            <span className="block text-xs text-white mb-1">
                              نقطة يجب الانتباه لها
                            </span>

                            <p className="text-sm text-white leading-7">
                              {format.weakness}
                            </p>
                          </div>

                        </div>

                      </div>
                    ))}

                  </div>

                </section>

                {/* Choose */}
                <section
                  id="choose"
                  className="scroll-mt-28 p-6 sm:p-8 md:p-10 rounded-3xl bg-slate-900/60 border border-slate-800"
                >

                  <SectionTitle>
                    كيف تختار الصيغة المناسبة؟
                  </SectionTitle>

                  <div className="space-y-4">

                    {[
                      {
                        title:
                          'صورة فوتوغرافية',
                        answer:
                          'ابدأ عادةً بـ JPG أو WebP، ثم قارن الحجم والجودة حسب الاستخدام.',
                      },
                      {
                        title:
                          'صورة تحتاج إلى شفافية',
                        answer:
                          'PNG أو WebP قد يكونان مناسبين حسب طبيعة المشروع ودعم البيئة المستهدفة.',
                      },
                      {
                        title:
                          'صورة للنشر على الويب',
                        answer:
                          'WebP أو AVIF خياران حديثان يمكن النظر إليهما عندما تكون كفاءة الحجم مهمة.',
                      },
                      {
                        title:
                          'أيقونة أو favicon',
                        answer:
                          'استخدم ICO عندما تحتاج إلى ملف أيقونة، ويمكن إنشاء عدة مقاسات من الصورة نفسها.',
                      },
                      {
                        title:
                          'ملف احترافي أو صورة للطباعة',
                        answer:
                          'قد تكون TIFF أو صيغة احترافية أخرى أنسب بحسب سير العمل المستخدم.',
                      },
                    ].map((item) => (
                      <div
                        key={item.title}
                        className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800"
                      >

                        <h3 className="text-white font-black mb-2">
                          {item.title}
                        </h3>

                        <p className="text-sm text-white leading-8">
                          {item.answer}
                        </p>

                      </div>
                    ))}

                  </div>

                </section>

                {/* Tool CTA */}
                <section className="p-6 sm:p-8 md:p-10 rounded-3xl bg-gradient-to-br from-emerald-500/10 via-slate-900/70 to-blue-500/5 border border-emerald-500/20">

                  <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
                    لا تعرف أي صيغة تختار؟
                  </h2>

                  <p className="text-base text-white leading-8 max-w-2xl">
                    جرّب أكثر من صيغة على الصورة نفسها وقارن
                    الحجم والنتيجة بصريًا. توفر Data Lynx Tools
                    أداة لتحويل الصور بين مجموعة واسعة من الصيغ
                    مباشرة من المتصفح.
                  </p>

                  <div className="mt-7">

                    <LocalLink
                      to={'tools/format-converter'}
                      className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl bg-emerald-500 text-slate-950 font-black hover:bg-emerald-400 transition-all cursor-pointer"
                    >
                      تجربة محول الصور
                    </LocalLink>

                  </div>

                </section>

                {/* FAQ */}
                <section
                  id="faq"
                  className="scroll-mt-28 p-6 sm:p-8 md:p-10 rounded-3xl bg-slate-900/60 border border-slate-800"
                >

                  <SectionTitle>
                    الأسئلة الشائعة
                  </SectionTitle>

                  <div className="space-y-4">

                    {faq.map((item) => (
                      <details
                        key={item.question}
                        className="group rounded-2xl bg-slate-950/70 border border-slate-800 overflow-hidden"
                      >

                        <summary className="flex items-center justify-between gap-4 p-5 text-white font-bold cursor-pointer list-none">

                          <span>
                            {item.question}
                          </span>

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

              </div>
            </div>
          </section>

        </article>
      </main>

      <Footer />
    </div>
  );
}
