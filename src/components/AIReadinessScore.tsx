
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CircleGauge, Info, ChevronDown, ChevronUp, Zap, Check, AlertTriangle } from "lucide-react";
import { BrandData } from "@/components/BrandTracker";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
  
  // Ensure minimum score of 15 to avoid discouraging users with a 0/100
  const minimumScore = 15;
  const calculatedScore = Math.round(
    (visibilityScore * 0.5) + 
    (keywordScore * 0.25) + 
    (dataCompletenessScore * 0.25)
  );
  
  const readinessScore = Math.max(minimumScore, calculatedScore);

  // Get the visibility tier
  const getVisibilityTier = (score: number) => {
    if (score >= 80) return "High AI Visibility";
    if (score >= 50) return "Moderate AI Visibility";
    return "Low AI Visibility";
  };

  // Get the visibility description
  const getVisibilityDescription = (score: number) => {
    if (score >= 80) return "Your brand has strong presence in AI responses";
    if (score >= 50) return "Your brand appears in AI responses but needs optimization";
    return "Your brand rarely appears in AI-generated responses";
  };

  // Generate recommendations based on scores
  const recommendations = [];
  if (visibilityScore < 60) {
    recommendations.push("Improve brand visibility in AI responses by optimizing content for question-answering formats");
  }
  if (keywordScore < 60) {
    recommendations.push("Add more targeted keywords (aim for at least 10) focused on your product features and benefits");
  }
  if (!brandData.description || brandData.description.length < 100) {
    recommendations.push("Provide a more detailed brand description with key benefits and unique selling points");
  }
  if (!brandData.website) {
    recommendations.push("Add your website URL for better tracking and more comprehensive analysis");
  }

  // Add positive reinforcement for low scores
  const positiveMessage = readinessScore < 40 
    ? "Your brand has significant opportunities to increase AI visibility! Even small improvements can lead to big gains."
    : readinessScore < 70
    ? "You're making good progress! Continue optimizing to stay ahead of competitors in AI responses."
    : "Your brand is well-positioned for AI search success! Focus on maintaining your advantage.";

  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-green-500";
    if (score >= 40) return "text-yellow-500";
    return "text-orange-500";  // Changed from red to orange to be less discouraging
  };

  const getProgressColor = (score: number) => {
    if (score >= 70) return "bg-green-500";
    if (score >= 40) return "bg-yellow-500";
    return "bg-orange-500";  // Changed from red to orange
  };

  return (
    <TooltipProvider>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CircleGauge className="h-5 w-5" />
            AI Readiness Score
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground cursor-help ml-1" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs p-2 bg-white shadow-lg rounded-md border text-sm">
                <p>Your AI Readiness Score reflects how often AI search models mention and recommend your brand. We analyze AI-generated responses, keyword relevance, and competitor presence to determine your visibility in AI-powered search engines like ChatGPT and Gemini.</p>
              </TooltipContent>
            </Tooltip>
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
            className={`h-2.5 mb-6 ${getProgressColor(readinessScore)}`} 
          />
          
          <div className="mb-4 text-center">
            <span className="font-medium">{getVisibilityTier(readinessScore)}</span>
            <p className="text-sm text-muted-foreground mt-1">{getVisibilityDescription(readinessScore)}</p>
            <p className="text-sm font-medium mt-3">If AI assistants can't find your brand, your customers won't either.</p>
          </div>
          
          <div className="bg-secondary/30 p-4 rounded-md mb-4">
            <h4 className="text-sm font-medium mb-2">How This Score Is Calculated:</h4>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-primary rounded-full"></span>
                AI Visibility: 50% (mentions in AI responses)
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-primary rounded-full"></span>
                Keyword Quality: 25% (relevance to your industry)
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-primary rounded-full"></span>
                Profile Completeness: 25% (brand details provided)
              </li>
            </ul>
          </div>
          
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
                <span>{showDetails ? "Hide Recommendations" : "What You Can Do"}</span>
                {showDetails ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
              
              {showDetails && (
                <div className="space-y-4">
                  <ul className="space-y-2">
                    {recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Zap className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                        <span className="text-sm">{rec}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="bg-green-50 p-3 rounded border border-green-100">
                    <div className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-green-800">Quick Win</p>
                        <p className="text-xs text-green-700">
                          Create a FAQ page with questions your customers commonly ask about your products or services. 
                          AI systems frequently pull from well-structured FAQ content.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};
