
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
  const lowerBrand = brandName.toLowerCase();

  if (!lowerResponse.includes(lowerBrand)) {
    return {
      level: "not_found",
      label: "Not Found",
      score: 0,
      context: null
    };
  }

  // Check for prominent mentions (brand name near the beginning or with positive context)
  const isProminent = 
    lowerResponse.indexOf(lowerBrand) < 200 || 
    lowerResponse.includes(`${lowerBrand} is leading`) ||
    lowerResponse.includes(`${lowerBrand} is a top`) ||
    lowerResponse.includes(`best ${lowerBrand}`) ||
    lowerResponse.includes(`popular ${lowerBrand}`);

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
