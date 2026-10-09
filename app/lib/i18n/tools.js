/*
 * المسارات المستقلة للأدوات.
 *
 * هذا هو المصدر الوحيد لأسماء الأدوات الأربعة، ويُستخدم من:
 *
 * - صفحات الأدوات العربية والإنجليزية (بما فيها generateStaticParams)
 * - ملف sitemap
 * - روابط التنقل الداخلية
 *
 * لا تُغيّر هذه الأسماء بدون تغيير المسارات المنشورة معها.
 */

export const TOOLS = [
  { id: 'image-compression', priority: 0.9, changeFrequency: 'monthly' },
  { id: 'format-converter', priority: 0.9, changeFrequency: 'monthly' },
  { id: 'pdf-compression', priority: 0.9, changeFrequency: 'monthly' },
  { id: 'prosecution-portal', priority: 0.9, changeFrequency: 'monthly' },
];

export const TOOL_IDS = TOOLS.map((tool) => tool.id);

export function isValidTool(id) {
  return TOOL_IDS.includes(id);
}
