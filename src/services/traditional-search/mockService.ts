
import { SearchResult, TraditionalSearchResults } from "./types";

/**
 * Generates mock search results for testing purposes
 */
export function generateMockTraditionalResults(query: string, brandName: string): TraditionalSearchResults {
  console.log("Generating mock traditional search results for:", { query, brandName });
  
  // Create varied results based on the brand name
  const results: SearchResult[] = [
    {
      rank: 1,
      url: `https://www.example.com/top-${query.toLowerCase().replace(/\s+/g, '-')}`,
      title: `${query} - Complete Guide and Resources`,
      description: `Comprehensive guide about ${query}. Learn everything you need to know about ${brandName} and how it compares to other options in the market.`,
      hasBrandMention: true,
      resultType: "organic"
    },
    {
      rank: 2,
      url: `https://www.competitor.com/${query.toLowerCase().replace(/\s+/g, '-')}`,
      title: `Best ${query} Platforms in 2023`,
      description: `Compare the top solutions for ${query}. Find out which platform suits your needs.`,
      hasBrandMention: false,
      resultType: "organic"
    },
    {
      rank: 3,
      url: `https://www.review-site.com/${query.toLowerCase().replace(/\s+/g, '-')}-comparison`,
      title: `${brandName} vs Competitors: ${query} Comparison`,
      description: `Detailed comparison between ${brandName} and other leading providers in the ${query} space. See features, pricing, and user reviews.`,
      hasBrandMention: true,
      resultType: "organic"
    },
    {
      rank: 4,
      url: "https://www.industry-news.com/latest-trends",
      title: `Latest Trends in ${query}`,
      description: `Discover what's new in the world of ${query}. Industry experts share insights on emerging technologies and methodologies.`,
      hasBrandMention: false,
      resultType: "news"
    },
    {
      rank: 5,
      url: `https://www.${brandName.toLowerCase().replace(/\s+/g, '')}.com`,
      title: `${brandName} Official Site - Leading ${query} Solution`,
      description: `${brandName} provides innovative ${query} solutions for businesses of all sizes. Explore our features and start your free trial today.`,
      hasBrandMention: true,
      resultType: "organic"
    },
    {
      rank: 6,
      url: "https://www.review-platform.com/top-10",
      title: `Top 10 ${query} Platforms - Where Does ${brandName} Rank?`,
      description: `Our experts reviewed the best ${query} platforms. See where ${brandName} ranks in our comprehensive analysis.`,
      hasBrandMention: true,
      resultType: "organic"
    },
    {
      rank: 7,
      url: "https://www.local-provider.com",
      title: `${query} Services Near You`,
      description: `Find ${query} services in your area. Local providers offering customized solutions for your specific needs.`,
      hasBrandMention: false,
      resultType: "local"
    }
  ];
  
  // Calculate brand mentions
  const brandMentionsCount = results.filter(r => r.hasBrandMention).length;
  
  console.log(`Generated ${results.length} mock results with ${brandMentionsCount} brand mentions`);
  
  return {
    searchEngine: "Google",
    query,
    source: "mock",
    brandMentions: brandMentionsCount,
    retrievalDate: new Date().toISOString(),
    topResults: results
  };
}
