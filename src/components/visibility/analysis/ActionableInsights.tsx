
import { ArrowRight } from "lucide-react";

interface ActionableInsightsProps {
  result: any;
}

export const ActionableInsights = ({ result }: ActionableInsightsProps) => {
  const insights = getActionableInsights(result);
  
  if (result.hasBrandMention === undefined || insights.length === 0) {
    return null;
  }
  
  return (
    <div className="mb-3 bg-blue-50 p-2 rounded-md">
      <p className="text-sm font-medium text-blue-800 mb-1">Actionable Insights:</p>
      <ul className="space-y-1">
        {insights.map((insight, i) => (
          <li key={i} className="text-xs text-blue-800 flex">
            <ArrowRight className="h-3 w-3 mr-1 flex-shrink-0 mt-0.5" />
            <span>{insight}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Generate actionable insights based on sentiment and recommendation status
const getActionableInsights = (result: any) => {
  const insights = [];
  
  if (!result.hasBrandMention) {
    insights.push("Increase brand mentions in AI-generated responses for this query");
  } else if (result.recommendationStatus?.level === 'mentioned_not_recommended') {
    insights.push("AI search does not explicitly recommend your brand. Consider optimizing content for AI models.");
  }
  
  if (result.sentiment?.sentiment === 'negative') {
    insights.push("AI-generated content may be misrepresenting your brand. Consider addressing negative AI sentiment.");
  } else if (result.sentiment?.sentiment === 'neutral' && result.hasBrandMention) {
    insights.push("Increase brand authority signals in AI-generated responses.");
  }
  
  if (result.competitorAnalysis?.competitorsFound?.length > 0) {
    insights.push(`Address competitor mentions (${result.competitorAnalysis.competitorsFound.join(', ')}) in AI results.`);
  }
  
  return insights;
};
