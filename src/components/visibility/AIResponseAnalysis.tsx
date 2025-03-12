
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Response Analysis</CardTitle>
      </CardHeader>
      <CardContent>
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
                <p>{result.response}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
