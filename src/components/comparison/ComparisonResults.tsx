
import { TraditionalSearchResults } from "@/services/traditional-search";
import { analyzeSentiment, detectRecommendation, generateComparisonInsights } from "@/utils/sentimentAnalysis";
import { useState } from "react";

// Import our new components
import { AISearchOverview } from "./results/AISearchOverview";
import { AIVsTraditionalTable } from "./results/AIVsTraditionalTable";
import { ActionableHypotheses } from "./results/ActionableHypotheses";
import { AIResponseBreakdown } from "./results/AIResponseBreakdown";
import { CollapsibleResults } from "./results/CollapsibleResults";

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
  const isProminent = aiResult.isProminent || 
    (hasBrandMention && aiResult.response && 
      aiResult.response.toLowerCase().indexOf(brandName.toLowerCase()) < aiResult.response.length / 3);
  
  // Get competitor mentions
  const competitorMentions = aiResult.competitorAnalysis?.competitorsFound || [];
  
  // Improved brand mention count in AI response
  let brandMentionCount = 0;
  if (aiResult.response && brandName) {
    const regex = new RegExp(brandName, 'gi');
    const matches = aiResult.response.match(regex);
    brandMentionCount = matches ? matches.length : 0;
  }

  // Improved Google search mention count
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

  // New: Analyze sentiment and recommendation status
  const sentiment = analyzeSentiment(aiResult.response, brandName);
  const recommendation = detectRecommendation(aiResult.response, brandName);
  
  // Generate comparison insights
  const comparisonInsights = generateComparisonInsights(
    {...aiResult, brandMentionCount, sentiment, recommendation},
    {...comparisonData, brandMentions: googleMentionCount},
    brandName
  );

  // Get Google rank
  const googleRank = comparisonData.topResults[0]?.rank;
  const isTopGoogleResult = googleRank === 1;
  
  // Determine if the brand is explicitly recommended in AI
  const isExplicitlyRecommended = recommendation.level === 'explicitly_recommended';

  // Create an enhanced result object for the collapsible sections
  const enhancedAiResult = {
    ...aiResult,
    brandMentionCount,
    isProminent,
    sentiment,
    recommendation,
    googleMentionCount
  };

  return (
    <div className="space-y-4">
      {/* AI Search Overview */}
      <AISearchOverview 
        keyword={aiResult.keyword || comparisonData.query}
        brandName={brandName}
        brandMentionCount={brandMentionCount}
        googleRank={googleRank}
        query={aiResult.query || comparisonData.query}
        hasBrandMention={hasBrandMention}
        recommendation={recommendation}
        sentiment={sentiment}
        competitorMentions={competitorMentions}
      />
      
      {/* AI Response Breakdown */}
      <AIResponseBreakdown 
        competitorMentions={competitorMentions}
        sentiment={sentiment}
        recommendation={recommendation}
      />
      
      {/* AI vs. Traditional Search comparison table */}
      <AIVsTraditionalTable 
        brandMentionCount={brandMentionCount}
        googleMentionCount={googleMentionCount}
        isExplicitlyRecommended={isExplicitlyRecommended}
        isTopGoogleResult={isTopGoogleResult}
        sentiment={sentiment}
        recommendation={recommendation}
      />
      
      {/* Actionable Hypotheses */}
      <ActionableHypotheses 
        isProminent={isProminent}
        hasBrandMention={hasBrandMention}
        recommendation={recommendation}
        googleMentionCount={googleMentionCount}
        competitorMentions={competitorMentions}
      />
      
      {/* Collapsible sections for full AI and Traditional results */}
      <CollapsibleResults 
        aiResult={enhancedAiResult}
        comparisonData={comparisonData}
        brandName={brandName}
      />
    </div>
  );
};
