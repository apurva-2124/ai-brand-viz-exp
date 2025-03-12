
// Define the types of queries available for AI visibility analysis
export type QueryType = 
  | "general" 
  | "comparison" 
  | "negative-sentiment" 
  | "review-based" 
  | "ai-assistant";

export interface QueryVariables {
  brand: string;
  industry: string;
  keyword: string;
  competitors?: string[];
}

// Identify the intent of a keyword
export const identifyKeywordIntent = (keyword: string): QueryType => {
  const lowerKeyword = keyword.toLowerCase();
  
  // Check for specific patterns
  if (lowerKeyword.includes('vs') || lowerKeyword.includes('versus') || lowerKeyword.includes('compare')) {
    return "comparison";
  }
  
  if (lowerKeyword.includes('review') || lowerKeyword.includes('rating') || lowerKeyword.includes('what people say')) {
    return "review-based";
  }
  
  if (lowerKeyword.includes('problem') || lowerKeyword.includes('issue') || lowerKeyword.includes('complain')) {
    return "negative-sentiment";
  }
  
  if (lowerKeyword.includes('help') || lowerKeyword.includes('assist') || lowerKeyword.includes('how to')) {
    return "ai-assistant";
  }
  
  // Default to general query if no other patterns match
  return "general";
};

// Object containing templates for different query types
export const queryTemplates = {
  "general": (variables: QueryVariables) => 
    `Tell me about ${variables.keyword} in the ${variables.industry} sector.`,
  
  "comparison": (variables: QueryVariables) => 
    `How does ${variables.brand} compare to its competitors in the ${variables.industry} sector?`,
  
  "negative-sentiment": (variables: QueryVariables) => 
    `What are common problems with ${variables.keyword} from ${variables.brand} in the ${variables.industry} sector?`,
  
  "review-based": (variables: QueryVariables) => 
    `What do customers say about ${variables.brand} and its ${variables.keyword} in the ${variables.industry} sector?`,
  
  "ai-assistant": (variables: QueryVariables) => 
    `If I were looking for ${variables.keyword} from ${variables.brand}, how would you assist me?`
};

// Template selection function
export const getQueryTemplate = (type: QueryType, variables: QueryVariables): string => {
  const template = queryTemplates[type];
  return template(variables);
};
