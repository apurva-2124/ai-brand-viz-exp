
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wifi } from "lucide-react";
import { ErrorMessages } from "./analysis/ErrorMessages";
import { ResultItem } from "./analysis/ResultItem";

interface AIResponseAnalysisProps {
  results: Array<{
    keyword: string;
    query: string;
    response: string;
    provider: string;
    visibilityScore?: {
      level: string;
      label: string;
      score: number;
      context: string | null;
    };
    hasBrandMention: boolean;
    isProminent: boolean;
    competitorAnalysis?: {
      competitorsFound: string[];
      competitorOutranking: boolean;
      riskLevel: string;
    };
    recommendation?: string;
    queryType?: string;
    brandName?: string;
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
  }>;
}

export const AIResponseAnalysis = ({ results }: AIResponseAnalysisProps) => {
  // Check if all results are proxy errors
  const allProxyErrors = results.every(result => 
    result.response.includes("Proxy server") || 
    result.response.includes("timeout") || 
    result.response.includes("Failed to fetch") ||
    result.response.includes("unreachable")
  );

  // Check if all results are "No response content"
  const allNoContent = results.every(result => 
    result.response === "No response content" ||
    result.response.includes("Could not extract content")
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>AI Response Analysis</span>
          {(allProxyErrors || allNoContent) && (
            <span className="text-xs flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
              <Wifi className="h-3 w-3" /> 
              {allProxyErrors ? "Using fallback data due to proxy unavailability" : "API response issue"}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ErrorMessages 
          allProxyErrors={allProxyErrors}
          allNoContent={allNoContent}
        />
        
        <div className="space-y-6">
          {results.slice(0, 5).map((result, index) => (
            <ResultItem key={index} result={result} index={index} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
