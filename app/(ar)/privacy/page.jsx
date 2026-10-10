import Link from 'next/link';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export const metadata = {
  title: 'سياسة الخصوصية | Data Lynx Tools',
  description:
    'سياسة الخصوصية الخاصة بمنصة Data Lynx Tools وأدوات ضغط الصور وتحويل الصيغ وضغط ملفات PDF.',

  alternates: {
    canonical: '/privacy',
  },
};

const sections = [
  {
    id: 'overview',
    title: '1. مقدمة',
    content: (
      <>
        <p>
          مرحبًا بك في <strong>Data Lynx Tools</strong>،
          وهي منصة إلكترونية تقدم مجموعة من الأدوات لمعالجة
          الصور وملفات PDF وتحويل صيغ الملفات وتجهيزها لأغراض
          الاستخدام الشخصي والمهني.
        </p>

        <p>
          نحترم خصوصية مستخدمي الموقع، وقد صُممت خدماتنا
          بحيث تتم عمليات معالجة الملفات داخل متصفح المستخدم
          قدر الإمكان، دون الحاجة إلى رفع الملفات إلى خوادم
          Data Lynx لأغراض المعالجة.
        </p>

        <p>
          توضح هذه السياسة طبيعة البيانات التي قد تتم معالجتها
          أثناء استخدام الموقع، وكيفية تعامل الموقع مع ملفات
          المستخدمين، واستخدام تقنيات الإعلانات وملفات تعريف
          الارتباط عند توفرها.
        </p>
      </>
    ),
  },

  {
    id: 'files',
    title: '2. ملفاتك تتم معالجتها داخل المتصفح',
    content: (
      <>
        <p>
          تم تصميم Data Lynx Tools وفق مبدأ المعالجة المحلية
          للملفات. عندما تختار صورة أو ملف PDF من جهازك،
          تتم عملية القراءة والمعالجة باستخدام JavaScript
          والمكتبات البرمجية التي تعمل داخل متصفحك.
        </p>

        <div className="my-6 p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 shrink-0 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              ✓
            </div>

            <div>
              <h3 className="text-white font-bold mb-2">
                لا نحتاج إلى رفع ملفاتك إلى خادم Data Lynx
              </h3>

              <p className="text-sm text-white/80 leading-relaxed">
                ملفات الصور وملفات PDF التي تختارها لأدوات
                المعالجة لا يتم إرسالها إلى خادم Data Lynx
                بهدف الضغط أو التحويل. تتم المعالجة محليًا
                داخل المتصفح، ثم يتم إنشاء الملف الناتج
                على جهازك ليتم تنزيله.
              </p>
            </div>
          </div>
        </div>

        <p>
          وبناءً على تصميم الخدمة الحالي، لا نحتفظ بنسخ من
          الملفات التي تختارها في قاعدة بيانات أو مساحة تخزين
          تابعة لـ Data Lynx بعد انتهاء عملية المعالجة.
        </p>

        <p>
          يجب ملاحظة أن اختيار ملف من جهازك قد يجعله متاحًا
          مؤقتًا لذاكرة المتصفح أو لمساحة التخزين المؤقتة
          الخاصة بالمتصفح وفقًا لسلوك نظام التشغيل والمتصفح
          المستخدم. هذه الآلية تقع ضمن بيئة جهاز المستخدم
          وليست خدمة تخزين ملفات تقدمها Data Lynx.
        </p>
      </>
    ),
  },

  {
    id: 'information',
    title: '3. المعلومات التي قد تتم معالجتها',
    content: (
      <>
        <p>
          لا يتطلب استخدام الأدوات الأساسية إنشاء حساب أو
          إدخال اسم أو رقم هاتف أو بيانات شخصية من أجل ضغط
          الصور أو تحويلها أو ضغط ملفات PDF.
        </p>

        <p>
          عند استخدام الموقع، قد تتم معالجة بعض المعلومات
          التقنية المعتادة التي ترسلها المتصفحات إلى خدمات
          الويب، مثل نوع المتصفح ونظام التشغيل وعنوان IP
          والمعلومات المتعلقة بالاتصال والصفحة المطلوبة،
          وذلك بحسب البنية التقنية لخدمات الاستضافة والأدوات
          الخارجية المستخدمة على الموقع.
        </p>

        <p>
          قد يتم استخدام هذه المعلومات لأغراض تشغيل الموقع،
          والأمان، واكتشاف الأخطاء، وتحسين الأداء، وقياس
          استخدام الخدمات، أو تقديم الإعلانات عند تفعيلها،
          وفقًا للخدمات الفعلية المستخدمة على الموقع.
        </p>
      </>
    ),
  },

  {
    id: 'cookies',
    title: '4. ملفات تعريف الارتباط والتقنيات المشابهة',
    content: (
      <>
        <p>
          قد يستخدم الموقع ملفات تعريف الارتباط (Cookies)
          وتقنيات مشابهة عندما تكون ضرورية لتشغيل الموقع،
          أو لفهم استخدام الخدمات، أو لتقديم الإعلانات.
        </p>

        <p>
          عند استخدام خدمات Google الإعلانية مثل Google AdSense،
          قد تستخدم Google وشركاؤها ملفات تعريف الارتباط أو
          إشارات الويب أو عناوين IP أو معرفات أخرى للمساعدة
          في تقديم الإعلانات وقياسها وتخصيصها وفق الإعدادات
          والسياسات المعمول بها.
        </p>

        <p>
          قد تعتمد الإعلانات المخصصة على زيارات المستخدم
          السابقة لهذا الموقع أو مواقع أخرى وفقًا لإعدادات
          Google والإعلانات المتاحة.
        </p>

        <p>
          توضح Google أن الناشرين الذين يستخدمون AdSense
          مطالبون بإعلام زوارهم باستخدام ملفات تعريف الارتباط
          في سياسة الخصوصية، والإفصاح عن الأطراف الثالثة
          المستخدمة لتقديم الإعلانات عند الاقتضاء.
        </p>

        <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="https://adssettings.google.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-datalynx-primary/50 transition-all cursor-pointer"
          >
            <h3 className="font-bold text-white mb-2">
              إعدادات الإعلانات من Google
            </h3>

            <p className="text-sm text-white/70 leading-relaxed">
              يمكن للمستخدمين مراجعة إعدادات الإعلانات
              الخاصة بحساب Google وإدارة بعض خيارات تخصيص
              الإعلانات.
            </p>
          </a>

          <a
            href="https://policies.google.com/technologies/partner-sites"
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-datalynx-primary/50 transition-all cursor-pointer"
          >
            <h3 className="font-bold text-white mb-2">
              كيف تستخدم Google البيانات
            </h3>

            <p className="text-sm text-white/70 leading-relaxed">
              تعرف على كيفية تعامل Google مع البيانات عند
              استخدام مواقع وخدمات شركائها.
            </p>
          </a>
        </div>
      </>
    ),
  },

  {
    id: 'advertising',
    title: '5. الإعلانات',
    content: (
      <>
        <p>
          قد يتم عرض إعلانات من Google أو شركاء إعلانيين
          آخرين على الموقع بهدف دعم استمرار تقديم الأدوات
          المجانية وتطويرها.
        </p>

        <p>
          قد تستخدم الجهات الإعلانية ملفات تعريف الارتباط
          وتقنيات مشابهة لتقديم إعلانات مناسبة للمستخدم
          وقياس أداء الإعلانات ومنع الاحتيال الإعلاني،
          وفقًا لسياسات كل جهة والإعدادات المتاحة.
        </p>

        <p>
          لا تتحكم Data Lynx في محتوى الإعلانات التي يتم
          اختيارها آليًا بواسطة الشبكات الإعلانية، ولا
          تتحمل مسؤولية المنتجات أو الخدمات التي يتم الإعلان
          عنها من خلال طرف ثالث.
        </p>
      </>
    ),
  },

  {
    id: 'third-party',
    title: '6. الخدمات والروابط التابعة لأطراف ثالثة',
    content: (
      <>
        <p>
          قد يحتوي الموقع على روابط أو خدمات خارجية، مثل
          خدمات Google أو روابط التواصل الاجتماعي أو مواقع
          أخرى لا تديرها Data Lynx.
        </p>

        <p>
          عند انتقالك إلى موقع خارجي، تصبح خاضعًا لسياسة
          الخصوصية وشروط الاستخدام الخاصة بذلك الموقع.
          نوصي بمراجعة سياسات الجهات الخارجية قبل تقديم
          أي معلومات شخصية لها.
        </p>

        <p>
          لا تتحكم Data Lynx في ممارسات الخصوصية الخاصة
          بمواقع الأطراف الثالثة.
        </p>
      </>
    ),
  },

  {
    id: 'security',
    title: '7. أمن البيانات',
    content: (
      <>
        <p>
          لأن أدوات معالجة الملفات تعمل محليًا داخل متصفح
          المستخدم، فإن تصميم الخدمة يقلل الحاجة إلى نقل
          المستندات الشخصية أو القانونية إلى خادم مركزي.
        </p>

        <p>
          ومع ذلك، لا يمكن ضمان أمان أي نظام متصل بالإنترنت
          بنسبة 100%، ولذلك ننصح باستخدام متصفح حديث ومحدث
          ونظام تشغيل محدث، وتجنب استخدام أجهزة غير موثوقة
          لمعالجة الملفات الحساسة.
        </p>
      </>
    ),
  },

  {
    id: 'children',
    title: '8. خصوصية الأطفال',
    content: (
      <>
        <p>
          الموقع عبارة عن خدمة عامة لمعالجة الملفات ولا
          يستهدف جمع المعلومات الشخصية من الأطفال.
        </p>

        <p>
          إذا علمت أن طفلًا قدم معلومات شخصية إلى الموقع
          بطريقة غير مقصودة، يمكنك التواصل معنا من خلال
          وسيلة الاتصال الموضحة في نهاية هذه السياسة.
        </p>
      </>
    ),
  },

  {
    id: 'changes',
    title: '9. التغييرات على سياسة الخصوصية',
    content: (
      <>
        <p>
          قد نقوم بتحديث سياسة الخصوصية من وقت لآخر بسبب
          إضافة خدمات جديدة أو تغيير طريقة تشغيل الموقع أو
          الامتثال لمتطلبات قانونية أو تقنية جديدة.
        </p>

        <p>
          سيتم نشر النسخة المحدثة على هذه الصفحة مع تغيير
          تاريخ آخر تحديث الموجود في أسفل السياسة.
        </p>
      </>
    ),
  },

  {
    id: 'contact',
    title: '10. التواصل معنا',
    content: (
      <>
        <p>
          إذا كان لديك سؤال يتعلق بالخصوصية أو معالجة
          الملفات أو هذه السياسة، يمكنك التواصل معنا عبر
          البريد الإلكتروني:
        </p>

        <a
          href="mailto:lexoffice.datalynx@proton.me"
          className="inline-flex items-center px-5 py-3 mt-3 rounded-xl bg-datalynx-primary/10 border border-datalynx-primary/20 text-datalynx-primary font-bold hover:bg-datalynx-primary/20 transition-all cursor-pointer"
        >
          lexoffice.datalynx@proton.me
        </a>
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <div
      className="min-h-screen text-slate-100 font-sans"
      dir="rtl"
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
                خصوصيتك مهمة لدينا
              </div>

              <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-5">
                سياسة الخصوصية
              </h1>

              <p className="text-base md:text-lg text-white max-w-2xl mx-auto leading-relaxed">
                توضح هذه الصفحة كيفية تعامل Data Lynx Tools
                مع الملفات والمعلومات التقنية وملفات تعريف
                الارتباط عند استخدام خدمات الموقع.
              </p>

              <div className="mt-6 text-sm text-white/70">
                آخر تحديث: 8 أكتوبر 2026
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
                    معالجة الملفات محليًا
                  </h2>

                  <p className="text-sm md:text-base text-white leading-relaxed">
                    أدوات Data Lynx Tools مصممة لمعالجة الصور
                    وملفات PDF داخل متصفح المستخدم. لا نطلب
                    منك رفع ملفاتك إلى خادم Data Lynx من أجل
                    ضغطها أو تحويلها.
                  </p>
                </div>

              </div>
            </div>

            {/* Content */}
            <div className="space-y-6">

              {sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-32 p-6 sm:p-8 rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-slate-800"
                >
                  <h2 className="text-xl md:text-2xl font-black text-white mb-5">
                    {section.title}
                  </h2>

                  <div className="space-y-4 text-sm md:text-base text-white leading-8">
                    {section.content}
                  </div>
                </section>
              ))}

            </div>

            {/* Footer disclaimer */}
            <div className="mt-8 p-5 rounded-2xl bg-slate-900 border border-slate-800 text-sm text-white leading-relaxed">
              هذه السياسة تصف طريقة تشغيل Data Lynx Tools
              والبيانات التي قد تتم معالجتها من خلال الخدمات
              المستخدمة على الموقع. وهي ليست استشارة قانونية،
              وقد تحتاج إلى تحديثها عندما تتم إضافة خدمات أو
              تقنيات جديدة إلى الموقع.
            </div>

            {/* Back */}
            <div className="mt-8 text-center">

              <Link
                href="/"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold hover:bg-slate-700 transition-all cursor-pointer"
              >
                العودة إلى Data Lynx Tools
              </Link>

            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}