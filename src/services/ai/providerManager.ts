
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

export function checkApiKeys(provider: AIProvider): boolean {
  const openAIKey = localStorage.getItem("openai_api_key");
  const anthropicKey = localStorage.getItem("anthropic_api_key");
  const geminiKey = localStorage.getItem("gemini_api_key");
  
  if (provider === "openai") return !!openAIKey;
  if (provider === "anthropic") return !!anthropicKey;
  if (provider === "gemini") return !!geminiKey;
  if (provider === "all") return !!(openAIKey || anthropicKey || geminiKey);
  
  return false;
}
