
import { ArrowRight } from "lucide-react";

interface ActionNeededProps {
  aiResult: any;
  selectedKeyword: string;
  comparisonData: any;
}

export const ActionNeeded = ({ aiResult, selectedKeyword, comparisonData }: ActionNeededProps) => {
  return (
    <div className="mt-6 border-t pt-4">
      <h3 className="font-medium mb-3">Action Needed</h3>
      <div className="bg-blue-50 border border-blue-100 rounded-md p-4">
        <ul className="space-y-2">
          {!aiResult.hasBrandMention && (
            <li className="flex items-center gap-2">
              <ArrowRight className="h-4 w-4 text-blue-600" />
              <span>Optimize your content to increase brand mentions in AI responses for "{selectedKeyword}"</span>
            </li>
          )}
          {!aiResult.isProminent && aiResult.hasBrandMention && (
            <li className="flex items-center gap-2">
              <ArrowRight className="h-4 w-4 text-blue-600" />
              <span>Enhance your content with more detailed information about "{selectedKeyword}" to improve prominence</span>
            </li>
          )}
          {aiResult.competitorAnalysis?.competitorsFound?.length > 0 && (
            <li className="flex items-center gap-2">
              <ArrowRight className="h-4 w-4 text-blue-600" />
              <span>Create content that directly addresses why your brand is better than {aiResult.competitorAnalysis.competitorsFound.join(', ')} for "{selectedKeyword}"</span>
            </li>
          )}
          {comparisonData.brandMentions === 0 && (
            <li className="flex items-center gap-2">
              <ArrowRight className="h-4 w-4 text-blue-600" />
              <span>Improve traditional SEO for this keyword to support AI visibility</span>
            </li>
          )}
          {(aiResult.isProminent && comparisonData.brandMentions > 0) && (
            <li className="flex items-center gap-2">
              <ArrowRight className="h-4 w-4 text-green-600" />
              <span>Your brand has good visibility for this keyword - continue monitoring to maintain position</span>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};
