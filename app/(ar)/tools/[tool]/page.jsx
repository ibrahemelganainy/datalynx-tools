import WorkspacePage from '../../../components/WorkspacePage';
import { TOOL_IDS } from '../../../lib/i18n/tools';

/*
 * مسار الأداة العربية المستقل: /tools/<tool>
 *
 * هذه صفحة HTML حقيقية تُولَّد وقت البناء (output: 'export'), لذلك
 * يمكن فتحها مباشرة وعمل refresh عليها وفهرستها كمحرك بحث مستقل.
 *
 * الرابط القديم بالـhash ما زال يعمل على الصفحة الرئيسية: هذه
 * الصفحة تضيف مسارًا مستقلًا ولا تلغي أي سلوك سابق.
 *
 * canonical وhreflang يأتيان من layout المجموعة (app/(ar)/tools)،
 * بينما عنوان الأداة ووصفها يُحدَّثان ديناميكيًا من Workspace بنفس
 * الطريقة المستخدمة على الصفحة الرئيسية — لا يوجد أي تعديل على
 * العناوين العربية الحالية ولا نظام ثانٍ لإدارتها.
 */

export function generateStaticParams() {
  return TOOL_IDS.map((tool) => ({ tool }));
}

export default async function ArabicToolPage({ params }) {
  const { tool } = await params;

  return <WorkspacePage tool={tool} />;
}
