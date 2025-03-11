
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Zap, Lightbulb, ExternalLink } from "lucide-react";

interface VisibilityTip {
  tip: string;
  index: number;
  impact?: "high" | "medium" | "low";
}

interface VisibilityRecommendationsCardProps {
  visibilityTips: string[];
}

export const VisibilityRecommendationsCard = ({ visibilityTips }: VisibilityRecommendationsCardProps) => {
  // Map impact levels to more engaging colors and icons
  const getImpactStyle = (index: number) => {
    // Determine impact level based on position in the list
    // First items are typically higher impact
    const impact = index < 2 ? "high" : index < 4 ? "medium" : "low";
    
    switch(impact) {
      case "high":
        return {
          bgColor: "bg-red-100",
          textColor: "text-red-800",
          icon: <Zap className="h-3.5 w-3.5" />,
          label: "High impact"
        };
      case "medium":
        return {
          bgColor: "bg-yellow-100",
          textColor: "text-yellow-800",
          icon: <Lightbulb className="h-3.5 w-3.5" />,
          label: "Medium impact"
        };
      case "low":
        return {
          bgColor: "bg-blue-100",
          textColor: "text-blue-800",
          icon: <ExternalLink className="h-3.5 w-3.5" />,
          label: "Supplementary"
        };
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-yellow-500" />
          AI Visibility Optimization
        </CardTitle>
        <CardDescription>
          Ways to improve your brand's presence in AI search results
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {visibilityTips.map((tip: string, index: number) => {
            const { bgColor, textColor, icon, label } = getImpactStyle(index);
            
            return (
              <li key={index} className="flex gap-3">
                <div className={`${bgColor} ${textColor} rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0`}>
                  {icon}
                </div>
                <div>
                  <p>{tip}</p>
                  <p className={`text-xs ${index < 2 ? 'text-red-600' : index < 4 ? 'text-yellow-600' : 'text-blue-600'} mt-1 font-medium`}>
                    {label} {index === 0 && "— implement quickly for best results"}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
};
