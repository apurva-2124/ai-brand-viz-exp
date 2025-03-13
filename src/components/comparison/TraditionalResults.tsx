
import { TraditionalSearchResults } from "@/services/traditional-search";
import { SourceBadge } from "./traditional/SourceBadge";
import { BrandMetrics } from "./traditional/BrandMetrics";
import { NoResultsMessage } from "./traditional/NoResultsMessage";
import { SearchResultsList } from "./traditional/SearchResultsList";

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
  
  // Check if we have results or a specific error
  const hasResults = Array.isArray(comparisonData.topResults) && comparisonData.topResults.length > 0;
  const showNoResultsMessage = !hasResults;

  return (
    <div className="border rounded-lg p-4">
      <h3 className="font-medium mb-3 text-primary flex items-center">
        Traditional Search Results
        <SourceBadge source={comparisonData.source} />
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
        <BrandMetrics 
          brandMentions={comparisonData.brandMentions} 
          topResults={comparisonData.topResults} 
        />
      )}
      
      {showNoResultsMessage && <NoResultsMessage comparisonData={comparisonData} />}
      
      {hasResults && <SearchResultsList results={comparisonData.topResults} />}
    </div>
  );
};
