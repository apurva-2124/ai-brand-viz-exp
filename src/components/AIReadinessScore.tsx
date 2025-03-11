
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CircleGauge, Info, ChevronDown, ChevronUp } from "lucide-react";
import { BrandData } from "@/components/BrandTracker";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface AIReadinessScoreProps {
  brandData: BrandData;
  visibilityScore: number;
}

export const AIReadinessScore = ({ brandData, visibilityScore }: AIReadinessScoreProps) => {
  const [showDetails, setShowDetails] = useState(false);
  
  // Calculate the readiness score (0-100)
  // Based on visibility score (50%), keyword quality (25%), and brand data completeness (25%)
  const keywordScore = Math.min(100, brandData.keywords.length * 10);
  const dataCompletenessScore = 
    (brandData.name ? 20 : 0) + 
    (brandData.industry ? 20 : 0) + 
    (brandData.description ? 20 : 0) + 
    (brandData.keywords.length > 0 ? 20 : 0) +
    (brandData.website ? 20 : 0);
  
  const readinessScore = Math.round(
    (visibilityScore * 0.5) + 
    (keywordScore * 0.25) + 
    (dataCompletenessScore * 0.25)
  );

  // Generate recommendations based on scores
  const recommendations = [];
  if (visibilityScore < 60) {
    recommendations.push("Improve brand visibility in AI responses");
  }
  if (keywordScore < 60) {
    recommendations.push("Add more targeted keywords (aim for at least 10)");
  }
  if (!brandData.description || brandData.description.length < 100) {
    recommendations.push("Provide a more detailed brand description");
  }
  if (!brandData.website) {
    recommendations.push("Add your website URL for better tracking");
  }

  // Optional: add more specific recommendations based on other factors
  
  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-green-500";
    if (score >= 40) return "text-yellow-500";
    return "text-red-500";
  };

  const getProgressColor = (score: number) => {
    if (score >= 70) return "bg-green-500";
    if (score >= 40) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <CircleGauge className="h-5 w-5 mr-2" />
          AI Readiness Score
        </CardTitle>
        <CardDescription>
          How well your brand is optimized for AI search engines
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center my-4">
          <div className={`text-5xl font-bold ${getScoreColor(readinessScore)}`}>
            {readinessScore}%
          </div>
        </div>
        
        <Progress 
          value={readinessScore} 
          className={`h-2 mb-6 ${getProgressColor(readinessScore)}`} 
        />
        
        <Alert variant="info" className="mb-4">
          <Info className="h-4 w-4" />
          <AlertDescription>
            <span className="font-semibold">{brandData.name}</span> is {readinessScore}% optimized for AI search. 
            {recommendations.length > 0 && " Here's what's missing:"}
          </AlertDescription>
        </Alert>

        {recommendations.length > 0 && (
          <div className="space-y-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowDetails(!showDetails)}
              className="w-full flex justify-between"
            >
              <span>Improvement Opportunities</span>
              {showDetails ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
            
            {showDetails && (
              <ul className="space-y-2 pl-5 list-disc text-sm">
                {recommendations.map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
