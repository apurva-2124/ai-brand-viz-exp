
import { SearchResult } from "./types";

/**
 * Fetches real-time Google search results using SerpApi
 */
export async function fetchSerpApiResults(query: string, brandName: string): Promise<SearchResult[] | "LIMIT_EXCEEDED"> {
  try {
    const apiKey = localStorage.getItem("serpapi_api_key");
    
    console.log("SerpAPI key found:", apiKey ? "Yes" : "No");
    console.log("Query:", query);
    console.log("Brand name:", brandName);
    
    if (!apiKey) {
      console.log("No SerpApi key found in localStorage");
      return "LIMIT_EXCEEDED";
    }
    
    const encodedQuery = encodeURIComponent(query);
    const apiUrl = `https://serpapi.com/search.json?q=${encodedQuery}&api_key=${apiKey}&hl=en&gl=us`;
    console.log("Fetching from SerpAPI with encoded query:", encodedQuery);
    
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    console.log("SerpAPI response status:", response.status);
    console.log("SerpAPI response data sample:", JSON.stringify(data).substring(0, 500));
    
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
    
    console.log("Mapped results:", mappedResults.length);
    return mappedResults;
  } catch (error) {
    console.error("Error fetching from SerpApi:", error);
    return [];
  }
}
