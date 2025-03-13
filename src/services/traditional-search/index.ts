
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
        error: "API_KEY_MISSING"
      };
    }
    
    // Client-side fetch of SerpAPI results
    console.log("Calling fetchSerpApiResults...");
    const serpResults = await fetchSerpApiResults(query, brandName);
    console.log("fetchSerpApiResults returned:", serpResults === "LIMIT_EXCEEDED" ? "LIMIT_EXCEEDED" : `Array with ${serpResults.length} items`);
    
    // Handle API limit exceeded
    if (serpResults === "LIMIT_EXCEEDED") {
      console.log("API limit exceeded or API error");
      return {
        searchEngine: "Google",
        query,
        source: "serpapi",
        brandMentions: 0,
        topResults: [],
        error: "API_LIMIT_EXCEEDED"
      };
    }

    // Handle empty results differently than error states
    if (Array.isArray(serpResults) && serpResults.length === 0) {
      console.log("SerpAPI returned an empty results array - no search results found");
      return {
        searchEngine: "Google",
        query,
        source: "serpapi",
        brandMentions: 0,
        retrievalDate: new Date().toISOString(),
        topResults: [],
        error: "NO_RESULTS"  // New error type for empty results
      };
    }

    // Log the results to verify we have them
    console.log(`getTraditionalSearchResults: Received ${serpResults.length} results from SerpAPI`);
    
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
      topResults: [],
      error: "FETCH_ERROR"
    };
  }
}

// Re-export types from types.ts to maintain the same import patterns
export * from "./types";
