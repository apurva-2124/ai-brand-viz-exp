
import { SearchResult } from "../types";

/**
 * Get query-specific static results for generic cases
 */
export function getGenericQueryResults(query: string, brandName: string): SearchResult[] {
  // CRM software query
  if (query.toLowerCase().includes("crm") || query.toLowerCase().includes("crm software")) {
    return [
      {
        rank: 1,
        url: "https://www.salesforce.com/crm/what-is-crm/",
        title: "What is CRM?",
        description: `Learn about Customer Relationship Management (CRM) software and how it can help your business grow. ${brandName === "Salesforce" ? "Discover Salesforce's industry-leading CRM solutions." : ""}`,
        hasBrandMention: brandName === "Salesforce",
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://www.forbes.com/advisor/business/best-crm-software/",
        title: "Best CRM Software 2025",
        description: `Expert reviews and rankings of the top CRM software platforms for businesses of all sizes. ${brandName === "Salesforce" ? "See why Salesforce consistently ranks as a top choice." : ""}`,
        hasBrandMention: brandName === "Salesforce",
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://keap.com/product/what-is-crm",
        title: "What is CRM? - Keap",
        description: "Keap explains what CRM software is and how it can streamline your business operations, improve customer relationships, and drive growth.",
        hasBrandMention: false,
        resultType: "organic"
      }
    ];
  }
  
  // Default fallback results
  return [
    {
      rank: 1,
      url: `https://www.example.com/search?q=${encodeURIComponent(query)}`,
      title: `${query} | Search Results`,
      description: `Search results for "${query}". ${brandName ? `Information about ${brandName} and related topics.` : ""}`,
      hasBrandMention: !!brandName,
      resultType: "organic"
    },
    {
      rank: 2,
      url: `https://www.wikipedia.org/wiki/${encodeURIComponent(query.replace(/\s+/g, '_'))}`,
      title: `${query} - Wikipedia`,
      description: `Wikipedia entry for "${query}". Learn about the history, features, and usage of ${query}.`,
      hasBrandMention: false,
      resultType: "organic"
    },
    {
      rank: 3,
      url: `https://www.industry-guide.com/${encodeURIComponent(query.toLowerCase().replace(/\s+/g, '-'))}`,
      title: `${query} Guide | Industry Best Practices`,
      description: `Complete guide to ${query}. Expert advice, tips, and best practices for ${query} implementation.`,
      hasBrandMention: false,
      resultType: "organic"
    }
  ];
}
