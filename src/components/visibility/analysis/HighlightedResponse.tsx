
import { Wifi } from "lucide-react";

interface HighlightedResponseProps {
  response: string;
  brandName: string;
}

export const HighlightedResponse = ({ response, brandName }: HighlightedResponseProps) => {
  return (
    <div className="bg-secondary/50 p-3 rounded text-sm max-h-40 overflow-y-auto">
      <div dangerouslySetInnerHTML={{ 
        __html: highlightBrandMentions(response, brandName || '') 
      }} />
    </div>
  );
};

// Function to highlight brand mentions in the response
const highlightBrandMentions = (text: string, brandName: string) => {
  if (!text || !brandName || brandName.trim() === '') return text;
  
  // Check if the text is an error message related to the proxy
  if (
    text.includes("Proxy server") || 
    text.includes("Failed to fetch") ||
    text.includes("timeout") ||
    text.includes("unreachable") ||
    text.includes("USING MOCK DATA") ||
    text === "No response content" ||
    text.includes("Could not extract content")
  ) {
    return `<div class="flex items-center gap-2 text-blue-600">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="flex-shrink-0">
        <path d="M5 12.55a11 11 0 0 1 14.08 0"></path>
        <path d="M1.42 9a16 16 0 0 1 21.16 0"></path>
        <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
        <path d="M12 20h.01"></path>
      </svg>
      <span class="font-medium">${text}</span>
    </div>`;
  }
  
  // Create a regex with word boundaries to match the brand name
  const regex = new RegExp(`\\b${brandName}\\b`, 'gi');
  
  // Replace each occurrence with the highlighted version
  return text.replace(regex, match => 
    `<span class="font-bold text-green-600">${match}</span>`
  );
};
