
// Define the types of queries available for AI visibility analysis
export type QueryType = 
  | "best-in-class" 
  | "feature-specific" 
  | "comparison" 
  | "review-based" 
  | "transactional"
  | "ai-summarized"
  | "localized"
  | "ai-assistant"
  | "negative-sentiment"
  | "industry-trend";

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
  
  if (lowerKeyword.includes('best') || lowerKeyword.includes('top') || lowerKeyword.includes('leading')) {
    return "best-in-class";
  }
  
  if (lowerKeyword.includes('review') || lowerKeyword.includes('rating')) {
    return "review-based";
  }
  
  if (lowerKeyword.includes('buy') || lowerKeyword.includes('price') || lowerKeyword.includes('cost')) {
    return "transactional";
  }
  
  if (lowerKeyword.includes('how') || lowerKeyword.includes('what')) {
    return "ai-summarized";
  }
  
  if (lowerKeyword.includes('near') || lowerKeyword.includes('in ')) {
    return "localized";
  }
  
  // Default to feature-specific if no other patterns match
  return "feature-specific";
};

// Object containing templates for different query types
export const queryTemplates = {
  "best-in-class": (variables: QueryVariables) => 
    `What are the best ${variables.keyword} in the ${variables.industry} industry?`,
  
  "feature-specific": (variables: QueryVariables) => 
    `Tell me about important ${variables.keyword} features in the ${variables.industry} sector.`,
  
  "comparison": (variables: QueryVariables) => {
    const competitorsList = variables.competitors?.length 
      ? variables.competitors.join(', ') 
      : 'other providers';
    return `Compare ${variables.brand} with ${competitorsList} on ${variables.keyword}.`;
  },
  
  "review-based": (variables: QueryVariables) => 
    `What do reviews say about ${variables.keyword} from ${variables.brand}?`,
  
  "transactional": (variables: QueryVariables) => 
    `I'm looking to buy ${variables.keyword} from a ${variables.industry} company. What options should I consider?`,
  
  "ai-summarized": (variables: QueryVariables) => 
    `Explain how ${variables.keyword} works in the ${variables.industry} industry.`,
  
  "localized": (variables: QueryVariables) => 
    `Where can I find ${variables.keyword} services near me?`,
  
  "ai-assistant": (variables: QueryVariables) => 
    `I need help with ${variables.keyword}. Can you suggest some options?`,
  
  "negative-sentiment": (variables: QueryVariables) => 
    `What are common problems with ${variables.keyword} in ${variables.industry}?`,
  
  "industry-trend": (variables: QueryVariables) => 
    `What are the latest trends for ${variables.keyword} in the ${variables.industry} industry?`
};

// Template selection function
export const getQueryTemplate = (type: QueryType, variables: QueryVariables): string => {
  const template = queryTemplates[type];
  return template(variables);
};
