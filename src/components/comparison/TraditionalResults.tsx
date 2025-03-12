
import { Check, X, AlertCircle, Map, Globe, BookOpen, Newspaper } from "lucide-react";
import { TraditionalSearchResults } from "@/services/traditional-search";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

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

  // Helper function to get the appropriate icon for result type
  const getResultTypeIcon = (resultType?: string) => {
    switch(resultType) {
      case 'local':
        return <Map className="h-3 w-3" />;
      case 'organic':
        return <Globe className="h-3 w-3" />;
      case 'knowledge_graph':
        return <BookOpen className="h-3 w-3" />;
      case 'news':
        return <Newspaper className="h-3 w-3" />;
      default:
        return <Globe className="h-3 w-3" />;
    }
  };

  // Helper function to get badge text for result type
  const getResultTypeLabel = (resultType?: string) => {
    switch(resultType) {
      case 'local':
        return 'Local Business';
      case 'organic':
        return 'Website';
      case 'knowledge_graph':
        return 'Knowledge Panel';
      case 'news':
        return 'News';
      default:
        return 'Website';
    }
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
            <AlertCircle className="h-6 w-6 text-amber-500" />
          </div>
          <p className="font-medium">No traditional search results found</p>
          <p className="text-xs mt-2">
            This may happen due to:
            <ul className="list-disc text-left px-8 mt-1">
              <li>API rate limits or temporary issues with SerpAPI</li>
              <li>Query formatting that doesn't return organic results</li>
              <li>The search query might be too complex or specific</li>
            </ul>
            Try using a different keyword or check the console for detailed error messages.
          </p>
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
            <div className="text-muted-foreground text-xs mb-1 flex items-center gap-1">
              <span>Position: #{result.rank}</span>
              <span className="mx-1">•</span>
              <Badge variant="outline" className="h-5 px-1 flex items-center gap-1 text-xs">
                {getResultTypeIcon(result.resultType)}
                <span>{getResultTypeLabel(result.resultType)}</span>
              </Badge>
            </div>
            <div className="text-xs text-blue-600 mb-1 truncate">{result.url}</div>
            <div>{result.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
