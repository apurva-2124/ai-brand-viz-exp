
// Anthropic API integration for querying brand visibility
import { BrandData } from "@/components/BrandTracker";

interface AnthropicResponse {
  content: {
    text: string;
  }[];
  type: string;
}

export async function queryAnthropic(keyword: string, brand: string): Promise<string> {
  try {
    const apiKey = localStorage.getItem('anthropic_api_key');
    
    if (!apiKey) {
      throw new Error("Anthropic API key not found. Please add it in the settings.");
    }
    
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
            content: `Tell me about ${keyword}`
          }
        ]
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Failed to query Anthropic');
    }

    const data: AnthropicResponse = await response.json();
    return data.content[0].text;
  } catch (error) {
    console.error('Anthropic API Error:', error);
    throw error;
  }
}

export async function analyzeBrandVisibility(brandData: BrandData): Promise<{
  keyword: string;
  response: string;
  hasBrandMention: boolean;
  isProminent: boolean;
}[]> {
  const results = [];
  
  for (const keyword of brandData.keywords) {
    try {
      const response = await queryAnthropic(keyword, brandData.name);
      const hasBrandMention = response.toLowerCase().includes(brandData.name.toLowerCase());
      
      // Check if brand appears in the first third of the response for prominence
      const isProminent = hasBrandMention && 
        response.toLowerCase().indexOf(brandData.name.toLowerCase()) < response.length / 3;
      
      results.push({
        keyword,
        response,
        hasBrandMention,
        isProminent
      });
    } catch (error) {
      console.error(`Failed to analyze visibility for keyword: ${keyword}`, error);
      // Add failed result
      results.push({
        keyword,
        response: 'Failed to analyze',
        hasBrandMention: false,
        isProminent: false
      });
    }
  }
  
  return results;
}
