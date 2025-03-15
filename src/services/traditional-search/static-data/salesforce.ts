
import { SearchResult } from "../types";

/**
 * Get Salesforce specific search results
 */
export function getSalesforceResults(query: string): SearchResult[] {
  const lowerQuery = query.toLowerCase();
  
  // Salesforce pricing specific results
  if (lowerQuery === "salesforce pricing") {
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
