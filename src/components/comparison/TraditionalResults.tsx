
import { TraditionalSearchResults } from "@/services/traditional-search";
import { SourceBadge } from "./traditional/SourceBadge";
import { BrandMetrics } from "./traditional/BrandMetrics";
import { NoResultsMessage } from "./traditional/NoResultsMessage";
import { SearchResultsList } from "./traditional/SearchResultsList";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

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
  
  // Function to format the Google search URL
  const getGoogleSearchUrl = (query: string) => {
    return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
  };

  // Format the query run time if present
  const formatQueryRunTime = (dateString?: string) => {
    if (!dateString) return null;
    
    try {
      const date = new Date(dateString);
      return date.toLocaleString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      console.error("Error formatting date:", e);
      return dateString;
    }
  };

  return (
    <div className="border rounded-lg p-4">
      <h3 className="font-medium mb-3 text-primary flex items-center">
        Traditional Search Results
        <SourceBadge source={comparisonData.source === "proxy" ? "proxy" : "static"} />
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
          Data retrieved: {formatQueryRunTime(comparisonData.retrievalDate)}
        </div>
      )}
      
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
