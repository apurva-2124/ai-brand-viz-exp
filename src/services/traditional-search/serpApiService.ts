
import { SearchResult } from "./types";

/**
 * Fetches real-time Google search results using SerpApi
 */
export async function fetchSerpApiResults(query: string, brandName: string): Promise<SearchResult[] | "LIMIT_EXCEEDED"> {
  try {
    const apiKey = localStorage.getItem("serpapi_api_key");
    
    if (!apiKey) {
      console.log("No SerpApi key found");
      return "LIMIT_EXCEEDED";
    }
    
    const apiUrl = `https://serpapi.com/search.json?q=${encodeURIComponent(query)}&api_key=${apiKey}&hl=en&gl=us`;
    
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    if (data.error && (
      data.error.includes("You have exceeded your searches per month") ||
      data.error.includes("API key is invalid") ||
      data.error.includes("API key missing")
    )) {
      console.error("SerpApi error:", data.error);
      return "LIMIT_EXCEEDED";
    }
    
    if (!data.organic_results || data.organic_results.length === 0) {
      return [];
    }
    
    return data.organic_results.slice(0, 10).map((result: any, index: number) => {
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
  } catch (error) {
    console.error("Error fetching from SerpApi:", error);
    return [];
  }
}
