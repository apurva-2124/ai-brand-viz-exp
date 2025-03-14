
// Anthropic API integration for querying brand visibility using proxy
import { BrandData } from "@/components/BrandTracker";

interface AnthropicResponse {
  content: string;
  error?: string;
}

export async function queryAnthropic(keyword: string, query: string, brand: string): Promise<string> {
  try {
    console.log('Querying Anthropic with:', { keyword, query, brand });
    
    // Set a timeout of 10 seconds for the fetch request
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    
    const response = await fetch('https://ai-search-proxy-apurva5.replit.app/anthropic', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt: query,
        model: 'claude-3-haiku-20240307'
      }),
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Proxy server not found. Please try again later.");
      }
      if (response.status === 429) {
        throw new Error("API rate limit exceeded. Please try again later.");
      }
      
      const errorData = await response.json().catch(() => ({ error: `HTTP error: ${response.status}` }));
      throw new Error(errorData.error || `HTTP error: ${response.status}`);
    }

    const data: AnthropicResponse = await response.json();
    
    if (data.error) {
      throw new Error(data.error);
    }
    
    return data.content || "No response content";
  } catch (error) {
    console.error('Anthropic API Error:', error);
    // Check for specific error types to provide better error messages
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error('Proxy server unreachable. Please check your internet connection or try again later.');
    }
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new Error('Request timed out. The proxy server is taking too long to respond.');
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
      // Add failed result with more informative error message
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
