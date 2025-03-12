
/**
 * Gets the SerpApi key from localStorage
 */
export const getSerpApiKey = (): string | null => {
  return localStorage.getItem("serpapi_api_key");
};
