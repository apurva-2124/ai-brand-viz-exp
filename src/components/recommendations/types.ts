
export interface RecommendationData {
  visibilityTips: string[];
  keywordRecommendations: KeywordRecommendation[];
  contentStrategy: ContentStrategy[];
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
