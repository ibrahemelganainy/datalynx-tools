/*
 * مصدر وحيد لعناوين الأدوات الأربعة في اللغتين.
 *
 * يُستخدم من:
 *
 * - Workspace      (عند اختيار أداة من الصفحة الرئيسية أو التنقل بينها)
 * - WorkspacePage  (عند فتح مسار أداة مستقل /tools/<tool> أو /en/tools/<tool>)
 * - layouts مسار الأدوات (عنوان الصفحة الثابت وقت البناء)
 *
 * القيم هنا هي نص العنوان الأساسي فقط *بدون* لاحقة العلامة.
 * لاحقة "| Data Lynx Tools" تأتي من قالب العنوان الموروث:
 *
 *   layout الجذر العربي: template = "%s | Data Lynx Tools"
 *   layout مجموعة (en): تلغي القالب الموروث وتضع template = "%s"
 *
 * ولأن كلا الحالتين تُمرّر القيمة عبر القالب، يُستخدم getFinalToolTitle
 * للولء الذين يكتبون النتيجة النهائية مباشرة.
 *
 * المسار الأدبي:
 *
 *   getToolTitle()       -> النص الأساسي، يمرّ عبر قالب Next.js
 *   getFinalToolTitle()  -> النص النهائي الجاهز للعرض/الكتابة
 *                          في document.title، مع اللاحقة مرة واحدة
 *
 * النتيجة: لا يمكن أن تظهر اللاحقة مرتين ("... | Data Lynx Tools | Data
 * Lynx Tools") لا في HTML المبني ولا في document.title.
 */

const BRAND_SUFFIX = ' | Data Lynx Tools';

/*
 * عنوان الصفحة الرئيسية العربية (layout الجذر) بعد فكّ القالب.
 * يُستخدم فقط لاستعادة العنوان عند العودة إلى الصفحة الرئيسية.
 */
export const ROOT_HOME_TITLE_AR =
  'Data Lynx Tools - أدوات احترافية لضغط الصور، تحويل الصيغ، وملفات PDF';

/*
 * عنوان الصفحة الرئيسية الإنجليزية مع اللاحقة التي يضيفها القالب
 * الموروث من layout الجذر (لأن (en) تلغي القالب فقط من مستوى
 * `default`؟ لا، بل يُحسب فعليًا كما يظهر في HTML المبني).
 */
export const ROOT_HOME_TITLE_EN =
  'Professional tools to compress images, convert formats and compress PDF files | Data Lynx Tools';

/*
 * يُعيد عنوان الصفحة الرئيسية للغة المطلوبة، كما يظهر فعليًا في
 * التبويب.
 */
export function getHomeTitle(locale) {
  return locale === 'en' ? ROOT_HOME_TITLE_EN : ROOT_HOME_TITLE_AR;
}

export const TOOL_TITLES = {
  ar: {
    'image-compression':
      'ضغط الصور أونلاين مجانًا وتقليل حجم الصور',
    'format-converter':
      'تحويل صيغ الصور أونلاين: JPG وPNG وWebP وAVIF وICO',
    'pdf-compression':
      'ضغط ملفات PDF أونلاين وتقليل حجم PDF',
    'prosecution-portal':
      'تصغير الصور وملفات PDF إلى أقل من 500KB للنيابة العامة',
  },

  en: {
    'image-compression':
      'Free Online Image Compressor – Reduce Image Size',
    'format-converter':
      'Online Image Converter – JPG, PNG, WebP, AVIF & ICO',
    'pdf-compression':
      'Compress PDF Online – Reduce PDF File Size',
    'prosecution-portal':
      'Compress Images & PDFs Under 500 KB for the Prosecution Portal',
  },
};

/*
 * يُعيد النص الأساسي لعنوان الأداة (بدون لاحقة العلامة)، أو null
 * إذا كان المعرّف غير معروف.
 *
 * يُستخدم في metadata الخاصة بـNext.js، حيث يتولى قالب العنوان
 * إضافة اللاحقة مرة واحدة بالضبط، ويُستخدم أيضًا كأساس لـ
 * getFinalToolTitle.
 */
export function getToolTitle(locale, toolId) {
  const table = TOOL_TITLES[locale] || TOOL_TITLES.ar;

  return table[toolId] || null;
}

/*
 * يُعيد العنوان النهائي الكامل كما يجب أن يظهر للمستخدم، مع لاحقة
 * العلامة مرة واحدة.
 *
 * هذا هو التابع الوحيد الذي تستخدمه المكوّنات التي تكتب
 * ``document.title`` مباشرة، لأنه لا يمرّ عبر قالب Next.js.
 */
export function getFinalToolTitle(locale, toolId) {
  const base = getToolTitle(locale, toolId);

  return base ? `${base}${BRAND_SUFFIX}` : null;
}
