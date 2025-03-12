
import { Check, X, AlertCircle } from "lucide-react";
import { TraditionalSearchResults } from "@/services/traditional-search";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface TraditionalResultsProps {
  comparisonData: TraditionalSearchResults;
}

export const TraditionalResults = ({ comparisonData }: TraditionalResultsProps) => {
  // Define source badge - now only for SerpApi
  const getSourceBadge = () => {
    if (comparisonData.source === "serpapi") {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded ml-2">
                Live Data
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs text-xs">Real-time Google search results retrieved via SerpApi.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }
    return null;
  };

  return (
    <div className="border rounded-lg p-4">
      <h3 className="font-medium mb-3 text-primary flex items-center">
        Traditional Search Results
        {getSourceBadge()}
      </h3>
      
      <div className="text-sm mb-2">
        <span className="text-muted-foreground">Search Engine:</span> {comparisonData.searchEngine}
      </div>
      <div className="text-sm mb-2">
        <span className="text-muted-foreground">Query:</span> {comparisonData.query}
      </div>
      <div className="text-sm mb-2">
        <span className="text-muted-foreground">Brand Mentions:</span> {comparisonData.brandMentions} times
      </div>

      {comparisonData.retrievalDate && (
        <div className="text-xs text-muted-foreground mb-4">
          Data retrieved: {new Date(comparisonData.retrievalDate).toLocaleDateString()}
        </div>
      )}
      
      <div className="space-y-2 mb-4">
        <div className="flex items-start gap-2">
          {comparisonData.brandMentions > 0 ? 
            <Check className="h-4 w-4 text-green-600 mt-0.5" /> : 
            <X className="h-4 w-4 text-red-600 mt-0.5" />
          }
          <span className="text-sm">
            {comparisonData.brandMentions > 0 ? 
              `Brand appears ${comparisonData.brandMentions} times` : 
              "Brand is not mentioned"}
          </span>
        </div>
        
        {comparisonData.topResults[0] && (
          <div className="flex items-start gap-2">
            {comparisonData.topResults[0].hasBrandMention ? 
              <Check className="h-4 w-4 text-green-600 mt-0.5" /> : 
              comparisonData.topResults.some(r => r.hasBrandMention) ?
                <Check className="h-4 w-4 text-yellow-600 mt-0.5" /> :
                <X className="h-4 w-4 text-red-600 mt-0.5" />
            }
            <span className="text-sm">
              {comparisonData.topResults[0].hasBrandMention ? 
                "Brand appears in top result" : 
                comparisonData.topResults.some(r => r.hasBrandMention) ?
                  `Brand appears in position #${comparisonData.topResults.findIndex(r => r.hasBrandMention) + 1}` :
                  "Brand not found in top results"}
            </span>
          </div>
        )}
      </div>
      
      {comparisonData.topResults.length === 0 && (
        <div className="text-center py-6 text-muted-foreground">
          <div className="flex justify-center mb-2">
            <X className="h-6 w-6 text-red-500" />
          </div>
          <p>No traditional search results found.</p>
          <p className="text-xs mt-2">This may happen if SerpAPI couldn't find relevant results for your query.</p>
        </div>
      )}
      
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {comparisonData.topResults.map((result, index) => (
          <div key={index} className={`p-3 rounded text-sm ${result.hasBrandMention ? 'bg-secondary/30' : 'bg-secondary/10'}`}>
            <div className="font-medium mb-1 flex items-center justify-between">
              <div className="break-words pr-2">{result.title}</div>
              {result.hasBrandMention && (
                <span className="text-xs whitespace-nowrap text-green-600">• Brand Mentioned</span>
              )}
            </div>
            <div className="text-muted-foreground text-xs mb-1">Position: #{result.rank}</div>
            <div className="text-xs text-blue-600 mb-1 truncate">{result.url}</div>
            <div>{result.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
