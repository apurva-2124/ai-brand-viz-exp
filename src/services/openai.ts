
// OpenAI API integration for querying brand visibility using proxy
import { BrandData } from "@/components/BrandTracker";
import { toast } from "sonner";
import { generateMockData } from "@/lib/mockData";

interface OpenAIResponse {
  content?: string;
  choices?: Array<{
    message?: {
      content?: string;
    }
  }>;
  error?: string;
}

export async function queryOpenAI(keyword: string, query: string, brand: string): Promise<string> {
  try {
    console.log('Querying OpenAI with:', { keyword, query, brand });
    
    // Set a timeout of 15 seconds for the fetch request
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);
    
    // Updated proxy endpoint
    const response = await fetch('https://ai-search-proxy-apurva5.replit.app/openai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt: query,
        model: 'gpt-4' // Ensure we're using the specified model
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

    const data: OpenAIResponse = await response.json();
    
    if (data.error) {
      throw new Error(data.error);
    }
    
    // Extract content from the response - handle different response formats
    let content = "";
    
    // Try to extract content directly (our proxy format)
    if (data.content && typeof data.content === 'string') {
      content = data.content;
    } 
    // Try to extract from standard OpenAI format
    else if (data.choices && data.choices.length > 0) {
      const messageContent = data.choices[0].message?.content;
      if (messageContent) {
        content = messageContent;
      }
    }
    
    // Log the extracted content
    console.log('Extracted content:', content ? content.substring(0, 100) + "..." : "No content found");
    
    // If we still don't have content, use a more descriptive error
    if (!content) {
      throw new Error("Could not extract content from API response");
    }
    
    return content;
  } catch (error) {
    console.error('OpenAI API Error:', error);
    // Check for specific error types to provide better error messages
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      toast.error("Proxy server connection failed. Using fallback data.");
      return "Proxy server unreachable. Please check your internet connection or try again later.";
    }
    if (error instanceof DOMException && error.name === 'AbortError') {
      toast.error("Request timed out. Using fallback data.");
      return "Request timed out. The proxy server is taking too long to respond.";
    }
    
    // Pass the error message through so it can be displayed in the UI
    return error instanceof Error 
      ? error.message 
      : "Unknown error occurred when connecting to AI service.";
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
      
      // Check if the response is an error message
      const isErrorResponse = 
        response.includes("Proxy server") || 
        response.includes("timed out") || 
        response.includes("Failed to fetch");
      
      // If it's an error response, we won't have brand mentions
      const hasBrandMention = !isErrorResponse && 
        response.toLowerCase().includes(brandData.name.toLowerCase());
      
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
      // Add failed result with more informative error message
      results.push({
        keyword,
        query,
        response: error instanceof Error ? error.message : 'Failed to analyze',
        hasBrandMention: false,
        isProminent: false,
        queryType
      });
    }
  }
  
  return results;
}
