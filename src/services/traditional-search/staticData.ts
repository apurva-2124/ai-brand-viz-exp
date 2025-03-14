
import { TraditionalSearchResults } from "./types";

/**
 * Get static traditional search results for testing and demo purposes
 */
export function getStaticTraditionalResults(
  brandName: string,
  query: string
): TraditionalSearchResults {
  console.log(`Getting static data for brand: ${brandName}, query: ${query}`);
  
  // Create a standardized timestamp for consistent display
  const timestamp = new Date().toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  });

  // Customize results based on the query to make them more relevant
  const staticResults = getQuerySpecificResults(query, brandName);
  
  return {
    searchEngine: "Google",
    query: query,
    source: "static",
    brandMentions: staticResults.filter(r => r.hasBrandMention).length,
    retrievalDate: timestamp,
    topResults: staticResults
  };
}

/**
 * Get query-specific static results
 */
function getQuerySpecificResults(query: string, brandName: string) {
  // Lowercase for easier comparison
  const lowerQuery = query.toLowerCase();
  
  // Find a doctor query
  if (lowerQuery.includes("doctor") || lowerQuery.includes("find a doctor")) {
    return [
      {
        rank: 1,
        url: "https://www.zocdoc.com/find-a-doctor",
        title: "Find a Doctor Near You - Book Online Today | Zocdoc",
        description: `Find doctors near you, compare ratings, and book appointments online instantly. ${brandName} makes it easy to find the right doctor for your needs.`,
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://health.usnews.com/doctors",
        title: "Find a Doctor - Doctor Reviews & Ratings | US News",
        description: "Search for the best doctors in your area by specialty, condition, or name. Read ratings and reviews from other patients to find the doctor who's right for you.",
        hasBrandMention: false,
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://www.healthgrades.com/find-a-doctor",
        title: "Find a Doctor - Find The Right Doctor For You | Healthgrades",
        description: "Find the right doctor, right now with Healthgrades. Search for doctors by name, specialty, condition, or procedure.",
        hasBrandMention: false,
        resultType: "organic"
      }
    ];
  }
  
  // CRM software query
  if (lowerQuery.includes("crm") || lowerQuery.includes("crm software")) {
    return [
      {
        rank: 1,
        url: "https://www.salesforce.com/crm/what-is-crm/software/",
        title: "What Is CRM Software? A Comprehensive Guide",
        description: `Search result for "CRM software" related to What Is CRM Software? A Comprehensive Guide. ${brandName === "Salesforce" ? "Learn about Salesforce's industry-leading CRM solution." : ""}`,
        hasBrandMention: brandName === "Salesforce",
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://www.forbes.com/advisor/business/software/best-crm-software/",
        title: "10 Best CRM Software Of 2025",
        description: `Search result for "CRM software" related to 10 Best CRM Software Of 2025. ${brandName === "HubSpot" ? "See why HubSpot ranks at the top." : ""}`,
        hasBrandMention: brandName === "HubSpot",
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://keap.com/product/what-is-crm",
        title: "What is CRM? | Keap - Small Business CRM & Automation",
        description: `Search result for "CRM software" related to What is CRM? Learn how CRM software can help your business grow.`,
        hasBrandMention: false,
        resultType: "organic"
      }
    ];
  }
  
  // Default fallback for any other query
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
