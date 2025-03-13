
import { Check, X, Info, Map, Globe, BookOpen, Newspaper, ExternalLink, Database, Search } from "lucide-react";
import { TraditionalSearchResults } from "@/services/traditional-search";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface TraditionalResultsProps {
  comparisonData: TraditionalSearchResults;
}

export const TraditionalResults = ({ comparisonData }: TraditionalResultsProps) => {
  // Debug logs
  console.log("TraditionalResults component rendering with data:", comparisonData);
  console.log("Results array:", comparisonData.topResults);
  console.log("Results count:", comparisonData.topResults?.length || 0);
  console.log("Error type:", comparisonData.error);
  console.log("Data source:", comparisonData.source);

  // Define source badge - now for SerpApi, mock data, and proxy
  const getSourceBadge = () => {
    if (comparisonData.source === "serpapi") {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded ml-2">
                Live Data (SerpAPI)
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs text-xs">Real-time Google search results retrieved via SerpApi.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    } else if (comparisonData.source === "mock") {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded ml-2 flex items-center">
                <Database className="h-3 w-3 mr-1" />
                Mock Data
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs text-xs">Generated mock data for testing and development.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    } else if (comparisonData.source === "proxy") {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded ml-2 flex items-center">
                <Search className="h-3 w-3 mr-1" />
                Live Web Search
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs text-xs">Real-time Google search results retrieved via proxy.</p>
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
  
  // Check if we have results or a specific error
  const hasResults = Array.isArray(comparisonData.topResults) && comparisonData.topResults.length > 0;
  const showNoResultsMessage = !hasResults;

  const renderNoResultsMessage = () => {
    let errorTitle = "No traditional search results found";
    let errorDetails = [];
    
    // Get specific error messages based on error type
    if (comparisonData.error === "API_KEY_MISSING") {
      errorTitle = "SerpAPI key is missing";
      errorDetails = ["Please add your SerpAPI key in the settings", "Try checking the API Key Settings page"];
    } else if (comparisonData.error === "API_LIMIT_EXCEEDED") {
      errorTitle = "SerpAPI limit exceeded";
      errorDetails = ["You may have reached your API usage limit", "Try again later or check your API key"];
    } else if (comparisonData.error === "PROXY_ERROR") {
      errorTitle = "Web search access issue";
      errorDetails = ["Could not access Google search via proxy", "The proxy service might be temporarily unavailable", "Try again later or use mock data"];
    } else if (comparisonData.error === "NO_RESULTS") {
      errorTitle = "No search results returned";
      errorDetails = ["The search returned successfully but found no results", "Try a different or simpler search query"];
    } else if (comparisonData.error === "FETCH_ERROR") {
      errorTitle = "Error fetching results";
      errorDetails = ["There was a problem with the search request", "Check your internet connection and try again"];
    }

    return (
      <div className="text-center py-6 border border-amber-200 bg-amber-50 rounded-md my-4">
        <div className="flex justify-center mb-2">
          <Info className="h-6 w-6 text-amber-500" />
        </div>
        <p className="font-medium">{errorTitle}</p>
        <p className="text-sm mt-2 max-w-md mx-auto">
          We couldn't find results for this query. This may happen due to:
        </p>
        <ul className="list-disc text-sm text-left px-12 mx-auto max-w-md mt-2">
          {errorDetails.length > 0 ? 
            errorDetails.map((detail, index) => <li key={index}>{detail}</li>) :
            <>
              <li>The search query might be too specific or complex</li>
              <li>Google might not return results for this particular query format</li>
              <li>The proxy might be blocked by Google temporarily</li>
            </>
          }
        </ul>
        <div className="mt-4">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => window.open(`https://www.google.com/search?q=${encodeURIComponent(comparisonData.query)}`, '_blank')}
          >
            Try this search on Google
          </Button>
        </div>
        
        {/* Add debug info section with detailed API response info */}
        <div className="mt-6 border-t border-amber-200 pt-4 text-xs text-left px-6">
          <p className="font-medium">Debug Information:</p>
          <p>Query: {comparisonData.query}</p>
          <p>Error: {comparisonData.error || "None"}</p>
          <p>Source: {comparisonData.source}</p>
          <p>Top Results Array: {Array.isArray(comparisonData.topResults) ? `Array with ${comparisonData.topResults.length} items` : "Not an array"}</p>
        </div>
      </div>
    );
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
      
      {hasResults && (
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
          
          <div className="flex items-start gap-2">
            {comparisonData.topResults[0]?.hasBrandMention ? 
              <Check className="h-4 w-4 text-green-600 mt-0.5" /> : 
              comparisonData.topResults.some(r => r.hasBrandMention) ?
                <Check className="h-4 w-4 text-yellow-600 mt-0.5" /> :
                <X className="h-4 w-4 text-red-600 mt-0.5" />
            }
            <span className="text-sm">
              {comparisonData.topResults[0]?.hasBrandMention ? 
                "Brand appears in top result" : 
                comparisonData.topResults.some(r => r.hasBrandMention) ?
                  `Brand appears in position #${comparisonData.topResults.findIndex(r => r.hasBrandMention) + 1}` :
                  "Brand not found in top results"}
            </span>
          </div>
        </div>
      )}
      
      {showNoResultsMessage && renderNoResultsMessage()}
      
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {hasResults && comparisonData.topResults.map((result, index) => (
          <div key={index} className={`p-3 rounded text-sm ${result.hasBrandMention ? 'bg-secondary/30' : 'bg-secondary/10'}`}>
            <div className="font-medium mb-1 flex items-center justify-between">
              <div className="break-words pr-2">
                <a href={result.url} target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-600 flex items-center gap-1">
                  {result.title}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
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
