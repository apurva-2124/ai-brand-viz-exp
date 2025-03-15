
import { TraditionalSearchResults, SearchResult } from "./types";
import { getBrandSpecificResults } from "./static-data/brand-dispatcher";
import { getGenericQueryResults } from "./static-data/generic-queries";

/**
 * Get static traditional search results for testing and demo purposes
 */
export function getStaticTraditionalResults(
  brandName: string,
  query: string
): TraditionalSearchResults {
  console.log(`Getting static data for brand: ${brandName}, query: ${query}`);
  
  // Create a standardized timestamp for consistent display
  const timestamp = new Date().toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  });

  // Try to get brand-specific results based on the brand and query
  const brandSpecificResults = getBrandSpecificResults(query, brandName);
  if (brandSpecificResults.length > 0) {
    return {
      searchEngine: "Google",
      query: query,
      source: "static",
      brandMentions: brandSpecificResults.filter(r => r.hasBrandMention).length,
      retrievalDate: timestamp,
      topResults: brandSpecificResults
    };
  }

  // Instead of using generic fallbacks, return no results with an error message
  return {
    searchEngine: "Google",
    query: query,
    source: "static",
    brandMentions: 0,
    retrievalDate: timestamp,
    topResults: [],
    error: "NO_RESULTS" // Set the error to indicate no results were found
  };
}
