import WorkspacePage from '../../../../components/WorkspacePage';
import { TOOL_IDS } from '../../../../lib/i18n/tools';

/*
 * English standalone tool route: /en/tools/<tool>
 *
 * A real, statically generated HTML page, so it can be opened directly,
 * refreshed and indexed on its own.
 *
 * The page renders the same Workspace component as the Arabic route,
 * so the tool UI and the processing behaviour are identical in both
 * languages.
 *
 * canonical and hreflang come from the route-group layout
 * (app/(en)/en/tools). The tool title and description are updated
 * dynamically by Workspace, exactly as they already are on the
 * homepage, keeping a single title-management mechanism.
 */

export function generateStaticParams() {
  return TOOL_IDS.map((tool) => ({ tool }));
}

export default async function EnglishToolPage({ params }) {
  const { tool } = await params;

  return <WorkspacePage tool={tool} />;
}
