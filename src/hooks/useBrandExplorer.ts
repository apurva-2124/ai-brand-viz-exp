
import { useState, useEffect } from "react";
import { AIProvider } from "@/services/aiVisibility";
import { QueryType } from "@/utils/queryTemplates";
import { getDefaultBrand, getBrandMapping, brandIndustryKeywordMappings } from "@/lib/brandMappings";
import { generateQueriesForKeywords } from "@/utils/queryTransformer";
import { analyzeAIVisibility } from "@/services/aiVisibility";
import { toast } from "sonner";

export const useBrandExplorer = () => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>(getDefaultBrand().industry);
  const [selectedBrand, setSelectedBrand] = useState(getDefaultBrand());
  const [selectedKeyword, setSelectedKeyword] = useState<string>(selectedBrand.keywords[0]);
  const [provider, setProvider] = useState<AIProvider>("openai");
  const [queryType, setQueryType] = useState<QueryType>("general");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasApiKey, setHasApiKeys] = useState(true); // Always true now since we're using a proxy
  const [aiResults, setAiResults] = useState<any>(null);

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
    setIsAnalyzing(true);
    setAiResults(null);
    
    try {
      console.log('Running AI visibility analysis with:');
      console.log('Brand:', selectedBrand.brand);
      console.log('Keyword:', selectedKeyword);
      console.log('Query Type:', queryType);
      console.log('Provider:', provider);
      
      // Create brand data object for analysis
      const brandData = {
        name: selectedBrand.brand,
        industry: selectedBrand.industry,
        keywords: [selectedKeyword],
        email: "",
        firstName: "",
        lastName: ""
      };
      
      // Generate exact queries that will be used
      const queriesForAnalysis = generateQueriesForKeywords(
        [selectedKeyword], 
        selectedBrand.brand, 
        selectedBrand.industry,
        undefined,
        queryType
      );
      
      console.log('Generated queries for analysis:', queriesForAnalysis);
      
      // Run the analysis with proxy API calls
      const results = await analyzeAIVisibility(brandData, provider, queryType);
      
      console.log('Analysis results:', results);
      setAiResults(results);
      toast.success("AI Visibility analysis completed");
    } catch (error) {
      console.error("Error running AI visibility analysis:", error);
      toast.error("Failed to complete analysis. Please try again.");
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

  return {
    selectedIndustry,
    setSelectedIndustry,
    selectedBrand,
    handleBrandChange,
    selectedKeyword,
    setSelectedKeyword,
    provider,
    setProvider,
    queryType,
    setQueryType,
    isAnalyzing,
    hasApiKey: true, // Always true now since we're using a proxy
    aiResults,
    runAIVisibilityAnalysis,
    queries
  };
};
