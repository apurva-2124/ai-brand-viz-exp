
export interface RecommendationData {
  visibilityTips: string[];
  keywordRecommendations: KeywordRecommendation[];
  contentStrategy: ContentStrategy[];
  aiOptimizationTips?: AIOptimizationTip[];
}

export interface KeywordRecommendation {
  keyword: string;
  reason: string;
}

export interface ContentStrategy {
  title: string;
  description: string;
  example: string;
}

export interface AIOptimizationTip {
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
}
