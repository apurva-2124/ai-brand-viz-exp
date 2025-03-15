
import { SearchResult } from "../types";

/**
 * Get Zocdoc specific search results
 */
export function getZocdocResults(query: string): SearchResult[] {
  const lowerQuery = query.toLowerCase();
  
  // Zocdoc reviews specific results
  if (lowerQuery === "zocdoc reviews") {
    return [
      {
        rank: 1,
        url: "https://www.zocdoc.com/",
        title: "Zocdoc | Find a Doctor Near You | Book Doctors Online",
        description: "Zocdoc helps you find and book top-rated doctors, based on patient reviews, that accept your insurance and are available when you need them.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://www.reddit.com/r/AskNYC/comments/mgz4zv/is_zocdoc_reliable_usable/",
        title: "Is Zocdoc reliable / usable? : r/AskNYC",
        description: "Reddit discussion about the reliability and usability of Zocdoc for finding doctors in NYC.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://www.zocdoc.com/about/verifiedreviews/",
        title: "Verified Reviews | Zocdoc",
        description: "Information about Zocdoc's verified reviews system and how it ensures authentic patient feedback.",
        hasBrandMention: true,
        resultType: "organic"
      }
    ];
  }
  
  // Zocdoc app specific results
  if (lowerQuery === "zocdoc app") {
    return [
      {
        rank: 1,
        url: "https://www.zocdoc.com/",
        title: "Zocdoc | Find a Doctor Near You | Book Doctors Online",
        description: "Zocdoc helps you find and book top-rated doctors, based on patient reviews, that accept your insurance and are available when you need them.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://apps.apple.com/us/app/zocdoc-find-and-book-doctors/id391062219",
        title: "Zocdoc - Find and book doctors on the App Store",
        description: "Read reviews, compare customer ratings, see screenshots, and learn more about Zocdoc - Find and book doctors on the App Store.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://play.google.com/store/apps/details?id=com.zocdoc.android&hl=en_US",
        title: "Zocdoc - Find and book doctors - Apps on Google Play",
        description: "Find and book doctors, dentists, and eye doctors near you with Zocdoc's mobile app.",
        hasBrandMention: true,
        resultType: "organic"
      }
    ];
  }
  
  // Find a doctor specific results
  if (lowerQuery === "find a doctor") {
    return [
      {
        rank: 1,
        url: "https://www.northwell.edu/find-care",
        title: "Search for a Northwell Health provider",
        description: "Find care at Northwell Health by searching for providers, specialties, and locations near you.",
        hasBrandMention: false,
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://tricare.mil/GettingCare/FindDoctor",
        title: "Find a Doctor | TRICARE",
        description: "How to find a TRICARE provider or network provider who can meet your health care needs.",
        hasBrandMention: false,
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://my.clevelandclinic.org/staff",
        title: "Find a Doctor | Cleveland Clinic",
        description: "Find a Cleveland Clinic doctor by name, specialty, or location to schedule an appointment.",
        hasBrandMention: false,
        resultType: "organic"
      }
    ];
  }
  
  // Return empty array if no specific match found
  return [];
}
