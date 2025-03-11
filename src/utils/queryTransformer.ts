
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
    "What is the best {keyword}?",
    "What is the best site for {keyword}?",
    "Which company offers the best {keyword}?",
  ],
  "feature-specific": [
    "Which {keyword} has the best features?",
    "What makes {keyword} stand out from competitors?", 
    "What unique features does {keyword} offer?",
  ],
  "comparison": [
    "{brand} vs competitors — which is better for {keyword}?",
    "How does {brand} compare to other options for {keyword}?",
    "Is {brand} better than its competitors for {keyword}?",
  ],
  "review-based": [
    "What do reviews say about {keyword}?",
    "Are {brand} reviews for {keyword} reliable?",
    "What's the reputation of {brand} regarding {keyword}?",
  ],
  "transactional": [
    "Best website to get {keyword}",
    "Where can I purchase {keyword}?",
    "How to buy {keyword} online?",
  ],
  "ai-summarized": [
    "What is the best {keyword} according to AI?",
    "How would AI summarize {brand}'s {keyword} offerings?",
    "According to AI, is {brand} good for {keyword}?",
  ],
  "localized": [
    "Best {keyword} in my area?",
    "Where can I find {keyword} locally?",
    "Top-rated {keyword} near me?",
  ],
  "ai-assistant": [
    "I'm looking for {keyword} — what do you recommend?",
    "Can you help me find the right {keyword}?",
    "I need advice on choosing {keyword}",
  ],
  "negative-sentiment": [
    "Why do people complain about {keyword}?",
    "What are common issues with {brand}'s {keyword}?",
    "Problems with {keyword} from {brand}?",
  ],
  "industry-trend": [
    "What's the future of {keyword}?",
    "How is the {keyword} industry evolving?",
    "Latest trends in {keyword}?",
  ],
};

/**
 * Transforms a keyword into a conversational query
 * @param keyword The keyword to transform
 * @param queryType The type of query to generate
 * @param brandName Optional brand name to include in the query
 * @returns Transformed conversational query
 */
export function transformKeywordToQuery(
  keyword: string,
  queryType: QueryType = "best-in-class",
  brandName?: string
): string {
  // Get templates for the selected query type
  const templates = queryTemplates[queryType];
  
  // Select a random template from the available ones
  const template = templates[Math.floor(Math.random() * templates.length)];
  
  // Replace placeholders with actual values
  let query = template.replace(/{keyword}/g, keyword);
  
  // Replace {brand} with the actual brand name if provided
  if (brandName) {
    query = query.replace(/{brand}/g, brandName);
  } else {
    // If no brand name is provided, try to make the query generic
    query = query.replace(/{brand}'s /g, "");
    query = query.replace(/{brand}/g, "it");
  }
  
  return query;
}

/**
 * Generates conversational queries for a set of keywords
 * @param brandData The brand data containing keywords
 * @param queryType The type of query to generate
 * @returns An array of objects with original keywords and transformed queries
 */
export function generateQueriesForKeywords(
  brandData: BrandData,
  queryType: QueryType = "best-in-class"
): Array<{ keyword: string; query: string }> {
  return brandData.keywords.map(keyword => ({
    keyword,
    query: transformKeywordToQuery(keyword, queryType, brandData.name)
  }));
}
