
import { Check, X, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AIResultsProps {
  aiResult: any;
}

export const AIResults = ({ aiResult }: AIResultsProps) => {
  // Use the hasBrandMention and isProminent values from the processed result
  const hasBrandMention = typeof aiResult.hasBrandMention === 'boolean' 
    ? aiResult.hasBrandMention 
    : aiResult.brandMentionCount > 0;
  
  const isProminent = typeof aiResult.isProminent === 'boolean'
    ? aiResult.isProminent
    : false;
    
  // Function to highlight brand mentions and competitors in the response
  const highlightText = (text: string, brandName: string, competitors: string[] = []) => {
    if (!text) return text;
    
    let highlightedText = text;
    
    // Highlight brand mentions if present
    if (brandName && brandName.trim() !== '') {
      // Create a regex with word boundaries to match the brand name
      const regex = new RegExp(`\\b${brandName}\\b`, 'gi');
      
      // Replace each occurrence with the highlighted version
      highlightedText = highlightedText.replace(regex, match => 
        `<span class="font-bold text-green-600">${match}</span>`
      );
    }
    
    // Highlight competitor mentions in red
    if (competitors && competitors.length > 0) {
      competitors.forEach(competitor => {
        if (competitor && competitor.trim() !== '') {
          const compRegex = new RegExp(`\\b${competitor}\\b`, 'gi');
          highlightedText = highlightedText.replace(compRegex, match => 
            `<span class="font-bold text-red-600">${match}</span>`
          );
        }
      });
    }
    
    return highlightedText;
  };

  // Get consolidated status badge
  const getStatusBadge = () => {
    if (aiResult.recommendationStatus?.level === 'explicitly_recommended') {
      return (
        <Badge className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
          ✅ Mentioned & Recommended
        </Badge>
      );
    } else if (hasBrandMention && aiResult.recommendationStatus?.level === 'mentioned_not_recommended') {
      return (
        <Badge className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">
          ⚠ Mentioned, Not Recommended
        </Badge>
      );
    } else if (hasBrandMention) {
      return (
        <Badge className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">
          ⚠ Mentioned, Not Recommended
        </Badge>
      );
    } else {
      return (
        <Badge className="bg-red-100 text-red-800 px-2 py-0.5 rounded-full">
          ❌ Not Mentioned in AI
        </Badge>
      );
    }
  };
  
  // Only display sentiment badge for non-neutral sentiment
  const getSentimentBadge = () => {
    if (!aiResult.sentiment || aiResult.sentiment.sentiment === 'neutral') return null;
    
    switch (aiResult.sentiment.sentiment) {
      case 'positive':
        return <Badge className="bg-green-100 text-green-800">Positive: {aiResult.sentiment.explanation}</Badge>;
      case 'negative':
        return <Badge className="bg-red-100 text-red-800">Negative: {aiResult.sentiment.explanation}</Badge>;
      default:
        return null;
    }
  };

  // Get competitor mentions
  const competitorMentions = aiResult.competitorAnalysis?.competitorsFound || [];

  return (
    <div className="border rounded-lg p-4">
      <h3 className="font-medium mb-3 text-primary">AI Search Results</h3>
      
      <div className="flex flex-wrap gap-2 mb-4">
        <div className="text-sm mb-2 flex-grow">
          <span className="text-muted-foreground">Query:</span> {aiResult.query}
        </div>
        {getStatusBadge()}
      </div>
      
      <div className="flex flex-wrap items-center gap-2 mb-3">
        {getSentimentBadge()}
      </div>
      
      {/* Competitor analysis - only if competitors found */}
      {competitorMentions.length > 0 && (
        <div className="text-sm mb-3 p-2 bg-red-50 rounded-md">
          <strong className="text-red-700">Competitors mentioned:</strong>
          <ul className="list-disc pl-5 mt-1">
            {competitorMentions.map((competitor: string, index: number) => (
              <li key={index} className="text-red-600 font-medium">
                {competitor}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* AI response with highlighted brand mentions and competitors in red */}
      <div className="bg-secondary/30 p-3 rounded text-sm max-h-80 overflow-y-auto">
        <div dangerouslySetInnerHTML={{ 
          __html: highlightText(
            aiResult.response, 
            aiResult.brandName || '', 
            competitorMentions
          ) 
        }} />
      </div>
    </div>
  );
};
