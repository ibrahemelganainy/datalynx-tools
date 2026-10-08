import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
  return (
    <html lang="ar" dir="rtl" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-slate-900 text-slate-100 font-sans">
        {children}
      </body>
    </html>
  );
}