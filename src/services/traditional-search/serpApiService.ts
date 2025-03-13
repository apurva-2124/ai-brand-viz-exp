
import { SearchResult } from "./types";

/**
 * Client-side implementation for fetching results from Google using a proxy 
 * to bypass CORS restrictions
 */
export async function fetchSerpApiResults(query: string, brandName: string): Promise<SearchResult[] | "LIMIT_EXCEEDED"> {
  try {
    console.log("fetchSerpApiResults called with:", { query, brandName });
    
    // Use a proxy to bypass CORS (Google blocks direct client-side requests)
    const proxyUrl = "https://api.allorigins.win/get?url=";
    const targetUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    
    console.log(`Fetching from proxy: ${proxyUrl} with search query: ${query}`);
    
    const response = await fetch(proxyUrl + encodeURIComponent(targetUrl));
    
    if (!response.ok) {
      console.error("Proxy HTTP error:", response.status, response.statusText);
      return "LIMIT_EXCEEDED";
    }
    
    const data = await response.json();
    
    if (!data || !data.contents) {
      console.error("No content in proxy response");
      return [];
    }
    
    console.log("Received proxy response with content length:", data.contents.length);
    
    // Parse the HTML response into DOM
    const parser = new DOMParser();
    const doc = parser.parseFromString(data.contents, "text/html");
    
    // Extract search results - Different selectors to try
    // Google structures change frequently, so we have multiple fallbacks
    let extractedResults: { title: string; url: string; description?: string }[] = [];
    
    // Main search results approach - look for heading elements in search results
    const headings = [...doc.querySelectorAll("h3")];
    console.log(`Found ${headings.length} potential result headings`);
    
    if (headings.length > 0) {
      extractedResults = headings.map((h3, index) => {
        const parentLink = h3.closest("a");
        const resultContainer = h3.closest("div[data-ved]") || h3.closest("div.g");
        
        // Try to find description text in nearby elements
        let description = "";
        if (resultContainer) {
          const descElement = resultContainer.querySelector("div[data-sncf='1']") || 
                             resultContainer.querySelector(".VwiC3b") ||
                             resultContainer.querySelector("span.st");
          if (descElement) {
            description = descElement.textContent || "";
          }
        }
        
        // Clean up the URL (Google URLs have redirects)
        let url = parentLink ? parentLink.href : "#";
        if (url.includes("/url?")) {
          const match = url.match(/\/url\?q=([^&]+)/);
          if (match && match[1]) {
            url = decodeURIComponent(match[1]);
          }
        }
        
        return {
          title: h3.textContent || `Result ${index + 1}`,
          url: url,
          description: description
        };
      });
    }
    
    // Fallback - look for general result containers
    if (extractedResults.length === 0) {
      const resultContainers = [...doc.querySelectorAll("div.g, div[data-ved]")];
      console.log(`Using fallback: found ${resultContainers.length} potential result containers`);
      
      extractedResults = resultContainers.map((container, index) => {
        const link = container.querySelector("a");
        const heading = container.querySelector("h3, [role='heading']");
        const snippet = container.querySelector(".VwiC3b, .st, [data-sncf='1']");
        
        return {
          title: heading ? heading.textContent || `Result ${index + 1}` : `Result ${index + 1}`,
          url: link ? link.href : "#",
          description: snippet ? snippet.textContent || "" : ""
        };
      });
    }
    
    console.log(`Successfully extracted ${extractedResults.length} search results`);
    console.log("Sample extracted result:", extractedResults[0]);
    
    // Filter out empty results and format to match our SearchResult interface
    const results: SearchResult[] = extractedResults
      .filter(result => result.title && result.url !== "#")
      .map((result, index) => {
        const hasBrandMention = 
          (result.title.toLowerCase().includes(brandName.toLowerCase())) ||
          (result.description && result.description.toLowerCase().includes(brandName.toLowerCase())) ||
          (result.url.toLowerCase().includes(brandName.toLowerCase()));
        
        return {
          rank: index + 1,
          url: result.url,
          title: result.title,
          description: result.description || "No description available",
          hasBrandMention,
          resultType: "organic"
        };
      });
    
    if (results.length === 0) {
      console.log("No results extracted after filtering");
      // If Google blocked the request or results couldn't be parsed
      return [];
    }
    
    console.log(`Returning ${results.length} formatted search results`);
    return results;
    
  } catch (error) {
    console.error("Error fetching from proxy:", error);
    return [];
  }
}
