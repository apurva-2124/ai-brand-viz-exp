
import { 
  scoreVisibility, 
  analyzeCompetitors,
  generateRecommendation 
} from "@/utils/queryTransformer";
import { VisibilityResult } from "./types";

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
  const visibilityScore = scoreVisibility(result.response, brandName);
  const competitorAnalysis = analyzeCompetitors(
    result.response, 
    brandName, 
    competitors
  );
  
  // Improved brand mention count
  let brandMentionCount = 0;
  if (result.response && brandName) {
    const regex = new RegExp(brandName, 'gi');
    const matches = result.response.match(regex);
    brandMentionCount = matches ? matches.length : 0;
  }
  
  // Check for prominence - if brand is mentioned early in the response
  const isProminent = result.isProminent || 
    (result.response && 
     result.response.toLowerCase().indexOf(brandName.toLowerCase()) < result.response.length / 3);
  
  return { 
    ...result, 
    provider,
    visibilityScore,
    competitorAnalysis,
    recommendation: generateRecommendation(visibilityScore.level),
    brandMentionCount,
    isProminent
  };
}
