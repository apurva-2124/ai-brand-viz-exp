
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/Container";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AIProvider } from "@/services/aiVisibility";
import { AIvsTraditionalComparison } from "@/components/AIvsTraditionalComparison";
import { brandIndustryKeywordMappings, getBrandsByIndustry, getDefaultBrand, getBrandMapping } from "@/lib/brandMappings";
import { SearchQueriesCard } from "@/components/visibility/SearchQueriesCard";
import { generateQueriesForKeywords, QueryType } from "@/utils/queryTransformer";
import { AIResponseAnalysis } from "@/components/visibility/AIResponseAnalysis";
import { Button } from "@/components/ui/button";
import { Loader2, AlertTriangle } from "lucide-react";
import { analyzeAIVisibility } from "@/services/aiVisibility";
import { toast } from "sonner";

// Define query types for the dropdown
const QUERY_TYPES: { value: QueryType; label: string }[] = [
  { value: "best-in-class", label: "Best-in-Class (Category-Level)" },
  { value: "feature-specific", label: "Feature-Specific" },
  { value: "comparison", label: "Comparison Query" },
  { value: "review-based", label: "Review-Based Query" },
  { value: "transactional", label: "Transactional Intent" },
  { value: "ai-summarized", label: "AI Summarized Answer Query" },
  { value: "localized", label: "Localized Query (Location-Based)" },
  { value: "ai-assistant", label: "AI Assistant Query (Conversational Search)" },
  { value: "negative-sentiment", label: "Negative Sentiment Query (Reputation Risk)" },
  { value: "industry-trend", label: "Industry Trend Query (Thought Leadership)" },
];

export const BrandExplorer = () => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>(getDefaultBrand().industry);
  const [selectedBrand, setSelectedBrand] = useState(getDefaultBrand());
  const [selectedKeyword, setSelectedKeyword] = useState<string>(selectedBrand.keywords[0]);
  const [provider, setProvider] = useState<AIProvider>("openai");
  const [queryType, setQueryType] = useState<QueryType>("best-in-class");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);
  const [aiResults, setAiResults] = useState<any>(null);

  // Check for API keys on mount
  useEffect(() => {
    const openAIKey = localStorage.getItem("openai_api_key");
    const anthropicKey = localStorage.getItem("anthropic_api_key");
    const geminiKey = localStorage.getItem("gemini_api_key");
    
    setHasApiKey(!!(openAIKey || anthropicKey || geminiKey));
  }, []);
  
  // When industry changes, update the selected brand to the first brand in that industry
  useEffect(() => {
    const brandsInIndustry = brandIndustryKeywordMappings.filter(
      mapping => mapping.industry === selectedIndustry
    );
    
    if (brandsInIndustry.length > 0) {
      setSelectedBrand(brandsInIndustry[0]);
      setSelectedKeyword(brandsInIndustry[0].keywords[0]);
    }
  }, [selectedIndustry]);

  // When brand changes, update the selected keyword to the first keyword for that brand
  useEffect(() => {
    if (selectedBrand && selectedBrand.keywords.length > 0) {
      setSelectedKeyword(selectedBrand.keywords[0]);
    }
  }, [selectedBrand]);

  const handleBrandChange = (brandName: string) => {
    const brandMapping = getBrandMapping(brandName);
    if (brandMapping) {
      setSelectedBrand(brandMapping);
    }
  };

  const runAIVisibilityAnalysis = async () => {
    if (!hasApiKey) {
      toast.error("Please add an API key in the settings before running analysis");
      return;
    }
    
    setIsAnalyzing(true);
    setAiResults(null);
    
    try {
      // Create brand data object for analysis
      const brandData = {
        name: selectedBrand.brand,
        industry: selectedBrand.industry,
        keywords: [selectedKeyword],
        email: "",
        firstName: "",
        lastName: ""
      };
      
      // Run the analysis with real API calls
      const results = await analyzeAIVisibility(brandData, provider, queryType);
      setAiResults(results);
      toast.success("AI Visibility analysis completed");
    } catch (error) {
      console.error("Error running AI visibility analysis:", error);
      toast.error("Failed to complete analysis. Please check API key and try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Generate queries for the selected keyword to display in the SearchQueriesCard
  const queries = selectedKeyword ? 
    generateQueriesForKeywords(
      [selectedKeyword], 
      selectedBrand.brand, 
      selectedBrand.industry,
      undefined,
      queryType
    ) : [];

  return (
    <Container className="py-16" id="explorer">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">Brand Explorer</h2>
          <p className="text-muted-foreground">
            Explore how AI perceives your brand compared to traditional search results. 
            Select a brand, industry, and keyword to analyze its visibility in AI-generated responses.
          </p>
        </div>

        <Card className="p-6">
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">Choose an Industry to Explore</label>
              <Select 
                value={selectedIndustry}
                onValueChange={setSelectedIndustry}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose an industry" />
                </SelectTrigger>
                <SelectContent>
                  {[...new Set(brandIndustryKeywordMappings.map(mapping => mapping.industry))].map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Pick a Brand to Analyze</label>
              <Select 
                value={selectedBrand.brand}
                onValueChange={handleBrandChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose a brand" />
                </SelectTrigger>
                <SelectContent>
                  {getBrandsByIndustry(selectedIndustry).map((brand) => (
                    <SelectItem key={brand} value={brand}>
                      {brand}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Select AI Model</label>
              <Select
                value={provider}
                onValueChange={(value) => setProvider(value as AIProvider)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose an AI model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="openai">OpenAI (GPT-4)</SelectItem>
                  <SelectItem value="anthropic">Anthropic (Claude)</SelectItem>
                  <SelectItem value="gemini">Google (Gemini)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Select Query Type</label>
              <Select
                value={queryType}
                onValueChange={(value) => setQueryType(value as QueryType)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose query type" />
                </SelectTrigger>
                <SelectContent>
                  {QUERY_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Keyword selection row */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Pick a Search Keyword (how users find this brand via traditional search engines)
            </label>
            <div className="flex gap-2 flex-wrap">
              {selectedBrand.keywords.map(keyword => (
                <Button
                  key={keyword}
                  variant={keyword === selectedKeyword ? "default" : "outline"}
                  onClick={() => setSelectedKeyword(keyword)}
                  className="mb-2"
                >
                  {keyword}
                </Button>
              ))}
            </div>
          </div>

          {/* Run Analysis button */}
          <div className="mb-6">
            <Button 
              onClick={runAIVisibilityAnalysis} 
              disabled={isAnalyzing || !hasApiKey}
              className="w-full"
            >
              {isAnalyzing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isAnalyzing ? "Analyzing..." : "Analyze AI Search Results"}
            </Button>
            {!hasApiKey && (
              <p className="text-sm text-red-500 mt-2 flex items-center">
                <AlertTriangle className="h-4 w-4 mr-1" />
                API Key Required: Add your API key in settings to run an AI analysis and see results.
              </p>
            )}
          </div>

          {/* Display Search Queries */}
          {queries.length > 0 && (
            <div className="mb-6">
              <SearchQueriesCard queries={queries} />
            </div>
          )}

          {/* Display AI Response Analysis results */}
          {aiResults && aiResults.results && aiResults.results.length > 0 && (
            <div className="mb-6">
              <AIResponseAnalysis results={aiResults.results} />
            </div>
          )}

          {/* AI vs. Traditional Comparison */}
          <AIvsTraditionalComparison
            brandData={{
              name: selectedBrand.brand,
              industry: selectedBrand.industry,
              keywords: [selectedKeyword],
              email: "",
              firstName: "",
              lastName: ""
            }}
            aiResults={aiResults}
          />
        </Card>
      </div>
    </Container>
  );
};
