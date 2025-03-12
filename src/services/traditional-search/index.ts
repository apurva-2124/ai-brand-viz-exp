
import { TraditionalSearchResults } from "./types";
import { fetchSerpApiResults } from "./serpApiService";

/**
 * Main function to get traditional search results using client-side SerpApi
 */
export async function getTraditionalSearchResults(
  query: string,
  brandName: string
): Promise<TraditionalSearchResults> {
  try {
    console.log("getTraditionalSearchResults called with:", { query, brandName });
    
    // Check for API key first
    const apiKey = localStorage.getItem("serpapi_api_key");
    if (!apiKey) {
      console.log("No SerpApi key found in localStorage");
      return {
        searchEngine: "Google",
        query,
        source: "serpapi",
        brandMentions: 0,
        topResults: [],
        error: "API_LIMIT_EXCEEDED"
      };
    }
    
    // Client-side fetch of SerpAPI results
    const serpResults = await fetchSerpApiResults(query, brandName);
    
    // Handle API limit exceeded
    if (serpResults === "LIMIT_EXCEEDED") {
      return {
        searchEngine: "Google",
        query,
        source: "serpapi",
        brandMentions: 0,
        topResults: [],
        error: "API_LIMIT_EXCEEDED"
      };
    }

    console.log(`Returning ${serpResults.length} traditional search results`);
    
    // Return results from SerpApi
    return {
      searchEngine: "Google",
      query,
      source: "serpapi",
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
      source: "serpapi",
      brandMentions: 0,
      topResults: []
    };
  }
}

// Re-export types from types.ts to maintain the same import patterns
export * from "./types";
