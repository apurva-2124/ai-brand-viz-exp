
import { VisibilityResult } from "./types";
import { BrandData } from "@/components/BrandTracker";

export function calculateVisibilityMetrics(results: VisibilityResult[], brandData: BrandData) {
  // Count metrics
  const prominentMentions = results.filter(r => r.visibilityScore.level === "high").length;
  const vagueMentions = results.filter(r => r.visibilityScore.level === "low").length;
  const notFound = results.filter(r => r.visibilityScore.level === "not_found").length;
  
  // Generate a score from 0-100
  const totalPossibleScore = results.length * 10;
  const earnedScore = results.reduce((sum, r) => sum + r.visibilityScore.score, 0);
  const overallScore = Math.round((earnedScore / totalPossibleScore) * 100);
  
  // Calculate keyword strength
  const keywordStrength = calculateKeywordStrength(results, brandData.keywords);
  
  // Track competitor mentions across all results
  const competitorsDetected = trackCompetitors(results);
  
  // Determine overall risk level
  const riskLevel = assessRiskLevel(results, notFound);
  
  return {
    overallScore,
    prominentMentions,
    vagueMentions,
    notFound,
    keywordStrength,
    riskLevel,
    competitorsDetected
  };
}

function calculateKeywordStrength(results: VisibilityResult[], keywords: string[]) {
  const keywordsMap = new Map<string, { mentions: number; prominent: number; count: number }>();
  
  // Initialize the map with all keywords
  keywords.forEach(keyword => {
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
  return Array.from(keywordsMap.entries()).map(([keyword, data]) => {
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
}

function trackCompetitors(results: VisibilityResult[]) {
  const competitorsDetected: Record<string, number> = {};
  results.forEach(result => {
    if (result.competitorAnalysis?.competitorsFound) {
      result.competitorAnalysis.competitorsFound.forEach(comp => {
        competitorsDetected[comp] = (competitorsDetected[comp] || 0) + 1;
      });
    }
  });
  return competitorsDetected;
}

function assessRiskLevel(results: VisibilityResult[], notFound: number) {
  let riskLevel = "low";
  const competitorOutrankingCount = results.filter(
    r => r.competitorAnalysis?.competitorOutranking
  ).length;
  
  if (competitorOutrankingCount > results.length * 0.3) {
    riskLevel = "high";
  } else if (competitorOutrankingCount > 0 || notFound > results.length * 0.5) {
    riskLevel = "medium";
  }
  return riskLevel;
}
