/*
 * robots.txt
 *
 * يسمح بالزحف لكل الصفحات العامة والملفات المطلوبة (CSS و JavaScript
 * والخطوط والصور)، ولا يحجب المقالات ولا المسارات الإنجليزية.
 *
 * ملفات PHP/XML غير مستخدمة في الموقع، لذلك لا توجد أي قاعدة حجب
 * إلا ما يمكن تبريره تقنيًا.
 */
export const dynamic = 'force-static';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: 'https://tools.datalynx.space/sitemap.xml',
    
  };
}
