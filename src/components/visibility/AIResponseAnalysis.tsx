
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Wifi } from "lucide-react";

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
  }>;
}

export const AIResponseAnalysis = ({ results }: AIResponseAnalysisProps) => {
  const getVisibilityStatusBadge = (level: string) => {
    switch(level) {
      case "high":
        return <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">✅ High Visibility</span>;
      case "low":
        return <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">⚠️ Needs Optimization</span>;
      default:
        return <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">❌ Missing from AI Results</span>;
    }
  };
  
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
              <p className="text-sm mt-2">
                Please try again later or check if you're using the correct proxy URL.
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
              <p className="text-sm mt-2">
                Try refreshing the page or contact support if the issue persists.
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
                <div>
                  {getVisibilityStatusBadge(result.visibilityScore?.level || 
                    (result.isProminent ? 'high' : result.hasBrandMention ? 'low' : 'not_found'))}
                </div>
              </div>
              <div className="text-sm text-muted-foreground mb-2">
                <strong>Query:</strong> {result.query}
              </div>
              
              {result.competitorAnalysis?.competitorsFound?.length > 0 && (
                <div className="text-sm text-orange-700 mb-2">
                  <strong>Competitors found:</strong> {result.competitorAnalysis.competitorsFound.join(', ')}
                  {result.competitorAnalysis.competitorOutranking && (
                    <span className="ml-2 text-red-600 font-medium">
                      (Outranking your brand)
                    </span>
                  )}
                </div>
              )}
              
              {result.recommendation && (
                <div className="text-sm text-blue-700 mb-2">
                  <strong>Recommendation:</strong> {result.recommendation}
                </div>
              )}
              
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
