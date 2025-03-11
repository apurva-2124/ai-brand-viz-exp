
import { BrandData } from "@/components/BrandTracker";

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
const queryTemplates: Record<QueryType, string[]> = {
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
 * Helper function to substitute variables in a template
 */
function substituteVariables(
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
function getRandomCompetitors(competitors: string[], count: number = 2): string {
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
 * Generates conversational queries for a set of keywords with variable substitution
 * @param brandData The brand data containing keywords and other information
 * @param queryType The type of query to generate
 * @param searchType Optional search behavior type
 * @returns An array of objects with original keywords and transformed queries
 */
export function generateQueriesForKeywords(
  brandData: BrandData,
  queryType: QueryType = "best-in-class",
  searchType?: "voice" | "ai" | "traditional"
): Array<{ keyword: string; query: string }> {
  // Prepare variables for substitution
  const variables: QueryVariables = {
    brand_name: brandData.name,
    category: brandData.industry,
    searchType: searchType
  };
  
  if (brandData.competitors && brandData.competitors.length > 0) {
    variables.competitor_names = getRandomCompetitors(brandData.competitors);
  }
  
  return brandData.keywords.map(keyword => ({
    keyword,
    query: transformKeywordToQuery(keyword, queryType, variables)
  }));
}

/**
 * Scoring system for brand visibility in AI responses
 * @param response The AI response text
 * @param brandName The brand name to check for
 * @returns Visibility scoring object
 */
export function scoreVisibility(response: string, brandName: string) {
  if (!response || !brandName) {
    return {
      level: "not_found",
      label: "❌ Missing from AI Results",
      score: 0,
      context: null
    };
  }
  
  const lowerResponse = response.toLowerCase();
  const lowerBrandName = brandName.toLowerCase();
  
  // Check if brand is mentioned
  if (!lowerResponse.includes(lowerBrandName)) {
    return {
      level: "not_found",
      label: "❌ Missing from AI Results",
      score: 0,
      context: null
    };
  }
  
  // Check if prominently mentioned (near beginning or multiple times)
  const firstMentionIndex = lowerResponse.indexOf(lowerBrandName);
  const mentionCount = (lowerResponse.match(new RegExp(lowerBrandName, 'gi')) || []).length;
  const isEarlyMention = firstMentionIndex < lowerResponse.length / 3;
  
  if (isEarlyMention || mentionCount >= 2) {
    // Extract context of the mention
    const contextStart = Math.max(0, firstMentionIndex - 50);
    const contextEnd = Math.min(lowerResponse.length, firstMentionIndex + brandName.length + 100);
    const mentionContext = response.substring(contextStart, contextEnd);
    
    return {
      level: "high",
      label: "✅ High Visibility",
      score: 10,
      context: mentionContext
    };
  }
  
  // Vague mention
  return {
    level: "low",
    label: "⚠️ Needs Optimization",
    score: 5,
    context: null
  };
}

/**
 * Generates recommendations based on visibility level
 * @param visibilityLevel The level of visibility (high, low, not_found)
 * @returns Recommendation string
 */
export function generateRecommendation(visibilityLevel: string): string {
  switch (visibilityLevel) {
    case "high":
      return "Maintain current AI presence but test new keywords for ranking stability.";
    case "low":
      return "Optimize AI discovery signals via structured content and AI-recommended metadata.";
    case "not_found":
      return "Prioritize AI search optimization via content partnerships, FAQ embedding, and AI-driven PPC adjustments.";
    default:
      return "Perform analysis to determine visibility enhancement strategies.";
  }
}

/**
 * Analyzes competitor mentions in AI responses
 * @param response The AI response text
 * @param brandName The brand name
 * @param competitors Array of competitor names
 * @returns Competitor analysis results
 */
export function analyzeCompetitors(response: string, brandName: string, competitors: string[] = []) {
  if (!response || competitors.length === 0) {
    return {
      competitorsFound: [],
      competitorOutranking: false,
      riskLevel: "low"
    };
  }
  
  const lowerResponse = response.toLowerCase();
  const foundCompetitors = competitors.filter(comp => 
    lowerResponse.includes(comp.toLowerCase())
  );
  
  // Check if brand is mentioned
  const isBrandMentioned = lowerResponse.includes(brandName.toLowerCase());
  
  // Check if competitors are mentioned more prominently
  const competitorOutranking = foundCompetitors.some(comp => {
    const compIndex = lowerResponse.indexOf(comp.toLowerCase());
    const brandIndex = lowerResponse.indexOf(brandName.toLowerCase());
    
    // If brand not mentioned or competitor appears earlier
    return !isBrandMentioned || (brandIndex > compIndex && compIndex !== -1);
  });
  
  let riskLevel = "low";
  if (competitorOutranking) {
    riskLevel = "high";
  } else if (foundCompetitors.length > 0 && !isBrandMentioned) {
    riskLevel = "medium";
  }
  
  return {
    competitorsFound: foundCompetitors,
    competitorOutranking,
    riskLevel
  };
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

