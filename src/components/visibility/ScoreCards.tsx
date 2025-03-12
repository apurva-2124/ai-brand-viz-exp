
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BrandData } from "@/components/BrandTracker";
import { AIReadinessScore } from "@/components/AIReadinessScore";

interface ScoreCardsProps {
  overallScore: number;
  brandData: BrandData;
}

export const ScoreCards = ({ overallScore, brandData }: ScoreCardsProps) => {
  
  const getScoreColor = (score: number) => {
    if (score >= 70) return "bg-green-500";
    if (score >= 40) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Overall AI Visibility</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="inline-flex items-center justify-center rounded-full w-24 h-24 bg-secondary text-3xl font-bold">
              {overallScore}
            </div>
            <p className="mt-2 text-muted-foreground">out of 100</p>
          </div>
          <Progress 
            value={overallScore} 
            className={`h-2 mt-4 ${getScoreColor(overallScore)}`} 
          />
        </CardContent>
      </Card>

      <AIReadinessScore 
        brandData={brandData} 
        visibilityScore={overallScore} 
      />
    </div>
  );
};
