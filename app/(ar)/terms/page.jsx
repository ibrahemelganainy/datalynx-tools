import Link from 'next/link';

export const metadata = {
  title: 'سياسة الاستخدام | Data Lynx Tools',
  description:
    'اطلع على شروط وأحكام استخدام أدوات Data Lynx Tools لضغط الصور وتحويل الصيغ وضغط ملفات PDF.',

  /*
   * canonical واحد فقط لكل صفحة. القيمة نصية مطلقة حتى لا تتأثر
   * بأي دمج من المستويات الأعلى.
   */
  alternates: {
    canonical: 'https://tools.datalynx.space/terms',
  },
};

const sections = [
  {
    id: 'acceptance',
    title: '1. قبول الشروط',
    content: [
      'باستخدامك لأدوات Data Lynx Tools فإنك توافق على هذه الشروط. إذا كنت لا توافق عليها، يرجى التوقف عن استخدام الموقع.',
      'قد نقوم بتحديث هذه السياسة من وقت لآخر، وسيتم نشر النسخة المعدّلة في هذه الصفحة مع تحديث تاريخ السريان.',
    ],
  },
  {
    id: 'service',
    title: '2. وصف الخدمة',
    content: [
      'توفر Data Lynx Tools أدوات تعمل مباشرة في متصفحك لضغط الصور، وتحويل صيغها، وإنشاء ملفات ICO، وضغط ملفات PDF.',
      'نسعى لتقديم خدمة مستقرة، لكننا لا نضمن عملها دون انقطاع أو خلوها من الأخطاء في جميع الظروف.',
    ],
  },
  {
    id: 'usage',
    title: '3. الاستخدام المسموح',
    content: [
      'يحق لك استخدام الأدوات لمعالجة ملفاتك الشخصية أو ملفات الجهة التي تعمل لصالحها، بشرط أن تملك حق استخدامها.',
      'يُمنع استخدام الموقع لمعالجة محتوى غير قانوني، أو ينتهك حقوق الملكية الفكرية أو الخصوصية للآخرين، أو لمحاولة إلحاق الضرر بالموقع أو بالمستخدمين الآخرين.',
    ],
  },
  {
    id: 'files',
    title: '4. الملفات ومسؤوليتك عنها',
    content: [
      'تتم معالجة الملفات داخل متصفحك، ولا نحتفظ بنسخ منها على خوادمنا كما هو موضح في سياسة الخصوصية.',
      'أنت المسؤول الوحيد عن الاحتفاظ بنسخ احتياطية من ملفاتك الأصلية قبل معالجتها، ولا نتحمل مسؤولية فقدان البيانات أو تلفها.',
    ],
  },
  {
    id: 'accuracy',
    title: '5. دقة النتائج',
    content: [
      'نبذل جهدنا لضمان جودة الناتج، لكن نتائج الضغط والتحويل قد تختلف حسب الملف والمتصفح وإعدادات المستخدم.',
      'يجب عليك مراجعة الملف الناتج قبل اعتماده لأي غرض رسمي أو تجاري، خاصة عند استخدامه في مستندات قانونية أو مع جهات حكومية.',
    ],
  },
  {
    id: 'ip',
    title: '6. الملكية الفكرية',
    content: [
      'جميع التصاميم والشيفرات والمحتوى الموجود على الموقع مملوكة لـ Data Lynx أو مرخّصة لها، ولا يجوز نسخها أو إعادة توزيعها دون إذن كتابي.',
      'الملفات التي ترفعها تظل ملكاً لك، ولا نكتسب عليها أي حق.',
    ],
  },
  {
    id: 'liability',
    title: '7. إخلاء المسؤولية',
    content: [
      'تُقدَّم الخدمة "كما هي" دون ضمانات صريحة أو ضمنية. وفي أقصى حد يسمح به القانون، لا تتحمل Data Lynx أي أضرار مباشرة أو غير مباشرة تنتج عن استخدام الأدوات.',
    ],
  },
  {
    id: 'changes',
    title: '8. التعديلات على الشروط',
    content: [
      'يحق لنا تعديل هذه الشروط في أي وقت. استمرارك في استخدام الموقع بعد النشر يعني موافقتك على النسخة المعدّلة.',
    ],
  },
  {
    id: 'contact',
    title: '9. التواصل معنا',
    content: [
      'إذا كان لديك أي استفسار حول هذه الشروط، يمكنك التواصل معنا عبر البريد الإلكتروني المذكور في صفحة الخصوصية أو في أسفل الموقع.',
    ],
  },
];

export default function TermsPage() {
  return (
    <main
      dir="rtl"
      className="min-h-screen text-slate-100 font-sans"
    >
      <div className="max-w-3xl mx-auto px-6 py-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors cursor-pointer mb-10"
        >
          → العودة إلى الرئيسية
        </Link>

        <header className="mb-12">
          <div className="font-mono text-xs tracking-[0.2em] text-datalynx-primary/90 mb-4">
            LEGAL
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-4">
            سياسة الاستخدام
          </h1>
          <p className="text-slate-400 leading-relaxed">
            يوضح هذا المستند الشروط التي تحكم استخدامك لأدوات Data Lynx Tools.
          </p>
          <p className="text-slate-500 text-sm mt-4">
            آخر تحديث: 8 أكتوبر 2026
          </p>
        </header>

        <nav
          aria-label="فهرس الصفحة"
          className="mb-12 p-6 rounded-2xl border border-slate-800 bg-slate-900/60"
        >
          <h2 className="text-sm font-bold text-white mb-4">المحتويات</h2>
          <ul className="space-y-2 text-sm">
            {sections.map((section) => (
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
          {sections.map((section) => (
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