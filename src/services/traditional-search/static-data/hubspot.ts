
import { SearchResult } from "../types";

/**
 * Get HubSpot specific search results
 */
export function getHubSpotResults(query: string): SearchResult[] {
  const lowerQuery = query.toLowerCase();
  
  // HubSpot CRM specific results
  if (lowerQuery === "hubspot crm") {
    return [
      {
        rank: 1,
        url: "https://www.hubspot.com/products/crm",
        title: "Streamline Your Entire Business with a Free CRM | HubSpot",
        description: "HubSpot's free CRM software gives you all the tools you need to organize, track, and nurture your leads and customers. Try it free today.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://community.hubspot.com/t5/Tips-Tricks-Best-Practices/CRM-amp-Modules-Starter-Checklist/m-p/950323",
        title: "Solved: HubSpot Community - CRM & Modules Starter Checklist",
        description: "Community discussion about HubSpot CRM implementation and best practices for getting started with the platform.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://www.hubspot.com/",
        title: "HubSpot | Software & Tools for your Business - Homepage",
        description: "HubSpot's CRM platform has all the tools and integrations you need for marketing, sales, content management, and customer service.",
        hasBrandMention: true,
        resultType: "organic"
      }
    ];
  }
  
  // HubSpot alternatives specific results
  if (lowerQuery === "hubspot alternatives") {
    return [
      {
        rank: 1,
        url: "https://zapier.com/blog/hubspot-alternatives/",
        title: "The 8 best HubSpot alternatives in 2025 | Zapier",
        description: "Looking for HubSpot alternatives? Here are 8 great options to consider for your CRM, marketing, and sales needs.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://www.bigcontacts.com/blog/hubspot-alternatives/",
        title: "10 Best HubSpot Alternatives Worth Trying in 2025",
        description: "Find the best HubSpot alternatives for your business with our comprehensive comparison of features, pricing, and user experiences.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://www.zendesk.com/service/comparison/hubspot-alternative/",
        title: "Top 15 HubSpot competitors and alternatives for 2025",
        description: "Compare HubSpot competitors and alternatives to find the best fit for your business needs and budget.",
        hasBrandMention: true,
        resultType: "organic"
      }
    ];
  }
  
  // Inbound marketing software specific results
  if (lowerQuery === "inbound marketing software") {
    return [
      {
        rank: 1,
        url: "https://www.cobloom.com/blog/best-inbound-marketing-software-saas",
        title: "The Best B2B Inbound Marketing Software Tools - 2025 Edition",
        description: "Comprehensive guide to the best inbound marketing software tools for B2B SaaS companies.",
        hasBrandMention: false,
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://clickup.com/blog/inbound-marketing-tools/",
        title: "10 Best Inbound Marketing Software Tools in 2025 | ClickUp",
        description: "Discover the top inbound marketing software tools to enhance your marketing strategy and generate more leads.",
        hasBrandMention: false,
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://academy.hubspot.com/certification-overview",
        title: "HubSpot Academy",
        description: "Free certification courses for inbound marketing, sales, customer service, and more from HubSpot Academy.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 4,
        url: "https://www.hubspot.com/products/marketing",
        title: "Marketing Software for Businesses of Every Size | HubSpot",
        description: "HubSpot's marketing software has all the tools you need to run complete inbound marketing campaigns at a fraction of the cost.",
        hasBrandMention: true,
        resultType: "organic"
      }
    ];
  }
  
  // Return empty array if no specific match found
  return [];
}
