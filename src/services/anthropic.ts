
// Anthropic API integration for querying brand visibility
import { BrandData } from "@/components/BrandTracker";

interface AnthropicResponse {
  content: {
    text: string;
  }[];
  type: string;
}

export async function queryAnthropic(keyword: string, query: string, brand: string): Promise<string> {
  try {
    const apiKey = localStorage.getItem('anthropic_api_key');
    
    if (!apiKey) {
      throw new Error("Anthropic API key not found. Please add it in the settings.");
    }
    
    // Check if API key format is valid (basic check)
    if (!apiKey.startsWith('sk-ant-')) {
      throw new Error("Invalid Anthropic API key format. Should start with 'sk-ant-'");
    }
    
    // Updated to use the latest Anthropic API format
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307',
        max_tokens: 500,
        messages: [
          {
            role: 'user',
            content: query
          }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.error?.message || `HTTP error ${response.status}`;
      console.error('Anthropic API Error:', { status: response.status, message: errorMessage });
      throw new Error(errorMessage);
    }

    const data: AnthropicResponse = await response.json();
    return data.content?.[0]?.text || "No response content";
  } catch (error) {
    console.error('Anthropic API Error:', error);
    if (error instanceof Error) {
      throw new Error(`Anthropic API Error: ${error.message}`);
    }
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
      const response = await queryAnthropic(keyword, query, brandData.name);
      const hasBrandMention = response.toLowerCase().includes(brandData.name.toLowerCase());
      
      // Check if brand appears in the first third of the response for prominence
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
      // Add failed result
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
