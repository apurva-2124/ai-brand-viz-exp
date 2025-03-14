
import { TraditionalSearchResults } from "@/services/traditional-search";
import { SourceBadge } from "./traditional/SourceBadge";
import { BrandMetrics } from "./traditional/BrandMetrics";
import { NoResultsMessage } from "./traditional/NoResultsMessage";
import { SearchResultsList } from "./traditional/SearchResultsList";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { getGoogleSearchUrl, formatDateString } from "@/utils/searchUtils";
import { getGoogleRankingBadge } from "@/components/visibility/analysis/StatusBadges";

interface TraditionalResultsProps {
  comparisonData: TraditionalSearchResults;
}

export const TraditionalResults = ({ comparisonData }: TraditionalResultsProps) => {
  // Debug logs
  console.log("TraditionalResults component rendering with data:", comparisonData);
  
  // Check if we have results or a specific error
  const hasResults = Array.isArray(comparisonData.topResults) && comparisonData.topResults.length > 0;
  const showNoResultsMessage = !hasResults;
  
  // Handle invalid date case
  const formattedDate = comparisonData.retrievalDate ? 
    formatDateString(comparisonData.retrievalDate) : 
    "Invalid Date";
  
  // Get top result rank if available
  const topRank = hasResults ? comparisonData.topResults[0]?.rank : undefined;
  
  return (
    <div className="border rounded-lg p-4">
      <h3 className="font-medium mb-3 text-primary flex items-center justify-between">
        <span>Traditional Search Results</span>
        {topRank && getGoogleRankingBadge(topRank)}
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

      <div className="text-xs text-muted-foreground mb-4">
        Data retrieved: {formattedDate}
      </div>
      
      {comparisonData.source === "proxy" ? (
        <div className="mb-4">
          <Button variant="outline" size="sm" className="w-full" asChild>
            <a 
              href={getGoogleSearchUrl(comparisonData.query)} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
            >
              View Live Google Results <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
      ) : null}
      
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
