
/**
 * Generate a Google search URL for a specific query
 */
export const getGoogleSearchUrl = (query: string): string => {
  return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
};

/**
 * Format a date string into a more readable format
 */
export const formatDateString = (dateString?: string): string | null => {
  if (!dateString) return null;
  
  try {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (e) {
    console.error("Error formatting date:", e);
    return dateString;
  }
};
