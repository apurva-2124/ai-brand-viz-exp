
import * as openAI from "../openai";
import * as anthropic from "../anthropic";
import * as gemini from "../gemini";
import { BrandData } from "@/components/BrandTracker";
import { processAIResponse } from "./responseProcessor";
import { AIProvider, VisibilityResult } from "./types";

export async function fetchFromProviders(
  brandData: BrandData,
  provider: AIProvider,
  queries: Array<{ keyword: string; query: string; queryType: string }>,
): Promise<VisibilityResult[]> {
  let results: VisibilityResult[] = [];
  
  // Run OpenAI analysis if requested
  if (provider === "openai" || provider === "all") {
    const openAIResults = await openAI.analyzeBrandVisibility(brandData, queries);
    results = results.concat(
      openAIResults.map(result => 
        processAIResponse(result, brandData.name, brandData.competitors, "OpenAI")
      )
    );
  }
  
  // Run Anthropic analysis if requested
  if (provider === "anthropic" || provider === "all") {
    const anthropicResults = await anthropic.analyzeBrandVisibility(brandData, queries);
    results = results.concat(
      anthropicResults.map(result => 
        processAIResponse(result, brandData.name, brandData.competitors, "Anthropic")
      )
    );
  }
  
  // Run Gemini analysis if requested
  if (provider === "gemini" || provider === "all") {
    const geminiResults = await gemini.analyzeBrandVisibility(brandData, queries);
    results = results.concat(
      geminiResults.map(result => 
        processAIResponse(result, brandData.name, brandData.competitors, "Gemini")
      )
    );
  }
  
  return results;
}

// Update to always return true since we're using the proxy now
export function checkApiKeys(provider: AIProvider): boolean {
  return true; // Always return true since we're using the proxy
}
