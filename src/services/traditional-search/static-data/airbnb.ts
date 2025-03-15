
import { SearchResult } from "../types";

/**
 * Get Airbnb specific search results
 */
export function getAirbnbResults(query: string): SearchResult[] {
  const lowerQuery = query.toLowerCase();
  
  // Airbnb policies results
  if (lowerQuery === "airbnb policies") {
    return [
      {
        rank: 1,
        url: "https://www.airbnb.com/help/article/2908/terms-of-service",
        title: "Terms of Service - Airbnb Help Center",
        description: "Read Airbnb's Terms of Service that govern your use of the Airbnb Platform and all other related policies.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://www.airbnb.com/help/article/2868/airbnb-guest-refund-policy",
        title: "Airbnb Guest Refund Policy - Airbnb Help Center",
        description: "Learn about Airbnb's Guest Refund Policy and when you might be eligible for a refund when issues arise during your stay.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://www.airbnb.com/help/article/2701/extenuating-circumstances-policy-and-the-coronavirus-covid19",
        title: "Extenuating Circumstances Policy and COVID-19 - Airbnb Help Center",
        description: "Information about how Airbnb's Extenuating Circumstances Policy applies to cancellations related to COVID-19.",
        hasBrandMention: true,
        resultType: "organic"
      }
    ];
  }
  
  // Return empty array if no specific match found
  return [];
}
