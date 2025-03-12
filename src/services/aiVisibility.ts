
import { BrandData } from "@/components/BrandTracker";
import { generateQueriesForKeywords, QueryType } from "@/utils/queryTransformer";
import { generateMockData } from "@/lib/mockData";
import { fetchFromProviders, checkApiKeys } from "./ai/providerManager";
import { calculateVisibilityMetrics } from "./ai/metricsCalculator";
import { AIProvider, VisibilityResult, AIVisibilityAnalysisResult, AIVisibilityOptions } from "./ai/types";

// Re-export types
export type { AIProvider, VisibilityResult };

export async function analyzeAIVisibility(
  brandData: BrandData,
  provider: AIProvider = "all",
  queryType: QueryType = "best-in-class"
): Promise<AIVisibilityAnalysisResult> {
  let results: VisibilityResult[] = [];
  
  // Generate conversational queries for all keywords
  const queries = generateQueriesForKeywords(
    brandData.keywords,
    brandData.name,
    brandData.industry,
    brandData.competitors
  );
  
  try {
    // Check if we should use mock data
    const shouldUseMockData = !checkApiKeys(provider);
    
    if (shouldUseMockData) {
      // Use mock data
      return generateMockData(brandData);
    }
    
    // Fetch results from selected AI providers
    results = await fetchFromProviders(brandData, provider, queries);
    
    // Calculate metrics based on results
    const metrics = calculateVisibilityMetrics(results, brandData);
    
    return {
      results,
      queries,
      ...metrics
    };
  } catch (error) {
    console.error("Error analyzing AI visibility:", error);
    throw error;
  }
}
