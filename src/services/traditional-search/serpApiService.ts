
import { SearchResult } from "./types";

/**
 * Sanitizes the search query by removing special characters and limiting length
 */
function sanitizeQuery(query: string): string {
  // Remove special characters except spaces and basic punctuation
  const sanitized = query.replace(/[^\w\s.,?!]/gi, "");
  // Limit length to avoid overly complex queries
  return sanitized.slice(0, 100);
}

/**
 * Fetches real-time Google search results using SerpApi
 */
export async function fetchSerpApiResults(query: string, brandName: string): Promise<SearchResult[] | "LIMIT_EXCEEDED"> {
  try {
    const apiKey = localStorage.getItem("serpapi_api_key");
    
    console.log("SerpAPI key found:", apiKey ? "Yes" : "No");
    console.log("Original query:", query);
    console.log("Brand name:", brandName);
    
    if (!apiKey) {
      console.log("No SerpApi key found in localStorage");
      return "LIMIT_EXCEEDED";
    }
    
    // Sanitize the query to improve results
    const sanitizedQuery = sanitizeQuery(query);
    console.log("Sanitized query:", sanitizedQuery);
    
    const encodedQuery = encodeURIComponent(sanitizedQuery);
    const apiUrl = `https://serpapi.com/search.json?q=${encodedQuery}&api_key=${apiKey}&hl=en&gl=us`;
    console.log("Fetching from SerpAPI with URL:", apiUrl);
    
    const response = await fetch(apiUrl);
    console.log("SerpAPI response status:", response.status);
    
    const data = await response.json();
    console.log("SerpAPI full response:", data);
    
    if (data.error) {
      console.error("SerpApi error:", data.error);
      return "LIMIT_EXCEEDED";
    }
    
    if (!data.organic_results || data.organic_results.length === 0) {
      console.log("No organic results found in SerpAPI response");
      return [];
    }
    
    console.log(`SerpAPI returned ${data.organic_results.length} results`);
    
    const mappedResults = data.organic_results.slice(0, 10).map((result: any, index: number) => {
      const hasBrandMention = 
        (result.title && result.title.toLowerCase().includes(brandName.toLowerCase())) ||
        (result.snippet && result.snippet.toLowerCase().includes(brandName.toLowerCase())) ||
        (result.link && result.link.toLowerCase().includes(brandName.toLowerCase()));
      
      return {
        rank: index + 1,
        url: result.link || "",
        title: result.title || "",
        description: result.snippet || "",
        hasBrandMention
      };
    });
    
    console.log("Mapped results:", mappedResults);
    return mappedResults;
  } catch (error) {
    console.error("Error fetching from SerpApi:", error);
    return [];
  }
}
