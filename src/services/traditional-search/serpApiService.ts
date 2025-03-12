
import { SearchResult } from "./types";

/**
 * Client-side implementation for fetching results from SerpAPI
 */
export async function fetchSerpApiResults(query: string, brandName: string): Promise<SearchResult[] | "LIMIT_EXCEEDED"> {
  try {
    const apiKey = localStorage.getItem("serpapi_api_key");
    
    if (!apiKey) {
      console.log("No SerpApi key found in localStorage");
      return "LIMIT_EXCEEDED";
    }
    
    // Simplify the query - only use up to 3 terms for better results
    const simplifiedQuery = query.split(" ").slice(0, 3).join(" ");
    console.log("Using query:", simplifiedQuery);
    
    const encodedQuery = encodeURIComponent(simplifiedQuery);
    const apiUrl = `https://serpapi.com/search.json?engine=google&q=${encodedQuery}&api_key=${apiKey}`;
    
    console.log("Fetching from SerpAPI with URL (sensitive parts redacted):", 
      apiUrl.replace(apiKey, "API_KEY_REDACTED"));
    
    const response = await fetch(apiUrl);
    console.log("SerpAPI response status:", response.status);
    
    if (!response.ok) {
      console.error("SerpAPI HTTP error:", response.status, response.statusText);
      return "LIMIT_EXCEEDED";
    }
    
    const data = await response.json();
    
    // Extended logging to debug organic_results issue
    console.log("SerpAPI response received with keys:", Object.keys(data));
    console.log("Organic results array exists:", !!data.organic_results);
    console.log("Organic results length:", data.organic_results?.length);
    console.log("First few organic results:", data.organic_results?.slice(0, 2));
    
    if (data.error) {
      console.error("SerpApi error:", data.error);
      return "LIMIT_EXCEEDED";
    }
    
    // Check if organic_results is missing or empty
    if (!data.organic_results || data.organic_results.length === 0) {
      console.log("No organic_results found in SerpAPI response");
      return [];
    }
    
    // Map the organic results to our SearchResult interface
    const results = data.organic_results.map((result: any, index: number) => {
      const hasBrandMention = 
        (result.title && result.title.toLowerCase().includes(brandName.toLowerCase())) ||
        (result.snippet && result.snippet.toLowerCase().includes(brandName.toLowerCase())) ||
        (result.link && result.link.toLowerCase().includes(brandName.toLowerCase()));
      
      return {
        rank: index + 1,
        url: result.link || "",
        title: result.title || "",
        description: result.snippet || "",
        hasBrandMention,
        resultType: "organic"
      };
    });
    
    console.log(`Mapped ${results.length} results from SerpAPI organic_results`);
    // Log the first result to verify transformation
    if (results.length > 0) {
      console.log("Sample transformed result:", results[0]);
    }
    
    return results;
    
  } catch (error) {
    console.error("Error fetching from SerpApi:", error);
    return [];
  }
}
