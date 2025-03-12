
export interface SearchResult {
  title: string;
  url: string;
  description: string;
  position?: number;
  date?: string;
  resultType?: "organic" | "local" | "knowledge_graph" | "news" | "other";
}

export interface SearchResults {
  query: string;
  searchResults: SearchResult[];
  error?: string;
}

export interface AISearchQuery {
  keyword: string;
  query: string;
  queryType?: string;
}
