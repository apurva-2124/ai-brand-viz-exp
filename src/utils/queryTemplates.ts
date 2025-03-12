
// Query type definitions
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

// Enhanced template patterns for each query type
export const queryTemplates: Record<QueryType, string[]> = {
  "best-in-class": [
    "What is the best {category}?",
    "What is the best site for {category}?",
    "Which company offers the best {category} service?",
    "Top-rated {category} provider",
    "Highest-rated {category} service currently available",
  ],
  "feature-specific": [
    "What are the best features of {brand_name} for {category}?",
    "Which features make {brand_name} stand out in {category}?",
    "What unique benefits does {brand_name} offer for {category}?",
    "How does {brand_name}'s {category} features compare to alternatives?",
    "What makes {brand_name}'s {category} offering special?",
  ],
  "comparison": [
    "{brand_name} vs {competitor_names} — which is better for {category}?",
    "How does {brand_name} compare to {competitor_names} for {category}?",
    "Is {brand_name} better than {competitor_names} for {category}?",
    "Comparing {brand_name} with {competitor_names} for {category}",
    "{brand_name} or {competitor_names}: which should I choose for {category}?",
  ],
  "review-based": [
    "Are {brand_name} reviews trustworthy for {category}?",
    "How do customers rate {brand_name} in {category}?",
    "What do reviews say about {brand_name}'s {category} service?",
    "Customer satisfaction with {brand_name} for {category}",
    "Is {brand_name} well-reviewed for {category}?",
  ],
  "transactional": [
    "Where can I book {category} using {brand_name}?",
    "What's the best way to purchase {category} from {brand_name}?",
    "How to buy {category} from {brand_name}",
    "Best website to book {category}",
    "Easiest way to get {category} online",
  ],
  "ai-summarized": [
    "Summarize what makes {brand_name} good for {category}",
    "Give me a quick overview of {brand_name} for {category}",
    "What is the consensus on {brand_name} for {category}?",
    "According to all available information, is {brand_name} good for {category}?",
    "Brief explanation of {brand_name}'s {category} offering",
  ],
  "localized": [
    "Best {category} in {location}?",
    "Where can I find {brand_name} {category} in {location}?",
    "Top-rated {category} near {location}?",
    "{brand_name} {category} services available in {location}",
    "Which {category} providers are recommended in {location}?",
  ],
  "ai-assistant": [
    "I'm looking for {category} — would you recommend {brand_name}?",
    "Can you help me decide if {brand_name} is good for {category}?",
    "I need advice on choosing {category} from {brand_name} or {competitor_names}",
    "What should I know before using {brand_name} for {category}?",
    "Give me your honest opinion about {brand_name} for {category}",
  ],
  "negative-sentiment": [
    "What are common customer complaints about {brand_name} in {category}?",
    "What issues do travelers face with {brand_name}?",
    "Problems with {brand_name}'s {category} service",
    "Why do people dislike {brand_name} for {category}?",
    "Common frustrations with {brand_name} {category} experience",
  ],
  "industry-trend": [
    "What's the future of {category}?",
    "How is the {category} industry evolving?",
    "Latest trends in {category}?",
    "What innovations are happening in {category}?",
    "How is technology changing {category} services?",
  ],
};

// Enhanced advanced templates for specific use cases - voice search, AI chat, and traditional search
export const advancedTemplates = {
  voiceSearch: [
    "Hey, I'm looking for {category}, is {brand_name} any good?",
    "Can you tell me about {brand_name} for {category}?",
    "I need to find the best {category} service near {location}",
    "What's the difference between {brand_name} and {competitor_names} for {category}?"
  ],
  aiChat: [
    "I'm planning to use {brand_name} for {category}. Based on recent reviews, is that a good choice?",
    "Could you analyze {brand_name}'s strengths and weaknesses for {category} compared to {competitor_names}?",
    "What's your assessment of {brand_name} for {category} based on current market trends?",
    "I've heard mixed things about {brand_name} for {category}. What's your take?"
  ],
  traditionalSearch: [
    "{brand_name} {category} reviews 2023",
    "best {category} providers comparison",
    "{brand_name} vs {competitor_names} {category}",
    "{category} booking {location} reliable sites"
  ]
};

export interface QueryVariables {
  brand_name?: string;
  category?: string;
  competitor_names?: string;
  location?: string;
  year?: string;
  searchType?: "voice" | "ai" | "traditional";
}

/**
 * Helper function to substitute variables in a template
 */
export function substituteVariables(
  template: string,
  keyword: string,
  variables: QueryVariables
): string {
  // First replace the category placeholder with the keyword
  let query = template.replace(/{category}/g, keyword);
  
  // Replace {brand_name} with the brand name if provided
  if (variables.brand_name) {
    query = query.replace(/{brand_name}/g, variables.brand_name);
  }
  
  // Replace {competitor_names} with competitor names if provided
  if (variables.competitor_names) {
    query = query.replace(/{competitor_names}/g, variables.competitor_names);
  }
  
  // Replace {location} with location if provided, or use a default
  if (variables.location) {
    query = query.replace(/{location}/g, variables.location);
  } else {
    query = query.replace(/ in {location}/g, "");
    query = query.replace(/ near {location}/g, " nearby");
    query = query.replace(/{location}/g, "popular locations");
  }
  
  // Replace {year} with current year if not provided
  if (variables.year) {
    query = query.replace(/{year}/g, variables.year);
  } else {
    query = query.replace(/{year}/g, new Date().getFullYear().toString());
  }
  
  return query;
}

/**
 * Helper function to get a random subset of competitors
 * @param competitors Array of competitor names
 * @param count Number of competitors to include (default: 2)
 * @returns Comma-separated string of competitor names
 */
export function getRandomCompetitors(competitors: string[], count: number = 2): string {
  if (!competitors || competitors.length === 0) return "competitors";
  
  if (competitors.length <= count) {
    return competitors.join(" and ");
  }
  
  const randomCompetitors = [...competitors]
    .sort(() => 0.5 - Math.random())
    .slice(0, count);
  
  return randomCompetitors.join(" and ");
}

/**
 * Transforms a keyword into a conversational query with variable substitution
 * Enhanced to account for different search behaviors
 * @param keyword The keyword to transform
 * @param queryType The type of query to generate
 * @param variables Object containing values for variable substitution
 * @returns Transformed conversational query
 */
export function transformKeywordToQuery(
  keyword: string,
  queryType: QueryType = "best-in-class",
  variables: QueryVariables = {}
): string {
  // Get templates for the selected query type
  const templates = queryTemplates[queryType];
  
  // Account for different search behaviors if specified
  if (variables.searchType) {
    let behaviorTemplates;
    switch (variables.searchType) {
      case "voice":
        behaviorTemplates = advancedTemplates.voiceSearch;
        break;
      case "ai":
        behaviorTemplates = advancedTemplates.aiChat;
        break;
      case "traditional":
        behaviorTemplates = advancedTemplates.traditionalSearch;
        break;
      default:
        behaviorTemplates = templates;
    }
    
    // Use the behavior-specific templates if available
    if (behaviorTemplates && behaviorTemplates.length > 0) {
      return substituteVariables(
        behaviorTemplates[Math.floor(Math.random() * behaviorTemplates.length)],
        keyword,
        variables
      );
    }
  }
  
  // Select a random template from the available ones
  const template = templates[Math.floor(Math.random() * templates.length)];
  
  return substituteVariables(template, keyword, variables);
}

/**
 * Identifies intent behind keywords using categories and patterns
 * @param keyword The keyword to analyze
 * @returns The most likely query type for the keyword
 */
export function identifyKeywordIntent(keyword: string): QueryType {
  keyword = keyword.toLowerCase();
  
  // Check for direct intent indicators in the keyword
  if (keyword.includes("vs") || keyword.includes("versus") || keyword.includes("compare")) {
    return "comparison";
  }
  
  if (keyword.includes("review") || keyword.includes("rating") || keyword.includes("testimonial")) {
    return "review-based";
  }
  
  if (keyword.includes("buy") || keyword.includes("book") || keyword.includes("purchase") || 
      keyword.includes("price") || keyword.includes("cost")) {
    return "transactional";
  }
  
  if (keyword.includes("feature") || keyword.includes("benefit") || 
      keyword.includes("what makes") || keyword.includes("why choose")) {
    return "feature-specific";
  }
  
  if (keyword.includes("problem") || keyword.includes("issue") || 
      keyword.includes("complaint") || keyword.includes("bad")) {
    return "negative-sentiment";
  }
  
  if (keyword.includes("near me") || keyword.includes("in ") || 
      keyword.includes("local") || keyword.includes("nearby")) {
    return "localized";
  }
  
  if (keyword.includes("trend") || keyword.includes("future") || 
      keyword.includes("upcoming") || keyword.includes("innovation")) {
    return "industry-trend";
  }
  
  // Default to "best-in-class" for generic keywords
  return "best-in-class";
}
