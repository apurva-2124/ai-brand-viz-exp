
import { SearchResult } from "../types";

/**
 * Get Wayfair specific search results
 */
export function getWayfairResults(query: string): SearchResult[] {
  const lowerQuery = query.toLowerCase();
  
  // Wayfair customer service specific results
  if (lowerQuery === "wayfair customer service") {
    return [
      {
        rank: 1,
        url: "https://www.wayfair.com/customer-service/contact-us",
        title: "Contact Us | Customer Service | Wayfair",
        description: "Need help with your Wayfair order? Contact our customer service team by phone, email, or chat. We're here to help with all your home furnishings needs.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://www.wayfair.com/help/",
        title: "Help Center | Wayfair",
        description: "Find answers to frequently asked questions about orders, delivery, returns, and more. Browse our help topics or search for specific information.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://www.wayfair.com/customer-service/returns",
        title: "Returns & Refunds Policy | Wayfair",
        description: "Learn about Wayfair's return policy, how to initiate a return, and what to expect with your refund. Most items can be returned within 30 days.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 4,
        url: "https://www.trustpilot.com/review/www.wayfair.com",
        title: "Wayfair Reviews | Read Customer Service Reviews of wayfair.com",
        description: "Do you agree with Wayfair's TrustScore? Voice your opinion today and hear what 11,523 customers have already said.",
        hasBrandMention: true,
        resultType: "organic"
      }
    ];
  }
  
  // Online furniture store specific results
  if (lowerQuery === "online furniture store") {
    return [
      {
        rank: 1,
        url: "https://www.wayfair.com/",
        title: "Wayfair - Furniture, Home Decor, & More | Up to 70% Off",
        description: "Shop Wayfair for furniture, décor, home basics, and more. Free shipping on many items. Fast delivery and exceptional customer service.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://www.overstock.com/",
        title: "Overstock | The Best Deals Online: Furniture, Bedding, Rugs...",
        description: "Overstock's online furniture store offering quality home furniture for living rooms, bedrooms, and more at affordable prices.",
        hasBrandMention: false,
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://www.ikea.com/us/en/",
        title: "IKEA: Affordable Home Furniture, Décor, & Storage Solutions | IKEA",
        description: "IKEA offers affordable furniture and home accessories for modern living spaces.",
        hasBrandMention: false,
        resultType: "organic"
      }
    ];
  }
  
  // Return empty array if no specific match found
  return [];
}
