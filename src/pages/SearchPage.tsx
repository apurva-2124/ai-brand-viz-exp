
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { SearchResultCard } from "@/components/search/SearchResultCard";
import { SearchResults } from "@/components/search/types";
import { fetchSearchResults } from "@/services/search/searchService";

const SearchPage = () => {
  const [query, setQuery] = useState<string>("best short-term rental platforms");
  const [results, setResults] = useState<SearchResults | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!query.trim()) {
      toast({
        title: "Please enter a search query",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const apiKey = localStorage.getItem("serpapi_api_key");
      
      if (!apiKey) {
        setError("Please add your SerpAPI key in settings");
        toast({
          title: "SerpAPI Key Required",
          description: "Please add your SerpAPI key in the settings panel",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      const searchResults = await fetchSearchResults(query);
      setResults(searchResults);

      if (searchResults.error) {
        setError(searchResults.error);
        toast({
          title: "Search Error",
          description: searchResults.error,
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error("Search error:", err);
      setError("An error occurred while fetching search results");
      toast({
        title: "Search Error",
        description: "An error occurred while fetching search results",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Search Results</h1>
        
        <div className="flex gap-2 mb-8">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter your search query"
            className="flex-1"
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <Button onClick={handleSearch} disabled={isLoading}>
            {isLoading ? "Searching..." : "Search"}
          </Button>
        </div>

        {error && (
          <div className="bg-destructive/10 border border-destructive rounded-md p-4 mb-6">
            <p className="text-destructive">{error}</p>
            {error.includes("SerpAPI key") && (
              <p className="text-sm mt-2">
                You can add your SerpAPI key in the settings panel at the top right corner.
              </p>
            )}
          </div>
        )}

        {isLoading && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Fetching search results...</p>
          </div>
        )}

        {results && !isLoading && (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <p className="text-muted-foreground">
                Showing results for: <span className="font-medium text-foreground">{results.query}</span>
              </p>
              <p className="text-xs text-muted-foreground">
                Retrieved on: {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
              </p>
            </div>

            {results.searchResults.length === 0 ? (
              <div className="text-center py-12 border rounded-md">
                <p className="text-muted-foreground">No search results found. Try a different query.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {results.searchResults.map((result, index) => (
                  <SearchResultCard key={index} result={result} />
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default SearchPage;
