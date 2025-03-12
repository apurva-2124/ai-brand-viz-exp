
import { AIResults } from "@/components/comparison/AIResults";
import { TraditionalResults } from "@/components/comparison/TraditionalResults";
import { TraditionalSearchResults } from "@/services/traditional-search";

interface ComparisonResultsProps {
  aiResult: any;
  comparisonData: TraditionalSearchResults | null;
}

export const ComparisonResults = ({ aiResult, comparisonData }: ComparisonResultsProps) => {
  if (!aiResult || !comparisonData) return null;
  
  // Calculate summary stats
  const brandVisibleInBoth = 
    (aiResult.hasBrandMention || aiResult.visibilityScore?.level !== "not_found") && 
    comparisonData.brandMentions > 0;

  return (
    <div className="space-y-4">
      {/* Optional insight banner */}
      {comparisonData.topResults.length > 0 && (
        <div className={`p-3 mb-4 border rounded text-sm ${
          brandVisibleInBoth ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'
        }`}>
          <p className={`font-medium ${
            brandVisibleInBoth ? 'text-green-800' : 'text-amber-800'
          }`}>
            {brandVisibleInBoth 
              ? "Insight: Your brand is visible in both AI and traditional search results." 
              : "Insight: Your brand visibility differs between AI and traditional search."}
          </p>
        </div>
      )}
    
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AIResults aiResult={aiResult} />
        <TraditionalResults comparisonData={comparisonData} />
      </div>
    </div>
  );
};
