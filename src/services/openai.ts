// OpenAI API integration for querying brand visibility using proxy
import { BrandData } from "@/components/BrandTracker";

interface OpenAIResponse {
  content: string;
  error?: string;
}

export async function queryOpenAI(keyword: string, query: string, brand: string): Promise<string> {
  try {
    console.log('Querying OpenAI with:', { keyword, query, brand });
    
    const response = await fetch('https://ai-search-proxy-apurva5.replit.app/openai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt: query,
        model: 'gpt-4'
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP error: ${response.status}`);
    }

    const data: OpenAIResponse = await response.json();
    
    if (data.error) {
      throw new Error(data.error);
    }
    
    return data.content || "No response content";
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw error;
  }
}

export async function analyzeBrandVisibility(
  brandData: BrandData, 
  queries: Array<{ keyword: string; query: string; queryType?: string }>
): Promise<{
  keyword: string;
  query: string;
  response: string;
  hasBrandMention: boolean;
  isProminent: boolean;
  queryType?: string;
}[]> {
  const results = [];
  
  for (const { keyword, query, queryType } of queries) {
    try {
      console.log(`Analyzing brand visibility for ${keyword} with query: ${query}`);
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
        isProminent,
        queryType
      });
    } catch (error) {
      console.error(`Failed to analyze visibility for keyword: ${keyword}`, error);
      // Add failed result
      results.push({
        keyword,
        query,
        response: 'Failed to analyze',
        hasBrandMention: false,
        isProminent: false,
        queryType
      });
    }
  }
  
  return results;
}
