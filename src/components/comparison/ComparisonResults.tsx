
import { AIResults } from "@/components/comparison/AIResults";
import { TraditionalResults } from "@/components/comparison/TraditionalResults";
import { TraditionalSearchResults } from "@/services/traditional-search";
import { WhatThisMeans } from "@/components/comparison/WhatThisMeans";
import { Badge } from "@/components/ui/badge";

interface ComparisonResultsProps {
  aiResult: any;
  comparisonData: TraditionalSearchResults | null;
  brandName?: string;
}

export const ComparisonResults = ({ aiResult, comparisonData, brandName = "" }: ComparisonResultsProps) => {
  if (!aiResult || !comparisonData) return null;
  
  // Calculate visibility level
  const visibilityLevel = aiResult.visibilityScore?.level || 
    (aiResult.isProminent ? "high" : aiResult.hasBrandMention ? "moderate" : "not_found");
  
  // Get competitor mentions
  const competitorMentions = aiResult.competitorAnalysis?.competitorsFound || [];
  
  // Format competitor text
  let competitorText = "";
  if (competitorMentions.length > 0) {
    competitorText = competitorMentions.map((competitor: string, i: number) => {
      const count = aiResult.competitorAnalysis?.competitorCount?.[competitor] || 0;
      return `${competitor} (${count})`;
    }).join(", ");
  }

  // Visibility label and color mapping
  const visibilityLabels: Record<string, string> = {
    "high": "HIGH",
    "moderate": "MODERATE",
    "low": "LOW",
    "not_found": "NOT FOUND"
  };
  
  const visibilityColors: Record<string, string> = {
    "high": "bg-green-100 text-green-800",
    "moderate": "bg-yellow-100 text-yellow-800",
    "low": "bg-red-100 text-red-800",
    "not_found": "bg-red-100 text-red-800"
  };

  const visibilityLabel = visibilityLabels[visibilityLevel] || "LOW";
  const visibilityColor = visibilityColors[visibilityLevel] || "bg-red-100 text-red-800";

  return (
    <div className="space-y-4">
      {/* Insight banner */}
      {comparisonData.topResults.length > 0 && (
        <div className="p-3 mb-4 border rounded bg-amber-50 border-amber-200 text-sm">
          <p className="font-medium mb-2 text-amber-800">
            Insights:
          </p>
          <div className="flex flex-col space-y-1">
            <div className="flex items-center gap-2">
              <span>{brandName} AI Visibility:</span> 
              <Badge className={`${visibilityColor}`}>{visibilityLabel}</Badge>
            </div>
            <div>
              <span>Mentions in Google Search: {comparisonData.brandMentions} times</span>
            </div>
            <div>
              <span>Mentions in AI Search: {aiResult.brandMentionCount || 0} times</span>
            </div>
            {competitorText && (
              <div>
                <span>Competitor Mentions in AI: {competitorText}</span>
              </div>
            )}
          </div>
        </div>
      )}
    
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AIResults aiResult={aiResult} />
        <TraditionalResults comparisonData={comparisonData} />
      </div>
      
      <WhatThisMeans 
        aiResult={aiResult} 
        comparisonData={comparisonData} 
        brandName={brandName} 
      />
    </div>
  );
};
