
import * as openAI from "../openai";
import { BrandData } from "@/components/BrandTracker";
import { processAIResponse } from "./responseProcessor";
import { AIProvider, VisibilityResult } from "./types";
import { generateMockData } from "@/lib/mockData";
import { toast } from "sonner";

export async function fetchFromProviders(
  brandData: BrandData,
  provider: AIProvider,
  queries: Array<{ keyword: string; query: string; queryType: string }>,
): Promise<VisibilityResult[]> {
  let results: VisibilityResult[] = [];
  
  try {
    // Always use OpenAI regardless of the selected provider
    const openAIResults = await openAI.analyzeBrandVisibility(brandData, queries);
    
    // Check if all results are proxy errors
    const allProxyErrors = openAIResults.every(result => 
      result.response.includes("Proxy server") || 
      result.response.includes("timed out") ||
      result.response.includes("Failed to fetch")
    );
    
    if (allProxyErrors) {
      // If all requests failed, add a toast notification
      toast.error("Proxy server unavailable. Using mock data for display purposes.");
      
      // Get mock data as fallback
      const mockData = generateMockData(brandData);
      
      // Return the mock results but mark them as from a fallback
      return mockData.results.map(result => ({
        ...result,
        response: `[USING MOCK DATA] ${result.response}`,
        provider: "Mock (OpenAI Unavailable)"
      }));
    }
    
    results = results.concat(
      openAIResults.map(result => 
        processAIResponse(result, brandData.name, brandData.competitors, "OpenAI")
      )
    );
    
    return results;
  } catch (error) {
    console.error("Error fetching from providers:", error);
    toast.error("Error connecting to AI services. Using mock data.");
    
    // Fallback to mock data in case of complete failure
    const mockData = generateMockData(brandData);
    return mockData.results.map(result => ({
      ...result,
      provider: "Mock (Error Recovery)"
    }));
  }
}

// Update to always return true since we're using the proxy now
export function checkApiKeys(provider: AIProvider): boolean {
  return true; // Always return true since we're using the proxy
}
