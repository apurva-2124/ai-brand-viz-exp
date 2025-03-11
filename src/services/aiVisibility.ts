
import { BrandData } from "@/components/BrandTracker";
import * as openAI from "./openai";
import * as anthropic from "./anthropic";
import { 
  QueryType, 
  generateQueriesForKeywords, 
  scoreVisibility, 
  analyzeCompetitors,
  generateRecommendation 
} from "@/utils/queryTransformer";

export type AIProvider = "openai" | "anthropic" | "both";
export type VisibilityResult = {
  keyword: string;
  query: string;
  response: string;
  hasBrandMention: boolean;
  isProminent: boolean;
  provider: string;
  visibilityScore: {
    level: string;
    label: string;
    score: number;
    context: string | null;
  };
  competitorAnalysis?: {
    competitorsFound: string[];
    competitorOutranking: boolean;
    riskLevel: string;
  };
  recommendation?: string;
};

export async function analyzeAIVisibility(
  brandData: BrandData,
  provider: AIProvider = "both",
  queryType: QueryType = "best-in-class"
): Promise<{
  results: VisibilityResult[];
  overallScore: number;
  prominentMentions: number;
  vagueMentions: number;
  notFound: number;
  keywordStrength: { keyword: string; score: number }[];
  queries: Array<{ keyword: string; query: string }>;
  riskLevel: string;
  competitorsDetected: Record<string, number>;
}> {
  let results: VisibilityResult[] = [];
  
  // Generate conversational queries for all keywords
  const queries = generateQueriesForKeywords(brandData, queryType);
  
  try {
    // Run OpenAI analysis if requested
    if (provider === "openai" || provider === "both") {
      const openAIResults = await openAI.analyzeBrandVisibility(brandData, queries);
      results = results.concat(
        openAIResults.map(result => {
          // Enhanced scoring
          const visibilityScore = scoreVisibility(result.response, brandData.name);
          
          // Competitor analysis
          const competitorAnalysis = analyzeCompetitors(
            result.response, 
            brandData.name, 
            brandData.competitors
          );
          
          return { 
            ...result, 
            provider: "OpenAI",
            visibilityScore,
            competitorAnalysis,
            recommendation: generateRecommendation(visibilityScore.level)
          };
        })
      );
    }
    
    // Run Anthropic analysis if requested
    if (provider === "anthropic" || provider === "both") {
      const anthropicResults = await anthropic.analyzeBrandVisibility(brandData, queries);
      results = results.concat(
        anthropicResults.map(result => {
          // Enhanced scoring
          const visibilityScore = scoreVisibility(result.response, brandData.name);
          
          // Competitor analysis
          const competitorAnalysis = analyzeCompetitors(
            result.response, 
            brandData.name, 
            brandData.competitors
          );
          
          return { 
            ...result, 
            provider: "Anthropic",
            visibilityScore,
            competitorAnalysis,
            recommendation: generateRecommendation(visibilityScore.level)
          };
        })
      );
    }
    
    // Calculate metrics
    const prominentMentions = results.filter(r => r.visibilityScore.level === "high").length;
    const vagueMentions = results.filter(r => r.visibilityScore.level === "low").length;
    const notFound = results.filter(r => r.visibilityScore.level === "not_found").length;
    
    // Generate a score from 0-100
    const totalPossibleScore = results.length * 10;
    const earnedScore = results.reduce((sum, r) => sum + r.visibilityScore.score, 0);
    const overallScore = Math.round((earnedScore / totalPossibleScore) * 100);
    
    // Calculate keyword strength (score from 1-10)
    const keywordsMap = new Map<string, { mentions: number; prominent: number; count: number }>();
    
    // Initialize the map with all keywords
    brandData.keywords.forEach(keyword => {
      keywordsMap.set(keyword, { mentions: 0, prominent: 0, count: 0 });
    });
    
    // Populate the map with results
    results.forEach(result => {
      const keywordData = keywordsMap.get(result.keyword);
      if (keywordData) {
        keywordData.count += 1;
        if (result.hasBrandMention) keywordData.mentions += 1;
        if (result.isProminent) keywordData.prominent += 1;
      }
    });
    
    // Calculate scores
    const keywordStrength = Array.from(keywordsMap.entries()).map(([keyword, data]) => {
      // Calculate a score out of 10
      // Score = (prominent * 10 + non-prominent mentions * 5) / max possible score
      const score = data.count > 0 
        ? Math.round(((data.prominent * 10 + (data.mentions - data.prominent) * 5) / (data.count * 10)) * 10)
        : 0;
      
      return {
        keyword,
        score: Math.max(1, score) // Minimum score of 1
      };
    });
    
    // Track competitor mentions across all results
    const competitorsDetected: Record<string, number> = {};
    results.forEach(result => {
      if (result.competitorAnalysis?.competitorsFound) {
        result.competitorAnalysis.competitorsFound.forEach(comp => {
          competitorsDetected[comp] = (competitorsDetected[comp] || 0) + 1;
        });
      }
    });
    
    // Determine overall risk level
    let riskLevel = "low";
    const competitorOutrankingCount = results.filter(
      r => r.competitorAnalysis?.competitorOutranking
    ).length;
    
    if (competitorOutrankingCount > results.length * 0.3) {
      riskLevel = "high";
    } else if (competitorOutrankingCount > 0 || notFound > results.length * 0.5) {
      riskLevel = "medium";
    }
    
    return {
      results,
      overallScore,
      prominentMentions,
      vagueMentions,
      notFound,
      keywordStrength,
      queries,
      riskLevel,
      competitorsDetected
    };
  } catch (error) {
    console.error("Error analyzing AI visibility:", error);
    throw error;
  }
}
