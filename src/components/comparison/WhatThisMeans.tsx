
import { TraditionalSearchResults } from "@/services/traditional-search";
import { Badge } from "@/components/ui/badge";

interface WhatThisMeansProps {
  aiResult: any;
  comparisonData: TraditionalSearchResults | null;
  brandName: string;
}

export const WhatThisMeans = ({ aiResult, comparisonData, brandName }: WhatThisMeansProps) => {
  if (!aiResult || !comparisonData) return null;
  
  // Determine visibility in both search types
  const hasBrandMention = aiResult.hasBrandMention || (aiResult.visibilityScore?.level !== "not_found");
  const isProminent = aiResult.isProminent || (aiResult.visibilityScore?.level === "high");
  
  // Check Google visibility - consider a brand mentioned if it appears in top 5 results
  const topGoogleResults = comparisonData.topResults.slice(0, 5);
  const hasGoogleMention = comparisonData.brandMentions > 0 || 
    topGoogleResults.some(result => 
      result.hasBrandMention || 
      (result.url && result.url.toLowerCase().includes(brandName.toLowerCase()))
    );
  
  // Get sentiment and recommendation information
  const sentiment = aiResult.sentiment?.sentiment || 'neutral';
  const isRecommended = aiResult.recommendation?.level === 'explicitly_recommended';
  
  // Create dynamic message based on actual comparison
  let visibilityMessage = "";
  if (isProminent && hasGoogleMention) {
    visibilityMessage = `${brandName} appears prominently in both Google's top results and AI-generated answers.`;
  } else if (hasBrandMention && hasGoogleMention) {
    visibilityMessage = `${brandName} appears in both Google's top results and AI-generated answers.`;
  } else if (hasGoogleMention && !hasBrandMention) {
    visibilityMessage = `${brandName} is present in Google's top results but missing from AI-generated answers.`;
  } else if (!hasGoogleMention && hasBrandMention) {
    visibilityMessage = `${brandName} appears in AI-generated answers but is missing from Google's top results.`;
  } else {
    visibilityMessage = `${brandName} is missing from both Google's top results and AI-generated answers.`;
  }
  
  // Add sentiment and recommendation information
  let sentimentMessage = "";
  if (hasBrandMention) {
    sentimentMessage = `AI search has a ${sentiment} tone towards ${brandName}${isRecommended ? ' and explicitly recommends it' : ' but does not explicitly recommend it'}.`;
  }

  return (
    <div className="border rounded-lg p-4 mb-6">
      <h3 className="font-medium mb-3">What This Means:</h3>
      <ul className="list-disc pl-6 space-y-2">
        <li>AI-driven search is reshaping how brands get discovered.</li>
        <li>{visibilityMessage}</li>
        {hasBrandMention && <li>{sentimentMessage}</li>}
        <li>Brands who appear in AI-generated responses could capture early-mover advantage as AI-powered search grows.</li>
        {hasBrandMention && !isRecommended && (
          <li>Even when mentioned, brands may need to optimize for explicit AI recommendations to stand out.</li>
        )}
      </ul>
    </div>
  );
};
