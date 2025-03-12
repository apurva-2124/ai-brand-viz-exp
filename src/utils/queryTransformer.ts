
import { BrandData } from "@/components/BrandTracker";
import { 
  transformKeywordToQuery,
  identifyKeywordIntent
} from "./queryTemplates";
// Import types with the 'type' keyword
import type { 
  QueryType, 
  QueryVariables 
} from "./queryTemplates";

/**
 * Generates conversational queries for a set of keywords with variable substitution
 * @param brandData The brand data containing keywords and other information
 * @param queryType The type of query to generate
 * @param searchType Optional search behavior type
 * @returns An array of objects with original keywords and transformed queries
 */
export function generateQueriesForKeywords(
  brandData: BrandData,
  queryType: QueryType = "best-in-class",
  searchType?: "voice" | "ai" | "traditional"
): Array<{ keyword: string; query: string }> {
  // Import from queryTemplates.ts
  const { getRandomCompetitors } = require('./queryTemplates');
  
  // Prepare variables for substitution
  const variables: QueryVariables = {
    brand_name: brandData.name,
    category: brandData.industry,
    searchType: searchType
  };
  
  if (brandData.competitors && brandData.competitors.length > 0) {
    variables.competitor_names = getRandomCompetitors(brandData.competitors);
  }
  
  return brandData.keywords.map(keyword => ({
    keyword,
    query: transformKeywordToQuery(keyword, queryType, variables)
  }));
}

/**
 * Scoring system for brand visibility in AI responses
 * @param response The AI response text
 * @param brandName The brand name to check for
 * @returns Visibility scoring object
 */
export function scoreVisibility(response: string, brandName: string) {
  if (!response || !brandName) {
    return {
      level: "not_found",
      label: "❌ Missing from AI Results",
      score: 0,
      context: null
    };
  }
  
  const lowerResponse = response.toLowerCase();
  const lowerBrandName = brandName.toLowerCase();
  
  // Check if brand is mentioned
  if (!lowerResponse.includes(lowerBrandName)) {
    return {
      level: "not_found",
      label: "❌ Missing from AI Results",
      score: 0,
      context: null
    };
  }
  
  // Check if prominently mentioned (near beginning or multiple times)
  const firstMentionIndex = lowerResponse.indexOf(lowerBrandName);
  const mentionCount = (lowerResponse.match(new RegExp(lowerBrandName, 'gi')) || []).length;
  const isEarlyMention = firstMentionIndex < lowerResponse.length / 3;
  
  if (isEarlyMention || mentionCount >= 2) {
    // Extract context of the mention
    const contextStart = Math.max(0, firstMentionIndex - 50);
    const contextEnd = Math.min(lowerResponse.length, firstMentionIndex + brandName.length + 100);
    const mentionContext = response.substring(contextStart, contextEnd);
    
    return {
      level: "high",
      label: "✅ High Visibility",
      score: 10,
      context: mentionContext
    };
  }
  
  // Vague mention
  return {
    level: "low",
    label: "⚠️ Needs Optimization",
    score: 5,
    context: null
  };
}

/**
 * Generates recommendations based on visibility level
 * @param visibilityLevel The level of visibility (high, low, not_found)
 * @returns Recommendation string
 */
export function generateRecommendation(visibilityLevel: string): string {
  switch (visibilityLevel) {
    case "high":
      return "Maintain current AI presence but test new keywords for ranking stability.";
    case "low":
      return "Optimize AI discovery signals via structured content and AI-recommended metadata.";
    case "not_found":
      return "Prioritize AI search optimization via content partnerships, FAQ embedding, and AI-driven PPC adjustments.";
    default:
      return "Perform analysis to determine visibility enhancement strategies.";
  }
}

/**
 * Analyzes competitor mentions in AI responses
 * @param response The AI response text
 * @param brandName The brand name
 * @param competitors Array of competitor names
 * @returns Competitor analysis results
 */
export function analyzeCompetitors(response: string, brandName: string, competitors: string[] = []) {
  if (!response || competitors.length === 0) {
    return {
      competitorsFound: [],
      competitorOutranking: false,
      riskLevel: "low"
    };
  }
  
  const lowerResponse = response.toLowerCase();
  const foundCompetitors = competitors.filter(comp => 
    lowerResponse.includes(comp.toLowerCase())
  );
  
  // Check if brand is mentioned
  const isBrandMentioned = lowerResponse.includes(brandName.toLowerCase());
  
  // Check if competitors are mentioned more prominently
  const competitorOutranking = foundCompetitors.some(comp => {
    const compIndex = lowerResponse.indexOf(comp.toLowerCase());
    const brandIndex = lowerResponse.indexOf(brandName.toLowerCase());
    
    // If brand not mentioned or competitor appears earlier
    return !isBrandMentioned || (brandIndex > compIndex && compIndex !== -1);
  });
  
  let riskLevel = "low";
  if (competitorOutranking) {
    riskLevel = "high";
  } else if (foundCompetitors.length > 0 && !isBrandMentioned) {
    riskLevel = "medium";
  }
  
  return {
    competitorsFound: foundCompetitors,
    competitorOutranking,
    riskLevel
  };
}

// Re-export types and functions from queryTemplates.ts
// Use 'export type' for type re-exports
export { 
  transformKeywordToQuery,
  identifyKeywordIntent
} from "./queryTemplates";

export type { 
  QueryType, 
  QueryVariables 
} from "./queryTemplates";
