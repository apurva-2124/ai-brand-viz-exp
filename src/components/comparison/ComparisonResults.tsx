
import { AIResults } from "@/components/comparison/AIResults";
import { TraditionalResults } from "@/components/comparison/TraditionalResults";
import { TraditionalSearchResults } from "@/services/traditional-search";
import { WhatThisMeans } from "@/components/comparison/WhatThisMeans";
import { ActionNeeded } from "@/components/comparison/ActionNeeded";
import { Badge } from "@/components/ui/badge";
import { analyzeSentiment, detectRecommendation, generateComparisonInsights } from "@/utils/sentimentAnalysis";

interface ComparisonResultsProps {
  aiResult: any;
  comparisonData: TraditionalSearchResults | null;
  brandName?: string;
}

export const ComparisonResults = ({ aiResult, comparisonData, brandName = "" }: ComparisonResultsProps) => {
  if (!aiResult || !comparisonData) return null;
  
  // Calculate visibility level with improved logic
  const hasBrandMention = aiResult.hasBrandMention || (aiResult.visibilityScore?.level !== "not_found");
  
  // Improved logic for determining prominence
  // Check if brand appears early in the response (in the first third)
  const isProminent = aiResult.isProminent || 
    (hasBrandMention && aiResult.response && 
      aiResult.response.toLowerCase().indexOf(brandName.toLowerCase()) < aiResult.response.length / 3);
  
  const visibilityLevel = isProminent ? "high" : 
    hasBrandMention ? "moderate" : "not_found";
  
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

  // Improved brand mention count in AI response
  let brandMentionCount = 0;
  if (aiResult.response && brandName) {
    const regex = new RegExp(brandName, 'gi');
    const matches = aiResult.response.match(regex);
    brandMentionCount = matches ? matches.length : 0;
  }

  // Improved Google search mention count
  // Count mentions in the top results (titles, descriptions, and URLs)
  let googleMentionCount = 0;
  if (comparisonData.topResults && comparisonData.topResults.length > 0) {
    comparisonData.topResults.forEach(result => {
      if (result.hasBrandMention) {
        googleMentionCount++;
      } else if (
        (result.title && result.title.toLowerCase().includes(brandName.toLowerCase())) ||
        (result.description && result.description.toLowerCase().includes(brandName.toLowerCase())) ||
        (result.url && result.url.toLowerCase().includes(brandName.toLowerCase()))
      ) {
        googleMentionCount++;
      }
    });
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
  
  // New: Analyze sentiment and recommendation status
  const sentiment = analyzeSentiment(aiResult.response, brandName);
  const recommendation = detectRecommendation(aiResult.response, brandName);
  
  // Generate comparison insights
  const comparisonInsights = generateComparisonInsights(
    {...aiResult, brandMentionCount, sentiment, recommendation},
    {...comparisonData, brandMentions: googleMentionCount},
    brandName
  );

  return (
    <div className="space-y-4">
      {/* Insight banner */}
      {comparisonData.topResults.length > 0 && (
        <div className="p-4 mb-4 border rounded bg-blue-50 border-blue-200 text-sm">
          <p className="font-medium mb-2 text-blue-800">
            AI vs. Traditional Search Comparison:
          </p>
          <p className="text-blue-800">
            {comparisonInsights}
          </p>
        </div>
      )}
    
      {/* Metrics summary */}
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
            <span>Mentions in Google Search: {googleMentionCount} times</span>
          </div>
          <div>
            <span>Mentions in AI Search: {brandMentionCount} times</span>
          </div>
          <div>
            <span>AI Sentiment: </span>
            <Badge className={`${
              sentiment.sentiment === 'positive' ? 'bg-green-100 text-green-800' : 
              sentiment.sentiment === 'negative' ? 'bg-red-100 text-red-800' : 
              'bg-gray-100 text-gray-800'
            }`}>
              {sentiment.sentiment.toUpperCase()}
            </Badge>
          </div>
          <div>
            <span>Recommendation Status: </span>
            <Badge className={`${
              recommendation.level === 'explicitly_recommended' ? 'bg-green-100 text-green-800' : 
              recommendation.level === 'mentioned_not_recommended' ? 'bg-yellow-100 text-yellow-800' : 
              'bg-red-100 text-red-800'
            }`}>
              {recommendation.level === 'explicitly_recommended' ? 'RECOMMENDED' : 
               recommendation.level === 'mentioned_not_recommended' ? 'MENTIONED, NOT RECOMMENDED' : 
               'NOT MENTIONED'}
            </Badge>
          </div>
          {competitorText && (
            <div>
              <span>Competitor Mentions in AI: {competitorText}</span>
            </div>
          )}
        </div>
      </div>
    
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AIResults aiResult={{
          ...aiResult, 
          brandMentionCount, 
          isProminent, 
          brandName,
          sentiment,
          recommendation
        }} />
        <TraditionalResults comparisonData={{...comparisonData, brandMentions: googleMentionCount}} />
      </div>
      
      <WhatThisMeans 
        aiResult={{...aiResult, brandMentionCount, isProminent, sentiment, recommendation}} 
        comparisonData={{...comparisonData, brandMentions: googleMentionCount}} 
        brandName={brandName} 
      />
      
      <ActionNeeded 
        aiResult={{...aiResult, brandMentionCount, isProminent, sentiment, recommendation}}
        selectedKeyword={aiResult.keyword}
        comparisonData={{...comparisonData, brandMentions: googleMentionCount}}
      />
    </div>
  );
};
