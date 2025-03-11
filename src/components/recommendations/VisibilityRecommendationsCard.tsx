
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface VisibilityTip {
  tip: string;
  index: number;
}

interface VisibilityRecommendationsCardProps {
  visibilityTips: string[];
}

export const VisibilityRecommendationsCard = ({ visibilityTips }: VisibilityRecommendationsCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Visibility Optimization</CardTitle>
        <CardDescription>
          Ways to improve your brand's presence in AI search results
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {visibilityTips.map((tip: string, index: number) => (
            <li key={index} className="flex gap-3">
              <div className="bg-primary/10 text-primary rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0">
                {index + 1}
              </div>
              <p>{tip}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
