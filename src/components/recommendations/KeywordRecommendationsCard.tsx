
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { QueryType, identifyKeywordIntent } from "@/utils/queryTransformer";
import { Badge } from "@/components/ui/badge";

interface KeywordRecommendation {
  keyword: string;
  reason: string;
  queryType?: QueryType;
}

interface KeywordRecommendationsCardProps {
  keywordRecommendations: KeywordRecommendation[];
}

// Map query types to user-friendly labels
const queryTypeLabels: Record<QueryType, string> = {
  "best-in-class": "Category Leader",
  "feature-specific": "Feature Focus",
  "comparison": "Competitor Comparison",
  "review-based": "Review Oriented",
  "transactional": "Purchase Intent",
  "ai-summarized": "AI Summary",
  "localized": "Location Based",
  "ai-assistant": "Conversational",
  "negative-sentiment": "Risk Management",
  "industry-trend": "Thought Leadership"
};

export const KeywordRecommendationsCard = ({ keywordRecommendations }: KeywordRecommendationsCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Keyword Recommendations</CardTitle>
        <CardDescription>
          Focus on these keywords to improve AI visibility
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {keywordRecommendations.map((item: KeywordRecommendation) => {
            // Auto-identify query type if not provided
            const queryType = item.queryType || identifyKeywordIntent(item.keyword);
            
            return (
              <div key={item.keyword} className="border-l-4 border-primary pl-4 py-1">
                <div className="flex justify-between items-center mb-1">
                  <p className="font-medium">{item.keyword}</p>
                  <Badge variant="outline" className="text-xs">
                    {queryTypeLabels[queryType]}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{item.reason}</p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
