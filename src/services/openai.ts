
// OpenAI API integration for querying brand visibility
import { BrandData } from "@/components/BrandTracker";

interface OpenAIResponse {
  choices: {
    message: {
      content: string;
    };
    finish_reason: string;
  }[];
}

export async function queryOpenAI(keyword: string, query: string, brand: string): Promise<string> {
  try {
    const apiKey = localStorage.getItem('openai_api_key');
    
    if (!apiKey) {
      throw new Error("OpenAI API key not found. Please add it in the settings.");
    }
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant answering questions about products and services.'
          },
          {
            role: 'user',
            content: query
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Failed to query OpenAI');
    }

    const data: OpenAIResponse = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API Error:', error);
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
      const response = await queryOpenAI(keyword, query, brandData.name);
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
        response: 'Failed to analyze',
        hasBrandMention: false,
        isProminent: false
      });
    }
  }
  
  return results;
}
