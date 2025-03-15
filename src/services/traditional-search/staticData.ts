import { TraditionalSearchResults, SearchResult } from "./types";

/**
 * Get static traditional search results for testing and demo purposes
 */
export function getStaticTraditionalResults(
  brandName: string,
  query: string
): TraditionalSearchResults {
  console.log(`Getting static data for brand: ${brandName}, query: ${query}`);
  
  // Create a standardized timestamp for consistent display
  const timestamp = new Date().toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  });

  // Check for specific query and brand combinations first
  const specificResults = getSpecificQueryResults(query, brandName);
  if (specificResults.length > 0) {
    return {
      searchEngine: "Google",
      query: query,
      source: "static",
      brandMentions: specificResults.filter(r => r.hasBrandMention).length,
      retrievalDate: timestamp,
      topResults: specificResults
    };
  }

  // Fallback to generic query results
  const genericResults = getQuerySpecificResults(query, brandName);
  
  return {
    searchEngine: "Google",
    query: query,
    source: "static",
    brandMentions: genericResults.filter(r => r.hasBrandMention).length,
    retrievalDate: timestamp,
    topResults: genericResults
  };
}

/**
 * Get results for specific query + brand combinations that have custom data
 */
function getSpecificQueryResults(query: string, brandName: string): SearchResult[] {
  // Lowercase for easier comparison
  const lowerQuery = query.toLowerCase();
  const lowerBrand = brandName.toLowerCase();
  
  // Salesforce pricing specific results
  if (lowerBrand === "salesforce" && lowerQuery === "salesforce pricing") {
    return [
      {
        rank: 1,
        url: "https://www.salesforce.com/pricing/",
        title: "Salesforce Pricing: See Pricing Plans for All Salesforce Products ...",
        description: "Explore Salesforce pricing plans and learn which products and services are right for your business. Get transparent, affordable pricing for all Salesforce product suites.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://www.reddit.com/r/salesforce/comments/1csgxnd/i_dont_understand_the_salesforce_pricing_why_is/",
        title: "I don't understand the Salesforce pricing. Why is it so expensive?? : r ...",
        description: "Reddit discussion about Salesforce pricing, with users sharing their opinions and experiences about the platform's cost structure and value proposition.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://www.salesforce.com/sales/pricing/",
        title: "Salesforce Sales Pricing | Salesforce US",
        description: "Compare Sales Cloud pricing plans and find the right CRM solution for your business. Salesforce offers flexible pricing options to meet your needs.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 4,
        url: "https://trailhead.salesforce.com/trailblazer-community/feed/0D54S00000A8kXISAZ",
        title: "CPQ Different Pricing by Region | Salesforce Trailblazer Community",
        description: "Salesforce Trailblazer Community discussion about implementing different pricing models by region using Salesforce CPQ.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 5,
        url: "https://www.salesforce.com/eu/pricing/",
        title: "Salesforce Pricing: See Pricing Plans for All Salesforce Products ...",
        description: "European pricing page for Salesforce products and services. Compare plans and features to find the right solution for your business needs.",
        hasBrandMention: true,
        resultType: "organic"
      }
    ];
  }
  
  // Return empty array if no specific match found
  return [];
}

/**
 * Get query-specific static results (generic fallback)
 */
function getQuerySpecificResults(query: string, brandName: string): SearchResult[] {
  // CRM software query
  if (query.toLowerCase().includes("crm") || query.toLowerCase().includes("crm software")) {
    return [
      {
        rank: 1,
        url: "https://www.salesforce.com/crm/what-is-crm/",
        title: "What is CRM?",
        description: `Learn about Customer Relationship Management (CRM) software and how it can help your business grow. ${brandName === "Salesforce" ? "Discover Salesforce's industry-leading CRM solutions." : ""}`,
        hasBrandMention: brandName === "Salesforce",
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://www.forbes.com/advisor/business/best-crm-software/",
        title: "Best CRM Software 2025",
        description: `Expert reviews and rankings of the top CRM software platforms for businesses of all sizes. ${brandName === "Salesforce" ? "See why Salesforce consistently ranks as a top choice." : ""}`,
        hasBrandMention: brandName === "Salesforce",
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://keap.com/product/what-is-crm",
        title: "What is CRM? - Keap",
        description: "Keap explains what CRM software is and how it can streamline your business operations, improve customer relationships, and drive growth.",
        hasBrandMention: false,
        resultType: "organic"
      }
    ];
  }
  
  // Default fallback results
  return [
    {
      rank: 1,
      url: `https://www.example.com/search?q=${encodeURIComponent(query)}`,
      title: `${query} | Search Results`,
      description: `Search results for "${query}". ${brandName ? `Information about ${brandName} and related topics.` : ""}`,
      hasBrandMention: !!brandName,
      resultType: "organic"
    },
    {
      rank: 2,
      url: `https://www.wikipedia.org/wiki/${encodeURIComponent(query.replace(/\s+/g, '_'))}`,
      title: `${query} - Wikipedia`,
      description: `Wikipedia entry for "${query}". Learn about the history, features, and usage of ${query}.`,
      hasBrandMention: false,
      resultType: "organic"
    },
    {
      rank: 3,
      url: `https://www.industry-guide.com/${encodeURIComponent(query.toLowerCase().replace(/\s+/g, '-'))}`,
      title: `${query} Guide | Industry Best Practices`,
      description: `Complete guide to ${query}. Expert advice, tips, and best practices for ${query} implementation.`,
      hasBrandMention: false,
      resultType: "organic"
    }
  ];
}
