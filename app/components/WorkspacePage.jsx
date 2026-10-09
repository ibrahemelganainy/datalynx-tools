'use client';

import React, { useCallback } from 'react';
import { useRouter } from 'next/navigation';

import Navbar from './Navbar';
import Footer from './Footer';
import Features from './Features';
import PrivacySection from './PrivacySection';
import Workspace from './Workspace';

import { useLocale } from './LocaleProvider';
import { isValidTool } from '../lib/i18n/tools';

/*
 * صفحة أداة مستقلة.
 *
 * تُستخدم من المسارات الحقيقية:
 *
 *   /tools/<tool>        (العربية)
 *   /en/tools/<tool>     (الإنجليزية)
 *
 * لا توجد أي نسخة ثانية من منطق المعالجة هنا: نفس مكوّن Workspace
 * ونفس الأدوات الأربع المستخدمة في الصفحة الرئيسية. الاختلاف الوحيد
 * أن الأداة تُختار من المسار نفسه بدل الـhash.
 *
 * ترتيب الأقسام هنا:
 *
 *   Workspace  ->  Features  ->  PrivacySection  ->  Footer
 *
 * الـWorkspace يحل مكان الـHero (نفس الموضع الذي كان يحتله في الصفحة
 * الرئيسية)، ثم يليه نفس مكوّن Features ثم نفس مكوّن PrivacySection
 * المستخدمين في الصفحة الرئيسية، بدون أي تغيير في تصميمهما أو في
 * روابطهما الحالية.
 *
 * التنقل بين الأدوات داخل هذه الصفحة يستخدم روابط حقيقية حتى يبقى
 * الـURL قابلًا للمشاركة والفهرسة، ولأن المسار يحدد الأداة المعروضة
 * فلا حاجة إلى أي حالة محلية.
 */

export default function WorkspacePage({ tool }) {
  const { lhref, dir } = useLocale();

  const router = useRouter();

  /*
   * اختيار أداة أخرى من شريط الأدوات أو زر العودة.
   *
   * نستخدم الراوتر (بدل <a href>) لأن هذا انتقال بين نفس الصفحة،
   * لكن الوجهة تبقى مسارًا حقيقيًا: /tools/... أو /en/tools/...
   */
  const goToTool = useCallback(
    (toolId) => {
      if (!isValidTool(toolId)) {
        return;
      }

      router.push(lhref(`tools/${toolId}`));
    },
    [lhref, router]
  );

  /*
   * "العودة للخدمات" يعيد المستخدم إلى الصفحة الرئيسية للغة الحالية.
   *
   * كان يستخدم `${lhref('')}#tools`، لكن لا يوجد أي عنصر بمعرّف
   * "tools" في الصفحة الرئيسية، فالنتيجة كانت:
   *
   * - ظهور #tools في شريط العنوان بدون أي معنى
   * - عدم حدوث أي تمرير إلى قسم الخدمات
   *
   * لذلك نُعيد المستخدم إلى جذر الصفحة الرئيسية فقط، فيصل إلى قسم
   * الأدوات العلوي مباشرة، وبدون hash زائد في الرابط.
   */
  const handleBack = useCallback(() => {
    router.push(lhref(''));
  }, [lhref, router]);

  return (
    <div
      className="min-h-screen bg-slate-900 text-slate-100 font-sans"
      dir={dir}
    >
      <Navbar activeTool={tool} />

      <main>
        <div id="workspace">
          <Workspace
            activeTool={tool}
            onBack={handleBack}
            onSelectTool={goToTool}
          />
        </div>

        <Features />

        <PrivacySection />
      </main>

      <Footer />
    </div>
  );
}
