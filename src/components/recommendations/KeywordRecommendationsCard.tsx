
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface KeywordRecommendation {
  keyword: string;
  reason: string;
}

interface KeywordRecommendationsCardProps {
  keywordRecommendations: KeywordRecommendation[];
}

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
          {keywordRecommendations.map((item: KeywordRecommendation) => (
            <div key={item.keyword} className="border-l-4 border-primary pl-4 py-1">
              <p className="font-medium">{item.keyword}</p>
              <p className="text-sm text-muted-foreground">{item.reason}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
