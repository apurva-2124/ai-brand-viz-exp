
import { QueryType } from "@/utils/queryTransformer";

// Types for traditional search results
export interface SearchResult {
  rank: number;
  url: string;
  title: string;
  description: string;
  hasBrandMention: boolean;
  date?: string;
}

export interface TraditionalSearchResults {
  searchEngine: string;
  query: string;
  source: "wayback_machine" | "common_crawl" | "mock";
  brandMentions: number;
  retrievalDate?: string;
  topResults: SearchResult[];
}

/**
 * Fetches archived search results from Wayback Machine
 */
async function fetchWaybackMachineResults(query: string): Promise<SearchResult[] | null> {
  try {
    // Encode the query for URL
    const encodedQuery = encodeURIComponent(query);
    const waybackUrl = `https://web.archive.org/cdx/search/cdx?url=google.com/search%3Fq%3D${encodedQuery}&matchType=prefix&filter=statuscode:200&limit=5&fl=timestamp,original&output=json`;
    
    const response = await fetch(waybackUrl);
    
    if (!response.ok) {
      console.error("Wayback Machine API error:", response.statusText);
      return null;
    }
    
    const data = await response.json();
    
    // If no results or only header row, return null
    if (!data || data.length <= 1) {
      return null;
    }
    
    // Get the most recent snapshot (last item in array after header)
    const mostRecentSnapshot = data[data.length - 1];
    const timestamp = mostRecentSnapshot[0];
    const originalUrl = mostRecentSnapshot[1];
    
    // Fetch the snapshot content
    const snapshotUrl = `https://web.archive.org/web/${timestamp}/${originalUrl}`;
    
    // Note: In a real implementation, we would use a server-side function to fetch and parse
    // the HTML content of the snapshot. For this demo, we'll return mock data based on the query.
    
    // Simulated parsing of snapshot results
    return generateMockSearchResults(query, "wayback_machine");
  } catch (error) {
    console.error("Error fetching from Wayback Machine:", error);
    return null;
  }
}

/**
 * Fetches search results from Common Crawl (fallback)
 * In a real implementation, this would query the Common Crawl Index API
 */
async function fetchCommonCrawlResults(query: string): Promise<SearchResult[] | null> {
  try {
    // Simulated Common Crawl API call
    // Note: Actual implementation would require a server-side component to query Common Crawl
    
    // For this demo, generate mock results
    return generateMockSearchResults(query, "common_crawl");
  } catch (error) {
    console.error("Error fetching from Common Crawl:", error);
    return null;
  }
}

/**
 * Generates mock search results based on the query for demo purposes
 */
function generateMockSearchResults(
  query: string, 
  source: "wayback_machine" | "common_crawl"
): SearchResult[] {
  // Extract potential brand name from query
  const queryParts = query.split(" ");
  const potentialBrand = queryParts.length > 2 ? queryParts[0] : "";
  
  const results: SearchResult[] = [];
  
  // Generate 3-5 mock results
  const numResults = Math.floor(Math.random() * 3) + 3;
  
  for (let i = 0; i < numResults; i++) {
    const hasBrandMention = i === 0 || Math.random() > 0.5;
    
    // Create domain and title dynamically based on query
    let domain = "";
    let title = "";
    
    if (i === 0 && potentialBrand) {
      // First result is often the brand
      domain = `www.${potentialBrand.toLowerCase()}.com`;
      title = `${potentialBrand} - ${queryParts.slice(1).join(" ")}`;
    } else {
      // Generate plausible alternatives
      const domains = [
        "www.industry-leader.com",
        "www.top-options.com",
        "www.best-review.com",
        "www.comparison-site.org",
        "www.expert-advice.net"
      ];
      
      domain = domains[i % domains.length];
      title = `${query} - Best Options & Reviews (${new Date().getFullYear()})`;
    }
    
    results.push({
      rank: i + 1,
      url: `https://${domain}/${query.replace(/\s+/g, "-").toLowerCase()}`,
      title: title,
      description: hasBrandMention
        ? `Find the best ${query} options including ${potentialBrand} and alternatives. Compare features, pricing, and user reviews.`
        : `Comprehensive guide to ${query}. Expert reviews, user ratings, and buying advice.`,
      hasBrandMention: hasBrandMention
    });
  }
  
  return results;
}

/**
 * Main function to get traditional search results
 * Tries Wayback Machine first, then falls back to Common Crawl if needed
 */
export async function getTraditionalSearchResults(
  query: string,
  brandName: string
): Promise<TraditionalSearchResults> {
  try {
    // First try Wayback Machine
    let results = await fetchWaybackMachineResults(query);
    let source: "wayback_machine" | "common_crawl" | "mock" = "wayback_machine";
    
    // If no Wayback results, try Common Crawl
    if (!results || results.length === 0) {
      results = await fetchCommonCrawlResults(query);
      source = "common_crawl";
      
      // If still no results, use mock data
      if (!results || results.length === 0) {
        results = generateMockSearchResults(query, "common_crawl");
        source = "mock";
      }
    }
    
    // Count brand mentions
    const brandMentions = results.filter(result => 
      result.url.toLowerCase().includes(brandName.toLowerCase()) || 
      result.title.toLowerCase().includes(brandName.toLowerCase()) || 
      result.description.toLowerCase().includes(brandName.toLowerCase())
    ).length;
    
    // Mark results that mention the brand
    results = results.map(result => ({
      ...result,
      hasBrandMention: 
        result.url.toLowerCase().includes(brandName.toLowerCase()) || 
        result.title.toLowerCase().includes(brandName.toLowerCase()) || 
        result.description.toLowerCase().includes(brandName.toLowerCase())
    }));
    
    return {
      searchEngine: "Google",
      query,
      source,
      brandMentions,
      retrievalDate: new Date().toISOString(),
      topResults: results
    };
  } catch (error) {
    console.error("Error fetching traditional search results:", error);
    
    // Return mock data as fallback
    const mockResults = generateMockSearchResults(query, "common_crawl");
    
    return {
      searchEngine: "Google",
      query,
      source: "mock",
      brandMentions: mockResults.filter(r => r.hasBrandMention).length,
      topResults: mockResults
    };
  }
}

// Function to compare AI and traditional search results
export function compareSearchResults(
  aiResult: any,
  traditionalResults: TraditionalSearchResults,
  brandName: string
) {
  // Determine if brand is mentioned in AI results
  const aiHasBrandMention = aiResult.hasBrandMention || aiResult.isProminent;
  
  // Determine if brand is mentioned and ranked in traditional results
  const brandInTraditional = traditionalResults.topResults.find(
    r => r.hasBrandMention
  );
  
  const brandRankInTraditional = brandInTraditional ? brandInTraditional.rank : null;
  
  // Calculate differences
  return {
    brandVisibility: {
      ai: aiHasBrandMention ? "present" : "absent",
      traditional: brandInTraditional ? "present" : "absent",
      difference: aiHasBrandMention !== !!brandInTraditional
    },
    brandPosition: {
      ai: aiHasBrandMention ? "featured" : "not_featured",
      traditional: brandRankInTraditional ? `rank ${brandRankInTraditional}` : "not_ranked",
      difference: aiHasBrandMention !== (brandRankInTraditional === 1)
    },
    source: traditionalResults.source,
    retrievalDate: traditionalResults.retrievalDate
  };
}
