
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Check, ThumbsUp, ThumbsDown, Minus, X, ArrowRight, Wifi } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
  
  // Function to highlight brand mentions in the response
  const highlightBrandMentions = (text: string, brandName: string) => {
    if (!text || !brandName || brandName.trim() === '') return text;
    
    // Check if the text is an error message related to the proxy
    if (
      text.includes("Proxy server") || 
      text.includes("Failed to fetch") ||
      text.includes("timeout") ||
      text.includes("unreachable") ||
      text.includes("USING MOCK DATA") ||
      text === "No response content" ||
      text.includes("Could not extract content")
    ) {
      return `<div class="flex items-center gap-2 text-blue-600">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="flex-shrink-0">
          <path d="M5 12.55a11 11 0 0 1 14.08 0"></path>
          <path d="M1.42 9a16 16 0 0 1 21.16 0"></path>
          <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
          <path d="M12 20h.01"></path>
        </svg>
        <span class="font-medium">${text}</span>
      </div>`;
    }
    
    // Create a regex with word boundaries to match the brand name
    const regex = new RegExp(`\\b${brandName}\\b`, 'gi');
    
    // Replace each occurrence with the highlighted version
    return text.replace(regex, match => 
      `<span class="font-bold text-green-600">${match}</span>`
    );
  };

  // Get consolidated status badge
  const getStatusBadge = (result: any) => {
    const hasBrandMention = result.hasBrandMention;
    const isProminent = result.isProminent;
    
    if (result.recommendationStatus?.level === 'explicitly_recommended') {
      return (
        <Badge className="bg-green-100 text-green-800">
          ✅ Strong AI Recommendation
        </Badge>
      );
    } else if (hasBrandMention && result.recommendationStatus?.level === 'mentioned_not_recommended') {
      return (
        <Badge className="bg-yellow-100 text-yellow-800">
          ⚠️ Needs Optimization
        </Badge>
      );
    } else if (isProminent) {
      return (
        <Badge className="bg-green-100 text-green-800">
          ✅ Prominently Featured
        </Badge>
      );
    } else if (hasBrandMention) {
      return (
        <Badge className="bg-yellow-100 text-yellow-800">
          🟡 Mentioned
        </Badge>
      );
    } else {
      return (
        <Badge className="bg-red-100 text-red-800">
          ❌ Not Found
        </Badge>
      );
    }
  };
  
  // Get sentiment badge
  const getSentimentBadge = (result: any) => {
    if (!result.sentiment) return null;
    
    switch (result.sentiment.sentiment) {
      case 'positive':
        return (
          <Badge className="bg-green-100 text-green-800">
            🟢 Positive
          </Badge>
        );
      case 'negative':
        return (
          <Badge className="bg-red-100 text-red-800">
            🔴 Negative
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-100 text-gray-800">
            🔹 Neutral
          </Badge>
        );
    }
  };
  
  // Generate actionable insights based on sentiment and recommendation status
  const getActionableInsights = (result: any) => {
    const insights = [];
    
    if (!result.hasBrandMention) {
      insights.push("Increase brand mentions in AI-generated responses for this query");
    } else if (result.recommendationStatus?.level === 'mentioned_not_recommended') {
      insights.push("AI search does not explicitly recommend your brand. Consider optimizing content for AI models.");
    }
    
    if (result.sentiment?.sentiment === 'negative') {
      insights.push("AI-generated content may be misrepresenting your brand. Consider addressing negative AI sentiment.");
    } else if (result.sentiment?.sentiment === 'neutral' && result.hasBrandMention) {
      insights.push("Increase brand authority signals in AI-generated responses.");
    }
    
    if (result.competitorAnalysis?.competitorsFound?.length > 0) {
      insights.push(`Address competitor mentions (${result.competitorAnalysis.competitorsFound.join(', ')}) in AI results.`);
    }
    
    return insights;
  };

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
        {allProxyErrors && (
          <div className="bg-blue-50 border border-blue-100 rounded-md p-4 mb-4 text-blue-800 flex items-start gap-2">
            <AlertTriangle className="h-5 w-5 text-blue-500 mt-0.5" />
            <div>
              <p className="font-medium">AI Proxy Server Temporarily Unavailable</p>
              <p className="text-sm mt-1">
                The AI proxy server is currently unreachable. We're displaying sample data for demonstration purposes.
              </p>
            </div>
          </div>
        )}
        
        {allNoContent && !allProxyErrors && (
          <div className="bg-blue-50 border border-blue-100 rounded-md p-4 mb-4 text-blue-800 flex items-start gap-2">
            <AlertTriangle className="h-5 w-5 text-blue-500 mt-0.5" />
            <div>
              <p className="font-medium">API Response Format Issue</p>
              <p className="text-sm mt-1">
                The AI proxy returned a success response but we couldn't extract the content. This could be due to changes in the API response format.
              </p>
            </div>
          </div>
        )}
        
        <div className="space-y-6">
          {results.slice(0, 5).map((result, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex flex-wrap justify-between mb-2">
                <div>
                  <span className="font-medium">{result.keyword}</span>
                  <span className="text-xs ml-2 text-muted-foreground">via {result.provider}</span>
                  {result.queryType && (
                    <span className="text-xs ml-2 px-2 py-0.5 bg-secondary rounded-full">{result.queryType}</span>
                  )}
                </div>
                {getStatusBadge(result)}
              </div>
              
              <div className="text-sm text-muted-foreground mb-2">
                <strong>Query:</strong> {result.query}
              </div>
              
              {/* Sentiment badge - only show if we have sentiment data */}
              {result.sentiment && (
                <div className="mb-2">
                  {getSentimentBadge(result)}
                </div>
              )}
              
              {/* Competitor analysis - only if competitors found */}
              {result.competitorAnalysis?.competitorsFound?.length > 0 && (
                <div className="text-sm text-orange-700 mb-2">
                  <strong>Competitors found:</strong> {result.competitorAnalysis.competitorsFound.join(', ')}
                </div>
              )}
              
              {/* Actionable insights section - in a blue box */}
              {result.hasBrandMention !== undefined && getActionableInsights(result).length > 0 && (
                <div className="mb-3 bg-blue-50 p-2 rounded-md">
                  <p className="text-sm font-medium text-blue-800 mb-1">Actionable Insights:</p>
                  <ul className="space-y-1">
                    {getActionableInsights(result).map((insight, i) => (
                      <li key={i} className="text-xs text-blue-800 flex">
                        <ArrowRight className="h-3 w-3 mr-1 flex-shrink-0 mt-0.5" />
                        <span>{insight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* AI response with highlighted brand mentions */}
              <div className="bg-secondary/50 p-3 rounded text-sm max-h-40 overflow-y-auto">
                <div dangerouslySetInnerHTML={{ 
                  __html: highlightBrandMentions(result.response, result.brandName || '') 
                }} />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
