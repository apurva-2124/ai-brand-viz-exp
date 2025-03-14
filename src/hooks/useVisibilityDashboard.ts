
import { useState, useEffect } from "react";
import { BrandData } from "@/components/BrandTracker";
import { analyzeAIVisibility, AIProvider } from "@/services/aiVisibility";
import { QueryType } from "@/utils/queryTransformer";
import { generateMockData } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";

export const useVisibilityDashboard = (brandData: BrandData) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibilityData, setVisibilityData] = useState<any>(null);
  const [provider, setProvider] = useState<AIProvider>("openai");
  const [queryType, setQueryType] = useState<QueryType>("general");
  const [useMockData, setUseMockData] = useState(false);
  const { toast } = useToast();

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const openAIKey = localStorage.getItem("openai_api_key");
      const anthropicKey = localStorage.getItem("anthropic_api_key");
      const geminiKey = localStorage.getItem("gemini_api_key");
      
      const shouldUseMockData = 
        useMockData || 
        (provider === "openai" && !openAIKey) || 
        (provider === "anthropic" && !anthropicKey) ||
        (provider === "gemini" && !geminiKey) ||
        (provider === "all" && (!openAIKey || !anthropicKey || !geminiKey));
      
      let data;
      
      if (shouldUseMockData) {
        data = generateMockData(brandData);
        toast({
          title: "Using mock data",
          description: provider !== "all" 
            ? `No API key found for ${provider}. Using simulated data instead.` 
            : "Missing API keys. Using simulated data instead.",
        });
      } else {
        data = await analyzeAIVisibility(brandData, provider, queryType);
      }
      
      setVisibilityData(data);
    } catch (error) {
      console.error("Error fetching visibility data:", error);
      setError("Failed to analyze AI visibility. Please check your API keys and try again.");
      
      const mockData = generateMockData(brandData);
      setVisibilityData(mockData);
    } finally {
      setLoading(false);
    }
  };

  const handleExportCSV = () => {
    if (!visibilityData) return;
    
    const csvData = [
      [
        'Keyword', 
        'Query', 
        'Visibility Level', 
        'Has Brand Mention', 
        'Is Prominent',
        'Competitors Found',
        'Competitor Outranking',
        'Risk Level',
        'Recommendation',
        'Provider'
      ]
    ];
    
    visibilityData.results.forEach((result: any) => {
      csvData.push([
        result.keyword,
        result.query,
        result.visibilityScore?.level || (result.isProminent ? 'high' : result.hasBrandMention ? 'low' : 'not_found'),
        result.hasBrandMention ? 'Yes' : 'No',
        result.isProminent ? 'Yes' : 'No',
        result.competitorAnalysis?.competitorsFound?.join(', ') || 'None',
        result.competitorAnalysis?.competitorOutranking ? 'Yes' : 'No',
        result.competitorAnalysis?.riskLevel || 'low',
        result.recommendation || '',
        result.provider
      ]);
    });
    
    const csvContent = csvData.map(row => 
      row.map(cell => 
        typeof cell === 'string' && cell.includes(',') 
          ? `"${cell}"` 
          : cell
      ).join(',')
    ).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${brandData.name}_AI_Visibility_Report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Export successful",
      description: "Your AI visibility report has been downloaded",
    });
  };

  useEffect(() => {
    fetchData();
  }, [brandData, provider, useMockData, queryType]);

  return {
    loading,
    error,
    visibilityData,
    provider,
    setProvider,
    queryType,
    setQueryType,
    useMockData,
    setUseMockData,
    fetchData,
    handleExportCSV
  };
};
