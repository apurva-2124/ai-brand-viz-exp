
import { Container } from "@/components/Container";
import { BrandExplorerHeader } from "@/components/brand-explorer/BrandExplorerHeader";
import { BrandExplorerControls } from "@/components/brand-explorer/BrandExplorerControls";
import { BrandExplorerDisclaimer } from "@/components/brand-explorer/BrandExplorerDisclaimer";
import { useBrandExplorer } from "@/hooks/useBrandExplorer";

export const BrandExplorer = () => {
  const {
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
    hasApiKey,
    aiResults,
    runAIVisibilityAnalysis,
    queries
  } = useBrandExplorer();

  return (
    <Container className="py-20" id="explorer">
      <div className="max-w-5xl mx-auto space-y-10">
        <BrandExplorerHeader 
          title="Brand Explorer"
          description="See how AI describes your brand vs. traditional search. Select a brand, industry, and keyword to compare AI-generated results with Google search rankings."
        />

        <BrandExplorerControls
          selectedIndustry={selectedIndustry}
          setSelectedIndustry={setSelectedIndustry}
          selectedBrand={selectedBrand}
          handleBrandChange={handleBrandChange}
          selectedKeyword={selectedKeyword}
          setSelectedKeyword={setSelectedKeyword}
          provider={provider}
          setProvider={setProvider}
          queryType={queryType}
          setQueryType={setQueryType}
          isAnalyzing={isAnalyzing}
          hasApiKey={hasApiKey}
          aiResults={aiResults}
          runAIVisibilityAnalysis={runAIVisibilityAnalysis}
          queries={queries}
        />
        
        <BrandExplorerDisclaimer />
      </div>
    </Container>
  );
};
