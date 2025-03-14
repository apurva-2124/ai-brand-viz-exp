
import { BrandData } from "@/components/BrandTracker";
import { QueryType } from "@/utils/queryTransformer";

export type AIProvider = "openai" | "anthropic" | "gemini" | "all";

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
  brandMentionCount?: number;
  sentiment?: {
    sentiment: 'positive' | 'neutral' | 'negative';
    score: number;
    explanation: string;
  };
  recommendationStatus?: {
    level: 'explicitly_recommended' | 'mentioned_not_recommended' | 'not_mentioned';
    explanation: string;
  };
  brandName?: string; // Add brandName for highlighting in UI
};

export interface AIVisibilityOptions {
  brandData: BrandData;
  provider?: AIProvider;
  queryType?: QueryType;
}

export interface AIVisibilityAnalysisResult {
  results: VisibilityResult[];
  overallScore: number;
  prominentMentions: number;
  vagueMentions: number;
  notFound: number;
  keywordStrength: { keyword: string; score: number }[];
  queries: Array<{ keyword: string; query: string }>;
  riskLevel: string;
  competitorsDetected: Record<string, number>;
}
