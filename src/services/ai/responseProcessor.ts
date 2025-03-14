
import { 
  scoreVisibility, 
  analyzeCompetitors,
  generateRecommendation 
} from "@/utils/queryTransformer";
import { VisibilityResult } from "./types";
import { analyzeSentiment, detectRecommendation } from "@/utils/sentimentAnalysis";

export function processAIResponse(
  result: {
    keyword: string;
    query: string;
    response: string;
    hasBrandMention: boolean;
    isProminent: boolean;
  }, 
  brandName: string, 
  competitors?: string[],
  provider: string = "AI"
): VisibilityResult {
  // Improved brand mention detection
  let brandMentionCount = 0;
  let hasBrandMention = false;
  let isProminent = false;
  
  if (result.response && brandName) {
    const regex = new RegExp('\\b' + brandName + '\\b', 'gi');
    const matches = result.response.match(regex);
    brandMentionCount = matches ? matches.length : 0;
    
    // Only mark as having a brand mention if the brand name actually appears in the text
    hasBrandMention = brandMentionCount > 0;
    
    // Check prominence - only if brand is actually mentioned
    if (hasBrandMention) {
      const responseLower = result.response.toLowerCase();
      const brandLower = brandName.toLowerCase();
      const firstOccurrence = responseLower.indexOf(brandLower);
      
      // Consider it prominent if mentioned in first third of the text or if it appears in a key position
      isProminent = (firstOccurrence >= 0 && firstOccurrence < result.response.length / 3) ||
        responseLower.includes(`${brandLower} is a leading`) ||
        responseLower.includes(`${brandLower} is one of the top`) ||
        responseLower.includes(`such as ${brandLower}`);
    }
  }
  
  const visibilityScore = scoreVisibility(result.response, brandName);
  const competitorAnalysis = analyzeCompetitors(
    result.response, 
    brandName, 
    competitors
  );
  
  // Analyze sentiment and recommendation status
  const sentiment = analyzeSentiment(result.response, brandName);
  const recommendationStatus = detectRecommendation(result.response, brandName);
  
  return { 
    ...result, 
    provider,
    hasBrandMention, // Override with accurate detection
    isProminent, // Override with accurate detection
    visibilityScore,
    competitorAnalysis,
    recommendation: generateRecommendation(visibilityScore.level),
    brandMentionCount,
    sentiment,
    recommendationStatus,
    brandName // Add brandName for highlighting in UI
  };
}
