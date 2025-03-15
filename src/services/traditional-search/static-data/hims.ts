
import { SearchResult } from "../types";

/**
 * Get Hims & Hers Health specific search results
 */
export function getHimsResults(query: string): SearchResult[] {
  const lowerQuery = query.toLowerCase();
  
  // Hims reviews specific results
  if (lowerQuery === "hims reviews") {
    return [
      {
        rank: 1,
        url: "https://www.amazon.com/Strength-Regrowth-Treatment-Minoxidil-Unscented/dp/B09H3Q9JZT",
        title: "hims Topical Minoxidil Foam, 5% - Extra Strength Hair ... - Amazon.com",
        description: "Amazon customer reviews and ratings for Hims Topical Minoxidil Foam for hair regrowth.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://www.bbb.org/us/ca/san-francisco/profile/health-and-medical-products/hims-hers-inc-1116-880029/customer-reviews",
        title: "Hims & Hers Inc. | BBB Reviews | Better Business Bureau",
        description: "Better Business Bureau's customer reviews and ratings for Hims & Hers Inc.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://www.walmart.com/reviews/product/419920572",
        title: "Customer reviews for Hims Minoxidil 5% Topical Solution, Hair Loss...",
        description: "Walmart customer reviews for Hims Minoxidil 5% Topical Solution for hair loss treatment.",
        hasBrandMention: true,
        resultType: "organic"
      }
    ];
  }
  
  // Hims vs Roman specific results
  if (lowerQuery === "hims vs roman") {
    return [
      {
        rank: 1,
        url: "https://www.hims.com/blog/hims-vs-roman",
        title: "Hims vs. Roman for ED 2024: How Do They Compare? | Good...",
        description: "A detailed comparison of Hims and Roman for erectile dysfunction treatment options and services.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://www.innerbody.com/hims-vs-roman",
        title: "Hims vs. Roman | Which Telehealth Provider is Best?",
        description: "Innerbody's comprehensive comparison of Hims and Roman telehealth services for men's health.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://apnews.com/article/lifestyle-business-drug-approvals-corporate-news-sexual-and-reproductive-health-8e1d44c2534ac85cdc847c648ac5d015",
        title: "Hims vs Roman | AP News",
        description: "AP News article comparing Hims and Roman telehealth services for men's health.",
        hasBrandMention: true,
        resultType: "organic"
      }
    ];
  }
  
  // Telehealth services specific results
  if (lowerQuery === "telehealth services") {
    return [
      {
        rank: 1,
        url: "https://www.telehealth.com/",
        title: "The Best Telehealth Services - Telehealth.com",
        description: "Reviews and comparisons of the best telehealth services available for online medical consultations.",
        hasBrandMention: false,
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://www.cms.gov/medicare/coverage/telehealth/list-services",
        title: "List of Telehealth Services | CMS",
        description: "CMS's list of covered telehealth services for Medicare beneficiaries.",
        hasBrandMention: false,
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://www.mayoclinic.org/healthy-lifestyle/consumer-health/in-depth/telehealth/art-20044878",
        title: "Telehealth: Technology meets health care - Mayo Clinic",
        description: "Mayo Clinic's overview of telehealth services and how they're changing healthcare delivery.",
        hasBrandMention: false,
        resultType: "organic"
      }
    ];
  }
  
  // Return empty array if no specific match found
  return [];
}
