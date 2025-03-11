
// Gemini API integration for querying brand visibility
import { BrandData } from "@/components/BrandTracker";

interface GeminiResponse {
  candidates: {
    content: {
      parts: {
        text: string;
      }[];
    };
  }[];
}

export async function queryGemini(keyword: string, query: string, brand: string): Promise<string> {
  try {
    const apiKey = localStorage.getItem('gemini_api_key');
    
    if (!apiKey) {
      throw new Error("Gemini API key not found. Please add it in the settings.");
    }
    
    const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: query
          }]
        }]
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Failed to query Gemini');
    }

    const data: GeminiResponse = await response.json();
    return data.candidates[0]?.content?.parts[0]?.text || "No response content";
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw error;
  }
}

export async function analyzeBrandVisibility(
  brandData: BrandData,
  queries: Array<{ keyword: string; query: string }>
): Promise<{
  keyword: string;
  query: string;
  response: string;
  hasBrandMention: boolean;
  isProminent: boolean;
}[]> {
  const results = [];
  
  for (const { keyword, query } of queries) {
    try {
      const response = await queryGemini(keyword, query, brandData.name);
      const hasBrandMention = response.toLowerCase().includes(brandData.name.toLowerCase());
      
      const isProminent = hasBrandMention && 
        response.toLowerCase().indexOf(brandData.name.toLowerCase()) < response.length / 3;
      
      results.push({
        keyword,
        query,
        response,
        hasBrandMention,
        isProminent
      });
    } catch (error) {
      console.error(`Failed to analyze visibility for keyword: ${keyword}`, error);
      results.push({
        keyword,
        query,
        response: error instanceof Error ? error.message : 'Failed to analyze',
        hasBrandMention: false,
        isProminent: false
      });
    }
  }
  
  return results;
}
