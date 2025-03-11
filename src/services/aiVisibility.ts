
// Combined AI visibility service
import { BrandData } from "@/components/BrandTracker";
import * as openAI from "./openai";
import * as anthropic from "./anthropic";

export type AIProvider = "openai" | "anthropic" | "both";
export type VisibilityResult = {
  keyword: string;
  response: string;
  hasBrandMention: boolean;
  isProminent: boolean;
  provider: string;
};

export async function analyzeAIVisibility(
  brandData: BrandData,
  provider: AIProvider = "both"
): Promise<{
  results: VisibilityResult[];
  overallScore: number;
  prominentMentions: number;
  vagueMentions: number;
  notFound: number;
  keywordStrength: { keyword: string; score: number }[];
}> {
  let results: VisibilityResult[] = [];
  
  try {
    // Run OpenAI analysis if requested
    if (provider === "openai" || provider === "both") {
      const openAIResults = await openAI.analyzeBrandVisibility(brandData);
      results = results.concat(
        openAIResults.map(result => ({ ...result, provider: "OpenAI" }))
      );
    }
    
    // Run Anthropic analysis if requested
    if (provider === "anthropic" || provider === "both") {
      const anthropicResults = await anthropic.analyzeBrandVisibility(brandData);
      results = results.concat(
        anthropicResults.map(result => ({ ...result, provider: "Anthropic" }))
      );
    }
    
    // Calculate metrics
    const prominentMentions = results.filter(r => r.isProminent).length;
    const vagueMentions = results.filter(r => r.hasBrandMention && !r.isProminent).length;
    const notFound = results.filter(r => !r.hasBrandMention).length;
    
    // Generate a score from 0-100
    const totalPossibleScore = results.length * 10;
    const earnedScore = (prominentMentions * 10) + (vagueMentions * 5);
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
    
    return {
      results,
      overallScore,
      prominentMentions,
      vagueMentions,
      notFound,
      keywordStrength
    };
  } catch (error) {
    console.error("Error analyzing AI visibility:", error);
    throw error;
  }
}
