
import type { QueryType, QueryVariables } from "./queryTemplates";
import { identifyKeywordIntent, getQueryTemplate } from "./queryTemplates";

export const generateQueriesForKeywords = (
  keywords: string[],
  brandName: string,
  industry: string,
  competitors?: string[],
  specificQueryType?: QueryType
): { keyword: string; query: string; queryType: QueryType }[] => {
  console.log('Generating queries for:', { keywords, brandName, industry, specificQueryType });
  
  return keywords.map(keyword => {
    // Use the specific query type if provided, otherwise determine based on keyword intent
    const queryType = specificQueryType || identifyKeywordIntent(keyword);
    
    // Set up variables for template
    const variables: QueryVariables = {
      brand: brandName,
      industry,
      keyword,
      competitors
    };
    
    // Generate the query using the template
    const query = getQueryTemplate(queryType, variables);
    
    console.log('Generated query:', { keyword, query, queryType });
    
    return {
      keyword,
      query,
      queryType
    };
  });
};

// Scoring function to analyze visibility in AI responses
export const scoreVisibility = (response: string, brandName: string) => {
  if (!response || !brandName) {
    return {
      level: "not_found",
      label: "Not Found",
      score: 0,
      context: null
    };
  }

  const lowerResponse = response.toLowerCase();
  
  // Split brand name into parts to handle multi-word brands
  const brandParts = brandName.toLowerCase().split(/\s+/);
  const mainBrandTerm = brandParts[0]; // Get the first part of the brand name
  
  // Check for the full brand name
  const fullBrandRegex = new RegExp('\\b' + brandName.toLowerCase().replace(/\s+/g, '\\s+') + '\\b', 'i');
  const mainBrandRegex = new RegExp('\\b' + mainBrandTerm + '\\b', 'i');
  
  // First check if the full brand name is mentioned
  const fullBrandMatch = fullBrandRegex.test(lowerResponse);
  
  // If full brand isn't found, check if the main part is mentioned
  const mainBrandMatch = !fullBrandMatch && mainBrandRegex.test(lowerResponse);
  
  // Return not found if neither the full brand nor main part is mentioned
  if (!fullBrandMatch && !mainBrandMatch) {
    return {
      level: "not_found",
      label: "Not Found",
      score: 0,
      context: null
    };
  }

  // Use the matched brand term for further analysis
  const matchedBrandTerm = fullBrandMatch ? brandName.toLowerCase() : mainBrandTerm;
  
  // Check for prominent mentions (brand name near the beginning or with positive context)
  const firstOccurrence = lowerResponse.indexOf(matchedBrandTerm);
  const isProminent = 
    (firstOccurrence >= 0 && firstOccurrence < response.length / 3) || 
    lowerResponse.includes(`${matchedBrandTerm} is leading`) ||
    lowerResponse.includes(`${matchedBrandTerm} is a top`) ||
    lowerResponse.includes(`best ${matchedBrandTerm}`) ||
    lowerResponse.includes(`popular ${matchedBrandTerm}`) ||
    lowerResponse.includes(`such as ${matchedBrandTerm}`) ||
    lowerResponse.includes(`${matchedBrandTerm}'s`);

  if (isProminent) {
    return {
      level: "high",
      label: "High Visibility",
      score: 10,
      context: "Brand prominently featured"
    };
  }

  return {
    level: "low",
    label: "Low Visibility",
    score: 5,
    context: "Brand mentioned but not prominent"
  };
};

// Analyze competitors in AI responses
export const analyzeCompetitors = (
  response: string, 
  brandName: string, 
  competitors?: string[]
) => {
  if (!response) {
    return {
      competitorsFound: [],
      competitorOutranking: false,
      riskLevel: "low"
    };
  }

  const lowerResponse = response.toLowerCase();
  const lowerBrand = brandName.toLowerCase();
  
  // If no competitors provided, try to detect common competitors
  const defaultCompetitors = competitors || [];
  
  const foundCompetitors = defaultCompetitors.filter(comp => 
    lowerResponse.includes(comp.toLowerCase())
  );

  const competitorOutranking = foundCompetitors.some(comp => 
    lowerResponse.indexOf(comp.toLowerCase()) < 
    lowerResponse.indexOf(lowerBrand)
  );

  return {
    competitorsFound: foundCompetitors,
    competitorOutranking,
    riskLevel: competitorOutranking ? "high" : foundCompetitors.length > 0 ? "medium" : "low"
  };
};

// Generate visibility recommendations
export const generateRecommendation = (visibilityLevel: string): string => {
  switch (visibilityLevel) {
    case "high":
      return "Maintain strong position and monitor for emerging competitors";
    case "low":
      return "Increase brand mentions and authority signals in key contexts";
    case "not_found":
      return "Create targeted content to establish brand presence in AI responses";
    default:
      return "Review brand positioning and content strategy";
  }
};

// Create a wrapper function for transformKeywordToQuery that takes a single keyword
export const transformKeywordToQuery = (
  keyword: string,
  queryType: QueryType,
  options?: {
    brand_name: string;
    competitor_names?: string;
    searchType?: "traditional" | "voice" | "ai";
  }
): string => {
  // Create dummy variables for template
  const variables: QueryVariables = {
    brand: options?.brand_name || "Brand",
    industry: "industry",
    keyword,
    competitors: options?.competitor_names ? [options.competitor_names] : undefined
  };
  
  // Get the base query from the template
  let query = getQueryTemplate(queryType, variables);
  
  // Adjust query based on search type
  if (options?.searchType === "voice") {
    query = `Hey, I want to know ${query.toLowerCase()}`;
  } else if (options?.searchType === "ai") {
    query = `I'm researching options for ${keyword}. ${query} I want detailed information about features, pricing, and user reviews.`;
  }
  
  return query;
};

// Re-export types
export type { QueryType, QueryVariables };
