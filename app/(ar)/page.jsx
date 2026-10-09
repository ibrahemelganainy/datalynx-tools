import HomeContent from '../components/HomeContent';

/*
 * الصفحة الرئيسية العربية.
 *
 * هذه الصفحة تحتفظ بالمسار الأصلي `/` تمامًا كما كان قبل إضافة دعم
 * اللغة الإنجليزية، وكل سلوك الـhash والتنقل بين الأدوات يأتي من
 * HomeContent بدون أي تغيير.
 *
 * ملاحظة مهمة: لا نصدّر أي `metadata` هنا حتى يبقى canonical
 * و title و description و keywords الموروثة من layout الجذر كما هي
 * بدون أي تعديل.
 */
export default function HomePage() {
  return <HomeContent />;
}
