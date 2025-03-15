
import * as openAI from "../openai";
import { BrandData } from "@/components/BrandTracker";
import { processAIResponse } from "./responseProcessor";
import { AIProvider, VisibilityResult } from "./types";
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
      toast.error("Proxy server unavailable. Please try again later.");
      
      // Return the error results without using mock fallbacks
      return openAIResults.map(result => ({
        ...result,
        provider: "OpenAI (Unavailable)",
        visibilityScore: {
          level: "not_found",
          label: "Not Found",
          score: 0,
          context: null
        },
        competitorAnalysis: {
          competitorsFound: [],
          competitorOutranking: false,
          riskLevel: "low"
        }
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
    toast.error("Error connecting to AI services. Please try again later.");
    
    // Return error information instead of mock data
    return [{
      keyword: queries[0]?.keyword || "Unknown",
      query: queries[0]?.query || "Unknown",
      response: "Error connecting to AI services. Please try again later.",
      provider: "Error",
      hasBrandMention: false,
      isProminent: false,
      visibilityScore: {
        score: 0,
        level: "not_found",
        label: "Not Found",
        context: null
      },
      competitorAnalysis: {
        competitorsFound: [],
        competitorOutranking: false,
        riskLevel: "low"
      }
    }];
  }
}

// Update to always return true since we're using the proxy now
export function checkApiKeys(provider: AIProvider): boolean {
  return true; // Always return true since we're using the proxy
}
