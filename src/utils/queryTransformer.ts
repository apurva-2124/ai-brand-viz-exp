
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

// Template patterns for each query type
const queryTemplates: Record<QueryType, string[]> = {
  "best-in-class": [
    "What is the best {category}?",
    "What is the best site for {category}?",
    "Which company offers the best {category}?",
  ],
  "feature-specific": [
    "Which {category} has the best features?",
    "What makes {category} stand out from competitors?", 
    "What unique features does {brand_name} offer for {category}?",
  ],
  "comparison": [
    "{brand_name} vs {competitor_names} — which is better for {category}?",
    "How does {brand_name} compare to other options for {category}?",
    "Is {brand_name} better than {competitor_names} for {category}?",
  ],
  "review-based": [
    "What do reviews say about {category}?",
    "Are {brand_name} reviews for {category} reliable?",
    "What's the reputation of {brand_name} regarding {category}?",
  ],
  "transactional": [
    "Best website to get {category}",
    "Where can I purchase {category}?",
    "How to buy {category} online?",
  ],
  "ai-summarized": [
    "What is the best {category} according to AI?",
    "How would AI summarize {brand_name}'s {category} offerings?",
    "According to AI, is {brand_name} good for {category}?",
  ],
  "localized": [
    "Best {category} in {location}?",
    "Where can I find {category} in {location}?",
    "Top-rated {category} near {location}?",
  ],
  "ai-assistant": [
    "I'm looking for {category} — what do you recommend?",
    "Can you help me find the right {category}?",
    "I need advice on choosing {category} from {brand_name} or {competitor_names}",
  ],
  "negative-sentiment": [
    "Why do people complain about {category}?",
    "What are common issues with {brand_name}'s {category}?",
    "Problems with {category} from {brand_name}?",
  ],
  "industry-trend": [
    "What's the future of {category}?",
    "How is the {category} industry evolving?",
    "Latest trends in {category}?",
  ],
};

// Additional templates for specific use cases
export const advancedTemplates = [
  "What are the highest-rated {category} in {location} based on customer reviews?",
  "How does {brand_name} compare to {competitor_names} for {category} in {location}?",
  "Which platforms offer the best {category} deals, and how does {brand_name} rank?",
  "What are the most common customer complaints about {brand_name} for {category}?",
  "Do travelers recommend using {brand_name} for booking {category}?",
  "What's the best way to book {category} online, and which platforms are recommended?"
];

export interface QueryVariables {
  brand_name?: string;
  category?: string;
  competitor_names?: string;
  location?: string;
}

/**
 * Transforms a keyword into a conversational query with variable substitution
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
  
  // Select a random template from the available ones
  const template = templates[Math.floor(Math.random() * templates.length)];
  
  // Replace placeholders with actual values
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
 * @returns An array of objects with original keywords and transformed queries
 */
export function generateQueriesForKeywords(
  brandData: BrandData,
  queryType: QueryType = "best-in-class"
): Array<{ keyword: string; query: string }> {
  // Prepare variables for substitution
  const variables: QueryVariables = {
    brand_name: brandData.name,
    category: brandData.industry,
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
