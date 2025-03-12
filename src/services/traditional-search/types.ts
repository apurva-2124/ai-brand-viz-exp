
/**
 * Search result interface for traditional search data
 */
export interface SearchResult {
  rank: number;
  url: string;
  title: string;
  description: string;
  hasBrandMention: boolean;
  date?: string;
}

/**
 * Traditional search results response interface
 */
export interface TraditionalSearchResults {
  searchEngine: string;
  query: string;
  source: "serpapi" | "mock";
  brandMentions: number;
  retrievalDate?: string;
  topResults: SearchResult[];
  error?: string;
}
