
import { useState, useEffect } from "react";
import { Container } from "@/components/Container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BrandInputForm } from "@/components/BrandInputForm";
import { VisibilityDashboard } from "@/components/VisibilityDashboard";
import { CompetitorAnalysis } from "@/components/CompetitorAnalysis";
import { Recommendations } from "@/components/Recommendations";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ApiSettings } from "@/components/ApiSettings";

export interface BrandData {
  name: string;
  industry: string;
  keywords: string[];
  competitors?: string[];
  lastUpdated?: string;
}

export const BrandTracker = () => {
  const [brandData, setBrandData] = useState<BrandData | null>(null);
  const [hasApiKeys, setHasApiKeys] = useState(false);
  
  useEffect(() => {
    // Check if API keys are set
    const openAIKey = localStorage.getItem("openai_api_key");
    const anthropicKey = localStorage.getItem("anthropic_api_key");
    setHasApiKeys(!!(openAIKey || anthropicKey));
  }, []);
  
  const handleBrandSubmit = (data: BrandData) => {
    // Add timestamp
    const updatedData = {
      ...data,
      lastUpdated: new Date().toISOString()
    };
    setBrandData(updatedData);
  };

  const ApiKeyPrompt = () => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Setup API Keys</CardTitle>
        <CardDescription>
          Connect your OpenAI and/or Anthropic API keys to get real AI visibility data
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          No API keys detected. You can still use the app with simulated data, 
          or add your API keys for real AI analysis.
        </p>
        <ApiSettings />
      </CardContent>
    </Card>
  );

  return (
    <Container className="py-8">
      {!brandData ? (
        <>
          {!hasApiKeys && <ApiKeyPrompt />}
          <BrandInputForm onSubmit={handleBrandSubmit} />
        </>
      ) : (
        <>
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Brand: {brandData.name}</h2>
              <p className="text-muted-foreground">Industry: {brandData.industry}</p>
              <p className="text-sm text-muted-foreground">
                Last updated: {new Date(brandData.lastUpdated || "").toLocaleString()}
              </p>
            </div>
            {!hasApiKeys && (
              <ApiSettings />
            )}
          </div>
          
          <Tabs defaultValue="dashboard">
            <TabsList className="mb-6">
              <TabsTrigger value="dashboard">Visibility Dashboard</TabsTrigger>
              <TabsTrigger value="competitors">Competitor Analysis</TabsTrigger>
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard">
              <VisibilityDashboard brandData={brandData} />
            </TabsContent>
            
            <TabsContent value="competitors">
              <CompetitorAnalysis brandData={brandData} />
            </TabsContent>
            
            <TabsContent value="recommendations">
              <Recommendations brandData={brandData} />
            </TabsContent>
          </Tabs>
        </>
      )}
    </Container>
  );
};
