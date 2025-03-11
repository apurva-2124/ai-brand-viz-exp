
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface CompetitorItem {
  name: string;
  score: number;
}

interface CompetitorListProps {
  competitors: CompetitorItem[];
}

export const CompetitorList = ({ competitors }: CompetitorListProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Competitors in AI Search Results</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-sm text-muted-foreground">
          These competitors are frequently mentioned alongside your brand in AI responses
        </p>
        <div className="space-y-4">
          {competitors.map((competitor) => (
            <div key={competitor.name} className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">{competitor.name}</span>
                <span>{competitor.score}/100</span>
              </div>
              <Progress value={competitor.score} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
