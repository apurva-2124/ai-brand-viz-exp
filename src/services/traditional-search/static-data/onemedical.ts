
import { SearchResult } from "../types";

/**
 * Get One Medical specific search results
 */
export function getOneMedicalResults(query: string): SearchResult[] {
  const lowerQuery = query.toLowerCase();
  
  // One Medical membership specific results
  if (lowerQuery === "one medical membership") {
    return [
      {
        rank: 1,
        url: "https://www.onemedical.com/membership/",
        title: "Alternative to Concierge Medicine or Urgent Care | One Medical",
        description: "Learn about One Medical's membership model and how it provides convenient, affordable access to high-quality primary care.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://health.amazon.com/prime?ref_=nav_cs_all_health_ingress_onem_h",
        title: "Amazon One Medical | On-Demand Virtual Care | Primary Care",
        description: "Amazon One Medical offers primary care services with a membership model for virtual and in-person care.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://www.onemedical.com/",
        title: "One Medical: Exceptional Primary Care - Find a Doctor Near You",
        description: "One Medical offers exceptional primary care services with same-day appointments, 24/7 virtual care, and more.",
        hasBrandMention: true,
        resultType: "organic"
      }
    ];
  }
  
  // One Medical reviews specific results
  if (lowerQuery === "one medical reviews") {
    return [
      {
        rank: 1,
        url: "https://www.onemedical.com/locations/dc/1627eye/",
        title: "Primary Care Doctors in Washington, DC - One Medical",
        description: "Find top-rated primary care doctors at One Medical's Washington, DC location.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://www.businessinsider.com/what-its-like-to-use-one-medical-for-primary-care-in-new-york-review-2019-4",
        title: "What It's Like to Use One Medical for Primary Care in New York...",
        description: "Business Insider's review of using One Medical for primary care services in New York.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://www.onemedical.com/locations/sd/carlsbad/",
        title: "Primary Care Physicians in Carlsbad, CA | One Medical",
        description: "Find primary care physicians at One Medical's Carlsbad, CA location.",
        hasBrandMention: true,
        resultType: "organic"
      }
    ];
  }
  
  // Primary care near me specific results
  if (lowerQuery === "primary care near me") {
    return [
      {
        rank: 1,
        url: "https://www.medicare.gov/care-compare/",
        title: "Find Healthcare Providers: Compare Care Near You | Medicare",
        description: "Medicare's tool for finding and comparing healthcare providers, including primary care, near your location.",
        hasBrandMention: false,
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://tricare.mil/GettingCare/FindDoctor",
        title: "Find a Doctor | TRICARE",
        description: "TRICARE's tool for finding primary care providers and specialists in your area.",
        hasBrandMention: false,
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://muschealth.org/medical-services/primary-care/locations",
        title: "MUSC Primary Care Doctors Office Near Me | Charleston, SC",
        description: "MUSC Health's primary care locations in Charleston, SC and surrounding areas.",
        hasBrandMention: false,
        resultType: "organic"
      }
    ];
  }
  
  // Return empty array if no specific match found
  return [];
}
