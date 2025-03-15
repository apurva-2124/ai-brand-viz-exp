
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
  
  // Salesforce vs HubSpot specific results
  if (lowerQuery === "salesforce vs hubspot") {
    return [
      {
        rank: 1,
        url: "https://www.reddit.com/r/salesforce/comments/136slim/salesforce_vs_hubspot/",
        title: "Salesforce vs. HubSpot : r/salesforce",
        description: "Reddit discussion comparing Salesforce and HubSpot CRM platforms, with users sharing their experiences with both systems.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://www.hubspot.com/comparisons/salesforce-vs-hubspot",
        title: "Salesforce Sales Cloud vs HubSpot | Why HubSpot is the Best ...",
        description: "HubSpot's comparison page highlighting the differences between their platform and Salesforce, focusing on usability and pricing.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://www.reddit.com/r/salesforce/comments/15r9drw/probably_an_age_old_question_hubspot_vs/",
        title: "Probably an age old question… Hubspot vs Salesforce. Why wouldn ...",
        description: "Another Reddit discussion where users debate the merits of choosing between HubSpot and Salesforce for different business needs.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 4,
        url: "https://www.revopscoop.com/post/hubspot-v-salesforce-admin",
        title: "HubSpot vs. Salesforce from an Admin's ... - RevOps Co-op Blog",
        description: "Blog post comparing the administration experience between HubSpot and Salesforce from an administrator's perspective.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 5,
        url: "https://zapier.com/blog/hubspot-vs-salesforce/",
        title: "HubSpot vs. Salesforce: Which is right for you? [2025]",
        description: "Zapier's in-depth comparison of HubSpot and Salesforce, analyzing features, pricing, and use cases to help businesses choose the right platform.",
        hasBrandMention: true,
        resultType: "organic"
      }
    ];
  }
  
  // Return empty array if no specific match found
  return [];
}
