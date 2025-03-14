
import { AIResults } from "@/components/comparison/AIResults";
import { TraditionalResults } from "@/components/comparison/TraditionalResults";
import { TraditionalSearchResults } from "@/services/traditional-search";
import { Badge } from "@/components/ui/badge";
import { analyzeSentiment, detectRecommendation, generateComparisonInsights } from "@/utils/sentimentAnalysis";

interface ComparisonResultsProps {
  aiResult: any;
  comparisonData: TraditionalSearchResults | null;
  brandName?: string;
}

export const ComparisonResults = ({ aiResult, comparisonData, brandName = "" }: ComparisonResultsProps) => {
  if (!aiResult || !comparisonData) return null;
  
  // Calculate visibility level with improved logic
  const hasBrandMention = aiResult.hasBrandMention || (aiResult.visibilityScore?.level !== "not_found");
  
  // Improved logic for determining prominence
  const isProminent = aiResult.isProminent || 
    (hasBrandMention && aiResult.response && 
      aiResult.response.toLowerCase().indexOf(brandName.toLowerCase()) < aiResult.response.length / 3);
  
  const visibilityLevel = isProminent ? "high" : 
    hasBrandMention ? "moderate" : "not_found";
  
  // Get competitor mentions
  const competitorMentions = aiResult.competitorAnalysis?.competitorsFound || [];
  
  // Improved brand mention count in AI response
  let brandMentionCount = 0;
  if (aiResult.response && brandName) {
    const regex = new RegExp(brandName, 'gi');
    const matches = aiResult.response.match(regex);
    brandMentionCount = matches ? matches.length : 0;
  }

  // Improved Google search mention count
  let googleMentionCount = 0;
  if (comparisonData.topResults && comparisonData.topResults.length > 0) {
    comparisonData.topResults.forEach(result => {
      if (result.hasBrandMention) {
        googleMentionCount++;
      } else if (
        (result.title && result.title.toLowerCase().includes(brandName.toLowerCase())) ||
        (result.description && result.description.toLowerCase().includes(brandName.toLowerCase())) ||
        (result.url && result.url.toLowerCase().includes(brandName.toLowerCase()))
      ) {
        googleMentionCount++;
      }
    });
  }

  // New: Analyze sentiment and recommendation status
  const sentiment = analyzeSentiment(aiResult.response, brandName);
  const recommendation = detectRecommendation(aiResult.response, brandName);
  
  // Generate comparison insights
  const comparisonInsights = generateComparisonInsights(
    {...aiResult, brandMentionCount, sentiment, recommendation},
    {...comparisonData, brandMentions: googleMentionCount},
    brandName
  );

  // Get status badges for visibility
  const getVisibilityBadge = (level: string) => {
    switch(level) {
      case "high":
        return <Badge className="bg-green-100 text-green-800">High Visibility</Badge>;
      case "moderate":
        return <Badge className="bg-yellow-100 text-yellow-800">Moderate</Badge>;
      case "low": 
        return <Badge className="bg-orange-100 text-orange-800">Low Visibility</Badge>;
      default:
        return <Badge className="bg-red-100 text-red-800">Not Found</Badge>;
    }
  };

  // Get single consolidated status badge
  const getConsolidatedStatusBadge = () => {
    if (isProminent && recommendation.level === 'explicitly_recommended') {
      return <Badge className="bg-green-100 text-green-800">✅ Strong AI Visibility</Badge>;
    } else if (hasBrandMention && !isProminent) {
      return <Badge className="bg-yellow-100 text-yellow-800">⚠️ Needs Optimization</Badge>;
    } else if (!hasBrandMention) {
      return <Badge className="bg-red-100 text-red-800">❌ Not Found in AI</Badge>;
    } else {
      return <Badge className="bg-yellow-100 text-yellow-800">⚠️ Mentioned, Not Recommended</Badge>;
    }
  };

  // Generate actionable hypotheses
  const getActionableHypotheses = () => {
    const hypotheses = [];
    
    if (!isProminent && hasBrandMention) {
      hypotheses.push("Does AI prefer brands with more structured, AI-optimized content?");
    }
    
    if (recommendation.level !== 'explicitly_recommended' && hasBrandMention) {
      hypotheses.push("Can increasing external citations improve AI recommendations?");
    }
    
    if (googleMentionCount > 0 && !hasBrandMention) {
      hypotheses.push("Why does the brand appear in traditional search but not in AI responses?");
    }
    
    if (competitorMentions.length > 0) {
      hypotheses.push(`Are competitors (${competitorMentions.join(', ')}) doing something different for AI visibility?`);
    }
    
    return hypotheses;
  };

  // Create side-by-side comparison data
  const comparisonTableData = {
    ai: {
      mentions: `${hasBrandMention ? '🟡 Mentioned' : '🔴 Not Found'} (${brandMentionCount}x)`,
      recommendation: `${recommendation.level === 'explicitly_recommended' ? '✅ Recommended' : '⚠️ Not Recommended'}`,
      sentiment: `${
        sentiment.sentiment === 'positive' ? '🟢 Positive' : 
        sentiment.sentiment === 'negative' ? '🔴 Negative' : 
        '🔹 Neutral'
      }`
    },
    google: {
      mentions: `${googleMentionCount > 0 ? (
        comparisonData.topResults[0]?.hasBrandMention ? '🟢 Top Result' : '🟡 Mentioned'
      ) : '🔴 Not Found'} (${googleMentionCount}x)`,
      recommendation: `${googleMentionCount > 0 && comparisonData.topResults[0]?.hasBrandMention ? '✅ Recommended' : '⚠️ Not Highlighted'}`,
      sentiment: '🔹 Neutral' // Google search results don't have sentiment analysis
    }
  };

  return (
    <div className="space-y-6">
      {/* Insight banner */}
      {comparisonData.topResults.length > 0 && (
        <div className="p-4 mb-4 border rounded bg-blue-50 border-blue-200 text-sm">
          <p className="font-medium mb-2 text-blue-800">
            AI vs. Traditional Search Comparison:
          </p>
          <p className="text-blue-800">
            {comparisonInsights}
          </p>
        </div>
      )}
    
      {/* Metrics summary card */}
      <div className="p-4 mb-4 border rounded bg-amber-50 border-amber-200">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-amber-800">Insights:</h3>
          {getConsolidatedStatusBadge()}
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm font-medium text-amber-800 mb-1">{brandName} AI Visibility:</p>
            <p className="text-sm">{visibilityLabels[visibilityLevel]}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-amber-800 mb-1">AI Sentiment:</p>
            <p className="text-sm">{sentiment.sentiment.charAt(0).toUpperCase() + sentiment.sentiment.slice(1)}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-amber-800 mb-1">Mentions in Google:</p>
            <p className="text-sm">{googleMentionCount} times</p>
          </div>
          <div>
            <p className="text-sm font-medium text-amber-800 mb-1">Mentions in AI:</p>
            <p className="text-sm">{brandMentionCount} times</p>
          </div>
        </div>
        
        {/* Side-by-side comparison table */}
        <table className="w-full border-collapse mb-4">
          <thead>
            <tr className="bg-amber-100">
              <th className="text-left py-2 px-3 text-xs font-medium text-amber-800">Search Type</th>
              <th className="text-left py-2 px-3 text-xs font-medium text-amber-800">Brand Mentions</th>
              <th className="text-left py-2 px-3 text-xs font-medium text-amber-800">Recommendation</th>
              <th className="text-left py-2 px-3 text-xs font-medium text-amber-800">Sentiment</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-amber-100">
              <td className="py-2 px-3 text-xs">AI Search</td>
              <td className="py-2 px-3 text-xs">{comparisonTableData.ai.mentions}</td>
              <td className="py-2 px-3 text-xs">{comparisonTableData.ai.recommendation}</td>
              <td className="py-2 px-3 text-xs">{comparisonTableData.ai.sentiment}</td>
            </tr>
            <tr>
              <td className="py-2 px-3 text-xs">Google Search</td>
              <td className="py-2 px-3 text-xs">{comparisonTableData.google.mentions}</td>
              <td className="py-2 px-3 text-xs">{comparisonTableData.google.recommendation}</td>
              <td className="py-2 px-3 text-xs">{comparisonTableData.google.sentiment}</td>
            </tr>
          </tbody>
        </table>
        
        {/* Competitor mentions */}
        {competitorMentions.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-medium text-amber-800 mb-1">Competitors in AI Results:</p>
            <p className="text-sm">{competitorMentions.join(', ')}</p>
          </div>
        )}
        
        {/* Actionable Hypotheses */}
        <div>
          <p className="text-sm font-medium text-amber-800 mb-1">Actionable Hypotheses to Test:</p>
          <ul className="list-disc pl-5 space-y-1">
            {getActionableHypotheses().map((hypothesis, index) => (
              <li key={index} className="text-xs">🔹 {hypothesis}</li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AIResults aiResult={{
          ...aiResult, 
          brandMentionCount, 
          isProminent, 
          brandName,
          sentiment,
          recommendation
        }} />
        <TraditionalResults comparisonData={{...comparisonData, brandMentions: googleMentionCount}} />
      </div>
    </div>
  );
};

// Visibility label mapping
const visibilityLabels: Record<string, string> = {
  "high": "Strong Visibility",
  "moderate": "Moderate Visibility",
  "low": "Low Visibility",
  "not_found": "Not Found"
};
