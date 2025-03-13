
import { TraditionalSearchResults } from "./types";
import { fetchSerpApiResults } from "./serpApiService";
import { generateMockTraditionalResults } from "./mockService";

/**
 * Main function to get traditional search results using either proxy-based scraping or mock data
 */
export async function getTraditionalSearchResults(
  query: string,
  brandName: string,
  useMockData: boolean = false
): Promise<TraditionalSearchResults> {
  try {
    console.log("getTraditionalSearchResults called with:", { query, brandName, useMockData });
    
    // Use mock data if requested
    if (useMockData) {
      console.log("Using mock data instead of real API");
      return generateMockTraditionalResults(query, brandName);
    }
    
    // For the proxy-based approach, we don't need an API key
    console.log("Starting proxy-based search for:", query);
    
    // Client-side fetch of Google results via proxy
    console.log("Calling fetchSerpApiResults with proxy...");
    const serpResults = await fetchSerpApiResults(query, brandName);
    console.log("fetchSerpApiResults returned:", serpResults === "LIMIT_EXCEEDED" ? "LIMIT_EXCEEDED" : `Array with ${serpResults.length} items`);
    
    // Handle proxy access error
    if (serpResults === "LIMIT_EXCEEDED") {
      console.log("Proxy access error or request blocked");
      return {
        searchEngine: "Google",
        query,
        source: "proxy",
        brandMentions: 0,
        topResults: [],
        error: "PROXY_ERROR"
      };
    }

    // Handle empty results differently than error states
    if (Array.isArray(serpResults) && serpResults.length === 0) {
      console.log("Proxy returned an empty results array - no search results found");
      return {
        searchEngine: "Google",
        query,
        source: "proxy",
        brandMentions: 0,
        retrievalDate: new Date().toISOString(),
        topResults: [],
        error: "NO_RESULTS"
      };
    }

    // Log the results to verify we have them
    console.log(`getTraditionalSearchResults: Received ${serpResults.length} results from proxy`);
    
    // Return results from proxy
    return {
      searchEngine: "Google",
      query,
      source: "proxy",
      brandMentions: serpResults.filter(r => r.hasBrandMention).length,
      retrievalDate: new Date().toISOString(),
      topResults: serpResults
    };
  } catch (error) {
    console.error("Error fetching traditional search results:", error);
    
    // Return empty results on error
    return {
      searchEngine: "Google",
      query,
      source: "proxy",
      brandMentions: 0,
      topResults: [],
      error: "FETCH_ERROR"
    };
  }
}

// Re-export types from types.ts to maintain the same import patterns
export * from "./types";
