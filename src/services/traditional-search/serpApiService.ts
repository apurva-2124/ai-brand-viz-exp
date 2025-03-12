
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
 * Extracts results from different sections of the SerpApi response
 */
function extractAllResults(data: any, brandName: string): SearchResult[] {
  const allResults: SearchResult[] = [];
  let rank = 1;
  
  // Direct debug log of the full response
  console.log("FULL SERPAPI RESPONSE:", JSON.stringify(data, null, 2));
  
  // Extract organic search results
  if (data.organic_results && data.organic_results.length > 0) {
    console.log(`Found ${data.organic_results.length} organic results`, data.organic_results);
    
    data.organic_results.forEach((result: any) => {
      const hasBrandMention = 
        (result.title && result.title.toLowerCase().includes(brandName.toLowerCase())) ||
        (result.snippet && result.snippet.toLowerCase().includes(brandName.toLowerCase())) ||
        (result.link && result.link.toLowerCase().includes(brandName.toLowerCase()));
      
      allResults.push({
        rank: rank++,
        url: result.link || "",
        title: result.title || "",
        description: result.snippet || "",
        hasBrandMention,
        resultType: "organic"
      });
    });
  } else {
    console.log("No organic_results found in SerpAPI response");
  }
  
  // Extract local results if available
  if (data.local_results && data.local_results.length > 0) {
    console.log(`Found ${data.local_results.length} local business results`, data.local_results);
    
    data.local_results.forEach((result: any) => {
      // For local results, create a nice description from available data
      let description = "";
      if (result.rating) description += `Rating: ${result.rating} `;
      if (result.reviews) description += `(${result.reviews} reviews) `;
      if (result.address) description += `• ${result.address} `;
      if (result.description) description += `• ${result.description}`;
      
      const hasBrandMention = 
        (result.title && result.title.toLowerCase().includes(brandName.toLowerCase())) ||
        (result.address && result.address.toLowerCase().includes(brandName.toLowerCase())) ||
        (result.website && result.website.toLowerCase().includes(brandName.toLowerCase()));
      
      allResults.push({
        rank: rank++,
        url: result.website || "",
        title: result.title || "",
        description: description || "Local business listing",
        hasBrandMention,
        resultType: "local"
      });
    });
  }
  
  // Extract knowledge graph if available
  if (data.knowledge_graph) {
    console.log("Found knowledge graph result", data.knowledge_graph);
    
    const kg = data.knowledge_graph;
    const title = kg.title || "";
    const description = kg.description || "";
    const url = kg.website || "";
    
    const hasBrandMention = 
      title.toLowerCase().includes(brandName.toLowerCase()) ||
      description.toLowerCase().includes(brandName.toLowerCase()) ||
      url.toLowerCase().includes(brandName.toLowerCase());
    
    allResults.push({
      rank: rank++,
      url: url,
      title: title,
      description: description,
      hasBrandMention,
      resultType: "knowledge_graph"
    });
  }
  
  // Extract top stories if available
  if (data.top_stories && data.top_stories.length > 0) {
    console.log(`Found ${data.top_stories.length} top stories`, data.top_stories);
    
    data.top_stories.forEach((story: any) => {
      const hasBrandMention = 
        (story.title && story.title.toLowerCase().includes(brandName.toLowerCase())) ||
        (story.source && story.source.toLowerCase().includes(brandName.toLowerCase())) ||
        (story.link && story.link.toLowerCase().includes(brandName.toLowerCase()));
      
      allResults.push({
        rank: rank++,
        url: story.link || "",
        title: story.title || "",
        description: `News: ${story.source || ""} - ${story.date || ""}`,
        hasBrandMention,
        resultType: "news"
      });
    });
  }
  
  console.log(`Total results extracted: ${allResults.length}`, allResults);
  
  // Sort the results to ensure most relevant are on top
  return allResults.slice(0, 10); // Limit to top 10 results
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
    
    // Create simple query - only use the main terms without special formatting
    const simplifiedQuery = sanitizedQuery.split(" ").slice(0, 3).join(" ");
    console.log("Simplified query for testing:", simplifiedQuery);
    
    // Use simplified query for better results as recommended in debugging steps
    const queryToUse = simplifiedQuery || sanitizedQuery;
    const encodedQuery = encodeURIComponent(queryToUse);
    
    // Try with simplified parameters first
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
    console.log("SerpAPI response received with keys:", Object.keys(data));
    
    if (data.error) {
      console.error("SerpApi error:", data.error);
      return "LIMIT_EXCEEDED";
    }
    
    // Log the total estimated results if available
    if (data.search_information && data.search_information.total_results) {
      console.log("Total estimated results:", data.search_information.total_results);
    }
    
    // Extract results from all sections
    const allResults = extractAllResults(data, brandName);
    
    console.log(`Final results count: ${allResults.length}`);
    
    if (allResults.length === 0) {
      console.log("No results found with query:", queryToUse);
      
      // If we already tried simplified query, don't retry
      if (queryToUse === simplifiedQuery) {
        console.log("Already using simplified query with no results");
        return [];
      }
      
      // If no results with original query, try with brand name only as a last resort
      const brandOnlyQuery = encodeURIComponent(brandName);
      console.log("Trying final fallback with brand name only:", brandName);
      
      const fallbackApiUrl = `https://serpapi.com/search.json?q=${brandOnlyQuery}&api_key=${apiKey}&hl=en&gl=us`;
      const fallbackResponse = await fetch(fallbackApiUrl);
      
      if (!fallbackResponse.ok) {
        console.error("Fallback query HTTP error:", fallbackResponse.status);
        return [];
      }
      
      const fallbackData = await fallbackResponse.json();
      console.log("Fallback response data keys:", Object.keys(fallbackData));
      
      const fallbackResults = extractAllResults(fallbackData, brandName);
      return fallbackResults;
    }
    
    return allResults;
  } catch (error) {
    console.error("Error fetching from SerpApi:", error);
    return [];
  }
}
