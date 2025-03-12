
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/Container";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AIProvider } from "@/services/aiVisibility";
import { AIvsTraditionalComparison } from "@/components/AIvsTraditionalComparison";
import { brandIndustryKeywordMappings, getBrandsByIndustry, getDefaultBrand, getBrandMapping } from "@/lib/brandMappings";
import { SearchQueriesCard } from "@/components/visibility/SearchQueriesCard";
import { generateQueriesForKeywords } from "@/utils/queryTransformer";
import { AIResponseAnalysis } from "@/components/visibility/AIResponseAnalysis";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { analyzeAIVisibility } from "@/services/aiVisibility";
import { toast } from "sonner";

export const BrandExplorer = () => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>(getDefaultBrand().industry);
  const [selectedBrand, setSelectedBrand] = useState(getDefaultBrand());
  const [selectedKeyword, setSelectedKeyword] = useState<string>(selectedBrand.keywords[0]);
  const [provider, setProvider] = useState<AIProvider>("openai");
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
      const results = await analyzeAIVisibility(brandData, provider);
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
      selectedBrand.industry
    ) : [];

  return (
    <Container className="py-16" id="explorer">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">Brand Explorer</h2>
          <p className="text-muted-foreground">
            Select a brand and AI model to see how artificial intelligence interprets brand perception
          </p>
        </div>

        <Card className="p-6">
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">Select Industry</label>
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
              <label className="block text-sm font-medium mb-2">Select Brand</label>
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
          </div>
          
          {/* Keyword selection row */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Select Keyword</label>
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
              {isAnalyzing ? "Analyzing..." : "Run AI Visibility Analysis"}
            </Button>
            {!hasApiKey && (
              <p className="text-sm text-red-500 mt-2">
                Please add an API key in the settings before running analysis
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
