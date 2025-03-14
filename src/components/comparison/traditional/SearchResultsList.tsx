
import { useState } from "react";
import { SearchResult } from "@/services/traditional-search";
import { SearchResultItem } from "./SearchResultItem";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

interface SearchResultsListProps {
  results: SearchResult[];
}

export const SearchResultsList = ({ results }: SearchResultsListProps) => {
  const [showAllResults, setShowAllResults] = useState(false);
  
  // Filter out results that don't have a URL
  const validResults = results.filter(result => result.url && result.url.trim() !== "");
  
  // Initially show only the first 3 results
  const displayResults = showAllResults ? validResults : validResults.slice(0, 3);
  
  // Check if we have more results to show
  const hasMoreResults = validResults.length > 3;

  return (
    <div className="space-y-3">
      {displayResults.map((result, index) => (
        <SearchResultItem key={`result-${result.rank}-${index}`} result={result} index={index} />
      ))}
      
      {hasMoreResults && (
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full text-xs flex items-center justify-center gap-1 mt-2"
          onClick={() => setShowAllResults(!showAllResults)}
        >
          {showAllResults ? (
            <>
              <ChevronUp className="h-3 w-3" /> 
              Show fewer results
            </>
          ) : (
            <>
              <ChevronDown className="h-3 w-3" /> 
              Show all {validResults.length} results
            </>
          )}
        </Button>
      )}
    </div>
  );
};
