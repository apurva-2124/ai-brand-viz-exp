
import { Check, X, AlertCircle, ThumbsUp, ThumbsDown, Minus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AIResultsProps {
  aiResult: any;
}

export const AIResults = ({ aiResult }: AIResultsProps) => {
  // Use the hasBrandMention and isProminent values from the processed result
  // Fall back to calculating them only if they're not provided
  const hasBrandMention = typeof aiResult.hasBrandMention === 'boolean' 
    ? aiResult.hasBrandMention 
    : aiResult.brandMentionCount > 0;
  
  const isProminent = typeof aiResult.isProminent === 'boolean'
    ? aiResult.isProminent
    : false; // Don't assume prominence if not explicitly set
    
  // Function to highlight brand mentions in the response
  const highlightBrandMentions = (text: string, brandName: string) => {
    if (!text || !brandName || brandName.trim() === '') return text;
    
    // Create a regex with word boundaries to match the brand name
    const regex = new RegExp(`\\b${brandName}\\b`, 'gi');
    
    // Replace each occurrence with the highlighted version
    return text.replace(regex, match => 
      `<span class="font-bold text-green-600">${match}</span>`
    );
  };

  // Get sentiment badge colors
  const getSentimentBadge = () => {
    if (!aiResult.sentiment) return null;
    
    switch (aiResult.sentiment.sentiment) {
      case 'positive':
        return (
          <div className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-2 py-0.5 rounded">
            <ThumbsUp className="h-3 w-3" />
            <span className="text-xs">Positive</span>
          </div>
        );
      case 'negative':
        return (
          <div className="inline-flex items-center gap-1 bg-red-100 text-red-800 px-2 py-0.5 rounded">
            <ThumbsDown className="h-3 w-3" />
            <span className="text-xs">Negative</span>
          </div>
        );
      default:
        return (
          <div className="inline-flex items-center gap-1 bg-gray-100 text-gray-800 px-2 py-0.5 rounded">
            <Minus className="h-3 w-3" />
            <span className="text-xs">Neutral</span>
          </div>
        );
    }
  };
  
  // Get recommendation status
  const getRecommendationStatus = () => {
    if (!aiResult.recommendationStatus) return null;
    
    switch (aiResult.recommendationStatus.level) {
      case 'explicitly_recommended':
        return (
          <div className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-2 py-0.5 rounded">
            <Check className="h-3 w-3" />
            <span className="text-xs">Explicitly Recommended</span>
          </div>
        );
      case 'mentioned_not_recommended':
        return (
          <div className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">
            <AlertCircle className="h-3 w-3" />
            <span className="text-xs">Mentioned, Not Recommended</span>
          </div>
        );
      default:
        return (
          <div className="inline-flex items-center gap-1 bg-red-100 text-red-800 px-2 py-0.5 rounded">
            <X className="h-3 w-3" />
            <span className="text-xs">Not Mentioned</span>
          </div>
        );
    }
  };

  return (
    <div className="border rounded-lg p-4">
      <h3 className="font-medium mb-3 text-primary">AI Search Results</h3>
      <div className="text-sm mb-2">
        <span className="text-muted-foreground">Query:</span> {aiResult.query}
      </div>
      <div className="text-sm mb-2">
        <span className="text-muted-foreground">Provider:</span> {aiResult.provider}
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        <div className={`text-xs px-2 py-1 rounded inline-flex items-center ${
          isProminent 
            ? "bg-green-100 text-green-800" 
            : hasBrandMention 
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
        }`}>
          {isProminent 
            ? "Prominently Featured" 
            : hasBrandMention 
              ? "Mentioned" 
              : "Not Found"}
        </div>
        
        {aiResult.sentiment && getSentimentBadge()}
        {aiResult.recommendationStatus && getRecommendationStatus()}
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-start gap-2">
          {hasBrandMention ? 
            <Check className="h-4 w-4 text-green-600 mt-0.5" /> : 
            <X className="h-4 w-4 text-red-600 mt-0.5" />
          }
          <span className="text-sm">
            {hasBrandMention ? 
              `Brand is mentioned ${aiResult.brandMentionCount ? `${aiResult.brandMentionCount} times` : ""}` : 
              "Brand is missing"}
          </span>
        </div>
        <div className="flex items-start gap-2">
          {isProminent ? 
            <Check className="h-4 w-4 text-green-600 mt-0.5" /> : 
            <X className="h-4 w-4 text-red-600 mt-0.5" />
          }
          <span className="text-sm">
            {isProminent ? "Prominently featured" : "Not prominently featured"}
          </span>
        </div>
        
        {aiResult.sentiment && (
          <div className="flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5" />
            <span className="text-sm">
              {aiResult.sentiment.explanation}
            </span>
          </div>
        )}
        
        {aiResult.competitorAnalysis?.competitorsFound?.length > 0 && (
          <div className="flex items-start gap-2">
            <X className="h-4 w-4 text-orange-600 mt-0.5" />
            <span className="text-sm">
              Competitors mentioned: {aiResult.competitorAnalysis.competitorsFound.join(', ')}
            </span>
          </div>
        )}
      </div>
      
      <div className="bg-secondary/30 p-3 rounded text-sm max-h-80 overflow-y-auto">
        <div dangerouslySetInnerHTML={{ 
          __html: highlightBrandMentions(aiResult.response, aiResult.brandName || '') 
        }} />
      </div>
    </div>
  );
};
