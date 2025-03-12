import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { identifyKeywordIntent } from "@/utils/queryTemplates";
import type { QueryType } from "@/utils/queryTemplates";
import { Badge } from "@/components/ui/badge";
import { Lightbulb } from "lucide-react";

interface KeywordRecommendation {
  keyword: string;
  reason: string;
  queryType?: QueryType;
  score?: number;
}

interface KeywordRecommendationsCardProps {
  keywordRecommendations: KeywordRecommendation[];
}

// Map query types to user-friendly labels
const queryTypeLabels: Record<QueryType, string> = {
  "general": "General Information",
  "comparison": "Competitor Comparison",
  "negative-sentiment": "Risk Management",
  "review-based": "Review Oriented",
  "ai-assistant": "Conversational"
};

// Map query types to badge colors
const queryTypeBadgeColors: Partial<Record<QueryType, string>> = {
  "general": "bg-blue-100 text-blue-800 hover:bg-blue-100",
  "comparison": "bg-purple-100 text-purple-800 hover:bg-purple-100",
  "negative-sentiment": "bg-red-100 text-red-800 hover:bg-red-100",
  "review-based": "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
  "ai-assistant": "bg-pink-100 text-pink-800 hover:bg-pink-100"
};

export const KeywordRecommendationsCard = ({ keywordRecommendations }: KeywordRecommendationsCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-yellow-500" />
          Keyword Recommendations
        </CardTitle>
        <CardDescription>
          Focus on these keywords to improve AI visibility
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {keywordRecommendations.map((item: KeywordRecommendation) => {
            // Auto-identify query type if not provided
            const queryType = item.queryType || identifyKeywordIntent(item.keyword);
            const badgeColor = queryTypeBadgeColors[queryType] || "";
            
            return (
              <div key={item.keyword} className="border-l-4 border-primary pl-4 py-1">
                <div className="flex justify-between items-center mb-1">
                  <p className="font-medium">{item.keyword}</p>
                  <Badge variant="outline" className={`text-xs ${badgeColor}`}>
                    {queryTypeLabels[queryType]}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{item.reason}</p>
                {item.score !== undefined && (
                  <div className="mt-1 text-xs">
                    <span className="text-muted-foreground">Opportunity score: </span>
                    <span className={
                      item.score >= 8 ? "text-green-600 font-medium" : 
                      item.score >= 5 ? "text-yellow-600 font-medium" : 
                      "text-red-600 font-medium"
                    }>
                      {item.score}/10
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
