import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

/*
 * ملاحظة أداء (مثبتة بالقياس):
 *
 * كان هذا الملف يستورد Geist و Geist_Mono من next/font/google ويضع
 * متغيّريهما على <html>. تم التحقق من أن أي عنصر في الموقع لا يستخدم
 * --font-geist-sans ولا --font-geist-mono ولا font-mono المرتبط بهما:
 * خط الواجهة الفعلي هو Tajawal عبر --font-sans في globals.css.
 *
 * النتيجة كانت تحميل ١٢ ملف woff2 لخط لا يُرسم به أي نص (~١٤٨KB)،
 * وقد ظهرت فعليًا في تقرير Lighthouse كموردات خطوط غير مستخدمة.
 *
 * إزالتها لا تغيّر أي شكل مرئي: Tajawal يبقى كما هو بنفس الأوزان،
 * و font-mono يبقى على stack Tailwind الافتراضي (var(--font-mono))
 * لأنه لم يكن مرتبطًا بـ Geist أساسًا.
 */
export const metadata: Metadata = {
  title: {
    default: "Data Lynx Tools - أدوات احترافية لضغط الصور، تحويل الصيغ، وملفات PDF",
    template: "%s | Data Lynx Tools"
  },
  description: "منصة متكاملة لضغط الصور، تحويل صيغ الصور (WebP, PNG, JPEG, ICO)، ضغط ملفات PDF، وتجهيز وتصغير مستندات النيابة العامة أقل من 500KB بضغطة زر وبدون رفعها لسيرفر.",
  keywords: [
    "ضغط الصور أونلاين",
    "تحويل صيغ الصور",
    "تحويل صورة إلى ICO",
    "ضغط ملفات PDF مجاناً",
    "بوابة النيابة العامة ضغط المستندات",
    "تصغير حجم التوكيل أقل من 500 كيلو",
    "Data Lynx Tools"
  ],
  authors: [{ name: "Data Lynx" }],
  creator: "Data Lynx",
  publisher: "Data Lynx",
  metadataBase: new URL("https://tools.datalynx.space"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ar_AR",
    url: "https://tools.datalynx.space",
    title: "Data Lynx Tools - أدوات معالجة الملفات والمستندات",
    description: "أدوات ذكية وسريعة لمعالجة الصور والملفات محلياً داخل متصفحك بأقصى درجات الأمان والخصوصية.",
    siteName: "Data Lynx Tools",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  /*
   * `lang="ar"` و `dir="rtl"` هما الافتراضي، وهما الصحيح لجميع
   * المسارات العربية التي تحتفظ بالجذر `/` كما هي.
   *
   * صفحات `/en` تعيد تعريف سمات html الخاصة بها في
   * app/(en)/en/layout.jsx بحيث يحتوي HTML المُولَّد فعليًا على
   * `lang="en"` و `dir="ltr"` بدون أي اعتماد على JavaScript.
   */
  return (
    <html lang="ar" dir="rtl" className="h-full antialiased">
      <head>
        {/*
         * خط Tajawal هو واجهة الموقع الفعلية (انظر --font-sans في
         * globals.css). كان مستوردًا عبر @import داخل CSS، وهو ما يجعله
         * مكتشفًا متأخرًا ويحجب العرض. نقله إلى <head> مع preconnect
         * يجعل الاتصال يبدأ مبكرًا بنفس العائلة ونفس الأوزان بالضبط.
         */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&display=swap"
        />

        {/*
         * إثبات ملكية موقع Data Lynx لإعلانات AdSense.
         *
         * هذا الوسم مطلوب من AdSense للتحقق من ملكية الموقع، وتم وضعه في
         * الـlayout الجذري ليظهر داخل <head> في كل صفحة من صفحات الموقع
         * كما تنصّ تعليمات التحقق. القيمة `ca-pub-...` هي معرّف الناشر
         * الخاص بالحساب ولا يجوز تغييرها إلا بمعرّف آخر من نفس الحساب.
         */}
        <meta
          name="google-adsense-account"
          content="ca-pub-1270749804293495"
        />

        {/*
         * تطبيق الويب القابل للتثبيت (PWA).
         *
         * - رابط الـmanifest يسمح للمتصفح بمعرفة الاسم والأيقونات وأسلوب
         *   العرض standalone، وهو ما يجعل "تثبيت التطبيق" متاحًا على الجوال.
         * - theme-color يلوّن شريط النظام بلون الواجهة الداكن، والعربية
         *   أولًا في الـmanifest مع إمكانية تعدد اللغات لاحقًا.
         * - apple-touch-icon خاص بـiOS الذي لا يقرأ أيقونات الـmanifest.
         *
         * الملفات نفسها ثابتة في public/ ولا تُحسب في أي منطق بناء.
         */}
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#020617" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="min-h-full flex flex-col text-slate-100 font-sans">
        {children}

        {/*
         * Google Analytics (gtag.js).
         *
         * الرمز الأصلي المطلوب هو سكربتين: طلب خارجي لـgtag.js ثم سكربت
         * تهيئة داخلي. هنا يُحمَّلان عبر next/script حتى يبقى التنفيذ
         * متسلسلًا (تهيئة dataLayer وgtag قبل تحميل gtag.js).
         *
         * strategy="afterInteractive" يضع السكربتين بعد اكتمال الترطيب،
         * فلا يحجب العرض ولا يُضاف إلى زمن الخيط الرئيسي الحرج. هذا لا
         * يخالف الكود المطلوب: نفس الرمز، ونفس الإعداد، ونفس القياس،
         * لكن بدون مساس بزمن التحميل الأول لصفحات أدوات معالجة الملفات.
         */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-R7G0P367SP"
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-R7G0P367SP');`}
        </Script>
      </body>
    </html>
  );
}