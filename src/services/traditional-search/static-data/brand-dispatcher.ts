
import { SearchResult } from "../types";
import { getSalesforceResults } from "./salesforce";
import { getWayfairResults } from "./wayfair";
import { getAmazonResults } from "./amazon";
import { getAirbnbResults } from "./airbnb";
import { getHubSpotResults } from "./hubspot";
import { getAirtableResults } from "./airtable";
import { getCodaResults } from "./coda";
import { getMondayResults } from "./monday";
import { getHighspotResults } from "./highspot";
import { getZocdocResults } from "./zocdoc";
import { getGoodRxResults } from "./goodrx";
import { getHimsResults } from "./hims";
import { getOneMedicalResults } from "./onemedical";
import { getRomanResults } from "./roman";
import { getSheinResults } from "./shein";
import { getWarbyParkerResults } from "./warbyparker";
import { getGlossierResults } from "./glossier";
import { getVuoriResults } from "./vuori";
import { getBeisResults } from "./beis";
import { getMagicSpoonResults } from "./magicspoon";
import { getVrboResults } from "./vrbo";
import { getMarriottResults } from "./marriott";
import { getTuroResults } from "./turo";
import { getScottsCheapFlightsResults } from "./scottscheapflights";
import { getSelinaResults } from "./selina";

/**
 * Dispatch to the correct brand handler based on brand name
 */
export function getBrandSpecificResults(query: string, brandName: string): SearchResult[] {
  // Lowercase for easier comparison
  const lowerBrand = brandName.toLowerCase();
  const lowerQuery = query.toLowerCase();
  
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
    case "hubspot":
      return getHubSpotResults(query);
    case "airtable":
      return getAirtableResults(query);
    case "coda":
      return getCodaResults(query);
    case "monday.com":
      return getMondayResults(query);
    case "highspot":
      return getHighspotResults(query);
    case "zocdoc":
      return getZocdocResults(query);
    case "goodrx":
      return getGoodRxResults(query);
    case "hims & hers health":
      return getHimsResults(query);
    case "one medical":
      return getOneMedicalResults(query);
    case "roman (ro health)":
      return getRomanResults(query);
    case "shein":
      return getSheinResults(query);
    case "warby parker":
      return getWarbyParkerResults(query);
    case "glossier":
      return getGlossierResults(query);
    case "vuori":
      return getVuoriResults(query);
    case "beis travel":
      return getBeisResults(query);
    case "magic spoon":
      return getMagicSpoonResults(query);
    case "vrbo":
      return getVrboResults(query);
    case "marriott bonvoy":
      return getMarriottResults(query);
    case "turo":
      return getTuroResults(query);
    case "scott's cheap flights":
      return getScottsCheapFlightsResults(query);
    case "selina hotels":
      return getSelinaResults(query);
    default:
      // Return empty array if brand not found - don't use fallbacks
      return [];
  }
}
