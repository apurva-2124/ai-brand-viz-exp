
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
    
    // Create very simple query - only use the main terms
    const simplifiedQuery = sanitizedQuery.split(" ").slice(0, 3).join(" ");
    console.log("Simplified query (not used yet):", simplifiedQuery);
    
    const encodedQuery = encodeURIComponent(sanitizedQuery);
    const apiUrl = `https://serpapi.com/search.json?q=${encodedQuery}&api_key=${apiKey}&hl=en&gl=us`;
    console.log("Fetching from SerpAPI with URL (sensitive parts redacted):", 
      apiUrl.replace(apiKey, "API_KEY_REDACTED"));
    
    const response = await fetch(apiUrl);
    console.log("SerpAPI response status:", response.status);
    
    if (!response.ok) {
      console.error("SerpAPI HTTP error:", response.status, response.statusText);
      const errorText = await response.text();
      console.error("Error response body:", errorText);
      return "LIMIT_EXCEEDED";
    }
    
    const data = await response.json();
    console.log("SerpAPI response data keys:", Object.keys(data));
    
    if (data.error) {
      console.error("SerpApi error:", data.error);
      return "LIMIT_EXCEEDED";
    }
    
    if (!data.organic_results || data.organic_results.length === 0) {
      console.log("No organic results found in SerpAPI response");
      
      // If no results with original query, try with simplified query
      console.log("Retrying with simplified query:", simplifiedQuery);
      const simplifiedEncodedQuery = encodeURIComponent(simplifiedQuery);
      const simplifiedApiUrl = `https://serpapi.com/search.json?q=${simplifiedEncodedQuery}&api_key=${apiKey}&hl=en&gl=us`;
      console.log("Retrying SerpAPI with URL (sensitive parts redacted):", 
        simplifiedApiUrl.replace(apiKey, "API_KEY_REDACTED"));
      
      const simplifiedResponse = await fetch(simplifiedApiUrl);
      console.log("Simplified query response status:", simplifiedResponse.status);
      
      if (!simplifiedResponse.ok) {
        console.error("Simplified query HTTP error:", simplifiedResponse.status);
        return [];
      }
      
      const simplifiedData = await simplifiedResponse.json();
      console.log("Simplified query response data keys:", Object.keys(simplifiedData));
      
      if (!simplifiedData.organic_results || simplifiedData.organic_results.length === 0) {
        console.log("No organic results found even with simplified query");
        return [];
      }
      
      console.log(`Simplified query returned ${simplifiedData.organic_results.length} results`);
      
      const mappedResults = simplifiedData.organic_results.slice(0, 10).map((result: any, index: number) => {
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
      
      console.log("Mapped results from simplified query:", mappedResults);
      return mappedResults;
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
