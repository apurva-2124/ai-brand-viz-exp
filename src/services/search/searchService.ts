
import { SearchResult, SearchResults } from "@/components/search/types";

export async function fetchSearchResults(query: string): Promise<SearchResults> {
  try {
    const apiKey = localStorage.getItem("serpapi_api_key");
    
    if (!apiKey) {
      return {
        query,
        searchResults: [],
        error: "Please add your SerpAPI key in settings"
      };
    }
    
    // Create the API URL with the query and API key
    const encodedQuery = encodeURIComponent(query);
    const apiUrl = `https://serpapi.com/search.json?q=${encodedQuery}&api_key=${apiKey}&engine=google&num=10`;
    
    console.log("Fetching search results for:", query);
    
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      console.error("SerpAPI HTTP error:", response.status);
      return {
        query,
        searchResults: [],
        error: `HTTP error: ${response.status}`
      };
    }
    
    const data = await response.json();
    console.log("SerpAPI response received:", Object.keys(data));
    
    if (data.error) {
      console.error("SerpAPI error:", data.error);
      return {
        query,
        searchResults: [],
        error: data.error
      };
    }
    
    // Extract all result types from the response
    const searchResults: SearchResult[] = [];
    
    // Extract organic results
    if (data.organic_results && data.organic_results.length > 0) {
      console.log(`Found ${data.organic_results.length} organic results`);
      
      data.organic_results.forEach((result: any) => {
        searchResults.push({
          title: result.title || "",
          url: result.link || "",
          description: result.snippet || "",
          position: result.position || searchResults.length + 1,
          resultType: "organic"
        });
      });
    }
    
    // Extract local results if available
    if (data.local_results && data.local_results.length > 0) {
      console.log(`Found ${data.local_results.length} local business results`);
      
      data.local_results.forEach((result: any) => {
        // For local results, create a nice description from available data
        let description = "";
        if (result.rating) description += `Rating: ${result.rating} `;
        if (result.reviews) description += `(${result.reviews} reviews) `;
        if (result.address) description += `• ${result.address} `;
        if (result.description) description += `• ${result.description}`;
        
        searchResults.push({
          title: result.title || "",
          url: result.website || "",
          description: description || "Local business listing",
          position: searchResults.length + 1,
          resultType: "local"
        });
      });
    }
    
    // Extract knowledge graph if available
    if (data.knowledge_graph) {
      console.log("Found knowledge graph result");
      
      const kg = data.knowledge_graph;
      const title = kg.title || "";
      const description = kg.description || "";
      const url = kg.website || "";
      
      searchResults.push({
        title: title,
        url: url || "#",
        description: description,
        position: searchResults.length + 1,
        resultType: "knowledge_graph"
      });
    }
    
    // Extract top stories if available
    if (data.top_stories && data.top_stories.length > 0) {
      console.log(`Found ${data.top_stories.length} top stories`);
      
      data.top_stories.forEach((story: any) => {
        searchResults.push({
          title: story.title || "",
          url: story.link || "",
          description: `${story.source || ""} - ${story.date || ""}`,
          position: searchResults.length + 1,
          resultType: "news",
          date: story.date
        });
      });
    }
    
    console.log(`Total results extracted: ${searchResults.length}`);
    
    return {
      query,
      searchResults
    };
  } catch (error) {
    console.error("Error fetching search results:", error);
    return {
      query,
      searchResults: [],
      error: "Error fetching search results. Please try again later."
    };
  }
}
