
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
  
  return { 
    ...result, 
    provider,
    visibilityScore,
    competitorAnalysis,
    recommendation: generateRecommendation(visibilityScore.level)
  };
}
