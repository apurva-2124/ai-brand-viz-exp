
import * as openAI from "../openai";
import { BrandData } from "@/components/BrandTracker";
import { processAIResponse } from "./responseProcessor";
import { AIProvider, VisibilityResult } from "./types";

export async function fetchFromProviders(
  brandData: BrandData,
  provider: AIProvider,
  queries: Array<{ keyword: string; query: string; queryType: string }>,
): Promise<VisibilityResult[]> {
  let results: VisibilityResult[] = [];
  
  // Always use OpenAI regardless of the selected provider
  const openAIResults = await openAI.analyzeBrandVisibility(brandData, queries);
  results = results.concat(
    openAIResults.map(result => 
      processAIResponse(result, brandData.name, brandData.competitors, "OpenAI")
    )
  );
  
  return results;
}

// Update to always return true since we're using the proxy now
export function checkApiKeys(provider: AIProvider): boolean {
  return true; // Always return true since we're using the proxy
}
