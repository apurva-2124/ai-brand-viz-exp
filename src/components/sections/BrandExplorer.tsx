import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/Container";
import { AIvsTraditionalComparison } from "@/components/AIvsTraditionalComparison";
import { SearchQueriesCard } from "@/components/visibility/SearchQueriesCard";
import { AIResponseAnalysis } from "@/components/visibility/AIResponseAnalysis";
import { toast } from "sonner";
import { AIProvider } from "@/services/aiVisibility";
import { getDefaultBrand, getBrandMapping, brandIndustryKeywordMappings } from "@/lib/brandMappings";
import { generateQueriesForKeywords } from "@/utils/queryTransformer";
import { analyzeAIVisibility } from "@/services/aiVisibility";
import { QueryType } from "@/utils/queryTemplates";
import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from "@/components/ui/tooltip";

// Import our components
import { IndustrySelect } from "@/components/brand-explorer/IndustrySelect";
import { BrandSelect } from "@/components/brand-explorer/BrandSelect";
import { AIModelSelect } from "@/components/brand-explorer/AIModelSelect";
import { QueryTypeSelect } from "@/components/brand-explorer/QueryTypeSelect";
import { KeywordSelector } from "@/components/brand-explorer/KeywordSelector";
import { AnalysisButton } from "@/components/brand-explorer/AnalysisButton";

export const BrandExplorer = () => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>(getDefaultBrand().industry);
  const [selectedBrand, setSelectedBrand] = useState(getDefaultBrand());
  const [selectedKeyword, setSelectedKeyword] = useState<string>(selectedBrand.keywords[0]);
  const [provider, setProvider] = useState<AIProvider>("openai");
  const [queryType, setQueryType] = useState<QueryType>("general");
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
    <Container className="py-20" id="explorer">
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">Brand Explorer</h2>
          <p className="text-muted-foreground">
            See how AI describes your brand vs. traditional search. Select a brand, 
            industry, and keyword to compare AI-generated results with Google search rankings.
          </p>
        </div>

        <Card className="p-6">
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <IndustrySelect 
              selectedIndustry={selectedIndustry} 
              setSelectedIndustry={setSelectedIndustry} 
            />

            <BrandSelect 
              selectedIndustry={selectedIndustry}
              selectedBrand={selectedBrand.brand}
              onBrandChange={handleBrandChange}
            />

            <AIModelSelect 
              provider={provider} 
              setProvider={setProvider} 
            />

            <QueryTypeSelect 
              queryType={queryType} 
              setQueryType={setQueryType} 
            />
          </div>
          
          <KeywordSelector 
            keywords={selectedBrand.keywords}
            selectedKeyword={selectedKeyword}
            setSelectedKeyword={setSelectedKeyword}
          />

          <div className="mb-6 flex items-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex-1">
                    <AnalysisButton 
                      isAnalyzing={isAnalyzing}
                      hasApiKey={hasApiKey}
                      onClick={runAIVisibilityAnalysis}
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>AI-generated responses are pulled directly from public AI models. Results may be inaccurate or biased. This tool does not modify AI outputs.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
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
        
        {/* Primary Disclaimer */}
        <Alert variant="default" className="bg-background border-muted-foreground/20 mt-8">
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          <AlertDescription className="text-muted-foreground text-sm">
            <strong>Disclaimer:</strong> This is an open-source experiment analyzing AI-generated search results. 
            I do not represent or endorse any brands listed in this tool. AI-generated responses may change over 
            time and are not always accurate. This tool is for research purposes only and should not be used for 
            brand monitoring or SEO decisions.
          </AlertDescription>
        </Alert>
      </div>
    </Container>
  );
};
