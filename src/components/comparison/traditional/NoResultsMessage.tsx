
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TraditionalSearchResults } from "@/services/traditional-search";

interface NoResultsMessageProps {
  comparisonData: TraditionalSearchResults;
}

export const NoResultsMessage = ({ comparisonData }: NoResultsMessageProps) => {
  let errorTitle = "No traditional search results found";
  let errorDetails: string[] = [];
  
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
