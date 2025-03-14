
import { TraditionalSearchResults } from "@/services/traditional-search";
import { Badge } from "@/components/ui/badge";

interface WhatThisMeansProps {
  aiResult: any;
  comparisonData: TraditionalSearchResults | null;
  brandName: string;
}

export const WhatThisMeans = ({ aiResult, comparisonData, brandName }: WhatThisMeansProps) => {
  if (!aiResult || !comparisonData) return null;
  
  const hasBrandMention = aiResult.hasBrandMention || (aiResult.visibilityScore?.level !== "not_found");
  const hasGoogleMention = comparisonData.brandMentions > 0;
  
  let visibilityMessage = "";
  if (hasBrandMention && hasGoogleMention) {
    visibilityMessage = `${brandName} appears in both Google's top results and AI-generated answers.`;
  } else if (hasGoogleMention && !hasBrandMention) {
    visibilityMessage = `${brandName} is present in Google's top results but missing from AI-generated answers.`;
  } else if (!hasGoogleMention && hasBrandMention) {
    visibilityMessage = `${brandName} appears in AI-generated answers but is missing from Google's top results.`;
  } else {
    visibilityMessage = `${brandName} is missing from both Google's top results and AI-generated answers.`;
  }

  return (
    <div className="border rounded-lg p-4 mb-6">
      <h3 className="font-medium mb-3">What This Means:</h3>
      <ul className="list-disc pl-6 space-y-2">
        <li>AI-driven search is reshaping how brands get discovered.</li>
        <li>{visibilityMessage}</li>
        <li>Brands who appear in AI-generated responses could capture early-mover advantage as AI-powered search grows.</li>
      </ul>
    </div>
  );
};
