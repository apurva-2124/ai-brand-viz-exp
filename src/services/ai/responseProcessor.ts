
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
    // Split brand name into parts to handle multi-word brands
    const brandParts = brandName.split(/\s+/);
    const mainBrandTerm = brandParts[0]; // Get the first part of the brand name
    
    // Check for the complete brand name first
    const fullBrandRegex = new RegExp('\\b' + brandName.replace(/\s+/g, '\\s+') + '\\b', 'gi');
    const fullMatches = result.response.match(fullBrandRegex);
    let fullMatchCount = fullMatches ? fullMatches.length : 0;
    
    // Then check for the main part of the brand name (for cases like "Beis Travel" → "Beis")
    const mainBrandRegex = new RegExp('\\b' + mainBrandTerm + '\\b', 'gi');
    const mainMatches = result.response.match(mainBrandRegex);
    let mainMatchCount = mainMatches ? mainMatches.length : 0;
    
    // Total count and determine if brand is mentioned
    brandMentionCount = fullMatchCount + (fullMatchCount > 0 ? 0 : mainMatchCount);
    hasBrandMention = brandMentionCount > 0;
    
    // Check prominence - only if brand is actually mentioned
    if (hasBrandMention) {
      const responseLower = result.response.toLowerCase();
      
      // Try with full brand name first
      let brandLower = brandName.toLowerCase();
      let firstOccurrence = responseLower.indexOf(brandLower);
      
      // If not found with full name, try with the main brand term
      if (firstOccurrence < 0 && mainMatchCount > 0) {
        brandLower = mainBrandTerm.toLowerCase();
        firstOccurrence = responseLower.indexOf(brandLower);
      }
      
      // Consider it prominent based on position or context
      isProminent = (firstOccurrence >= 0 && firstOccurrence < result.response.length / 3) ||
        responseLower.includes(`${brandLower} is a leading`) ||
        responseLower.includes(`${brandLower} is one of the top`) ||
        responseLower.includes(`such as ${brandLower}`) ||
        responseLower.includes(`${brandLower}'s`);
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
