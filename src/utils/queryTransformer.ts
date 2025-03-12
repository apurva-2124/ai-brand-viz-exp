
import type { QueryType, QueryVariables } from "./queryTemplates";
import { getQueryTemplate, identifyKeywordIntent } from "./queryTemplates";

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

// Re-export the types from queryTemplates
export type { QueryType, QueryVariables };
