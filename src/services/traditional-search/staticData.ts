import { TraditionalSearchResults, SearchResult } from "./types";

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
function getQuerySpecificResults(query: string, brandName: string): SearchResult[] {
  // Lowercase for easier comparison
  const lowerQuery = query.toLowerCase();
  
  // CRM software query - Using the provided HTML table data
  if (lowerQuery.includes("crm") || lowerQuery.includes("crm software")) {
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
  
  // Online furniture store query
  if (lowerQuery.includes("furniture") || lowerQuery.includes("online furniture")) {
    return [
      {
        rank: 1,
        url: `https://www.${brandName.toLowerCase().replace(/\s+/g, '')}.com/furniture`,
        title: `${brandName} | Online Furniture Store | Search Results`,
        description: `Shop furniture at ${brandName}. Find a wide selection of sofas, beds, tables, and more with free shipping on many items.`,
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://www.wikipedia.org/wiki/online_furniture_store",
        title: "Online furniture store - Wikipedia",
        description: "Wikipedia entry for \"online furniture store\". Learn about the history, features, and usage of online furniture store.",
        hasBrandMention: false,
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://www.industry-guide.com/online-furniture-store",
        title: "Online furniture store Guide | Industry Best Practices",
        description: `Complete guide to online furniture stores. Expert advice, tips, and best practices for buying furniture online.`,
        hasBrandMention: false,
        resultType: "organic"
      }
    ];
  }
  
  // Inbound marketing software query
  if (lowerQuery.includes("inbound marketing") || lowerQuery.includes("marketing software")) {
    return [
      {
        rank: 1,
        url: `https://www.example.com/search?q=inbound%20marketing%20software`,
        title: `Inbound marketing software | Search Results`,
        description: `Search results for "inbound marketing software". Information about ${brandName} and related topics.`,
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 2,
        url: `https://www.wikipedia.org/wiki/inbound_marketing_software`,
        title: `Inbound marketing software - Wikipedia`,
        description: `Wikipedia entry for "inbound marketing software". Learn about the history, features, and usage of inbound marketing software.`,
        hasBrandMention: false,
        resultType: "organic"
      },
      {
        rank: 3,
        url: `https://www.industry-guide.com/inbound-marketing-software`,
        title: `Inbound marketing software Guide | Industry Best Practices`,
        description: `Complete guide to inbound marketing software. Expert advice, tips, and best practices for inbound marketing software implementation.`,
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
