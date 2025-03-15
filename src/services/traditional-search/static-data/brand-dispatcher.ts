
import { SearchResult } from "../types";
import { getSalesforceResults } from "./salesforce";
import { getWayfairResults } from "./wayfair";
import { getAmazonResults } from "./amazon";
import { getAirbnbResults } from "./airbnb";

/**
 * Dispatch to the correct brand handler based on brand name
 */
export function getBrandSpecificResults(query: string, brandName: string): SearchResult[] {
  // Lowercase for easier comparison
  const lowerBrand = brandName.toLowerCase();
  
  // Dispatch to the correct brand handler
  switch (lowerBrand) {
    case "salesforce":
      return getSalesforceResults(query);
    case "wayfair":
      return getWayfairResults(query);
    case "amazon":
      return getAmazonResults(query);
    case "airbnb":
      return getAirbnbResults(query);
    default:
      // Return empty array if brand not found - don't use fallbacks
      return [];
  }
}
