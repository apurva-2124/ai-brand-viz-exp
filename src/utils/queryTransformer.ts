
import type { QueryType, QueryVariables } from "./queryTemplates";
import { identifyKeywordIntent, getQueryTemplate } from "./queryTemplates";

export const generateQueriesForKeywords = (
  keywords: string[],
  brandName: string,
  industry: string,
  competitors?: string[]
): { keyword: string; query: string; queryType: QueryType }[] => {
  return keywords.map(keyword => {
    // Determine the query type based on keyword intent
    const queryType = identifyKeywordIntent(keyword);
    
    // Set up variables for template
    const variables: QueryVariables = {
      brand: brandName,
      industry,
      keyword,
      competitors
    };
    
    // Generate the query using the template
    const query = getQueryTemplate(queryType, variables);
    
    return {
      keyword,
      query,
      queryType
    };
  });
};

// Scoring function to analyze visibility in AI responses
export const scoreVisibility = (response: string, brandName: string) => {
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
    lowerResponse.indexOf(lowerBrand) < 100 || 
    lowerResponse.includes(`${lowerBrand} is leading`) ||
    lowerResponse.includes(`${lowerBrand} is a top`);

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
  const lowerResponse = response.toLowerCase();
  const foundCompetitors = competitors?.filter(comp => 
    lowerResponse.includes(comp.toLowerCase())
  ) || [];

  const competitorOutranking = foundCompetitors.some(comp => 
    lowerResponse.indexOf(comp.toLowerCase()) < 
    lowerResponse.indexOf(brandName.toLowerCase())
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

// Alias for transformKeywordToQuery
export const transformKeywordToQuery = generateQueriesForKeywords;

// Re-export types
export type { QueryType, QueryVariables };
