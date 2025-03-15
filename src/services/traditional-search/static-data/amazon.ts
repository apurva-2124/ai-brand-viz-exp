
import { SearchResult } from "../types";

/**
 * Get Amazon specific search results
 */
export function getAmazonResults(query: string): SearchResult[] {
  const lowerQuery = query.toLowerCase();
  
  // Amazon Prime specific results
  if (lowerQuery === "amazon prime") {
    return [
      {
        rank: 1,
        url: "https://www.amazon.com/amazonprime",
        title: "Amazon Prime - Amazon.com",
        description: "Learn about Amazon Prime benefits, including fast, free delivery, exclusive deals, and access to Prime Video, Amazon Music, and more.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://www.amazon.com/primeday",
        title: "Amazon Prime Day | Amazon.com",
        description: "Prime Day is Amazon's annual deal event exclusively for Prime members, featuring two days of special savings on thousands of items.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://www.amazon.com/gp/help/customer/display.html?nodeId=G34EUPKVMYFW8N2U",
        title: "Amazon Prime membership and cost - Amazon Customer Service",
        description: "Learn about Amazon Prime membership options, pricing, and how to sign up, cancel, or make changes to your membership.",
        hasBrandMention: true,
        resultType: "organic"
      }
    ];
  }
  
  // Return empty array if no specific match found
  return [];
}
