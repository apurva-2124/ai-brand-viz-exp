
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

  // First, try to get brand-specific results based on the brand and query
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

  // Fallback to generic query results
  const genericResults = getGenericQueryResults(query, brandName);
  
  return {
    searchEngine: "Google",
    query: query,
    source: "static",
    brandMentions: genericResults.filter(r => r.hasBrandMention).length,
    retrievalDate: timestamp,
    topResults: genericResults
  };
}
