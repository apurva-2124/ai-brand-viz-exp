
import { SearchResult } from "../types";

/**
 * Get Highspot specific search results
 */
export function getHighspotResults(query: string): SearchResult[] {
  const lowerQuery = query.toLowerCase();
  
  // Highspot features specific results
  if (lowerQuery === "highspot features") {
    return [
      {
        rank: 1,
        url: "https://www.highspot.com/sales-enablement/sales-enablement-features/",
        title: "Essential Sales Enablement Features",
        description: "Learn about the essential features of Highspot's sales enablement platform and how they can help your sales team.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://www.g2.com/products/highspot/features",
        title: "Highspot Features | G2",
        description: "G2's breakdown of Highspot features based on user reviews and ratings.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://www.highspot.com/product/sales-enablement-platform-overview/",
        title: "The Sales Enablement Platform that Drives Sales Productivity...",
        description: "Overview of Highspot's sales enablement platform and its key features for driving sales productivity.",
        hasBrandMention: true,
        resultType: "organic"
      }
    ];
  }
  
  // Highspot competitors specific results
  if (lowerQuery === "highspot competitors") {
    return [
      {
        rank: 1,
        url: "https://www.gartner.com/reviews/market/revenue-enablement-platforms/vendor/highspot/product/highspot/alternatives",
        title: "Top Highspot Competitors & Alternatives 2025 | Gartner Peer Insights",
        description: "Gartner's analysis of Highspot competitors and alternatives in the revenue enablement platform market.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://www.highspot.com/seismic-competitor/",
        title: "Compare Seismic Competitors: Highspot vs Seismic - Highspot",
        description: "Highspot's comparison of their platform against Seismic, a key competitor in the sales enablement space.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://www.bigtincan.com/resources/highspot-competitors/",
        title: "8 Highspot Competitors: An In-Depth Analysis | Bigtincan",
        description: "Bigtincan's analysis of Highspot competitors in the sales enablement market.",
        hasBrandMention: true,
        resultType: "organic"
      }
    ];
  }
  
  // Sales enablement platform specific results
  if (lowerQuery === "sales enablement platform") {
    return [
      {
        rank: 1,
        url: "https://www.highspot.com/sales-enablement/",
        title: "The Definitive Guide to Sales Enablement for 2025 - Highspot",
        description: "Highspot's comprehensive guide to sales enablement strategies, tools, and best practices for 2025.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://www.gartner.com/reviews/market/revenue-enablement-platforms",
        title: "Best Revenue Enablement Platforms Reviews 2025 | Gartner Peer...",
        description: "Gartner's reviews and ratings of the top revenue enablement platforms in 2025.",
        hasBrandMention: false,
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://seismic.com/",
        title: "Seismic: #1 Global Sales Enablement Platform",
        description: "Seismic's sales enablement platform for managing content, training, and customer engagement.",
        hasBrandMention: false,
        resultType: "organic"
      }
    ];
  }
  
  // Return empty array if no specific match found
  return [];
}
