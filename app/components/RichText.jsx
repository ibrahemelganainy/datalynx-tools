import React from 'react';

/*
 * RichText — يعرض نصوص القاموس التي تحتوي على وسم <strong> بشكل صحيح.
 *
 * المشكلة:
 *
 * بعض نصوص القاموس مكتوبة بصيغة HTML مبسطة، مثل:
 *
 *   'منصة متكاملة من <strong>Data Lynx</strong> تتيح لك ...'
 *
 * وعند تمريرها إلى JSX كما هي:
 *
 *   {t('hero.description')}
 *
 * يتعامل معها React كنص عادي ويُهرّب الوسم، فيرى المستخدم في الصفحة
 * الحرفيين `<` و `>` مكتوبين حرفيًا بدل كلمة بارزة.
 *
 * الحل هنا محدود ومقصود:
 *
 * - يُقسَّم النص على وسم <strong> فقط، ولا يُفسَّر أي HTML آخر.
 * - لا يُستخدم dangerouslySetInnerHTML إطلاقًا.
 * - أي وسم آخر يبقى نصًا كما هو، فلا توجد أي ثغرة حقن.
 *
 * النتيجة: نفس النصوص العربية والإنجليزية الحالية تُعرض كما كُتبت
 * أصلًا، بجزء غامق داخل الجملة، بدون أي تغيير في الكلمات نفسها.
 */
export function RichText({ text, strongClassName }) {
  if (typeof text !== 'string' || text.indexOf('<strong>') === -1) {
    return text;
  }

  /*
   * split مع مجموعة التقاط يعطينا العناصر بالتناوب:
   * نص عادي، ثم محتوى <strong>، ثم نص عادي، وهكذا.
   */
  const parts = text.split(/<strong>([\s\S]*?)<\/strong>/);

  return parts.map((part, index) =>
    index % 2 === 1 ? (
      <strong key={index} className={strongClassName}>
        {part}
      </strong>
    ) : (
      part
    )
  );
}

export default RichText;
